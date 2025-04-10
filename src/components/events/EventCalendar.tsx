
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarPlus } from "lucide-react";
import { toast } from "sonner";

// Mock events data
const mockEvents = [
  {
    id: "1",
    title: "Team Meeting",
    date: new Date(2025, 3, 12),
    type: "work",
    description: "Weekly team sync meeting",
  },
  {
    id: "2",
    title: "Company Picnic",
    date: new Date(2025, 3, 15),
    type: "event",
    description: "Annual company picnic at City Park",
  },
  {
    id: "3",
    title: "Sarah's Birthday",
    date: new Date(2025, 3, 18),
    type: "birthday",
    description: "Celebration for Sarah's birthday",
  },
  {
    id: "4",
    title: "Public Holiday",
    date: new Date(2025, 3, 20),
    type: "holiday",
    description: "National holiday",
  },
];

// Function to convert date object to human-readable string
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const EventCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState(mockEvents);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "work",
    description: "",
  });

  // Find events for the selected date
  const eventsForSelectedDate = selectedDate
    ? events.filter(
        (event) =>
          event.date.getDate() === selectedDate.getDate() &&
          event.date.getMonth() === selectedDate.getMonth() &&
          event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      setSelectedDate(date);
      setIsViewDialogOpen(true);
    }
  };

  const handleCreateEvent = () => {
    if (selectedDate) {
      setFormData({
        title: "",
        type: "work",
        description: "",
      });
      setIsViewDialogOpen(false);
      setIsCreateDialogOpen(true);
    }
  };

  const handleSaveEvent = () => {
    if (selectedDate && formData.title) {
      const newEvent = {
        id: Date.now().toString(),
        title: formData.title,
        date: selectedDate,
        type: formData.type as "work" | "birthday" | "holiday" | "event",
        description: formData.description,
      };
      
      setEvents([...events, newEvent]);
      setIsCreateDialogOpen(false);
      toast.success("Event created successfully");
    } else {
      toast.error("Please fill in the event title");
    }
  };

  // Highlight dates with events
  const highlightedDates = events.map((event) => ({
    date: event.date,
    className: 
      event.type === "work" 
        ? "bg-blue-100 text-blue-800 hover:bg-blue-200" 
        : event.type === "birthday" 
        ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
        : event.type === "holiday"
        ? "bg-green-100 text-green-800 hover:bg-green-200"
        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
  }));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Event Calendar</h3>
        <Button onClick={() => handleCreateEvent()} disabled={!selectedDate}>
          <CalendarPlus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid md:grid-cols-7 gap-6">
        <Card className="md:col-span-4">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="mx-auto p-3 pointer-events-auto"
              modifiers={{
                highlighted: highlightedDates.map((item) => item.date),
              }}
              modifiersClassNames={{
                highlighted: "bg-accent text-accent-foreground",
              }}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardContent className="p-4 h-full">
            {selectedDate ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Events for {formatDate(selectedDate)}
                </h3>
                {eventsForSelectedDate.length > 0 ? (
                  <div className="space-y-2">
                    {eventsForSelectedDate.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 border rounded-md hover:bg-accent/50 cursor-pointer"
                        onClick={() => {
                          setSelectedEvent(event);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{event.title}</h4>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              event.type === "work"
                                ? "bg-blue-100 text-blue-800"
                                : event.type === "birthday"
                                ? "bg-purple-100 text-purple-800"
                                : event.type === "holiday"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                        </div>
                        {event.description && (
                          <p className="text-sm text-muted-foreground mt-1 truncate">
                            {event.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48">
                    <p className="text-muted-foreground">No events for this date</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={handleCreateEvent}
                    >
                      <CalendarPlus className="mr-2 h-4 w-4" />
                      Create Event
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48">
                <p className="text-muted-foreground">Select a date to see events</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter event title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-type">Event Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger id="event-type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter event description (optional)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveEvent}>Save Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDate && formatDate(selectedDate)}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {eventsForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {eventsForSelectedDate.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border rounded-md"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-medium">{event.title}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          event.type === "work"
                            ? "bg-blue-100 text-blue-800"
                            : event.type === "birthday"
                            ? "bg-purple-100 text-purple-800"
                            : event.type === "holiday"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                    {event.description && (
                      <p className="text-muted-foreground">{event.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No events scheduled for this date.</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={handleCreateEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventCalendar;
