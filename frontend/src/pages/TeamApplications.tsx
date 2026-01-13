import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, CheckCircle, XCircle, User, FileText } from "lucide-react";

interface Applicant {
  id: string;
  name: string;
  initials: string;
  aiSummary: string;
  skills: string[];
  appliedAt: string;
  status: "pending" | "accepted" | "rejected";
}

const mockApplicants: Applicant[] = [
  {
    id: "app1",
    name: "Sarah Johnson",
    initials: "SJ",
    aiSummary: "Strong UI/UX background with 2+ years of experience in Figma and Adobe XD. Shows enthusiasm for sustainability projects and has previously worked on environmental apps.",
    skills: ["UI/UX Design", "Figma", "Adobe XD"],
    appliedAt: "2024-01-22",
    status: "pending",
  },
  {
    id: "app2",
    name: "Michael Chen",
    initials: "MC",
    aiSummary: "Data visualization specialist with experience in D3.js and Chart.js. Has participated in 3 hackathons previously and demonstrates strong commitment to team projects.",
    skills: ["Data Visualization", "D3.js", "Python"],
    appliedAt: "2024-01-21",
    status: "pending",
  },
  {
    id: "app3",
    name: "Emily Davis",
    initials: "ED",
    aiSummary: "Frontend developer with React expertise. Expressed high availability and willingness to dedicate 20+ hours per week to the project.",
    skills: ["React", "TypeScript", "CSS"],
    appliedAt: "2024-01-20",
    status: "pending",
  },
];

const TeamApplications = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState(mockApplicants);

  // Navigate back to team detail - never loop back here
  const handleBack = () => {
    navigate(`/teams/${teamId}`, { state: { fromApplications: true } });
  };

  const handleAccept = (id: string) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "accepted" as const } : app))
    );
  };

  const handleReject = (id: string) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "rejected" as const } : app))
    );
  };

  const pendingCount = applicants.filter((a) => a.status === "pending").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-foreground">Team Applications</h1>
              <p className="text-sm text-muted-foreground">
                {pendingCount} pending {pendingCount === 1 ? "application" : "applications"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {applicants.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No applications yet</p>
              </CardContent>
            </Card>
          ) : (
            applicants.map((applicant) => (
              <Card
                key={applicant.id}
                className={
                  applicant.status === "pending"
                    ? "border-amber-200"
                    : applicant.status === "accepted"
                    ? "border-green-200"
                    : "border-red-200"
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {applicant.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle
                          className="text-base cursor-pointer hover:text-primary transition-colors"
                          onClick={() => navigate(`/profile/${applicant.id}`)}
                        >
                          {applicant.name}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          Applied on {applicant.appliedAt}
                        </p>
                      </div>
                    </div>
                    {applicant.status === "accepted" && (
                      <Badge className="bg-green-100 text-green-700">Accepted</Badge>
                    )}
                    {applicant.status === "rejected" && (
                      <Badge className="bg-red-100 text-red-700">Rejected</Badge>
                    )}
                    {applicant.status === "pending" && (
                      <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* AI Summary */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">AI Summary</p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {applicant.aiSummary}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {applicant.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  {applicant.status === "pending" && (
                    <div className="flex gap-2 pt-2 border-t border-border">
                      <Button
                        onClick={() => handleAccept(applicant.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleReject(applicant.id)}
                        variant="outline"
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                        size="sm"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default TeamApplications;
