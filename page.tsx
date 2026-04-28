// Inside your messages.map((m) => (...)) loop:

<div className={`max-w-[80%] p-3 rounded-lg flex flex-col gap-3 ${
  m.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
}`}>
  <div className="flex gap-3">
    {m.role === "assistant" ? <Bot size={20} /> : <User size={20} />}
    <p>{m.content}</p>
  </div>
  
  {/* Check if the message has an image URL (casting m as any if using useChat standard types) */}
  {(m as any).imageUrl && (
    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
      <img 
        src={(m as any).imageUrl} 
        alt="AI Generated" 
        className="w-full h-auto object-cover"
      />
    </div>
  )}
</div>
