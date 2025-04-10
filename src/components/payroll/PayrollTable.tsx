
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Download, MoreHorizontal, FileText } from "lucide-react";
import { toast } from "sonner";

// Mock payroll data
const payrollData = [
  {
    id: "PAY001",
    name: "John Doe",
    position: "Software Engineer",
    month: "March",
    year: "2023",
    basicSalary: 5000,
    allowances: 1000,
    deductions: 500,
    netSalary: 5500,
    status: "Paid",
  },
  {
    id: "PAY002",
    name: "Jane Smith",
    position: "HR Manager",
    month: "March",
    year: "2023",
    basicSalary: 4500,
    allowances: 800,
    deductions: 450,
    netSalary: 4850,
    status: "Paid",
  },
  {
    id: "PAY003",
    name: "Mike Johnson",
    position: "UI Designer",
    month: "March",
    year: "2023",
    basicSalary: 4000,
    allowances: 700,
    deductions: 400,
    netSalary: 4300,
    status: "Pending",
  },
  {
    id: "PAY004",
    name: "Sarah Williams",
    position: "Marketing Specialist",
    month: "March",
    year: "2023",
    basicSalary: 3800,
    allowances: 600,
    deductions: 380,
    netSalary: 4020,
    status: "Paid",
  },
  {
    id: "PAY005",
    name: "Robert Brown",
    position: "Product Manager",
    month: "March",
    year: "2023",
    basicSalary: 5500,
    allowances: 1100,
    deductions: 550,
    netSalary: 6050,
    status: "Pending",
  },
];

const PayrollTable = () => {
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [selectedYear, setSelectedYear] = useState("2023");

  const handleView = (id: string) => {
    console.log("Viewing payroll record:", id);
    toast.info(`Viewing payroll details for record ${id}`);
  };

  const handleDownload = (id: string) => {
    console.log("Downloading payslip:", id);
    toast.success(`Downloading payslip for record ${id}`);
  };

  const handleRunPayroll = () => {
    toast.success(`Payroll processing initiated for ${selectedMonth} ${selectedYear}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex space-x-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="January">January</SelectItem>
              <SelectItem value="February">February</SelectItem>
              <SelectItem value="March">March</SelectItem>
              <SelectItem value="April">April</SelectItem>
              <SelectItem value="May">May</SelectItem>
              <SelectItem value="June">June</SelectItem>
              <SelectItem value="July">July</SelectItem>
              <SelectItem value="August">August</SelectItem>
              <SelectItem value="September">September</SelectItem>
              <SelectItem value="October">October</SelectItem>
              <SelectItem value="November">November</SelectItem>
              <SelectItem value="December">December</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleRunPayroll}>Run Payroll</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Position</TableHead>
              <TableHead className="text-right">Basic Salary</TableHead>
              <TableHead className="text-right">Allowances</TableHead>
              <TableHead className="text-right">Deductions</TableHead>
              <TableHead className="text-right">Net Salary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollData.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.name}</TableCell>
                <TableCell>{record.position}</TableCell>
                <TableCell className="text-right">${record.basicSalary}</TableCell>
                <TableCell className="text-right">${record.allowances}</TableCell>
                <TableCell className="text-right">${record.deductions}</TableCell>
                <TableCell className="text-right">${record.netSalary}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      record.status === "Paid"
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {record.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(record.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload(record.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Payslip
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PayrollTable;
