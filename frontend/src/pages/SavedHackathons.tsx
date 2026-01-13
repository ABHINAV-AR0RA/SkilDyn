import { useState } from "react";
import { ArrowLeft, Calendar, Bookmark, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import skildynLogo from "@/assets/skildyn-logo.jpeg";

const initialSavedHackathons = [
  {
    id: 1,
    name: "AI Innovation Challenge",
    domain: "Artificial Intelligence",
    deadline: "Jan 25, 2026",
    description: "Build AI-powered solutions for real-world problems",
  },
  {
    id: 2,
    name: "Green Tech Hackathon",
    domain: "Sustainability",
    deadline: "Feb 10, 2026",
    description: "Create sustainable technology solutions",
  },
  {
    id: 3,
    name: "FinTech Solutions",
    domain: "FinTech",
    deadline: "Feb 18, 2026",
    description: "Innovate in financial technology",
  },
  {
    id: 4,
    name: "Healthcare Innovation",
    domain: "Healthcare",
    deadline: "Mar 5, 2026",
    description: "Transform healthcare with technology",
  },
  {
    id: 5,
    name: "EdTech Revolution",
    domain: "EdTech",
    deadline: "Mar 15, 2026",
    description: "Reimagine education through technology",
  },
];

export default function SavedHackathons() {
  const navigate = useNavigate();
  const [savedHackathons, setSavedHackathons] = useState(initialSavedHackathons);

  const handleRemove = (id: number) => {
    setSavedHackathons((prev) => prev.filter((h) => h.id !== id));
  };

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
                Saved Hackathons
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {savedHackathons.length === 0 ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Bookmark className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-medium text-foreground mb-2">
              No saved hackathons
            </h2>
            <p className="text-muted-foreground mb-4">
              Save hackathons to find them quickly later.
            </p>
            <Button
              onClick={() => navigate("/hackathons")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Browse Hackathons
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {savedHackathons.map((hackathon) => (
              <Card
                key={hackathon.id}
                className="border-border hover:shadow-sm transition-all cursor-pointer"
                onClick={() => navigate(`/hackathons/${hackathon.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1">
                        {hackathon.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                        {hackathon.description}
                      </p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge
                          variant="secondary"
                          className="bg-muted text-muted-foreground font-normal"
                        >
                          {hackathon.domain}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{hackathon.deadline}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(hackathon.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
