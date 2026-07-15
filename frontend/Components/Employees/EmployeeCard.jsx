import "./index.css";
import {
  BriefcaseBusiness,
  Building2,
  Circle,
} from "lucide-react";

export default function EmployeeCard({ employee }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">

      {/* Avatar */}

      <img
        src={employee.image}
        alt={employee.name}
        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 bg-slate-100"
      />

      {/* Name */}

      <h2 className="text-2xl font-semibold text-slate-900 mt-5">
        {employee.name}
      </h2>

      {/* Role */}

      <div className="flex items-center gap-2 mt-4 text-slate-600">
        <BriefcaseBusiness size={17} />
        <span>{employee.role}</span>
      </div>

      {/* Department */}

      <div className="flex items-center gap-2 mt-2 text-slate-600">
        <Building2 size={17} />
        <span>{employee.department}</span>
      </div>

      {/* Status */}

      <div className="flex items-center gap-2 mt-6">
        <Circle
          size={10}
          fill="#22c55e"
          className="text-green-500"
        />

        <span className="text-sm text-slate-500">
          Active
        </span>
      </div>

      {/* Footer */}

      <button className="mt-6 w-full border border-slate-200 rounded-xl py-2.5 text-slate-700 hover:bg-slate-100 transition cursor-pointer">
        View Profile
      </button>

    </div>
  );
}