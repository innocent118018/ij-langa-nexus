import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { WhatsAppOTPLogin } from '@/components/auth/WhatsAppOTPLogin';
import { CustomerLogin } from '@/components/auth/CustomerLogin';
import { AdminSignup } from '@/components/auth/AdminSignup';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import { Users, Shield } from 'lucide-react';

type AuthType = 'admin' | 'customer';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [authType, setAuthType] = useState<AuthType>('admin');
  const navigate = useNavigate();
  const { currentAccount } = useCustomerAuth();

  useEffect(() => {
    // Check if admin user is already authenticated
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
        return;
      }
      
      // Check if customer is already authenticated
      if (currentAccount) {
        navigate('/dashboard');
      }
    };
    checkUser();
  }, [navigate, currentAccount]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        });
        
        if (error) throw error;
        toast.success('Check your email for the confirmation link');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // If customer login is selected, show customer login component
  if (authType === 'customer') {
    return <CustomerLogin />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="/lovable-uploads/9ba4ae64-601e-4162-9165-29b1004a73d1.png" 
              alt="IJ Langa Logo" 
              className="h-8 w-auto"
            />
            <img 
              src="/lovable-uploads/3a4a6cc6-a0f7-4d80-831d-5c7bddc9bad0.png" 
              alt="IJ Langa Logo" 
              className="h-8 w-auto"
            />
          </div>
          <CardTitle className="text-center text-2xl">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </CardTitle>
          
          {/* Auth Type Selector */}
          <div className="flex gap-2 mt-4">
            <Button
              variant={authType === 'admin' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAuthType('admin')}
              className="flex-1 gap-2"
            >
              <Shield className="h-4 w-4" />
              Admin Portal
            </Button>
            <Button
              variant={(authType as string) === 'customer' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAuthType('customer')}
              className="flex-1 gap-2"
            >
              <Users className="h-4 w-4" />
              Customer Portal
            </Button>
          </div>
          
          <p className="text-center text-muted-foreground text-sm mt-2">
            {authType === 'admin' 
              ? 'Admin access with full system control'
              : 'Customer access with multi-account support'
            }
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="email">Login</TabsTrigger>
              <TabsTrigger value="admin-setup">Admin Setup</TabsTrigger>
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            </TabsList>
            
            <TabsContent value="email">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="admin-setup">
              <AdminSignup />
            </TabsContent>
            
            <TabsContent value="whatsapp">
              <WhatsAppOTPLogin />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}