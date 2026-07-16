import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function AISelector({
  autobots,
  currentBot,
  setCurrentBot,
}) {

  const bot = autobots[currentBot];

  function previous() {
    setCurrentBot(
      (currentBot - 1 + autobots.length) % autobots.length
    );
  }

  function next() {
    setCurrentBot(
      (currentBot + 1) % autobots.length
    );
  }

  return (

    <div
      className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-8
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          text-center
          mb-8
        "
      >
        Active AI Assistant
      </h2>

      <div
        className="
          flex
          items-center
          justify-center
          gap-12
        "
      >

        {/* Left Arrow */}

        <button
          onClick={previous}
          className="
            p-3
            rounded-full
            hover:bg-slate-100
            transition
          "
        >

          <ChevronLeft size={30} />

        </button>

        {/* AI Card */}

        <div className="flex flex-col items-center">

          <img
            src={bot.image}
            alt={bot.name}
            className="
              h-28
              object-contain
              transition-all
              duration-300
            "
          />

          <h1
            className="
              mt-4
              text-3xl
              font-bold
            "
          >
            {bot.name}
          </h1>

          <p className="text-slate-500">

            {bot.role}

          </p>

          <div
            className="
              mt-4
              flex
              items-center
              gap-2
            "
          >

            <div
              className="
                w-3
                h-3
                rounded-full
                bg-green-500
              "
            />

            <span
              className="
                font-semibold
                text-green-600
              "
            >
              {bot.status}
            </span>

          </div>

          <p
            className="
              mt-5
              text-center
              text-slate-600
              italic
              max-w-lg
            "
          >
            "{bot.greeting}"
          </p>

        </div>

        {/* Right Arrow */}

        <button
          onClick={next}
          className="
            p-3
            rounded-full
            hover:bg-slate-100
            transition
          "
        >

          <ChevronRight size={30} />

        </button>

      </div>

    </div>

  );

}