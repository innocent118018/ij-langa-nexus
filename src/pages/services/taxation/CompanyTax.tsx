import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, CheckCircle, Clock, FileText, DollarSign } from 'lucide-react';

const CompanyTax = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Building className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-primary">Business Taxation</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Company Tax Returns (ITR14)
                </h1>
                <p className="text-lg text-muted-foreground">
                  Professional company income tax return preparation for all business sizes
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-3xl font-bold text-primary mb-2">
                  From R500
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  7-14 Working Days
                </div>
                <Button size="lg">
                  Request Quote
                </Button>
              </div>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Dormant</CardTitle>
                <div className="text-2xl font-bold text-primary">R500</div>
                <p className="text-sm text-muted-foreground">No trading activity</p>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Micro</CardTitle>
                <div className="text-2xl font-bold text-primary">R1,200</div>
                <p className="text-sm text-muted-foreground">Under R1 million</p>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Small</CardTitle>
                <div className="text-2xl font-bold text-primary">R1,850</div>
                <p className="text-sm text-muted-foreground">Under R14 million</p>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Medium/Large</CardTitle>
                <div className="text-2xl font-bold text-primary">R2,450</div>
                <p className="text-sm text-muted-foreground">Over R15 million</p>
              </CardHeader>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>ITR14 preparation and submission</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Financial statements analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Tax calculation optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Allowable deductions review</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>eFiling submission</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Annual financial statements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Trial balance</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Fixed asset register</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Bank statements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Previous year assessment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Deadlines */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Important Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-primary">Filing Deadlines</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Companies: 12 months after year-end</li>
                    <li>• Close Corporations: 12 months after year-end</li>
                    <li>• Trusts: 12 months after year-end</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-primary">Payment Deadlines</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Final payment: 6 months after year-end</li>
                    <li>• Provisional tax: 6 months and end of year</li>
                    <li>• Late submission penalties apply</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompanyTax;