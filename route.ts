import { GoogleGenerativeAI } from "@google/generative-ai";
import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content;

  // Simple logic: If prompt includes "generate image" or "draw", route to image logic
  if (lastMessage.toLowerCase().includes("generate image") || lastMessage.toLowerCase().includes("draw")) {
    // In a real app, you'd call DALL-E or Midjourney API here
    return Response.json({ 
      role: 'assistant', 
      content: "I'm generating that image for you now...",
      imageUrl: "https://api.placeholder.com/image/generated" // Replace with actual API call
    });
  }

  // Standard Text/Problem Solving Logic
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

