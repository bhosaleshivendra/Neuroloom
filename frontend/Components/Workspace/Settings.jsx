import {
  Settings as SettingsIcon,
  Save,
  Trash2,
} from "lucide-react";

export default function Settings({ workspace }) {
  return (
    <div className="p-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold text-slate-900">
          Workspace Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Configure this workspace.
        </p>

      </div>

      {/* General Settings */}

      <div
        className="
          mt-10
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-8
        "
      >

        <div className="flex items-center gap-3">

          <SettingsIcon
            size={28}
            className="text-indigo-600"
          />

          <h2 className="text-2xl font-bold">
            General
          </h2>

        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">

          <div>

            <label className="text-slate-500">
              Workspace Name
            </label>

            <input
              value={workspace.name}
              readOnly
              className="
                mt-2
                w-full
                border
                rounded-xl
                p-4
                bg-slate-50
              "
            />

          </div>

          <div>

            <label className="text-slate-500">
              Company
            </label>

            <input
              value={workspace.company}
              readOnly
              className="
                mt-2
                w-full
                border
                rounded-xl
                p-4
                bg-slate-50
              "
            />

          </div>

        </div>

        <button
          className="
            mt-8
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

          <Save size={18} />

          Save Changes

        </button>

      </div>

      {/* Danger Zone */}

      <div
        className="
          mt-8
          bg-white
          rounded-3xl
          border
          border-red-200
          shadow-sm
          p-8
        "
      >

        <h2 className="text-2xl font-bold text-red-600">
          Danger Zone
        </h2>

        <p className="mt-3 text-slate-500">
          Deleting this workspace will permanently remove all employees,
          tasks, analytics and project data.
        </p>

        <button
          className="
            mt-8
            bg-red-600
            hover:bg-red-700
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

          <Trash2 size={18} />

          Delete Workspace

        </button>

      </div>

    </div>
  );
}