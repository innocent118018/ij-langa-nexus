export interface ServiceData {
  code: string;
  name: string;
  description: string;
  price?: number;
  unit?: string;
  category: string;
  subcategory?: string;
  popular?: boolean;
  icon?: string;
}

export const allServices: ServiceData[] = [
  // PROFESSIONAL FEES
  {
    code: "CONSULTATION",
    name: "Consultation",
    description: "Professional consultation services for business and tax matters",
    price: 1500,
    unit: "PER HOUR",
    category: "professional-fees",
    icon: "MessageCircle"
  },
  {
    code: "PARTNERS",
    name: "Partners",
    description: "Partner-level consultation for complex matters",
    price: 1000,
    unit: "PER HOUR",
    category: "professional-fees",
    icon: "Users"
  },
  {
    code: "ACCOUNTING-OFFICERS",
    name: "Accounting Officers/Tax Consultants",
    description: "Specialist accounting and tax consultation services",
    price: 650,
    unit: "PER HOUR",
    category: "professional-fees",
    icon: "Calculator"
  },

  // INDIVIDUAL TAXATION
  {
    code: "NOO",
    name: "Notice of Objection",
    description: "File objection to SARS assessment or decision",
    price: 750,
    category: "individual-taxation",
    icon: "AlertCircle"
  },
  {
    code: "NOD",
    name: "Notice of Correction",
    description: "Request correction of SARS records or assessment",
    price: 875,
    category: "individual-taxation",
    icon: "Edit"
  },
  {
    code: "NOA",
    name: "Notice of Appeal to SARS",
    description: "Appeal SARS decision to Tax Court",
    price: 1250,
    category: "individual-taxation",
    icon: "Scale"
  },
  {
    code: "ITR12-BASIC",
    name: "Return of Income/Tax Returns: Salary Case (Under 250,000)",
    description: "Basic individual tax return for salary earners",
    price: 500,
    category: "individual-taxation",
    popular: true,
    icon: "FileText"
  },
  {
    code: "ITR12-ALLOWANCES",
    name: "Return of Income/Tax Returns: Salary Case (Allowance and deductions)",
    description: "Individual tax return with allowances and deductions",
    price: 1750,
    category: "individual-taxation",
    icon: "Receipt"
  },
  {
    code: "ITR12-DIRECTORS",
    name: "Return of Income/Tax Returns: Salary Case (Directors/Members/Sole Trader)",
    description: "Tax return for directors, members, and sole traders",
    price: 1750,
    unit: "TS",
    category: "individual-taxation",
    icon: "Briefcase"
  },
  {
    code: "SAD",
    name: "Submission of Review/Audit Documents",
    description: "Submit required documents for SARS audit or review",
    price: 500,
    unit: "TS",
    category: "individual-taxation",
    icon: "Upload"
  },
  {
    code: "SAL",
    name: "Prepare Statement of Liabilities, Reconcile Schedule Income Statements",
    description: "Prepare comprehensive liability statements and income reconciliation",
    price: 850,
    unit: "2000 RANGE",
    category: "individual-taxation",
    icon: "BarChart"
  },
  {
    code: "TLOG",
    name: "Compilation of Travel Logbook",
    description: "Prepare and compile travel logbooks for tax purposes",
    price: 1000,
    unit: "2000 RANGE",
    category: "individual-taxation",
    icon: "Map"
  },
  {
    code: "ANNX",
    name: "Prepare Annexure, Rental Schedule Income Statements",
    description: "Prepare rental income schedules and annexures",
    price: 1000,
    unit: "2000 RANGE",
    category: "individual-taxation",
    icon: "Home"
  },
  {
    code: "CGT",
    name: "Compilation of Capital Gain Tax",
    description: "Calculate and prepare capital gains tax submissions",
    price: 850,
    unit: "2000 RANGE",
    category: "individual-taxation",
    icon: "TrendingUp"
  },
  {
    code: "TAUDITS",
    name: "Tax Audits - Income Tax, PAYE, SDL, UIF, VAT, WHT",
    description: "Comprehensive tax audit support and representation",
    price: 650,
    unit: "1500/TS RANGE",
    category: "individual-taxation",
    icon: "Search"
  },

  // BUSINESS ENTITIES
  {
    code: "IT77",
    name: "Update of administration details with SARS",
    description: "Update company, CC, or individual details with SARS",
    price: 750,
    category: "business-entities",
    icon: "Settings"
  },
  {
    code: "IT77-LET",
    name: "Deregistration as a taxpayer",
    description: "Deregister individual, CC, PTY, or Trust from SARS",
    price: 1500,
    category: "business-entities",
    icon: "UserX"
  },
  {
    code: "ITR14-DORMANT",
    name: "Return of Income Tax - Dormant",
    description: "Income tax return for dormant companies",
    price: 500,
    category: "business-entities",
    icon: "Pause"
  },
  {
    code: "ITR14-MICRO",
    name: "Return of Income Tax - Under 1 Million (Micro)",
    description: "Income tax return for micro businesses",
    price: 1200,
    category: "business-entities",
    popular: true,
    icon: "Building2"
  },
  {
    code: "ITR14-SMALL",
    name: "Return of Income Tax - Under 14 Million (Small)",
    description: "Income tax return for small businesses",
    price: 1850,
    category: "business-entities",
    icon: "Building"
  },
  {
    code: "ITR14-LARGE",
    name: "Return of Income Tax - Over 15 Million (Med/Large)",
    description: "Income tax return for medium and large businesses",
    price: 2450,
    category: "business-entities",
    icon: "Factory"
  },
  {
    code: "IRP6-NON-TRADING",
    name: "Return of provisional tax (CC/Pty/Trust) Non Trading",
    description: "Provisional tax return for non-trading entities",
    price: 400,
    category: "business-entities",
    icon: "Clock"
  },
  {
    code: "IRP6-FIRST",
    name: "Return of provisional tax - 1st",
    description: "First provisional tax return for the year",
    price: 650,
    category: "business-entities",
    icon: "Calendar"
  },
  {
    code: "IRP6-SECOND",
    name: "Return of provisional tax - 2nd",
    description: "Second provisional tax return for the year",
    price: 1000,
    category: "business-entities",
    icon: "Calendar"
  },
  {
    code: "IRP6-ADDITIONAL",
    name: "Return of additional provisional tax",
    description: "Additional provisional tax return submission",
    price: 500,
    category: "business-entities",
    icon: "Plus"
  },
  {
    code: "IT12TR",
    name: "Return of Income (All Trust)",
    description: "Income tax return for trust entities",
    price: 1800,
    category: "business-entities",
    icon: "Shield"
  },
  {
    code: "IT12TRD",
    name: "Returns of Income (All trust Dormant)",
    description: "Income tax return for dormant trusts",
    price: 950,
    category: "business-entities",
    icon: "ShieldOff"
  },
  {
    code: "DTR02",
    name: "Return dividends Tax and Resolution",
    description: "Dividend tax return and resolution preparation",
    price: 950,
    category: "business-entities",
    icon: "Coins"
  },
  {
    code: "IT14SD",
    name: "Return for supplementary Declaration",
    description: "Supplementary declaration for income tax",
    price: 1250,
    unit: "TS",
    category: "business-entities",
    icon: "Fileplus"
  },
  {
    code: "TCS",
    name: "Tax Compliance Certificate (Good Standing, Tender)",
    description: "Obtain tax compliance status certificate",
    price: 950,
    unit: "TS",
    category: "business-entities",
    popular: true,
    icon: "Award"
  },
  {
    code: "IT96",
    name: "Arrangement for deferred payment of Income Tax",
    description: "Arrange payment plan for outstanding tax",
    price: 750,
    unit: "TS",
    category: "business-entities",
    icon: "CreditCard"
  },
  {
    code: "E-FILING",
    name: "eFiling Registration",
    description: "Register for SARS eFiling system",
    price: 250,
    category: "business-entities",
    icon: "Globe"
  },
  {
    code: "PAYMENT",
    name: "Payment of provisional Tax, Assessed Tax",
    description: "Process tax payments on behalf of client",
    price: 110,
    category: "business-entities",
    icon: "CreditCard"
  },

  // EMPLOYEES TAX
  {
    code: "EMP101",
    name: "Registration of an Employer - Employer Tax, Skills Development Levy and UIF",
    description: "Register as employer for PAYE, SDL, and UIF",
    price: 1850,
    category: "employees-tax",
    popular: true,
    icon: "UserPlus"
  },
  {
    code: "EMP123T",
    name: "Cancellation of Registration as Employer",
    description: "Cancel employer registration with SARS",
    price: 1200,
    category: "employees-tax",
    icon: "UserMinus"
  },
  {
    code: "IRP3",
    name: "Request for Tax Deduction Directive",
    description: "Request directive for tax deductions",
    price: 850,
    category: "employees-tax",
    icon: "FileText"
  },
  {
    code: "IRP5",
    name: "Employees Tax Certificates/General Information Returns and Computation",
    description: "Prepare IRP5 certificates and returns",
    price: 375,
    category: "employees-tax",
    icon: "FileCheck"
  },
  {
    code: "EMP501",
    name: "Employee's Tax Reconciliation",
    description: "Annual employee tax reconciliation",
    price: 750,
    category: "employees-tax",
    icon: "Calculator"
  },
  {
    code: "EMP201",
    name: "Employee's Tax/SDL and UIF Remittance Return",
    description: "Monthly PAYE, SDL, and UIF returns",
    price: 650,
    category: "employees-tax",
    popular: true,
    icon: "Calendar"
  },
  {
    code: "TADMIN",
    name: "Preparation of updating bank details/admin changes at SARS",
    description: "Update banking and administrative details",
    price: 375,
    category: "employees-tax",
    icon: "Settings"
  },
  {
    code: "EMPSA",
    name: "Payroll Taxes - Objection and Reconstruction",
    description: "Handle payroll tax objections and reconstructions",
    price: 850,
    category: "employees-tax",
    icon: "AlertTriangle"
  },

  // VAT
  {
    code: "VAT101",
    name: "VAT registration",
    description: "Register for Value Added Tax with SARS",
    price: 1500,
    category: "vat",
    popular: true,
    icon: "Percent"
  },
  {
    code: "VAT201",
    name: "VAT return",
    description: "Bi-monthly VAT return submission",
    price: 700,
    category: "vat",
    popular: true,
    icon: "FileText"
  },

  // UIF
  {
    code: "UF1",
    name: "UIF Registration - Ufiling",
    description: "Register for Unemployment Insurance Fund",
    price: 850,
    category: "uif",
    icon: "Shield"
  },
  {
    code: "UF2",
    name: "Monthly Return - UIF Declaration",
    description: "Monthly UIF declaration and return",
    price: 475,
    category: "uif",
    icon: "Calendar"
  },
  {
    code: "UF19",
    name: "Employer Contribution Return - (Per Month if non payroll client)",
    description: "Monthly employer UIF contribution return",
    price: 400,
    category: "uif",
    icon: "DollarSign"
  },

  // ACCOUNTING OFFICERS
  {
    code: "ACCOUNTING-CERT",
    name: "Accounting officers/Accountants certificate iro Confirmation of Earnings",
    description: "Certificate confirming earnings for various purposes",
    price: 1000,
    category: "accounting-certificates",
    icon: "Award"
  },
  {
    code: "EME-QSE",
    name: "EME/QSE Affidavits",
    description: "Exempt Micro Enterprise and Qualifying Small Enterprise affidavits",
    price: 500,
    category: "accounting-certificates",
    icon: "FileCheck"
  },

  // ANNUAL ADMIN FEES
  {
    code: "AAF1",
    name: "Main Trading Entity - Company/CC",
    description: "Annual administration fee for main trading entity",
    price: 650,
    category: "annual-admin",
    icon: "Building"
  },
  {
    code: "AAF2",
    name: "2nd Trading Entity - Company/CC",
    description: "Annual administration fee for second trading entity",
    price: 350,
    category: "annual-admin",
    icon: "Building2"
  },
  {
    code: "AAF3",
    name: "3rd Trading Entity - Company/CC/Trust/Partnership",
    description: "Annual administration fee for third trading entity",
    price: 250,
    category: "annual-admin",
    icon: "Buildings"
  },
  {
    code: "AAF4",
    name: "No Trading entity/property company/CC - Dormant at SARS",
    description: "Annual administration fee for dormant entities",
    price: 250,
    category: "annual-admin",
    icon: "Pause"
  },

  // PAYROLL ADMINISTRATION
  {
    code: "PAYROLL-1-10",
    name: "Payroll Administration (1-10 employees)",
    description: "Complete payroll services for 1-10 employees",
    price: 450,
    unit: "PER EMPLOYEE",
    category: "payroll",
    popular: true,
    icon: "Users"
  },
  {
    code: "PAYROLL-11-50",
    name: "Payroll Administration (11-50 employees)",
    description: "Complete payroll services for 11-50 employees",
    price: 350,
    unit: "PER EMPLOYEE",
    category: "payroll",
    icon: "Users"
  },
  {
    code: "PAYROLL-50-100",
    name: "Payroll Administration (50-100 employees)",
    description: "Complete payroll services for 50-100 employees",
    price: 250,
    unit: "PER EMPLOYEE",
    category: "payroll",
    icon: "Users"
  },
  {
    code: "PAYROLL-100-500",
    name: "Payroll Administration (100-500 employees)",
    description: "Complete payroll services for 100-500 employees",
    price: 150,
    unit: "PER EMPLOYEE",
    category: "payroll",
    icon: "Users"
  },
  {
    code: "EMPLOYMENT-CONTRACT",
    name: "Employment Contract to specification",
    description: "Custom employment contract preparation",
    category: "payroll",
    icon: "FileText"
  },

  // COMPANY FORMATIONS & AMENDMENTS
  {
    code: "COR9.1",
    name: "Name Reservation",
    description: "Reserve company name with CIPC",
    price: 250,
    category: "company-formation",
    popular: true,
    icon: "Tag"
  },
  {
    code: "COR9.2",
    name: "Application to extend name reservation",
    description: "Extend existing name reservation period",
    price: 500,
    category: "company-formation",
    icon: "Clock"
  },
  {
    code: "COR14.3",
    name: "Registration Certificate",
    description: "Obtain company registration certificate",
    price: 50,
    category: "company-formation",
    icon: "Award"
  },
  {
    code: "COR15.1",
    name: "Memorandum of Incorporation (MOI)",
    description: "Prepare and file Memorandum of Incorporation",
    price: 1250,
    category: "company-formation",
    popular: true,
    icon: "FileText"
  },
  {
    code: "COR15.2",
    name: "Notice of amendments of Memorandum of Incorporation and resolution",
    description: "Amend MOI with required resolutions",
    price: 750,
    category: "company-formation",
    icon: "Edit"
  },
  {
    code: "COR16.1",
    name: "Notice of change of Financial Year End",
    description: "Change company financial year end",
    price: 650,
    category: "company-formation",
    icon: "Calendar"
  },
  {
    code: "COR39",
    name: "Notice of change concerning a director and resolution",
    description: "Change directors and file required resolutions",
    price: 850,
    category: "company-formation",
    popular: true,
    icon: "UserCheck"
  },
  {
    code: "COR40.1",
    name: "Notice of resolution to wind up solvent company",
    description: "Wind up solvent company proceedings",
    price: 1000,
    category: "company-formation",
    icon: "XCircle"
  },
  {
    code: "COR40.5",
    name: "Application for re-instatement of de-registered company",
    description: "Reinstate de-registered company",
    price: 1000,
    category: "company-formation",
    icon: "RotateCcw"
  },
  {
    code: "COMPANY-REGISTER",
    name: "Company Register - New and Populate and Minute Register",
    description: "Set up and populate company registers",
    price: 650,
    category: "company-formation",
    icon: "Book"
  },
  {
    code: "UPDATE-REGISTER",
    name: "Update Company Register per Category",
    description: "Update existing company registers",
    price: 350,
    category: "company-formation",
    icon: "BookOpen"
  },
  {
    code: "SHARE-CERTIFICATES",
    name: "Issue Share Certificates per Shareholder",
    description: "Issue new share certificates",
    price: 500,
    category: "company-formation",
    icon: "Certificate"
  },
  {
    code: "RESOLUTIONS",
    name: "Resolution Shareholders/Directors",
    description: "Prepare shareholder and director resolutions",
    price: 475,
    category: "company-formation",
    icon: "FileCheck"
  },
  {
    code: "CIPC-CONFIRMATION",
    name: "Confirmation Certificates from CIPC",
    description: "Obtain CIPC confirmation certificates",
    price: 200,
    category: "company-formation",
    icon: "CheckCircle"
  },
  {
    code: "POWER-ATTORNEY",
    name: "Power of Attorney - Directors",
    description: "Prepare power of attorney for directors",
    price: 350,
    category: "company-formation",
    icon: "FileSignature"
  },
  {
    code: "DEREGISTRATION-DORMANT",
    name: "Deregistration: Dormant Company",
    description: "Deregister dormant company (approximate costs)",
    price: 1500,
    category: "company-formation",
    icon: "Trash2"
  },
  {
    code: "DEREGISTRATION-TRADING",
    name: "Deregistration: Trading Company",
    description: "Deregister trading company (approximate costs)",
    price: 2200,
    category: "company-formation",
    icon: "Trash2"
  },
  {
    code: "DEREGISTRATION-CC",
    name: "Deregistration: Close Corporation",
    description: "Deregister close corporation (approximate costs)",
    price: 800,
    category: "company-formation",
    icon: "Trash2"
  },
  {
    code: "IT77-DEREG",
    name: "IT77 Deregistration",
    description: "SARS deregistration process (approximate costs)",
    price: 375,
    category: "company-formation",
    icon: "UserX"
  },
  {
    code: "PRIORITY-FEE",
    name: "Priority Fee for Urgent Lodgements with CIPC/SARS",
    description: "Fast-track processing for urgent submissions",
    price: 1300,
    category: "company-formation",
    icon: "Zap"
  }
];

export const serviceCategories = [
  { id: "professional-fees", name: "Professional Fees", icon: "Briefcase" },
  { id: "individual-taxation", name: "Individual Taxation", icon: "User" },
  { id: "business-entities", name: "Business Entities", icon: "Building" },
  { id: "employees-tax", name: "Employees Tax", icon: "Users" },
  { id: "vat", name: "Value Added Tax", icon: "Percent" },
  { id: "uif", name: "UIF Services", icon: "Shield" },
  { id: "accounting-certificates", name: "Accounting Certificates", icon: "Award" },
  { id: "annual-admin", name: "Annual Administration", icon: "Calendar" },
  { id: "payroll", name: "Payroll Services", icon: "DollarSign" },
  { id: "company-formation", name: "Company Formation & Amendments", icon: "FileText" }
];