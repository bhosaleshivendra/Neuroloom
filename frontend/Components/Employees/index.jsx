import "./index.css";

import { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import HireAutobotModal from "./HireAutobotModal";

export default function Employees() {
  const [open, setOpen] = useState(false);

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Prime",
      role: "Chief Autobot",
      department: "Leadership",
    },
  ]);

  const hireAutobot = (bot) => {
    if (employees.find((emp) => emp.name === bot.name)) return;

    setEmployees([...employees, bot]);

    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-900">
            Employees
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your AI workforce and hire new Autobots.
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition cursor-pointer shadow-sm"
        >
          Hire Autobot
        </button>

      </div>

      {/* Summary Card */}

      <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-slate-800">
          Total Employees
        </h2>

        <p className="text-4xl font-bold mt-3 text-indigo-600">
          {employees.length}
        </p>

      </div>

      {/* Employee Grid */}

      <div className="grid grid-cols-3 gap-6 mt-8">

        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
          />
        ))}

      </div>

      {/* Hire Modal */}

      {open && (
        <HireAutobotModal
          employees={employees}
          hireAutobot={hireAutobot}
          close={() => setOpen(false)}
        />
      )}

    </div>
  );
}