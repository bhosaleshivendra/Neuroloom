import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  UserCircle,
  User,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";

import "./index.css";


const Header = ({ employees = [] }) => {


  const navigate = useNavigate();


  // Replace later with authentication
  const isLoggedIn = false;


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



  return (


    <header
      className="
        h-16
        bg-white
        border-b
        border-slate-200
        flex
        items-center
        justify-between
        px-8
        relative
        z-50
      "
    >



      {/* Left Section */}


      <div>

        <h1
          className="
            text-2xl
            font-bold
            text-slate-900
          "
        >
          Dashboard
        </h1>


        <p
          className="
            text-sm
            text-slate-500
          "
        >
          Welcome back to Neuroloom.
        </p>


      </div>








      {/* Right Section */}


      <div
        className="
          flex
          items-center
          gap-4
        "
      >






        {/* Employee Icons */}


        <div
          className="
            flex
            items-center
            -space-x-2
          "
        >


          {
            employees.slice(0,6).map((employee)=>(


              <div
                key={employee.id}
                className="
                  relative
                  group
                "
              >




                {/* Avatar Button */}


                <button
                  title={employee.name}
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-slate-100
                    border-2
                    border-white
                    overflow-hidden
                    cursor-pointer
                    hover:scale-110
                    transition-transform
                    duration-200
                    flex
                    items-center
                    justify-center
                  "
                >


                  <img

                    src={employee.image}

                    alt={employee.name}

                    className="
                      w-full
                      h-full
                      object-contain
                      p-1
                    "

                  />


                </button>








                {/* Employee Hover Card */}


                <div
                  className="
                    absolute
                    right-0
                    top-14
                    min-w-56
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    shadow-xl
                    p-4

                    opacity-0
                    invisible

                    group-hover:opacity-100
                    group-hover:visible

                    transition-all
                    duration-300

                    z-[9999]
                  "
                >



                  <h3
                    className="
                      text-lg
                      font-bold
                      text-slate-900
                    "
                  >
                    {employee.name}
                  </h3>




                  <p
                    className="
                      mt-1
                      text-sm
                      text-indigo-600
                      font-medium
                    "
                  >
                    {employee.role}
                  </p>




                  <p
                    className="
                      text-sm
                      text-slate-500
                    "
                  >
                    {employee.department}
                  </p>





                  {
                    employee.description && (

                      <p
                        className="
                          mt-3
                          text-xs
                          text-slate-500
                          leading-5
                          line-clamp-3
                        "
                      >

                        {employee.description}

                      </p>

                    )
                  }





                </div>



              </div>


            ))
          }








          {/* Remaining count */}


          {
            employees.length > 6 && (

              <div

                className="
                  w-10
                  h-10
                  rounded-full
                  bg-slate-200
                  border-2
                  border-white
                  flex
                  items-center
                  justify-center
                  text-xs
                  font-semibold
                  text-slate-700
                "

              >

                +{employees.length - 6}

              </div>

            )
          }



        </div>









        {/* Notification */}


        <button

          className="
            p-2
            rounded-xl
            hover:bg-slate-100
            transition
            cursor-pointer
          "

        >


          <Bell
            size={20}
            className="text-slate-600"
          />


        </button>









        {/* User Section */}



        {
          isLoggedIn ? (


            <div
              className="relative"
            >


              <button

                onClick={() =>
                  setIsDropdownOpen(!isDropdownOpen)
                }

                className="
                  flex
                  items-center
                  rounded-xl
                  px-2
                  py-1
                  hover:bg-slate-100
                  transition
                  cursor-pointer
                "

              >


                <UserCircle
                  size={34}
                  className="text-slate-700"
                />


              </button>






              {
                isDropdownOpen && (

                  <div

                    className="
                      absolute
                      right-0
                      top-14
                      w-64
                      bg-white
                      border
                      border-slate-200
                      rounded-2xl
                      shadow-xl
                      overflow-hidden
                      z-[9999]
                    "

                  >



                    <div
                      className="
                        px-5
                        py-4
                        border-b
                        border-slate-200
                      "
                    >

                      <p
                        className="
                          font-semibold
                          text-slate-900
                        "
                      >
                        John Doe
                      </p>


                      <p
                        className="
                          text-sm
                          text-slate-500
                        "
                      >
                        john@example.com
                      </p>


                    </div>







                    <Link

                      to="/profile"

                      className="
                        flex
                        items-center
                        gap-3
                        px-5
                        py-3
                        hover:bg-slate-50
                      "

                    >

                      <User size={18}/>

                      Profile

                    </Link>








                    <Link

                      to="/settings"

                      className="
                        flex
                        items-center
                        gap-3
                        px-5
                        py-3
                        hover:bg-slate-50
                      "

                    >

                      <Settings size={18}/>

                      Settings

                    </Link>







                    <button

                      className="
                        flex
                        items-center
                        gap-3
                        w-full
                        px-5
                        py-3
                        text-red-500
                        hover:bg-red-50
                        cursor-pointer
                      "

                    >

                      <LogOut size={18}/>

                      Logout


                    </button>



                  </div>


                )
              }



            </div>


          )

          :

          (

            <button

              onClick={() =>
                navigate("/sign-in")
              }

              className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-5
                py-2.5
                rounded-xl
                font-semibold
                transition
                cursor-pointer
              "

            >

              Sign In

            </button>

          )

        }



      </div>



    </header>


  );

};



export default Header;