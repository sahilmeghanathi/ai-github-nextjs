import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export function FileFrequency({ data }: any) {
  return (
    <Card className="p-0 h-80 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b sticky top-0 bg-background z-10">
        <h2 className="font-semibold text-lg">File Change Frequency</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {Object.entries(data).map(([file, count]: any, i) => (
          <div
            key={file}
            className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 group"
            style={{
              animation: "fadeInUp 0.4s ease forwards",
              animationDelay: `${i * 40}ms`,
            }}
          >
            <span className="truncate max-w-[65%] text-sm group-hover:text-primary transition">
              {file}
            </span>

            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
              {count}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}