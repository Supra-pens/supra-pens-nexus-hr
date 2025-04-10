
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase, Building } from "lucide-react";
import EmployeePersonalInfo from "@/components/employees/EmployeePersonalInfo";
import EmployeeEmploymentInfo from "@/components/employees/EmployeeEmploymentInfo";
import EmployeeDocuments from "@/components/employees/EmployeeDocuments";
import EmployeeAttendance from "@/components/employees/EmployeeAttendance";
import EmployeeLeave from "@/components/employees/EmployeeLeave";

// Mock employee data - would be replaced with API call
const getEmployeeById = (id: string) => {
  return {
    id: id,
    name: "John Smith",
    email: "john.smith@suprapens.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, San Francisco, CA 94105",
    department: "Engineering",
    position: "Senior Developer",
    status: "Active",
    joinDate: "Jan 15, 2022",
    birthDate: "May 10, 1985",
    manager: "Sarah Johnson",
    employeeId: "EMP001",
    salary: "$85,000",
    avatar: "",
  };
};

const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentTab, setCurrentTab] = useState("overview");
  
  // This would be replaced with an API call in a real application
  const employee = getEmployeeById(id || "EMP001");

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" className="mr-4" asChild>
          <Link to="/employees">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Employees
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Employee Profile</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={employee.avatar} alt={employee.name} />
              <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{employee.name}</h2>
            <p className="text-muted-foreground mb-2">{employee.position}</p>
            <Badge className="mb-4">{employee.status}</Badge>
            
            <Separator className="my-4" />
            
            <div className="space-y-3 w-full text-left">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{employee.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{employee.phone}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{employee.department}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Employee ID: {employee.employeeId}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Joined: {employee.joinDate}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
                <span className="text-sm">{employee.address}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex space-x-2">
              <Button className="flex-1" variant="outline">Edit</Button>
              <Button className="flex-1" variant="default">Message</Button>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Summary</CardTitle>
                  <CardDescription>Key information about {employee.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-medium">Personal Details</h3>
                      <Separator className="my-2" />
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Full Name:</dt>
                          <dd>{employee.name}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Birth Date:</dt>
                          <dd>{employee.birthDate}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Email:</dt>
                          <dd>{employee.email}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Phone:</dt>
                          <dd>{employee.phone}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Employment Details</h3>
                      <Separator className="my-2" />
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Employee ID:</dt>
                          <dd>{employee.employeeId}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Position:</dt>
                          <dd>{employee.position}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Department:</dt>
                          <dd>{employee.department}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Manager:</dt>
                          <dd>{employee.manager}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Salary:</dt>
                          <dd>{employee.salary}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EmployeeLeave employeeId={employee.id} limit={3} />
                <EmployeeAttendance employeeId={employee.id} limit={5} />
              </div>
            </TabsContent>
            
            <TabsContent value="personal" className="mt-6">
              <EmployeePersonalInfo employee={employee} />
            </TabsContent>
            
            <TabsContent value="employment" className="mt-6">
              <EmployeeEmploymentInfo employee={employee} />
            </TabsContent>
            
            <TabsContent value="documents" className="mt-6">
              <EmployeeDocuments employeeId={employee.id} />
            </TabsContent>
            
            <TabsContent value="attendance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance & Leave</CardTitle>
                  <CardDescription>Manage attendance records and leave requests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <EmployeeAttendance employeeId={employee.id} />
                  <EmployeeLeave employeeId={employee.id} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
