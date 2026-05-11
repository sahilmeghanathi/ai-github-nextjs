const LEVEL_CFG = {
  high: {
    barBg: "bg-rose-500",
    barGlow: "group-hover:shadow-[0_0_8px_rgba(244,63,94,0.7)]",

    rowHover: "hover:bg-rose-500/10 hover:border-rose-500/20",

    badge: "border border-rose-500/20 bg-rose-500/10 text-rose-400",

    dotColor: "bg-rose-500",
    countColor: "text-rose-400",

    iconBg: "bg-rose-500/10",
  },

  medium: {
    barBg: "bg-amber-400",
    barGlow: "group-hover:shadow-[0_0_8px_rgba(251,191,36,0.7)]",

    rowHover: "hover:bg-amber-400/10 hover:border-amber-400/20",

    badge: "border border-amber-400/20 bg-amber-400/10 text-amber-300",

    dotColor: "bg-amber-400",
    countColor: "text-amber-300",

    iconBg: "bg-amber-400/10",
  },

  low: {
    barBg: "bg-emerald-400",
    barGlow: "group-hover:shadow-[0_0_8px_rgba(52,211,153,0.7)]",

    rowHover: "hover:bg-emerald-400/10 hover:border-emerald-400/20",

    badge: "border border-emerald-400/20 bg-emerald-400/10 text-emerald-300",

    dotColor: "bg-emerald-400",
    countColor: "text-emerald-300",

    iconBg: "bg-emerald-400/10",
  },
} as const;

type Level = keyof typeof LEVEL_CFG;

interface RiskItem {
  file: string;
  level: string;
}

export default function RiskHeatmap({ data }: { data: RiskItem[] }) {
  const counts: Record<string, number> = {
    high: 0,
    medium: 0,
    low: 0,
  };

  data.forEach((d) => {
    if (d.level in counts) counts[d.level]++;
  });

  return (
    <div
      className="
        flex h-80 flex-col overflow-hidden rounded-2xl
        border border-white/10
        bg-[#0a0e18]/90
        backdrop-blur-2xl
        font-mono
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg bg-rose-500/10 text-base
            "
          >
            🔥
          </div>

          <div>
            <p className="font-display text-sm font-semibold text-slate-200">
              File Risk Levels
            </p>

            <p className="text-[10px] text-slate-500">
              {data.length} files scanned
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3">
          {(["high", "medium", "low"] as Level[]).map((lvl) => {
            const cfg = LEVEL_CFG[lvl];

            return (
              <div key={lvl} className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${cfg.dotColor}`} />

                <span className={`text-[9px] font-semibold ${cfg.countColor}`}>
                  {counts[lvl]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="custom-scroll flex-1 space-y-1 overflow-y-auto p-3">
        {data.map((item, i) => {
          const level = (item.level in LEVEL_CFG ? item.level : "low") as Level;

          const cfg = LEVEL_CFG[level];

          const shortPath = item.file.split("/").slice(-2).join("/");

          return (
            <div
              key={item.file}
              className={`
                animate-fade-in-up
                group flex cursor-default items-center gap-3
                rounded-xl border border-transparent
                px-2.5 py-2
                transition-all duration-150
                ${cfg.rowHover}
              `}
              style={{
                animationDelay: `${i * 35}ms`,
              }}
            >
              {/* Bar */}
              <div
                className={`
                  h-7 w-0.75 shrink-0 rounded-full
                  opacity-60 transition-all duration-150
                  group-hover:opacity-100
                  ${cfg.barBg}
                  ${cfg.barGlow}
                `}
              />

              {/* File Path */}
              <span
                className="
                  flex-1 truncate tracking-wide
                  text-[11px] text-slate-300/70
                  transition-colors duration-150
                  group-hover:text-slate-200
                "
              >
                {shortPath}
              </span>

              {/* Badge */}
              <span
                className={`
                  shrink-0 rounded-full px-2 py-0.5
                  text-[9px] font-bold tracking-[0.08em]
                  ${cfg.badge}
                `}
              >
                {level.toUpperCase().slice(0, 3)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}