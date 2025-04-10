
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Employee {
  id: string;
  position: string;
  department: string;
  employeeId: string;
  salary: string;
  joinDate: string;
  manager: string;
  [key: string]: string;
}

interface EmployeeEmploymentInfoProps {
  employee: Employee;
}

const EmployeeEmploymentInfo = ({ employee }: EmployeeEmploymentInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    position: employee.position,
    department: employee.department,
    employeeId: employee.employeeId,
    salary: employee.salary,
    joinDate: employee.joinDate,
    manager: employee.manager,
    employmentType: "Full-time",
    workLocation: "Main Office - San Francisco",
    workEmail: `${employee.employeeId.toLowerCase()}@suprapens.com`,
    workPhone: "+1 (555) 123-4567 Ext. 123",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated employment info:", formData);
    toast.success("Employment information updated successfully");
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Employment Information</CardTitle>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <div className="p-2 border rounded-md bg-muted/20">{formData.employeeId}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date</Label>
              {isEditing ? (
                <Input
                  id="joinDate"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-muted/20">{formData.joinDate}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              {isEditing ? (
                <Select 
                  value={formData.department}
                  onValueChange={(value) => handleSelectChange("department", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={formData.department} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 border rounded-md bg-muted/20">{formData.department}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              {isEditing ? (
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-muted/20">{formData.position}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentType">Employment Type</Label>
              {isEditing ? (
                <Select 
                  value={formData.employmentType}
                  onValueChange={(value) => handleSelectChange("employmentType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={formData.employmentType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Intern">Intern</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="p-2 border rounded-md bg-muted/20">{formData.employmentType}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="manager">Manager</Label>
              {isEditing ? (
                <Input
                  id="manager"
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-muted/20">{formData.manager}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="workLocation">Work Location</Label>
              {isEditing ? (
                <Input
                  id="workLocation"
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-muted/20">{formData.workLocation}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              {isEditing ? (
                <Input
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-muted/20">{formData.salary}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="workEmail">Work Email</Label>
              {isEditing ? (
                <Input
                  id="workEmail"
                  name="workEmail"
                  type="email"
                  value={formData.workEmail}
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-muted/20">{formData.workEmail}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="workPhone">Work Phone</Label>
              {isEditing ? (
                <Input
                  id="workPhone"
                  name="workPhone"
                  value={formData.workPhone}
                  onChange={handleChange}
                />
              ) : (
                <div className="p-2 border rounded-md bg-muted/20">{formData.workPhone}</div>
              )}
            </div>
          </div>
          
          {isEditing && (
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default EmployeeEmploymentInfo;
