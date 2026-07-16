import { useState } from "react";
import autobots from "../../../src/data/autobots";

import {
  X,
  Search,
  BriefcaseBusiness,
  Building2,
} from "lucide-react";

export default function HireAutobotModal({
  employees,
  setEmployees,
  close,
}) {

  const [search, setSearch] = useState("");

  const filteredAutobots = autobots.filter((bot) =>
    bot.name.toLowerCase().includes(search.toLowerCase())
  );

  const hire = (bot) => {

    const alreadyExists = employees.find(
      (employee) => employee.originalId === bot.id
    );

    if (alreadyExists) {
      alert(`${bot.name} is already hired.`);
      return;
    }

    setEmployees([
      ...employees,
      {
        id: Date.now(),
        originalId: bot.id,
        name: bot.name,
        image: bot.image,
        role: bot.role,
        department: bot.department,
      },
    ]);

    close();
  };

  return (

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="w-[1200px] h-[750px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}

        <div className="flex justify-between items-center px-8 py-6 border-b">

          <div>

            <h1 className="text-3xl font-bold">
              Hire Autobot
            </h1>

            <p className="text-slate-500 mt-2">
              Recruit AI employees for this workspace.
            </p>

          </div>

          <button
            onClick={close}
            className="cursor-pointer"
          >
            <X size={28} />
          </button>

        </div>

        {/* Search */}

        <div className="p-8">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Autobots..."
              className="
                w-full
                border
                rounded-2xl
                py-4
                pl-12
                pr-5
                outline-none
              "
            />

          </div>

        </div>

        {/* Bots */}

        <div className="flex-1 overflow-y-auto px-8 pb-8">

          <div className="grid grid-cols-4 gap-6">

            {filteredAutobots.map((bot) => {

              const hired = employees.some(
                (employee) => employee.originalId === bot.id
              );

              return (

                <div
                  key={bot.id}
                  className="
                    bg-white
                    border
                    rounded-3xl
                    shadow-sm
                    hover:shadow-xl
                    transition
                    overflow-hidden
                  "
                >

                  <div className="bg-slate-100 flex justify-center py-8">

                    <img
                      src={bot.image}
                      alt={bot.name}
                      className="h-36 object-contain"
                    />

                  </div>

                  <div className="p-6">

                    <h2 className="text-2xl font-bold">
                      {bot.name}
                    </h2>

                    <div className="mt-5 space-y-3">

                      <div className="flex items-center gap-3">

                        <BriefcaseBusiness
                          size={18}
                          className="text-indigo-600"
                        />

                        <span>
                          {bot.role}
                        </span>

                      </div>

                      <div className="flex items-center gap-3">

                        <Building2
                          size={18}
                          className="text-emerald-600"
                        />

                        <span>
                          {bot.department}
                        </span>

                      </div>

                    </div>

                    <button
                      disabled={hired}
                      onClick={() => hire(bot)}
                      className={`
                        mt-8
                        w-full
                        py-3
                        rounded-xl
                        font-semibold
                        transition

                        ${
                          hired
                            ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                        }
                      `}
                    >
                      {hired ? "Already Hired" : "Hire"}
                    </button>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </div>

    </div>

  );

}