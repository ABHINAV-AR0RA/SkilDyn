import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProgressIndicator from "./ProgressIndicator";

interface StepProfileStrengthProps {
  onFinish: () => void;
  onBack: () => void;
}

interface Project {
  name: string;
  link: string;
}

interface Certification {
  name: string;
  verificationLink: string;
}

const StepProfileStrength = ({ onFinish, onBack }: StepProfileStrengthProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  
  const [showProjectInput, setShowProjectInput] = useState(false);
  const [showCertInput, setShowCertInput] = useState(false);
  
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectLink, setNewProjectLink] = useState("");
  const [newCertName, setNewCertName] = useState("");
  const [newCertLink, setNewCertLink] = useState("");

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      setProjects((prev) => [...prev, { name: newProjectName.trim(), link: newProjectLink.trim() }]);
      setNewProjectName("");
      setNewProjectLink("");
      setShowProjectInput(false);
    }
  };

  const handleAddCertification = () => {
    if (newCertName.trim() && newCertLink.trim()) {
      setCertifications((prev) => [...prev, { name: newCertName.trim(), verificationLink: newCertLink.trim() }]);
      setNewCertName("");
      setNewCertLink("");
      setShowCertInput(false);
    }
  };

  const profileStrength = () => {
    let strength = 0;
    if (projects.length > 0) strength += 25;
    if (certifications.length > 0) strength += 25;
    if (linkedinUrl.trim()) strength += 25;
    if (githubUrl.trim()) strength += 25;
    return strength;
  };

  const strength = profileStrength();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto w-full">
        <ProgressIndicator currentStep={3} totalSteps={3} />

        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#0F172A] mb-1">
          Profile Strength
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] mb-4">
          Add more details to stand out to teammates.
        </p>

        {/* Profile strength indicator */}
        <div className="mb-6 p-4 bg-white rounded-lg border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#0F172A]">
              Profile Strength
            </span>
            <span
              className={`text-sm font-semibold px-2.5 py-1 rounded ${
                strength >= 75
                  ? "text-[#22C55E] bg-[#F0FDF4]"
                  : strength >= 50
                  ? "text-[#F59E0B] bg-[#FFFBEB]"
                  : "text-[#2563EB] bg-[#EFF6FF]"
              }`}
            >
              {strength}%
            </span>
          </div>
          <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                strength >= 75
                  ? "bg-[#22C55E]"
                  : strength >= 50
                  ? "bg-[#F59E0B]"
                  : "bg-[#2563EB]"
              }`}
              style={{ width: `${strength}%` }}
            />
          </div>
          <p className="text-xs text-[#64748B] mt-2">
            {strength < 50 && "Add more details to improve your profile"}
            {strength >= 50 && strength < 75 && "Good progress! Keep going"}
            {strength >= 75 && strength < 100 && "Almost there! Just a bit more"}
            {strength === 100 && "Profile complete!"}
          </p>
        </div>

        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          {/* Featured Projects */}
          <div className="space-y-3 p-4 bg-white rounded-lg border border-[#E5E7EB]">
            <label className="text-sm font-medium text-[#0F172A]">
              Featured Projects
            </label>
            
            {projects.length > 0 && (
              <div className="space-y-2">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-md border border-[#E5E7EB]"
                  >
                    <div>
                      <span className="text-sm font-medium text-[#0F172A]">{project.name}</span>
                      {project.link && (
                        <span className="block text-xs text-[#64748B] truncate max-w-[200px]">{project.link}</span>
                      )}
                    </div>
                    <button
                      onClick={() => setProjects((prev) => prev.filter((_, i) => i !== index))}
                      className="text-[#0F172A] hover:text-[#2563EB] transition-colors font-medium"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}

            {showProjectInput ? (
              <div className="space-y-2">
                <Input
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Project name"
                  className="w-full border-[#E5E7EB] focus:border-[#2563EB] focus:ring-[#2563EB]"
                  autoFocus
                />
                <Input
                  value={newProjectLink}
                  onChange={(e) => setNewProjectLink(e.target.value)}
                  placeholder="Project link (optional)"
                  className="w-full border-[#E5E7EB] focus:border-[#2563EB] focus:ring-[#2563EB]"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={handleAddProject} 
                    className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium"
                  >
                    Add Project
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowProjectInput(false);
                      setNewProjectName("");
                      setNewProjectLink("");
                    }}
                    className="border-[#E5E7EB] text-[#0F172A] hover:bg-[#F1F5F9] font-medium"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => setShowProjectInput(true)}
                className="w-full border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white font-medium"
              >
                + Add Project
              </Button>
            )}
          </div>

          {/* Certifications */}
          <div className="space-y-3 p-4 bg-white rounded-lg border border-[#E5E7EB]">
            <label className="text-sm font-medium text-[#0F172A]">
              Certifications
            </label>

            {certifications.length > 0 && (
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-md border border-[#E5E7EB]"
                  >
                    <div>
                      <span className="text-sm font-medium text-[#0F172A]">{cert.name}</span>
                      <span className="block text-xs text-[#64748B] truncate max-w-[200px]">{cert.verificationLink}</span>
                    </div>
                    <button
                      onClick={() => setCertifications((prev) => prev.filter((_, i) => i !== index))}
                      className="text-[#0F172A] hover:text-[#2563EB] transition-colors font-medium"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}

            {showCertInput ? (
              <div className="space-y-2">
                <Input
                  value={newCertName}
                  onChange={(e) => setNewCertName(e.target.value)}
                  placeholder="Certificate name"
                  className="w-full border-[#E5E7EB] focus:border-[#2563EB] focus:ring-[#2563EB]"
                  autoFocus
                />
                <Input
                  value={newCertLink}
                  onChange={(e) => setNewCertLink(e.target.value)}
                  placeholder="Verification link (required)"
                  className="w-full border-[#E5E7EB] focus:border-[#2563EB] focus:ring-[#2563EB]"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={handleAddCertification} 
                    disabled={!newCertName.trim() || !newCertLink.trim()}
                    className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium disabled:opacity-50"
                  >
                    Add Certification
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCertInput(false);
                      setNewCertName("");
                      setNewCertLink("");
                    }}
                    className="border-[#E5E7EB] text-[#0F172A] hover:bg-[#F1F5F9] font-medium"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => setShowCertInput(true)}
                className="w-full border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white font-medium"
              >
                + Add Certification
              </Button>
            )}
          </div>

          {/* LinkedIn URL */}
          <div className="space-y-2 p-4 bg-white rounded-lg border border-[#E5E7EB]">
            <label className="text-sm font-medium text-[#0F172A]">
              LinkedIn URL
            </label>
            <Input
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full border-[#E5E7EB] focus:border-[#2563EB] focus:ring-[#2563EB]"
            />
          </div>

          {/* GitHub URL */}
          <div className="space-y-2 p-4 bg-white rounded-lg border border-[#E5E7EB]">
            <label className="text-sm font-medium text-[#0F172A]">
              GitHub URL
            </label>
            <Input
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/yourusername"
              className="w-full border-[#E5E7EB] focus:border-[#2563EB] focus:ring-[#2563EB]"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse md:flex-row md:justify-between gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full md:w-auto md:min-w-[100px] h-11 text-base font-medium border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white"
          >
            Back
          </Button>
          <Button
            onClick={onFinish}
            className="w-full md:w-auto md:min-w-[160px] h-11 text-base font-medium bg-[#22C55E] hover:bg-[#16A34A] text-white"
          >
            Finish Setup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepProfileStrength;
