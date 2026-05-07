export function PredictionsList({ data }: { data: any[] }) {
  if (!data?.length) return null;

  const riskColor = (risk: string) => {
    if (risk === "High") return "text-red-500 bg-red-50 border-red-200";
    if (risk === "Medium")
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <h2 className="text-lg font-semibold">🤖 AI Risk Predictions</h2>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="rounded-lg border p-3 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-mono font-medium truncate">
                {item.file}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-semibold shrink-0 ${riskColor(item.risk)}`}
              >
                {item.risk}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{item.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
