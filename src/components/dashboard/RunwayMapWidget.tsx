import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

const RunwayMapWidget = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={14} className="text-primary" />
        <h3 className="text-sm font-medium text-foreground">Location Map</h3>
      </div>
      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/50 border border-border">
        {/* Stylized map background */}
        <svg viewBox="0 0 400 225" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Background grid */}
          {Array.from({ length: 20 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 12} x2="400" y2={i * 12} stroke="hsl(220, 20%, 12%)" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 20 }, (_, i) => (
            <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="225" stroke="hsl(220, 20%, 12%)" strokeWidth="0.5" />
          ))}
          
          {/* Roads */}
          <path d="M0 100 L150 100 L180 80 L400 80" fill="none" stroke="hsl(220, 15%, 20%)" strokeWidth="3" />
          <path d="M200 0 L200 225" fill="none" stroke="hsl(220, 15%, 18%)" strokeWidth="2" />
          
          {/* Runway */}
          <rect x="120" y="60" width="160" height="24" rx="2" fill="hsl(220, 20%, 14%)" stroke="hsl(155, 100%, 50%)" strokeWidth="1" opacity="0.8" />
          <line x1="130" y1="72" x2="270" y2="72" stroke="hsl(210, 20%, 30%)" strokeWidth="1" strokeDasharray="6 4" />
          
          {/* Runway lights */}
          {Array.from({ length: 8 }, (_, i) => (
            <circle key={`rl${i}`} cx={135 + i * 18} cy="60" r="2" fill="hsl(155, 100%, 50%)" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <circle key={`rl2${i}`} cx={135 + i * 18} cy="84" r="2" fill="hsl(155, 100%, 50%)" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Taxiway */}
          <path d="M280 72 L300 95 L340 95" fill="none" stroke="hsl(38, 100%, 56%)" strokeWidth="1.5" opacity="0.6" />
          
          {/* Buildings */}
          <rect x="310" y="100" width="20" height="15" rx="2" fill="hsl(220, 20%, 18%)" stroke="hsl(220, 20%, 25%)" strokeWidth="0.5" />
          <rect x="340" y="100" width="25" height="20" rx="2" fill="hsl(220, 20%, 18%)" stroke="hsl(220, 20%, 25%)" strokeWidth="0.5" />
          
          {/* Pi marker */}
          <circle cx="350" cy="110" r="6" fill="hsl(155, 100%, 50%)" opacity="0.3">
            <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="350" cy="110" r="3" fill="hsl(155, 100%, 50%)" />
          
          {/* Labels */}
          <text x="140" y="55" fill="hsl(210, 20%, 50%)" fontSize="8" fontFamily="JetBrains Mono">RWY 09/27</text>
          <text x="305" y="132" fill="hsl(210, 20%, 40%)" fontSize="6" fontFamily="JetBrains Mono">Control Tower</text>
          <text x="342" y="105" fill="hsl(155, 100%, 50%)" fontSize="5" fontFamily="JetBrains Mono">RPi</text>
          <text x="305" y="92" fill="hsl(38, 100%, 56%)" fontSize="6" fontFamily="JetBrains Mono" opacity="0.6">TWY-A</text>

          {/* Coordinates */}
          <text x="10" y="218" fill="hsl(210, 20%, 30%)" fontSize="7" fontFamily="JetBrains Mono">28.5665°N, 77.1031°E</text>
        </svg>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-[10px] font-mono text-muted-foreground">Airport Code: VIDP · Runway 09/27</span>
        <span className="text-[10px] font-mono text-primary">GPS Lock ✓</span>
      </div>
    </div>
  );
};

export default RunwayMapWidget;
