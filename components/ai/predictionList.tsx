import { parsePartialArray } from "@/lib/ai/parsePartial";

const riskColor = (risk: string) => {
  if (risk === "High") return "text-red-500 bg-red-50 border-red-200";
  if (risk === "Medium")
    return "text-yellow-600 bg-yellow-50 border-yellow-200";
  return "text-green-600 bg-green-50 border-green-200";
};

export function PredictionsList({
  stream,
  isDone,
}: {
  stream: string;
  isDone: boolean;
}) {


  console.log("PredictionsList stream:", stream);

  if (!stream) return null;

  const items = parsePartialArray(stream);
  const isStreaming = !isDone;

  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">🤖 AI Risk Predictions</h2>
        {isStreaming && (
          <span className="flex gap-1 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
          </span>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border p-3 space-y-1 animate-fade-in"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-mono font-medium truncate">
                {item.file}
              </span>
              {item.risk && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border font-semibold shrink-0 ${riskColor(item.risk)}`}
                >
                  {item.risk}
                </span>
              )}
            </div>
            {item.reason && (
              <p className="text-xs text-muted-foreground">{item.reason}</p>
            )}
          </div>
        ))}

        {/* Typing indicator for next incoming item */}
        {isStreaming && (
          <div className="rounded-lg border p-3 space-y-2 opacity-60">
            <div className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}