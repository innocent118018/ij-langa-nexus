import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

type VerificationStatus = 'verifying' | 'success' | 'error';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Check if we have a valid session after email verification
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (session) {
          setStatus('success');
          setTimeout(() => navigate('/auth/login'), 2000);
        } else {
          // No session yet, might be a direct link
          const token = searchParams.get('token');
          const type = searchParams.get('type');
          
          if (type === 'signup' || type === 'email') {
            setStatus('success');
            setTimeout(() => navigate('/auth/login'), 2000);
          } else {
            setStatus('error');
            setErrorMessage('Invalid verification link');
          }
        }
      } catch (error: any) {
        setStatus('error');
        setErrorMessage(error.message || 'Verification failed');
      }
    };

    verifyEmail();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-xl border-border/50">
        <CardHeader className="text-center space-y-4">
          {status === 'verifying' && (
            <>
              <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <CardTitle className="text-2xl font-bold">Verifying Email</CardTitle>
              <CardDescription>
                Please wait while we verify your email address...
              </CardDescription>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-emerald-600">Email Verified!</CardTitle>
              <CardDescription>
                Your email has been verified successfully. Redirecting to login...
              </CardDescription>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto h-14 w-14 rounded-full bg-destructive/10 flex items-center justify-center">
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
              <CardTitle className="text-2xl font-bold text-destructive">Verification Failed</CardTitle>
              <CardDescription>
                {errorMessage || 'The verification link may be expired or invalid.'}
              </CardDescription>
            </>
          )}
        </CardHeader>
        
        {status === 'error' && (
          <CardContent className="space-y-4">
            <Button
              className="w-full"
              onClick={() => navigate('/auth/login')}
            >
              Go to Login
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/auth/register')}
            >
              Register Again
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
