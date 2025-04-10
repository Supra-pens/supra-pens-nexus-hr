
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Plus, Calendar as CalendarIcon, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Mock leave requests
const leaveRequests = [
  {
    id: "LR001",
    employeeId: "EMP001",
    employeeName: "John Smith",
    department: "Engineering",
    leaveType: "Vacation",
    startDate: "2023-11-15",
    endDate: "2023-11-20",
    days: 6,
    reason: "Family vacation",
    status: "Approved",
    appliedOn: "2023-11-01",
  },
  {
    id: "LR002",
    employeeId: "EMP002",
    employeeName: "Sarah Johnson",
    department: "Marketing",
    leaveType: "Sick Leave",
    startDate: "2023-11-10",
    endDate: "2023-11-12",
    days: 3,
    reason: "Fever and cold",
    status: "Approved",
    appliedOn: "2023-11-08",
  },
  {
    id: "LR003",
    employeeId: "EMP003",
    employeeName: "Michael Brown",
    department: "Sales",
    leaveType: "Personal",
    startDate: "2023-11-25",
    endDate: "2023-11-26",
    days: 2,
    reason: "Personal matters",
    status: "Pending",
    appliedOn: "2023-11-10",
  },
  {
    id: "LR004",
    employeeId: "EMP005",
    employeeName: "James Wilson",
    department: "Finance",
    leaveType: "Sick Leave",
    startDate: "2023-11-18",
    endDate: "2023-11-18",
    days: 1,
    reason: "Doctor's appointment",
    status: "Pending",
    appliedOn: "2023-11-16",
  },
  {
    id: "LR005",
    employeeId: "EMP004",
    employeeName: "Emily Davis",
    department: "Human Resources",
    leaveType: "Vacation",
    startDate: "2023-12-05",
    endDate: "2023-12-10",
    days: 6,
    reason: "Year-end vacation",
    status: "Pending",
    appliedOn: "2023-11-20",
  },
];

// Mock leave balances
const leaveBalances = [
  {
    employeeId: "EMP001",
    employeeName: "John Smith",
    department: "Engineering",
    vacation: { total: 20, used: 12, balance: 8 },
    sick: { total: 10, used: 3, balance: 7 },
    personal: { total: 5, used: 2, balance: 3 },
  },
  {
    employeeId: "EMP002",
    employeeName: "Sarah Johnson",
    department: "Marketing",
    vacation: { total: 20, used: 8, balance: 12 },
    sick: { total: 10, used: 5, balance: 5 },
    personal: { total: 5, used: 1, balance: 4 },
  },
  {
    employeeId: "EMP003",
    employeeName: "Michael Brown",
    department: "Sales",
    vacation: { total: 20, used: 15, balance: 5 },
    sick: { total: 10, used: 2, balance: 8 },
    personal: { total: 5, used: 3, balance: 2 },
  },
  {
    employeeId: "EMP004",
    employeeName: "Emily Davis",
    department: "Human Resources",
    vacation: { total: 20, used: 10, balance: 10 },
    sick: { total: 10, used: 4, balance: 6 },
    personal: { total: 5, used: 0, balance: 5 },
  },
  {
    employeeId: "EMP005",
    employeeName: "James Wilson",
    department: "Finance",
    vacation: { total: 20, used: 5, balance: 15 },
    sick: { total: 10, used: 2, balance: 8 },
    personal: { total: 5, used: 1, balance: 4 },
  },
];

interface DateRangePickerProps {
  dateRange: Date[] | undefined;
  setDateRange: React.Dispatch<React.SetStateAction<Date[] | undefined>>;
}

const DateRangePicker = ({ dateRange, setDateRange }: DateRangePickerProps) => {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.length === 2 ? (
              dateRange[0].toDateString() === dateRange[1].toDateString() ? (
                format(dateRange[0], "PPP")
              ) : (
                <>
                  {format(dateRange[0], "PPP")} - {format(dateRange[1], "PPP")}
                </>
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.[0]}
            selected={{
              from: dateRange?.[0],
              to: dateRange?.[1],
            }}
            onSelect={(selectedRange) => {
              if (selectedRange?.from && selectedRange?.to) {
                setDateRange([selectedRange.from, selectedRange.to]);
              }
            }}
            numberOfMonths={2}
            className={cn("pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

const LeaveManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("requests");
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Form state for new leave request
  const [leaveType, setLeaveType] = useState("");
  const [dateRange, setDateRange] = useState<Date[] | undefined>([
    new Date(),
    addDays(new Date(), 5),
  ]);
  const [reason, setReason] = useState("");

  // Filter data based on search term
  const filteredRequests = leaveRequests.filter(
    (request) =>
      request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBalances = leaveBalances.filter(
    (balance) =>
      balance.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      balance.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      balance.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if user is logged in
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);
  
  // Handle submit for new leave request
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!leaveType || !dateRange || !reason) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Calculate days
    const days = dateRange[0] && dateRange[1]
      ? Math.round((dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 60 * 60 * 24)) + 1
      : 0;
      
    // Create new leave request object
    const newLeaveRequest = {
      leaveType,
      startDate: dateRange[0] ? format(dateRange[0], "yyyy-MM-dd") : "",
      endDate: dateRange[1] ? format(dateRange[1], "yyyy-MM-dd") : "",
      days,
      reason,
    };
    
    console.log("New leave request:", newLeaveRequest);
    
    // Show success message
    toast.success("Leave request submitted successfully");
    
    // Close dialog and reset form
    setDialogOpen(false);
    setLeaveType("");
    setReason("");
  };

  const handleApproveReject = (id: string, action: 'approve' | 'reject') => {
    console.log(`${action} leave request ${id}`);
    toast.success(`Leave request ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Leave Management</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Apply for Leave</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Apply for Leave</DialogTitle>
                <DialogDescription>
                  Submit a new leave request for approval
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="leaveType">Leave Type</Label>
                  <Select value={leaveType} onValueChange={setLeaveType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vacation">Vacation</SelectItem>
                      <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                      <SelectItem value="Bereavement">Bereavement</SelectItem>
                      <SelectItem value="Unpaid">Unpaid Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date Range</Label>
                  <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Provide details about your leave request"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Management</CardTitle>
          <CardDescription>
            Track and manage employee leave requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="requests">Leave Requests</TabsTrigger>
                <TabsTrigger value="balances">Leave Balances</TabsTrigger>
              </TabsList>

              <div className="relative w-full sm:w-64 md:w-80">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by employee or leave type..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="requests" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="hidden md:table-cell">Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="font-medium">{request.employeeName}</div>
                          <div className="text-xs text-muted-foreground">
                            {request.department}
                          </div>
                        </TableCell>
                        <TableCell>{request.leaveType}</TableCell>
                        <TableCell>
                          <div className="font-medium">{request.days} day(s)</div>
                          <div className="text-xs text-muted-foreground">
                            {request.startDate === request.endDate
                              ? request.startDate
                              : `${request.startDate} - ${request.endDate}`}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                          {request.reason}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              request.status === "Approved"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : request.status === "Rejected"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            )}
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {request.status === "Pending" ? (
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                                onClick={() => handleApproveReject(request.id, 'approve')}
                              >
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                onClick={() => handleApproveReject(request.id, 'reject')}
                              >
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Print</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredRequests.length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground">No leave requests found.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="balances" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead colSpan={3} className="text-center">Vacation</TableHead>
                      <TableHead colSpan={3} className="text-center">Sick Leave</TableHead>
                      <TableHead colSpan={3} className="text-center">Personal</TableHead>
                    </TableRow>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead className="text-center">Total</TableHead>
                      <TableHead className="text-center">Used</TableHead>
                      <TableHead className="text-center">Balance</TableHead>
                      <TableHead className="text-center">Total</TableHead>
                      <TableHead className="text-center">Used</TableHead>
                      <TableHead className="text-center">Balance</TableHead>
                      <TableHead className="text-center">Total</TableHead>
                      <TableHead className="text-center">Used</TableHead>
                      <TableHead className="text-center">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBalances.map((balance) => (
                      <TableRow key={balance.employeeId}>
                        <TableCell>
                          <div className="font-medium">{balance.employeeName}</div>
                          <div className="text-xs text-muted-foreground">
                            {balance.department}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{balance.vacation.total}</TableCell>
                        <TableCell className="text-center">{balance.vacation.used}</TableCell>
                        <TableCell className="text-center font-medium">{balance.vacation.balance}</TableCell>
                        <TableCell className="text-center">{balance.sick.total}</TableCell>
                        <TableCell className="text-center">{balance.sick.used}</TableCell>
                        <TableCell className="text-center font-medium">{balance.sick.balance}</TableCell>
                        <TableCell className="text-center">{balance.personal.total}</TableCell>
                        <TableCell className="text-center">{balance.personal.used}</TableCell>
                        <TableCell className="text-center font-medium">{balance.personal.balance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredBalances.length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground">No leave balances found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveManagement;
