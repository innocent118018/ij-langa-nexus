import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Percent, CheckCircle, Clock, AlertTriangle, DollarSign } from 'lucide-react';

const VATRegistration = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Percent className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-primary">VAT Services</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  VAT Registration (VAT101)
                </h1>
                <p className="text-lg text-muted-foreground">
                  Register your business for Value Added Tax with SARS
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-3xl font-bold text-primary mb-2">
                  R1,500
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  5-10 Working Days
                </div>
                <Button size="lg">
                  Order Now
                </Button>
              </div>
            </div>
          </div>

          {/* Mandatory vs Voluntary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Mandatory Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">Required when:</p>
                <ul className="space-y-2 text-sm">
                  <li>• Taxable supplies exceed R1 million in 12 months</li>
                  <li>• Expected to exceed R1 million in next 12 months</li>
                  <li>• Must register within 21 days</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Voluntary Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">Benefits include:</p>
                <ul className="space-y-2 text-sm">
                  <li>• Claim input VAT on purchases</li>
                  <li>• Professional business appearance</li>
                  <li>• Compliance for B2B transactions</li>
                </ul>
              </CardContent>
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
                    <span>VAT101 form preparation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Supporting documentation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>SARS submission</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>VAT number allocation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Return period selection</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>VAT compliance guidance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-primary" />
                  Required Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Company registration documents</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Bank account details</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Business address proof</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Expected monthly turnover</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Nature of business activities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* VAT Return Options */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>VAT Return Frequency Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">2M</span>
                  </div>
                  <h3 className="font-semibold mb-2">Bi-Monthly</h3>
                  <p className="text-sm text-muted-foreground">Standard option - returns every 2 months</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">1M</span>
                  </div>
                  <h3 className="font-semibold mb-2">Monthly</h3>
                  <p className="text-sm text-muted-foreground">For businesses with regular refunds</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">4M</span>
                  </div>
                  <h3 className="font-semibold mb-2">Four-Monthly</h3>
                  <p className="text-sm text-muted-foreground">For smaller businesses (&lt; R2.5M turnover)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VATRegistration;