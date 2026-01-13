import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import skilDynLogo from "@/assets/skildyn-logo.jpeg";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={skilDynLogo} 
              alt="SkilDyn Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
