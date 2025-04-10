
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmployeeAttendanceProps {
  employeeId: string;
  limit?: number;
}

// Mock attendance data
const attendanceRecords = [
  {
    id: 1,
    date: "2023-11-01",
    checkIn: "09:05 AM",
    checkOut: "05:30 PM",
    totalHours: "8.25",
    status: "Present",
  },
  {
    id: 2,
    date: "2023-11-02",
    checkIn: "08:55 AM",
    checkOut: "06:10 PM",
    totalHours: "9.15",
    status: "Present",
  },
  {
    id: 3,
    date: "2023-11-03",
    checkIn: "09:20 AM",
    checkOut: "05:45 PM",
    totalHours: "8.25",
    status: "Present",
  },
  {
    id: 4,
    date: "2023-11-04",
    checkIn: "-",
    checkOut: "-",
    totalHours: "0",
    status: "Absent",
  },
  {
    id: 5,
    date: "2023-11-05",
    checkIn: "12:30 PM",
    checkOut: "05:30 PM",
    totalHours: "5.0",
    status: "Half Day",
  },
  {
    id: 6,
    date: "2023-11-06",
    checkIn: "-",
    checkOut: "-",
    totalHours: "0",
    status: "Weekend",
  },
  {
    id: 7,
    date: "2023-11-07",
    checkIn: "-",
    checkOut: "-",
    totalHours: "0",
    status: "Weekend",
  },
  {
    id: 8,
    date: "2023-11-08",
    checkIn: "08:50 AM",
    checkOut: "05:30 PM",
    totalHours: "8.67",
    status: "Present",
  },
  {
    id: 9,
    date: "2023-11-09",
    checkIn: "09:00 AM",
    checkOut: "05:45 PM",
    totalHours: "8.75",
    status: "Present",
  },
  {
    id: 10,
    date: "2023-11-10",
    checkIn: "-",
    checkOut: "-",
    totalHours: "0",
    status: "Leave",
  },
];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

const EmployeeAttendance = ({ employeeId, limit }: EmployeeAttendanceProps) => {
  const records = limit ? attendanceRecords.slice(0, limit) : attendanceRecords;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          <span>Attendance Records</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{formatDate(record.date)}</TableCell>
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
                        : record.status === "Half Day"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : record.status === "Leave"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    )}
                  >
                    {record.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {limit && attendanceRecords.length > limit && (
          <div className="flex justify-center mt-4">
            <Button variant="ghost" className="text-sm">View All Attendance Records</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Button = ({ 
  children, 
  variant, 
  className 
}: { 
  children: React.ReactNode; 
  variant?: string; 
  className?: string;
}) => {
  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium",
        variant === "ghost" ? "text-primary hover:bg-muted" : "",
        className
      )}
    >
      {children}
    </button>
  );
};

export default EmployeeAttendance;
