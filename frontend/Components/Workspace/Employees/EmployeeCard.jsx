import {
  BriefcaseBusiness,
  Building2,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { autobotImages } from "../../../src/data/autobots";

const statusGlowColors = {
  WORKING: "rgba(245, 158, 11, 0.15)",   // Amber glow
  THINKING: "rgba(99, 102, 241, 0.2)",  // Indigo glow
  ONLINE: "rgba(16, 185, 129, 0.12)",   // Emerald glow
};

const statusBorderColors = {
  WORKING: "border-amber-500/30",
  THINKING: "border-indigo-500/40",
  ONLINE: "border-slate-800/80 hover:border-emerald-500/30",
};

export default function EmployeeCard({ employee }) {
  const imageSrc = autobotImages[employee.id] || autobotImages.prime;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        boxShadow: `0 4px 30px ${statusGlowColors[employee.status || "ONLINE"] || "rgba(255, 255, 255, 0.02)"}`
      }}
      className={`
        bg-slate-900/60
        backdrop-blur-md
        rounded-3xl
        border
        ${statusBorderColors[employee.status || "ONLINE"] || "border-slate-800/80"}
        hover:shadow-2xl
        transition-all
        duration-300
        overflow-hidden
      `}
    >
      {/* Image */}

      <div className="bg-slate-950/40 flex justify-center py-8 border-b border-slate-900/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.02),transparent)]" />
        <motion.img
          src={imageSrc}
          alt={employee.name}
          animate={{
            y: [0, -6, 0]
          }}
          transition={{
            duration: 3 + (employee.name.length % 3) * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="
            h-36
            object-contain
            filter drop-shadow-[0_0_15px_rgba(99,102,241,0.15)]
          "
        />

      </div>

      {/* Content */}

      <div className="p-6">

        <div className="flex justify-between items-center">

          <h2 className="text-xl font-bold text-slate-100">
            {employee.name}
          </h2>

          <Star
            size={18}
            className="text-yellow-500 fill-yellow-500"
          />

        </div>

        <div className="mt-5 space-y-4">

          <div className="flex items-center gap-3">

            <BriefcaseBusiness
              size={18}
              className="text-indigo-400"
            />

            <span className="text-xs font-semibold text-slate-300">
              {employee.role}
            </span>

          </div>

          <div className="flex items-center gap-3">

            <Building2
              size={18}
              className="text-emerald-400"
            />

            <span className="text-xs font-semibold text-slate-300">
              {employee.department}
            </span>

          </div>

        </div>

        {/* Status */}

        <div className="mt-8 flex justify-between items-center">

          <span
            className={`
              px-3
              py-1
              rounded-full
              text-[10px]
              font-bold
              ${
                employee.status === "WORKING"
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : employee.status === "THINKING"
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-pulse"
                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              }
            `}
          >
            {employee.status || "ONLINE"}
          </span>

          <span className="text-slate-500 text-[10px] font-bold">
            #{employee.id}
          </span>

        </div>

      </div>

    </motion.div>
  );
}