import {
  BriefcaseBusiness,
  Building2,
  Star,
} from "lucide-react";

export default function EmployeeCard({ employee }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        overflow-hidden
      "
    >
      {/* Image */}

      <div className="bg-slate-100 flex justify-center py-8">

        <img
          src={employee.image}
          alt={employee.name}
          className="
            h-36
            object-contain
            transition
            duration-300
            hover:scale-110
          "
        />

      </div>

      {/* Content */}

      <div className="p-6">

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold text-slate-900">
            {employee.name}
          </h2>

          <Star
            size={20}
            className="text-yellow-500 fill-yellow-500"
          />

        </div>

        <div className="mt-5 space-y-4">

          <div className="flex items-center gap-3">

            <BriefcaseBusiness
              size={18}
              className="text-indigo-600"
            />

            <span className="text-slate-700">
              {employee.role}
            </span>

          </div>

          <div className="flex items-center gap-3">

            <Building2
              size={18}
              className="text-emerald-600"
            />

            <span className="text-slate-700">
              {employee.department}
            </span>

          </div>

        </div>

        {/* Status */}

        <div className="mt-8 flex justify-between items-center">

          <span
            className="
              bg-green-100
              text-green-700
              px-3
              py-1
              rounded-full
              text-sm
              font-semibold
            "
          >
            Active
          </span>

          <span className="text-slate-400 text-sm">
            #{employee.id}
          </span>

        </div>

      </div>

    </div>
  );
}