import { Thermometer, Droplets, Wind, Eye, Gauge } from "lucide-react";

interface SensorReading {
  icon: React.ElementType;
  label: string;
  value: string;
  unit: string;
  status: "normal" | "warning" | "critical";
}

const readings: SensorReading[] = [
  { icon: Thermometer, label: "Temperature", value: "24.5", unit: "°C", status: "normal" },
  { icon: Droplets, label: "Humidity", value: "68", unit: "%", status: "normal" },
  { icon: Wind, label: "Wind Speed", value: "12.3", unit: "km/h", status: "normal" },
  { icon: Eye, label: "Visibility", value: "8.5", unit: "km", status: "normal" },
  { icon: Gauge, label: "Pressure", value: "1013", unit: "hPa", status: "normal" },
];

const statusColor = {
  normal: "text-primary",
  warning: "text-accent",
  critical: "text-destructive",
};

const SensorPanel = () => (
  <div className="rounded-xl border border-border bg-card p-5">
    <h3 className="text-sm font-medium text-foreground mb-4">Environmental Sensors</h3>
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      {readings.map(({ icon: Icon, label, value, unit, status }) => (
        <div key={label} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50">
          <Icon size={18} className="text-muted-foreground" />
          <span className={`text-xl font-mono font-bold ${statusColor[status]}`}>{value}</span>
          <span className="text-[10px] font-mono text-muted-foreground">{unit}</span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default SensorPanel;
