export interface SecretarialProduct {
  id: string;
  code: string;
  name: string;
  price?: number;
  category: string;
  description?: string;
  processing_time?: string;
  requirements?: string[];
  features?: string[];
}

export const secretarialProducts: SecretarialProduct[] = [
  // COMPANIES: FORMATION AND AMENDMENTS
  {
    id: "cor9-1",
    code: "COR9.1",
    name: "Name Reservation (R50/R75m)",
    price: 250,
    category: "secretarial",
    description: "Reserve your company name with CIPC",
    processing_time: "2-3 Working Days",
    requirements: ["Proposed company names (3 options)", "Alternative name suggestions"],
    features: ["CIPC submission", "Name availability check", "Confirmation certificate"]
  },
  {
    id: "cor9-2",
    code: "COR9.2", 
    name: "Application to extend name reservation (R30e/R50m)",
    price: 500,
    category: "secretarial",
    description: "Extend your reserved company name period",
    processing_time: "2-3 Working Days"
  },
  {
    id: "cor9-3",
    code: "COR9.3",
    name: "Notice of requiring further particulars, issued by the Commission",
    category: "secretarial",
    description: "Response to CIPC request for additional information"
  },
  {
    id: "cor9-4",
    code: "COR9.4",
    name: "Notice confirming name reservation",
    category: "secretarial",
    description: "Confirmation of successful name reservation"
  },
  {
    id: "cor9-5",
    code: "COR9.5",
    name: "Notice Refusing name reservation",
    price: 50,
    category: "secretarial",
    description: "Handle refused name reservation appeals"
  },
  {
    id: "cor9-6",
    code: "COR9.6",
    name: "Notice of potentially contested name",
    price: 50,
    category: "secretarial",
    description: "Address contested name issues"
  },
  {
    id: "cor9-7",
    code: "COR9.7",
    name: "Notice of potentially offensive name",
    price: 50,
    category: "secretarial",
    description: "Handle offensive name notifications"
  },
  {
    id: "cor10-1",
    code: "COR10.1",
    name: "Application for defensive name (R200e/R250m)",
    price: 500,
    category: "secretarial",
    description: "Protect your brand with defensive name registration"
  },
  {
    id: "cor10-2",
    code: "COR10.2",
    name: "Application to renew defensive name (R30e/R50m)",
    price: 700,
    category: "secretarial",
    description: "Renew existing defensive name registration"
  },
  {
    id: "cor11-1",
    code: "COR11.1",
    name: "Application to transfer a reserved or registered name (R50e/R75m)",
    category: "secretarial",
    description: "Transfer name ownership to another entity"
  },
  {
    id: "cor12-1",
    code: "COR12.1",
    name: "Show cause notice issued by the commission related to abuse of name reservation system",
    category: "secretarial",
    description: "Response to name reservation abuse notices"
  },
  {
    id: "cor14-1",
    code: "COR14,1A-E",
    name: "Notice of Incorporation",
    category: "secretarial",
    description: "CIPC incorporation notice processing"
  },
  {
    id: "cor14-2",
    code: "COR14.2",
    name: "Notice rejecting notice of incorporation, issued by the commission",
    category: "secretarial",
    description: "Handle incorporation rejection appeals"
  },
  {
    id: "cor14-3",
    code: "COR14.3",
    name: "Registration Certificate",
    price: 50,
    category: "secretarial",
    description: "Obtain official company registration certificate"
  },
  {
    id: "cor15-1",
    code: "COR15.1 A-E",
    name: "Memorandum of Incorporation (MOI) (R175e/R475m)",
    price: 1250,
    category: "secretarial",
    description: "Complete MOI preparation and submission",
    processing_time: "5-10 Working Days",
    features: ["MOI drafting", "CIPC submission", "Legal compliance", "Share structure setup"]
  },
  {
    id: "cor15-2",
    code: "COR15.2",
    name: "Notice of amendments of Memorandum of Incorporation and resolution (R250)",
    price: 750,
    category: "secretarial",
    description: "Amend existing MOI with resolutions"
  },
  {
    id: "cor15-3",
    code: "COR15.3",
    name: "Notice of alteration of MOI (R250)",
    price: 650,
    category: "secretarial",
    description: "Alter MOI provisions"
  },
  {
    id: "cor15-4",
    code: "COR15.4",
    name: "Notice of translation of MOI (R250)",
    price: 650,
    category: "secretarial",
    description: "Translate MOI to required languages"
  },
  {
    id: "cor15-5",
    code: "COR15.5",
    name: "Notice of consolidation of MOI (R250)",
    price: 650,
    category: "secretarial",
    description: "Consolidate multiple MOI amendments"
  },
  {
    id: "cor15-6",
    code: "COR15.6",
    name: "Notice to consolidate the MOI",
    price: 650,
    category: "secretarial",
    description: "Initiate MOI consolidation process"
  },
  {
    id: "cor16-1",
    code: "COR16.1",
    name: "Notice of change of Financial Year End (R100)",
    price: 650,
    category: "secretarial",
    description: "Change company financial year end"
  },
  {
    id: "cor16-2",
    code: "COR16.2",
    name: "Notice of result of rule of ratification vote (R100)",
    price: 500,
    category: "secretarial",
    description: "Submit ratification vote results"
  },
  {
    id: "cor17-1",
    code: "COR17.1",
    name: "Application of foreign company to transfer registration to the republic (R400)",
    price: 2500,
    category: "secretarial",
    description: "Transfer foreign company registration to SA"
  },
  {
    id: "cor17-2",
    code: "COR17.2",
    name: "Notice requiring further information",
    price: 550,
    category: "secretarial",
    description: "Respond to information requests"
  },
  {
    id: "cor17-3",
    code: "COR17.3",
    name: "Registration Certificate",
    price: 1200,
    category: "secretarial",
    description: "Foreign company registration certificate"
  },
  {
    id: "cor18-1",
    code: "COR18.1",
    name: "Notice of conversion of a close corporation (R100.00)",
    price: 850,
    category: "secretarial",
    description: "Convert CC to company"
  },
  {
    id: "cor39",
    code: "CoR 39",
    name: "Notice of change concerning a director and resolution",
    price: 850,
    category: "secretarial",
    description: "Director appointment or resignation",
    processing_time: "7-14 Working Days",
    features: ["Director changes", "CIPC submission", "Resolution drafting", "COR39 form completion"]
  }
];

// Add remaining products here - continuing the pattern for all products listed by the user
export const additionalSecretarialProducts: SecretarialProduct[] = [
  {
    id: "company-register",
    code: "REG001",
    name: "Company Register - New and Populate and Minute Register",
    price: 650,
    category: "secretarial",
    description: "Setup and maintain company registers"
  },
  {
    id: "update-register",
    code: "REG002", 
    name: "Update Company Register per Category",
    price: 350,
    category: "secretarial",
    description: "Update specific register categories"
  },
  {
    id: "share-certificates",
    code: "REG003",
    name: "Issue Share Certificates per Shareholder",
    price: 500,
    category: "secretarial",
    description: "Issue official share certificates"
  },
  {
    id: "resolution",
    code: "REG004",
    name: "Resolution Shareholders/Directors",
    price: 475,
    category: "secretarial",
    description: "Draft shareholder and director resolutions"
  },
  {
    id: "confirmation-cert",
    code: "REG005",
    name: "Confirmation Certificates from CIPC",
    price: 200,
    category: "secretarial",
    description: "Obtain CIPC confirmation certificates"
  },
  {
    id: "power-attorney",
    code: "REG006",
    name: "Power of Attorney - Directors",
    price: 350,
    category: "secretarial",
    description: "Prepare director power of attorney documents"
  }
];

export const allSecretarialProducts = [...secretarialProducts, ...additionalSecretarialProducts];