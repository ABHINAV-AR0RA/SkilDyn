import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfilePhotoProvider } from "@/contexts/ProfilePhotoContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import HackathonDiscovery from "./pages/HackathonDiscovery";
import HackathonDetail from "./pages/HackathonDetail";
import TeamDiscovery from "./pages/TeamDiscovery";
import TeamDetail from "./pages/TeamDetail";
import TeamApplications from "./pages/TeamApplications";
import ApplyToTeam from "./pages/ApplyToTeam";
import InvitePeople from "./pages/InvitePeople";
import TeamInvites from "./pages/TeamInvites";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import EventApproval from "./pages/EventApproval";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import SavedHackathons from "./pages/SavedHackathons";
import MyTeams from "./pages/MyTeams";
import CreateTeam from "./pages/CreateTeam";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProfilePhotoProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hackathons" element={<HackathonDiscovery />} />
            <Route path="/hackathons/:id" element={<HackathonDetail />} />
            <Route path="/hackathon/:id" element={<HackathonDetail />} />
            <Route path="/hackathon/:hackathonId/teams" element={<TeamDiscovery />} />
            <Route path="/teams" element={<MyTeams />} />
            <Route path="/teams/create" element={<CreateTeam />} />
            <Route path="/teams/:id" element={<TeamDetail />} />
            <Route path="/teams/:teamId/applications" element={<TeamApplications />} />
            <Route path="/teams/:teamId/apply" element={<ApplyToTeam />} />
            <Route path="/teams/:teamId/invite" element={<InvitePeople />} />
            {/* Legacy routes for backwards compatibility */}
            <Route path="/team/:id" element={<TeamDetail />} />
            <Route path="/team/:teamId/apply" element={<ApplyToTeam />} />
            <Route path="/team/:teamId/invite" element={<InvitePeople />} />
            <Route path="/invites" element={<TeamInvites />} />
            <Route path="/saved" element={<SavedHackathons />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/event-approval" element={<EventApproval />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/hackathons" element={<AdminDashboard />} />
            <Route path="/admin/teams" element={<AdminDashboard />} />
            <Route path="/admin/requests" element={<AdminDashboard />} />
            <Route path="/admin/reports" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProfilePhotoProvider>
  </QueryClientProvider>
);

export default App;
