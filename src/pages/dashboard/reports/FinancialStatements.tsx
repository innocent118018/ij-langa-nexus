import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

const FinancialStatements = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Statements</h1>
          <p className="text-muted-foreground">
            Generate and view comprehensive financial statements
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export All
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Profit & Loss Statement
            </CardTitle>
            <CardDescription>
              Comprehensive income statement showing revenue, expenses, and net profit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">Last generated: Today</div>
              <div className="flex gap-2">
                <Button size="sm">View Report</Button>
                <Button size="sm" variant="outline">Download PDF</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Balance Sheet
            </CardTitle>
            <CardDescription>
              Statement of financial position showing assets, liabilities, and equity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">Last generated: Today</div>
              <div className="flex gap-2">
                <Button size="sm">View Report</Button>
                <Button size="sm" variant="outline">Download PDF</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Cash Flow Statement
            </CardTitle>
            <CardDescription>
              Statement showing cash inflows and outflows from operating, investing, and financing activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">Last generated: Today</div>
              <div className="flex gap-2">
                <Button size="sm">View Report</Button>
                <Button size="sm" variant="outline">Download PDF</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Statement of Changes in Equity
            </CardTitle>
            <CardDescription>
              Statement showing changes in owner's equity during the reporting period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">Last generated: Today</div>
              <div className="flex gap-2">
                <Button size="sm">View Report</Button>
                <Button size="sm" variant="outline">Download PDF</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialStatements;