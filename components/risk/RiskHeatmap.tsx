import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const levelStyles: any = {
  high: "bg-red-500/10 text-red-500 border-red-500/30",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  low: "bg-green-500/10 text-green-500 border-green-500/30",
};

export default function RiskHeatmap({ data }: any) {
  return (
    <Card className="p-0 h-80 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b sticky top-0 bg-background z-10">
        <h2 className="font-semibold text-lg">File Risk Levels</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {data.map((item: any, i: number) => (
          <div
            key={item.file}
            className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <span className="truncate max-w-[65%] text-sm">{item.file}</span>

            <Badge className={`${levelStyles[item.level]} capitalize`}>
              {item.level}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}