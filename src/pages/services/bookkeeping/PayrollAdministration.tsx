import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function PayrollAdministration() {
  return (
    <ServicePageTemplate
      title="Payroll Administration"
      category="bookkeeping"
      subcategory="Human Resources and Related Services"
      description="Comprehensive payroll administration services for businesses of all sizes, ensuring compliance and accuracy."
      price={450}
      processingTime="Monthly Service"
      requirements={[
        "Employee details",
        "Banking information",
        "Tax registration details",
        "Leave and attendance records"
      ]}
      features={[
        "Monthly payroll processing",
        "Payslip generation",
        "PAYE and UIF calculations",
        "SARS compliance",
        "Detailed reporting"
      ]}
      metaDescription="Professional payroll administration services. Comprehensive monthly payroll processing for South African businesses."
    />
  );
}