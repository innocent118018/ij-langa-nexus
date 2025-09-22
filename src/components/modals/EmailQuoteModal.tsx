import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SalesQuote } from '@/hooks/useSalesQuotes';
import { Customer } from '@/hooks/useCustomers';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Mail } from 'lucide-react';

interface EmailQuoteModalProps {
  quote: SalesQuote | null;
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EmailQuoteModal: React.FC<EmailQuoteModalProps> = ({
  quote,
  customer,
  open,
  onOpenChange
}) => {
  const [loading, setLoading] = useState(false);
  const [emailData, setEmailData] = useState({
    to: customer?.email || '',
    subject: '',
    body: ''
  });

  React.useEffect(() => {
    if (quote && customer) {
      const expiryDate = quote.expiry_date ? new Date(quote.expiry_date).toLocaleDateString('en-GB') : 'N/A';
      const issueDate = new Date(quote.issue_date).toLocaleDateString('en-GB');
      const formatCurrency = (amount: number) => new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        minimumFractionDigits: 2,
      }).format(amount);

      setEmailData({
        to: customer.email,
        subject: `Quotation #${quote.quote_number} – Valid Until ${expiryDate}`,
        body: `Dear ${customer.customer_name},

Thank you for requesting a quotation. Please find attached your sales quote for ${quote.description || 'our services'}.

Quote Summary:
Quote Number: ${quote.quote_number}
Date Issued: ${issueDate}
Total Amount: ${formatCurrency(quote.total_amount)}
Valid Until: ${expiryDate}

Please review the details and let us know if you have any questions or require modifications.

We'd love to know how we're doing! Please take a moment to leave us a review:

🌟 Leave a Review
https://g.page/r/CfawCvt7xR_1EAE/review

Thank you for your business. We value your partnership and look forward to continuing to serve you.

Warm regards,
Automated Billing System
IJ Langa Consulting
📞 013 004 0620 | 📧 info@ijlanga.co.za
🌐 www.ijlanga.co.za`
      });
    }
  }, [quote, customer]);

  const handleSendEmail = async () => {
    if (!quote || !customer) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('send-quote-email', {
        body: {
          quote,
          customer,
          emailData
        }
      });

      if (error) throw error;

      toast.success('Quote emailed successfully!');
      onOpenChange(false);
    } catch (error: any) {
      console.error('Email error:', error);
      toast.error('Failed to send email: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!quote || !customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Quote #{quote.quote_number}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              type="email"
              value={emailData.to}
              onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
              placeholder="customer@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={emailData.subject}
              onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              placeholder="Email subject"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Body</Label>
            <Textarea
              id="body"
              value={emailData.body}
              onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
              rows={12}
              placeholder="Email body"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
            <p><strong>Note:</strong> The quote will be attached as a PDF to this email.</p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSendEmail} disabled={loading}>
            {loading ? 'Sending...' : 'Send Email'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};