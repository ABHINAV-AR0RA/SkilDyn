import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Linkedin, Github, MapPin, Clock, Briefcase, Award, ExternalLink, Users, Sparkles, Loader2 } from "lucide-react";
import { useProfilePhoto } from "@/contexts/ProfilePhotoContext";
interface AISummary {
  keySkills: string[];
  experienceLevel: string;
  collaborationStyle: string;
  commitmentLevel: string;
}

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isOwnProfile = id === "me";
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSummaryData, setAiSummaryData] = useState<AISummary | null>(null);
  const { profilePhoto } = useProfilePhoto();
  // Mock profile data
  const profile = {
    name: "Alex Johnson",
    photo: null,
    course: "Computer Science",
    year: "3rd Year",
    skills: [
      { name: "React", level: "advanced" },
      { name: "TypeScript", level: "intermediate" },
      { name: "Python", level: "advanced" },
      { name: "Node.js", level: "intermediate" },
      { name: "Figma", level: "beginner" },
    ],
    availability: "10-15 hours/week",
    interests: ["AI/ML", "Web Development", "Open Source", "EdTech"],
    projects: [
      { name: "EcoTracker", description: "Carbon footprint tracking app", link: "https://github.com/alexjohnson/ecotracker" },
      { name: "StudyBuddy", description: "Peer learning platform", link: "https://studybuddy.app" },
    ],
    certifications: [
      { name: "AWS Cloud Practitioner", verificationLink: "https://aws.amazon.com/verification/12345" },
      { name: "Google UX Design Certificate", verificationLink: "https://coursera.org/verify/abc123" },
    ],
    linkedIn: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    aiSummary: "Alex is a versatile developer with strong experience in full-stack development, particularly React and Python. They excel in collaborative environments and have demonstrated leadership in hackathon projects. Best suited for AI/ML and web development roles.",
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "intermediate":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "advanced":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getLevelLabel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  const generateAISummary = () => {
    setIsAnalyzing(true);
    setAiSummaryData(null);
    
    // Simulate AI analysis with a delay
    setTimeout(() => {
      // Analyze profile data to generate summary
      const advancedSkills = profile.skills.filter(s => s.level === "advanced").map(s => s.name);
      const intermediateSkills = profile.skills.filter(s => s.level === "intermediate").map(s => s.name);
      const keySkills = [...advancedSkills, ...intermediateSkills.slice(0, 2)];
      
      const advancedCount = advancedSkills.length;
      const experienceLevel = advancedCount >= 2 
        ? "Experienced - Multiple advanced skills indicate strong technical foundation"
        : advancedCount === 1 
          ? "Intermediate - Solid foundation with room to grow"
          : "Emerging - Building foundational skills";
      
      const hasTeamProjects = profile.projects.length > 0;
      const hasCertifications = profile.certifications.length > 0;
      const collaborationStyle = hasTeamProjects && hasCertifications
        ? "Proactive learner who contributes to team projects and invests in professional growth"
        : hasTeamProjects
          ? "Hands-on collaborator with demonstrated project experience"
          : "Self-directed learner focused on skill development";
      
      const availabilityHours = parseInt(profile.availability.split("-")[0]) || 10;
      const commitmentLevel = availabilityHours >= 15
        ? "High - Available for substantial project involvement"
        : availabilityHours >= 10
          ? "Moderate - Balanced availability for consistent contributions"
          : "Flexible - Best suited for focused, time-bound tasks";
      
      setAiSummaryData({
        keySkills,
        experienceLevel,
        collaborationStyle,
        commitmentLevel,
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Profile</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={generateAISummary}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isAnalyzing ? "Analyzing..." : "Summarize Profile"}
            </Button>
            {isOwnProfile && (
              <Link to="/profile/edit">
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Header Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {isOwnProfile && profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt={profile.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-semibold">
                    {profile.name.split(" ").map(n => n[0]).join("")}
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">{profile.name}</h2>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <Briefcase className="h-4 w-4" />
                    {profile.course} - {profile.year}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{profile.availability}</span>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 pt-2">
                  {profile.linkedIn && (
                    <a
                      href={`https://${profile.linkedIn}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                  {profile.github && (
                    <a
                      href={`https://${profile.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Invite Button - only show for other profiles */}
            {!isOwnProfile && (
              <div className="mt-6 pt-6 border-t border-border">
                <Button 
                  className="w-full sm:w-auto gap-2"
                  onClick={() => navigate(`/teams/1/invite?userId=${id}`)}
                >
                  <Users className="h-4 w-4" />
                  Invite to Team
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Summary Result Card */}
        {(isAnalyzing || aiSummaryData) && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Profile Summary
              </h3>
              
              {isAnalyzing ? (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing profile...</span>
                </div>
              ) : aiSummaryData && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Key Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {aiSummaryData.keySkills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Experience Level</h4>
                    <p className="text-foreground">{aiSummaryData.experienceLevel}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Collaboration Style</h4>
                    <p className="text-foreground">{aiSummaryData.collaborationStyle}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Estimated Commitment Level</h4>
                    <p className="text-foreground">{aiSummaryData.commitmentLevel}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Skills Section */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background"
                >
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <Badge variant="outline" className={`text-xs ${getLevelColor(skill.level)}`}>
                    {getLevelLabel(skill.level)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interests Section */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1 text-sm"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Collaboration Summary */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              AI Collaboration Summary
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {profile.aiSummary}
            </p>
          </CardContent>
        </Card>

        {/* Featured Projects */}
        {profile.projects.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Featured Projects</h3>
              <div className="space-y-3">
                {profile.projects.map((project, index) => (
                  <a
                    key={index}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{project.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Certifications */}
        {profile.certifications.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Certifications</h3>
              <div className="space-y-3">
                {profile.certifications.map((cert, index) => (
                  <a
                    key={index}
                    href={cert.verificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Award className="h-5 w-5 text-amber-600" />
                    </div>
                    <span className="font-medium text-foreground flex-1">{cert.name}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Profile;
