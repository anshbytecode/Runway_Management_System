import { Plane, Settings, Zap, LayoutDashboard } from "lucide-react";
import DeviceCard from "@/components/dashboard/DeviceCard";
import RunwayDiagram from "@/components/dashboard/RunwayDiagram";
import SensorPanel from "@/components/dashboard/SensorPanel";
import RpiStatusCard from "@/components/dashboard/RpiStatusCard";
import ActivityLog from "@/components/dashboard/ActivityLog";
import StatusIndicator from "@/components/dashboard/StatusIndicator";
import TerminalWidget from "@/components/dashboard/TerminalWidget";
import SuperChart from "@/components/dashboard/SuperChart";
import LEDMatrixWidget from "@/components/dashboard/LEDMatrixWidget";
import TimerScheduler from "@/components/dashboard/TimerScheduler";
import AutomationPanel from "@/components/dashboard/AutomationPanel";
import NotificationCenter from "@/components/dashboard/NotificationCenter";
import VirtualPinMonitor from "@/components/dashboard/VirtualPinMonitor";
import RunwayMapWidget from "@/components/dashboard/RunwayMapWidget";
import OTAUpdatePanel from "@/components/dashboard/OTAUpdatePanel";
import GaugeWidget from "@/components/dashboard/GaugeWidget";

const devices = [
  { name: "Edge Light Bank A", type: "bulb" as const, location: "Runway 09 Left", initialOn: true, hasBrightness: true, gpioPin: 17 },
  { name: "Edge Light Bank B", type: "bulb" as const, location: "Runway 09 Right", initialOn: true, hasBrightness: true, gpioPin: 18 },
  { name: "Threshold Lights", type: "bulb" as const, location: "Runway 09 End", initialOn: true, hasBrightness: false, gpioPin: 22 },
  { name: "Centerline Lights", type: "bulb" as const, location: "Runway Center", initialOn: false, hasBrightness: true, gpioPin: 23 },
  { name: "Taxiway A Lights", type: "bulb" as const, location: "Taxiway Alpha", initialOn: true, hasBrightness: true, gpioPin: 24 },
  { name: "Cooling Fan Unit", type: "fan" as const, location: "Control Room", initialOn: true, hasBrightness: false, gpioPin: 25 },
  { name: "Approach Relay", type: "relay" as const, location: "Runway 27 End", initialOn: false, hasBrightness: false, gpioPin: 27 },
  { name: "CCTV Runway", type: "camera" as const, location: "Tower South", initialOn: true, hasBrightness: false, gpioPin: 4 },
];

const Index = () => (
  <div className="min-h-screen bg-background">
    {/* Header */}
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/15 p-2">
            <Plane size={18} className="text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground tracking-tight">RunwayOS</h1>
            <p className="text-[10px] font-mono text-muted-foreground">IoT Runway Management System</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <StatusIndicator status="online" label="System Online" />
          <div className="flex items-center gap-1">
            <NotificationCenter />
            <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
              <Settings size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Main */}
    <main className="container py-6 space-y-6">
      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Devices", value: "6/8", icon: Zap },
          { label: "Runway Status", value: "OPEN", icon: Plane },
          { label: "GPIO Pins Used", value: "8", icon: Settings },
          { label: "Virtual Pins", value: "10", icon: LayoutDashboard },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <div className="rounded-lg bg-muted p-2.5">
              <Icon size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{label}</p>
              <p className="text-lg font-mono font-bold text-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RPi + Runway */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RpiStatusCard />
        <div className="lg:col-span-2">
          <RunwayDiagram />
        </div>
      </div>

      {/* LED Matrix + Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LEDMatrixWidget />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <GaugeWidget value={24} max={50} label="Temp" unit="°C" color="primary" />
          <GaugeWidget value={68} max={100} label="Humidity" unit="%" color="accent" />
          <GaugeWidget value={34} max={100} label="CPU Load" unit="%" color="primary" />
          <GaugeWidget value={12} max={40} label="Wind" unit="km/h" color="accent" />
        </div>
      </div>

      {/* SuperChart */}
      <SuperChart />

      {/* Sensors */}
      <SensorPanel />

      {/* Virtual Pin Monitor */}
      <VirtualPinMonitor />

      {/* Device Grid */}
      <div>
        <h2 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
          <Zap size={14} className="text-primary" />
          Device Controls
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {devices.map(d => (
            <DeviceCard key={d.name} {...d} />
          ))}
        </div>
      </div>

      {/* Timer + Automation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimerScheduler />
        <AutomationPanel />
      </div>

      {/* Terminal + Map + OTA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TerminalWidget />
        <RunwayMapWidget />
        <OTAUpdatePanel />
      </div>

      {/* Activity Log */}
      <ActivityLog />
    </main>
  </div>
);

export default Index;
