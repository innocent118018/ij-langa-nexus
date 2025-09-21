import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function MemorandumOfIncorporation() {
  return (
    <ServicePageTemplate
      title="Memorandum of Incorporation (MOI)"
      code="COR15.1"
      category="secretarial"
      subcategory="Companies: Formation and Amendments"
      description="Complete MOI preparation and submission for your company formation with full legal compliance."
      price={1250}
      processingTime="5-10 Working Days"
      requirements={[
        "Company details and structure",
        "Shareholder information",
        "Director appointments",
        "Business activity description"
      ]}
      features={[
        "Professional MOI drafting",
        "CIPC submission and processing",
        "Legal compliance verification",
        "Share structure setup",
        "Constitutional document preparation"
      ]}
      metaDescription="Professional Memorandum of Incorporation (MOI) services. Expert company formation documentation for South African businesses."
    />
  );
}