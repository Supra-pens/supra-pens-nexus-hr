
import React from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import { Users, Clock, FileCheck, Calendar, UserPlus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  // Simulating getting user info from localStorage
  const userRole = localStorage.getItem("userRole") || "employee";
  const navigate = useNavigate();
  
  // Check if user is logged in (this would be handled by a real auth system)
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // Mock data for dashboard stats
  const stats = [
    {
      title: "Total Employees",
      value: "126",
      icon: <Users className="h-4 w-4" />,
      trend: { value: 12, isPositive: true },
      description: "From previous month"
    },
    {
      title: "Attendance Rate",
      value: "94%",
      icon: <Clock className="h-4 w-4" />,
      trend: { value: 3, isPositive: true },
      description: "From previous month"
    },
    {
      title: "Leave Requests",
      value: "8",
      icon: <Calendar className="h-4 w-4" />,
      trend: { value: 2, isPositive: false },
      description: "Pending approval"
    },
    {
      title: "New Hires",
      value: "3",
      icon: <UserPlus className="h-4 w-4" />,
      description: "This month"
    },
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: "1",
      description: "Sarah Johnson updated department assignment",
      time: "10 minutes ago",
      user: "Sarah Johnson",
    },
    {
      id: "2",
      description: "New leave request submitted by James Smith",
      time: "45 minutes ago",
    },
    {
      id: "3",
      description: "Monthly payroll generated",
      time: "2 hours ago",
      user: "HR System",
    },
    {
      id: "4", 
      description: "New employee profile created for Akira Tanaka",
      time: "Yesterday at 4:30 PM",
      user: "HR Admin",
    },
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: "1",
      title: "Marketing Department Meeting",
      date: "Today, 3:00 PM",
      type: "work" as const,
    },
    {
      id: "2",
      title: "Michael's Birthday",
      date: "Tomorrow",
      type: "birthday" as const,
    },
    {
      id: "3",
      title: "Company Outing",
      date: "June 15, 2025",
      type: "event" as const,
    },
    {
      id: "4",
      title: "Independence Day",
      date: "July 4, 2025",
      type: "holiday" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome to Supra Pens HRMS</h1>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          {(userRole === "admin" || userRole === "hr") && (
            <TabsTrigger value="reports">Reports</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                description={stat.description}
                trend={stat.trend}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentActivity activities={recentActivities} />
            <UpcomingEvents events={upcomingEvents} />
          </div>
        </TabsContent>
        
        <TabsContent value="my-tasks">
          <Card>
            <CardHeader>
              <CardTitle>Your Tasks</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <p>You have no pending tasks.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {(userRole === "admin" || userRole === "hr") && (
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>HR Reports</CardTitle>
                <CardDescription>Key metrics and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This feature will be available soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Dashboard;
