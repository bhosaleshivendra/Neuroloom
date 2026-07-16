import { useState } from "react";
import {
  X,
  SendHorizonal,
  Sparkles,
  Users,
  CheckSquare,
  BarChart3,
  BrainCircuit,
} from "lucide-react";

import prime from "../../src/assets/autobots/prime.png";

export default function ChatWindow({
  workspace,
  onClose,
}) {

  const [message, setMessage] = useState("");

  const suggestions = [
    {
      icon: Users,
      title: "Hire a new employee",
    },
    {
      icon: CheckSquare,
      title: "Create project tasks",
    },
    {
      icon: BarChart3,
      title: "Show analytics",
    },
    {
      icon: Sparkles,
      title: "Optimize my workflow",
    },
  ];

  return (

    <aside
      className="
        fixed
        top-16
        right-0

        w-[420px]

        h-[calc(100vh-64px)]

        bg-white

        border-l
        border-slate-200

        shadow-2xl

        flex
        flex-col

        z-40
      "
    >

      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-200">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="relative">

              <img
                src={prime}
                alt="Prime"
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-slate-100
                  p-1
                "
              />

              <span
                className="
                  absolute
                  bottom-0
                  right-0

                  w-4
                  h-4

                  rounded-full

                  bg-green-500

                  border-2
                  border-white
                "
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Prime
              </h2>

              <p className="text-sm text-green-600 font-medium">
                Online
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="
              p-2
              rounded-xl
              hover:bg-slate-100
              transition
            "
          >

            <X />

          </button>

        </div>

      </div>

      {/* Workspace */}

      <div className="px-6 py-5 border-b border-slate-200">

        <p className="text-xs uppercase tracking-wide text-slate-500">
          Current Workspace
        </p>

        <h3 className="mt-2 font-semibold text-slate-900">
          {workspace?.name || "No Workspace Selected"}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          {workspace?.company || ""}
        </p>

      </div>

      {/* Conversation */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-6
          py-6
        "
      >

        <div
          className="
            bg-indigo-50
            border
            border-indigo-100

            rounded-3xl

            p-5
          "
        >

          <div className="flex gap-4">

            <BrainCircuit
              className="text-indigo-600 mt-1"
            />

            <div>

              <h3 className="font-bold text-slate-900">
                Hello 👋
              </h3>

              <p className="mt-2 text-slate-600 leading-7">

                I am <strong>Prime</strong>,
                your Chief AI Officer.

                <br /><br />

                I can coordinate Autobots,
                create tasks,
                assign departments,
                monitor projects,
                generate reports,
                and help manage your entire workspace.

              </p>

            </div>

          </div>

        </div>

        {/* Suggestions */}

        <div className="mt-8">

          <h4 className="font-semibold text-slate-800 mb-4">
            Suggested Actions
          </h4>

          <div className="space-y-3">

            {suggestions.map((item, index) => {

              const Icon = item.icon;

              return (

                <button
                  key={index}
                  className="
                    w-full

                    flex
                    items-center
                    gap-4

                    p-4

                    rounded-2xl

                    bg-slate-50

                    hover:bg-indigo-50
                    hover:border-indigo-200

                    border
                    border-transparent

                    transition

                    cursor-pointer
                  "
                >

                  <Icon
                    size={22}
                    className="text-indigo-600"
                  />

                  <span className="font-medium">
                    {item.title}
                  </span>

                </button>

              );

            })}

          </div>

        </div>

      </div>

      {/* Footer */}

      <div
        className="
          border-t
          border-slate-200

          p-5
        "
      >

        <div
          className="
            flex
            items-center

            bg-slate-100

            rounded-2xl

            px-4
          "
        >

          <input
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Ask Prime anything..."
            className="
              flex-1

              bg-transparent

              py-4

              outline-none
            "
          />

          <button
            className="
              p-2

              rounded-xl

              bg-indigo-600

              text-white

              hover:bg-indigo-700

              transition

              cursor-pointer
            "
          >

            <SendHorizonal size={18} />

          </button>

        </div>

      </div>

    </aside>

  );

}