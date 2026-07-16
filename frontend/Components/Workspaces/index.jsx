import { useState } from "react";
import { Plus, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import './index.css';

export default function Workspaces({
  workspaces,
  setWorkspaces,
}) {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  return (

    <div className="min-h-full bg-slate-100 p-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold text-slate-900">
            Workspaces
          </h1>

          <p className="mt-2 text-slate-500">
            Every workspace is an independent AI-powered company.
          </p>

        </div>

        <button

          onClick={() => setShowModal(true)}

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
            transition
          "

        >

          <Plus size={20}/>

          Create Workspace

        </button>

      </div>





      {/* Workspace Grid */}

      <div

        className="
          mt-10

          grid

          grid-cols-3

          gap-8
        "

      >

        {

          workspaces.map((workspace)=>(

            <div

              key={workspace.id}

              className="
                bg-white

                rounded-3xl

                border
                border-slate-200

                p-7

                hover:-translate-y-1
                hover:shadow-xl

                transition

                cursor-pointer
              "

            >

              {/* Company Icon */}

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

                <Building2

                  size={34}

                  className="text-indigo-600"

                />

              </div>





              <h2

                className="
                  mt-6

                  text-2xl

                  font-bold

                  text-slate-900
                "

              >

                {workspace.name}

              </h2>





              <p

                className="
                  mt-2

                  text-slate-500
                "

              >

                {workspace.company}

              </p>





              <span

                className="
                  inline-block

                  mt-4

                  bg-indigo-100

                  text-indigo-700

                  px-3
                  py-1

                  rounded-full

                  text-sm
                "

              >

                {workspace.industry}

              </span>







              <div

                className="
                  mt-6

                  flex

                  justify-between

                  items-center
                "

              >

                <div>

                  <p

                    className="
                      text-sm
                      text-slate-500
                    "

                  >

                    Employees

                  </p>

                  <h3

                    className="
                      text-3xl

                      font-bold

                      text-indigo-600
                    "

                  >

                    {workspace.employees.length}

                  </h3>

                </div>







                <button

                  onClick={() =>

                    navigate(`/workspace/${workspace.id}`)

                  }

                  className="
                    bg-indigo-600

                    hover:bg-indigo-700

                    text-white

                    px-5

                    py-3

                    rounded-xl

                    font-semibold

                    cursor-pointer

                    transition
                  "

                >

                  Open →

                </button>

              </div>

            </div>

          ))

        }

      </div>







      {/* Placeholder */}

      {

        showModal && (

          <div

            className="
              fixed

              inset-0

              bg-black/40

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

                p-10

                text-center

                shadow-xl
              "

            >

              <h2

                className="
                  text-2xl

                  font-bold
                "

              >

                Create Workspace

              </h2>

              <p

                className="
                  mt-4

                  text-slate-500
                "

              >

                Modal coming in next step...

              </p>

              <button

                onClick={() => setShowModal(false)}

                className="
                  mt-8

                  bg-indigo-600

                  text-white

                  px-5

                  py-3

                  rounded-xl
                "

              >

                Close

              </button>

            </div>

          </div>

        )

      }

    </div>

  );

}