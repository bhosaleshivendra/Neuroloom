import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatBox() {

  const [messages, setMessages] = useState([
    {
      sender: "Prime",
      text: "Greetings Commander. I am ready to assist you.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {

    if (input.trim() === "") return;

    setMessages([
      ...messages,
      {
        sender: "You",
        text: input,
      },
    ]);

    setInput("");

  };

  return (

    <div className="bg-white rounded-3xl shadow-sm border mt-8 overflow-hidden">

      {/* Header */}

      <div className="px-8 py-5 border-b">

        <h2 className="text-2xl font-bold">
          Conversation
        </h2>

        <p className="text-slate-500">
          Chat with your active AI assistant
        </p>

      </div>

      {/* Messages */}

      <div
        className="
          h-[420px]
          overflow-y-auto
          p-8
          bg-slate-50
          space-y-5
        "
      >

        {messages.map((message, index) => (

          <div
            key={index}
            className={`flex ${
              message.sender === "You"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`
                max-w-[70%]
                px-5
                py-4
                rounded-2xl

                ${
                  message.sender === "You"
                    ? "bg-indigo-600 text-white"
                    : "bg-white border text-slate-800"
                }
              `}
            >

              <p className="text-xs font-semibold mb-2 opacity-70">
                {message.sender}
              </p>

              <p>{message.text}</p>

            </div>

          </div>

        ))}

      </div>

      {/* Input */}

      <div className="border-t bg-white p-6">

        <div className="flex gap-4">

          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Ask your AI assistant..."
            className="
              flex-1
              border
              rounded-xl
              px-5
              py-4
              outline-none
              focus:border-indigo-500
            "
          />

          <button
            onClick={sendMessage}
            className="
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              px-6
              rounded-xl
              transition
            "
          >

            <Send size={20} />

          </button>

        </div>

      </div>

    </div>

  );

}