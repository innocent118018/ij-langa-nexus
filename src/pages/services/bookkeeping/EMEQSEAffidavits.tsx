import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function EMEQSEAffidavits() {
  return (
    <ServicePageTemplate
      title="EME/QSE Affidavits"
      category="bookkeeping"
      subcategory="BBBEE Services"
      description="Professional preparation of Exempt Micro Enterprise and Qualifying Small Enterprise affidavits for BBBEE compliance."
      price={500}
      processingTime="2-3 Working Days"
      requirements={[
        "Annual turnover records",
        "Company registration documents",
        "Financial statements",
        "Ownership details"
      ]}
      features={[
        "EME/QSE status verification",
        "Affidavit preparation",
        "BBBEE compliance",
        "Legal documentation",
        "Professional certification"
      ]}
      metaDescription="Professional EME/QSE affidavit services. Expert BBBEE compliance and small enterprise certification."
    />
  );
}