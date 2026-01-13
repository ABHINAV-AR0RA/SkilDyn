import { UserPlus, Search, Send, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Create your profile",
    description: "Set up your skills, interests, and experience.",
  },
  {
    icon: Search,
    number: "02",
    title: "Discover opportunities",
    description: "Browse hackathons and events matched to you.",
  },
  {
    icon: Send,
    number: "03",
    title: "Apply or invite teammates",
    description: "Join teams or invite others to collaborate.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Build with confidence",
    description: "Create projects with the right people.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-section">
            How it works
          </h2>
          <p className="mt-4 text-body max-w-2xl mx-auto">
            Get started in four simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="relative text-center"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
              )}
              
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-card border-2 border-primary mb-4 shadow-sm">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              
              <div className="text-xs font-semibold text-primary mb-2">
                STEP {step.number}
              </div>
              
              <h3 className="font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
