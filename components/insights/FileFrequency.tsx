import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export function FileFrequency({ data }: any) {
  const entries = Object.entries(data);

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
          <h2 className="font-display text-lg font-semibold">
            File Change Frequency
          </h2>

          <p className="mt-0.5 font-mono text-[10px] text-slate-500">
            Most frequently modified files
          </p>
        </div>

        <div
          className="
            flex h-8 w-8 items-center justify-center
            rounded-lg bg-blue-500/10 text-sm
          "
        >
          📁
        </div>
      </div>

      {/* Content */}
      <div className="custom-scroll flex-1 space-y-2 overflow-y-auto p-3">
        {entries.map(([file, count]: any, i) => {
          const shortPath = file.split("/").slice(-2).join("/");

          const intensity =
            count > 40
              ? "border-rose-500/20 bg-rose-500/10 text-rose-400"
              : count > 15
                ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
                : "border-blue-500/20 bg-blue-500/10 text-blue-300";

          return (
            <div
              key={file}
              className="
                animate-fade-in-up
                group flex items-center justify-between
                rounded-xl border border-transparent
                px-3 py-2.5
                transition-all duration-200
                hover:border-blue-500/20
                hover:bg-blue-500/5
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
                  {shortPath}
                </p>

                <p className="mt-1 font-mono text-[10px] text-slate-500">
                  {file}
                </p>
              </div>

              {/* Right */}
              <Badge
                className={`
                  border px-2 py-1
                  font-mono text-[10px] font-bold
                  tracking-[0.08em]
                  ${intensity}
                `}
              >
                {count}
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}