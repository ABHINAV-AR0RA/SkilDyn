import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Bookmark, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import skildynLogo from "@/assets/skildyn-logo.jpeg";

const mockHackathons = [
  {
    id: "1",
    name: "AI Innovation Challenge",
    domain: "Artificial Intelligence",
    deadline: "Feb 15, 2026",
    mode: "Online",
    saved: false,
  },
  {
    id: "2",
    name: "Green Tech Hackathon",
    domain: "Sustainability",
    deadline: "Feb 28, 2026",
    mode: "Offline",
    saved: true,
  },
  {
    id: "3",
    name: "FinTech Disrupt",
    domain: "Finance",
    deadline: "Mar 5, 2026",
    mode: "Online",
    saved: false,
  },
  {
    id: "4",
    name: "HealthTech Summit",
    domain: "Healthcare",
    deadline: "Mar 12, 2026",
    mode: "Hybrid",
    saved: false,
  },
  {
    id: "5",
    name: "EdTech Innovation",
    domain: "Education",
    deadline: "Mar 20, 2026",
    mode: "Online",
    saved: true,
  },
];

const HackathonDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [domain, setDomain] = useState("all");
  const [deadline, setDeadline] = useState("all");
  const [mode, setMode] = useState("all");
  const [savedHackathons, setSavedHackathons] = useState<string[]>(
    mockHackathons.filter((h) => h.saved).map((h) => h.id)
  );
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleSave = (id: string) => {
    setSavedHackathons((prev) =>
      prev.includes(id) ? prev.filter((hId) => hId !== id) : [...prev, id]
    );
  };

  const filteredHackathons = mockHackathons.filter((hackathon) => {
    const matchesSearch = hackathon.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDomain = domain === "all" || hackathon.domain === domain;
    const matchesMode = mode === "all" || hackathon.mode === mode;
    return matchesSearch && matchesDomain && matchesMode;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link to="/dashboard" className="flex-shrink-0">
              <img
                src={skildynLogo}
                alt="SkilDyn"
                className="h-8 w-8 rounded-lg"
              />
            </Link>
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search hackathons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Filters */}
        <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-foreground">
              Discover Hackathons
            </h1>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    filtersOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Domain
                    </label>
                    <Select value={domain} onValueChange={setDomain}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Domains" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Domains</SelectItem>
                        <SelectItem value="Artificial Intelligence">
                          Artificial Intelligence
                        </SelectItem>
                        <SelectItem value="Sustainability">
                          Sustainability
                        </SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Deadline
                    </label>
                    <Select value={deadline} onValueChange={setDeadline}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Time</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="quarter">Next 3 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Mode
                    </label>
                    <Select value={mode} onValueChange={setMode}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Modes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Modes</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filteredHackathons.length} hackathon
          {filteredHackathons.length !== 1 ? "s" : ""} found
        </p>

        {/* Hackathon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHackathons.map((hackathon) => (
            <Card
              key={hackathon.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">
                      {hackathon.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {hackathon.domain}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
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
                    <p className="text-sm text-muted-foreground mt-2">
                      Deadline: {hackathon.deadline}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleSave(hackathon.id)}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                    aria-label={
                      savedHackathons.includes(hackathon.id)
                        ? "Unsave"
                        : "Save"
                    }
                  >
                    <Bookmark
                      className={`h-5 w-5 ${
                        savedHackathons.includes(hackathon.id)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                </div>
                <div className="mt-4">
                  <Link to={`/hackathon/${hackathon.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHackathons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No hackathons match your criteria
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HackathonDiscovery;
