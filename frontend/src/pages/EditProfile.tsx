import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Plus, X, Trash2, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProfilePhoto } from "@/contexts/ProfilePhotoContext";
type SkillLevel = "beginner" | "intermediate" | "advanced";

interface Skill {
  name: string;
  level: SkillLevel;
}

interface Project {
  name: string;
  link: string;
}

interface Certification {
  name: string;
  verificationLink: string;
}

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profilePhoto, setProfilePhoto } = useProfilePhoto();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(profilePhoto);

  // State for all editable fields
  const [skills, setSkills] = useState<Skill[]>([
    { name: "React", level: "advanced" },
    { name: "TypeScript", level: "intermediate" },
    { name: "Python", level: "advanced" },
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>("intermediate");

  const [interests, setInterests] = useState<string[]>(["AI/ML", "Web Development", "Open Source"]);
  const [newInterest, setNewInterest] = useState("");

  const [hoursPerDay, setHoursPerDay] = useState(3);

  const [projects, setProjects] = useState<Project[]>([
    { name: "EcoTracker", link: "https://github.com/alexjohnson/ecotracker" },
  ]);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectLink, setNewProjectLink] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);

  const [certifications, setCertifications] = useState<Certification[]>([
    { name: "AWS Cloud Practitioner", verificationLink: "https://aws.amazon.com/verification/12345" },
  ]);
  const [newCertName, setNewCertName] = useState("");
  const [newCertLink, setNewCertLink] = useState("");
  const [showCertForm, setShowCertForm] = useState(false);

  const [linkedIn, setLinkedIn] = useState("linkedin.com/in/alexjohnson");
  const [github, setGithub] = useState("github.com/alexjohnson");

  // Handlers
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.find(s => s.name.toLowerCase() === newSkill.toLowerCase())) {
      setSkills([...skills, { name: newSkill.trim(), level: newSkillLevel }]);
      setNewSkill("");
      setNewSkillLevel("intermediate");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleUpdateSkillLevel = (index: number, level: SkillLevel) => {
    const updated = [...skills];
    updated[index].level = level;
    setSkills(updated);
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const handleAddProject = () => {
    if (newProjectName.trim() && newProjectLink.trim()) {
      setProjects([...projects, { name: newProjectName.trim(), link: newProjectLink.trim() }]);
      setNewProjectName("");
      setNewProjectLink("");
      setShowProjectForm(false);
    }
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleAddCert = () => {
    if (newCertName.trim() && newCertLink.trim()) {
      setCertifications([...certifications, { name: newCertName.trim(), verificationLink: newCertLink.trim() }]);
      setNewCertName("");
      setNewCertLink("");
      setShowCertForm(false);
    }
  };

  const handleRemoveCert = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save the profile photo when saving changes
    if (previewPhoto !== profilePhoto) {
      setProfilePhoto(previewPhoto);
    }
    toast({
      title: "Changes saved",
      description: "Your profile has been updated successfully.",
    });
    navigate("/profile/me");
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/profile/me">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Edit Profile</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-32">
        {/* Profile Photo Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Profile Photo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="relative">
              {previewPhoto ? (
                <img
                  src={previewPhoto}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-semibold">
                  AJ
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1.5">
                <Camera className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Change photo
            </Button>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Existing Skills */}
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/30"
                >
                  <span className="flex-1 font-medium text-foreground">{skill.name}</span>
                  <Select
                    value={skill.level}
                    onValueChange={(value: SkillLevel) => handleUpdateSkillLevel(index, value)}
                  >
                    <SelectTrigger className="w-32 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveSkill(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Add New Skill */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Input
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                className="flex-1"
              />
              <Select value={newSkillLevel} onValueChange={(value: SkillLevel) => setNewSkillLevel(value)}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleAddSkill} className="gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Interests Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Interests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm flex items-center gap-2"
                >
                  {interest}
                  <button
                    onClick={() => handleRemoveInterest(index)}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-3">
              <Input
                placeholder="Add an interest..."
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddInterest()}
                className="flex-1"
              />
              <Button onClick={handleAddInterest} className="gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Availability Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label>Hours per day</Label>
              <div className="space-y-3">
                <Slider
                  value={[hoursPerDay]}
                  onValueChange={(value) => setHoursPerDay(value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1 hour</span>
                  <span className="font-medium text-foreground">{hoursPerDay} hours/day</span>
                  <span>10 hours</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Featured Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Existing Projects */}
            <div className="space-y-3">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border bg-muted/30"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{project.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1 break-all">{project.link}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveProject(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Project Form */}
            {showProjectForm ? (
              <div className="p-4 rounded-lg border border-border space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="Enter project name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectLink">Project Link</Label>
                  <Input
                    id="projectLink"
                    placeholder="https://github.com/..."
                    value={newProjectLink}
                    onChange={(e) => setNewProjectLink(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleAddProject} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Project
                  </Button>
                  <Button variant="outline" onClick={() => setShowProjectForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setShowProjectForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Certifications Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Certifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border bg-muted/30"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1 break-all">{cert.verificationLink}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveCert(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Certification Form */}
            {showCertForm ? (
              <div className="p-4 rounded-lg border border-border space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="certName">Certificate Name</Label>
                  <Input
                    id="certName"
                    placeholder="Enter certificate name"
                    value={newCertName}
                    onChange={(e) => setNewCertName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certLink">Verification Link</Label>
                  <Input
                    id="certLink"
                    placeholder="https://..."
                    value={newCertLink}
                    onChange={(e) => setNewCertLink(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleAddCert} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Certification
                  </Button>
                  <Button variant="outline" onClick={() => setShowCertForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setShowCertForm(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Certification
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Social Links Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                placeholder="linkedin.com/in/yourprofile"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input
                id="github"
                placeholder="github.com/yourusername"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => navigate("/profile/me")}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;