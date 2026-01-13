import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import ProgressIndicator from "./ProgressIndicator";

interface StepAvailabilityProps {
  onNext: () => void;
  onBack: () => void;
}

const roles = [
  { key: "developer", label: "Developer" },
  { key: "designer", label: "Designer" },
  { key: "researcher", label: "Researcher" },
  { key: "other", label: "Other" },
] as const;

type RoleKey = (typeof roles)[number]["key"];

const StepAvailability = ({ onNext, onBack }: StepAvailabilityProps) => {
  const [hoursPerDay, setHoursPerDay] = useState([3]);
  const [selectedRole, setSelectedRole] = useState<RoleKey | null>(null);
  const [customRole, setCustomRole] = useState("");
  const [customRoleLocked, setCustomRoleLocked] = useState(false);
  const [showError, setShowError] = useState(false);

  const isRoleValid = () => {
    if (!selectedRole) return false;
    if (selectedRole === "other" && !customRoleLocked) return false;
    return true;
  };

  const handleNext = () => {
    if (hoursPerDay[0] === 0 || !isRoleValid()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onNext();
  };

  const handleAddCustomRole = () => {
    if (customRole.trim()) {
      setCustomRoleLocked(true);
    }
  };

  const handleCustomRoleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomRole();
    }
  };

  const handleRoleSelect = (key: RoleKey) => {
    setSelectedRole(key);
    if (key !== "other") {
      setCustomRole("");
      setCustomRoleLocked(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto w-full">
        <ProgressIndicator currentStep={2} totalSteps={3} />

        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#0F172A] mb-1">
          Availability
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] mb-6">
          Let us know how much time you can dedicate.
        </p>

        <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
          {/* Hours per day slider */}
          <div className="space-y-4 p-4 bg-white rounded-lg border border-[#E5E7EB]">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-[#0F172A]">
                Hours per day
              </label>
              <span className="text-sm font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded">
                {hoursPerDay[0]} hrs
              </span>
            </div>
            <div className="px-1 pt-2">
              <Slider
                value={hoursPerDay}
                onValueChange={setHoursPerDay}
                min={0}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-3 text-xs text-[#64748B]">
                <span>0 hr</span>
                <span>5 hrs</span>
                <span>10 hrs</span>
              </div>
            </div>
          </div>

          {/* Preferred Role */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#0F172A]">
              Preferred Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleRoleSelect(key)}
                  className={cn(
                    "py-3 px-4 rounded-md border text-sm font-medium transition-colors",
                    selectedRole === key
                      ? "bg-[#2563EB] text-white border-[#2563EB]"
                      : "bg-white text-[#0F172A] border-[#E5E7EB] hover:border-[#2563EB]"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Custom role input */}
            {selectedRole === "other" && !customRoleLocked && (
              <div className="flex gap-2 mt-3">
                <Input
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  onKeyDown={handleCustomRoleKeyDown}
                  placeholder="Enter your role"
                  className="flex-1 border-[#E5E7EB] focus:border-[#2563EB] focus:ring-[#2563EB]"
                  autoFocus
                />
                <Button 
                  onClick={handleAddCustomRole}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium"
                >
                  Add
                </Button>
              </div>
            )}

            {selectedRole === "other" && customRoleLocked && (
              <div className="flex items-center justify-between p-3 bg-[#EFF6FF] rounded-md border border-[#2563EB] mt-3">
                <span className="text-sm font-medium text-[#0F172A]">{customRole}</span>
                <button
                  onClick={() => setCustomRoleLocked(false)}
                  className="text-[#2563EB] hover:text-[#1D4ED8] text-sm font-medium"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>

        {showError && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please select at least 1 hour per day and choose a role before continuing.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-8 flex flex-col-reverse md:flex-row md:justify-between gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full md:w-auto md:min-w-[100px] h-11 text-base font-medium border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="w-full md:w-auto md:min-w-[160px] h-11 text-base font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepAvailability;
