
import { useState } from "react";
import { Bell, Check, Clock, Trophy, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Notification = {
  id: string;
  type: "match_start" | "prediction_result" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "match_start",
    title: "Liverpool vs Manchester City",
    message: "Match starts in 30 minutes!",
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    read: false,
  },
  {
    id: "2",
    type: "prediction_result",
    title: "Correct prediction!",
    message: "Arsenal 2-1 Chelsea - you predicted the winner!",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: "3",
    type: "system",
    title: "New feature!",
    message: "You can now filter matches by league.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
  },
];

const getTimeAgo = (date: Date): string => {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "match_start":
      return <Clock className="h-4 w-4 text-blue-400" />;
    case "prediction_result":
      return <Trophy className="h-4 w-4 text-amber-400" />;
    default:
      return <Bell className="h-4 w-4 text-blue-400" />;
  }
};

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-white/5 border-white/10 hover:bg-white/10">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500/10 to-green-500/10">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={markAllAsRead}>
              <Check className="h-3.5 w-3.5 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>

        <ScrollArea className="h-[300px] px-2">
          {notifications.length > 0 ? (
            <div className="py-2 space-y-1">
              {notifications.map((notification) => (
                <div key={notification.id} className="relative">
                  <div
                    className={`flex p-3 rounded-lg hover:bg-white/5 transition-all duration-200 ${!notification.read ? "bg-blue-500/5" : ""}`}
                  >
                    <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center mr-3">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {getTimeAgo(notification.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  {notification !== notifications[notifications.length - 1] && (
                    <Separator className="my-1 bg-white/5" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-8">
              <Bell className="h-10 w-10 text-muted-foreground/30 mb-2" />
              <p className="text-muted-foreground text-center">No notifications</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
