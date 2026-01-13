import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Sparkles, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Discover relevant hackathons",
    description: "Find competitions that match your skills and interests.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Users,
    title: "Find skilled teammates",
    description: "Connect with students who complement your abilities.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Sparkles,
    title: "AI-powered collaboration insights",
    description: "Get smart recommendations for team formation.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: BadgeCheck,
    title: "Faculty-verified events",
    description: "Trust events validated by educational institutions.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-section">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-body max-w-2xl mx-auto">
            Powerful features designed for student collaboration
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
