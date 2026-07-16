
import { useState } from "react";
import { X } from "lucide-react";
import './index.css';

export default function CreateWorkspaceModal({
  close,
  workspaces,
  setWorkspaces,
}) {

  const [workspaceName, setWorkspaceName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("Technology");

  const createWorkspace = () => {

    if (!workspaceName.trim()) return;

    const workspace = {

      id: Date.now(),

      name: workspaceName,

      company: companyName || workspaceName,

      industry,

      employees: [],

      departments: [],

      tasks: [],

      analytics: {},

    };

    setWorkspaces([
      ...workspaces,
      workspace,
    ]);

    close();

  };

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/40
        backdrop-blur-sm
        flex
        justify-center
        items-center
        z-50
      "
    >

      <div
        className="
          bg-white
          rounded-3xl
          w-[650px]
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

          <div>

            <h1
              className="
                text-3xl
                font-bold
              "
            >
              Create Workspace
            </h1>

            <p className="text-slate-500 mt-2">
              Every workspace represents one company.
            </p>

          </div>

          <button
            onClick={close}
            className="
              w-10
              h-10
              rounded-xl
              hover:bg-slate-100
              flex
              justify-center
              items-center
              cursor-pointer
            "
          >
            <X />
          </button>

        </div>

        {/* Body */}

        <div className="p-8 space-y-6">

          <div>

            <label className="font-semibold">
              Workspace Name
            </label>

            <input

              value={workspaceName}

              onChange={(e)=>setWorkspaceName(e.target.value)}

              placeholder="Neuroloom ERP"

              className="
                mt-2
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-indigo-600
              "

            />

          </div>



          <div>

            <label className="font-semibold">
              Company Name
            </label>

            <input

              value={companyName}

              onChange={(e)=>setCompanyName(e.target.value)}

              placeholder="Neuroloom Technologies"

              className="
                mt-2
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-indigo-600
              "

            />

          </div>



          <div>

            <label className="font-semibold">
              Industry
            </label>

            <select

              value={industry}

              onChange={(e)=>setIndustry(e.target.value)}

              className="
                mt-2
                w-full
                border
                rounded-xl
                px-4
                py-3
              "

            >

              <option>Technology</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Finance</option>
              <option>Manufacturing</option>
              <option>Retail</option>
              <option>Logistics</option>

            </select>

          </div>



          <button

            onClick={createWorkspace}

            className="
              w-full
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              py-4
              rounded-xl
              font-semibold
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