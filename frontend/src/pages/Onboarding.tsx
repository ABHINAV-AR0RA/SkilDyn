import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepSkillsInterests from "@/components/onboarding/StepSkillsInterests";
import StepAvailability from "@/components/onboarding/StepAvailability";
import StepProfileStrength from "@/components/onboarding/StepProfileStrength";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinish = () => {
    // Navigate to dashboard after completing onboarding
    navigate("/dashboard");
  };

  return (
    <>
      {currentStep === 1 && <StepSkillsInterests onNext={handleNext} />}
      {currentStep === 2 && (
        <StepAvailability onNext={handleNext} onBack={handleBack} />
      )}
      {currentStep === 3 && (
        <StepProfileStrength onFinish={handleFinish} onBack={handleBack} />
      )}
    </>
  );
};

export default Onboarding;
