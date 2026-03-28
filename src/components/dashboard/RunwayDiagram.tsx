import { useState } from "react";

interface RunwayLight {
  id: string;
  x: number;
  y: number;
  type: "edge" | "threshold" | "centerline" | "taxiway";
  active: boolean;
}

const initialLights: RunwayLight[] = [
  // Threshold lights (top)
  ...Array.from({ length: 7 }, (_, i) => ({ id: `th-t-${i}`, x: 15 + i * 12, y: 8, type: "threshold" as const, active: true })),
  // Threshold lights (bottom)
  ...Array.from({ length: 7 }, (_, i) => ({ id: `th-b-${i}`, x: 15 + i * 12, y: 92, type: "threshold" as const, active: true })),
  // Edge lights left
  ...Array.from({ length: 8 }, (_, i) => ({ id: `edge-l-${i}`, x: 12, y: 15 + i * 10, type: "edge" as const, active: true })),
  // Edge lights right
  ...Array.from({ length: 8 }, (_, i) => ({ id: `edge-r-${i}`, x: 88, y: 15 + i * 10, type: "edge" as const, active: true })),
  // Centerline
  ...Array.from({ length: 6 }, (_, i) => ({ id: `cl-${i}`, x: 50, y: 18 + i * 12, type: "centerline" as const, active: true })),
  // Taxiway
  { id: "taxi-1", x: 88, y: 40, type: "taxiway" as const, active: true },
  { id: "taxi-2", x: 95, y: 35, type: "taxiway" as const, active: true },
  { id: "taxi-3", x: 95, y: 45, type: "taxiway" as const, active: true },
];

const lightColors = {
  edge: { active: "#00FF88", inactive: "#1a3a2a" },
  threshold: { active: "#FF4444", inactive: "#3a1a1a" },
  centerline: { active: "#FFFFFF", inactive: "#2a2a2a" },
  taxiway: { active: "#FFB020", inactive: "#3a2a1a" },
};

const RunwayDiagram = () => {
  const [lights, setLights] = useState(initialLights);

  const toggleLight = (id: string) => {
    setLights(prev => prev.map(l => l.id === id ? { ...l, active: !l.active } : l));
  };

  const toggleAll = (type: RunwayLight["type"]) => {
    setLights(prev => {
      const allActive = prev.filter(l => l.type === type).every(l => l.active);
      return prev.map(l => l.type === type ? { ...l, active: !allActive } : l);
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Runway 09/27 — Light Map</h3>
        <div className="flex gap-2">
          {(["edge", "threshold", "centerline", "taxiway"] as const).map(type => (
            <button
              key={type}
              onClick={() => toggleAll(type)}
              className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded border border-border bg-muted text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative w-full aspect-[2/1] bg-muted/50 rounded-lg overflow-hidden border border-border">
        {/* Runway surface */}
        <div className="absolute inset-x-[14%] inset-y-[6%] bg-secondary/60 rounded" />
        {/* Runway markings */}
        <div className="absolute left-1/2 top-[10%] bottom-[10%] w-[2px] border-l-2 border-dashed border-muted-foreground/20 -translate-x-1/2" />
        {/* Runway designation */}
        <span className="absolute top-[10%] left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-muted-foreground/40">09</span>
        <span className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-muted-foreground/40">27</span>
        
        {/* Lights */}
        {lights.map(light => {
          const color = lightColors[light.type];
          return (
            <button
              key={light.id}
              onClick={() => toggleLight(light.id)}
              className="absolute w-3 h-3 rounded-full transition-all duration-300 -translate-x-1/2 -translate-y-1/2 hover:scale-150"
              style={{
                left: `${light.x}%`,
                top: `${light.y}%`,
                backgroundColor: light.active ? color.active : color.inactive,
                boxShadow: light.active ? `0 0 8px ${color.active}80, 0 0 20px ${color.active}30` : "none",
              }}
            />
          );
        })}

        {/* Taxiway label */}
        <span className="absolute right-[1%] top-[35%] text-[9px] font-mono text-accent/60 uppercase">Taxiway A</span>
      </div>

      <div className="flex gap-4 mt-3">
        {Object.entries(lightColors).map(([type, colors]) => (
          <div key={type} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.active }} />
            <span className="text-[10px] font-mono text-muted-foreground capitalize">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RunwayDiagram;
