import skildynLogo from "@/assets/skildyn-logo.jpeg";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  // Progress only shows completed steps (not current step)
  const progressPercent = ((currentStep - 1) / totalSteps) * 100;
  
  return (
    <div className="w-full mb-8">
      {/* Logo and Step indicator */}
      <div className="flex items-center justify-between mb-6">
        <img 
          src={skildynLogo} 
          alt="SkilDyn" 
          className="h-8 w-auto rounded"
        />
        <span className="text-sm font-medium text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-[#2563EB] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
