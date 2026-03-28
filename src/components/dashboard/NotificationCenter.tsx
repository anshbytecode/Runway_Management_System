import { useState, useEffect } from "react";
import { Bell, X, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface Notification {
  id: string;
  type: "alert" | "success" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: "1", type: "alert", title: "Low Visibility Warning", message: "Visibility dropped to 2.8km on Runway 09. Approach lights activated automatically.", time: "2 min ago", read: false },
  { id: "2", type: "success", title: "System Health Check", message: "All 8 GPIO devices responding normally. MQTT connection stable.", time: "15 min ago", read: false },
  { id: "3", type: "info", title: "Scheduled Maintenance", message: "Taxiway B lights maintenance scheduled for Sunday 02:00-04:00.", time: "1 hr ago", read: true },
  { id: "4", type: "alert", title: "High Wind Alert", message: "Wind speed reached 22 km/h. Threshold lights set to flash mode.", time: "2 hr ago", read: true },
  { id: "5", type: "success", title: "Firmware Updated", message: "Raspberry Pi firmware updated to v2024.03.28 successfully.", time: "5 hr ago", read: true },
];

const iconMap = {
  alert: AlertTriangle,
  success: CheckCircle,
  info: Info,
};

const colorMap = {
  alert: "text-destructive bg-destructive/10 border-destructive/20",
  success: "text-primary bg-primary/10 border-primary/20",
  info: "text-accent bg-accent/10 border-accent/20",
};

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const dismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
        <Bell size={16} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[9px] font-mono font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-10 z-50 w-80 rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <span className="text-xs font-medium text-foreground">Notifications</span>
              <button onClick={markAllRead} className="text-[10px] font-mono text-primary hover:underline">Mark all read</button>
            </div>
            <div className="max-h-[350px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted-foreground font-mono">No notifications</div>
              ) : (
                notifications.map(n => {
                  const Icon = iconMap[n.type];
                  return (
                    <div key={n.id} className={`flex gap-3 p-3 border-b border-border last:border-b-0 transition-colors ${!n.read ? "bg-muted/20" : ""}`}>
                      <div className={`shrink-0 rounded-lg p-1.5 border ${colorMap[n.type]} h-fit`}>
                        <Icon size={12} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">{n.title}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                        <span className="text-[9px] font-mono text-muted-foreground/60 mt-1 block">{n.time}</span>
                      </div>
                      <button onClick={() => dismiss(n.id)} className="shrink-0 p-0.5 text-muted-foreground hover:text-foreground transition-colors h-fit">
                        <X size={10} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;
