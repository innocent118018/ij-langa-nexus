import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, CheckCircle, Clock, FileText } from 'lucide-react';

const BookkeepingTrialBalance = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Calculator className="h-6 w-6 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Accounting Services</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Bookkeeping to Trial Balance
                </h1>
                <p className="text-lg text-gray-600">
                  Comprehensive bookkeeping services from recording transactions to preparing trial balance
                </p>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  From R1,200
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  Monthly Service
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
                    <span>Recording of all business transactions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Bank reconciliations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Accounts payable and receivable management</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>General ledger maintenance</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Trial balance preparation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Monthly financial reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  What We Need From You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Bank statements for all business accounts</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Invoice copies and receipts</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Supplier statements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Petty cash records</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Asset register details</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose This Service */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Why Choose Our Bookkeeping Services?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calculator className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Accurate Records</h3>
                  <p className="text-sm text-gray-600">Precise transaction recording and categorization</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Timely Delivery</h3>
                  <p className="text-sm text-gray-600">Monthly reports delivered on schedule</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Compliance Ready</h3>
                  <p className="text-sm text-gray-600">Prepared for tax submissions and audits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="bg-blue-600 text-white rounded-lg p-8 mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to streamline your bookkeeping?</h2>
            <p className="text-lg mb-6">
              Let us handle your books while you focus on growing your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Request Quote
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                Call Us Today
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookkeepingTrialBalance;