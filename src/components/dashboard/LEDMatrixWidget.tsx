import { useState, useEffect } from "react";

interface LEDIndicatorProps {
  label: string;
  pin: string;
  initialColor?: string;
  blinking?: boolean;
}

const LEDIndicator = ({ label, pin, initialColor = "hsl(155, 100%, 50%)", blinking = false }: LEDIndicatorProps) => {
  const [on, setOn] = useState(true);

  useEffect(() => {
    if (!blinking) return;
    const interval = setInterval(() => setOn(prev => !prev), 800);
    return () => clearInterval(interval);
  }, [blinking]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-5 h-5 rounded-full transition-all duration-300"
        style={{
          backgroundColor: on ? initialColor : "hsl(220, 20%, 12%)",
          boxShadow: on ? `0 0 12px ${initialColor}80, 0 0 30px ${initialColor}30` : "none",
        }}
      />
      <span className="text-[9px] font-mono text-muted-foreground uppercase">{label}</span>
      <span className="text-[8px] font-mono text-muted-foreground/60">{pin}</span>
    </div>
  );
};

const LEDMatrixWidget = () => {
  const leds = [
    { label: "RWY 09", pin: "V0", color: "hsl(155, 100%, 50%)", blinking: false },
    { label: "RWY 27", pin: "V1", color: "hsl(155, 100%, 50%)", blinking: false },
    { label: "THR L", pin: "V2", color: "hsl(0, 80%, 55%)", blinking: false },
    { label: "THR R", pin: "V3", color: "hsl(0, 80%, 55%)", blinking: false },
    { label: "TAXI A", pin: "V4", color: "hsl(38, 100%, 56%)", blinking: false },
    { label: "TAXI B", pin: "V5", color: "hsl(38, 100%, 56%)", blinking: true },
    { label: "APPR", pin: "V6", color: "hsl(200, 100%, 60%)", blinking: true },
    { label: "ALERT", pin: "V7", color: "hsl(0, 80%, 55%)", blinking: true },
    { label: "FAN", pin: "V8", color: "hsl(155, 100%, 50%)", blinking: false },
    { label: "CAM", pin: "V9", color: "hsl(280, 80%, 65%)", blinking: false },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-medium text-foreground mb-4">LED Indicators — Virtual Pins</h3>
      <div className="grid grid-cols-5 gap-4">
        {leds.map(led => (
          <LEDIndicator key={led.pin} label={led.label} pin={led.pin} initialColor={led.color} blinking={led.blinking} />
        ))}
      </div>
    </div>
  );
};

export default LEDMatrixWidget;
