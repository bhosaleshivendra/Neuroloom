import {
  BarChart3,
  TrendingUp,
} from "lucide-react";

export default function Analytics() {
  return (
    <div className="p-8">

      <div>

        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          AI insights and business intelligence for this workspace.
        </p>

      </div>

      <div
        className="
          mt-12
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-20
          text-center
        "
      >

        <BarChart3
          size={70}
          className="mx-auto text-slate-300"
        />

        <h2 className="mt-6 text-3xl font-bold text-slate-800">
          Analytics Dashboard
        </h2>

        <p className="mt-4 text-slate-500 max-w-xl mx-auto">
          This section will display AI-generated reports, productivity
          metrics, employee performance, project progress, and predictive
          business insights.
        </p>

        <div
          className="
            mt-10
            inline-flex
            items-center
            gap-3
            px-6
            py-3
            rounded-xl
            bg-indigo-50
            text-indigo-600
            font-semibold
          "
        >

          <TrendingUp size={20} />

          Coming Soon

        </div>

      </div>

    </div>
  );
}