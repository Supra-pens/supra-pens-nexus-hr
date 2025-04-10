
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Event = {
  id: string;
  title: string;
  date: string;
  type: "work" | "birthday" | "holiday" | "event";
};

interface UpcomingEventsProps {
  events: Event[];
}

const EventTypeStyles = {
  work: "bg-info-50 text-info-700 border-info-200",
  birthday: "bg-accent-100 text-accent-700 border-accent-200",
  holiday: "bg-success-50 text-success-700 border-success-200",
  event: "bg-warning-50 text-warning-700 border-warning-200",
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  return (
    <Card className="col-span-1 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Upcoming Events</CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardDescription>Company events and celebrations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border",
              EventTypeStyles[event.type]
            )}
          >
            <div className="space-y-1">
              <p className="font-medium text-sm">{event.title}</p>
              <p className="text-xs">{event.date}</p>
            </div>
            <div className={cn(
              "text-xs px-2 py-1 rounded-full font-medium",
              EventTypeStyles[event.type]
            )}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
