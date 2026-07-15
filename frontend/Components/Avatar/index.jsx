import prime from "../../src/assets/autobots/prime.png";


const Avatar = ({onClick}) => {


  return (

    <button

      onClick={onClick}

      className="
        fixed
        bottom-6
        right-6
        w-20
        h-20
        rounded-full
        bg-white
        shadow-2xl
        border-4
        border-indigo-500
        flex
        items-center
        justify-center
        hover:scale-110
        transition
        duration-300
        cursor-pointer
        z-40
      "

    >

      <img

        src={prime}

        alt="Prime AI Assistant"

        className="
          w-full
          h-full
          object-contain
        "

      />


    </button>

  );

};


export default Avatar;