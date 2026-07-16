import { useState } from "react";
import {
  FolderKanban,
  Plus,
  CalendarDays,
  Users,
  ArrowRight,
  CircleCheckBig,
  Clock3,
} from "lucide-react";
import './index.css';
export default function Projects({ workspace }) {
  const [projects] = useState([
    {
      id: 1,
      name: "Neuroloom ERP",
      description:
        "Build the next generation AI-powered ERP platform.",
      status: "In Progress",
      progress: 68,
      due: "25 Jul 2026",
      members: workspace.employees.length,
    },

    {
      id: 2,
      name: "Landing Website",
      description:
        "Company website and marketing pages.",
      status: "Planning",
      progress: 20,
      due: "2 Aug 2026",
      members: 3,
    },

    {
      id: 3,
      name: "Mobile Application",
      description:
        "React Native mobile application.",
      status: "Completed",
      progress: 100,
      due: "10 Jul 2026",
      members: 5,
    },
  ]);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Projects
          </h1>

          <p className="text-slate-500 mt-2">
            Manage every project inside this workspace.
          </p>

        </div>

        <button
          className="
            flex
            items-center
            gap-2

            bg-indigo-600
            hover:bg-indigo-700

            text-white

            px-6
            py-3

            rounded-xl

            font-semibold

            cursor-pointer
          "
        >

          <Plus size={20} />

          New Project

        </button>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-2 gap-8">

        {projects.map((project) => (

          <div
            key={project.id}
            className="
              bg-white

              rounded-3xl

              border

              border-slate-200

              shadow-sm

              hover:shadow-xl

              transition

              p-7
            "
          >

            <div className="flex justify-between items-start">

              <div
                className="
                  w-16
                  h-16

                  rounded-2xl

                  bg-indigo-100

                  flex

                  items-center

                  justify-center
                "
              >

                <FolderKanban
                  className="text-indigo-600"
                  size={32}
                />

              </div>

              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-sm

                  ${
                    project.status === "Completed"
                      ? "bg-green-100 text-green-700"

                      : project.status === "Planning"
                      ? "bg-yellow-100 text-yellow-700"

                      : "bg-indigo-100 text-indigo-700"
                  }
                `}
              >
                {project.status}
              </span>

            </div>

            <h2 className="text-2xl font-bold mt-6">
              {project.name}
            </h2>

            <p className="mt-3 text-slate-500 leading-7">
              {project.description}
            </p>

            {/* Progress */}

            <div className="mt-8">

              <div className="flex justify-between">

                <span>Progress</span>

                <span>{project.progress}%</span>

              </div>

              <div className="mt-3 h-3 rounded-full bg-slate-200">

                <div
                  style={{
                    width: `${project.progress}%`,
                  }}
                  className="
                    h-full
                    rounded-full
                    bg-indigo-600
                  "
                />

              </div>

            </div>

            {/* Footer */}

            <div className="flex justify-between mt-8">

              <div className="flex items-center gap-2">

                <Users size={18} />

                <span>{project.members}</span>

              </div>

              <div className="flex items-center gap-2">

                <CalendarDays size={18} />

                <span>{project.due}</span>

              </div>

            </div>

            <button
              className="
                mt-8

                w-full

                bg-slate-900
                hover:bg-black

                text-white

                rounded-xl

                py-3

                flex

                items-center

                justify-center

                gap-2

                cursor-pointer
              "
            >

              Open Project

              <ArrowRight size={18} />

            </button>

          </div>

        ))}

      </div>

      {/* Summary */}

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl border border-slate-200 p-6">

          <div className="flex items-center gap-3">

            <CircleCheckBig className="text-green-600" />

            <h2 className="font-semibold">
              Completed
            </h2>

          </div>

          <p className="text-4xl font-bold mt-4">
            1
          </p>

        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6">

          <div className="flex items-center gap-3">

            <Clock3 className="text-indigo-600" />

            <h2 className="font-semibold">
              Active
            </h2>

          </div>

          <p className="text-4xl font-bold mt-4">
            2
          </p>

        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6">

          <div className="flex items-center gap-3">

            <Users className="text-orange-600" />

            <h2 className="font-semibold">
              AI Employees
            </h2>

          </div>

          <p className="text-4xl font-bold mt-4">
            {workspace.employees.length}
          </p>

        </div>

      </div>

    </div>
  );
}