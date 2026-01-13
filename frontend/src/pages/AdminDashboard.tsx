import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, FileText, CheckCircle, XCircle, Users, Calendar, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EventRequest {
  id: string;
  eventName: string;
  organizer: string;
  domain: string;
  eventDate: string;
  proofFile: string;
  status: "pending" | "approved" | "rejected";
}

interface Hackathon {
  id: string;
  name: string;
  organizer: string;
  domain: string;
  date: string;
  teams: number;
  participants: number;
  status: "active" | "upcoming" | "completed";
}

interface Team {
  id: string;
  name: string;
  hackathon: string;
  members: number;
  domain: string;
  status: "complete" | "recruiting";
}

const mockRequests: EventRequest[] = [
  {
    id: "1",
    eventName: "AI Innovation Challenge 2025",
    organizer: "Tech Club",
    domain: "AI/ML",
    eventDate: "2025-03-15",
    proofFile: "approval_letter.pdf",
    status: "pending",
  },
  {
    id: "2",
    eventName: "Web3 Hackathon",
    organizer: "Blockchain Society",
    domain: "Blockchain",
    eventDate: "2025-04-01",
    proofFile: "event_proposal.pdf",
    status: "pending",
  },
  {
    id: "3",
    eventName: "Green Tech Summit",
    organizer: "Sustainability Club",
    domain: "IoT",
    eventDate: "2025-03-28",
    proofFile: "permission_doc.pdf",
    status: "pending",
  },
];

const mockHackathons: Hackathon[] = [
  {
    id: "1",
    name: "AI Innovation Challenge",
    organizer: "Tech Club",
    domain: "AI/ML",
    date: "Mar 15, 2025",
    teams: 24,
    participants: 96,
    status: "active",
  },
  {
    id: "2",
    name: "FinTech Sprint",
    organizer: "Finance Society",
    domain: "FinTech",
    date: "Apr 10, 2025",
    teams: 18,
    participants: 72,
    status: "upcoming",
  },
  {
    id: "3",
    name: "Healthcare Hackathon",
    organizer: "Med-Tech Club",
    domain: "HealthTech",
    date: "Feb 20, 2025",
    teams: 30,
    participants: 120,
    status: "completed",
  },
];

const mockTeams: Team[] = [
  {
    id: "1",
    name: "Neural Nexus",
    hackathon: "AI Innovation Challenge",
    members: 4,
    domain: "AI/ML",
    status: "complete",
  },
  {
    id: "2",
    name: "Code Crusaders",
    hackathon: "AI Innovation Challenge",
    members: 3,
    domain: "AI/ML",
    status: "recruiting",
  },
  {
    id: "3",
    name: "FinFlow",
    hackathon: "FinTech Sprint",
    members: 4,
    domain: "FinTech",
    status: "complete",
  },
];

const stats = {
  totalParticipants: 288,
  totalTeams: 72,
  activeHackathons: 3,
  completedHackathons: 12,
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(mockRequests);
  const [hackathons, setHackathons] = useState(mockHackathons);
  const [teams, setTeams] = useState(mockTeams);
  
  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<"hackathon" | "team" | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");

  const openDeleteDialog = (type: "hackathon" | "team", id: string, name: string) => {
    setDeleteType(type);
    setDeleteId(id);
    setDeleteName(name);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteType === "hackathon" && deleteId) {
      setHackathons((prev) => prev.filter((h) => h.id !== deleteId));
    } else if (deleteType === "team" && deleteId) {
      setTeams((prev) => prev.filter((t) => t.id !== deleteId));
    }
    setDeleteDialogOpen(false);
    setDeleteType(null);
    setDeleteId(null);
    setDeleteName("");
  };

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "approved" as const } : req))
    );
  };

  const handleReject = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" as const } : req))
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Upcoming</Badge>;
      case "completed":
        return <Badge className="bg-muted text-muted-foreground hover:bg-muted">Completed</Badge>;
      case "complete":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Complete</Badge>;
      case "recruiting":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Recruiting</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Admin Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Tabs defaultValue="hackathons" className="space-y-6">
          <TabsList className="w-full justify-start bg-muted p-1 overflow-x-auto">
            <TabsTrigger value="hackathons" className="data-[state=active]:bg-background">
              Hackathons
            </TabsTrigger>
            <TabsTrigger value="teams" className="data-[state=active]:bg-background">
              Teams
            </TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-background relative">
              Requests
              {requests.filter((r) => r.status === "pending").length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                  {requests.filter((r) => r.status === "pending").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-background">
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Hackathons Tab */}
          <TabsContent value="hackathons" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-foreground">All Hackathons</h2>
              <Button
                variant="outline"
                size="sm"
                className="border-border"
                onClick={() => navigate("/event-approval")}
              >
                Add Event
              </Button>
            </div>
            <div className="space-y-3">
              {hackathons.map((hackathon) => (
                <div
                  key={hackathon.id}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground">{hackathon.name}</h3>
                        {getStatusBadge(hackathon.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {hackathon.organizer} - {hackathon.domain}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {hackathon.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {hackathon.teams} teams
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border"
                        onClick={() => navigate(`/hackathon/${hackathon.id}`)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => openDeleteDialog("hackathon", hackathon.id, hackathon.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams" className="space-y-4">
            <h2 className="text-lg font-medium text-foreground">All Teams</h2>
            <div className="space-y-3">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground">{team.name}</h3>
                        {getStatusBadge(team.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {team.hackathon}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {team.members} members
                        </span>
                        <span>{team.domain}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border"
                        onClick={() => navigate(`/team/${team.id}`)}
                      >
                        View Team
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => openDeleteDialog("team", team.id, team.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <h2 className="text-lg font-medium text-foreground">Event Requests</h2>
            <div className="space-y-3">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className={`bg-card border rounded-lg p-4 ${
                    request.status === "pending"
                      ? "border-amber-200"
                      : request.status === "approved"
                      ? "border-green-200"
                      : "border-red-200"
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-foreground mb-1">
                          {request.eventName}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {request.organizer} - {request.domain}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {request.eventDate}
                          </span>
                          <a
                            href={`/documents/${request.proofFile}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              // In a real app, this would open or download the actual file
                              // For now, we'll simulate by opening in a new tab
                              window.open(`/documents/${request.proofFile}`, '_blank');
                            }}
                          >
                            <FileText className="w-4 h-4" />
                            {request.proofFile}
                          </a>
                        </div>
                      </div>
                      {request.status === "pending" && (
                        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      )}
                      {request.status === "approved" && (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      )}
                      {request.status === "rejected" && (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      )}
                    </div>
                    {request.status === "pending" && (
                      <div className="flex gap-2 pt-2 border-t border-border">
                        <Button
                          onClick={() => handleApprove(request.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(request.id)}
                          variant="outline"
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                          size="sm"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                    {request.status !== "pending" && (
                      <div className="pt-2 border-t border-border">
                        <span
                          className={`text-sm font-medium ${
                            request.status === "approved"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {request.status === "approved" ? "Approved" : "Rejected"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-lg font-medium text-foreground">Participation Stats</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-semibold text-primary">{stats.totalParticipants}</p>
                <p className="text-sm text-muted-foreground">Total Participants</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-semibold text-primary">{stats.totalTeams}</p>
                <p className="text-sm text-muted-foreground">Total Teams</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-semibold text-green-600">{stats.activeHackathons}</p>
                <p className="text-sm text-muted-foreground">Active Hackathons</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <p className="text-2xl font-semibold text-muted-foreground">{stats.completedHackathons}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>

            {/* Participation by Domain */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-4">Participation by Domain</h3>
              <div className="space-y-3">
                {[
                  { domain: "AI/ML", participants: 96, percentage: 33 },
                  { domain: "Web Development", participants: 72, percentage: 25 },
                  { domain: "FinTech", participants: 60, percentage: 21 },
                  { domain: "IoT", participants: 36, percentage: 13 },
                  { domain: "Blockchain", participants: 24, percentage: 8 },
                ].map((item) => (
                  <div key={item.domain} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">{item.domain}</span>
                      <span className="text-muted-foreground">
                        {item.participants} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Button */}
            <div className="flex justify-end">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Remove {deleteType === "hackathon" ? "Hackathon" : "Team"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove "{deleteName}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 justify-end mt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Remove
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
