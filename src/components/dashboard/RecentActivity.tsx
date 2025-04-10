
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Activity = {
  id: string;
  description: string;
  time: string;
  user?: string;
  userAvatar?: string;
};

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <Card className="col-span-1 h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest activities across the organization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              {activity.userAvatar ? (
                <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                  <img src={activity.userAvatar} alt={activity.user || ""} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                  {activity.user?.charAt(0) || "U"}
                </div>
              )}
              <div className="flex-1 space-y-1">
                <p className="text-sm leading-none">{activity.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                  {activity.user && <p className="text-xs font-medium">{activity.user}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
