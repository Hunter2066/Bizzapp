"use client";
import { useChat } from "ai/react";
import { Send, Bot, User, Image as ImageIcon } from "lucide-react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto h-screen p-4">
      <header className="py-4 border-b mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="text-blue-500" /> AI Assistant
        </h1>
      </header>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-lg flex gap-3 ${
              m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
            }`}>
              {m.role === "assistant" ? <Bot size={20} /> : <User size={20} />}
              <p>{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Describe your problem or ask for an image..."
          className="w-full p-4 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="absolute right-3 top-3 p-1 text-blue-500 hover:bg-blue-50 rounded-full transition">
          <Send size={24} />
        </button>
      </form>
    </div>
  );
}

