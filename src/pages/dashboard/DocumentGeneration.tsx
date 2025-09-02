import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { InvoiceGenerator } from '@/components/documents/InvoiceGenerator';
import { QuoteGenerator } from '@/components/documents/QuoteGenerator';
import { DocumentTemplate } from '@/components/documents/DocumentTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DocumentGeneration = () => {
  const [activeTab, setActiveTab] = useState('invoice');

  // Sample data - in real app this would come from your API
  const sampleInvoiceData = {
    id: '1',
    invoiceNumber: '20202588',
    quoteNumber: '38012028',
    orderNumber: '235',
    issueDate: '3/25/2025',
    dueDate: '4/1/2025',
    customerName: 'Suzan Ramapulane',
    customerAddress: '5A Buhrman Street',
    serviceTitle: 'Garage Motor Repairs',
    items: [
      { description: 'Learn" or "Program 3', quantity: 3, unitPrice: 180.00, total: -540.00 },
      { description: 'New Remote (Receipt Included and Warranty)', quantity: 1, unitPrice: 315.00, total: 315.00 },
      { description: 'DC BLUE ASTUTE GARAGE DOOR MOTOR', quantity: 2, unitPrice: 3100.00, total: 6200.00 },
      { description: 'Safety Beams', quantity: 2, unitPrice: 471.00, total: 942.00 },
      { description: '80-120kg (Aluminum/Light Steel) 0.225" x 2" x 26"', quantity: 2, unitPrice: 220.00, total: 440.00 },
      { description: 'Service Fee', quantity: 1, unitPrice: 550.00, total: 550.00 }
    ],
    subtotal: 7907.00,
    vat: 1186.05,
    total: 9093.05,
    balanceDue: 4093.05,
    creditNote: {
      number: '202075424',
      date: '3/25/2025',
      amount: 5000.00
    }
  };

  const sampleQuoteData = {
    id: '1',
    quoteNumber: 'QUO-38012028',
    quoteDate: '3/18/2025',
    validUntil: '3/25/2025',
    customerName: 'Suzan Ramapulane',
    customerAddress: '5A Buhrman Street',
    serviceTitle: 'Garage Motor Repairs Quote',
    items: sampleInvoiceData.items,
    subtotal: 7907.00,
    vat: 1186.05,
    total: 9093.05,
    notes: 'Installation includes 1-year warranty on parts and labor.'
  };

  const sampleOrderData = {
    orderNumber: 'ORD-235',
    orderDate: '3/20/2025',
    expectedCompletion: '3/27/2025',
    customerName: 'Suzan Ramapulane',
    customerAddress: '5A Buhrman Street',
    serviceTitle: 'Garage Motor Repairs - Work Order',
    items: sampleInvoiceData.items,
    subtotal: 7907.00,
    vat: 1186.05,
    total: 9093.05
  };

  const sampleStatementData = {
    statementNumber: 'STMT-2025-03',
    statementDate: '3/31/2025',
    customerName: 'Suzan Ramapulane',
    customerAddress: '5A Buhrman Street',
    items: [
      { description: 'Invoice #20202588 - Garage Motor Repairs', quantity: 1, unitPrice: 4093.05, total: 4093.05 },
      { description: 'Invoice #20202587 - VAT Registration', quantity: 1, unitPrice: 1500.00, total: 1500.00 },
      { description: 'Payment Received - Thank You', quantity: 1, unitPrice: -1500.00, total: -1500.00 }
    ],
    subtotal: 4093.05,
    vat: 0,
    total: 4093.05
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Document Generation</h1>
          <p className="text-muted-foreground">Generate invoices, quotes, orders, and statements</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="invoice">Invoice</TabsTrigger>
            <TabsTrigger value="quote">Quote</TabsTrigger>
            <TabsTrigger value="order">Order</TabsTrigger>
            <TabsTrigger value="statement">Statement</TabsTrigger>
          </TabsList>

          <TabsContent value="invoice" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <InvoiceGenerator 
                  invoiceData={sampleInvoiceData}
                  onPrint={() => console.log('Invoice printed')}
                  onDownload={() => console.log('Invoice downloaded')}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quote" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Quote Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <QuoteGenerator 
                  quoteData={sampleQuoteData}
                  onAccept={() => console.log('Quote accepted')}
                  onPrint={() => console.log('Quote printed')}
                  onDownload={() => console.log('Quote downloaded')}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="order" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Order Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentTemplate
                  type="order"
                  documentNumber={sampleOrderData.orderNumber}
                  documentDate={sampleOrderData.orderDate}
                  dueDate={sampleOrderData.expectedCompletion}
                  customer={{
                    name: sampleOrderData.customerName,
                    address: sampleOrderData.customerAddress
                  }}
                  title={sampleOrderData.serviceTitle}
                  items={sampleOrderData.items}
                  subtotal={sampleOrderData.subtotal}
                  vat={sampleOrderData.vat}
                  total={sampleOrderData.total}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statement" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Statement Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentTemplate
                  type="statement"
                  documentNumber={sampleStatementData.statementNumber}
                  documentDate={sampleStatementData.statementDate}
                  customer={{
                    name: sampleStatementData.customerName,
                    address: sampleStatementData.customerAddress
                  }}
                  title="Account Statement"
                  items={sampleStatementData.items}
                  subtotal={sampleStatementData.subtotal}
                  vat={sampleStatementData.vat}
                  total={sampleStatementData.total}
                  balanceDue={sampleStatementData.total}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DocumentGeneration;