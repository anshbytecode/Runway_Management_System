import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const generateData = () => {
  const now = Date.now();
  return Array.from({ length: 30 }, (_, i) => ({
    time: new Date(now - (29 - i) * 60000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    temp: +(22 + Math.random() * 5).toFixed(1),
    humidity: +(60 + Math.random() * 15).toFixed(0),
    wind: +(8 + Math.random() * 10).toFixed(1),
    visibility: +(6 + Math.random() * 5).toFixed(1),
  }));
};

type DataKey = "temp" | "humidity" | "wind" | "visibility";

const channels: { key: DataKey; label: string; color: string; unit: string }[] = [
  { key: "temp", label: "Temperature", color: "hsl(155, 100%, 50%)", unit: "°C" },
  { key: "humidity", label: "Humidity", color: "hsl(200, 100%, 60%)", unit: "%" },
  { key: "wind", label: "Wind Speed", color: "hsl(38, 100%, 56%)", unit: "km/h" },
  { key: "visibility", label: "Visibility", color: "hsl(280, 80%, 65%)", unit: "km" },
];

const SuperChart = () => {
  const [data, setData] = useState(generateData);
  const [activeChannel, setActiveChannel] = useState<DataKey>("temp");
  const [chartType, setChartType] = useState<"line" | "area">("area");

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          temp: +(22 + Math.random() * 5).toFixed(1),
          humidity: +(60 + Math.random() * 15).toFixed(0),
          wind: +(8 + Math.random() * 10).toFixed(1),
          visibility: +(6 + Math.random() * 5).toFixed(1),
        };
        return [...prev.slice(1), newPoint];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const channel = channels.find(c => c.key === activeChannel)!;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="text-sm font-medium text-foreground">SuperChart — Live Data Streams</h3>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border overflow-hidden">
            {(["area", "line"] as const).map(t => (
              <button
                key={t}
                onClick={() => setChartType(t)}
                className={`px-2.5 py-1 text-[10px] font-mono uppercase transition-colors ${
                  chartType === t ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {channels.map(ch => (
          <button
            key={ch.key}
            onClick={() => setActiveChannel(ch.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider border transition-all ${
              activeChannel === ch.key
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.color }} />
            {ch.label}
          </button>
        ))}
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`grad-${channel.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={channel.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={channel.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 15%)" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "hsl(215, 15%, 50%)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "hsl(215, 15%, 50%)" }} tickLine={false} axisLine={false} width={35} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(220, 25%, 8%)", border: "1px solid hsl(220, 20%, 15%)", borderRadius: "8px", fontFamily: "JetBrains Mono", fontSize: "11px" }}
                labelStyle={{ color: "hsl(210, 20%, 90%)" }}
                itemStyle={{ color: channel.color }}
              />
              <Area type="monotone" dataKey={channel.key} stroke={channel.color} fill={`url(#grad-${channel.key})`} strokeWidth={2} dot={false} />
            </AreaChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 15%)" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "hsl(215, 15%, 50%)" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fontFamily: "JetBrains Mono", fill: "hsl(215, 15%, 50%)" }} tickLine={false} axisLine={false} width={35} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(220, 25%, 8%)", border: "1px solid hsl(220, 20%, 15%)", borderRadius: "8px", fontFamily: "JetBrains Mono", fontSize: "11px" }}
                labelStyle={{ color: "hsl(210, 20%, 90%)" }}
                itemStyle={{ color: channel.color }}
              />
              <Line type="monotone" dataKey={channel.key} stroke={channel.color} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <span className="text-[10px] font-mono text-muted-foreground">Live · Updates every 3s</span>
        <span className="text-[10px] font-mono text-primary">
          Latest: {data[data.length - 1]?.[activeChannel]} {channel.unit}
        </span>
      </div>
    </div>
  );
};

export default SuperChart;
