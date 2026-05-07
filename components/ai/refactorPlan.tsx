export function RefactorPlan({ data }: { data: any[] }) {
  if (!data?.length) return null;

  const priorityColor = (p: string) => {
    if (p === "High") return "text-red-500";
    if (p === "Medium") return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <h2 className="text-lg font-semibold">🛠️ Refactor Plan</h2>
      <ol className="space-y-3">
        {data.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
              {i + 1}
            </span>
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{item.step}</p>
              <p className="text-xs text-muted-foreground">{item.impact}</p>
              <span
                className={`text-xs font-semibold ${priorityColor(item.priority)}`}
              >
                {item.priority} Priority
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
