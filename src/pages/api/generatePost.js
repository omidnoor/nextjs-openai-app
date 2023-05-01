import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(config);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 0,
    max_tokens: 3600,
    prompt: "Generate a blog post about dogs",
    // top_p: 1.0,
    // frequency_penalty: 0.0,
    // presence_penalty: 0.0,
    // stop: ["\n"],
  });

  console.log("response: ", response.data.choices);

  res.status(200).json({
    post: response.data.choices,
  });
}
