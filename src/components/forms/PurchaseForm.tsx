import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ShoppingCart, FileText, Building2, Phone, Mail, User, Calendar, MapPin } from 'lucide-react';

interface PurchaseFormProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    processing_time?: string;
    requirements?: string;
  };
  isQuote?: boolean;
  children: React.ReactNode;
}

interface FormData {
  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternativePhone: string;
  
  // Company Information
  companyName: string;
  registrationNumber: string;
  vatNumber: string;
  industry: string;
  companySize: string;
  
  // Address Information
  physicalAddress: string;
  postalAddress: string;
  city: string;
  province: string;
  postalCode: string;
  
  // Service Requirements
  urgency: string;
  preferredStartDate: string;
  additionalServices: string[];
  specialRequirements: string;
  
  // Document Requirements
  documentsAvailable: string[];
  missingDocuments: string;
  
  // Budget and Payment
  budgetRange: string;
  paymentMethod: string;
  
  // Additional Information
  referralSource: string;
  additionalNotes: string;
  marketingConsent: boolean;
  termsAccepted: boolean;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ service, isQuote = false, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    alternativePhone: '',
    companyName: '',
    registrationNumber: '',
    vatNumber: '',
    industry: '',
    companySize: '',
    physicalAddress: '',
    postalAddress: '',
    city: '',
    province: '',
    postalCode: '',
    urgency: '',
    preferredStartDate: '',
    additionalServices: [],
    specialRequirements: '',
    documentsAvailable: [],
    missingDocuments: '',
    budgetRange: '',
    paymentMethod: '',
    referralSource: '',
    additionalNotes: '',
    marketingConsent: false,
    termsAccepted: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxArrayChange = (name: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
        ? [...prev[name as keyof FormData] as string[], value]
        : (prev[name as keyof FormData] as string[]).filter(item => item !== value)
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required contact information fields.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.termsAccepted) {
      toast({
        title: "Terms and Conditions",
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Send email with form data
      const { data, error } = await supabase.functions.invoke('send-purchase-form', {
        body: {
          service,
          formData,
          isQuote,
          submissionDate: new Date().toISOString(),
        }
      });

      if (error) throw error;

      toast({
        title: isQuote ? "Quote Request Submitted" : "Purchase Order Submitted",
        description: `Your ${isQuote ? 'quote request' : 'purchase order'} has been sent successfully. We'll contact you within 24 hours.`,
      });

      setIsOpen(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        alternativePhone: '',
        companyName: '',
        registrationNumber: '',
        vatNumber: '',
        industry: '',
        companySize: '',
        physicalAddress: '',
        postalAddress: '',
        city: '',
        province: '',
        postalCode: '',
        urgency: '',
        preferredStartDate: '',
        additionalServices: [],
        specialRequirements: '',
        documentsAvailable: [],
        missingDocuments: '',
        budgetRange: '',
        paymentMethod: '',
        referralSource: '',
        additionalNotes: '',
        marketingConsent: false,
        termsAccepted: false,
      });

    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isQuote ? <FileText className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
            {isQuote ? 'Request Quote' : 'Purchase Order'} - {service.name}
          </DialogTitle>
          <DialogDescription>
            Please provide the following information to process your {isQuote ? 'quote request' : 'order'}.
            All required fields are marked with an asterisk (*).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Service Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Service Name</Label>
                  <p className="text-sm font-medium">{service.name}</p>
                </div>
                <div>
                  <Label>Price</Label>
                  <p className="text-sm font-medium">
                    {service.price > 0 ? `R${Math.round(service.price * 1.15).toLocaleString()} (incl. VAT)` : 'Custom Quote'}
                  </p>
                </div>
                {service.processing_time && (
                  <div>
                    <Label>Processing Time</Label>
                    <p className="text-sm">{service.processing_time}</p>
                  </div>
                )}
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="alternativePhone">Alternative Phone</Label>
                  <Input
                    id="alternativePhone"
                    name="alternativePhone"
                    type="tel"
                    value={formData.alternativePhone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="vatNumber">VAT Number</Label>
                  <Input
                    id="vatNumber"
                    name="vatNumber"
                    value={formData.vatNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select onValueChange={(value) => handleSelectChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="automotive">Automotive</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="mining">Mining</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select onValueChange={(value) => handleSelectChange('companySize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5 employees</SelectItem>
                      <SelectItem value="6-20">6-20 employees</SelectItem>
                      <SelectItem value="21-50">21-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="200+">200+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="physicalAddress">Physical Address</Label>
                  <Textarea
                    id="physicalAddress"
                    name="physicalAddress"
                    value={formData.physicalAddress}
                    onChange={handleInputChange}
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="postalAddress">Postal Address</Label>
                  <Textarea
                    id="postalAddress"
                    name="postalAddress"
                    value={formData.postalAddress}
                    onChange={handleInputChange}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="province">Province</Label>
                  <Select onValueChange={(value) => handleSelectChange('province', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eastern-cape">Eastern Cape</SelectItem>
                      <SelectItem value="free-state">Free State</SelectItem>
                      <SelectItem value="gauteng">Gauteng</SelectItem>
                      <SelectItem value="kwazulu-natal">KwaZulu-Natal</SelectItem>
                      <SelectItem value="limpopo">Limpopo</SelectItem>
                      <SelectItem value="mpumalanga">Mpumalanga</SelectItem>
                      <SelectItem value="northern-cape">Northern Cape</SelectItem>
                      <SelectItem value="north-west">North West</SelectItem>
                      <SelectItem value="western-cape">Western Cape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Service Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select onValueChange={(value) => handleSelectChange('urgency', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="urgent">Urgent (within 1 week)</SelectItem>
                      <SelectItem value="critical">Critical (within 2-3 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferredStartDate">Preferred Start Date</Label>
                  <Input
                    id="preferredStartDate"
                    name="preferredStartDate"
                    type="date"
                    value={formData.preferredStartDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Additional Services Required</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {[
                      'Bookkeeping',
                      'Payroll',
                      'Tax Returns',
                      'VAT Returns',
                      'CIPC Services',
                      'Legal Documentation',
                      'Compliance Services',
                      'Financial Statements',
                      'Business Plans',
                      'Consulting'
                    ].map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={`additional-${service}`}
                          checked={formData.additionalServices.includes(service)}
                          onCheckedChange={(checked) => 
                            handleCheckboxArrayChange('additionalServices', service, checked as boolean)
                          }
                        />
                        <Label htmlFor={`additional-${service}`} className="text-sm">
                          {service}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="specialRequirements">Special Requirements</Label>
                  <Textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Please describe any special requirements or specific needs for this service..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget and Payment */}
          {!isQuote && (
            <Card>
              <CardHeader>
                <CardTitle>Budget and Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budgetRange">Budget Range</Label>
                    <Select onValueChange={(value) => handleSelectChange('budgetRange', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-1000">Under R1,000</SelectItem>
                        <SelectItem value="1000-5000">R1,000 - R5,000</SelectItem>
                        <SelectItem value="5000-10000">R5,000 - R10,000</SelectItem>
                        <SelectItem value="10000-25000">R10,000 - R25,000</SelectItem>
                        <SelectItem value="25000-50000">R25,000 - R50,000</SelectItem>
                        <SelectItem value="over-50000">Over R50,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="paymentMethod">Preferred Payment Method</Label>
                    <Select onValueChange={(value) => handleSelectChange('paymentMethod', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eft">EFT/Bank Transfer</SelectItem>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="debit-order">Debit Order</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="installments">Payment Plan/Installments</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="referralSource">How did you hear about us?</Label>
                  <Select onValueChange={(value) => handleSelectChange('referralSource', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select referral source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Search</SelectItem>
                      <SelectItem value="referral">Referral from friend/colleague</SelectItem>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="advertisement">Advertisement</SelectItem>
                      <SelectItem value="existing-client">Existing Client</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Consent */}
          <Card>
            <CardHeader>
              <CardTitle>Terms and Consent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketingConsent"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, marketingConsent: checked as boolean }))
                    }
                  />
                  <Label htmlFor="marketingConsent" className="text-sm">
                    I consent to receiving marketing communications from IJ Langa Consulting about services and promotions.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="termsAccepted"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))
                    }
                    required
                  />
                  <Label htmlFor="termsAccepted" className="text-sm">
                    I accept the{' '}
                    <a href="/policies/terms" target="_blank" className="text-primary hover:underline">
                      Terms and Conditions
                    </a>{' '}
                    and{' '}
                    <a href="/policies/privacy" target="_blank" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                    . *
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : (isQuote ? 'Request Quote' : 'Submit Order')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseForm;