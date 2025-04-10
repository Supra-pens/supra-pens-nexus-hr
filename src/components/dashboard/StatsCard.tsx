
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  description, 
  icon, 
  className,
  trend 
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-muted text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {trend && (
              <div className={cn(
                "rounded-sm px-1 mr-1",
                trend.isPositive ? "text-success-600 bg-success-50" : "text-destructive bg-destructive/10"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}%
              </div>
            )}
            {description && <p>{description}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
