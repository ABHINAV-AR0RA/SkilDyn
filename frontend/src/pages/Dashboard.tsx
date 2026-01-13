import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Calendar, Users, Bookmark, Mail, Plus, ChevronRight, Shield, User, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import skildynLogo from "@/assets/skildyn-logo.jpeg";
import { useProfilePhoto } from "@/contexts/ProfilePhotoContext";
const categories = [
  "All",
  "Artificial Intelligence",
  "Web",
  "FinTech",
  "Sustainability",
  "Healthcare",
  "EdTech",
  "Other",
];

const recommendedHackathons = [
  {
    id: 1,
    name: "AI Innovation Challenge",
    domain: "Artificial Intelligence",
    deadline: "Jan 25, 2026",
  },
  {
    id: 2,
    name: "Green Tech Hackathon",
    domain: "Sustainability",
    deadline: "Feb 10, 2026",
  },
  {
    id: 3,
    name: "FinTech Solutions",
    domain: "FinTech",
    deadline: "Feb 18, 2026",
  },
  {
    id: 4,
    name: "Web Dev Challenge",
    domain: "Web",
    deadline: "Feb 25, 2026",
  },
  {
    id: 5,
    name: "Healthcare Innovation",
    domain: "Healthcare",
    deadline: "Mar 5, 2026",
  },
];

const myTeams = [
  {
    id: 1,
    name: "Code Crafters",
    hackathon: "AI Innovation Challenge",
    role: "Developer",
  },
  {
    id: 2,
    name: "EcoBuilders",
    hackathon: "Green Tech Hackathon",
    role: "Team Lead",
  },
];

const quickAccessItems = [
  { label: "Saved Hackathons", icon: Bookmark, count: 5, route: "/saved" },
  { label: "My Teams", icon: Users, count: 2, route: "/teams" },
  { label: "Team Invites", icon: Mail, count: 3, route: "/invites" },
  { label: "Request Event Approval", icon: Plus, count: null, route: "/event-approval" },
];

// Mock: Current user role (in a real app, this would come from auth context)
const currentUserRole = "admin"; // Change to "user" to hide admin button

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const isAdmin = currentUserRole === "admin";
  const { profilePhoto } = useProfilePhoto();
  const filteredHackathons = recommendedHackathons.filter((hackathon) => {
    const matchesSearch = hackathon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hackathon.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || hackathon.domain === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <img
                src={skildynLogo}
                alt="SkilDyn"
                className="h-8 w-8 rounded-lg object-cover"
              />
              <span className="text-lg font-semibold text-foreground hidden sm:block">
                SkilDyn
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search hackathons, teams, people..."
                  className="pl-10 bg-muted/50 border-border focus:bg-card"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3 shrink-0">
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary hover:bg-primary/10"
                  onClick={() => navigate("/admin")}
                >
                  <Shield className="h-4 w-4 mr-1.5" />
                  Admin
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => navigate("/notifications")}
              >
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar
                    className="h-9 w-9 border-2 border-border cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <AvatarImage src={profilePhoto || ""} alt="User" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                      JS
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card border-border z-50">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => navigate("/profile/me")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={() => {
                      // Clear session (mock - in real app would clear auth state)
                      navigate("/");
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* Category Filter */}
        <section className="overflow-hidden">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border text-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Recommended Hackathons */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Recommended Hackathons
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary hover:bg-primary/10"
              onClick={() => navigate("/hackathons")}
            >
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {filteredHackathons.length === 0 ? (
            <Card className="border-border">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  No hackathons found matching your criteria.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredHackathons.map((hackathon) => (
                <Card
                  key={hackathon.id}
                  className="border-border hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => navigate(`/hackathons/${hackathon.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium text-foreground line-clamp-1">
                          {hackathon.name}
                        </h3>
                        <Badge variant="secondary" className="mt-2 bg-muted text-muted-foreground font-normal">
                          {hackathon.domain}
                        </Badge>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        <span>Deadline: {hackathon.deadline}</span>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/hackathons/${hackathon.id}`);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Quick Access */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Quick Access
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quickAccessItems.map((item) => (
              <Card
                key={item.label}
                className="border-border hover:border-primary/50 hover:shadow-sm transition-all cursor-pointer group"
                onClick={() => navigate(item.route)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                  {item.count !== null && (
                    <span className="text-xs text-muted-foreground mt-1">
                      {item.count} items
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* My Teams */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              My Teams
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary hover:bg-primary/10"
              onClick={() => navigate("/teams")}
            >
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-3">
            {myTeams.map((team) => (
              <Card
                key={team.id}
                className="border-border hover:shadow-sm hover:border-primary/30 transition-all cursor-pointer"
                onClick={() => navigate(`/teams/${team.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                        <Users className="h-5 w-5 text-secondary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-foreground truncate">
                          {team.name}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {team.hackathon}
                        </p>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className={
                        team.role === "Team Lead"
                          ? "border-accent text-accent bg-accent/5 shrink-0"
                          : "border-border text-muted-foreground shrink-0"
                      }
                    >
                      {team.role}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
