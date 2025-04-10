
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default MainLayout;
