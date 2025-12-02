import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { WhatsAppOTPLogin } from '@/components/auth/WhatsAppOTPLogin';
import { CustomerLogin } from '@/components/auth/CustomerLogin';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';
import { useBiometricAuth } from '@/hooks/useBiometricAuth';
import { useAuth } from '@/hooks/useAuth';
import { Users, Shield, Fingerprint, ArrowLeft, Mail, Lock, KeyRound } from 'lucide-react';

type AuthType = 'admin' | 'customer';
type AuthMode = 'login' | 'signup' | 'reset' | 'update-password';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [authType, setAuthType] = useState<AuthType>('admin');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const { user } = useAuth();
  const { currentAccount } = useCustomerAuth();
  const { signIn, signUp } = useAuth();
  const { 
    isSupported: isBiometricSupported, 
    savePassword, 
    authenticateWithBiometric, 
    hasSavedCredential 
  } = useBiometricAuth();

  useEffect(() => {
    // Check for password reset token
    const type = searchParams.get('type');
    if (type === 'recovery') {
      setAuthMode('update-password');
    }
  }, [searchParams]);

  useEffect(() => {
    // Check if admin user is already authenticated
    if (user && authMode !== 'update-password') {
      navigate('/dashboard');
      return;
    }
    
    // Check if customer is already authenticated
    if (currentAccount && authMode !== 'update-password') {
      navigate('/dashboard');
    }
  }, [user, navigate, currentAccount, authMode]);

  const handleBiometricAuth = async () => {
    if (!email) {
      toast.error('Please enter your email first');
      return;
    }

    setIsLoading(true);
    try {
      const savedPassword = await authenticateWithBiometric(email);
      if (savedPassword) {
        const { error } = await signIn(email, savedPassword);
        
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

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?type=recovery`,
      });
      
      if (error) throw error;
      toast.success('Password reset email sent! Check your inbox (and spam folder).');
      setAuthMode('login');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) throw error;
      toast.success('Password updated successfully!');
      navigate('/dashboard');
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
      if (authMode === 'signup') {
        const { error } = await signUp(email, password, {});
        
        if (error) throw error;
        toast.success('Account created! Check your email for the confirmation link.');
        
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
        const { error } = await signIn(email, password);
        
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAuthType('admin')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Portal
          </Button>
          <CustomerLogin />
        </div>
      </div>
    );
  }

  // Password Update Form (after reset link clicked)
  if (authMode === 'update-password') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <Card className="w-full max-w-md shadow-xl border-border/50">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <img 
                src="/lovable-uploads/9ba4ae64-601e-4162-9165-29b1004a73d1.png" 
                alt="IJ Langa Logo" 
                className="h-10 w-auto"
              />
            </div>
            <CardTitle className="text-2xl font-bold">Update Password</CardTitle>
            <CardDescription>Enter your new password below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Password Reset Form
  if (authMode === 'reset') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <Card className="w-full max-w-md shadow-xl border-border/50">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <img 
                src="/lovable-uploads/9ba4ae64-601e-4162-9165-29b1004a73d1.png" 
                alt="IJ Langa Logo" 
                className="h-10 w-auto"
              />
            </div>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>Enter your email to receive a password reset link</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setAuthMode('login')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-xl border-border/50">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <img 
              src="/lovable-uploads/9ba4ae64-601e-4162-9165-29b1004a73d1.png" 
              alt="IJ Langa Logo" 
              className="h-10 w-auto"
            />
            <img 
              src="/lovable-uploads/3a4a6cc6-a0f7-4d80-831d-5c7bddc9bad0.png" 
              alt="IJ Langa Logo" 
              className="h-10 w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            {authMode === 'signup' ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
          
          {/* Auth Type Selector */}
          <div className="flex gap-2">
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
              variant={authType as string === 'customer' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAuthType('customer')}
              className="flex-1 gap-2"
            >
              <Users className="h-4 w-4" />
              Customer Portal
            </Button>
          </div>
          
          <CardDescription>
            {authType === 'admin' 
              ? 'Admin access with full system control'
              : 'Customer access with multi-account support'
            }
          </CardDescription>
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
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                
                {/* Biometric Authentication */}
                {isBiometricSupported && hasSavedCredential(email) && authMode === 'login' && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleBiometricAuth}
                    disabled={isLoading}
                  >
                    <Fingerprint className="h-4 w-4 mr-2" />
                    Sign in with Biometrics
                  </Button>
                )}

                {/* Remember Me / Save Password */}
                {isBiometricSupported && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-border"
                    />
                    <Label htmlFor="rememberMe" className="text-sm font-normal">
                      {authMode === 'signup' ? 'Save for biometric login' : 'Remember me with biometrics'}
                    </Label>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Please wait...' : (authMode === 'signup' ? 'Create Account' : 'Sign In')}
                </Button>
                
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setAuthMode(authMode === 'signup' ? 'login' : 'signup')}
                  >
                    {authMode === 'signup' 
                      ? 'Already have an account? Sign In' 
                      : "Don't have an account? Sign Up"
                    }
                  </Button>
                  
                  {authMode === 'login' && (
                    <Button
                      type="button"
                      variant="link"
                      className="w-full text-muted-foreground"
                      onClick={() => setAuthMode('reset')}
                    >
                      Forgot your password?
                    </Button>
                  )}
                </div>
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