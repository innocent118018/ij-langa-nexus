import React from 'react';
import ServiceTemplate from '../ServiceTemplate';
import { Building, CheckCircle, Clock } from 'lucide-react';

const CompanyRegistrations = () => {
  return (
    <ServiceTemplate
      serviceName="Company Registrations"
      category="Secretarial Services"
      description="Complete company registration services including name reservation and MOI preparation"
      price={1250}
      unit="Plus CIPC fees"
      turnaround="5-10 Working Days"
      icon={<Building className="h-6 w-6 text-primary" />}
      features={[
        "Name reservation (COR9.1)",
        "Memorandum of Incorporation preparation",
        "CIPC registration",
        "Share certificates",
        "Company register setup",
        "Registration certificate"
      ]}
      requirements={[
        "Proposed company name",
        "Director details and ID copies",
        "Registered address",
        "Share structure details"
      ]}
    />
  );
};

export default CompanyRegistrations;