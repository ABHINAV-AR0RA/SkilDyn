import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="heading-hero animate-fade-in">
            Find the right skills.{" "}
            <span className="text-primary">Build the right team.</span>
          </h1>
          
          <p className="mt-6 text-body animate-fade-in" style={{ animationDelay: "0.1s" }}>
            AI-powered collaboration platform for students. Discover hackathons, 
            connect with skilled teammates, and build projects that matter.
          </p>
          
          <div 
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" 
            style={{ animationDelay: "0.2s" }}
          >
            <Button size="lg" className="w-full sm:w-auto gap-2" asChild>
              <Link to="/signup">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
