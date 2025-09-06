import React from 'react';
import ServiceTemplate from '../ServiceTemplate';
import { Users, DollarSign, Calculator } from 'lucide-react';

const PayrollAdministration = () => {
  return (
    <ServiceTemplate
      serviceName="Payroll Administration Services"
      category="HR & Payroll Services"
      description="Complete payroll processing and administration services"
      price={450}
      unit="Per Employee (1-10)"
      turnaround="Monthly Service"
      icon={<Users className="h-6 w-6 text-primary" />}
      features={[
        "Monthly payroll processing",
        "Salary calculations and deductions",
        "Payslip generation",
        "PAYE, UIF, SDL calculations",
        "Banking file preparation",
        "Leave management"
      ]}
      requirements={[
        "Employee contracts and details",
        "Timesheet or attendance records",
        "Banking details",
        "Leave applications and approvals"
      ]}
    />
  );
};

export default PayrollAdministration;