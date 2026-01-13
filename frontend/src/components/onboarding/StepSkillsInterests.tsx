import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import SkillRow from "./SkillRow";
import ProgressIndicator from "./ProgressIndicator";

interface StepSkillsInterestsProps {
  onNext: () => void;
}

type SkillLevel = "beginner" | "intermediate" | "advanced" | null;

interface Skill {
  name: string;
  level: SkillLevel;
}

const StepSkillsInterests = ({ onNext }: StepSkillsInterestsProps) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [showError, setShowError] = useState(false);

  const handleNext = () => {
    if (skills.length === 0) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onNext();
  };

  const handleLevelChange = (index: number, level: SkillLevel) => {
    setSkills((prev) =>
      prev.map((skill, i) => (i === index ? { ...skill, level } : skill))
    );
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills((prev) => [...prev, { name: newSkill.trim(), level: null }]);
      setNewSkill("");
      setShowAddSkill(false);
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests((prev) => [...prev, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const handleInterestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddInterest();
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests((prev) => prev.filter((i) => i !== interest));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto w-full">
        <ProgressIndicator currentStep={1} totalSteps={3} />

        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#0F172A] mb-1">
          Skills & Interests
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] mb-6">
          Tell us about your technical skills and what interests you.
        </p>

        {/* Skills Section */}
        <div className="space-y-3 mb-6">
          <label className="text-sm font-medium text-[#0F172A]">
            Your Skills
          </label>
          <p className="text-sm text-[#64748B]">
            Add the skills you want teams to find you for.
          </p>
          {skills.length > 0 && (
          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
            {skills.map((skill, index) => (
              <SkillRow
                key={`${skill.name}-${index}`}
                skill={skill.name}
                level={skill.level}
                onLevelChange={(level) => handleLevelChange(index, level)}
                onRemove={() => handleRemoveSkill(index)}
              />
            ))}
          </div>
          )}

          {showAddSkill ? (
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter skill name"
                className="flex-1 border-[#E5E7EB] focus:border-[#2563EB] focus:ring-[#2563EB]"
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                autoFocus
              />
              <Button 
                onClick={handleAddSkill} 
                size="sm"
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium"
              >
                Add
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowAddSkill(false);
                  setNewSkill("");
                }}
                className="border-[#E5E7EB] text-[#0F172A] hover:bg-[#F1F5F9] font-medium"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowAddSkill(true)}
              className="w-full md:w-auto border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white font-medium"
            >
              + Add Skill
            </Button>
          )}
        </div>

        {/* Interests Section */}
        <div className="space-y-3 mb-8">
          <label className="text-sm font-medium text-[#0F172A]">
            Interests
          </label>
          <div className="flex gap-2">
            <Input
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              onKeyDown={handleInterestKeyDown}
              placeholder="Type an interest"
              className="flex-1 border-[#E5E7EB] focus:border-[#2563EB] focus:ring-[#2563EB]"
            />
            <Button 
              onClick={handleAddInterest}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium"
            >
              Add
            </Button>
          </div>
          {interests.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] text-white rounded-md text-sm font-medium"
                >
                  {interest}
                  <button
                    onClick={() => handleRemoveInterest(interest)}
                    className="text-white hover:text-white/80 transition-colors font-medium"
                    aria-label={`Remove ${interest}`}
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {showError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please add at least one skill before continuing.
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleNext}
          className="w-full md:w-auto md:min-w-[160px] md:float-right h-11 text-base font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepSkillsInterests;
