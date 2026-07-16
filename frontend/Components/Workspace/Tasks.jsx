import { useState } from "react";
import {
  Plus,
  CheckSquare,
} from "lucide-react";

export default function Tasks({
  workspace,
  tasks,
  setTasks,
}) {

  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [employeeId, setEmployeeId] = useState("");

  const createTask = () => {

    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    if (!employeeId) {
      alert("Please assign an employee.");
      return;
    }

    const employee = workspace.employees.find(
      (employee) => employee.id === Number(employeeId)
    );

    const newTask = {
      id: Date.now(),

      title,

      description,

      status: "Pending",

      assignedTo: employee.name,

      employeeId: employee.id,
    };

    setTasks([
      ...tasks,
      newTask,
    ]);

    setTitle("");

    setDescription("");

    setEmployeeId("");

    setShowModal(false);

  };

  return (

    <div className="p-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Tasks
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all assigned tasks.
          </p>

        </div>

        <button
          onClick={() => setShowModal(true)}
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
            cursor-pointer
          "
        >

          <Plus size={18} />

          New Task

        </button>

      </div>

      {
        tasks.length === 0 ? (

          <div
            className="
              mt-16
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-slate-200
              p-20
              text-center
            "
          >

            <CheckSquare
              size={60}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-6 text-3xl font-bold">
              No Tasks Yet
            </h2>

            <p className="mt-3 text-slate-500">
              Create your first task.
            </p>

          </div>

        ) : (

          <div className="grid gap-5 mt-10">

            {
              tasks.map((task) => (

                <div
                  key={task.id}
                  className="
                    bg-white
                    rounded-2xl
                    p-6
                    border
                    shadow-sm
                  "
                >

                  <h2 className="text-xl font-bold">
                    {task.title}
                  </h2>

                  <p className="mt-3 text-slate-500">
                    {task.description}
                  </p>

                  <div className="mt-6 flex justify-between">

                    <span className="font-semibold">
                      {task.assignedTo}
                    </span>

                    <span
                      className="
                        bg-yellow-100
                        text-yellow-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                      "
                    >
                      {task.status}
                    </span>

                  </div>

                </div>

              ))
            }

          </div>

        )
      }

      {
        showModal && (

          <div
            className="
              fixed
              inset-0
              bg-black/40
              flex
              items-center
              justify-center
              z-50
            "
          >

            <div
              className="
                bg-white
                rounded-3xl
                w-[520px]
                p-8
              "
            >

              <h2 className="text-3xl font-bold">
                Assign Task
              </h2>

              <input

                value={title}

                onChange={(e)=>setTitle(e.target.value)}

                placeholder="Task Title"

                className="
                  w-full
                  border
                  rounded-xl
                  p-4
                  mt-8
                  outline-none
                "

              />

              <textarea

                value={description}

                onChange={(e)=>setDescription(e.target.value)}

                placeholder="Description"

                rows={4}

                className="
                  w-full
                  border
                  rounded-xl
                  p-4
                  mt-5
                  outline-none
                "

              />

              <select

                value={employeeId}

                onChange={(e)=>setEmployeeId(e.target.value)}

                className="
                  w-full
                  border
                  rounded-xl
                  p-4
                  mt-5
                "

              >

                <option value="">
                  Select Employee
                </option>

                {
                  workspace.employees.map((employee)=>(

                    <option
                      key={employee.id}
                      value={employee.id}
                    >

                      {employee.name}

                    </option>

                  ))
                }

              </select>

              <div className="flex justify-end gap-4 mt-8">

                <button

                  onClick={()=>setShowModal(false)}

                  className="
                    px-6
                    py-3
                    border
                    rounded-xl
                  "

                >

                  Cancel

                </button>

                <button

                  onClick={createTask}

                  className="
                    px-6
                    py-3
                    rounded-xl
                    bg-indigo-600
                    text-white
                    hover:bg-indigo-700
                  "

                >

                  Create Task

                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>

  );

}