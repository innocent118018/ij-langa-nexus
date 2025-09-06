
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OTPInput } from '@/components/auth/OTPInput';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Phone, User, Building, CreditCard, Lock, Eye, EyeOff, MessageSquare } from 'lucide-react';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [authMethod, setAuthMethod] = useState<'traditional' | 'otp'>('traditional');
  const [otpMethod, setOtpMethod] = useState<'sms' | 'whatsapp'>('sms');
  const [otpStep, setOtpStep] = useState<'request' | 'verify'>('request');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    cellNumber: '',
    whatsappNumber: '',
    businessName: '',
    idNumber: '',
    password: '',
    confirmPassword: '',
    username: '',
    phone: ''
  });

  const { signUp, signIn, signInWithGoogle, resetPassword, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      alert('Please accept the Terms and Conditions');
      return;
    }

    const userData = {
      first_name: formData.firstName,
      surname: formData.surname,
      cell_number: formData.cellNumber,
      whatsapp_number: formData.whatsappNumber,
      business_name: formData.businessName,
      id_number: formData.idNumber
    };

    const { error } = await signUp(formData.email, formData.password, userData);
    
    if (!error) {
      navigate('/dashboard');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await signIn(formData.email, formData.password);
    
    if (!error) {
      navigate('/dashboard');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPassword(formData.email);
    setMode('login');
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleOTPRequest = async () => {
    if (!formData.phone) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    setOtpLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: {
          phone: formData.phone,
          method: otpMethod,
          username: formData.username
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `OTP sent via ${otpMethod.toUpperCase()}`,
      });
      setOtpStep('verify');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive",
      });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOTPVerify = async () => {
    if (otpCode.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit code",
        variant: "destructive",
      });
      return;
    }

    setOtpLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: {
          phone: formData.phone,
          code: otpCode,
          username: formData.username
        }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "Success",
          description: "Phone number verified successfully",
        });
        
        if (data.userExists) {
          // User exists, proceed to login
          navigate('/dashboard');
        } else {
          // New user, continue with registration or create account
          toast({
            title: "Welcome",
            description: "Phone verified! You can now access your account.",
          });
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Invalid OTP",
        variant: "destructive",
      });
    } finally {
      setOtpLoading(false);
    }
  };

  if (mode === 'forgot') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter your email address and we'll send you a reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                Send Reset Link
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setMode('login')}
              >
                Back to Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-lg">
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
          <CardTitle className="text-center">
            {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
          <CardDescription className="text-center">
            {mode === 'signup' 
              ? 'Join IJ Langa Consulting today'
              : 'Sign in to your account'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={authMethod} onValueChange={(value) => setAuthMethod(value as 'traditional' | 'otp')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="traditional">Email & Password</TabsTrigger>
              <TabsTrigger value="otp">Phone & OTP</TabsTrigger>
            </TabsList>

            <TabsContent value="traditional">
              {/* Google Sign In */}
              <Button
                type="button"
                variant="outline"
                className="w-full mb-4"
                onClick={handleGoogleSignIn}
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  className="w-4 h-4 mr-2"
                />
                Continue with Google
              </Button>

              <Separator className="my-4" />

              <form onSubmit={mode === 'signup' ? handleSignUp : handleSignIn} className="space-y-4">
                {mode === 'signup' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="surname">Surname</Label>
                        <Input
                          id="surname"
                          name="surname"
                          required
                          value={formData.surname}
                          onChange={handleInputChange}
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cellNumber">Cell Number</Label>
                      <Input
                        id="cellNumber"
                        name="cellNumber"
                        type="tel"
                        required
                        value={formData.cellNumber}
                        onChange={handleInputChange}
                        placeholder="+27 123 456 789"
                      />
                    </div>

                    <div>
                      <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                      <Input
                        id="whatsappNumber"
                        name="whatsappNumber"
                        type="tel"
                        value={formData.whatsappNumber}
                        onChange={handleInputChange}
                        placeholder="+27 123 456 789"
                      />
                    </div>

                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="Your Business Name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="idNumber">ID Number</Label>
                      <Input
                        id="idNumber"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        placeholder="Your ID Number"
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                    />
                  </div>
                )}

                {mode === 'signup' && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm">
                      I accept the{' '}
                      <a href="/policies/terms" target="_blank" className="text-primary hover:underline">
                        Terms and Conditions
                      </a>{' '}
                      and{' '}
                      <a href="/policies/privacy" target="_blank" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {mode === 'signup' ? 'Create Account' : 'Sign In'}
                </Button>

                {mode === 'login' && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setMode('forgot')}
                  >
                    Forgot Password?
                  </Button>
                )}
              </form>
            </TabsContent>

            <TabsContent value="otp">
              <div className="space-y-4">
                {otpStep === 'request' ? (
                  <>
                    <div>
                      <Label htmlFor="username">Username (Optional)</Label>
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter username"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+27 123 456 789"
                      />
                    </div>

                    <div>
                      <Label>Verification Method</Label>
                      <Select value={otpMethod} onValueChange={(value) => setOtpMethod(value as 'sms' | 'whatsapp')}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sms">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2" />
                              SMS
                            </div>
                          </SelectItem>
                          <SelectItem value="whatsapp">
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              WhatsApp
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      type="button" 
                      className="w-full" 
                      onClick={handleOTPRequest}
                      disabled={otpLoading}
                    >
                      {otpLoading ? 'Sending...' : `Send OTP via ${otpMethod.toUpperCase()}`}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="text-center space-y-4">
                      <h3 className="text-lg font-medium">Enter Verification Code</h3>
                      <p className="text-sm text-muted-foreground">
                        We sent a 6-digit code to {formData.phone} via {otpMethod.toUpperCase()}
                      </p>
                      
                      <OTPInput
                        value={otpCode}
                        onChange={setOtpCode}
                        disabled={otpLoading}
                      />

                      <Button 
                        type="button" 
                        className="w-full" 
                        onClick={handleOTPVerify}
                        disabled={otpLoading || otpCode.length !== 6}
                      >
                        {otpLoading ? 'Verifying...' : 'Verify Code'}
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full"
                        onClick={() => setOtpStep('request')}
                      >
                        Back to Phone Number
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-primary hover:underline"
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
