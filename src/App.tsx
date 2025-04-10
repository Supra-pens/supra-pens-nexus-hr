import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import AuthLayout from "@/components/layout/AuthLayout";

// Import pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import EmployeeDetail from "./pages/EmployeeDetail";
import AddEmployee from "./pages/AddEmployee";
import Departments from "./pages/Departments";
import Attendance from "./pages/Attendance";
import LeaveManagement from "./pages/LeaveManagement";
import Documents from "./pages/Documents";
import Payroll from "./pages/Payroll";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          
          {/* Protected Routes */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Employee Management Routes */}
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/add" element={<AddEmployee />} />
            <Route path="/employees/:id" element={<EmployeeDetail />} />
            <Route path="/employees/departments" element={<Departments />} />
            <Route path="/employees/attendance" element={<Attendance />} />
            <Route path="/employees/leave" element={<LeaveManagement />} />
            <Route path="/employees/documents" element={<Documents />} />
            
            {/* Payroll Routes */}
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/payroll/salary-structure" element={<Payroll />} />
            <Route path="/payroll/monthly" element={<Payroll />} />
            <Route path="/payroll/payslips" element={<Payroll />} />
            
            {/* Events Routes */}
            <Route path="/events" element={<Events />} />
            <Route path="/events/announcements" element={<Events />} />
            <Route path="/events/celebrations" element={<Events />} />
            
            {/* Other Routes */}
            <Route path="/performance" element={<div className="p-4">Performance module coming soon</div>} />
            <Route path="/calendar" element={<div className="p-4">Calendar module coming soon</div>} />
            <Route path="/messages" element={<div className="p-4">Messages module coming soon</div>} />
            <Route path="/reports" element={<div className="p-4">Reports module coming soon</div>} />
            <Route path="/settings" element={<div className="p-4">Settings module coming soon</div>} />
            
            {/* Logout route */}
            <Route path="/logout" element={<LogoutHandler />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Logout handler component
const LogoutHandler = () => {
  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  }, []);
  
  return null;
};

export default App;
