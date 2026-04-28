import { GoogleGenerativeAI } from "@google/generative-ai";
import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai";
import OpenAI from "openai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content.toLowerCase();

  // 1. Check for Image Generation Intent
  const imageKeywords = ["generate image", "draw", "create a picture of", "show me an image of"];
  const isImageRequest = imageKeywords.some(keyword => lastMessage.includes(keyword));

  if (isImageRequest) {
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: lastMessage, // You could refine this prompt further
        n: 1,
        size: "1024x1024",
      });

      const imageUrl = response.data[0].url;

      // Return a custom JSON response for the frontend to handle
      return new Response(JSON.stringify({
        role: 'assistant',
        content: `I've generated that image for you!`,
        imageUrl: imageUrl // This custom field tells the frontend to show an <img> tag
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response("Failed to generate image.", { status: 500 });
    }
  }

  // 2. Default to Text Problem Solving (Gemini)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const geminiStream = await model.generateContentStream({
    contents: messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    })),
  });

  const stream = GoogleGenerativeAIStream(geminiStream);
  return new StreamingTextResponse(stream);
}

