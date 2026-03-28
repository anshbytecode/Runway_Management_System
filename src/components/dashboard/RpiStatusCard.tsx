import { Cpu, HardDrive, Wifi, Clock, MemoryStick } from "lucide-react";
import StatusIndicator from "./StatusIndicator";

const RpiStatusCard = () => {
  const uptime = "4d 12h 37m";
  const cpuTemp = 52;
  const cpuUsage = 34;
  const memUsage = 61;
  const diskUsage = 28;

  return (
    <div className="rounded-xl border border-border bg-card p-5 glow-primary">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/15 p-2.5">
            <Cpu size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">Raspberry Pi 4B</h3>
            <p className="text-xs text-muted-foreground font-mono">192.168.1.100</p>
          </div>
        </div>
        <StatusIndicator status="online" label="Connected" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatItem icon={Clock} label="Uptime" value={uptime} />
        <StatItem icon={Cpu} label="CPU" value={`${cpuUsage}% · ${cpuTemp}°C`} />
        <StatItem icon={MemoryStick} label="Memory" value={`${memUsage}%`} />
        <StatItem icon={HardDrive} label="Disk" value={`${diskUsage}%`} />
      </div>

      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
        <Wifi size={12} className="text-primary" />
        <span className="text-[10px] font-mono text-muted-foreground">MQTT Broker: Connected · 24 topics</span>
      </div>
    </div>
  );
};

const StatItem = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
    <Icon size={14} className="text-muted-foreground shrink-0" />
    <div>
      <p className="text-[10px] font-mono text-muted-foreground uppercase">{label}</p>
      <p className="text-xs font-mono font-medium text-foreground">{value}</p>
    </div>
  </div>
);

export default RpiStatusCard;
