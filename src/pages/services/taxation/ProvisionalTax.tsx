import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle, Clock, AlertTriangle, Calculator } from 'lucide-react';

const ProvisionalTax = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-primary">Business Taxation</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Provisional Tax Returns (IRP6)
                </h1>
                <p className="text-lg text-muted-foreground">
                  Bi-annual provisional tax calculations and submissions for companies and individuals
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-3xl font-bold text-primary mb-2">
                  From R400
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  3-5 Working Days
                </div>
                <Button size="lg">
                  Request Quote
                </Button>
              </div>
            </div>
          </div>

          {/* Service Types */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Non-Trading</CardTitle>
                <div className="text-2xl font-bold text-primary">R400</div>
                <p className="text-sm text-muted-foreground">No business activity</p>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">1st Period</CardTitle>
                <div className="text-2xl font-bold text-primary">R650</div>
                <p className="text-sm text-muted-foreground">First 6 months</p>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">2nd Period</CardTitle>
                <div className="text-2xl font-bold text-primary">R1,000</div>
                <p className="text-sm text-muted-foreground">Final 6 months</p>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Additional</CardTitle>
                <div className="text-2xl font-bold text-primary">R500</div>
                <p className="text-sm text-muted-foreground">Top-up payment</p>
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
                    <span>Income estimate calculation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Tax liability computation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>IRP6 form preparation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>eFiling submission</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Payment calculation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Important Dates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
                  Critical Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>1st Period:</strong> Last day of February</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span><strong>2nd Period:</strong> Last day of August</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Late submission: 20% penalty on tax</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Underestimate penalty: 20% on shortfall</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Who Needs This */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Who Must Submit Provisional Tax?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-primary">Individuals</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Expected tax liability &gt; R1,000</li>
                    <li>• Business/professional income</li>
                    <li>• Investment income</li>
                    <li>• Rental income</li>
                    <li>• Capital gains</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-primary">Companies & Entities</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• All companies (Pty Ltd)</li>
                    <li>• Close corporations</li>
                    <li>• Trusts with taxable income</li>
                    <li>• Non-resident entities</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Process */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Our Provisional Tax Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Income Analysis</h3>
                  <p className="text-sm text-muted-foreground">Review current year income trends</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Estimate Calculation</h3>
                  <p className="text-sm text-muted-foreground">Calculate expected tax liability</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Submission</h3>
                  <p className="text-sm text-muted-foreground">Prepare and submit IRP6 return</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Payment</h3>
                  <p className="text-sm text-muted-foreground">Assist with payment processing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProvisionalTax;