import { motion } from "framer-motion";
import prime from "../../src/assets/autobots/prime.png";

export default function Avatar({
  workspace,
  onClick,
}) {

  return (

    <motion.button
      onClick={onClick}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ scale: 1.1 }}
      className="
        fixed
        bottom-8
        right-8

        w-20
        h-20

        rounded-full

        bg-slate-950/80
        backdrop-blur-md

        shadow-[0_0_25px_rgba(99,102,241,0.4)]

        border-2
        border-indigo-500/50

        transition-shadow
        duration-350

        cursor-pointer
        group
        z-45
        flex
        items-center
        justify-center
      "

    >

      {/* Prime */}

      <img

        src={prime}

        alt="Prime"

        className="
          w-16
          h-16
          rounded-full
          object-contain
        "

      />



      {/* Online Indicator */}

      <span

        className="
          absolute
          bottom-1
          right-1

          w-4
          h-4

          rounded-full

          bg-green-500

          border-2
          border-slate-950
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

          text-[10px]
          font-bold

          whitespace-nowrap

          opacity-0
          invisible
          group-hover:opacity-100
          group-hover:visible

          transition-all
          duration-200
          border
          border-slate-800
          shadow-2xl
        "

      >

        Optimus Prime

        {workspace && (

          <span className="block text-slate-500 text-[9px] mt-0.5">

            {workspace.name}

          </span>

        )}

      </div>

    </motion.button>

  );

}