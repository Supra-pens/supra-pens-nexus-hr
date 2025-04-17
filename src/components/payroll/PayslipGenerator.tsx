
import React, { useState, useRef } from "react";
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Download, Printer, Settings } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Mock employee data
const employees = [
  { id: "EMP001", name: "John Doe", designation: "Software Engineer", department: "IT" },
  { id: "EMP002", name: "Jane Smith", designation: "HR Manager", department: "HR" },
  { id: "EMP003", name: "Mike Johnson", designation: "UI Designer", department: "Design" },
  { id: "EMP004", name: "Sarah Williams", designation: "Marketing Specialist", department: "Marketing" },
  { id: "EMP005", name: "Robert Brown", designation: "Product Manager", department: "Product" },
];

interface SalarySlipData {
  employeeName: string;
  employeePAN: string;
  employeeId: string;
  doj: string;
  uan: string;
  esic: string;
  month: string;
  year: string;
  designation: string;
  workingDays: number;
  unpaidLeave: number;
  paidDays: number;
  earnings: {
    basicPay: number;
    houseRentAllowance: number;
    [key: string]: number;
  };
  deductions: {
    providentFund: number;
    esi: number;
    tax: number;
    tds: number;
    [key: string]: number;
  };
  totalEarnings: number;
  totalDeduction: number;
  netPay: number;
}

const PayslipGenerator: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState<boolean>(false);
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState<boolean>(false);
  const [salarySlipData, setSalarySlipData] = useState<SalarySlipData | null>(null);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState<boolean>(false);
  const payslipRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);
  
  // Custom fields
  const [customFields, setCustomFields] = useState({
    earnings: [] as string[],
    deductions: [] as string[]
  });
  
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const years = ["2022", "2023", "2024", "2025"];

  const handleGenerateSlip = () => {
    if (!selectedEmployee || !selectedMonth || !selectedYear) {
      toast.error("Please select all required fields");
      return;
    }

    // In a real app, this would fetch data from an API
    const employee = employees.find(emp => emp.id === selectedEmployee);
    
    if (!employee) {
      toast.error("Employee not found");
      return;
    }

    // Generate mock salary slip data
    const slipData: SalarySlipData = {
      employeeName: employee.name,
      employeePAN: "ABCDE1234F",
      employeeId: employee.id,
      doj: "01/01/2022",
      uan: "1234567890",
      esic: "ESI12345678",
      month: selectedMonth,
      year: selectedYear,
      designation: employee.designation,
      workingDays: 28,
      unpaidLeave: 0,
      paidDays: 28,
      earnings: {
        basicPay: 50000,
        houseRentAllowance: 15000,
      },
      deductions: {
        providentFund: 6000,
        esi: 1000,
        tax: 5000,
        tds: 2000,
      },
      totalEarnings: 65000,
      totalDeduction: 14000,
      netPay: 51000
    };
    
    // Add any custom fields
    customFields.earnings.forEach(field => {
      slipData.earnings[field] = 0;
    });
    
    customFields.deductions.forEach(field => {
      slipData.deductions[field] = 0;
    });
    
    setSalarySlipData(slipData);
    setIsGenerateDialogOpen(true);
  };

  const handleAutoGenerate = () => {
    toast.success("Generating salary slips for all paid employees");
    // In a real app, this would generate slips for all employees with "Paid" status
  };
  
  const handleAddCustomField = (type: 'earnings' | 'deductions', fieldName: string) => {
    if (fieldName) {
      setCustomFields({
        ...customFields,
        [type]: [...customFields[type], fieldName]
      });
    }
  };
  
  const handleDownloadSlip = async () => {
    if (!payslipRef.current || !salarySlipData) return;
    
    try {
      toast.loading("Generating PDF...");
      
      const payslipElement = payslipRef.current;
      
      // Use html2canvas to capture the element
      const canvas = await html2canvas(payslipElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff"
      });
      
      // Calculate PDF dimensions (A4 format)
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Save the PDF
      pdf.save(`Salary_Slip_${salarySlipData.employeeName}_${salarySlipData.month}_${salarySlipData.year}.pdf`);
      
      toast.dismiss();
      toast.success("PDF downloaded successfully");
      setIsGenerateDialogOpen(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to generate PDF. Please try again.");
      console.error("PDF generation error:", error);
    }
  };
  
  const handlePrintSlip = () => {
    setIsPrintPreviewOpen(true);
    
    // Short delay to ensure the component is rendered before printing
    setTimeout(() => {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (!printWindow || !printRef.current) return;
      
      const printContent = printRef.current.innerHTML;
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Salary Slip</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
              }
              .print-container {
                width: 100%;
                max-width: 210mm;
                margin: 0 auto;
                page-break-inside: avoid;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              td, th {
                padding: 5px;
                border: 1px solid #ddd;
              }
              .bg-indigo-900 {
                background-color: #312e81;
                color: white;
              }
              .text-center {
                text-align: center;
              }
              .text-right {
                text-align: right;
              }
              .font-medium {
                font-weight: 500;
              }
              .text-lg {
                font-size: 1.125rem;
              }
              .text-xl {
                font-size: 1.25rem;
              }
              .text-2xl {
                font-size: 1.5rem;
              }
              .font-bold {
                font-weight: 700;
              }
              .p-4 {
                padding: 1rem;
              }
              .py-1 {
                padding-top: 0.25rem;
                padding-bottom: 0.25rem;
              }
              .border-t {
                border-top: 1px solid #ddd;
              }
              .border-r {
                border-right: 1px solid #ddd;
              }
              .grid {
                display: grid;
              }
              .grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
              .text-sm {
                font-size: 0.875rem;
              }
              .italic {
                font-style: italic;
              }
              @media print {
                body {
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              ${printContent}
            </div>
            <script>
              window.onload = function() {
                window.print();
                window.setTimeout(function() {
                  window.close();
                }, 500);
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
      
      setIsPrintPreviewOpen(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Salary Slip Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="employee">Employee</Label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger id="employee">
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(emp => (
                    <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger id="month">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map(month => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button onClick={() => setIsCustomDialogOpen(true)} variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Custom Fields
            </Button>
            <Button onClick={handleAutoGenerate} variant="secondary">
              Generate All Paid
            </Button>
          </div>
          <Button onClick={handleGenerateSlip}>Generate Salary Slip</Button>
        </CardFooter>
      </Card>
      
      {/* Generate Salary Slip Dialog */}
      <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <div className="hidden">
            <DialogHeader>
              <DialogTitle>Salary Slip</DialogTitle>
            </DialogHeader>
          </div>
          
          {salarySlipData && (
            <ScrollArea className="h-[calc(90vh-180px)]">
              <div className="border rounded-md overflow-hidden" ref={payslipRef}>
                {/* Company Header */}
                <div className="bg-indigo-900 text-white p-4">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-2xl font-bold">SUPRA PENS</div>
                    <div className="text-center md:text-right">
                      <div className="text-lg">GLOBAL WRITINGS</div>
                      <div className="text-xs">22, BRABOURNE ROAD, 3RD FLOOR, KOLKATA 70001, WEST BENGAL, INDIA</div>
                      <div className="text-xs">+91 33 2221 8538/ 2234 3007</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-900 text-white py-1 text-center">
                  <h2 className="text-lg font-medium">Salary Slip</h2>
                </div>
                
                {/* Employee Details */}
                <div className="p-0">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Employee Name:</TableCell>
                        <TableCell>{salarySlipData.employeeName}</TableCell>
                        <TableCell className="font-medium">Month</TableCell>
                        <TableCell>{salarySlipData.month}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Employee PAN No:</TableCell>
                        <TableCell>{salarySlipData.employeePAN}</TableCell>
                        <TableCell className="font-medium">Year</TableCell>
                        <TableCell>{salarySlipData.year}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Employee ID:</TableCell>
                        <TableCell>{salarySlipData.employeeId}</TableCell>
                        <TableCell className="font-medium">Designation</TableCell>
                        <TableCell>{salarySlipData.designation}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">D.O.J.:</TableCell>
                        <TableCell>{salarySlipData.doj}</TableCell>
                        <TableCell className="font-medium">Working Days</TableCell>
                        <TableCell>{salarySlipData.workingDays}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">UAN NO:</TableCell>
                        <TableCell>{salarySlipData.uan}</TableCell>
                        <TableCell className="font-medium">Unpaid Leave</TableCell>
                        <TableCell>{salarySlipData.unpaidLeave}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">ESIC NO:</TableCell>
                        <TableCell>{salarySlipData.esic}</TableCell>
                        <TableCell className="font-medium">Paid Days</TableCell>
                        <TableCell>{salarySlipData.paidDays}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                {/* Earnings and Deductions */}
                <div className="grid grid-cols-2">
                  <div className="border-t border-r">
                    <div className="bg-indigo-900 text-white p-2 text-center">Earnings</div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Rate</TableHead>
                          <TableHead className="text-right">Earned</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Basic Pay</TableCell>
                          <TableCell className="text-right">{salarySlipData.earnings.basicPay}</TableCell>
                          <TableCell className="text-right">{salarySlipData.earnings.basicPay}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>House Rent Allowance</TableCell>
                          <TableCell className="text-right">{salarySlipData.earnings.houseRentAllowance}</TableCell>
                          <TableCell className="text-right">{salarySlipData.earnings.houseRentAllowance}</TableCell>
                        </TableRow>
                        {customFields.earnings.map((field, index) => (
                          <TableRow key={`earning-${index}`}>
                            <TableCell>{field}</TableCell>
                            <TableCell className="text-right">0</TableCell>
                            <TableCell className="text-right">0</TableCell>
                          </TableRow>
                        ))}
                        {/* Empty rows for padding if needed */}
                        {customFields.earnings.length === 0 && Array.from({ length: 2 }).map((_, i) => (
                          <TableRow key={`empty-earning-${i}`}>
                            <TableCell>&nbsp;</TableCell>
                            <TableCell>&nbsp;</TableCell>
                            <TableCell>&nbsp;</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="border-t">
                    <div className="bg-indigo-900 text-white p-2 text-center">Deductions</div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Provident Fund</TableCell>
                          <TableCell className="text-right">{salarySlipData.deductions.providentFund}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>ESI</TableCell>
                          <TableCell className="text-right">{salarySlipData.deductions.esi}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>P Tax</TableCell>
                          <TableCell className="text-right">{salarySlipData.deductions.tax}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>TDS</TableCell>
                          <TableCell className="text-right">{salarySlipData.deductions.tds}</TableCell>
                        </TableRow>
                        {customFields.deductions.map((field, index) => (
                          <TableRow key={`deduction-${index}`}>
                            <TableCell>{field}</TableCell>
                            <TableCell className="text-right">0</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                {/* Totals */}
                <div className="grid grid-cols-2 border-t">
                  <div className="border-r">
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Total Earnings</TableCell>
                          <TableCell className="text-right">{salarySlipData.totalEarnings}</TableCell>
                          <TableCell className="text-right">{salarySlipData.totalEarnings}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Total Deduction</TableCell>
                          <TableCell className="text-right">{salarySlipData.totalDeduction}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                {/* Net Pay */}
                <div className="border-t">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Net Pay</TableCell>
                        <TableCell className="text-right">{salarySlipData.netPay}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                {/* Note */}
                <div className="border-t p-2 text-center text-sm italic">
                  "This is Computer generated Payslip. Signature not required."
                </div>
                
                {/* Signatures */}
                <div className="border-t grid grid-cols-2 p-4">
                  <div>Employee Signature:</div>
                  <div className="text-right">HR Signature:</div>
                </div>
              </div>
            </ScrollArea>
          )}
          
          <DialogFooter>
            <div className="flex gap-2 w-full justify-between">
              <Button variant="outline" onClick={() => setIsGenerateDialogOpen(false)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handlePrintSlip}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button onClick={handleDownloadSlip}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Custom Fields Dialog */}
      <Dialog open={isCustomDialogOpen} onOpenChange={setIsCustomDialogOpen}>
        <DialogContent className="max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Custom Fields</DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="h-[calc(90vh-180px)]">
            <div className="space-y-4 pr-4">
              <div>
                <Label>Earnings</Label>
                <div className="space-y-2 mt-2">
                  {customFields.earnings.map((field, index) => (
                    <div key={`earning-field-${index}`} className="flex items-center gap-2">
                      <Input value={field} readOnly />
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => setCustomFields({
                          ...customFields,
                          earnings: customFields.earnings.filter((_, i) => i !== index)
                        })}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-2">
                    <Input 
                      placeholder="New Earning Field"
                      id="newEarningField"
                    />
                    <Button 
                      size="sm"
                      onClick={() => {
                        const input = document.getElementById("newEarningField") as HTMLInputElement;
                        if (input.value) {
                          handleAddCustomField('earnings', input.value);
                          input.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Deductions</Label>
                <div className="space-y-2 mt-2">
                  {customFields.deductions.map((field, index) => (
                    <div key={`deduction-field-${index}`} className="flex items-center gap-2">
                      <Input value={field} readOnly />
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => setCustomFields({
                          ...customFields,
                          deductions: customFields.deductions.filter((_, i) => i !== index)
                        })}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-2">
                    <Input 
                      placeholder="New Deduction Field"
                      id="newDeductionField"
                    />
                    <Button 
                      size="sm"
                      onClick={() => {
                        const input = document.getElementById("newDeductionField") as HTMLInputElement;
                        if (input.value) {
                          handleAddCustomField('deductions', input.value);
                          input.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomDialogOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Hidden Print Template (without UI elements) */}
      <div className="hidden">
        <div ref={printRef}>
          {salarySlipData && (
            <div className="border rounded-md overflow-hidden print:shadow-none">
              {/* Company Header */}
              <div className="bg-indigo-900 text-white p-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="text-2xl font-bold">SUPRA PENS</div>
                  <div className="text-center md:text-right">
                    <div className="text-lg">GLOBAL WRITINGS</div>
                    <div className="text-xs">22, BRABOURNE ROAD, 3RD FLOOR, KOLKATA 70001, WEST BENGAL, INDIA</div>
                    <div className="text-xs">+91 33 2221 8538/ 2234 3007</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-900 text-white py-1 text-center">
                <h2 className="text-lg font-medium">Salary Slip</h2>
              </div>
              
              {/* Employee Details */}
              <div className="p-0">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>Employee Name:</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd" }}>{salarySlipData.employeeName}</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>Month</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd" }}>{salarySlipData.month}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>Employee PAN No:</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd" }}>{salarySlipData.employeePAN}</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>Year</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd" }}>{salarySlipData.year}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>Employee ID:</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd" }}>{salarySlipData.employeeId}</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>Designation</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd" }}>{salarySlipData.designation}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>D.O.J.:</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd" }}>{salarySlipData.doj}</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>Working Days</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd" }}>{salarySlipData.workingDays}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>UAN NO:</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd" }}>{salarySlipData.uan}</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>Unpaid Leave</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd" }}>{salarySlipData.unpaidLeave}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>ESIC NO:</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd" }}>{salarySlipData.esic}</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>Paid Days</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd" }}>{salarySlipData.paidDays}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ borderTop: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                  <div style={{ backgroundColor: "#312e81", color: "white", padding: "8px", textAlign: "center" }}>Earnings</div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ padding: "5px", border: "1px solid #ddd", textAlign: "left" }}>Description</th>
                        <th style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>Rate</th>
                        <th style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>Earned</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: "5px", border: "1px solid #ddd" }}>Basic Pay</td>
                        <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>{salarySlipData.earnings.basicPay}</td>
                        <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>{salarySlipData.earnings.basicPay}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "5px", border: "1px solid #ddd" }}>House Rent Allowance</td>
                        <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>{salarySlipData.earnings.houseRentAllowance}</td>
                        <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>{salarySlipData.earnings.houseRentAllowance}</td>
                      </tr>
                      {customFields.earnings.map((field, index) => (
                        <tr key={`print-earning-${index}`}>
                          <td style={{ padding: "5px", border: "1px solid #ddd" }}>{field}</td>
                          <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>0</td>
                          <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>0</td>
                        </tr>
                      ))}
                      {customFields.earnings.length === 0 && Array.from({ length: 2 }).map((_, i) => (
                        <tr key={`print-empty-earning-${i}`}>
                          <td style={{ padding: "5px", border: "1px solid #ddd" }}>&nbsp;</td>
                          <td style={{ padding: "5px", border: "1px solid #ddd" }}>&nbsp;</td>
                          <td style={{ padding: "5px", border: "1px solid #ddd" }}>&nbsp;</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div style={{ borderTop: "1px solid #ddd" }}>
                  <div style={{ backgroundColor: "#312e81", color: "white", padding: "8px", textAlign: "center" }}>Deductions</div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ padding: "5px", border: "1px solid #ddd", textAlign: "left" }}>Description</th>
                        <th style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: "5px", border: "1px solid #ddd" }}>Provident Fund</td>
                        <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>{salarySlipData.deductions.providentFund}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "5px", border: "1px solid #ddd" }}>ESI</td>
                        <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>{salarySlipData.deductions.esi}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "5px", border: "1px solid #ddd" }}>P Tax</td>
                        <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>{salarySlipData.deductions.tax}</td>
                      </tr>
                      <tr>
                        <td style={{ padding: "5px", border: "1px solid #ddd" }}>TDS</td>
                        <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>{salarySlipData.deductions.tds}</td>
                      </tr>
                      {customFields.deductions.map((field, index) => (
                        <tr key={`print-deduction-${index}`}>
                          <td style={{ padding: "5px", border: "1px solid #ddd" }}>{field}</td>
                          <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>0</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid #ddd" }}>
                <div style={{ borderRight: "1px solid #ddd" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>Total Earnings</td>
                        <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>{salarySlipData.totalEarnings}</td>
                        <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>{salarySlipData.totalEarnings}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>Total Deduction</td>
                        <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>{salarySlipData.totalDeduction}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div style={{ borderTop: "1px solid #ddd" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: "5px", border: "1px solid #ddd", fontWeight: "500" }}>Net Pay</td>
                      <td style={{ padding: "5px", border: "1px solid #ddd", textAlign: "right" }}>{salarySlipData.netPay}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div style={{ borderTop: "1px solid #ddd", padding: "8px", textAlign: "center", fontSize: "0.875rem", fontStyle: "italic" }}>
                "This is Computer generated Payslip. Signature not required."
              </div>
              
              <div style={{ borderTop: "1px solid #ddd", display: "grid", gridTemplateColumns: "1fr 1fr", padding: "16px" }}>
                <div>Employee Signature:</div>
                <div style={{ textAlign: "right" }}>HR Signature:</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayslipGenerator;

