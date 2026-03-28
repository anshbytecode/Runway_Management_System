import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Upload, RefreshCw, Shield, Cpu } from "lucide-react";

const OTAUpdatePanel = () => {
  const [updating, setUpdating] = useState(false);
  const [progress, setProgress] = useState(0);

  const startUpdate = () => {
    setUpdating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUpdating(false);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 200);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Download size={14} className="text-primary" />
        <h3 className="text-sm font-medium text-foreground">OTA Updates & Device Info</h3>
      </div>

      <Tabs defaultValue="firmware" className="w-full">
        <TabsList className="bg-muted/50 w-full grid grid-cols-3">
          <TabsTrigger value="firmware" className="text-[10px] font-mono">Firmware</TabsTrigger>
          <TabsTrigger value="config" className="text-[10px] font-mono">Config</TabsTrigger>
          <TabsTrigger value="system" className="text-[10px] font-mono">System</TabsTrigger>
        </TabsList>

        <TabsContent value="firmware" className="mt-3 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
            <div>
              <p className="text-xs font-medium text-foreground">Current Version</p>
              <p className="text-[10px] font-mono text-primary">v2024.03.28-stable</p>
            </div>
            <Shield size={14} className="text-primary" />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
            <div>
              <p className="text-xs font-medium text-foreground">Latest Available</p>
              <p className="text-[10px] font-mono text-accent">v2024.04.01-stable</p>
            </div>
            <RefreshCw size={14} className="text-accent" />
          </div>
          {updating && (
            <div className="space-y-1.5">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-200" style={{ width: `${Math.min(progress, 100)}%` }} />
              </div>
              <p className="text-[10px] font-mono text-muted-foreground text-center">{Math.min(Math.round(progress), 100)}% — Flashing firmware...</p>
            </div>
          )}
          <button onClick={startUpdate} disabled={updating} className="w-full py-2 rounded-lg bg-primary/15 text-primary text-xs font-mono hover:bg-primary/25 transition-colors disabled:opacity-50">
            <Upload size={12} className="inline mr-1.5" />
            {updating ? "Updating..." : "Install Update (OTA)"}
          </button>
        </TabsContent>

        <TabsContent value="config" className="mt-3 space-y-2">
          {[
            { key: "MQTT Broker", val: "192.168.1.100:1883" },
            { key: "WiFi SSID", val: "RunwayNet-5G" },
            { key: "Auth Token", val: "••••••••a3f8" },
            { key: "Data Interval", val: "3000ms" },
            { key: "GPIO Mode", val: "BCM" },
            { key: "PWM Freq", val: "1000 Hz" },
          ].map(({ key, val }) => (
            <div key={key} className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
              <span className="text-[10px] font-mono text-muted-foreground">{key}</span>
              <span className="text-[10px] font-mono text-foreground">{val}</span>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="system" className="mt-3 space-y-2">
          {[
            { key: "Board", val: "Raspberry Pi 4 Model B" },
            { key: "SoC", val: "BCM2711 (Cortex-A72)" },
            { key: "RAM", val: "4GB LPDDR4" },
            { key: "OS", val: "Raspberry Pi OS Lite (64-bit)" },
            { key: "Kernel", val: "6.1.0-rpi7-rpi-v8" },
            { key: "Python", val: "3.11.2" },
            { key: "Node.js", val: "20.11.0" },
            { key: "GPIO Lib", val: "RPi.GPIO 0.7.1" },
          ].map(({ key, val }) => (
            <div key={key} className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
              <span className="text-[10px] font-mono text-muted-foreground">{key}</span>
              <span className="text-[10px] font-mono text-foreground">{val}</span>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OTAUpdatePanel;
