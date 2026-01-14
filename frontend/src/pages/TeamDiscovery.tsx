import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Users, Code, Target } from "lucide-react";

const mockTeams = [
  {
    id: "1",
    name: "EcoTrack Innovators",
    domain: "Sustainability",
    description: "Building a carbon footprint tracker",
    requiredSkills: [
      { skill: "React", level: "Intermediate" },
      { skill: "Node.js", level: "Beginner" },
      { skill: "UI/UX Design", level: "Intermediate" },
    ],
    memberCount: 3,
    maxMembers: 5,
  },
  {
    id: "2",
    name: "HealthSync",
    domain: "Healthcare",
    description: "AI-powered health monitoring",
    requiredSkills: [
      { skill: "Python", level: "Advanced" },
      { skill: "Machine Learning", level: "Intermediate" },
      { skill: "Flutter", level: "Beginner" },
    ],
    memberCount: 2,
    maxMembers: 4,
  },
  {
    id: "3",
    name: "EduBridge",
    domain: "Education",
    description: "Accessible learning platform",
    requiredSkills: [
      { skill: "React", level: "Intermediate" },
      { skill: "TypeScript", level: "Intermediate" },
      { skill: "PostgreSQL", level: "Beginner" },
    ],
    memberCount: 4,
    maxMembers: 5,
  },
  {
    id: "4",
    name: "FinFlow",
    domain: "Fintech",
    description: "Personal finance management tool",
    requiredSkills: [
      { skill: "React Native", level: "Intermediate" },
      { skill: "Node.js", level: "Intermediate" },
      { skill: "MongoDB", level: "Beginner" },
    ],
    memberCount: 2,
    maxMembers: 4,
  },
];

const hackathonInfo = {
  id: "1",
  name: "TechForGood 2024",
  domain: "Sustainability",
};

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Intermediate":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Advanced":
      return "bg-primary/10 text-primary border-primary/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const TeamDiscovery = () => {
  const { hackathonId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("");

  const filteredTeams = mockTeams.filter((team) => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = !skillFilter || 
      team.requiredSkills.some(s => s.skill.toLowerCase().includes(skillFilter.toLowerCase()));
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Teams</h1>
              <p className="text-sm text-muted-foreground">{hackathonInfo.name}</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Filter Pills */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={skillFilter === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setSkillFilter("")}
            className="shrink-0"
          >
            All Skills
          </Button>
          <Button
            variant={skillFilter === "React" ? "default" : "outline"}
            size="sm"
            onClick={() => setSkillFilter("React")}
            className="shrink-0"
          >
            React
          </Button>
          <Button
            variant={skillFilter === "Python" ? "default" : "outline"}
            size="sm"
            onClick={() => setSkillFilter("Python")}
            className="shrink-0"
          >
            Python
          </Button>
          <Button
            variant={skillFilter === "Node.js" ? "default" : "outline"}
            size="sm"
            onClick={() => setSkillFilter("Node.js")}
            className="shrink-0"
          >
            Node.js
          </Button>
          <Button
            variant={skillFilter === "UI/UX" ? "default" : "outline"}
            size="sm"
            onClick={() => setSkillFilter("UI/UX")}
            className="shrink-0"
          >
            UI/UX
          </Button>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filteredTeams.length} {filteredTeams.length === 1 ? "team" : "teams"} found
        </p>

        {/* Team Cards */}
        <div className="space-y-4">
          {filteredTeams.map((team) => (
            <Card key={team.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Team Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{team.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Target className="h-3.5 w-3.5" />
                          <span>{team.domain}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {team.description}
                    </p>

                    {/* Required Skills */}
                    <div className="mb-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <Code className="h-3 w-3" />
                        Required Skills
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {team.requiredSkills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={`text-xs ${getLevelColor(skill.level)}`}
                          >
                            {skill.skill} · {skill.level}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Member Count */}
                    <p className="text-xs text-muted-foreground">
                      {team.memberCount}/{team.maxMembers} members
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex md:flex-col gap-2 md:items-end">
                    <Link to={`/team/${team.id}`} className="flex-1 md:flex-none">
                      <Button className="w-full md:w-auto">View</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No teams found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeamDiscovery;