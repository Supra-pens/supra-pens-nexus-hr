
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PayrollTable from "@/components/payroll/PayrollTable";
import SalaryStructure from "@/components/payroll/SalaryStructure";
import PayslipGenerator from "@/components/payroll/PayslipGenerator";

const Payroll = () => {
  const [activeTab, setActiveTab] = useState("payslips");

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Payroll Management</h1>
      <p className="text-muted-foreground">
        Manage employee salaries, generate payroll, and view previous payroll records.
      </p>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Payroll Management System</CardTitle>
          <CardDescription>
            View and manage employee payroll information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="monthly">Monthly Payroll</TabsTrigger>
              <TabsTrigger value="structure">Salary Structure</TabsTrigger>
              <TabsTrigger value="payslips">Payslips</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly" className="mt-4">
              <PayrollTable />
            </TabsContent>
            <TabsContent value="structure" className="mt-4">
              <SalaryStructure />
            </TabsContent>
            <TabsContent value="payslips" className="mt-4">
              <PayslipGenerator />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payroll;

