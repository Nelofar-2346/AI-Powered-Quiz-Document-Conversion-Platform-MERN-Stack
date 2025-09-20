import React, { useState } from "react";
import api from "../services/api";

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    { role: "system", content: "You are an AI tutor assistant." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/ai/chat", { messages: newMessages });
      const reply = res.data.reply || res.data; // depends on backend format
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "❌ Error: Failed to get response." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto h-[90vh] p-4">
      <h1 className="text-2xl font-bold mb-4">AI Assistant</h1>

      {/* Chat window */}
      <div className="flex-1 overflow-y-auto border rounded p-4 bg-gray-50 space-y-3">
        {messages
          .filter((m) => m.role !== "system")
          .map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-100 self-end text-right"
                  : "bg-gray-200 self-start text-left"
              }`}
            >
              {msg.content}
            </div>
          ))}
        {loading && (
          <div className="italic text-gray-500">AI is typing...</div>
        )}
      </div>

      {/* Input box */}
      <form onSubmit={sendMessage} className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 border rounded-l px-3 py-2 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-r disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
