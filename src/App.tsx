import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import DashboardProfile from "./pages/DashboardProfile";
import EditProfile from "./pages/subcomponents/EditProfile";
import DashboardChat from "./pages/DashboardChat";
import DashboardResearchPapers from "./pages/DashboardResarchPapers";
import DashboardCaseDiscussions from "./pages/DashboardCaseDiscussion";
import Directory from "./pages/subcomponents/Directory";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/subcomponents/NotFound";
import Index from "./pages/subcomponents/Index";
import WaitingApproval from "./pages/subcomponents/WatingApproval";
import DashboardDirectory from "./pages/DashboardDirectory";
import DashboardSubmitResarch from "./pages/DashboardSubmitResarch";
import SubmitCase from "./pages/subcomponents/SubmitCase";
import CaseChat from "./pages/subcomponents/CaseChat";
import ResarchChat from "./pages/subcomponents/ResarchChat";
import DashboardCaseDetail from "./pages/DashboardCaseDetail";
import DashboardDoctorProfile from "./pages/DashboardDoctorProfile";
import DashboardSubmitCase from "./pages/DashboardSubmitCase";
import DashboardEditProfile from "./pages/DashboardEditProfile";
import DashboardResearchPaperDetail from "./pages/DashboardResarchPaperDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<DashboardProfile />} />
          <Route path="/edit-profile" element={<DashboardEditProfile />} />
          <Route path="/chat" element={<DashboardChat />} />
          <Route path="/research-papers" element={<DashboardResearchPapers />} />
          <Route path="/case-discussions" element={<DashboardCaseDiscussions />} />
          <Route path="/directory" element={<DashboardDirectory />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/successful-registration" element={<WaitingApproval/>}/>
          <Route path="*" element={<NotFound />} />
          <Route path="/submit-paper" element={<DashboardSubmitResarch />} />
          <Route path="/submit-case" element={<DashboardSubmitCase />} />
          <Route path="/group-chat" element={<CaseChat />} />
          <Route path="/resarch-chat" element={<ResarchChat />} />
          <Route path="/resarch-paper-detail" element={<DashboardResearchPaperDetail/>}/>
          <Route path="/case-detail" element={< DashboardCaseDetail/>}/>
          <Route path="/doctor-profile" element={<DashboardDoctorProfile/>}/>
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
