import { getSession } from "@auth0/nextjs-auth0";
import { connectDb, disconnectDb } from "../../../utils/db";
import stripeInit from "stripe";

const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const { user } = await getSession(req, res);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const lineItems = [
      {
        price: process.env.STRIPE_PRODUCT_PRICE_ID,
        quantity: 1,
      },
    ];

    const protocol =
      process.env.NODE_ENV === "development" ? "http://" : "https://";

    const host = req.headers.host;

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${protocol}${host}/success`,
      cancel_url: `${protocol}${host}/success`,
    });

    const client = await connectDb();
    const db = client.db(process.env.MONGODB_NAME);
    const users = await db.collection("users").updateOne(
      {
        auth0Id: user.sub,
      },
      {
        $inc: {
          availableTokens: 10,
        },

        $setOnInsert: {
          auth0Id: user.sub,
        },
      },
      {
        upsert: true,
      },
    );

    res.status(200).json({ session: checkoutSession });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await disconnectDb();
  }
}
