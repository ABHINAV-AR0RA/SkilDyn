import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mic, MicOff, MessageSquare, Loader2, CheckCircle2, Edit3 } from "lucide-react";

type Step = "intro" | "input" | "review" | "loading" | "confirmation";
type InputMode = "voice" | "text" | null;

const ApplyToTeam = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [step, setStep] = useState<Step>("intro");
  const [inputMode, setInputMode] = useState<InputMode>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [content, setContent] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);

  const handleContinueWithVoice = () => {
    setInputMode("voice");
    setStep("input");
  };

  const handleContinueWithText = () => {
    setInputMode("text");
    setStep("input");
  };

  const handleBack = () => {
    if (step === "input") {
      setStep("intro");
      setInputMode(null);
      setContent("");
      setIsRecording(false);
      setRecordingTime(0);
    } else if (step === "review") {
      setStep("input");
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate transcription
      setContent("I have 2 years of experience in frontend development with React and TypeScript. I've participated in 3 hackathons previously and won second place in a sustainability-focused event. I can dedicate 15-20 hours per week to this project and I'm particularly strong in UI/UX design and responsive layouts.");
    } else {
      setIsRecording(true);
      setRecordingTime(0);
      // Simulate recording time
      const interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 30) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const handleNext = () => {
    if (content.trim()) {
      setStep("review");
    }
  };

  const handleEdit = () => {
    setStep("input");
  };

  const handleSubmit = () => {
    setStep("loading");
    // Simulate processing
    setTimeout(() => {
      setStep("confirmation");
    }, 2500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {step !== "loading" && step !== "confirmation" && (
        <header className="sticky top-0 z-10 bg-background border-b border-border">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/teams/${teamId}`)}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-base font-medium text-foreground">Apply to Join Team</h1>
          </div>
        </header>
      )}

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Step 1: Intro */}
        {step === "intro" && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Tell us about yourself
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Why do you want to join this team and how much time and effort can you realistically commit to this project?
            </p>

            <div className="w-full max-w-sm space-y-3">
              <Button
                onClick={handleContinueWithVoice}
                className="w-full h-12 bg-primary hover:bg-primary/90"
              >
                <Mic className="h-5 w-5 mr-2" />
                Continue with Voice
              </Button>
              <Button
                onClick={handleContinueWithText}
                variant="outline"
                className="w-full h-12"
              >
                <Edit3 className="h-5 w-5 mr-2" />
                Continue with Text
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Input */}
        {step === "input" && (
          <div className="py-4">
            <div className="text-center mb-6">
              <h2 className="text-lg font-medium text-foreground mb-2">
                {inputMode === "voice" ? "Record your response" : "Write your response"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Why do you want to join this team and how much time and effort can you realistically commit to this project?
              </p>
            </div>

            {inputMode === "voice" ? (
              <div className="flex flex-col items-center py-8">
                {/* Recording Button */}
                <button
                  onClick={toggleRecording}
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isRecording
                      ? "bg-destructive animate-pulse"
                      : "bg-primary hover:bg-primary/90"
                  }`}
                >
                  {isRecording ? (
                    <MicOff className="h-12 w-12 text-white" />
                  ) : (
                    <Mic className="h-12 w-12 text-white" />
                  )}
                </button>

                {/* Recording Status */}
                <div className="mt-6 text-center">
                  {isRecording ? (
                    <>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-destructive">Recording</span>
                      </div>
                      <span className="text-2xl font-mono text-foreground">
                        {formatTime(recordingTime)}
                      </span>
                    </>
                  ) : content ? (
                    <p className="text-sm text-success">Recording complete. Tap Next to continue.</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Tap the microphone to start recording</p>
                  )}
                </div>

                {/* Transcribed Preview */}
                {content && !isRecording && (
                  <Card className="w-full mt-8">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-2">Transcription preview:</p>
                      <p className="text-sm text-foreground line-clamp-3">{content}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="py-4">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="I want to join this team because... I can realistically commit X hours per day/week... My relevant experience includes..."
                  className="min-h-[200px] text-base resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2 text-right">
                  {content.length} characters
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!content.trim()}
                className="flex-1 h-12 bg-primary hover:bg-primary/90"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === "review" && (
          <div className="py-4">
            <div className="text-center mb-6">
              <h2 className="text-lg font-medium text-foreground mb-2">
                Review your application
              </h2>
              <p className="text-sm text-muted-foreground">
                Make sure everything looks good before submitting.
              </p>
            </div>

            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">Your Response</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleEdit}
                    className="h-8 text-primary"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {content}
                </p>
              </CardContent>
            </Card>

            <div className="bg-muted/50 rounded-lg p-4 mb-8">
              <p className="text-sm text-muted-foreground">
                By submitting, you agree to share this information with the team leader for review.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleEdit}
                className="flex-1 h-12"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 h-12 bg-primary hover:bg-primary/90"
              >
                Submit Application
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Loading */}
        {step === "loading" && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-6" />
            <h2 className="text-lg font-medium text-foreground mb-2">
              Analyzing your response
            </h2>
            <p className="text-sm text-muted-foreground">
              This will only take a moment...
            </p>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === "confirmation" && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Application sent successfully
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              The team leader will review your application and get back to you soon.
            </p>

            <div className="w-full max-w-sm space-y-3">
              <Button
                onClick={() => navigate("/hackathons")}
                className="w-full h-12 bg-primary hover:bg-primary/90"
              >
                Browse More Hackathons
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                variant="outline"
                className="w-full h-12"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ApplyToTeam;
