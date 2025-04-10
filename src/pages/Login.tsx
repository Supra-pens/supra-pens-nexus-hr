
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    
    // Simulate API login with a timeout
    setTimeout(() => {
      // This is where you'd implement actual login logic with a backend
      // For now, we'll just mock a successful login
      localStorage.setItem("isLoggedIn", "true");
      
      // Mock different user roles based on email
      let userRole = "employee";
      if (email.includes("admin")) {
        userRole = "admin";
      } else if (email.includes("hr")) {
        userRole = "hr";
      } else if (email.includes("manager")) {
        userRole = "manager";
      }
      
      localStorage.setItem("userRole", userRole);
      
      // Display success message and redirect
      toast.success("Login successful!");
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-primary-800">Login to Supra Pens HRMS</h1>
        <p className="text-sm text-muted-foreground mt-1">Enter your credentials to access your account</p>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="name@suprapens.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button variant="link" size="sm" className="p-0 h-auto text-xs">
              Forgot password?
            </Button>
          </div>
          <Input 
            id="password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
