
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, MoreHorizontal, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";

// Mock department data
const departments = [
  {
    id: "DEP001",
    name: "Engineering",
    manager: "Sarah Johnson",
    employeeCount: 24,
    budget: "$450,000",
    location: "Main Office, Floor 3",
    status: "Active",
  },
  {
    id: "DEP002",
    name: "Marketing",
    manager: "Michael Brown",
    employeeCount: 12,
    budget: "$320,000",
    location: "Main Office, Floor 2",
    status: "Active",
  },
  {
    id: "DEP003",
    name: "Sales",
    manager: "Emily Davis",
    employeeCount: 18,
    budget: "$380,000",
    location: "Branch Office, Downtown",
    status: "Active",
  },
  {
    id: "DEP004",
    name: "Human Resources",
    manager: "James Wilson",
    employeeCount: 8,
    budget: "$220,000",
    location: "Main Office, Floor 1",
    status: "Active",
  },
  {
    id: "DEP005",
    name: "Finance",
    manager: "Olivia Martinez",
    employeeCount: 10,
    budget: "$290,000",
    location: "Main Office, Floor 1",
    status: "Active",
  },
  {
    id: "DEP006",
    name: "Operations",
    manager: "William Taylor",
    employeeCount: 15,
    budget: "$350,000",
    location: "Warehouse Facility",
    status: "Active",
  },
];

interface AddDepartmentFormProps {
  closeDialog: () => void;
}

const AddDepartmentForm: React.FC<AddDepartmentFormProps> = ({ closeDialog }) => {
  const [department, setDepartment] = useState({
    name: "",
    manager: "",
    budget: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New department:", department);
    closeDialog();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={department.name}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="manager" className="text-right">
            Manager
          </Label>
          <Input
            id="manager"
            name="manager"
            value={department.manager}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="budget" className="text-right">
            Budget
          </Label>
          <Input
            id="budget"
            name="budget"
            value={department.budget}
            onChange={handleChange}
            className="col-span-3"
            placeholder="$100,000"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="location" className="text-right">
            Location
          </Label>
          <Input
            id="location"
            name="location"
            value={department.location}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={closeDialog}>
          Cancel
        </Button>
        <Button type="submit">Add Department</Button>
      </DialogFooter>
    </form>
  );
};

const Departments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter departments based on search term
  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.manager.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-3xl font-bold">Departments</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Department</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Department</DialogTitle>
              <DialogDescription>
                Create a new department in the organization
              </DialogDescription>
            </DialogHeader>
            <AddDepartmentForm closeDialog={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department List</CardTitle>
          <CardDescription>
            View and manage all departments in your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search departments..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead className="hidden md:table-cell">Employees</TableHead>
                  <TableHead className="hidden md:table-cell">Budget</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell className="font-medium">{department.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{department.name}</div>
                    </TableCell>
                    <TableCell>{department.manager}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{department.employeeCount}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{department.budget}</TableCell>
                    <TableCell className="hidden md:table-cell">{department.location}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {department.status}
                      </Badge>
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
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Department</DropdownMenuItem>
                          <DropdownMenuItem>View Employees</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Archive Department
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredDepartments.length === 0 && (
              <div className="p-6 text-center">
                <p className="text-muted-foreground">No departments found.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Departments;
