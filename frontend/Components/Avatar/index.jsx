import prime from "../../src/assets/autobots/prime.png";

export default function Avatar({
  workspace,
  onClick,
}) {

  return (

    <button

      onClick={onClick}

      className="
        fixed
        bottom-8
        right-8

        w-20
        h-20

        rounded-full

        bg-white

        shadow-2xl

        border-4
        border-white

        hover:scale-110

        transition
        duration-300

        cursor-pointer

        z-40
      "

    >

      {/* Prime */}

      <img

        src={prime}

        alt="Prime"

        className="
          w-full
          h-full
          rounded-full
          object-contain
          bg-slate-100
        "

      />



      {/* Online Indicator */}

      <span

        className="
          absolute
          bottom-1
          right-1

          w-5
          h-5

          rounded-full

          bg-green-500

          border-4
          border-white
        "

      />



      {/* Hover Tooltip */}

      <div

        className="
          absolute

          right-24
          top-1/2

          -translate-y-1/2

          bg-slate-900
          text-white

          px-4
          py-2

          rounded-xl

          text-sm

          whitespace-nowrap

          opacity-0
          invisible

          group-hover:opacity-100
          group-hover:visible

          transition
        "

      >

        Prime

        {workspace && (

          <span className="block text-slate-400 text-xs mt-1">

            {workspace.name}

          </span>

        )}

      </div>

    </button>

  );

}