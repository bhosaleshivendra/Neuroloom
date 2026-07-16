import { useState } from "react";
import { X, Building2, BriefcaseBusiness } from "lucide-react";

import prime from "../../src/assets/autobots/prime.png";

export default function CreateWorkspaceModal({
  close,
  createWorkspace,
}) {

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const handleCreate = () => {

    if (!name.trim()) {
      alert("Please enter a workspace name.");
      return;
    }

    createWorkspace({
      id: Date.now(),

      name,

      company: company || "Untitled Company",

      employees: [
        {
          id: 1,
          originalId: 1,
          name: "Prime",
          image: prime,
          role: "Chief Autobot",
          department: "Leadership",
        },
      ],

      tasks: [],

      departments: [],
    });

  };

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-[999]
      "
    >

      <div
        className="
          w-[500px]
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
        "
      >

        {/* Header */}

        <div
          className="
            flex
            justify-between
            items-center
            px-8
            py-6
            border-b
          "
        >

          <h2 className="text-2xl font-bold">
            Create Workspace
          </h2>

          <button
            onClick={close}
            className="cursor-pointer"
          >
            <X />
          </button>

        </div>

        {/* Body */}

        <div className="p-8 space-y-6">

          <div>

            <label className="font-medium text-slate-700">
              Workspace Name
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3">

              <BriefcaseBusiness
                className="text-slate-500"
                size={20}
              />

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Neuroloom ERP"
                className="
                  ml-3
                  outline-none
                  flex-1
                "
              />

            </div>

          </div>

          <div>

            <label className="font-medium text-slate-700">
              Company Name
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3">

              <Building2
                className="text-slate-500"
                size={20}
              />

              <input
                value={company}
                onChange={(e) =>
                  setCompany(e.target.value)
                }
                placeholder="Neuroloom Technologies"
                className="
                  ml-3
                  outline-none
                  flex-1
                "
              />

            </div>

          </div>

        </div>

        {/* Footer */}

        <div
          className="
            px-8
            py-6
            border-t
            flex
            justify-end
            gap-4
          "
        >

          <button
            onClick={close}
            className="
              px-6
              py-3
              rounded-xl
              border
              cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="
              px-6
              py-3
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              font-semibold
              transition
              cursor-pointer
            "
          >
            Create Workspace
          </button>

        </div>

      </div>

    </div>

  );

}