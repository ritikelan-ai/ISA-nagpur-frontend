'use client';

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  FileText,
  Users,
  LogOut,
  User,
  Home,
  Book,
  ClipboardList,
  BookOpen,
  Stethoscope,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardSidebar = ({ closeSidebar }: { closeSidebar?: () => void }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { label: "Home", icon: <Home className="h-4 w-4" />, path: "/dashboard" },
    { label: "Profile", icon: <User className="h-4 w-4" />, path: "/profile" },
    { label: "Chat", icon: <MessageSquare className="h-4 w-4" />, path: "/chat" },
    { label: "Research", icon: <FileText className="h-4 w-4" />, path: "/research-papers" },
    { label: "Cases", icon: <Stethoscope className="h-4 w-4" />, path: "/case-discussions" },
    { label: "Directory", icon: <BookOpen className="h-4 w-4" />, path: "/directory" },
    { label: "Logout", icon: <LogOut className="h-4 w-4" />, action: "logout" },
  ];

  return (
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
};

export default DashboardSidebar;
