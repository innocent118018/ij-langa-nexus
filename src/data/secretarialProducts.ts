export interface SecretarialProduct {
  id: string;
  code: string;
  name: string;
  price?: number;
  category: string;
  subcategory?: string;
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
    subcategory: "Companies: Formation and Amendments",
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
    subcategory: "Companies: Formation and Amendments",
    description: "Extend your reserved company name period",
    processing_time: "2-3 Working Days"
  },
  {
    id: "cor9-3",
    code: "COR9.3",
    name: "Notice of requiring further particulars, issued by the Commission",
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Response to CIPC request for additional information"
  },
  {
    id: "cor9-4",
    code: "COR9.4",
    name: "Notice confirming name reservation",
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Confirmation of successful name reservation"
  },
  {
    id: "cor9-5",
    code: "COR9.5",
    name: "Notice Refusing name reservation",
    price: 50,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Handle refused name reservation appeals"
  },
  {
    id: "cor9-6",
    code: "COR9.6",
    name: "Notice of potentially contested name",
    price: 50,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Address contested name issues"
  },
  {
    id: "cor9-7",
    code: "COR9.7",
    name: "Notice of potentially offensive name",
    price: 50,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Handle offensive name notifications"
  },
  {
    id: "cor10-1",
    code: "COR10.1",
    name: "Application for defensive name (R200e/R250m)",
    price: 500,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Protect your brand with defensive name registration"
  },
  {
    id: "cor10-2",
    code: "COR10.2",
    name: "Application to renew defensive name (R30e/R50m)",
    price: 700,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Renew existing defensive name registration"
  },
  {
    id: "cor11-1",
    code: "COR11.1",
    name: "Application to transfer a reserved or registered name (R50e/R75m)",
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Transfer name ownership to another entity"
  },
  {
    id: "cor12-1",
    code: "COR12.1",
    name: "Show cause notice issued by the commission related to abuse of name reservation system",
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Response to name reservation abuse notices"
  },
  {
    id: "cor14-1",
    code: "COR14,1A-E",
    name: "Notice of Incorporation",
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "CIPC incorporation notice processing"
  },
  {
    id: "cor14-2",
    code: "COR14.2",
    name: "Notice rejecting notice of incorporation, issued by the commission",
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Handle incorporation rejection appeals"
  },
  {
    id: "cor14-3",
    code: "COR14.3",
    name: "Registration Certificate",
    price: 50,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Obtain official company registration certificate"
  },
  {
    id: "cor15-1",
    code: "COR15.1 A-E",
    name: "Memorandum of Incorporation (MOI) (R175e/R475m)",
    price: 1250,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
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
    subcategory: "Companies: Formation and Amendments",
    description: "Amend existing MOI with resolutions"
  },
  {
    id: "cor15-3",
    code: "COR15.3",
    name: "Notice of alteration of MOI (R250)",
    price: 650,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Alter MOI provisions"
  },
  {
    id: "cor15-4",
    code: "COR15.4",
    name: "Notice of translation of MOI (R250)",
    price: 650,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Translate MOI to required languages"
  },
  {
    id: "cor15-5",
    code: "COR15.5",
    name: "Notice of consolidation of MOI (R250)",
    price: 650,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Consolidate multiple MOI amendments"
  },
  {
    id: "cor15-6",
    code: "COR15.6",
    name: "Notice to consolidate the MOI",
    price: 650,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Initiate MOI consolidation process"
  },
  {
    id: "cor16-1",
    code: "COR16.1",
    name: "Notice of change of Financial Year End (R100)",
    price: 650,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Change company financial year end"
  },
  {
    id: "cor16-2",
    code: "COR16.2",
    name: "Notice of result of rule of ratification vote (R100)",
    price: 500,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Submit ratification vote results"
  },
  {
    id: "cor17-1",
    code: "COR17.1",
    name: "Application of foreign company to transfer registration to the republic (R400)",
    price: 2500,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Transfer foreign company registration to SA"
  },
  {
    id: "cor17-2",
    code: "COR17.2",
    name: "Notice requiring further information",
    price: 550,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Respond to information requests"
  },
  {
    id: "cor17-3",
    code: "COR17.3",
    name: "Registration Certificate",
    price: 1200,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Foreign company registration certificate"
  },
  {
    id: "cor18-1",
    code: "COR18.1",
    name: "Notice of conversion of a close corporation (R100.00)",
    price: 850,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Convert CC to company"
  },
  {
    id: "cor18-2",
    code: "CoR 18.2",
    name: "Notice requiring further particulars",
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "CIPC further particulars notice"
  },
  {
    id: "cor18-3",
    code: "CoR 18.3",
    name: "Registration certificate",
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "CIPC registration certificate"
  },
  {
    id: "cor19-1",
    code: "CoR 19.1",
    name: "Show cause notice, to be issued by Commission concerning reckless or insolvent trading",
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "CIPC show cause notice response"
  },
  {
    id: "cor19-2",
    code: "CoR 19.2",
    name: "Notice accepting information",
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "CIPC information acceptance notice"
  },
  {
    id: "cor20-1",
    code: "CoR 20.1",
    name: "External company (R400)",
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "CIPC external company registration"
  },
  {
    id: "cor25",
    code: "CoR 25",
    name: "Notice of change of financial year end (R100)",
    price: 750,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Financial year end change notice"
  },
  {
    id: "cor31",
    code: "CoR 31",
    name: "Notice of board resolution to convert par value shares",
    price: 750,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Par value share conversion resolution"
  },
  {
    id: "cor35-1",
    code: "CoR 35.1",
    name: "Notice of pre-incorporation contract",
    price: 650,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Pre-incorporation contract notice"
  },
  {
    id: "cor35-2",
    code: "CoR 35.2",
    name: "Notice of decision relating to a pre-incorporation contract",
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "CIPC pre-incorporation contract decision"
  },
  {
    id: "cor36-1",
    code: "CoR 36.1",
    name: "Standard form notice to companies by holders of securities",
    price: 250,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Securities holder notice form"
  },
  {
    id: "cor36-2",
    code: "CoR 36.2",
    name: "Standard form notice by company to holders of securities",
    price: 250,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Company to securities holder notice"
  },
  {
    id: "cor36-3",
    code: "CoR 36.3",
    name: "Notice to beneficial interest holders",
    price: 250,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Beneficial interest holder notice"
  },
  {
    id: "cor36-4",
    code: "CoR 36.4",
    name: "Standard form notice to company by director of personal financial interest",
    price: 250,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Director financial interest disclosure"
  },
  {
    id: "cor39",
    code: "CoR 39",
    name: "Notice of change concerning a director and resolution",
    price: 850,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Director appointment or resignation",
    processing_time: "7-14 Working Days",
    features: ["Director changes", "CIPC submission", "Resolution drafting", "COR39 form completion"]
  },
  {
    id: "cor40-1",
    code: "CoR 40.1",
    name: "Notice of resolution to wind up solvent company (R250)",
    price: 1000,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Solvent company winding up resolution"
  },
  {
    id: "cor40-2",
    code: "CoR 40.2",
    name: "Notice of transfer of company registration to foreign jurisdiction (R250)",
    price: 1200,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Transfer registration to foreign jurisdiction"
  },
  {
    id: "cor40-3",
    code: "CoR 40.3",
    name: "Demand letter to inactive company",
    price: 750,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Inactive company demand letter"
  },
  {
    id: "cor40-4",
    code: "CoR 40.4",
    name: "Commission notice of pending de-registration",
    price: 250,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "De-registration notice processing"
  },
  {
    id: "cor40-5",
    code: "CoR 40.5",
    name: "Application for re-instatement of de-registered company (R200)",
    price: 1000,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Re-instatement of de-registered company"
  },
  {
    id: "cor44",
    code: "CoR 44",
    name: "Company notice of required appointment and resolution (CM31) - Auditor/Independent Professional Accountant",
    price: 750,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Auditor/accountant appointment notice"
  },
  // Continue with business rescue and other COR forms...
  {
    id: "cor123-1",
    code: "CoR 123.1",
    name: "Notice of start of business rescue proceedings",
    price: 750,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Business rescue commencement notice"
  },
  {
    id: "cor123-2",
    code: "CoR 123.2",
    name: "Notice of appointment of practitioner (R80)",
    price: 650,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Business rescue practitioner appointment"
  },
  {
    id: "cor123-3",
    code: "CoR 123.3",
    name: "Notice to not commence business rescue proceedings",
    price: 650,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Notice not to commence business rescue"
  },
  {
    id: "cor125-1",
    code: "CoR 125.1",
    name: "Notice concerning status of business rescue proceedings",
    price: 650,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Business rescue status notice"
  },
  {
    id: "cor125-2",
    code: "CoR 125.2",
    name: "Notice of termination of business rescue proceedings",
    price: 750,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Business rescue termination notice"
  },
  {
    id: "cor125-3",
    code: "CoR 125.3",
    name: "Notice of substantial implementation of a business rescue plan",
    price: 650,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Business rescue plan implementation notice"
  },
  {
    id: "cor126-1",
    code: "CoR 126.1",
    name: "Application of license as a business rescue practitioner",
    price: 1500,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Business rescue practitioner license application"
  },
  {
    id: "cor178",
    code: "CoR 178",
    name: "Request for particulars regarding requested exemption",
    price: 750,
    category: "secretarial",
    subcategory: "Companies: Formation and Amendments",
    description: "Exemption particulars request"
  },
  // Company administration services
  {
    id: "company-register-new",
    code: "REG001",
    name: "Company Register - New and Populate and Minute Register",
    price: 650,
    category: "secretarial",
    subcategory: "Company Administration",
    description: "Setup and maintain company registers"
  },
  {
    id: "update-register",
    code: "REG002", 
    name: "Update Company Register per Category",
    price: 350,
    category: "secretarial",
    subcategory: "Company Administration",
    description: "Update specific register categories"
  },
  {
    id: "share-certificates",
    code: "REG003",
    name: "Issue Share Certificates per Shareholder",
    price: 500,
    category: "secretarial",
    subcategory: "Company Administration",
    description: "Issue official share certificates"
  },
  {
    id: "resolution-shareholders",
    code: "REG004",
    name: "Resolution Shareholders/Directors",
    price: 475,
    category: "secretarial",
    subcategory: "Company Administration",
    description: "Draft shareholder and director resolutions"
  },
  {
    id: "confirmation-cert",
    code: "REG005",
    name: "Confirmation Certificates from CIPC",
    price: 200,
    category: "secretarial",
    subcategory: "Company Administration",
    description: "Obtain CIPC confirmation certificates"
  },
  {
    id: "power-attorney",
    code: "REG006",
    name: "Power of Attorney - Directors",
    price: 350,
    category: "secretarial",
    subcategory: "Company Administration",
    description: "Prepare director power of attorney documents"
  },
  // Deregistration services
  {
    id: "dereg-dormant",
    code: "DEREG001",
    name: "Deregistration: Dormant Company (Approx costs)",
    price: 1500,
    category: "secretarial",
    subcategory: "Deregistration Services",
    description: "Complete deregistration of dormant company"
  },
  {
    id: "dereg-trading",
    code: "DEREG002",
    name: "Deregistration: Trading Company (Approx costs)",
    price: 2200,
    category: "secretarial",
    subcategory: "Deregistration Services",
    description: "Complete deregistration of trading company"
  },
  {
    id: "dereg-cc",
    code: "DEREG003",
    name: "Deregistration: Close Corporation (Approx costs)",
    price: 800,
    category: "secretarial",
    subcategory: "Deregistration Services",
    description: "Complete deregistration of close corporation"
  },
  {
    id: "dereg-it77",
    code: "DEREG004",
    name: "IT77 Deregistration (Approx costs)",
    price: 375,
    category: "secretarial",
    subcategory: "Deregistration Services",
    description: "IT77 tax deregistration services"
  },
  // Priority services
  {
    id: "priority-urgent",
    code: "URGENT001",
    name: "Priority Fee for Urgent Lodgements with CIPC/SARS",
    price: 1300,
    category: "secretarial",
    subcategory: "Priority Services",
    description: "Expedited processing for urgent submissions"
  }
];

export const allSecretarialProducts = secretarialProducts;