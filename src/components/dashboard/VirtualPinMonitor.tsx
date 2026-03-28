import { useState, useEffect } from "react";

interface VirtualPin {
  pin: string;
  label: string;
  value: number;
  type: "integer" | "float" | "string";
  direction: "input" | "output";
  min?: number;
  max?: number;
}

const initialPins: VirtualPin[] = [
  { pin: "V0", label: "Edge Lights State", value: 1, type: "integer", direction: "output", min: 0, max: 1 },
  { pin: "V1", label: "Threshold State", value: 1, type: "integer", direction: "output", min: 0, max: 1 },
  { pin: "V2", label: "Brightness Level", value: 75, type: "integer", direction: "output", min: 0, max: 255 },
  { pin: "V3", label: "Temperature", value: 24.5, type: "float", direction: "input" },
  { pin: "V4", label: "Humidity", value: 68, type: "integer", direction: "input" },
  { pin: "V5", label: "Wind Speed", value: 12.3, type: "float", direction: "input" },
  { pin: "V6", label: "Visibility", value: 8.5, type: "float", direction: "input" },
  { pin: "V7", label: "Alert Flag", value: 0, type: "integer", direction: "output", min: 0, max: 1 },
  { pin: "V8", label: "Fan PWM", value: 180, type: "integer", direction: "output", min: 0, max: 255 },
  { pin: "V9", label: "Runway Status", value: 1, type: "integer", direction: "input" },
];

const VirtualPinMonitor = () => {
  const [pins, setPins] = useState(initialPins);

  // Simulate input pin changes
  useEffect(() => {
    const interval = setInterval(() => {
      setPins(prev => prev.map(p => {
        if (p.direction !== "input") return p;
        if (p.type === "float") return { ...p, value: +(p.value + (Math.random() - 0.5) * 0.5).toFixed(1) };
        return p;
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Virtual Pin Monitor</h3>
        <span className="text-[10px] font-mono text-muted-foreground">{pins.length} pins configured</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {pins.map(pin => (
          <div key={pin.pin} className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-muted/50 border border-border">
            <span className="text-[9px] font-mono font-bold text-primary">{pin.pin}</span>
            <span className={`text-base font-mono font-bold ${pin.direction === "input" ? "text-accent" : "text-foreground"}`}>
              {pin.type === "float" ? pin.value.toFixed(1) : pin.value}
            </span>
            <span className="text-[8px] font-mono text-muted-foreground text-center leading-tight">{pin.label}</span>
            <span className={`text-[7px] font-mono uppercase px-1.5 py-0.5 rounded ${pin.direction === "input" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
              {pin.direction}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualPinMonitor;
