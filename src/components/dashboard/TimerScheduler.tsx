import { useState } from "react";
import { Clock, Plus, Trash2, Power } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface TimerRule {
  id: string;
  name: string;
  device: string;
  action: "on" | "off";
  time: string;
  days: string[];
  enabled: boolean;
}

const initialTimers: TimerRule[] = [
  { id: "1", name: "Dusk Lights On", device: "Edge Light Bank A", action: "on", time: "18:30", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], enabled: true },
  { id: "2", name: "Dawn Lights Off", device: "Edge Light Bank A", action: "off", time: "06:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], enabled: true },
  { id: "3", name: "Night Threshold", device: "Threshold Lights", action: "on", time: "19:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], enabled: false },
  { id: "4", name: "Maintenance Off", device: "All Lights", action: "off", time: "02:00", days: ["Sun"], enabled: true },
];

const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TimerScheduler = () => {
  const [timers, setTimers] = useState(initialTimers);
  const [showAdd, setShowAdd] = useState(false);
  const [newTimer, setNewTimer] = useState<{ name: string; device: string; time: string; action: "on" | "off"; days: string[] }>({ name: "", device: "", time: "12:00", action: "on", days: ["Mon", "Tue", "Wed", "Thu", "Fri"] });

  const toggleTimer = (id: string) => {
    setTimers(prev => prev.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t));
  };

  const deleteTimer = (id: string) => {
    setTimers(prev => prev.filter(t => t.id !== id));
  };

  const addTimer = () => {
    if (!newTimer.name || !newTimer.device) return;
    setTimers(prev => [...prev, { ...newTimer, id: Date.now().toString(), enabled: true }]);
    setNewTimer({ name: "", device: "", time: "12:00", action: "on", days: ["Mon", "Tue", "Wed", "Thu", "Fri"] });
    setShowAdd(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-primary" />
          <h3 className="text-sm font-medium text-foreground">Timer & Scheduler</h3>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border text-[10px] font-mono text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
          <Plus size={10} /> Add Rule
        </button>
      </div>

      {showAdd && (
        <div className="mb-4 p-3 rounded-lg border border-primary/20 bg-primary/5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <input value={newTimer.name} onChange={e => setNewTimer(p => ({ ...p, name: e.target.value }))} placeholder="Rule name" className="bg-muted rounded-lg px-3 py-1.5 text-xs font-mono text-foreground outline-none border border-border focus:border-primary/30" />
            <input value={newTimer.device} onChange={e => setNewTimer(p => ({ ...p, device: e.target.value }))} placeholder="Device name" className="bg-muted rounded-lg px-3 py-1.5 text-xs font-mono text-foreground outline-none border border-border focus:border-primary/30" />
          </div>
          <div className="flex gap-2 items-center">
            <input type="time" value={newTimer.time} onChange={e => setNewTimer(p => ({ ...p, time: e.target.value }))} className="bg-muted rounded-lg px-3 py-1.5 text-xs font-mono text-foreground outline-none border border-border focus:border-primary/30" />
            <select value={newTimer.action} onChange={e => setNewTimer(p => ({ ...p, action: e.target.value as "on" | "off" }))} className="bg-muted rounded-lg px-3 py-1.5 text-xs font-mono text-foreground outline-none border border-border">
              <option value="on">Turn ON</option>
              <option value="off">Turn OFF</option>
            </select>
          </div>
          <div className="flex gap-1.5">
            {allDays.map(d => (
              <button
                key={d}
                onClick={() => setNewTimer(p => ({ ...p, days: p.days.includes(d) ? p.days.filter(x => x !== d) : [...p.days, d] }))}
                className={`px-2 py-1 rounded text-[9px] font-mono transition-colors ${newTimer.days.includes(d) ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted text-muted-foreground border border-border"}`}
              >
                {d}
              </button>
            ))}
          </div>
          <button onClick={addTimer} className="w-full py-1.5 rounded-lg bg-primary/15 text-primary text-xs font-mono hover:bg-primary/25 transition-colors">Create Rule</button>
        </div>
      )}

      <div className="space-y-2">
        {timers.map(timer => (
          <div key={timer.id} className={`flex items-center justify-between p-3 rounded-lg border transition-all ${timer.enabled ? "border-border bg-muted/30" : "border-border/50 bg-muted/10 opacity-60"}`}>
            <div className="flex items-center gap-3">
              <Power size={12} className={timer.action === "on" ? "text-primary" : "text-destructive"} />
              <div>
                <p className="text-xs font-medium text-foreground">{timer.name}</p>
                <p className="text-[10px] font-mono text-muted-foreground">{timer.device} · {timer.time} · {timer.days.join(", ")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={timer.enabled} onCheckedChange={() => toggleTimer(timer.id)} />
              <button onClick={() => deleteTimer(timer.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimerScheduler;
