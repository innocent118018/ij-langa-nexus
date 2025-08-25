
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  customers: any[];
  services: any[];
}

export const CreateInvoiceModal = ({ isOpen, onClose, customers, services }: CreateInvoiceModalProps) => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sendMethod, setSendMethod] = useState<'email' | 'whatsapp' | 'both'>('email');
  const { toast } = useToast();

  const selectedServicesList = services.filter(service => selectedServices.includes(service.id));
  const subtotal = selectedServicesList.reduce((sum, service) => sum + Number(service.price), 0);
  const vatAmount = subtotal * 0.15;
  const total = subtotal + vatAmount;

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleCreateInvoice = () => {
    if (!selectedCustomer || selectedServices.length === 0) {
      toast({
        title: "Error",
        description: "Please select a customer and at least one service",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically create the invoice in the database
    toast({
      title: "Success",
      description: `Invoice created and sent via ${sendMethod}`,
    });
    
    // Reset form
    setSelectedCustomer('');
    setSelectedServices([]);
    setSendMethod('email');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Customer Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Select Customer</label>
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a customer..." />
              </SelectTrigger>
              <SelectContent>
                {customers.map(customer => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Services Selection */}
          {selectedCustomer && (
            <div>
              <label className="block text-sm font-medium mb-2">Select Services</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                {services.map(service => (
                  <div key={service.id} className="flex items-center space-x-2 p-2 border rounded">
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => handleServiceToggle(service.id)}
                    />
                    <label htmlFor={service.id} className="flex-1 text-sm">
                      <div className="font-medium">{service.name}</div>
                      <div className="text-gray-500">R {Number(service.price).toFixed(2)}</div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invoice Summary */}
          {selectedServices.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Invoice Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedServicesList.map(service => (
                    <div key={service.id} className="flex justify-between">
                      <span>{service.name}</span>
                      <span>R {Number(service.price).toFixed(2)}</span>
                    </div>
                  ))}
                  <hr />
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (15%):</span>
                    <span>R {vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>R {total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Send Method */}
          {selectedServices.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Send Method</label>
              <div className="flex space-x-4">
                <Button
                  variant={sendMethod === 'email' ? 'default' : 'outline'}
                  onClick={() => setSendMethod('email')}
                  className="flex items-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </Button>
                <Button
                  variant={sendMethod === 'whatsapp' ? 'default' : 'outline'}
                  onClick={() => setSendMethod('whatsapp')}
                  className="flex items-center space-x-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp</span>
                </Button>
                <Button
                  variant={sendMethod === 'both' ? 'default' : 'outline'}
                  onClick={() => setSendMethod('both')}
                  className="flex items-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <MessageSquare className="h-4 w-4" />
                  <span>Both</span>
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateInvoice}
              disabled={!selectedCustomer || selectedServices.length === 0}
            >
              Create & Send Invoice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
