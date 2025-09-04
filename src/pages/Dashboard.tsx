'use client';

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  FileText,
  Users,
  Bell,
  User,
  LogOut,
  Menu,
  Stethoscope,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [notifications] = useState([
    { id: 1, title: "New message from Dr. Smith", time: "5 min ago", type: "message" },
    { id: 2, title: "New research paper posted", time: "1 hour ago", type: "research" },
    { id: 3, title: "Case discussion updated", time: "2 hours ago", type: "case" },
  ]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  const menuItems = [
    { label: "Profile", icon: <User className="h-4 w-4" />, path: "/profile" },
    { label: "Chat", icon: <MessageSquare className="h-4 w-4" />, path: "/chat" },
    { label: "Research", icon: <FileText className="h-4 w-4" />, path: "/research-papers" },
    { label: "Cases", icon: <Stethoscope className="h-4 w-4" />, path: "/case-discussions" },
    { label: "Directory", icon: <BookOpen className="h-4 w-4" />, path: "/directory" },
    { label: "Logout", icon: <LogOut className="h-4 w-4" />, action: "logout" },
  ];

  const SidebarContent = ({ closeSidebar }: { closeSidebar?: () => void }) => (
    <div className="flex flex-col h-full">
      {/* Brand Header */}
      <div
        className="flex items-center mb-8 p-4 cursor-pointer"
        onClick={() => {
          navigate("/dashboard");
          closeSidebar?.();
        }}
      >
        <img
          src="https://www.isanagpur.org/wp-content/uploads/2021/06/isa-icon.png.webp"
          alt="ISA Logo"
          className="w-10 h-10 mr-2"
        />
        <h1 className="text-lg font-bold text-[#333333] leading-tight">
          Indian Society of Anaesthesiologists
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 px-4">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => {
              if (item.action === "logout") {
                handleLogout();
              } else {
                navigate(item.path || "/");
              }
              closeSidebar?.();
            }}
            className="justify-start text-[#333333] hover:bg-[#F2FAFF] transition px-3 py-2"
          >
            <span className="mr-3 text-[#2D9CDB]">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </nav>

      {/* Status */}
      <div className="px-4 pb-4 flex items-center text-sm text-[#333333]">
        <div className="w-2 h-2 bg-[#6FCF97] rounded-full mr-2"></div>
        <span>Online</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#FFFFFF] text-[#333333]">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-white border-r border-[#E0E0E0] shadow-md z-50">
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white border-l border-[#E0E0E0] shadow-lg z-50 transform transition-transform duration-300 md:hidden
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <SidebarContent closeSidebar={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto overflow-x-hidden md:ml-64">
        {/* Mobile Header (Sticky, Hamburger Right) */}
<header className="md:hidden sticky top-0 z-50 flex items-center justify-between p-4 bg-white border-b shadow">
<img
          src="https://www.isanagpur.org/wp-content/uploads/2021/06/isa-icon.png.webp"
          alt="ISA Logo"
          className="w-10 h-10 mr-2"
        />
  <button
    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    className="p-2 rounded-md hover:bg-gray-100"
  >
    <Menu className="h-6 w-6 text-[#333333]" />
  </button>
</header>

        <main className="p-6 bg-[#F9FAFB] min-h-screen ">
          {/* Welcome Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-1">Welcome back, {user.fullName}</h2>
            <p className="text-[#555555]">
              {user.specialization.join(", ")} • {user.clinicName}
            </p>
            {!user.isApproved && (
              <Badge className="mt-2 bg-[#FFF8E1] text-[#FF9800] border-none">
                Account pending approval
              </Badge>
            )}
          </section>

          {/* Quick Actions */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: "Messages", count: "12", note: "New conversations", icon: <MessageSquare />, route: "/chat" },
              { title: "Research Papers", count: "48", note: "Latest publications", icon: <FileText />, route: "/research-papers" },
              { title: "Case Discussions", count: "23", note: "Active discussions", icon: <Users />, route: "/case-discussions" },
              { title: "Directory", count: "147", note: "Registered doctors", icon: <Users />, route: "/directory" },
            ].map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow bg-white"
                onClick={() => navigate(item.route)}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  <span className="text-[#2D9CDB]">{item.icon}</span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.count}</div>
                  <p className="text-xs text-[#888888]">{item.note}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Notifications & Quick Nav */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notifications */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-[#2D9CDB]" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((note) => (
                    <div key={note.id} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#6FCF97] rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{note.title}</p>
                        <p className="text-xs text-[#888888]">{note.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Navigation */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Research", icon: <FileText />, path: "/research-papers" },
                    { label: "Cases", icon: <Users />, path: "/case-discussions" },
                    { label: "Chat", icon: <MessageSquare />, path: "/chat" },
                    { label: "Directory", icon: <Users />, path: "/directory" },
                  ].map((item, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="h-20 flex flex-col justify-center items-center text-[#333333] hover:bg-[#F2FAFF]"
                      onClick={() => navigate(item.path)}
                    >
                      <span className="mb-1 text-[#2D9CDB]">{item.icon}</span>
                      {item.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
