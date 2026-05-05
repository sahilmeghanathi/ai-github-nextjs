// components/risk/RiskHeatmap.tsx
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function RiskHeatmap({ data }: any) {
  return (
    <Card className="p-4 space-y-2">
      {data.map((item: any) => (
        <div key={item.file} className="flex justify-between">
          <span>{item.file}</span>
          <Badge
            variant={
              item.level === "high"
                ? "destructive"
                : item.level === "medium"
                  ? "secondary"
                  : "outline"
            }
          >
            {item.level}
          </Badge>
        </div>
      ))}
    </Card>
  );
}
