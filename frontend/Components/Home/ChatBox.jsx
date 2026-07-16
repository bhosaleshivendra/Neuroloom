import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, AlertCircle } from "lucide-react";
import api from "../../src/utils/axios";

export default function ChatBox({ bot, workspaceId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const botRecipientId = bot.name.toLowerCase() === "optimus prime" ? "prime" : bot.name.toLowerCase();

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load chat log when workspaceId or active bot changes
  useEffect(() => {
    if (!workspaceId) {
      // If no workspace context, use default greeting
      setMessages([
        {
          _id: "default",
          sender: botRecipientId,
          senderName: bot.name,
          text: bot.greeting,
          createdAt: new Date(),
        },
      ]);
      return;
    }

    const fetchChatLogs = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/api/chats?workspaceId=${workspaceId}&recipient=${botRecipientId}`
        );
        if (response.data.length > 0) {
          setMessages(response.data);
        } else {
          setMessages([
            {
              _id: "default",
              sender: botRecipientId,
              senderName: bot.name,
              text: bot.greeting,
              createdAt: new Date(),
            },
          ]);
        }
      } catch (err) {
        console.error("Failed to load home page logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatLogs();
  }, [workspaceId, botRecipientId]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const messageText = input;
    setInput("");

    // Optimistic UI state update
    const tempUserMsg = {
      _id: Date.now().toString(),
      sender: "You",
      senderName: "You",
      text: messageText,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    if (!workspaceId) {
      // Mock fallback if workspace not ready
      setLoading(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            _id: (Date.now() + 1).toString(),
            sender: botRecipientId,
            senderName: bot.name,
            text: `[OFFLINE HQ MODE] Greetings Commander. I received your directive: "${messageText}". Please launch a workspace and configure API keys in Settings to connect my live reasoning matrix.`,
            createdAt: new Date(),
          },
        ]);
        setLoading(false);
      }, 800);
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/api/chats", {
        workspaceId,
        recipient: botRecipientId,
        text: messageText,
      });

      // Swap out temporary message and append the official responses from DB
      // botResponse can be an array (team chat) or a single message
      setMessages((prev) => {
        const bots = Array.isArray(response.data.botResponse)
          ? response.data.botResponse
          : [response.data.botResponse];
        return prev.filter((m) => m._id !== tempUserMsg._id).concat([
          response.data.userMessage,
          ...bots,
        ]);
      });
    } catch (err) {
      console.error("Failed to send home chat message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 mt-8 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="px-8 py-5 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            Tactical Link
          </h2>
          <p className="text-slate-500 text-xs mt-1">
            Direct telemetry link with active command assistant
          </p>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Sparkles size={14} className="text-indigo-400" />
          <span>Active: {bot.name}</span>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[420px] overflow-y-auto p-8 bg-slate-950/20 space-y-5">
        {messages.map((message, index) => (
          <div
            key={message._id || index}
            className={`flex ${
              message.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-5 py-4 rounded-2xl text-xs leading-relaxed shadow-lg ${
                message.sender === "You"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-slate-900 border border-slate-850 text-slate-100 rounded-tl-none"
              }`}
            >
              <p className="text-[10px] font-bold mb-1.5 opacity-60">
                {message.sender === "You" ? "You" : message.senderName || bot.name}
              </p>
              <p className="whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-850 text-slate-300 px-5 py-4 rounded-2xl rounded-tl-none text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[10px] text-slate-500 font-bold">Synchronizing...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-800 bg-slate-900/40 p-6">
        <div className="flex gap-4 items-center bg-slate-950 border border-slate-850 rounded-2xl px-5 py-1.5 focus-within:border-indigo-500 transition">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder={`Instruct Autobot ${bot.name}...`}
            className="flex-1 bg-transparent py-3 outline-none text-sm text-slate-200 placeholder-slate-500"
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className={`p-3 rounded-xl transition cursor-pointer ${
              input.trim()
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/10"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}