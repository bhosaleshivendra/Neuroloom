import { useState } from "react";
import { Search, UserPlus } from "lucide-react";

import HireAutobotModal from "./HireAutobotModal";
import EmployeeCard from "./EmployeeCard";

export default function Employees({
  employees,
  setEmployees,
  workspace,
  updateWorkspace,
}) {

  const [search, setSearch] = useState("");

  const [showHireModal, setShowHireModal] = useState(false);

  const filteredEmployees = (employees || []).filter((employee) =>
    employee.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="p-8 text-slate-100">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-extrabold text-slate-100 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Personnel Command
          </h1>

          <p className="mt-2 text-slate-400 text-sm">
            Deploy and manage active Autobot units in this workspace.
          </p>

        </div>

        <button
          onClick={() => setShowHireModal(true)}
          className="
            bg-indigo-600
            hover:bg-indigo-500
            text-white
            px-6
            py-3
            rounded-xl
            flex
            items-center
            gap-2
            transition
            cursor-pointer
            text-sm
            font-semibold
            shadow-lg shadow-indigo-600/10
          "
        >
          <UserPlus size={18} />

          Request Reinforcements
        </button>

      </div>

      {/* Search */}

      <div className="relative mt-8">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter operational personnel..."
          className="
            w-full
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            py-4
            pl-12
            pr-5
            text-slate-100
            outline-none
            focus:border-indigo-500
            transition
          "
        />

      </div>

      {/* Employee Grid */}

      {filteredEmployees.length === 0 ? (

        <div
          className="
            bg-slate-900/40
            rounded-3xl
            border
            border-slate-800/80
            mt-10
            p-20
            text-center
          "
        >

          <h2 className="text-2xl font-bold text-slate-300">
            No Active Units Matching Filters
          </h2>

          <p className="mt-3 text-slate-500 text-sm">
            Deploy reinforcements from the Command modal.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-10">

          {filteredEmployees.map((employee) => (

            <EmployeeCard
              key={employee.id}
              employee={employee}
            />

          ))}

        </div>

      )}

      {showHireModal && (

        <HireAutobotModal
          employees={employees}
          setEmployees={setEmployees}
          workspace={workspace}
          updateWorkspace={updateWorkspace}
          close={() => setShowHireModal(false)}
        />

      )}

    </div>

  );

}