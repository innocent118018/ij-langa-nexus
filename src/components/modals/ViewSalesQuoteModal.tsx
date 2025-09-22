import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, User, FileText, DollarSign, Clock } from 'lucide-react';
import { SalesQuote } from '@/hooks/useSalesQuotes';

interface ViewSalesQuoteModalProps {
  quote: SalesQuote | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ViewSalesQuoteModal: React.FC<ViewSalesQuoteModalProps> = ({
  quote,
  open,
  onOpenChange
}) => {
  if (!quote) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Accepted':
        return 'bg-blue-100 text-blue-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const lineItems = Array.isArray(quote.line_items) ? quote.line_items : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Sales Quote</DialogTitle>
            <Badge className={getStatusColor(quote.status)}>
              {quote.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Quote Number</p>
                  <p className="font-semibold">{quote.quote_number}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Issue Date</p>
                  <p className="font-semibold">{formatDate(quote.issue_date)}</p>
                </div>
              </div>
              
              {quote.expiry_date && (
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Expiry Date</p>
                    <p className="font-semibold">{formatDate(quote.expiry_date)}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-semibold text-lg">{formatCurrency(quote.total_amount)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <User className="h-5 w-5 mr-2" />
              Customer Information
            </h3>
            <div className="bg-white border rounded-lg p-4">
              <p className="font-medium">{quote.customer_name || 'No customer specified'}</p>
              {quote.notes && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Billing Address:</p>
                  <p className="text-sm">{quote.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {quote.description && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Description</h3>
              <div className="bg-white border rounded-lg p-4">
                <p>{quote.description}</p>
              </div>
            </div>
          )}

          {/* Line Items */}
          {lineItems.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Line Items</h3>
              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-6 py-3">
                  <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
                    <div className="col-span-2">Description</div>
                    <div className="text-center">Quantity</div>
                    <div className="text-right">Unit Price</div>
                    <div className="text-right">Tax Amount</div>
                    <div className="text-right">Total</div>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {lineItems.map((item: any, index: number) => (
                    <div key={item.id || index} className="px-6 py-4">
                      <div className="grid grid-cols-6 gap-4 items-center">
                        <div className="col-span-2">
                          <p className="text-sm">{item.description || 'No description'}</p>
                        </div>
                        <div className="text-center text-sm">{item.quantity || 0}</div>
                        <div className="text-right text-sm">{formatCurrency(item.unitPrice || 0)}</div>
                        <div className="text-right text-sm">{formatCurrency(item.taxAmount || 0)}</div>
                        <div className="text-right text-sm font-medium">{formatCurrency(item.lineTotal || item.total || 0)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Financial Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{formatCurrency(quote.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VAT Amount:</span>
                <span className="font-medium">{formatCurrency(quote.vat_amount)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span>{formatCurrency(quote.total_amount)}</span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          {quote.terms_conditions && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Terms & Conditions</h3>
              <div className="bg-white border rounded-lg p-4">
                <p className="text-sm text-gray-700">{quote.terms_conditions}</p>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Created:</span> {formatDate(quote.created_at)}
              </div>
              <div>
                <span className="font-medium">Last Updated:</span> {formatDate(quote.updated_at)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => window.print()}>
            Print Quote
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};