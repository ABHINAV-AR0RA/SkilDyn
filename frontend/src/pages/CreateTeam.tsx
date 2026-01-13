import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import skildynLogo from "@/assets/skildyn-logo.jpeg";

const mockHackathons = [
  { id: "1", name: "AI Innovation Challenge" },
  { id: "2", name: "Green Tech Hackathon" },
  { id: "3", name: "FinTech Disrupt" },
];

const domains = [
  "Artificial Intelligence",
  "Web Development",
  "Mobile Development",
  "FinTech",
  "Healthcare",
  "Sustainability",
  "EdTech",
  "Other",
];

const skillLevels = ["Beginner", "Intermediate", "Advanced"];

interface RequiredSkill {
  skill: string;
  level: string;
}

const CreateTeam = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hackathonIdFromUrl = searchParams.get("hackathonId");

  const [teamName, setTeamName] = useState("");
  const [selectedHackathon, setSelectedHackathon] = useState(hackathonIdFromUrl || "");
  const [domain, setDomain] = useState("");
  const [projectIdea, setProjectIdea] = useState("");
  const [requiredSkills, setRequiredSkills] = useState<RequiredSkill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Intermediate");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdTeamId, setCreatedTeamId] = useState<string | null>(null);

  const handleAddSkill = () => {
    if (newSkill.trim() && !requiredSkills.some(s => s.skill.toLowerCase() === newSkill.toLowerCase())) {
      setRequiredSkills([...requiredSkills, { skill: newSkill.trim(), level: newSkillLevel }]);
      setNewSkill("");
      setNewSkillLevel("Intermediate");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setRequiredSkills(requiredSkills.filter(s => s.skill !== skillToRemove));
  };

  const handleSubmit = () => {
    if (teamName.trim() && selectedHackathon && domain) {
      // Simulate team creation
      const newTeamId = `team-${Date.now()}`;
      setCreatedTeamId(newTeamId);
      setIsSubmitted(true);
    }
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

  const isFormValid = teamName.trim() && selectedHackathon && domain;

  if (isSubmitted && createdTeamId) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-3 text-center">
          Team created successfully
        </h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Your team "{teamName}" has been created. Now invite teammates to join your team.
        </p>
        <div className="w-full max-w-sm space-y-3">
          <Button
            onClick={() => navigate(`/teams/${createdTeamId}/invite`)}
            className="w-full h-12 bg-primary hover:bg-primary/90"
          >
            Invite Teammates
          </Button>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="w-full h-12"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <img
              src={skildynLogo}
              alt="SkilDyn"
              className="h-8 w-8 rounded-lg"
            />
            <span className="font-medium text-foreground">Create Team</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Team Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Team Name */}
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name *</Label>
              <Input
                id="teamName"
                placeholder="Enter your team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>

            {/* Hackathon Selection */}
            <div className="space-y-2">
              <Label>Hackathon *</Label>
              <Select value={selectedHackathon} onValueChange={setSelectedHackathon}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a hackathon" />
                </SelectTrigger>
                <SelectContent>
                  {mockHackathons.map((hackathon) => (
                    <SelectItem key={hackathon.id} value={hackathon.id}>
                      {hackathon.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Project Domain */}
            <div className="space-y-2">
              <Label>Project Domain *</Label>
              <Select value={domain} onValueChange={setDomain}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Project Idea */}
            <div className="space-y-2">
              <Label htmlFor="projectIdea">Project Idea (optional)</Label>
              <Textarea
                id="projectIdea"
                placeholder="Describe your project idea..."
                value={projectIdea}
                onChange={(e) => setProjectIdea(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Required Skills */}
            <div className="space-y-3">
              <Label>Required Skills & Minimum Level</Label>
              
              {/* Current Skills */}
              {requiredSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {requiredSkills.map((skill) => (
                    <Badge
                      key={skill.skill}
                      variant="outline"
                      className={`${getLevelColor(skill.level)} pr-1`}
                    >
                      {skill.skill} - {skill.level}
                      <button
                        onClick={() => handleRemoveSkill(skill.skill)}
                        className="ml-2 p-0.5 hover:bg-black/10 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Add New Skill */}
              <div className="flex gap-2">
                <Input
                  placeholder="Skill name (e.g., React)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  className="flex-1"
                />
                <Select value={newSkillLevel} onValueChange={setNewSkillLevel}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddSkill}
                  disabled={!newSkill.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full h-12 bg-primary hover:bg-primary/90"
            >
              Create Team
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateTeam;
