/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyD6tA6t3A55JiArnswcJaa_XjW8YuSK_NE";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
});

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};

const run = async (prompt) => {
  const chatSession = model.startChat({
    generationConfig,
    
    history: [],
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
  }
};
 
export default run;
