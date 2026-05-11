import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export function PrScoresList({ data }: any) {
  return (
    <Card
      className="
        flex h-80 flex-col overflow-hidden
        rounded-2xl border border-white/10
        bg-[#0a0e18]/90
        p-0 text-slate-200
        backdrop-blur-2xl
      "
    >
      {/* Header */}
      <div
        className="
          sticky top-0 z-10
          flex items-center justify-between
          border-b border-white/10
          bg-[#0a0e18]/95
          p-4
        "
      >
        <div>
          <h2 className="font-display text-lg font-semibold">PR Risk Scores</h2>

          <p className="mt-0.5 font-mono text-[10px] text-slate-500">
            Pull request stability analysis
          </p>
        </div>

        <div
          className="
            flex h-8 w-8 items-center justify-center
            rounded-lg bg-violet-500/10 text-sm
          "
        >
          🧠
        </div>
      </div>

      {/* Content */}
      <div className="custom-scroll flex-1 space-y-2 overflow-y-auto p-3">
        {data.map((pr: any, i: number) => {
          const score =
            typeof pr.score === "number" ? pr.score : parseFloat(pr.score);

          const scoreColor =
            score >= 80
              ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
              : score >= 50
                ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
                : "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";

          return (
            <div
              key={pr.id}
              className="
                animate-fade-in-up
                group flex items-center justify-between
                rounded-xl border border-transparent
                px-3 py-2.5
                transition-all duration-200
                hover:border-violet-500/20
                hover:bg-violet-500/5
              "
              style={{
                animationDelay: `${i * 40}ms`,
              }}
            >
              {/* Left */}
              <div className="min-w-0 flex-1">
                <p
                  className="
                    truncate text-sm text-slate-300
                    transition-colors duration-200
                    group-hover:text-white
                  "
                >
                  {pr.title}
                </p>

                <p className="mt-1 font-mono text-[10px] text-slate-500">
                  PR #{pr.id}
                </p>
              </div>

              {/* Right */}
              <Badge
                className={`
                  border px-2 py-1
                  font-mono text-[10px] font-bold
                  tracking-[0.08em]
                  ${scoreColor}
                `}
              >
                {pr.score}
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}