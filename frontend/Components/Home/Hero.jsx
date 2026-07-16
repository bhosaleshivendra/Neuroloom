import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";

import prime from "../../src/assets/autobots/prime.png";
import bumblebee from "../../src/assets/autobots/bumblebee.png";
import jazz from "../../src/assets/autobots/jazz.png";
import ironhide from "../../src/assets/autobots/ironhide.png";
import ratchet from "../../src/assets/autobots/ratchet.png";

const autobots = [
  {
    name: "Prime",
    role: "Chief AI Officer",
    image: prime,
    greeting:
      "Greetings Commander. How may I assist you today?",
  },
  {
    name: "Bumblebee",
    role: "Scout & Communication",
    image: bumblebee,
    greeting:
      "Ready to explore new ideas together!",
  },
  {
    name: "Jazz",
    role: "Creative Strategist",
    image: jazz,
    greeting:
      "Let's build something incredible today.",
  },
  {
    name: "Ironhide",
    role: "Security Commander",
    image: ironhide,
    greeting:
      "All systems secure. Standing by.",
  },
  {
    name: "Ratchet",
    role: "Systems Engineer",
    image: ratchet,
    greeting:
      "Diagnostics complete. Everything is operational.",
  },
];

export default function Hero() {

  const [current, setCurrent] = useState(0);

  const bot = autobots[current];

  const next = () => {
    setCurrent((current + 1) % autobots.length);
  };

  const previous = () => {
    setCurrent(
      (current - 1 + autobots.length) % autobots.length
    );
  };

  return (

    <div className="p-8">

      <div
        className="
          bg-white
          rounded-3xl
          shadow-sm
          border
          border-slate-200
          overflow-hidden
          grid
          grid-cols-2
        "
      >

        {/* LEFT */}

        <div
          className="
            flex
            flex-col
            justify-center
            items-center
            p-10
            bg-gradient-to-br
            from-slate-900
            via-indigo-900
            to-blue-900
            text-white
          "
        >

          <div className="flex items-center gap-8">

            <button
              onClick={previous}
              className="
                bg-white/10
                hover:bg-white/20
                rounded-full
                p-3
                transition
              "
            >
              <ChevronLeft size={30} />
            </button>

            <img
              src={bot.image}
              alt={bot.name}
              className="h-80 object-contain"
            />

            <button
              onClick={next}
              className="
                bg-white/10
                hover:bg-white/20
                rounded-full
                p-3
                transition
              "
            >
              <ChevronRight size={30} />
            </button>

          </div>

          <h1 className="mt-8 text-5xl font-black">
            {bot.name}
          </h1>

          <p className="mt-3 text-xl text-indigo-200">
            {bot.role}
          </p>

        </div>

        {/* RIGHT */}

        <div className="flex flex-col h-[620px]">

          <div className="border-b px-8 py-6">

            <h2 className="text-3xl font-bold">
              Conversation
            </h2>

            <p className="text-slate-500 mt-2">
              Chat with {bot.name}
            </p>

          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6">

            <div className="flex">

              <div
                className="
                  bg-indigo-100
                  rounded-2xl
                  p-5
                  max-w-md
                "
              >
                {bot.greeting}
              </div>

            </div>

            <div className="flex justify-end">

              <div
                className="
                  bg-slate-900
                  text-white
                  rounded-2xl
                  p-5
                "
              >
                Hello!
              </div>

            </div>

          </div>

          <div className="border-t p-6">

            <div className="flex gap-3">

              <input
                placeholder={`Message ${bot.name}...`}
                className="
                  flex-1
                  border
                  rounded-xl
                  px-5
                  py-4
                  outline-none
                "
              />

              <button
                className="
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  px-6
                  rounded-xl
                  transition
                "
              >
                <Send size={22} />
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}