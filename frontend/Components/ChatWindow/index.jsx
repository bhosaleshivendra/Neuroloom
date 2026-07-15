import prime from "../../src/assets/autobots/prime.png";


const ChatWindow = ({ onClose }) => {


  return (

    <div
      className="
        fixed
        top-16
        right-0
        h-[calc(100vh-4rem)]
        w-[380px]
        bg-white
        shadow-2xl
        z-40
        flex
        flex-col
        border-l
        border-slate-200
      "
    >



      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          p-5
          bg-gradient-to-r
          from-indigo-600
          to-purple-600
          text-white
        "
      >


        <div className="flex items-center gap-3">


          <div
            className="
              w-14
              h-14
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >

            <img
              src={prime}
              alt="Prime"
              className="
                w-full
                h-full
                object-contain
              "
            />

          </div>



          <div>

            <h2 className="text-lg font-bold">
              Prime
            </h2>


            <p className="text-sm text-indigo-100">
              AI Executive Assistant
            </p>


            <div className="flex items-center gap-2">

              <span
                className="
                  w-2
                  h-2
                  bg-green-400
                  rounded-full
                "
              />


              <span className="text-xs">
                Online
              </span>

            </div>


          </div>


        </div>




        <button
          onClick={onClose}
          className="
            text-2xl
            hover:text-red-200
            cursor-pointer
          "
        >

          ×

        </button>



      </div>







      {/* Messages */}

      <div
        className="
          flex-1
          overflow-y-auto
          p-5
          bg-slate-50
        "
      >



        <div
          className="
            bg-white
            shadow-sm
            p-4
            border
            border-slate-200
            max-w-[85%]
          "
        >

          <p className="text-sm text-slate-700">

            Hello 👋

          </p>


          <p className="mt-2 text-sm text-slate-600">

            I am Prime, your AI executive assistant.

          </p>


        </div>



      </div>









      {/* Input */}

      <div
        className="
          p-4
          border-t
          bg-white
        "
      >

        <div className="flex gap-3">


          <input

            type="text"

            placeholder="Ask Prime anything..."

            className="
              flex-1
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-indigo-600
            "

          />



          <button

            className="
              bg-indigo-600
              text-white
              px-5
              hover:bg-indigo-700
              cursor-pointer
            "

          >

            ➤

          </button>



        </div>


      </div>




    </div>

  );

};


export default ChatWindow;