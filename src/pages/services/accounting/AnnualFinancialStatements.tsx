import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle, Clock, Award, Calendar } from 'lucide-react';

const AnnualFinancialStatements = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium text-primary">Accounting Services</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Annual Financial Statements
                </h1>
                <p className="text-lg text-muted-foreground">
                  IFRS compliant annual financial statements for companies and close corporations
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-3xl font-bold text-primary mb-2">
                  From R3,500
                </div>
                <div className="flex items-center text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  Annual Service
                </div>
                <Button size="lg">
                  Request Quote
                </Button>
              </div>
            </div>
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
                    <span>Statement of Financial Position</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Statement of Comprehensive Income</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Statement of Changes in Equity</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Statement of Cash Flows</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Notes to the Financial Statements</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Directors' Report</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Standards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Compliance Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>IFRS for SMEs compliant</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Companies Act requirements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>CIPC filing ready</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Bank submission ready</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Process */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Our Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Information Gathering</h3>
                  <p className="text-sm text-muted-foreground">Collect trial balance and supporting documents</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Preparation</h3>
                  <p className="text-sm text-muted-foreground">Prepare statements according to IFRS standards</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Review</h3>
                  <p className="text-sm text-muted-foreground">Quality review by senior accountant</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-primary">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Delivery</h3>
                  <p className="text-sm text-muted-foreground">Final statements delivered for approval</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnnualFinancialStatements;