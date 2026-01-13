import { useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Search, Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Person {
  id: string;
  name: string;
  skills: { name: string; level: string }[];
  availability: string;
  domain: string;
}

const mockPeople: Person[] = [
  {
    id: "1",
    name: "Alex Johnson",
    skills: [
      { name: "React", level: "Advanced" },
      { name: "TypeScript", level: "Intermediate" },
    ],
    availability: "10-15 hrs/week",
    domain: "Frontend Development",
  },
  {
    id: "2",
    name: "Sarah Chen",
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "Machine Learning", level: "Intermediate" },
    ],
    availability: "15-20 hrs/week",
    domain: "AI/ML",
  },
  {
    id: "3",
    name: "Michael Park",
    skills: [
      { name: "UI/UX Design", level: "Advanced" },
      { name: "Figma", level: "Advanced" },
    ],
    availability: "8-10 hrs/week",
    domain: "Design",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    skills: [
      { name: "Node.js", level: "Advanced" },
      { name: "PostgreSQL", level: "Intermediate" },
    ],
    availability: "12-15 hrs/week",
    domain: "Backend Development",
  },
  {
    id: "5",
    name: "David Kim",
    skills: [
      { name: "Flutter", level: "Advanced" },
      { name: "Dart", level: "Advanced" },
    ],
    availability: "10-12 hrs/week",
    domain: "Mobile Development",
  },
];

const InvitePeople = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [invitedIds, setInvitedIds] = useState<Set<string>>(new Set());

  // Handle back navigation - always go to team detail, mark that we came from invite
  const handleBack = () => {
    navigate(`/teams/${teamId}`, { state: { fromInvite: true } });
  };

  const filteredPeople = mockPeople.filter(
    (person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.skills.some((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleInvite = (personId: string) => {
    setInvitedIds((prev) => new Set([...prev, personId]));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-green-100 text-green-700 border-green-200";
      case "Intermediate":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Beginner":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="shrink-0" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Invite People
            </h1>
            <p className="text-sm text-muted-foreground">
              Find teammates for your team
            </p>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="px-4 py-4 border-b border-border bg-background">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, skill, or domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50"
          />
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          <Button variant="outline" size="sm" className="shrink-0">
            <Filter className="h-3.5 w-3.5 mr-1.5" />
            All Skills
          </Button>
          <Button variant="outline" size="sm" className="shrink-0">
            Frontend
          </Button>
          <Button variant="outline" size="sm" className="shrink-0">
            Backend
          </Button>
          <Button variant="outline" size="sm" className="shrink-0">
            Design
          </Button>
          <Button variant="outline" size="sm" className="shrink-0">
            AI/ML
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="px-4 py-4">
        <p className="text-sm text-muted-foreground mb-4">
          {filteredPeople.length} people found
        </p>

        <div className="space-y-3">
          {filteredPeople.map((person) => {
            const isInvited = invitedIds.has(person.id);

            return (
              <div
                key={person.id}
                className="bg-card border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-medium text-primary">
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <Link 
                          to={`/profile/${person.id}`}
                          className="font-medium text-foreground hover:text-primary hover:underline transition-colors"
                        >
                          {person.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {person.domain}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {person.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className={getLevelColor(skill.level)}
                        >
                          {skill.name} - {skill.level}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground mt-2">
                      Available: {person.availability}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant={isInvited ? "outline" : "default"}
                    onClick={() => handleInvite(person.id)}
                    disabled={isInvited}
                    className={
                      isInvited
                        ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                        : ""
                    }
                  >
                    {isInvited ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Sent
                      </>
                    ) : (
                      "Invite"
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InvitePeople;
