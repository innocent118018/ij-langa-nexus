import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function NameReservation() {
  return (
    <ServicePageTemplate
      title="Name Reservation"
      code="COR9.1"
      category="secretarial"
      subcategory="Companies: Formation and Amendments"
      description="Reserve your company name with CIPC to secure your business identity before incorporation."
      price={250}
      processingTime="2-3 Working Days"
      requirements={[
        "Proposed company names (3 options)",
        "Alternative name suggestions",
        "Company formation details"
      ]}
      features={[
        "CIPC submission and processing",
        "Name availability check",
        "Confirmation certificate",
        "Professional consultation"
      ]}
      metaDescription="Reserve your company name with CIPC. Professional name reservation services in South Africa. Secure your business identity today."
    />
  );
}