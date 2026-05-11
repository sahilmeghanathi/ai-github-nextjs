import { parsePartialArray } from "@/lib/ai/parsePartial";

const priorityColor = (priority: string) => {
  if (priority === "High") {
    return {
      text: "text-rose-400",
      badge: "border border-rose-500/20 bg-rose-500/10 text-rose-400",
      glow: "hover:border-rose-500/20 hover:bg-rose-500/5",
      dot: "bg-rose-500",
    };
  }

  if (priority === "Medium") {
    return {
      text: "text-amber-300",
      badge: "border border-amber-400/20 bg-amber-400/10 text-amber-300",
      glow: "hover:border-amber-400/20 hover:bg-amber-400/5",
      dot: "bg-amber-400",
    };
  }

  return {
    text: "text-emerald-300",
    badge: "border border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    glow: "hover:border-emerald-400/20 hover:bg-emerald-400/5",
    dot: "bg-emerald-400",
  };
};

export function RefactorPlan({
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
              rounded-xl bg-cyan-500/10 text-lg
            "
          >
            🛠️
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold">
              Refactor Plan
            </h2>

            <p className="mt-0.5 font-mono text-[10px] text-slate-500">
              AI-generated architectural improvements
            </p>
          </div>
        </div>

        {isStreaming && (
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:0ms]" />

            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]" />

            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:300ms]" />
          </div>
        )}
      </div>

      {/* Steps */}
      <ol className="space-y-3">
        {items.map((item, i) => {
          const priority = priorityColor(item.priority || "Low");

          return (
            <li
              key={i}
              className={`
                animate-fade-in-up
                group flex gap-3 rounded-xl
                border border-white/5
                p-3 transition-all duration-200
                ${priority.glow}
              `}
              style={{
                animationDelay: `${i * 40}ms`,
              }}
            >
              {/* Step Number */}
              <div
                className={`
                  mt-0.5 flex h-7 w-7 shrink-0
                  items-center justify-center
                  rounded-full text-xs font-bold
                  ${priority.badge}
                `}
              >
                {i + 1}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                {item.step && (
                  <div className="flex items-start gap-2">
                    <span
                      className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${priority.dot}`}
                    />

                    <p
                      className="
                        text-sm font-medium leading-6
                        text-slate-200
                      "
                    >
                      {item.step}
                    </p>
                  </div>
                )}

                {item.impact && (
                  <p
                    className="
                      mt-2 pl-3.5 text-xs leading-6
                      text-slate-400
                    "
                  >
                    {item.impact}
                  </p>
                )}

                {item.priority && (
                  <div className="mt-3 pl-3.5">
                    <span
                      className={`
                        rounded-full px-2 py-1
                        font-mono text-[10px]
                        font-bold tracking-[0.08em]
                        ${priority.badge}
                      `}
                    >
                      {item.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>
                )}
              </div>
            </li>
          );
        })}

        {/* Streaming Loader */}
        {isStreaming && (
          <li
            className="
              flex gap-3 rounded-xl
              border border-white/5
              bg-white/[0.02]
              p-3 opacity-70
            "
          >
            <div
              className="
                flex h-7 w-7 shrink-0
                items-center justify-center
                rounded-full border border-cyan-500/20
                bg-cyan-500/10
                font-mono text-xs font-bold
                text-cyan-300
              "
            >
              {items.length + 1}
            </div>

            <div className="flex items-center gap-1.5 pt-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:0ms]" />

              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:150ms]" />

              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:300ms]" />

              <span className="ml-2 font-mono text-[10px] text-slate-500">
                Building refactor strategy...
              </span>
            </div>
          </li>
        )}
      </ol>
    </div>
  );
}