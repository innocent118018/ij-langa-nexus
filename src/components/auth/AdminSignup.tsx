import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ADMIN_EMAILS = [
  'info@ijlanga.co.za',
  'billings@ijlanga.co.za',
  'orders@ijlanga.co.za',
  'innocent@ijlanga.co.za',
  'correspondence@ijlanga.co.za',
  'ij.langa11@gmail.com',
  'ij.langa@live.co.za',
  'ij.langaitc@consultant.com'
];

export const AdminSignup = () => {
  const [loading, setLoading] = useState(false);

  const handleAdminSignup = async () => {
    setLoading(true);
    
    try {
      const password = 'Innocent118018@12345679';
      
      for (const email of ADMIN_EMAILS) {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/dashboard`
            }
          });
          
          if (error) {
            if (error.message.includes('User already registered')) {
              toast.success(`Admin account ${email} already exists`);
            } else {
              toast.error(`Failed to create ${email}: ${error.message}`);
            }
          } else {
            toast.success(`Admin account created for ${email}`);
          }
        } catch (err) {
          console.error(`Error creating admin account for ${email}:`, err);
        }
      }
      
      toast.success('Admin account setup completed');
    } catch (error) {
      console.error('Error in admin signup:', error);
      toast.error('Failed to create admin accounts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Admin Accounts</CardTitle>
        <CardDescription>
          Set up administrator accounts for the system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Admin Emails to Create:</Label>
          <div className="text-sm text-muted-foreground space-y-1">
            {ADMIN_EMAILS.map(email => (
              <div key={email}>{email}</div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Password (Same for all accounts):</Label>
          <Input 
            type="password" 
            value="Innocent118018@12345679" 
            readOnly 
            className="bg-muted"
          />
        </div>
        
        <Button 
          onClick={handleAdminSignup}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Creating Accounts...' : 'Create Admin Accounts'}
        </Button>
      </CardContent>
    </Card>
  );
};