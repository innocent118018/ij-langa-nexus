import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Calculator, Clock, DollarSign, ShoppingCart } from 'lucide-react';
import { PaymentButton } from '@/components/payments/PaymentButton';
import { ServiceContractModal } from '@/components/contracts/ServiceContractModal';

interface ServicePackagesProps {
  onOrderService: (service: any) => void;
}

export const ServicePackages = ({ onOrderService }: ServicePackagesProps) => {
  const [hourlyQuantities, setHourlyQuantities] = useState<{[key: string]: number}>({});
  const [contractModalOpen, setContractModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const taxReturns = [
    {
      id: 'basic-tax',
      name: 'Basic Income Tax Return',
      price: 610,
      includes: [
        "IRP5's",
        "Medical Aid and/or Expenses", 
        "Retirement/Pension Fund Contributions",
        "Interest and Investment Income Shown on an IT3(b)",
        "Sale of Assets - Only Shares/Unit Trusts"
      ]
    },
    {
      id: 'advanced-tax',
      name: 'Advanced Income Tax Return',
      price: 1020,
      includes: [
        "Anything from the Basic Return",
        "Rental Income",
        "Company Car or Travel Allowance", 
        "Sale of Assets - Cars, Property etc.",
        "Cryptocurrencies (ie. Bitcoin etc.)",
        "Home Office Expenses"
      ]
    },
    {
      id: 'trade-tax',
      name: 'Trade Income Tax Return',
      price: 1360,
      includes: [
        "Anything from the Basic & Advanced Return",
        "Sole Proprietor Income",
        "Partnership Income",
        "Commission Income"
      ]
    }
  ];

  const compliancePackages = [
    {
      id: 'small-business',
      name: 'Small Registered Business',
      price: 730,
      period: '/Month',
      subtitle: 'Your Yearly Sales Are Less Than R1 Mil',
      includes: [
        "1st Provisional Tax Return",
        "2nd Provisional Tax Return",
        "Final Company Tax Return",
        "CIPC Annual Turnover Lodging (Incl fee paid to CIPC)",
        "Beneficial Ownership Submission (CIPC)",
        "Financial Statements (Unaudited, unreviewed)"
      ]
    },
    {
      id: 'medium-business',
      name: 'Medium Registered Business', 
      price: 980,
      period: '/Month',
      subtitle: 'Your Yearly Sales Are Between R1 Mil & R7 Mil',
      includes: [
        "1st Provisional Tax Return",
        "2nd Provisional Tax Return",
        "Final Tax Return",
        "CIPC Annual Turnover Lodging (Incl fee paid to CIPC)",
        "Beneficial Ownership Submission (CIPC)",
        "Financial Statements (Unaudited, unreviewed)"
      ]
    },
    {
      id: 'beginner-package',
      name: 'Beginner',
      price: 4240,
      period: '/Month',
      subtitle: 'Bookkeeping - Once A Month',
      includes: [
        "Dedicated Account Manager",
        "Full Payroll Service (up to 10 employees)",
        "Sage Accounting Online Subscription - Full Program (2 User)",
        "Bookkeeping: Capture From Bank Statement Feeds",
        "Up to 100 Transactions P/M",
        "Customer Statements Emailed Monthly",
        "Fixed Asset Register",
        "No Supplier Invoice Capturing",
        "Detailed Monthly Management Reports",
        "VAT Returns",
        "1st Provisional Tax Return",
        "2nd Provisional Tax Return", 
        "Final Tax Return",
        "CIPC Annual Turnover Lodging (Incl fee paid to CIPC)",
        "CIPC Beneficial Ownership Declaration",
        "Financial Statements (Unaudited, unreviewed, IFRS SME)",
        "Share Certificates & Share Register",
        "Dividends Tax Submissions",
        "Unlimited Tax and Accounting Advice Within 8 Business Hrs"
      ]
    },
    {
      id: 'enhanced-package',
      name: 'Enhanced',
      price: 6830,
      period: '/Month',
      subtitle: 'Bookkeeping - Once A Week',
      includes: [
        "Dedicated Account Manager",
        "Full Payroll Service (up to 20 employees)",
        "Sage Accounting Online Subscription - Full Program (3 User)",
        "Bookkeeping: Capture From Bank Statement Feeds",
        "Up to 200 Transactions P/M",
        "Customer Statements Emailed Monthly",
        "Fixed Asset Register",
        "Supplier Invoice Capturing",
        "Detailed Monthly Management Reports",
        "Vat Returns",
        "1st Provisional Tax Return",
        "2nd Provisional Tax Return",
        "Final Tax Return",
        "CIPC Annual Turnover Lodging (Incl fee paid to CIPC)",
        "CIPC Beneficial Ownership Declaration",
        "Financial Statements (Unaudited, unreviewed, IFRS SME)",
        "Share Certificates & Share Register",
        "Dividends Tax Submission",
        "1 Performance and Strategy Meeting Per Year",
        "Unlimited Tax and Accounting Advice Within 8 Business Hrs"
      ]
    },
    {
      id: 'ultimate-package',
      name: 'Ultimate',
      price: 9025,
      period: '/Month',
      subtitle: 'Bookkeeping - Once a Week',
      includes: [
        "Dedicated Account Manager",
        "Full Payroll Service (up to 30 employees)",
        "Sage Accounting Online Subscription - Full Program (4 User)",
        "Bookkeeping: Capture From Bank Statement Feeds",
        "Up to 300 Transactions P/M",
        "Customer Statements Emailed Monthly",
        "Fixed Asset Register",
        "Supplier Invoice Capturing",
        "Detailed Monthly Management Reports",
        "Vat Returns",
        "1st Provisional Tax Return",
        "2nd Provisional Tax Return",
        "Final Tax Return",
        "CIPC Annual Turnover Lodging (Incl fee paid to CIPC)",
        "CIPC Beneficial Ownership Declaration",
        "Financial Statements (Unaudited, unreviewed, IFRS SME)",
        "Share Certificates & Share Register",
        "Dividends Tax Submissions",
        "2 Performance and Strategy Meetings Per Year",
        "Unlimited Tax and Accounting Advice Within 8 Business Hrs"
      ]
    }
  ];

  const professionalServices = [
    // Income Tax
    { name: 'IT12 – Individual Income Tax Return – Individual with IRP5', price: 1665.20, category: 'Income Tax' },
    { name: 'IT12 – Individual Income Tax Return – Individual with IRP5 & Rental Income', price: 2248.20, category: 'Income Tax' },
    { name: 'IT12 – Individual Income Tax Return – Sole Proprietor', price: 2831.20, category: 'Income Tax' },
    { name: 'IT12 – Individual Income Tax Return – Sole Proprietor & Rental Income', price: 3414.20, category: 'Income Tax' },
    { name: 'IT12 – Verification/Audit Selection by SARS', price: 988.00, category: 'Income Tax', isHourly: true },
    { name: 'IT14 – Income Tax Return – Company or Close Corporation', price: 1915.40, category: 'Income Tax' },
    { name: 'IT14 – Income Tax Return – Company or Close Corporation – Nil Return', price: 988.00, category: 'Income Tax' },
    { name: 'IT12TR – Income Tax Return – Trust', price: 1915.40, category: 'Income Tax' },
    { name: 'IT12TR – Income Tax Return – Trust – Nil Return', price: 988.00, category: 'Income Tax' },
    { name: 'IT14/IT12TR – Verification/Audit Selection by SARS', price: 988.00, category: 'Income Tax', isHourly: true },

    // Provisional Tax
    { name: 'IRP6 – Provisional Tax Return – 1st Period – Individual, Company, Close Corporation or Trust', price: 904.20, category: 'Provisional Tax' },
    { name: 'IRP6 – Provisional Tax Return – 2nd Period – Individual, Company, Close Corporation or Trust', price: 904.20, category: 'Provisional Tax' },

    // VAT
    { name: 'VAT201 – Nil Return', price: 144.20, category: 'VAT' },
    { name: 'VAT201', price: 288.40, category: 'VAT' },
    { name: 'VAT Verification/Audit Selection by SARS', price: 988.00, category: 'VAT', isHourly: true },

    // PAYE
    { name: 'EMP201 – Nil Return', price: 144.20, category: 'PAYE' },
    { name: 'EMP201', price: 288.40, category: 'PAYE' },
    { name: 'EMP201 – Verification/Audit Selection by SARS', price: 988.00, category: 'PAYE', isHourly: true },
    { name: 'EMP501', price: 410.20, category: 'PAYE' },

    // Bookkeeping
    { name: 'Data Entry – Cash Book/s, Suppliers, Customers', price: 476.00, category: 'Bookkeeping', isHourly: true },
    { name: 'Reconciliations – General Ledger, Suppliers, Customers & Balance Sheet Accounts', price: 988.00, category: 'Bookkeeping', isHourly: true },
    { name: 'VAT Report/s & Reconciliation/s', price: 988.00, category: 'Bookkeeping', isHourly: true },

    // Payroll
    { name: 'Payslips (Calculated Per Employee, Per Month & Batched into 1 file)', price: 77.40, category: 'Payroll' },
    { name: 'Payslips (Calculated Per Employee, Per Month & Provided Individually)', price: 89.00, category: 'Payroll' },
    { name: 'Payslip Calculation', price: 476.00, category: 'Payroll', isHourly: true },
    { name: 'IRP5/IT3 Certificate – Per Employee', price: 362.60, category: 'Payroll' },
    { name: 'Employee Income Tax Registration', price: 357.20, category: 'Payroll' },
    { name: 'Department of Labour – UIF Declaration', price: 232.20, category: 'Payroll' },
    { name: 'Workmans Compensation – Calculation for ROE Return', price: 988.00, category: 'Payroll', isHourly: true },

    // Annual Financial Statements
    { name: 'Where full bookkeeping function from source documents provided by The Accounting Room', price: 9875.00, category: 'Annual Financial Statements' },
    { name: 'Where bookkeeping reports supplied by client', price: 21594.40, category: 'Annual Financial Statements' },

    // Management Accounting
    { name: 'Management Accounts', price: 988.00, category: 'Management Accounting', isHourly: true },
    { name: 'Management Meeting', price: 988.00, category: 'Management Accounting', isHourly: true },
    { name: 'Specialised Reporting – (Cash Flows, Projections etc.)', price: 988.00, category: 'Management Accounting', isHourly: true },

    // CIPC Services
    { name: 'Annual Return, Financial Accountability Supplement & Beneficial Ownership Declaration (from 2nd Declaration)', price: 2500.00, category: 'CIPC Services' },
    { name: 'Beneficial Ownership Declaration (1st Declaration)', price: 5000.00, category: 'CIPC Services' },
    { name: 'Name Reservation', price: 382.00, category: 'CIPC Services' },
    { name: 'Private Company Registration – Standard MOI', price: 1800.00, category: 'CIPC Services' },
    { name: 'Amendment to Memorandum of Incorporation (MOI)', price: 1800.00, category: 'CIPC Services' },
    { name: 'Amendment to Company Directors or Close Corporation Members – CoR39 / CK2', price: 1400.00, category: 'CIPC Services' },
    { name: 'Issue Shares / Transfer Shares', price: 1300.00, category: 'CIPC Services' },
    { name: 'Amendment to Company or Close Corporation Registered Address – CoR21.1', price: 476.00, category: 'CIPC Services' },
    { name: 'Combined Company Share Register & Minute Book', price: 800.00, category: 'CIPC Services' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  const handleOrderService = (service: any) => {
    const quantity = service.isHourly ? (hourlyQuantities[service.name] || 1) : 1;
    
    // Add to cart instead of direct order creation
    const cartItem = {
      id: service.id || `service-${Date.now()}`,
      name: service.name,
      price: service.price,
      category: service.category || 'Services',
      quantity,
      description: service.isHourly ? `${service.name} (${quantity} hours)` : service.name,
      isService: true
    };
    
    onOrderService(cartItem);
  };

  const setHourlyQuantity = (serviceName: string, quantity: number) => {
    setHourlyQuantities(prev => ({
      ...prev,
      [serviceName]: Math.max(1, quantity)
    }));
  };

  const groupedServices = professionalServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof professionalServices>);

  return (
    <div className="space-y-8">
      {/* Income Tax Returns */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Income Tax Returns</h2>
          <p className="text-gray-600 mt-2">Professional tax return preparation services</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {taxReturns.map((service) => (
            <Card key={service.id} className="relative">
              <CardHeader>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(service.price)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Includes:</h4>
                  <ul className="space-y-1">
                    {service.includes.map((item, index) => (
                      <li key={index} className="flex items-start text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleOrderService(service)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Order Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Compliance Packages */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Compliance Packages</h2>
          <p className="text-gray-600 mt-2">For All Companies (2026 Financial Year)</p>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {compliancePackages.map((pkg) => (
            <Card key={pkg.id} className="relative">
              {pkg.id === 'enhanced-package' && (
                <Badge className="absolute -top-2 -right-2 bg-blue-500">
                  Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <div className="text-3xl font-bold text-primary">
                  From {formatCurrency(pkg.price)}{pkg.period}
                </div>
                <p className="text-sm text-muted-foreground">{pkg.subtitle}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  <ul className="space-y-1">
                    {pkg.includes.map((item, index) => (
                      <li key={index} className="flex items-start text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    setSelectedPackage(pkg);
                    setContractModalOpen(true);
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Professional Services */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Professional Services</h2>
          <p className="text-gray-600 mt-2">Comprehensive accounting and tax services</p>
        </div>
        
        {Object.entries(groupedServices).map(([category, services]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const quantity = hourlyQuantities[service.name] || 1;
                const totalPrice = service.price * quantity;
                
                return (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm text-gray-900">{service.name}</h4>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-lg font-bold text-primary">
                              {formatCurrency(service.price)}
                              {service.isHourly && (
                                <span className="text-sm font-normal text-gray-500"> /hour</span>
                              )}
                            </div>
                            {service.isHourly && (
                              <Clock className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        </div>
                        
                        {service.isHourly && (
                          <div className="space-y-2">
                            <Label className="text-xs">Hours needed:</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setHourlyQuantity(service.name, parseInt(e.target.value) || 1)}
                                className="w-20 text-sm"
                              />
                              <div className="flex items-center text-sm text-gray-600">
                                <Calculator className="h-3 w-3 mr-1" />
                                Total: {formatCurrency(totalPrice)}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleOrderService(service)}
                        >
                          <ShoppingCart className="h-3 w-3 mr-2" />
                          Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Service Contract Modal */}
      <ServiceContractModal
        open={contractModalOpen}
        onOpenChange={setContractModalOpen}
        packageData={selectedPackage}
      />
    </div>
  );
};
