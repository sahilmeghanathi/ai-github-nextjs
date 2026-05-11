import { parsePartialArray } from "@/lib/ai/parsePartial";

const riskColor = (risk: string) => {
  if (risk === "High") {
    return {
      badge: "border-rose-500/20 bg-rose-500/10 text-rose-400",

      glow: "hover:border-rose-500/20 hover:bg-rose-500/5",

      dot: "bg-rose-500",
    };
  }

  if (risk === "Medium") {
    return {
      badge: "border-amber-400/20 bg-amber-400/10 text-amber-300",

      glow: "hover:border-amber-400/20 hover:bg-amber-400/5",

      dot: "bg-amber-400",
    };
  }

  return {
    badge: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",

    glow: "hover:border-emerald-400/20 hover:bg-emerald-400/5",

    dot: "bg-emerald-400",
  };
};

export function PredictionsList({
  stream,
  isDone,
}: {
  stream: string;
  isDone: boolean;
}) {
  if (!stream) return null;

  const items = parsePartialArray(stream);

  const isStreaming = !isDone;

  return (
    <div
      className="
        rounded-2xl border border-white/10
        bg-[#0a0e18]/90
        p-5 text-slate-200
        backdrop-blur-2xl
      "
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl bg-violet-500/10 text-lg
            "
          >
            🤖
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold">
              AI Risk Predictions
            </h2>

            <p className="mt-0.5 font-mono text-[10px] text-slate-500">
              Real-time AI repository analysis
            </p>
          </div>
        </div>

        {isStreaming && (
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:0ms]" />

            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:150ms]" />

            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:300ms]" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {items.map((item, i) => {
          const risk = riskColor(item.risk || "Low");

          const shortPath = item.file?.split("/").slice(-2).join("/");

          return (
            <div
              key={i}
              className={`
                animate-fade-in-up
                group rounded-xl border border-white/5
                p-3 transition-all duration-200
                ${risk.glow}
              `}
              style={{
                animationDelay: `${i * 40}ms`,
              }}
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${risk.dot}`} />

                    <span
                      className="
                        truncate font-mono text-sm
                        font-medium text-slate-200
                      "
                    >
                      {shortPath}
                    </span>
                  </div>

                  <p className="truncate font-mono text-[10px] text-slate-500">
                    {item.file}
                  </p>
                </div>

                {item.risk && (
                  <span
                    className={`
                      shrink-0 rounded-full border
                      px-2 py-1
                      font-mono text-[10px]
                      font-bold tracking-[0.08em]
                      ${risk.badge}
                    `}
                  >
                    {item.risk.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Reason */}
              {item.reason && (
                <p
                  className="
                    mt-3 text-xs leading-6
                    text-slate-400
                  "
                >
                  {item.reason}
                </p>
              )}
            </div>
          );
        })}

        {/* Streaming Loader */}
        {isStreaming && (
          <div
            className="
              rounded-xl border border-white/5
              bg-white/[0.02]
              p-3 opacity-70
            "
          >
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:0ms]" />

              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:150ms]" />

              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:300ms]" />

              <span className="ml-2 font-mono text-[10px] text-slate-500">
                Generating predictions...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}