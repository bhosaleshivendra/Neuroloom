import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  SendHorizonal,
  Sparkles,
  Users,
  CheckSquare,
  BarChart3,
  BrainCircuit,
  MessageSquareCode,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import api from "../../src/utils/axios";
import { autobotImages } from "../../src/data/autobots";

export default function ChatWindow({ workspace, projectId, onClose }) {
  const [activeRecipient, setActiveRecipient] = useState("prime"); // 'prime', 'wheeljack', etc., or 'team'
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRecipientDropdown, setShowRecipientDropdown] = useState(false);
  const chatBottomRef = useRef(null);

  const employees = workspace?.employees || [];

  // Recipient list includes all workspace Autobots plus the general Team Chat
  const recipients = [
    { id: "team", name: "AI Team Channel", role: "Joint Command", isTeam: true },
    ...employees.map(emp => ({
      id: emp.id,
      name: emp.name,
      role: emp.role,
      isTeam: false,
    })),
  ];

  const currentRecipientObj = recipients.find(r => r.id === activeRecipient) || recipients[0];

  // Fetch chat history from DB on target change
  useEffect(() => {
    if (!workspace?._id) return;

    const fetchChatLogs = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/api/chats?workspaceId=${workspace._id}&recipient=${activeRecipient}${projectId ? `&projectId=${projectId}` : ''}`
        );
        setMessages(response.data);
      } catch (err) {
        console.error("Failed to load chat history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatLogs();
  }, [workspace?._id, activeRecipient, projectId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !workspace?._id) return;

    const textToSend = messageText;
    setMessageText("");

    // Optimistic user message update
    const tempUserMsg = {
      _id: Date.now().toString(),
      sender: "You",
      senderName: "You",
      text: textToSend,
      recipient: activeRecipient,
      createdAt: new Date(),
    };
    setMessages(prev => [...prev, tempUserMsg]);

    try {
      setLoading(true);
      const response = await api.post("/api/chats", {
        workspaceId: workspace._id,
        projectId: projectId || null,
        recipient: activeRecipient,
        text: textToSend,
      });

      // Remove temporary optimistic message and append official saved DB messages (single or multiple)
      setMessages(prev => {
        const bots = Array.isArray(response.data.botResponse) 
          ? response.data.botResponse 
          : [response.data.botResponse];
        return prev.filter(m => m._id !== tempUserMsg._id).concat([
          response.data.userMessage,
          ...bots
        ]);
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (title) => {
    setMessageText(title);
  };

  const suggestions = [
    { icon: Users, title: "Summarize active department leads" },
    { icon: CheckSquare, title: "Analyze current project progress" },
    { icon: BarChart3, title: "List low status active tasks" },
    { icon: Sparkles, title: "Give optimization suggestions" },
  ];

  return (
    <aside className="fixed top-16 right-0 w-[440px] h-[calc(100vh-64px)] bg-slate-950/95 border-l border-slate-900 backdrop-blur-xl shadow-2xl flex flex-col z-40 text-slate-100 select-none">
      {/* Target Recipient Selector Header */}
      <div className="px-6 py-4 border-b border-slate-900 flex items-center justify-between relative bg-slate-950/50">
        <div className="relative">
          <button
            onClick={() => setShowRecipientDropdown(!showRecipientDropdown)}
            className="flex items-center gap-3 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 px-4 py-2 rounded-2xl transition cursor-pointer text-left"
          >
            <div className="relative">
              {currentRecipientObj.isTeam ? (
                <div className="w-8 h-8 rounded-xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <BrainCircuit size={16} />
                </div>
              ) : (
                <img
                  src={autobotImages[currentRecipientObj.id] || autobotImages.prime}
                  alt={currentRecipientObj.name}
                  className="w-8 h-8 rounded-xl object-contain bg-slate-800 p-0.5"
                />
              )}
            </div>

            <div>
              <h2 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                {currentRecipientObj.name}
                <ChevronDown size={12} className="text-slate-500" />
              </h2>
              <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">
                {currentRecipientObj.role}
              </p>
            </div>
          </button>

          {/* Target Recipient Dropdown List */}
          <AnimatePresence>
            {showRecipientDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 space-y-1"
              >
                {recipients.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setActiveRecipient(r.id);
                      setShowRecipientDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs transition cursor-pointer ${
                      activeRecipient === r.id
                        ? "bg-indigo-600 text-white font-bold"
                        : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {r.isTeam ? (
                      <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <BrainCircuit size={12} />
                      </div>
                    ) : (
                      <img
                        src={autobotImages[r.id] || autobotImages.prime}
                        alt={r.name}
                        className="w-6 h-6 rounded-lg object-contain bg-slate-800"
                      />
                    )}
                    <div>
                      <div className="font-semibold leading-tight">{r.name}</div>
                      <div className="text-[9px] opacity-75 mt-0.5">{r.role}</div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition border border-transparent hover:border-slate-800/80 cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages Stream Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.length === 0 && !loading && (
          <div className="bg-indigo-600/5 border border-indigo-500/10 rounded-2xl p-5 text-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/15 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400 mb-3">
              <MessageSquareCode size={20} />
            </div>
            <h3 className="text-xs font-bold text-slate-200">
              Security Link Established
            </h3>
            <p className="text-[10px] text-slate-500 leading-normal mt-1 max-w-xs mx-auto">
              I am online. Input your task or request below. I have loaded your workspace parameters for context.
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={msg._id || index}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-lg ${
                msg.sender === "You"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-slate-900 border border-slate-800/80 text-slate-100 rounded-bl-none"
              }`}
            >
              <div className="flex justify-between items-center gap-4 mb-1.5 opacity-60 text-[9px] font-bold">
                <span>{msg.senderName}</span>
                <span>
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>
              <p className="whitespace-pre-line">{msg.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800/80 text-slate-300 px-4 py-3 rounded-2xl rounded-bl-none text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[10px] text-slate-500 font-medium">Processing core...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Quick Prompts */}
      {messages.length < 3 && (
        <div className="px-6 py-2 border-t border-slate-900/40">
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-2">
            Suggested Core Operations
          </p>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(item.title)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 transition cursor-pointer text-left text-[10px] text-slate-400 hover:text-slate-200"
                >
                  <Icon size={12} className="text-indigo-400 shrink-0" />
                  <span className="truncate">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Message Text Input Controls */}
      <div className="border-t border-slate-900 p-4 bg-slate-950/80">
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-2xl px-4 py-1.5">
          <input
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={`Instruct ${currentRecipientObj.name}...`}
            className="flex-1 bg-transparent py-2.5 outline-none text-xs text-slate-200 placeholder-slate-500"
          />

          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className={`p-2.5 rounded-xl transition cursor-pointer ${
              messageText.trim()
                ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/10"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            <SendHorizonal size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}