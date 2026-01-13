import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, X, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Invite {
  id: string;
  teamName: string;
  hackathon: string;
  projectDomain: string;
  invitedBy: string;
  invitedAt: string;
  status: "pending" | "accepted" | "declined";
}

const mockInvites: Invite[] = [
  {
    id: "1",
    teamName: "CodeCrafters",
    hackathon: "Google Cloud Hackathon 2024",
    projectDomain: "Cloud Computing",
    invitedBy: "Alex Johnson",
    invitedAt: "2 hours ago",
    status: "pending",
  },
  {
    id: "2",
    teamName: "AI Innovators",
    hackathon: "TensorFlow Dev Summit Hack",
    projectDomain: "Machine Learning",
    invitedBy: "Sarah Chen",
    invitedAt: "1 day ago",
    status: "pending",
  },
  {
    id: "3",
    teamName: "Green Tech Solutions",
    hackathon: "Climate Tech Challenge",
    projectDomain: "Sustainability",
    invitedBy: "Michael Park",
    invitedAt: "3 days ago",
    status: "pending",
  },
];

const TeamInvites = () => {
  const [invites, setInvites] = useState<Invite[]>(mockInvites);

  const handleAccept = (inviteId: string) => {
    setInvites((prev) =>
      prev.map((invite) =>
        invite.id === inviteId ? { ...invite, status: "accepted" } : invite
      )
    );
  };

  const handleDecline = (inviteId: string) => {
    setInvites((prev) =>
      prev.map((invite) =>
        invite.id === inviteId ? { ...invite, status: "declined" } : invite
      )
    );
  };

  const pendingInvites = invites.filter((inv) => inv.status === "pending");
  const respondedInvites = invites.filter((inv) => inv.status !== "pending");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Team Invites
            </h1>
            <p className="text-sm text-muted-foreground">
              {pendingInvites.length} pending invitations
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-4">
        {/* Pending Invites */}
        {pendingInvites.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">
              Pending
            </h2>
            <div className="space-y-3">
              {pendingInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">
                        {invite.teamName}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {invite.hackathon}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {invite.projectDomain}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {invite.invitedAt}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    Invited by {invite.invitedBy}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleAccept(invite.id)}
                    >
                      <Check className="h-4 w-4 mr-1.5" />
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleDecline(invite.id)}
                    >
                      <X className="h-4 w-4 mr-1.5" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Responded Invites */}
        {respondedInvites.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-3">
              Responded
            </h2>
            <div className="space-y-3">
              {respondedInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="bg-card border border-border rounded-lg p-4 opacity-75"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-medium text-foreground">
                          {invite.teamName}
                        </h3>
                        <Badge
                          variant="outline"
                          className={
                            invite.status === "accepted"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-50 text-gray-600 border-gray-200"
                          }
                        >
                          {invite.status === "accepted"
                            ? "Accepted"
                            : "Declined"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {invite.hackathon}
                      </p>
                      <Badge
                        variant="secondary"
                        className="text-xs mt-2"
                      >
                        {invite.projectDomain}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {invites.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-foreground mb-1">
              No invitations yet
            </h3>
            <p className="text-sm text-muted-foreground">
              When teams invite you, they will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamInvites;
