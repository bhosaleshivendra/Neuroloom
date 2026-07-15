import autobots from "../../src/data/autobots.js";
import {
  X,
  BriefcaseBusiness,
  Building2,
  Sparkles,
} from "lucide-react";

export default function HireAutobotModal({
  employees,
  hireAutobot,
  close,
}) {
  const available = autobots.filter(
    (bot) => !employees.find((emp) => emp.name === bot.name)
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-6 z-50">

      <div className="bg-white w-[950px] max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}

        <div className="flex justify-between items-center px-8 py-6 border-b border-slate-200">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Hire Autobot
            </h1>

            <p className="text-slate-500 mt-1">
              Expand your AI workforce with specialized AI employees.
            </p>
          </div>

          <button
            onClick={close}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 flex justify-center items-center transition cursor-pointer"
          >
            <X className="text-slate-600" />
          </button>

        </div>

        {/* Body */}

        <div className="overflow-y-auto p-8">

          <div className="grid grid-cols-2 gap-6">

            {available.map((bot) => (

              <div
                key={bot.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >

                {/* Top */}

                <div className="flex items-center gap-5">

                  <img
                    src={bot.image}
                    alt={bot.name}
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-200 bg-slate-100"
                  />

                  <div>

                    <h2 className="text-2xl font-bold text-slate-900">
                      {bot.name}
                    </h2>

                    <span className="inline-block mt-2 bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full">
                      {bot.department}
                    </span>

                  </div>

                </div>

                {/* Role */}

                <div className="flex items-center gap-2 mt-6 text-slate-600">

                  <BriefcaseBusiness size={18} />

                  <span>{bot.role}</span>

                </div>

                {/* Department */}

                <div className="flex items-center gap-2 mt-3 text-slate-600">

                  <Building2 size={18} />

                  <span>{bot.department}</span>

                </div>

                {/* Description */}

                <p className="mt-5 text-sm leading-6 text-slate-500">
                  {bot.description}
                </p>

                {/* Skills */}

                <div className="flex flex-wrap gap-2 mt-5">

                  {bot.skills.map((skill, index) => (

                    <span
                      key={index}
                      className="bg-slate-100 text-slate-700 text-xs px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

                {/* Button */}

                <button
                  onClick={() => hireAutobot(bot)}
                  className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition cursor-pointer"
                >
                  Hire Autobot
                </button>

              </div>

            ))}

          </div>

          {available.length === 0 && (

            <div className="flex flex-col items-center justify-center py-20">

              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">

                <Sparkles
                  size={42}
                  className="text-indigo-600"
                />

              </div>

              <h2 className="mt-6 text-3xl font-bold text-slate-900">
                All Autobots Hired
              </h2>

              <p className="mt-3 text-slate-500 text-center max-w-lg">
                Every available Autobot has already joined your company.
                More AI employees will become available in future updates.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}