const events = [
  { time: "14:32:05", msg: "Runway edge lights activated — GPIO 17", type: "success" as const },
  { time: "14:30:12", msg: "Threshold lights set to RED — GPIO 22", type: "info" as const },
  { time: "14:28:44", msg: "Wind speed sensor reading: 12.3 km/h", type: "info" as const },
  { time: "14:25:01", msg: "Taxiway A lights dimmed to 60%", type: "info" as const },
  { time: "14:20:33", msg: "Visibility dropped below 5km — ALERT", type: "warning" as const },
  { time: "14:15:18", msg: "System health check passed", type: "success" as const },
  { time: "14:10:02", msg: "MQTT reconnect — broker timeout", type: "warning" as const },
  { time: "14:05:55", msg: "Centerline lights PWM calibrated", type: "info" as const },
];

const typeStyles = {
  success: "text-primary",
  info: "text-foreground",
  warning: "text-accent",
};

const dotStyles = {
  success: "bg-primary",
  info: "bg-muted-foreground",
  warning: "bg-accent",
};

const ActivityLog = () => (
  <div className="rounded-xl border border-border bg-card p-5">
    <h3 className="text-sm font-medium text-foreground mb-4">Activity Log</h3>
    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
      {events.map((e, i) => (
        <div key={i} className="flex items-start gap-3 py-1.5">
          <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${dotStyles[e.type]}`} />
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-mono truncate ${typeStyles[e.type]}`}>{e.msg}</p>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground shrink-0">{e.time}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ActivityLog;
