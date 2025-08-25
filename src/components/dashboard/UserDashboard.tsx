
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  DollarSign, 
  Clock, 
  Upload, 
  MessageSquare, 
  User,
  CheckCircle,
  AlertTriangle,
  Scale,
  Building,
  Shield,
  Download
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const UserDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Client Portal</h1>
            <p className="text-slate-300">Your comprehensive legal services dashboard</p>
          </div>
          <div className="flex items-center space-x-2">
            <Scale className="h-12 w-12 text-amber-400" />
            <Shield className="h-12 w-12 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Service Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Active Services</CardTitle>
            <Clock className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">3</div>
            <p className="text-xs text-blue-600">Services in progress</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Pending Invoices</CardTitle>
            <DollarSign className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">R 2,450</div>
            <p className="text-xs text-amber-600">Outstanding balance</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-gradient-to-br from-emerald-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Compliance Status</CardTitle>
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">Current</div>
            <p className="text-xs text-emerald-600">All documents up to date</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoices & Payments */}
        <Card className="shadow-lg">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-slate-700" />
              <span>Invoices & Payments</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="flex justify-between items-center p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div>
                <p className="font-semibold text-amber-900">Invoice #20202604</p>
                <p className="text-sm text-amber-700">Company Registration Service</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-amber-900">R 1,200</p>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                  Pay Now
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <p className="font-semibold text-red-900">Invoice #20202603</p>
                <p className="text-sm text-red-700">VAT Registration Service</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-900">R 1,250</p>
                <Badge className="bg-red-100 text-red-800">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Overdue
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Services */}
        <Card className="shadow-lg">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5 text-slate-700" />
              <span>My Services</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="font-semibold text-blue-900">Company Registration</p>
                <p className="text-sm text-blue-700">CIPC processing in progress</p>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                <Clock className="h-3 w-3 mr-1" />
                75% Complete
              </Badge>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="font-semibold text-green-900">Tax Clearance Certificate</p>
                <p className="text-sm text-green-700">SARS application approved</p>
              </div>
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Complete
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Document Management */}
        <Card className="shadow-lg">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-slate-700" />
              <span>Document Center</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Button variant="outline" className="w-full h-12 border-dashed border-2 border-slate-300 hover:border-slate-400">
                <Upload className="h-5 w-5 mr-2" />
                Upload Required Documents
              </Button>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-slate-600" />
                    <span className="text-sm font-medium">Company Certificate</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-slate-600">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-slate-600" />
                    <span className="text-sm font-medium">Tax Clearance</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-slate-600">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support & Communication */}
        <Card className="shadow-lg">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-slate-700" />
              <span>Support Center</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Legal Consultant
              </Button>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-slate-900">Recent Activity</span>
                </div>
                <p className="text-sm text-slate-600">
                  Your company registration documents have been submitted to CIPC. 
                  Processing time: 5-10 business days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legal Notice & Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-l-4 border-l-slate-900">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <Scale className="h-5 w-5 text-slate-700" />
              <span>Legal Notice</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>IJ Langa Consulting</strong> is a registered legal consulting firm 
                specializing in corporate compliance, CIPC registrations, and SARS matters. 
                All services are provided under strict confidentiality and professional standards.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-slate-700" />
              <span>Profile Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Button variant="outline" className="w-full">
              <User className="h-4 w-4 mr-2" />
              Update Profile Information
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
