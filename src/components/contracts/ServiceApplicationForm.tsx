import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface ServiceApplicationFormProps {
  contractId: string;
  packageName: string;
  onComplete: () => void;
  onBack: () => void;
}

export const ServiceApplicationForm = ({ contractId, packageName, onComplete, onBack }: ServiceApplicationFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    businessName: '',
    industry: '',
    country: 'South Africa',
    city: '',
    isOwnerDirector: null as boolean | null,
    operatingDuration: '',
    estimatedRevenue: '',
    taxCompliant: null as boolean | null,
    mainChallenge: '',
    termsAccepted: false,
  });
  const { toast } = useToast();

  const challenges = [
    'Our revenue/profit is down, and I am worried.',
    'I want to grow the business, but I\'m not sure what products or services to focus on.',
    'We have a big customer or supplier that we\'re reliant on.',
    'Cash flow is a worry every month or quarter.',
    'We\'re always hoping that we\'ll get new customers every month.',
    'Our product/service is seen as a commodity.',
    'We\'ve been getting complaints from customers.',
    'I\'m too busy; I\'m the "go-to" person for everything.',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      toast({
        title: "Terms Not Accepted",
        description: "Please accept the terms and conditions",
        variant: "destructive"
      });
      return;
    }

    if (formData.isOwnerDirector === null || formData.taxCompliant === null) {
      toast({
        title: "Missing Information",
        description: "Please answer all required questions",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('service_applications')
        .insert({
          contract_id: contractId,
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          contact_number: formData.contactNumber,
          business_name: formData.businessName,
          industry: formData.industry,
          country: formData.country,
          city: formData.city,
          is_owner_director: formData.isOwnerDirector,
          operating_duration: formData.operatingDuration,
          estimated_revenue: formData.estimatedRevenue,
          tax_compliant: formData.taxCompliant,
          main_challenge: formData.mainChallenge,
          selected_package: packageName,
          terms_accepted: formData.termsAccepted,
          application_status: 'submitted'
        });

      if (error) throw error;

      // Update contract status
      await supabase
        .from('service_contracts')
        .update({ contract_status: 'signed', signed_at: new Date().toISOString() })
        .eq('id', contractId);

      onComplete();
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Name & Surname *</Label>
          <Input
            id="fullName"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact">Contact Number *</Label>
          <Input
            id="contact"
            required
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="business">Business Name</Label>
          <Input
            id="business"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Are you the owner and/or director of the business? *</Label>
        <RadioGroup
          value={formData.isOwnerDirector?.toString()}
          onValueChange={(value) => setFormData({ ...formData, isOwnerDirector: value === 'true' })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="owner-yes" />
            <Label htmlFor="owner-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="owner-no" />
            <Label htmlFor="owner-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">How long have you been operating the entity? *</Label>
        <Select value={formData.operatingDuration} onValueChange={(value) => setFormData({ ...formData, operatingDuration: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="less-than-1">Less than 1 year</SelectItem>
            <SelectItem value="1-2">1-2 years</SelectItem>
            <SelectItem value="3-5">3-5 years</SelectItem>
            <SelectItem value="5-10">5-10 years</SelectItem>
            <SelectItem value="10+">More than 10 years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="revenue">What is the estimated revenue for the next 12 months? *</Label>
        <Select value={formData.estimatedRevenue} onValueChange={(value) => setFormData({ ...formData, estimatedRevenue: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select revenue range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="less-than-1m">Less than R1 million</SelectItem>
            <SelectItem value="1-5m">R1-5 million</SelectItem>
            <SelectItem value="5-10m">R5-10 million</SelectItem>
            <SelectItem value="10m+">More than R10 million</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Is your entity tax compliant at SARS? *</Label>
        <RadioGroup
          value={formData.taxCompliant?.toString()}
          onValueChange={(value) => setFormData({ ...formData, taxCompliant: value === 'true' })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="tax-yes" />
            <Label htmlFor="tax-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="tax-no" />
            <Label htmlFor="tax-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="challenge">What is the problem you as the business owner struggle with most?</Label>
        <Select value={formData.mainChallenge} onValueChange={(value) => setFormData({ ...formData, mainChallenge: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select main challenge" />
          </SelectTrigger>
          <SelectContent>
            {challenges.map((challenge) => (
              <SelectItem key={challenge} value={challenge}>
                {challenge}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={formData.termsAccepted}
          onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked as boolean })}
        />
        <label htmlFor="terms" className="text-sm">
          Click here to indicate you have read and agree to our{' '}
          <a href="/policies/terms-conditions" target="_blank" className="text-primary underline">
            Terms and Conditions
          </a>
        </label>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} disabled={submitting}>
          Back
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {submitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </form>
  );
};