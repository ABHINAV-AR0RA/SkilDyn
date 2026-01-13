import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SubmissionStatus = "draft" | "pending" | "approved" | "rejected";

const EventApproval = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<SubmissionStatus>("draft");
  const [fileName, setFileName] = useState<string>("");
  const [formData, setFormData] = useState({
    eventName: "",
    organizer: "",
    contactEmail: "",
    domain: "",
    eventDate: "",
    deadline: "",
    description: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    setStatus("pending");
  };

  const getStatusDisplay = () => {
    switch (status) {
      case "pending":
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-700">Pending Review</span>
          </div>
        );
      case "approved":
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Approved</span>
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
            <XCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-700">Rejected</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Submit Event for Approval</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Status Display */}
        {status !== "draft" && (
          <div className="mb-6 flex justify-center">
            {getStatusDisplay()}
          </div>
        )}

        {status === "pending" ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Submission Under Review
            </h2>
            <p className="text-muted-foreground mb-6">
              Your event request has been submitted. You will be notified once reviewed.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="border-border"
            >
              Back to Dashboard
            </Button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Event Name */}
            <div className="space-y-2">
              <Label htmlFor="eventName" className="text-foreground">
                Event Name
              </Label>
              <Input
                id="eventName"
                placeholder="Enter event name"
                value={formData.eventName}
                onChange={(e) => handleInputChange("eventName", e.target.value)}
                className="border-border"
              />
            </div>

            {/* Organizer */}
            <div className="space-y-2">
              <Label htmlFor="organizer" className="text-foreground">
                Club / Organizer
              </Label>
              <Input
                id="organizer"
                placeholder="Enter organizer name"
                value={formData.organizer}
                onChange={(e) => handleInputChange("organizer", e.target.value)}
                className="border-border"
              />
            </div>

            {/* Contact Email */}
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="text-foreground">
                Contact Email
              </Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="Enter contact email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                className="border-border"
              />
            </div>

            {/* Domain */}
            <div className="space-y-2">
              <Label htmlFor="domain" className="text-foreground">
                Domain
              </Label>
              <Select
                value={formData.domain}
                onValueChange={(value) => handleInputChange("domain", value)}
              >
                <SelectTrigger className="border-border">
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai-ml">AI/ML</SelectItem>
                  <SelectItem value="web-dev">Web Development</SelectItem>
                  <SelectItem value="mobile">Mobile Development</SelectItem>
                  <SelectItem value="blockchain">Blockchain</SelectItem>
                  <SelectItem value="iot">IoT</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="open">Open Innovation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventDate" className="text-foreground">
                  Event Date
                </Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange("eventDate", e.target.value)}
                  className="border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-foreground">
                  Registration Deadline
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange("deadline", e.target.value)}
                  className="border-border"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the event, rules, and prizes"
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="border-border resize-none"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label className="text-foreground">Proof Document</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  id="proofDocument"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="proofDocument"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                  </div>
                  {fileName ? (
                    <span className="text-sm font-medium text-foreground">{fileName}</span>
                  ) : (
                    <>
                      <span className="text-sm font-medium text-foreground">
                        Upload proof document
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PDF, DOC, or Image up to 10MB
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Submit for Review
              </Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default EventApproval;
