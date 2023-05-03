import Cors from "micro-cors";
import stripeInit from "stripe";
import verifyStripe from "@webdeveducation/next-verify-stripe";
import { connectDb, disconnectDb } from "../../../../utils/db";

const cors = Cors({
  methods: ["POST", "HEAD"],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const handler = async (req, res) => {
  if (req.method === "POST") {
    let event;
    try {
      const result = await verifyStripe({
        req,
        stripe,
        endpointSecret,
      });
      if (result) {
        event = result;
      } else {
        console.log("verifyStripe did not return an event object");
        res.status(500).json({ error: "Failed to verify webhook" });
        return;
      }
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Failed to verify webhook" });
      return;
    }
    switch (event.type) {
      case "payment_intent.succeeded": {
        const client = await connectDb();
        const db = client.db(process.env.MONGODB_NAME);

        const paymentIntent = event.data.object;
        const auth0Id = paymentIntent.metadata.sub;
        const users = await db.collection("users").updateOne(
          {
            auth0Id,
          },
          {
            $inc: {
              availableTokens: 10,
            },

            $setOnInsert: {
              auth0Id,
            },
          },
          {
            upsert: true,
          },
        );
        break; // Add a break statement to avoid falling through to the default case
      }
      default:
        console.log("Unhandled event: ", event.type);
    }
    disconnectDb();
    res.status(200).json({ received: true });
  }
};

export default cors(handler);
