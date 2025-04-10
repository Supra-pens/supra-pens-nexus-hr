
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
import { CalendarRange } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmployeeLeaveProps {
  employeeId: string;
  limit?: number;
}

// Mock leave data
const leaveRecords = [
  {
    id: "L001",
    leaveType: "Vacation",
    startDate: "2023-12-20",
    endDate: "2023-12-25",
    days: 6,
    reason: "Family vacation",
    status: "Approved",
    appliedOn: "2023-11-10",
  },
  {
    id: "L002",
    leaveType: "Sick Leave",
    startDate: "2023-11-15",
    endDate: "2023-11-16",
    days: 2,
    reason: "Fever",
    status: "Approved",
    appliedOn: "2023-11-14",
  },
  {
    id: "L003",
    leaveType: "Personal",
    startDate: "2023-11-29",
    endDate: "2023-11-29",
    days: 1,
    reason: "Personal matters",
    status: "Pending",
    appliedOn: "2023-11-20",
  },
  {
    id: "L004",
    leaveType: "Sick Leave",
    startDate: "2023-10-05",
    endDate: "2023-10-07",
    days: 3,
    reason: "COVID-19",
    status: "Approved",
    appliedOn: "2023-10-04",
  },
  {
    id: "L005",
    leaveType: "Personal",
    startDate: "2024-01-15",
    endDate: "2024-01-17",
    days: 3,
    reason: "Family event",
    status: "Pending",
    appliedOn: "2023-11-25",
  },
];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric' 
  }).format(date);
};

const formatDateRange = (startDate: string, endDate: string) => {
  if (startDate === endDate) {
    return formatDate(startDate);
  }
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

const EmployeeLeave = ({ employeeId, limit }: EmployeeLeaveProps) => {
  const records = limit ? leaveRecords.slice(0, limit) : leaveRecords;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <CalendarRange className="h-5 w-5" />
          <span>Leave Records</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.leaveType}</TableCell>
                <TableCell>
                  {formatDateRange(record.startDate, record.endDate)}
                  <div className="text-xs text-muted-foreground">
                    Applied on: {formatDate(record.appliedOn)}
                  </div>
                </TableCell>
                <TableCell>{record.days}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      record.status === "Approved"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : record.status === "Rejected"
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
        {limit && leaveRecords.length > limit && (
          <div className="flex justify-center mt-4">
            <Button variant="ghost" className="text-sm">View All Leave Records</Button>
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

export default EmployeeLeave;
