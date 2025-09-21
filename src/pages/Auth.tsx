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
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import { useBiometricAuth } from '@/hooks/useBiometricAuth';
import { useAuthProfile } from '@/hooks/useAuthProfile';
import { Users, Shield, Fingerprint } from 'lucide-react';

type AuthType = 'admin' | 'customer';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [authType, setAuthType] = useState<AuthType>('admin');
  const [rememberMe, setRememberMe] = useState(false);
  const [useBiometric, setUseBiometric] = useState(false);
  const navigate = useNavigate();
  const { currentAccount } = useCustomerAuth();
  const { profile } = useAuthProfile();
  const { 
    isSupported: isBiometricSupported, 
    savePassword, 
    authenticateWithBiometric, 
    hasSavedCredential 
  } = useBiometricAuth();

  useEffect(() => {
    // Check if admin user is already authenticated
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && profile) {
        navigate('/dashboard');
        return;
      }
      
      // Check if customer is already authenticated
      if (currentAccount) {
        navigate('/dashboard');
      }
    };
    checkUser();
  }, [navigate, currentAccount, profile]);

  const handleBiometricAuth = async () => {
    if (!email) {
      toast.error('Please enter your email first');
      return;
    }

    setIsLoading(true);
    try {
      const savedPassword = await authenticateWithBiometric(email);
      if (savedPassword) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: savedPassword
        });
        
        if (error) throw error;
        navigate('/dashboard');
        toast.success('Signed in successfully with biometrics!');
      } else {
        toast.error('No saved credentials found for this email');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
        
        // Offer to save password with biometrics
        if (isBiometricSupported && rememberMe) {
          try {
            await savePassword(email, password);
            toast.success('Credentials saved for biometric login!');
          } catch (error) {
            console.error('Failed to save biometric credential:', error);
          }
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        // Save password with biometrics if requested
        if (isBiometricSupported && rememberMe && !hasSavedCredential(email)) {
          try {
            await savePassword(email, password);
            toast.success('Credentials saved for biometric login!');
          } catch (error) {
            console.error('Failed to save biometric credential:', error);
          }
        }
        
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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email Login</TabsTrigger>
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
                
                {/* Biometric Authentication */}
                {isBiometricSupported && hasSavedCredential(email) && !isSignUp && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mb-4"
                    onClick={handleBiometricAuth}
                    disabled={isLoading}
                  >
                    <Fingerprint className="h-4 w-4 mr-2" />
                    Sign in with Biometrics
                  </Button>
                )}

                {/* Remember Me / Save Password */}
                {isBiometricSupported && (
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="rememberMe" className="text-sm">
                      {isSignUp ? 'Save for biometric login' : 'Remember me with biometrics'}
                    </Label>
                  </div>
                )}

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
            
            
            <TabsContent value="whatsapp">
              <WhatsAppOTPLogin />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}