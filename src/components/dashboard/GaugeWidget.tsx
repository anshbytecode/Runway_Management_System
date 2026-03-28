interface GaugeWidgetProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color?: "primary" | "accent" | "destructive";
}

const colorMap = {
  primary: "stroke-primary",
  accent: "stroke-accent",
  destructive: "stroke-destructive",
};

const GaugeWidget = ({ value, max, label, unit, color = "primary" }: GaugeWidgetProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5">
      <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          className={`${colorMap[color]} gauge-animate`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <div className="absolute flex flex-col items-center -mt-1">
        <span className="text-2xl font-mono font-bold text-foreground">{value}</span>
        <span className="text-xs font-mono text-muted-foreground">{unit}</span>
      </div>
      <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  );
};

export default GaugeWidget;
