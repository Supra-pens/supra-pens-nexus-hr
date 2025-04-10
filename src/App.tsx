
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthLayout from "@/components/layout/AuthLayout";

// Import pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
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
            <Route path="/employees" element={<EmployeeList />} />
            
            {/* Add other routes as needed */}
            <Route path="/employees/departments" element={<div className="p-4">Departments page coming soon</div>} />
            <Route path="/employees/attendance" element={<div className="p-4">Attendance page coming soon</div>} />
            <Route path="/employees/leave" element={<div className="p-4">Leave management page coming soon</div>} />
            <Route path="/employees/documents" element={<div className="p-4">Documents page coming soon</div>} />
            <Route path="/payroll/*" element={<div className="p-4">Payroll module coming soon</div>} />
            <Route path="/events/*" element={<div className="p-4">Events module coming soon</div>} />
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
  React.useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  }, []);
  
  return null;
};

export default App;
