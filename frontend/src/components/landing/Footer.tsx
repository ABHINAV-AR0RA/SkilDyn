import skilDynLogo from "@/assets/skildyn-logo.jpeg";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img 
              src={skilDynLogo} 
              alt="SkilDyn Logo" 
              className="h-8 w-auto"
            />
          </div>
          
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © 2026 SkilDyn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
