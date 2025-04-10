
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock employee data
const employees = [
  {
    id: "EMP001",
    name: "John Smith",
    email: "john.smith@suprapens.com",
    department: "Engineering",
    position: "Senior Developer",
    status: "Active",
    joinDate: "Jan 15, 2022",
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    email: "sarah.johnson@suprapens.com",
    department: "Marketing",
    position: "Marketing Manager",
    status: "Active",
    joinDate: "Mar 03, 2023",
  },
  {
    id: "EMP003",
    name: "Michael Brown",
    email: "michael.brown@suprapens.com",
    department: "Sales",
    position: "Sales Representative",
    status: "Active",
    joinDate: "Oct 10, 2022",
  },
  {
    id: "EMP004",
    name: "Emily Davis",
    email: "emily.davis@suprapens.com",
    department: "Human Resources",
    position: "HR Specialist",
    status: "Active",
    joinDate: "Jun 05, 2021",
  },
  {
    id: "EMP005",
    name: "James Wilson",
    email: "james.wilson@suprapens.com",
    department: "Finance",
    position: "Financial Analyst",
    status: "On Leave",
    joinDate: "Dec 12, 2021",
  },
  {
    id: "EMP006",
    name: "Olivia Martinez",
    email: "olivia.martinez@suprapens.com",
    department: "Engineering",
    position: "UX Designer",
    status: "Active",
    joinDate: "May 18, 2023",
  },
  {
    id: "EMP007",
    name: "William Taylor",
    email: "william.taylor@suprapens.com",
    department: "Operations",
    position: "Operations Manager",
    status: "Active",
    joinDate: "Feb 01, 2020",
  },
];

const EmployeeList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter employees based on search term
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if user is logged in
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Employee</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
          <CardDescription>
            View and manage all employees in your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search employees..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 ml-auto">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden md:table-cell">Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs text-muted-foreground md:hidden">
                        {employee.department} - {employee.position}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {employee.department}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {employee.position}
                    </TableCell>
                    <TableCell>
                      <Badge variant={employee.status === "Active" ? "default" : "outline"}>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {employee.joinDate}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredEmployees.length === 0 && (
              <div className="p-6 text-center">
                <p className="text-muted-foreground">No employees found.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeList;
