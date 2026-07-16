import { useState } from "react";
import { Search, UserPlus } from "lucide-react";

import HireAutobotModal from "./HireAutobotModal";
import EmployeeCard from "./EmployeeCard";

export default function Employees({
  employees,
  setEmployees,
}) {

  const [search, setSearch] = useState("");

  const [showHireModal, setShowHireModal] = useState(false);

  const filteredEmployees = employees.filter((employee) =>
    employee.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="p-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-900">
            Employees
          </h1>

          <p className="mt-2 text-slate-500">
            Hire and manage your Autobot workforce.
          </p>

        </div>

        <button
          onClick={() => setShowHireModal(true)}
          className="
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            px-6
            py-3
            rounded-xl
            flex
            items-center
            gap-2
            transition
          "
        >
          <UserPlus size={20} />

          Hire Autobot
        </button>

      </div>

      {/* Search */}

      <div className="relative mt-8">

        <Search
          size={20}
          className="absolute left-4 top-4 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search employee..."
          className="
            w-full
            bg-white
            border
            rounded-2xl
            py-4
            pl-12
            pr-5
            outline-none
          "
        />

      </div>

      {/* Employee Grid */}

      {filteredEmployees.length === 0 ? (

        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            mt-10
            p-20
            text-center
          "
        >

          <h2 className="text-3xl font-bold">
            No Employees Found
          </h2>

          <p className="mt-3 text-slate-500">
            Hire your first Autobot.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-4 gap-7 mt-10">

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
          close={() => setShowHireModal(false)}
        />

      )}

    </div>

  );

}