
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Edit, MoreHorizontal, Plus, Trash } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Mock events data
const eventData = [
  {
    id: "E001",
    title: "Company Annual Meeting",
    type: "work",
    date: new Date(2025, 3, 15),
    location: "Main Conference Hall",
    description: "Annual company-wide meeting to discuss the year's achievements and future plans",
  },
  {
    id: "E002",
    title: "Team Building Activity",
    type: "event",
    date: new Date(2025, 3, 22),
    location: "Adventure Park",
    description: "Outdoor team building activities to foster collaboration and team spirit",
  },
  {
    id: "E003",
    title: "Independence Day Celebration",
    type: "holiday",
    date: new Date(2025, 6, 4),
    location: "Office Premises",
    description: "Celebration of Independence Day with various cultural activities",
  },
  {
    id: "E004",
    title: "John's Birthday",
    type: "birthday",
    date: new Date(2025, 3, 28),
    location: "Break Room",
    description: "Birthday celebration for John",
  },
  {
    id: "E005",
    title: "Quarterly Review Meeting",
    type: "work",
    date: new Date(2025, 5, 15),
    location: "Meeting Room 3",
    description: "Review meeting for Q2 2025",
  },
];

const getEventTypeStyle = (type: string) => {
  switch (type) {
    case "work":
      return "bg-blue-100 text-blue-800";
    case "birthday":
      return "bg-purple-100 text-purple-800";
    case "holiday":
      return "bg-green-100 text-green-800";
    case "event":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const EventList = () => {
  const [events, setEvents] = useState(eventData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "work",
    date: new Date(),
    location: "",
    description: "",
  });

  const handleCreate = () => {
    setSelectedEvent(null);
    setFormData({
      title: "",
      type: "work",
      date: new Date(),
      location: "",
      description: "",
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleEdit = (event: any) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      type: event.type,
      date: new Date(event.date),
      location: event.location,
      description: event.description,
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleView = (event: any) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      type: event.type,
      date: new Date(event.date),
      location: event.location,
      description: event.description,
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleDelete = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
    toast.success("Event deleted successfully");
  };

  const handleSave = () => {
    if (!formData.title) {
      toast.error("Please enter an event title");
      return;
    }

    if (selectedEvent) {
      // Update existing event
      setEvents(
        events.map((event) => 
          event.id === selectedEvent.id 
            ? { ...event, ...formData } 
            : event
        )
      );
      toast.success("Event updated successfully");
    } else {
      // Create new event
      const newEvent = {
        id: `E${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
        ...formData,
      };
      setEvents([...events, newEvent]);
      toast.success("Event created successfully");
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Event List</h3>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getEventTypeStyle(
                      event.type
                    )}`}
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{format(new Date(event.date), "PPP")}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(event)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(event)}>
                        Edit Event
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(event.id)}>
                        <span className="text-destructive">Delete Event</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode
                ? selectedEvent
                  ? "Edit Event"
                  : "Create New Event"
                : "Event Details"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={!isEditMode}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-type">Event Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  disabled={!isEditMode}
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
                <Label htmlFor="date">Event Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                      disabled={!isEditMode}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData({ ...formData, date: date || new Date() })}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={!isEditMode}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={!isEditMode}
              />
            </div>
          </div>
          <DialogFooter>
            {isEditMode ? (
              <Button onClick={handleSave}>Save</Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setIsEditMode(true);
                }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventList;
