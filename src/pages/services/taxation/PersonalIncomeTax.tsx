import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, CheckCircle, Clock, Receipt, DollarSign } from 'lucide-react';

const PersonalIncomeTax = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <User className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-primary">Individual Taxation</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Personal Income Tax Returns
                </h1>
                <p className="text-lg text-muted-foreground">
                  Professional preparation of individual income tax returns (ITR12)
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-3xl font-bold text-primary mb-2">
                  From R500
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  5-7 Working Days
                </div>
                <Button size="lg">
                  Request Quote
                </Button>
              </div>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Basic Return</CardTitle>
                <div className="text-center text-2xl font-bold text-primary">R500</div>
                <p className="text-center text-sm text-muted-foreground">Salary under R250,000</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Salary income only</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Basic deductions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Medical aid credits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Standard Return</CardTitle>
                <div className="text-center text-2xl font-bold text-primary">R1,750</div>
                <p className="text-center text-sm text-muted-foreground">With allowances & deductions</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Travel allowances</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Deductions & expenses</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Investment income</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Complex Return</CardTitle>
                <div className="text-center text-2xl font-bold text-primary">R1,750</div>
                <p className="text-center text-sm text-muted-foreground">Directors/Members/Sole Traders</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Director's income</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Business income</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Rental income</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Documents Required */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Receipt className="h-5 w-5 mr-2 text-primary" />
                  Documents Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>IRP5/IT3(a) certificate from employer</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Medical aid certificate</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Retirement annuity certificates</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Interest certificates (IT3b)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Previous year's assessment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Additional Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-primary" />
                  Additional Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span>Travel logbook compilation</span>
                    <span className="font-semibold">R1,000</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Rental schedule preparation</span>
                    <span className="font-semibold">R1,000</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Capital gains tax calculation</span>
                    <span className="font-semibold">R850</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Objection to assessment</span>
                    <span className="font-semibold">R750</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Process */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Our Tax Return Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Document Collection</h3>
                  <p className="text-sm text-muted-foreground">Gather all required tax documents</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Preparation</h3>
                  <p className="text-sm text-muted-foreground">Expert preparation of your return</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Review & Submit</h3>
                  <p className="text-sm text-muted-foreground">Quality check and eFiling submission</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Confirmation</h3>
                  <p className="text-sm text-muted-foreground">Receive confirmation and copies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PersonalIncomeTax;