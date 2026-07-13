import Avatar from "../Avatar";

const ChatWindow = ({ onClose }) => {
  return (
    <div className="fixed top-0 right-0 h-screen w-[380px] bg-white shadow-2xl z-50 flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">

        <div className="flex items-center gap-3">

          {/* Avatar */}
          <img
            src="https://api.dicebear.com/9.x/bottts/svg?seed=ERPBot"
            alt="AI"
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h2 className="font-semibold">
              ERP Assistant
            </h2>

            <p className="text-green-500 text-sm">
              Online
            </p>
          </div>

        </div>

        <button
          onClick={onClose}
          className="text-2xl hover:text-red-500"
        >
          ✕
        </button>

      </div>

      {/* Messages */}

      <div className="flex-1 p-4 overflow-y-auto">

        Hello 👋

      </div>

      {/* Input */}

      <div className="border-t p-4">

        <input
          type="text"
          placeholder="Ask me anything..."
          className="w-full border rounded-lg p-2 outline-none"
        />

      </div>

    </div>
  );
};

export default ChatWindow;