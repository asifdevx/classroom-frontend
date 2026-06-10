
import Header from "@/components/Header";
import MobileSidebar from "@/components/SideBar/MobileSidebar";
import { Sidebar } from "@/components/SideBar/SideBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";


export default function MainLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Mobile Drawer Navigation */}
      <MobileSidebar isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />

      {/* Desktop Persistent Sidebar */}
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />

      {/* Main Content Page Shell */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isCollapsed ? "md:pl-20" : "md:pl-64"}`}>
        <Header isCollapsed={isCollapsed} onOpenMobileMenu={() => setIsMobileOpen(true)} />

        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full mx-auto animate-in fade-in duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

