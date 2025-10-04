import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function EmployerRegistration() {
  return (
    <ServicePageTemplate
      title="Registration of an Employer - Employer Tax, Skills Development Levy and UIF"
      code="EMP101"
      category="payroll"
      subcategory="Employees Tax"
      description="Complete employer registration with SARS for tax compliance, including PAYE, SDL, and UIF registration."
      price={1850}
      processingTime="10-15 Working Days"
      requirements={[
        "Company registration documents",
        "Banking details",
        "Business address",
        "Expected employee numbers"
      ]}
      features={[
        "PAYE registration",
        "Skills Development Levy setup",
        "UIF employer registration",
        "SARS compliance setup",
        "Ongoing support and guidance"
      ]}
      metaDescription="Professional employer registration services with SARS. Complete PAYE, SDL, and UIF registration for South African employers."
    />
  );
}