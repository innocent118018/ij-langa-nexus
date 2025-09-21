import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function CompanyDeregistration() {
  return (
    <ServicePageTemplate
      title="Company Deregistration Services"
      code="DEREG001"
      category="secretarial"
      subcategory="Deregistration Services"
      description="Complete company deregistration services for dormant and trading companies with full compliance."
      price={1500}
      processingTime="15-30 Working Days"
      requirements={[
        "Company financial statements",
        "Tax clearance certificates",
        "Board resolutions",
        "Liquidation documents"
      ]}
      features={[
        "CIPC deregistration",
        "SARS tax clearance",
        "Creditor notifications",
        "Legal compliance",
        "Final documentation"
      ]}
      metaDescription="Professional company deregistration services. Complete closure process for South African companies with full compliance."
    />
  );
}