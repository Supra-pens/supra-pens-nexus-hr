
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if logged in and redirect accordingly
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-primary-800">Supra Pens HRMS</h1>
        <p className="text-lg text-muted-foreground">Loading your experience...</p>
      </div>
    </div>
  );
};

export default Index;
