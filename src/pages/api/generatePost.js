import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Configuration, OpenAIApi } from "openai";
import { connectDb, disconnectDb } from "../../../utils/db";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { user } = await getSession(req, res);
    const client = await connectDb();
    const db = client.db(process.env.MONGODB_NAME);
    const userDb = await db.collection("users").findOne({
      auth0Id: user.sub,
    });
    if (!userDb?.availableTokens) {
      return res.status(403).json({
        error: "Unauthorized",
      });
    }

    const { topic, keywords } = req.body;
    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(config);

    //   const topic = "Top 10 tips for cats owners";
    //   const keywords =
    //     "first-time cats owners, common cats health issues, best cats breeds, why cats are funny, common cats instics";

    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   temperature: 1,
    //   max_tokens: 3600,
    //   prompt: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
    //       The content should be formatted in SEO-friendly HTML.
    //       The response must also include appropriate HTML title and meta description content.
    //       The return format must be stringified JSON in the following format:
    //       {
    //         "postContent": post content here
    //         "title": title goes here
    //         "metaDescription": meta description goes here
    //       }`,
    // });

    const postContentResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 1,
      messages: [
        {
          role: "system",
          content: `You are a blog post generator`,
        },
        {
          role: "user",
          content: `generate me a blog post`,
        },
        {
          role: "assistant",
          content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. The content should be formatted in SEO-friendly HTML. limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, ul, ol, li, i.`,
        },
      ],
    });

    const postContent =
      postContentResponse.data.choices[0]?.message.content || "";

    const titleResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 1,
      messages: [
        {
          role: "system",
          content: `You are a blog post generator`,
        },
        {
          role: "user",
          content: `generate me a blog post`,
        },
        {
          role: "assistant",
          content: postContent,
        },
        {
          role: "user",
          content: `generate an appropriate title tag text for the above blog post`,
        },
      ],
    });

    const title = titleResponse.data.choices[0]?.message.content || "";

    const metaDescriptionResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 1,
      messages: [
        {
          role: "system",
          content: `You are a blog post generator`,
        },
        {
          role: "user",
          content: `generate me a blog post`,
        },
        {
          role: "assistant",
          content: postContent,
        },
        {
          role: "user",
          content: `generate SEO-fiendly meta description content for the aboveblog post`,
        },
      ],
    });

    const metaDescription =
      metaDescriptionResponse.data.choices[0]?.message.content || "";

    console.log("response: ", postContent);
    console.log("response: ", title);
    console.log("response: ", metaDescription);

    await db.collection("users").updateOne(
      {
        auth0: user.sub,
      },
      {
        $inc: {
          availableToken: -1,
        },
      },
    );

    const post = await db.collection("posts").insertOne({
      postContent: postContent || "",
      title: title || "",
      metaDescription: metaDescription || "",
      topic,
      keywords,
      userId: userDb._id,
      created: new Date(),
    });

    res.status(200).json({
      postId: post.insertedId,
    });

    // const postText = response.data.choices[0]?.text.split("\n").join("");
    // console.log(postText);

    // console.log(JSON.parse(postText).postContent);
    // const postContent = JSON.parse(postText).postContent;
    // const title = JSON.parse(postText).title;
    // const metaDescription = JSON.parse(postText).metaDescription;
    // res.status(200).json({ postContent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await disconnectDb();
  }
});
