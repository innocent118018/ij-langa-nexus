import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function AccountingOfficersCertificate() {
  return (
    <ServicePageTemplate
      title="Accounting Officers Certificate for Confirmation of Earnings"
      category="bookkeeping"
      subcategory="Professional Services"
      description="Professional accounting officers certificate for earnings confirmation and financial verification purposes."
      price={1000}
      processingTime="3-5 Working Days"
      requirements={[
        "Financial records",
        "Income statements",
        "Supporting documentation",
        "Business registration details"
      ]}
      features={[
        "Professional certification",
        "Earnings verification",
        "Financial analysis",
        "Compliance assurance",
        "Official documentation"
      ]}
      metaDescription="Professional accounting officers certificate services. Expert earnings confirmation and financial verification."
    />
  );
}