
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="max-w-md text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-800">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold">Page not found</h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => navigate("/dashboard")}
        >
          <Home className="h-4 w-4" />
          <span>Go to Dashboard</span>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
