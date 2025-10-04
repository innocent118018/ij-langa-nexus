import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OTPInput } from './OTPInput';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MessageCircle, Phone, Shield } from 'lucide-react';

interface WhatsAppOTPLoginProps {
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
}

export const WhatsAppOTPLogin: React.FC<WhatsAppOTPLoginProps> = ({
  onSuccess,
  onError
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const { toast } = useToast();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Add +27 prefix if not present
    if (digits.startsWith('0')) {
      return '+27' + digits.substring(1);
    } else if (digits.startsWith('27')) {
      return '+' + digits;
    } else if (!digits.startsWith('+')) {
      return '+27' + digits;
    }
    
    return digits;
  };

  const sendOTP = async () => {
    if (!phone) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(phone);
      
      const { data, error } = await supabase.functions.invoke('send-whatsapp-otp', {
        body: {
          phone: formattedPhone,
          method: 'whatsapp',
          username: isNewUser ? username : undefined
        }
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        toast({
          title: "OTP Sent",
          description: "Check your WhatsApp for the verification code",
        });
        setStep('otp');
      } else {
        throw new Error(data?.error || 'Failed to send OTP');
      }
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      const errorMessage = error.message || 'Failed to send OTP';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(phone);
      
      const { data, error } = await supabase.functions.invoke('verify-whatsapp-otp', {
        body: {
          phone: formattedPhone,
          otp: otp,
          autoRedirect: true
        }
      });

      if (error) {
        throw error;
      }

      if (data?.success) {
        toast({
          title: "Login Successful",
          description: data.is_new_user ? "Welcome! Your account has been created." : "Welcome back!",
        });

        // Set the session with the tokens
        if (data.access_token) {
          await supabase.auth.setSession({
            access_token: data.access_token,
            refresh_token: data.refresh_token
          });
        }

        onSuccess?.(data);
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        throw new Error(data?.error || 'Failed to verify OTP');
      }
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      const errorMessage = error.message || 'Invalid or expired OTP';
      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
      });
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep('phone');
    setOtp('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 dark:bg-green-900 rounded-full p-3">
            <MessageCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">
          {step === 'phone' ? 'WhatsApp Login' : 'Verify OTP'}
        </CardTitle>
        <CardDescription>
          {step === 'phone' 
            ? 'Enter your phone number to receive a WhatsApp OTP' 
            : 'Enter the 6-digit code sent to your WhatsApp'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {step === 'phone' ? (
          <>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+27 81 234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="newUser"
                  checked={isNewUser}
                  onChange={(e) => setIsNewUser(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="newUser" className="text-sm">
                  I'm a new user
                </label>
              </div>
              
              {isNewUser && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              )}
            </div>
            
            <Button
              onClick={sendOTP}
              disabled={isLoading || !phone || (isNewUser && !username)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send WhatsApp OTP
                </>
              )}
            </Button>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secure WhatsApp verification</span>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Code sent to {phone}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <OTPInput
                value={otp}
                onChange={setOtp}
                disabled={isLoading}
              />
              
              <div className="text-center text-sm text-muted-foreground">
                Check your WhatsApp for the verification code
              </div>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={verifyOTP}
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Login'
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isLoading}
                className="w-full"
              >
                Back to Phone Number
              </Button>
            </div>
          </>
        )}
        
        <div className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </CardContent>
    </Card>
  );
};