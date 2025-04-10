
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Bell, Edit, Pin, PlusCircle, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Mock announcements data
const announcementData = [
  {
    id: "A001",
    title: "Office Closure for Maintenance",
    content: "The office will be closed for maintenance on Friday, April 28th. Please plan to work from home on that day.",
    priority: "high",
    pinned: true,
    createdAt: new Date(2025, 3, 20),
    createdBy: "Admin",
  },
  {
    id: "A002",
    title: "New Health Insurance Policy",
    content: "We are pleased to announce a new health insurance policy starting next month. Details will be sent to your email.",
    priority: "medium",
    pinned: true,
    createdAt: new Date(2025, 3, 18),
    createdBy: "HR Manager",
  },
  {
    id: "A003",
    title: "IT System Upgrade",
    content: "The IT system will be upgraded over the weekend. Please save all your work before leaving on Friday.",
    priority: "medium",
    pinned: false,
    createdAt: new Date(2025, 3, 15),
    createdBy: "IT Department",
  },
  {
    id: "A004",
    title: "Employee Satisfaction Survey",
    content: "Please take some time to fill out the employee satisfaction survey sent to your email.",
    priority: "low",
    pinned: false,
    createdAt: new Date(2025, 3, 10),
    createdBy: "HR Department",
  },
];

const getPriorityStyle = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState(announcementData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "medium",
    pinned: false,
  });

  const handleCreate = () => {
    setSelectedAnnouncement(null);
    setFormData({
      title: "",
      content: "",
      priority: "medium",
      pinned: false,
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (announcement: any) => {
    setSelectedAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority,
      pinned: announcement.pinned,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
    toast.success("Announcement deleted");
  };

  const handleTogglePin = (id: string) => {
    setAnnouncements(
      announcements.map((a) =>
        a.id === id ? { ...a, pinned: !a.pinned } : a
      )
    );
    const announcement = announcements.find((a) => a.id === id);
    if (announcement) {
      toast.success(
        announcement.pinned
          ? "Announcement unpinned"
          : "Announcement pinned"
      );
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (selectedAnnouncement) {
      // Update existing announcement
      setAnnouncements(
        announcements.map((a) =>
          a.id === selectedAnnouncement.id
            ? {
                ...a,
                title: formData.title,
                content: formData.content,
                priority: formData.priority,
                pinned: formData.pinned,
              }
            : a
        )
      );
      toast.success("Announcement updated");
    } else {
      // Create new announcement
      const newAnnouncement = {
        id: `A${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
        title: formData.title,
        content: formData.content,
        priority: formData.priority,
        pinned: formData.pinned,
        createdAt: new Date(),
        createdBy: "Current User", // This would be the logged in user in a real app
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      toast.success("Announcement created");
    }
    setIsDialogOpen(false);
  };

  // Sort announcements: pinned first, then by date
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Announcements</h3>
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Announcement
        </Button>
      </div>

      <div className="space-y-4">
        {sortedAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className={cn(
              "p-4 border rounded-lg relative",
              announcement.pinned ? "border-accent" : "border-border"
            )}
            onMouseEnter={() => setShowOptions(announcement.id)}
            onMouseLeave={() => setShowOptions(null)}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h4 className="font-medium text-lg flex items-center gap-2">
                  {announcement.pinned && (
                    <Pin className="h-4 w-4 text-accent-foreground" />
                  )}
                  {announcement.title}
                </h4>
                <div className="flex items-center text-xs text-muted-foreground gap-2">
                  <span>{format(new Date(announcement.createdAt), "PPP")}</span>
                  <span>•</span>
                  <span>By {announcement.createdBy}</span>
                  <span>•</span>
                  <span
                    className={`px-2 py-1 rounded-full ${getPriorityStyle(announcement.priority)}`}
                  >
                    {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
              {showOptions === announcement.id && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleTogglePin(announcement.id)}
                    title={announcement.pinned ? "Unpin" : "Pin"}
                  >
                    <Pin
                      className={cn(
                        "h-4 w-4",
                        announcement.pinned ? "text-accent-foreground" : "text-muted-foreground"
                      )}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(announcement)}
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(announcement.id)}
                    title="Delete"
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              )}
            </div>
            <div className="mt-3 text-sm">
              {announcement.content}
            </div>
          </div>
        ))}

        {announcements.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-1">No Announcements</h3>
            <p className="text-muted-foreground text-sm text-center max-w-md">
              There are no announcements at the moment. Create a new announcement to inform your team.
            </p>
            <Button onClick={handleCreate} className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create First Announcement
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedAnnouncement ? "Edit Announcement" : "Create Announcement"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter announcement title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter announcement content"
                rows={5}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="pinned"
                    checked={formData.pinned}
                    onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="pinned" className="text-sm font-medium leading-none">
                    Pin this announcement
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSave}>
              {selectedAnnouncement ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementList;
