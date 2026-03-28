import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Send, Trash2 } from "lucide-react";

const TerminalWidget = () => {
  const [lines, setLines] = useState<{ text: string; type: "input" | "output" | "error" | "system" }[]>([
    { text: "RunwayOS Terminal v1.0 — Raspberry Pi 4B", type: "system" },
    { text: "Connected to MQTT broker at 192.168.1.100:1883", type: "system" },
    { text: "Type 'help' for available commands.", type: "system" },
    { text: "", type: "system" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  const commands: Record<string, () => string[]> = {
    help: () => [
      "Available commands:",
      "  gpio read <pin>     - Read GPIO pin state",
      "  gpio write <pin> <0|1> - Set GPIO pin",
      "  gpio pwm <pin> <0-255> - Set PWM value",
      "  status              - System status",
      "  sensors              - Read all sensors",
      "  lights <on|off>      - Toggle all runway lights",
      "  mqtt pub <topic> <msg> - Publish MQTT message",
      "  reboot               - Reboot Raspberry Pi",
      "  clear                - Clear terminal",
    ],
    status: () => [
      "System Status:",
      "  CPU: 34% | Temp: 52°C | RAM: 61%",
      "  Uptime: 4d 12h 37m | Disk: 28%",
      "  GPIO Active: 8 pins | MQTT: Connected",
      "  Runway: OPEN | Visibility: 8.5km",
    ],
    sensors: () => [
      "Sensor Readings (DHT22 + BMP280 + Anemometer):",
      "  Temperature: 24.5°C",
      "  Humidity: 68%",
      "  Pressure: 1013 hPa",
      "  Wind Speed: 12.3 km/h",
      "  Visibility: 8.5 km",
      `  Timestamp: ${new Date().toISOString()}`,
    ],
    reboot: () => [
      "⚠ REBOOT COMMAND RECEIVED",
      "This is a simulation — no actual reboot triggered.",
    ],
    clear: () => [],
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    const cmd = input.trim().toLowerCase();
    const newLines = [...lines, { text: `$ ${input}`, type: "input" as const }];

    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    const baseCmd = cmd.split(" ")[0];
    if (commands[baseCmd]) {
      const output = commands[baseCmd]();
      output.forEach(line => newLines.push({ text: line, type: "output" }));
    } else if (cmd.startsWith("gpio read")) {
      const pin = cmd.split(" ")[2];
      newLines.push({ text: `GPIO ${pin}: HIGH (1)`, type: "output" });
    } else if (cmd.startsWith("gpio write")) {
      const parts = cmd.split(" ");
      newLines.push({ text: `GPIO ${parts[2]} set to ${parts[3] === "1" ? "HIGH" : "LOW"}`, type: "output" });
    } else if (cmd.startsWith("gpio pwm")) {
      const parts = cmd.split(" ");
      newLines.push({ text: `PWM on GPIO ${parts[2]} set to ${parts[3]}/255`, type: "output" });
    } else if (cmd.startsWith("mqtt pub")) {
      newLines.push({ text: `Published to MQTT topic successfully.`, type: "output" });
    } else if (cmd.startsWith("lights")) {
      const state = cmd.split(" ")[1];
      newLines.push({ text: `All runway lights turned ${state === "on" ? "ON ✓" : "OFF ✗"}`, type: "output" });
    } else {
      newLines.push({ text: `Unknown command: '${cmd}'. Type 'help' for commands.`, type: "error" });
    }

    setLines(newLines);
    setInput("");
  };

  const lineColors = {
    input: "text-primary",
    output: "text-foreground",
    error: "text-destructive",
    system: "text-muted-foreground",
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} className="text-primary" />
          <span className="text-xs font-mono font-medium text-foreground">Terminal</span>
        </div>
        <button onClick={() => setLines([])} className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <Trash2 size={12} />
        </button>
      </div>
      <div ref={scrollRef} className="h-[240px] overflow-y-auto p-3 font-mono text-xs leading-relaxed bg-background/50">
        {lines.map((line, i) => (
          <div key={i} className={lineColors[line.type]}>{line.text || "\u00A0"}</div>
        ))}
      </div>
      <div className="flex items-center border-t border-border bg-muted/20">
        <span className="pl-3 text-xs font-mono text-primary">$</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          className="flex-1 bg-transparent px-2 py-2.5 text-xs font-mono text-foreground outline-none placeholder:text-muted-foreground"
          placeholder="Enter command..."
        />
        <button onClick={handleSubmit} className="px-3 py-2.5 text-muted-foreground hover:text-primary transition-colors">
          <Send size={12} />
        </button>
      </div>
    </div>
  );
};

export default TerminalWidget;
