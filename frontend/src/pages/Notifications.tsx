import { ArrowLeft, Bell, CheckCircle, Users, Calendar, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import skildynLogo from "@/assets/skildyn-logo.jpeg";

interface Notification {
  id: number;
  type: "approval" | "invite" | "application";
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "approval",
    message: "Your event 'Campus Hackathon 2026' has been approved",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "invite",
    message: "You've been invited to join 'Code Crafters' team",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "application",
    message: "Your application to 'EcoBuilders' is under review",
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    type: "approval",
    message: "Event 'FinTech Challenge' approval is pending",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    type: "invite",
    message: "Team 'AI Pioneers' has declined your join request",
    time: "3 days ago",
    read: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "approval":
      return <Calendar className="h-5 w-5" />;
    case "invite":
      return <Users className="h-5 w-5" />;
    case "application":
      return <CheckCircle className="h-5 w-5" />;
    default:
      return <Bell className="h-5 w-5" />;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case "approval":
      return "bg-primary/10 text-primary";
    case "invite":
      return "bg-accent/10 text-accent";
    case "application":
      return "bg-secondary/10 text-secondary";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case "approval":
      return "Event Approval";
    case "invite":
      return "Team Invite";
    case "application":
      return "Application";
    default:
      return type;
  }
};

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <img
                src={skildynLogo}
                alt="SkilDyn"
                className="h-8 w-8 rounded-lg object-cover"
              />
              <h1 className="text-lg font-semibold text-foreground">
                Notifications
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-medium text-foreground mb-2">
              No notifications
            </h2>
            <p className="text-muted-foreground">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-border transition-all hover:shadow-sm ${
                  !notification.read ? "bg-primary/5 border-primary/20" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${getNotificationColor(
                        notification.type
                      )}`}
                    >
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {getTypeBadge(notification.type)}
                        </Badge>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
