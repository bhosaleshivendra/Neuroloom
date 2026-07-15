import { useState } from "react";

import autobots from "../../src/data/autobots.js";

import {
  X,
  BriefcaseBusiness,
  Building2,
  Sparkles,
} from "lucide-react";


export default function HireAutobotModal({
  employees,
  hireAutobot,
  close,
}) {


  const available = autobots.filter(
    (bot) =>
      bot.availableForHire &&
      !employees.some(
        (emp) => emp.originalId === bot.id
      )
  );



  const [selectedBot, setSelectedBot] = useState(null);

  const [name, setName] = useState("");

  const [department, setDepartment] = useState("");




  const selectBot = (bot) => {

    setSelectedBot(bot);

    setName(bot.name);

    setDepartment(bot.department);

  };





  const handleHire = () => {

    if (!selectedBot) return;


    const employee = {

      id: Date.now(),

      originalId: selectedBot.id,

      name,

      image: selectedBot.image,

      role: selectedBot.role,

      department,

      description: selectedBot.description,

      skills: selectedBot.skills,

    };


    hireAutobot(employee);

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
        p-6
        z-50
      "
    >


      <div
        className="
          bg-white
          w-[950px]
          max-h-[85vh]
          rounded-3xl
          shadow-2xl
          flex
          flex-col
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
            border-slate-200
          "
        >

          <div>

            <h1
              className="
                text-3xl
                font-bold
                text-slate-900
              "
            >
              Hire Autobot
            </h1>


            <p className="text-slate-500 mt-1">
              Choose an AI employee and customize their identity.
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
              items-center
              justify-center
              transition
              cursor-pointer
            "
          >

            <X />

          </button>


        </div>





        {/* Body */}

        <div
          className="
            overflow-y-auto
            p-8
          "
        >



          {/* Available Autobots */}

          <h2
            className="
              text-xl
              font-bold
              text-slate-900
              mb-5
            "
          >
            Choose Avatar
          </h2>




          <div
            className="
              grid
              grid-cols-4
              gap-5
            "
          >


            {
              available.map((bot)=>(

                <div

                  key={bot.id}

                  onClick={() => selectBot(bot)}

                  className={`
                    border
                    rounded-2xl
                    p-5
                    cursor-pointer
                    transition-all
                    duration-300

                    ${
                      selectedBot?.id === bot.id
                      ?
                      "border-indigo-600 bg-indigo-50 shadow-md"
                      :
                      "border-slate-200 hover:shadow-lg"
                    }
                  `}

                >


                  <div
                    className="
                      w-24
                      h-24
                      mx-auto
                      bg-slate-100
                      rounded-2xl
                      p-2
                    "
                  >

                    <img

                      src={bot.image}

                      alt={bot.name}

                      className="
                        w-full
                        h-full
                        object-contain
                      "

                    />

                  </div>



                  <h3
                    className="
                      text-center
                      font-bold
                      mt-4
                    "
                  >
                    {bot.name}
                  </h3>



                  <p
                    className="
                      text-center
                      text-sm
                      text-slate-500
                      mt-1
                    "
                  >
                    {bot.role}
                  </p>


                </div>

              ))
            }


          </div>






          {/* Customization */}

          {
            selectedBot && (

              <div
                className="
                  mt-10
                  border-t
                  pt-8
                  space-y-6
                "
              >


                {/* Preview */}

                <div
                  className="
                    flex
                    items-center
                    gap-5
                    bg-slate-50
                    p-5
                    rounded-2xl
                  "
                >

                  <img

                    src={selectedBot.image}

                    className="
                      w-24
                      h-24
                      object-contain
                    "

                  />


                  <div>

                    <h2 className="text-2xl font-bold">
                      {name}
                    </h2>


                    <p className="text-slate-500">
                      {selectedBot.role}
                    </p>

                  </div>


                </div>






                {/* Name */}

                <div>

                  <label className="font-semibold">
                    Employee Name
                  </label>


                  <input

                    value={name}

                    onChange={(e)=>setName(e.target.value)}

                    className="
                      mt-2
                      w-full
                      border
                      border-slate-300
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:border-indigo-500
                    "

                  />

                </div>







                {/* Department */}

                <div>

                  <label className="font-semibold">
                    Department
                  </label>


                  <select

                    value={department}

                    onChange={(e)=>setDepartment(e.target.value)}

                    className="
                      mt-2
                      w-full
                      border
                      border-slate-300
                      rounded-xl
                      px-4
                      py-3
                    "

                  >

                    <option>Engineering</option>
                    <option>Marketing</option>
                    <option>Security</option>
                    <option>Design</option>
                    <option>Support</option>
                    <option>Human Resources</option>
                    <option>Sales</option>


                  </select>


                </div>







                {/* Hire Button */}

                <button

                  onClick={handleHire}

                  className="
                    w-full
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                    cursor-pointer
                  "

                >

                  Hire {name}

                </button>


              </div>

            )
          }







          {
            available.length === 0 && (

              <div
                className="
                  flex
                  flex-col
                  items-center
                  py-20
                "
              >

                <Sparkles
                  size={42}
                  className="text-indigo-600"
                />


                <h2
                  className="
                    mt-6
                    text-3xl
                    font-bold
                  "
                >
                  All Autobots Hired
                </h2>


                <p className="mt-3 text-slate-500">
                  More AI employees will be available later.
                </p>


              </div>

            )
          }



        </div>


      </div>


    </div>

  );

}