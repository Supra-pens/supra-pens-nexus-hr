
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PlusCircle, Edit, Eye } from "lucide-react";

// Mock salary structure data
const salaryStructures = [
  {
    id: "SS001",
    title: "Junior Developer",
    basicSalary: 3000,
    houseRentAllowance: 500,
    transportAllowance: 200,
    medicalAllowance: 300,
    performanceBonus: 200,
    incomeTax: 300,
    providentFund: 200,
    totalEarnings: 4200,
    totalDeductions: 500,
    netSalary: 3700,
  },
  {
    id: "SS002",
    title: "Senior Developer",
    basicSalary: 5000,
    houseRentAllowance: 800,
    transportAllowance: 300,
    medicalAllowance: 400,
    performanceBonus: 500,
    incomeTax: 700,
    providentFund: 300,
    totalEarnings: 7000,
    totalDeductions: 1000,
    netSalary: 6000,
  },
  {
    id: "SS003",
    title: "Project Manager",
    basicSalary: 6000,
    houseRentAllowance: 1000,
    transportAllowance: 400,
    medicalAllowance: 500,
    performanceBonus: 800,
    incomeTax: 900,
    providentFund: 400,
    totalEarnings: 8700,
    totalDeductions: 1300,
    netSalary: 7400,
  },
  {
    id: "SS004",
    title: "HR Executive",
    basicSalary: 3500,
    houseRentAllowance: 600,
    transportAllowance: 250,
    medicalAllowance: 350,
    performanceBonus: 300,
    incomeTax: 400,
    providentFund: 250,
    totalEarnings: 5000,
    totalDeductions: 650,
    netSalary: 4350,
  },
];

const SalaryStructure = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStructure, setSelectedStructure] = useState<any>(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const handleCreate = () => {
    setSelectedStructure({
      id: "",
      title: "",
      basicSalary: 0,
      houseRentAllowance: 0,
      transportAllowance: 0,
      medicalAllowance: 0,
      performanceBonus: 0,
      incomeTax: 0,
      providentFund: 0,
      totalEarnings: 0,
      totalDeductions: 0,
      netSalary: 0,
    });
    setIsViewMode(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (structure: any) => {
    setSelectedStructure(structure);
    setIsViewMode(false);
    setIsDialogOpen(true);
  };

  const handleView = (structure: any) => {
    setSelectedStructure(structure);
    setIsViewMode(true);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    toast.success(selectedStructure.id ? "Salary structure updated" : "New salary structure created");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Salary Structures</h3>
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Structure
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Basic Salary</TableHead>
              <TableHead className="text-right">Total Allowances</TableHead>
              <TableHead className="text-right">Total Deductions</TableHead>
              <TableHead className="text-right">Net Salary</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salaryStructures.map((structure) => (
              <TableRow key={structure.id}>
                <TableCell className="font-medium">{structure.title}</TableCell>
                <TableCell className="text-right">${structure.basicSalary}</TableCell>
                <TableCell className="text-right">
                  ${structure.houseRentAllowance + structure.transportAllowance + structure.medicalAllowance + structure.performanceBonus}
                </TableCell>
                <TableCell className="text-right">
                  ${structure.incomeTax + structure.providentFund}
                </TableCell>
                <TableCell className="text-right">${structure.netSalary}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleView(structure)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(structure)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isViewMode
                ? `Salary Structure: ${selectedStructure?.title}`
                : selectedStructure?.id
                ? "Edit Salary Structure"
                : "Create Salary Structure"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Position Title</Label>
                <Input
                  id="title"
                  value={selectedStructure?.title || ""}
                  onChange={(e) =>
                    setSelectedStructure({ ...selectedStructure, title: e.target.value })
                  }
                  disabled={isViewMode}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="basicSalary">Basic Salary ($)</Label>
                <Input
                  id="basicSalary"
                  type="number"
                  value={selectedStructure?.basicSalary || 0}
                  onChange={(e) =>
                    setSelectedStructure({
                      ...selectedStructure,
                      basicSalary: parseFloat(e.target.value),
                    })
                  }
                  disabled={isViewMode}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="mb-2 font-medium">Allowances</h4>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Label htmlFor="houseRent">House Rent</Label>
                    <Input
                      id="houseRent"
                      type="number"
                      value={selectedStructure?.houseRentAllowance || 0}
                      onChange={(e) =>
                        setSelectedStructure({
                          ...selectedStructure,
                          houseRentAllowance: parseFloat(e.target.value),
                        })
                      }
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Label htmlFor="transport">Transport</Label>
                    <Input
                      id="transport"
                      type="number"
                      value={selectedStructure?.transportAllowance || 0}
                      onChange={(e) =>
                        setSelectedStructure({
                          ...selectedStructure,
                          transportAllowance: parseFloat(e.target.value),
                        })
                      }
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Label htmlFor="medical">Medical</Label>
                    <Input
                      id="medical"
                      type="number"
                      value={selectedStructure?.medicalAllowance || 0}
                      onChange={(e) =>
                        setSelectedStructure({
                          ...selectedStructure,
                          medicalAllowance: parseFloat(e.target.value),
                        })
                      }
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Label htmlFor="performance">Performance Bonus</Label>
                    <Input
                      id="performance"
                      type="number"
                      value={selectedStructure?.performanceBonus || 0}
                      onChange={(e) =>
                        setSelectedStructure({
                          ...selectedStructure,
                          performanceBonus: parseFloat(e.target.value),
                        })
                      }
                      disabled={isViewMode}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium">Deductions</h4>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Label htmlFor="incomeTax">Income Tax</Label>
                    <Input
                      id="incomeTax"
                      type="number"
                      value={selectedStructure?.incomeTax || 0}
                      onChange={(e) =>
                        setSelectedStructure({
                          ...selectedStructure,
                          incomeTax: parseFloat(e.target.value),
                        })
                      }
                      disabled={isViewMode}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Label htmlFor="providentFund">Provident Fund</Label>
                    <Input
                      id="providentFund"
                      type="number"
                      value={selectedStructure?.providentFund || 0}
                      onChange={(e) =>
                        setSelectedStructure({
                          ...selectedStructure,
                          providentFund: parseFloat(e.target.value),
                        })
                      }
                      disabled={isViewMode}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            {!isViewMode && (
              <Button type="submit" onClick={handleSave}>
                {selectedStructure?.id ? "Update" : "Create"}
              </Button>
            )}
            {isViewMode && (
              <Button type="button" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalaryStructure;
