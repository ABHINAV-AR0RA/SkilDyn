import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-6 py-12 sm:px-12 sm:py-16 text-center">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-primary-foreground/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary-foreground/10 rounded-full translate-x-1/3 translate-y-1/3" />
          
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
              Ready to build your dream team?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
              Join thousands of students already collaborating on SkilDyn.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto gap-2"
                asChild
              >
                <Link to="/signup">
                  <GraduationCap className="h-5 w-5" />
                  Join as Student
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto gap-2 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link to="/login?role=admin">
                  <BookOpen className="h-5 w-5" />
                  Faculty Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
