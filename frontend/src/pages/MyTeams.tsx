import { ArrowLeft, Users, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import skildynLogo from "@/assets/skildyn-logo.jpeg";

const myTeams = [
  {
    id: 1,
    name: "Code Crafters",
    hackathon: "AI Innovation Challenge",
    role: "Developer",
    members: 4,
    maxMembers: 5,
  },
  {
    id: 2,
    name: "EcoBuilders",
    hackathon: "Green Tech Hackathon",
    role: "Team Lead",
    members: 3,
    maxMembers: 4,
  },
];

export default function MyTeams() {
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
                My Teams
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {myTeams.length === 0 ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-medium text-foreground mb-2">
              No teams yet
            </h2>
            <p className="text-muted-foreground mb-4">
              Join or create a team to participate in hackathons.
            </p>
            <Button
              onClick={() => navigate("/hackathons")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Find Hackathons
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {myTeams.map((team) => (
              <Card
                key={team.id}
                className="border-border hover:shadow-sm hover:border-primary/30 transition-all cursor-pointer"
                onClick={() => navigate(`/teams/${team.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-foreground truncate">
                          {team.name}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {team.hackathon}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className={
                              team.role === "Team Lead"
                                ? "border-accent text-accent bg-accent/5"
                                : "border-border text-muted-foreground"
                            }
                          >
                            {team.role}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {team.members}/{team.maxMembers} members
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
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
