import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import skilDynLogo from "@/assets/skildyn-logo.jpeg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend logic - just UI
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={skilDynLogo}
            alt="SkilDyn Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        <Card className="border-border shadow-lg">
          <CardContent className="pt-6 space-y-6">
            {!submitted ? (
              <>
                <div className="text-center space-y-2">
                  <h1 className="text-xl font-semibold text-foreground">
                    Reset your password
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-base border-border focus:border-primary"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                  >
                    Send reset link
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-foreground">
                    Check your email
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    We've sent a password reset link to{" "}
                    <span className="font-medium text-foreground">{email}</span>
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSubmitted(false)}
                >
                  Try another email
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
