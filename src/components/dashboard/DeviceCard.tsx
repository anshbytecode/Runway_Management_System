import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import StatusIndicator from "./StatusIndicator";
import { Lightbulb, Fan, Thermometer, Eye, Radio } from "lucide-react";

interface DeviceCardProps {
  name: string;
  type: "bulb" | "fan" | "sensor" | "camera" | "relay";
  location: string;
  initialOn?: boolean;
  hasBrightness?: boolean;
  gpioPin?: number;
}

const iconMap = {
  bulb: Lightbulb,
  fan: Fan,
  sensor: Thermometer,
  camera: Eye,
  relay: Radio,
};

const DeviceCard = ({ name, type, location, initialOn = false, hasBrightness = false, gpioPin }: DeviceCardProps) => {
  const [isOn, setIsOn] = useState(initialOn);
  const [brightness, setBrightness] = useState([75]);
  const Icon = iconMap[type];

  return (
    <div className={`relative rounded-xl border bg-card p-5 transition-all duration-300 ${isOn ? "border-primary/30 glow-primary" : "border-border"}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`rounded-lg p-2.5 transition-colors ${isOn ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
            <Icon size={20} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">{name}</h3>
            <p className="text-xs text-muted-foreground font-mono">{location}</p>
          </div>
        </div>
        <Switch checked={isOn} onCheckedChange={setIsOn} />
      </div>
      
      {hasBrightness && isOn && (
        <div className="mt-3 space-y-2">
          <div className="flex justify-between text-xs font-mono text-muted-foreground">
            <span>Brightness</span>
            <span>{brightness[0]}%</span>
          </div>
          <Slider value={brightness} onValueChange={setBrightness} max={100} step={1} />
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <StatusIndicator status={isOn ? "online" : "offline"} label={isOn ? "Active" : "Inactive"} />
        {gpioPin !== undefined && (
          <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">GPIO {gpioPin}</span>
        )}
      </div>
    </div>
  );
};

export default DeviceCard;
