
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCalendar from "@/components/events/EventCalendar";
import EventList from "@/components/events/EventList";
import AnnouncementList from "@/components/events/AnnouncementList";

const Events = () => {
  const [activeTab, setActiveTab] = useState("calendar");

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Events & Notices</h1>
      <p className="text-muted-foreground">
        Manage company events, announcements, and celebrations.
      </p>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Events & Notices Management</CardTitle>
          <CardDescription>
            View and manage company events, announcements, and celebrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="events">Events List</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar" className="mt-4">
              <EventCalendar />
            </TabsContent>
            <TabsContent value="events" className="mt-4">
              <EventList />
            </TabsContent>
            <TabsContent value="announcements" className="mt-4">
              <AnnouncementList />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Events;
