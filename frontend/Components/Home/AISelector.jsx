import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
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
    <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800/80 p-8 shadow-lg relative overflow-hidden group">
      {/* Glow Effect */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-500" />
      
      <h2 className="text-xl font-extrabold text-slate-100 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center justify-center gap-2 mb-8">
        <Sparkles size={18} className="text-indigo-400" />
        Cognitive Assistant Core
      </h2>

      <div className="flex items-center justify-between gap-6 max-w-2xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={previous}
          className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition cursor-pointer shrink-0"
        >
          <ChevronLeft size={24} />
        </button>

        {/* AI Card */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={bot.image}
              alt={bot.name}
              className="h-32 w-32 object-contain transition duration-500 hover:scale-110 filter drop-shadow-[0_0_15px_rgba(99,102,241,0.25)]"
            />
            <span className="absolute bottom-1 right-2 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-100">
            {bot.name}
          </h1>

          <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider mt-1">
            {bot.role}
          </p>

          <p className="mt-4 text-slate-400 text-xs leading-relaxed max-w-md italic">
            "{bot.greeting}"
          </p>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition cursor-pointer shrink-0"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}