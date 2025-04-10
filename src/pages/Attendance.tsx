
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Calendar as CalendarIcon, Filter, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Mock attendance data
const attendanceData = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "John Smith",
    date: "2023-11-01",
    checkIn: "09:05 AM",
    checkOut: "05:30 PM",
    totalHours: "8.25",
    status: "Present",
    department: "Engineering",
  },
  {
    id: 2,
    employeeId: "EMP002",
    employeeName: "Sarah Johnson",
    date: "2023-11-01",
    checkIn: "08:55 AM",
    checkOut: "06:10 PM",
    totalHours: "9.15",
    status: "Present",
    department: "Marketing",
  },
  {
    id: 3,
    employeeId: "EMP003",
    employeeName: "Michael Brown",
    date: "2023-11-01",
    checkIn: "09:20 AM",
    checkOut: "05:45 PM",
    totalHours: "8.25",
    status: "Present",
    department: "Sales",
  },
  {
    id: 4,
    employeeId: "EMP004",
    employeeName: "Emily Davis",
    date: "2023-11-01",
    checkIn: "-",
    checkOut: "-",
    totalHours: "0",
    status: "Absent",
    department: "Human Resources",
  },
  {
    id: 5,
    employeeId: "EMP005",
    employeeName: "James Wilson",
    date: "2023-11-01",
    checkIn: "12:30 PM",
    checkOut: "05:30 PM",
    totalHours: "5.0",
    status: "Half Day",
    department: "Finance",
  },
];

// Mock monthly summaries
const monthlySummary = [
  {
    employeeId: "EMP001",
    employeeName: "John Smith",
    department: "Engineering",
    present: 22,
    absent: 0,
    halfDay: 1,
    leave: 2,
    overtime: 4,
    totalHours: "184.5",
  },
  {
    employeeId: "EMP002",
    employeeName: "Sarah Johnson",
    department: "Marketing",
    present: 20,
    absent: 1,
    halfDay: 2,
    leave: 2,
    overtime: 6,
    totalHours: "179.2",
  },
  {
    employeeId: "EMP003",
    employeeName: "Michael Brown",
    department: "Sales",
    present: 21,
    absent: 2,
    halfDay: 0,
    leave: 2,
    overtime: 2,
    totalHours: "175.5",
  },
  {
    employeeId: "EMP004",
    employeeName: "Emily Davis",
    department: "Human Resources",
    present: 19,
    absent: 3,
    halfDay: 1,
    leave: 2,
    overtime: 0,
    totalHours: "156.0",
  },
  {
    employeeId: "EMP005",
    employeeName: "James Wilson",
    department: "Finance",
    present: 20,
    absent: 0,
    halfDay: 3,
    leave: 2,
    overtime: 3,
    totalHours: "168.0",
  },
];

const Attendance = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("daily");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Check if user is logged in
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // Filter attendance data based on search term
  const filteredDaily = attendanceData.filter(
    (record) =>
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMonthly = monthlySummary.filter(
    (record) =>
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Generate Report</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>
            Track and manage employee attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="daily">Daily View</TabsTrigger>
                <TabsTrigger value="monthly">Monthly Summary</TabsTrigger>
              </TabsList>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-64 md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by name or ID..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full sm:w-[200px] justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className={cn("p-3 pointer-events-auto")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <TabsContent value="daily" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Department</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDaily.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">
                          {record.employeeId}
                        </TableCell>
                        <TableCell>{record.employeeName}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {record.department}
                        </TableCell>
                        <TableCell>{record.checkIn}</TableCell>
                        <TableCell>{record.checkOut}</TableCell>
                        <TableCell>{record.totalHours}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              record.status === "Present"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : record.status === "Absent"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            )}
                          >
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredDaily.length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground">No records found.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Department</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Half Day</TableHead>
                      <TableHead>Leave</TableHead>
                      <TableHead>Overtime</TableHead>
                      <TableHead>Total Hours</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMonthly.map((record) => (
                      <TableRow key={record.employeeId}>
                        <TableCell className="font-medium">
                          {record.employeeId}
                        </TableCell>
                        <TableCell>{record.employeeName}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {record.department}
                        </TableCell>
                        <TableCell>{record.present}</TableCell>
                        <TableCell>{record.absent}</TableCell>
                        <TableCell>{record.halfDay}</TableCell>
                        <TableCell>{record.leave}</TableCell>
                        <TableCell>{record.overtime}</TableCell>
                        <TableCell>{record.totalHours}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredMonthly.length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground">No records found.</p>
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

export default Attendance;
