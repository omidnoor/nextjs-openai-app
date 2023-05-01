import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const { topic, keywords } = req.body;
  console.log(topic, keywords);
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(config);

  //   const topic = "Top 10 tips for cats owners";
  //   const keywords =
  //     "first-time cats owners, common cats health issues, best cats breeds, why cats are funny, common cats instics";

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 0,
    max_tokens: 3600,
    prompt: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
        The content should be formatted in SEO-friendly HTML.
        The response must also include appropriate HTML title and meta description content.
        The return format must be stringified JSON in the following format:
        {
          "postContent": post content here
          "title": title goes here
          "metaDescription": meta description goes here
        }`,
  });

  //   console.log("response: ", response.data);
  const postText = response.data.choices[0]?.text.split("\n").join("");
  console.log(postText);

  console.log(JSON.parse(postText).postContent);
  const postContent = JSON.parse(postText).postContent;
  const title = JSON.parse(postText).title;
  const metaDescription = JSON.parse(postText).metaDescription;
  res.status(200).json({ postContent });
}