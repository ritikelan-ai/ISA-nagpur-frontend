'use client';

import { useState } from "react";
import Directory from "./subcomponents/Directory";
import DashboardSidebar from "./subcomponents/DashboardSidebar";
import { Menu } from "lucide-react";

const DashboardDirectory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar - Desktop (Left) */}
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-white border-r border-[#E0E0E0] shadow-lg z-50">
        <DashboardSidebar />
      </aside>

      {/* Sidebar - Mobile (Right Drawer) */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white border-l border-[#E0E0E0] shadow-lg z-50 transform transition-transform duration-300 md:hidden
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <DashboardSidebar closeSidebar={() => setIsSidebarOpen(false)} />
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
        {/* Mobile Header */}
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

        {/* Page Content */}
        <main className="p-4">
          <Directory />
        </main>
      </div>
    </div>
  );
};

export default DashboardDirectory;
