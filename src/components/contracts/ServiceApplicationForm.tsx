import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ServiceApplicationFormProps {
  contractId: string;
  packageName: string;
  onComplete: () => void;
  onBack: () => void;
}

export const ServiceApplicationForm = ({ contractId, packageName, onComplete, onBack }: ServiceApplicationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "", email: "", contact_number: "", business_name: "", terms_accepted: false
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms_accepted) {
      toast({ title: "Please accept terms", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      await supabase.from('service_applications').insert({
        contract_id: contractId,
        user_id: user.id,
        ...formData,
        selected_package: packageName,
      });

      await supabase.from('service_contracts').update({ contract_status: 'signed', signed_at: new Date().toISOString() }).eq('id', contractId);

      toast({ title: "Application submitted" });
      onComplete();
    } catch (error) {
      toast({ title: "Submission failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Full Name *</Label>
        <Input required value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Email *</Label>
        <Input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Contact Number *</Label>
        <Input required value={formData.contact_number} onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Business Name</Label>
        <Input value={formData.business_name} onChange={(e) => setFormData({ ...formData, business_name: e.target.value })} />
      </div>
      <div className="flex items-center space-x-2">
        <input type="checkbox" checked={formData.terms_accepted} onChange={(e) => setFormData({ ...formData, terms_accepted: e.target.checked })} required />
        <Label>I agree to Terms & Conditions</Label>
      </div>
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>Back</Button>
        <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>
      </div>
    </form>
  );
};
