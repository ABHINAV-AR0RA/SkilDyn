import { useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Users, 
  Target, 
  Calendar, 
  Lightbulb,
  Code,
  UserPlus,
  Settings,
  FileText,
  UserMinus
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProfilePhoto } from "@/contexts/ProfilePhotoContext";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
}

const initialMockTeam = {
  id: "1",
  name: "EcoTrack Innovators",
  hackathon: {
    id: "1",
    name: "TechForGood 2024",
    deadline: "2024-03-15",
  },
  domain: "Sustainability",
  projectIdea: "We're building a mobile-first carbon footprint tracker that helps users understand and reduce their environmental impact. The app will use gamification to encourage sustainable habits and provide actionable insights based on daily activities.",
  requiredSkills: [
    { skill: "React", level: "Intermediate", filled: true },
    { skill: "Node.js", level: "Beginner", filled: true },
    { skill: "UI/UX Design", level: "Intermediate", filled: false },
    { skill: "Data Visualization", level: "Beginner", filled: false },
  ],
  members: [
    { id: "user1", name: "Alex Chen", role: "Team Lead", initials: "AC" },
    { id: "user2", name: "Priya Sharma", role: "Backend Developer", initials: "PS" },
    { id: "user3", name: "Jordan Lee", role: "Frontend Developer", initials: "JL" },
  ] as TeamMember[],
  maxMembers: 5,
  createdAt: "2024-01-20",
};

// Mock: Current user ID (in a real app, this would come from auth context)
const currentUserId = "user1";

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

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [team, setTeam] = useState(initialMockTeam);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);
  const { profilePhoto } = useProfilePhoto();
  const openPositions = team.requiredSkills.filter(s => !s.filled).length;
  const isCurrentUserMember = team.members.some(member => member.id === currentUserId);
  const isTeamLead = team.members.some(member => member.id === currentUserId && member.role === "Team Lead");

  // Handle back navigation - avoid loop with invite or applications page
  const handleBack = () => {
    const fromInvite = location.state?.fromInvite;
    const fromApplications = location.state?.fromApplications;
    if (fromInvite || fromApplications) {
      navigate("/dashboard");
    } else {
      navigate(-1);
    }
  };

  const handleRemoveMember = (member: TeamMember) => {
    setMemberToRemove(member);
    setIsRemoveDialogOpen(true);
  };

  const confirmRemoveMember = () => {
    if (memberToRemove) {
      setTeam(prev => ({
        ...prev,
        members: prev.members.filter(m => m.id !== memberToRemove.id)
      }));
      setIsRemoveDialogOpen(false);
      setMemberToRemove(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleBack}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-foreground truncate">{team.name}</h1>
              <p className="text-sm text-muted-foreground">{team.hackathon.name}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Team Overview */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{team.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Target className="h-3.5 w-3.5" />
                      <span>{team.domain}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Hackathon Info */}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Hackathon:</span>
                  <Link 
                    to={`/hackathon/${team.hackathon.id}`}
                    className="text-primary hover:underline"
                  >
                    {team.hackathon.name}
                  </Link>
                </div>

                {/* Deadline */}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Deadline:</span>
                  <span className="text-foreground">{team.hackathon.deadline}</span>
                </div>
              </CardContent>
            </Card>

            {/* Project Idea */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  Project Idea
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {team.projectIdea}
                </p>
              </CardContent>
            </Card>

            {/* Required Skills */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" />
                  Required Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {team.requiredSkills.map((skill, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getLevelColor(skill.level)}`}
                        >
                          {skill.level}
                        </Badge>
                      </div>
                      <Badge 
                        variant={skill.filled ? "secondary" : "outline"}
                        className={skill.filled ? "bg-emerald-100 text-emerald-700" : "border-amber-300 text-amber-600"}
                      >
                        {skill.filled ? "Filled" : "Open"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Team Members
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {team.members.length}/{team.maxMembers}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {team.members.map((member) => (
                    <div 
                      key={member.id}
                      className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                    >
                      <Link 
                        to={`/profile/${member.id}`}
                        className="flex items-center gap-3 flex-1 hover:bg-muted/50 rounded-md px-2 -mx-2 py-1 transition-colors"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarImage 
                            src={member.id === currentUserId ? (profilePhoto || "") : ""} 
                            alt={member.name} 
                          />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </Link>
                      {isTeamLead && member.role !== "Team Lead" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveMember(member)}
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Apply Card */}
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <p className="text-2xl font-semibold text-foreground">{openPositions}</p>
                  <p className="text-sm text-muted-foreground">Open Positions</p>
                </div>

                {isCurrentUserMember ? (
                  <div className="text-center py-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <p className="text-sm font-medium text-emerald-700">You are a member</p>
                  </div>
                ) : (
                  <>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => navigate(`/teams/${id}/apply`)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Apply to Join
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-3">
                      Your application will be reviewed by the team lead
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Domain</span>
                  <span className="font-medium text-foreground">{team.domain}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Members</span>
                  <span className="font-medium text-foreground">{team.members.length}/{team.maxMembers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium text-foreground">{team.createdAt}</span>
                </div>
              </CardContent>
            </Card>

            {/* Manage Team - Only visible to Team Lead */}
            {isTeamLead && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings className="h-4 w-4 text-primary" />
                    Manage Team
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate(`/teams/${id}/applications`)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Applications
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => navigate(`/teams/${id}/invite`, { state: { fromTeam: true } })}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Members
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Remove Member Dialog */}
      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {memberToRemove?.name} from the team? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end mt-4">
            <Button variant="outline" onClick={() => setIsRemoveDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmRemoveMember}>
              Remove Member
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamDetail;
