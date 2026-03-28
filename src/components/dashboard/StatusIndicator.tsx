interface StatusIndicatorProps {
  status: "online" | "offline" | "warning";
  label?: string;
}

const statusStyles = {
  online: "bg-primary dot-pulse",
  offline: "bg-destructive",
  warning: "bg-accent dot-pulse",
};

const StatusIndicator = ({ status, label }: StatusIndicatorProps) => (
  <div className="flex items-center gap-2">
    <span className={`h-2.5 w-2.5 rounded-full ${statusStyles[status]}`} />
    {label && <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{label}</span>}
  </div>
);

export default StatusIndicator;
