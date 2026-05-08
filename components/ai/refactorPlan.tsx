import { parsePartialArray } from "@/lib/ai/parsePartial";

const priorityColor = (p: string) => {
  if (p === "High") return "text-red-500";
  if (p === "Medium") return "text-yellow-600";
  return "text-green-600";
};

export function RefactorPlan({
  stream,
  isDone,
}: {
  stream: string;
  isDone: boolean;
}) {


  console.log("RefactorPlan stream:", stream);

  if (!stream) return null;

  const items = parsePartialArray(stream);
  const isStreaming = !isDone;

  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">🛠️ Refactor Plan</h2>
        {isStreaming && (
          <span className="flex gap-1 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
          </span>
        )}
      </div>

      <ol className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 animate-fade-in">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
              {i + 1}
            </span>
            <div className="space-y-0.5">
              {item.step && <p className="text-sm font-medium">{item.step}</p>}
              {item.impact && (
                <p className="text-xs text-muted-foreground">{item.impact}</p>
              )}
              {item.priority && (
                <span
                  className={`text-xs font-semibold ${priorityColor(item.priority)}`}
                >
                  {item.priority} Priority
                </span>
              )}
            </div>
          </li>
        ))}

        {/* Typing indicator for next incoming step */}
        {isStreaming && (
          <li className="flex gap-3 opacity-60">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
              {items.length + 1}
            </span>
            <div className="flex gap-1 items-center pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
            </div>
          </li>
        )}
      </ol>
    </div>
  );
}