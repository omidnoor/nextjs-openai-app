import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(config);

  const topic = "Top 10 tips for cats owners";
  const keywords =
    "first-time cats owners, common cats health issues, best cats breeds, why cats are funny, common cats instics";

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 1,
    max_tokens: 1000,
    // prompt: process.env.OPEN_AI_PROMPT + "tell me a joke",
    prompt: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
    The content should be formatted in SEO-friendly HTML.
    The response must also include appropriate HTML title and meta description content.
    The return format must be stringified JSON in the following format:
    {
      "postContent": post content here
      "title": title goes here
      "metaDescription": meta description goes here
    }`,

    // top_p: 1.0,
    // frequency_penalty: 0.0,
    // presence_penalty: 0.0,
    // stop: ["\n"],
  });

  //   console.log("response: ", response.data.choices[0]?.text);

  res.status(200).json({
    post: JSON.stringify(response.data.choices[0]?.text.split("\n").join(" ")),
  });
}
