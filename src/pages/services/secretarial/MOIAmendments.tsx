import React from 'react';
import { ServicePageTemplate } from '@/components/services/ServicePageTemplate';

export default function MOIAmendments() {
  return (
    <ServicePageTemplate
      title="Notice of Amendments of Memorandum of Incorporation"
      code="COR15.2"
      category="secretarial"
      subcategory="Companies: Formation and Amendments"
      description="Professional MOI amendment services with board resolutions for company structure changes."
      price={750}
      processingTime="5-7 Working Days"
      requirements={[
        "Board resolution",
        "Proposed amendments",
        "Current MOI",
        "Company registration details"
      ]}
      features={[
        "Amendment drafting",
        "Resolution preparation",
        "CIPC submission",
        "Legal compliance verification"
      ]}
      metaDescription="Professional MOI amendment services. Expert memorandum of incorporation changes with CIPC compliance."
    />
  );
}