import {
  Building2,
  Plus,
} from "lucide-react";

export default function Departments() {
  return (
    <div className="p-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Departments
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all departments inside this workspace.
          </p>

        </div>

        <button
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
            cursor-pointer
          "
        >
          <Plus size={18} />

          New Department
        </button>

      </div>

      <div
        className="
          mt-12
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-20
          text-center
        "
      >

        <Building2
          size={70}
          className="mx-auto text-slate-300"
        />

        <h2 className="mt-6 text-3xl font-bold text-slate-800">
          Departments
        </h2>

        <p className="mt-4 text-slate-500">
          Department management will be added here.
        </p>

      </div>

    </div>
  );
}