import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Users,
  CheckSquare,
  Bot,
  ArrowRight,
} from "lucide-react";

export default function WorkspaceCarousel({
  workspaces,
  setCurrentWorkspaceId,
}) {

  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  if (workspaces.length === 0) {

    return (

      <div className="mt-10">

        <h2 className="text-3xl font-bold text-center mb-8">
          Your Workspaces
        </h2>

        <div
          className="
            bg-white
            rounded-3xl
            border
            shadow-sm
            p-16
            text-center
          "
        >

          <FolderKanban
            size={70}
            className="mx-auto text-slate-300"
          />

          <h3 className="text-2xl font-bold mt-6">
            No Workspaces Yet
          </h3>

          <p className="text-slate-500 mt-3">
            Create your first workspace from the Projects page.
          </p>

        </div>

      </div>

    );

  }

  const workspace = workspaces[currentIndex];

  function previous() {

    setCurrentIndex(
      (currentIndex - 1 + workspaces.length) %
        workspaces.length
    );

  }

  function next() {

    setCurrentIndex(
      (currentIndex + 1) %
        workspaces.length
    );

  }

  function openWorkspace() {

    if (setCurrentWorkspaceId) {
      setCurrentWorkspaceId(workspace.id);
    }

    navigate(`/workspace/${workspace.id}`);

  }

  return (

    <div className="mt-10">

      <h2 className="text-3xl font-bold text-center mb-10">
        Your Workspaces
      </h2>

      <div
        className="
          flex
          items-center
          justify-center
          gap-8
        "
      >

        {/* Left */}

        <button
          onClick={previous}
          className="
            w-14
            h-14
            rounded-full
            bg-white
            border
            shadow-sm
            hover:shadow-lg
            hover:scale-105
            transition
            flex
            items-center
            justify-center
          "
        >

          <ChevronLeft size={28} />

        </button>

        {/* Workspace Card */}

        <div
          className="
            w-[420px]
            bg-white
            rounded-3xl
            shadow-sm
            border
            overflow-hidden
          "
        >

          {/* Header */}

          <div
            className="
              bg-gradient-to-r
              from-indigo-600
              to-blue-500
              text-white
              p-7
            "
          >

            <h3 className="text-3xl font-bold">

              {workspace.name}

            </h3>

            <p className="mt-2 text-indigo-100">

              {workspace.company}

            </p>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-4 p-6">

            <div className="text-center">

              <Users
                size={24}
                className="mx-auto text-indigo-600"
              />

              <h4 className="text-2xl font-bold mt-2">
                {workspace.employees.length}
              </h4>

              <p className="text-sm text-slate-500">
                Employees
              </p>

            </div>

            <div className="text-center">

              <CheckSquare
                size={24}
                className="mx-auto text-green-600"
              />

              <h4 className="text-2xl font-bold mt-2">
                {workspace.tasks.length}
              </h4>

              <p className="text-sm text-slate-500">
                Tasks
              </p>

            </div>

            <div className="text-center">

              <Bot
                size={24}
                className="mx-auto text-orange-500"
              />

              <h4 className="text-2xl font-bold mt-2">
                {workspace.employees.length}
              </h4>

              <p className="text-sm text-slate-500">
                Autobots
              </p>

            </div>

          </div>

          {/* Button */}

          <div className="p-6 pt-0">

            <button
              onClick={openWorkspace}
              className="
                w-full
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                rounded-2xl
                py-4
                flex
                justify-center
                items-center
                gap-3
                transition
              "
            >

              Open Workspace

              <ArrowRight size={20} />

            </button>

          </div>

        </div>

        {/* Right */}

        <button
          onClick={next}
          className="
            w-14
            h-14
            rounded-full
            bg-white
            border
            shadow-sm
            hover:shadow-lg
            hover:scale-105
            transition
            flex
            items-center
            justify-center
          "
        >

          <ChevronRight size={28} />

        </button>

      </div>

      {/* Dots */}

      <div className="flex justify-center gap-3 mt-8">

        {workspaces.map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-3
              h-3
              rounded-full
              transition-all

              ${
                currentIndex === index
                  ? "bg-indigo-600 w-8"
                  : "bg-slate-300"
              }
            `}
          />

        ))}

      </div>

    </div>

  );

}