import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, Users, Plus, Calendar, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import skildynLogo from "@/assets/skildyn-logo.jpeg";

const mockHackathonDetails: Record<
  string,
  {
    id: string;
    name: string;
    organizer: string;
    domain: string;
    deadline: string;
    mode: string;
    location?: string;
    description: string;
    prizes: string[];
    requirements: string[];
    saved: boolean;
  }
> = {
  "1": {
    id: "1",
    name: "AI Innovation Challenge",
    organizer: "TechCorp Global",
    domain: "Artificial Intelligence",
    deadline: "Feb 15, 2026",
    mode: "Online",
    description:
      "Join the AI Innovation Challenge to solve real-world problems using artificial intelligence and machine learning. This hackathon brings together developers, data scientists, and innovators to create solutions that can make a meaningful impact across industries including healthcare, education, and sustainability.",
    prizes: ["$10,000 Grand Prize", "$5,000 Runner-up", "$2,500 Third Place"],
    requirements: [
      "Team size: 2-5 members",
      "All skill levels welcome",
      "Must use AI/ML technologies",
    ],
    saved: false,
  },
  "2": {
    id: "2",
    name: "Green Tech Hackathon",
    organizer: "EcoFuture Foundation",
    domain: "Sustainability",
    deadline: "Feb 28, 2026",
    mode: "Offline",
    location: "San Francisco, CA",
    description:
      "Build sustainable solutions for a greener future. The Green Tech Hackathon focuses on creating technology that addresses environmental challenges including climate change, renewable energy, waste reduction, and sustainable agriculture.",
    prizes: ["$8,000 Grand Prize", "$4,000 Runner-up", "Mentorship opportunities"],
    requirements: [
      "Team size: 3-6 members",
      "Focus on sustainability impact",
      "Working prototype required",
    ],
    saved: true,
  },
  "3": {
    id: "3",
    name: "FinTech Disrupt",
    organizer: "Global Finance Innovation Lab",
    domain: "Finance",
    deadline: "Mar 5, 2026",
    mode: "Online",
    description:
      "Reimagine the future of finance. FinTech Disrupt challenges participants to create innovative solutions for digital payments, blockchain applications, financial inclusion, and next-generation banking experiences.",
    prizes: ["$15,000 Grand Prize", "$7,500 Runner-up", "Investor meetings"],
    requirements: [
      "Team size: 2-4 members",
      "Fintech or blockchain focus",
      "Demo required for final round",
    ],
    saved: false,
  },
};

const HackathonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hackathon = mockHackathonDetails[id || "1"] || mockHackathonDetails["1"];
  const [isSaved, setIsSaved] = useState(hackathon.saved);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <img
              src={skildynLogo}
              alt="SkilDyn"
              className="h-8 w-8 rounded-lg"
            />
            <span className="font-medium text-foreground">Hackathon Details</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Hackathon Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                {hackathon.name}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <Building className="h-4 w-4" />
                <span className="text-sm">{hackathon.organizer}</span>
              </div>
            </div>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label={isSaved ? "Unsave" : "Save"}
            >
              <Bookmark
                className={`h-6 w-6 ${
                  isSaved
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Badge variant="secondary">{hackathon.domain}</Badge>
            <Badge
              variant="outline"
              className={`${
                hackathon.mode === "Online"
                  ? "border-secondary text-secondary"
                  : hackathon.mode === "Offline"
                  ? "border-accent text-accent"
                  : "border-primary text-primary"
              }`}
            >
              {hackathon.mode}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Deadline: {hackathon.deadline}</span>
            </div>
            {hackathon.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{hackathon.location}</span>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Description */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {hackathon.description}
            </p>
          </CardContent>
        </Card>

        {/* Prizes */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Prizes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {hackathon.prizes.map((prize, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  {prize}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {hackathon.requirements.map((req, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  {req}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-background border-t border-border -mx-4 px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark
                className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`}
              />
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Link to={`/hackathon/${id}/teams`} className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                <Users className="h-4 w-4" />
                View Teams
              </Button>
            </Link>
            <Link to={`/teams/create?hackathonId=${id}`} className="flex-1">
              <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4" />
                Create Team
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HackathonDetail;
