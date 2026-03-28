import { useState } from "react";
import { Workflow, Plus, Trash2, ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  enabled: boolean;
}

const initialRules: AutomationRule[] = [
  { id: "1", name: "Low Visibility Alert", trigger: "Visibility < 3km", condition: "Wind > 15 km/h", action: "Enable approach lights + Send alert", enabled: true },
  { id: "2", name: "Auto Night Mode", trigger: "Light sensor < 200 lux", condition: "Time > 17:00", action: "Turn on all runway lights at 80%", enabled: true },
  { id: "3", name: "Overheat Protection", trigger: "RPi CPU Temp > 70°C", condition: "Always", action: "Enable cooling fan + Send notification", enabled: true },
  { id: "4", name: "Wind Alert", trigger: "Wind Speed > 25 km/h", condition: "Runway is OPEN", action: "Flash threshold lights + Alert ATC", enabled: false },
  { id: "5", name: "Maintenance Window", trigger: "Time = 02:00", condition: "Day = Sunday", action: "Dim all lights to 20%", enabled: true },
];

const AutomationPanel = () => {
  const [rules, setRules] = useState(initialRules);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const deleteRule = (id: string) => {
    setRules(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Workflow size={14} className="text-accent" />
          <h3 className="text-sm font-medium text-foreground">Automations</h3>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">{rules.filter(r => r.enabled).length} active</span>
      </div>

      <div className="space-y-2">
        {rules.map(rule => (
          <div key={rule.id} className={`p-3 rounded-lg border transition-all ${rule.enabled ? "border-border bg-muted/30" : "border-border/50 bg-muted/10 opacity-50"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-foreground">{rule.name}</span>
              <div className="flex items-center gap-2">
                <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                <button onClick={() => deleteRule(rule.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">IF {rule.trigger}</span>
              <ArrowRight size={10} className="text-muted-foreground" />
              <span className="px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">WHEN {rule.condition}</span>
              <ArrowRight size={10} className="text-muted-foreground" />
              <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground border border-border">THEN {rule.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomationPanel;
