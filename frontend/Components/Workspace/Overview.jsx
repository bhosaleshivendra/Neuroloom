import {
  Users,
  CheckSquare,
  Building2,
  BrainCircuit,
} from "lucide-react";

export default function Overview({ workspace }) {
  return (
    <div className="p-8">

      {/* Heading */}

      <div>

        <h1 className="text-4xl font-bold text-slate-900">
          Overview
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome to {workspace.name}
        </p>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-4 gap-6 mt-10">

        {/* Employees */}

        <div className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
          border
          border-slate-200
        ">

          <div className="flex justify-between items-center">

            <Users
              size={30}
              className="text-indigo-600"
            />

            <span className="text-slate-400">
              Employees
            </span>

          </div>

          <h2 className="mt-8 text-5xl font-bold text-slate-900">
            {workspace.employees.length}
          </h2>

        </div>

        {/* Tasks */}

        <div className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
          border
          border-slate-200
        ">

          <div className="flex justify-between items-center">

            <CheckSquare
              size={30}
              className="text-emerald-600"
            />

            <span className="text-slate-400">
              Active Tasks
            </span>

          </div>

          <h2 className="mt-8 text-5xl font-bold text-slate-900">
            {workspace.tasks.length}
          </h2>

        </div>

        {/* Departments */}

        <div className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
          border
          border-slate-200
        ">

          <div className="flex justify-between items-center">

            <Building2
              size={30}
              className="text-orange-500"
            />

            <span className="text-slate-400">
              Departments
            </span>

          </div>

          <h2 className="mt-8 text-5xl font-bold text-slate-900">
            {workspace.departments.length}
          </h2>

        </div>

        {/* Prime */}

        <div className="
          bg-white
          rounded-3xl
          p-6
          shadow-sm
          border
          border-slate-200
        ">

          <div className="flex justify-between items-center">

            <BrainCircuit
              size={30}
              className="text-cyan-600"
            />

            <span className="text-slate-400">
              Prime
            </span>

          </div>

          <h2 className="
            mt-8
            text-2xl
            font-bold
            text-green-600
          ">
            ONLINE
          </h2>

        </div>

      </div>

      {/* Workspace Information */}

      <div className="
        mt-10
        bg-white
        rounded-3xl
        p-8
        shadow-sm
        border
        border-slate-200
      ">

        <h2 className="text-2xl font-bold text-slate-900">
          Workspace Information
        </h2>

        <div className="grid grid-cols-2 gap-8 mt-8">

          <div>

            <p className="text-slate-500">
              Workspace Name
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              {workspace.name}
            </h3>

          </div>

          <div>

            <p className="text-slate-500">
              Company
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              {workspace.company}
            </h3>

          </div>

          <div>

            <p className="text-slate-500">
              Total Employees
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              {workspace.employees.length}
            </h3>

          </div>

          <div>

            <p className="text-slate-500">
              Active Tasks
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              {workspace.tasks.length}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}