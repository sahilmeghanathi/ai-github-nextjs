interface StreamingDotsProps {
  color?: "cyan" | "emerald" | "slate";
}

export function StreamingDots({ color = "cyan" }: StreamingDotsProps) {
  const colorMap = {
    cyan: "bg-cyan-400",
    emerald: "bg-emerald-400",
    slate: "bg-slate-500",
  };

  const bgColor = colorMap[color];

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`h-1.5 w-1.5 animate-bounce rounded-full ${bgColor} [animation-delay:0ms]`}
      />
      <span
        className={`h-1.5 w-1.5 animate-bounce rounded-full ${bgColor} [animation-delay:150ms]`}
      />
      <span
        className={`h-1.5 w-1.5 animate-bounce rounded-full ${bgColor} [animation-delay:300ms]`}
      />
    </div>
  );
}
