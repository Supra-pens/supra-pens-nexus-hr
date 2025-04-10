
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface AuthLayoutProps {
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ className }) => {
  return (
    <div className={cn("min-h-screen flex flex-col items-center justify-center bg-background", className)}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md p-6 space-y-6">
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary-800 dark:bg-primary-500"></div>
            <span className="text-2xl font-bold text-primary-800 dark:text-primary-100">Supra Pens</span>
          </div>
        </div>
        <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-lg border rounded-lg p-6">
          <Outlet />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AuthLayout;
