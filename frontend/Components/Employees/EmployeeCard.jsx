import "./index.css";


export default function EmployeeCard({ employee }) {

  return (

    <div
      className="
        group
        relative
        w-44
      "
    >



      {/* Main Card */}

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-5
          flex
          flex-col
          items-center
          transition-all
          duration-300
          hover:shadow-lg
          hover:-translate-y-1
          cursor-pointer
        "
      >



        {/* Image Container */}

        <div
          className="
            w-28
            h-28
            bg-slate-100
            rounded-2xl
            flex
            items-center
            justify-center
            p-2
          "
        >

          <img

            src={employee.image}

            alt={employee.name}

            className="
              w-full
              h-full
              object-contain
            "

          />

        </div>





        {/* Name */}

        <h3
          className="
            mt-4
            text-sm
            font-semibold
            text-slate-800
            text-center
          "
        >
          {employee.name}
        </h3>



      </div>









      {/* Hover Dropdown */}

      <div
        className="
          absolute
          z-[9999]
          top-full
          left-1/2
          -translate-x-1/2
          mt-4

          w-64

          bg-white
          border
          border-slate-200

          rounded-2xl

          shadow-xl

          p-5


          opacity-0
          invisible

          group-hover:opacity-100
          group-hover:visible

          transition-all
          duration-300
        "
      >




        <h2
          className="
            text-lg
            font-bold
            text-slate-900
            text-center
          "
        >
          {employee.name}
        </h2>





        <p
          className="
            text-sm
            text-indigo-600
            font-medium
            text-center
            mt-1
          "
        >
          {employee.role}
        </p>






        <p
          className="
            text-sm
            text-slate-500
            text-center
            mt-1
          "
        >
          {employee.department}
        </p>







        {/* Description */}

        {
          employee.description && (

            <p
              className="
                mt-4
                text-xs
                text-slate-600
                leading-5
              "
            >

              {employee.description}

            </p>

          )
        }







        {/* Skills */}

        {
          employee.skills && (

            <div
              className="
                flex
                flex-wrap
                gap-2
                mt-4
              "
            >

              {
                employee.skills.map((skill,index)=>(

                  <span

                    key={index}

                    className="
                      bg-slate-100
                      text-slate-700
                      text-xs
                      px-3
                      py-1
                      rounded-full
                    "

                  >

                    {skill}

                  </span>

                ))
              }


            </div>

          )
        }





      </div>



    </div>

  );

}