import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type PortalType = 'admin' | 'customer';
type LoginMethod = 'email' | 'whatsapp';

export const Login = () => {
  const [portal, setPortal] = useState<PortalType>('customer');
  const [method, setMethod] = useState<LoginMethod>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Check user role to redirect appropriately
        const { data: profile } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        if (profile?.role === 'admin' || profile?.role === 'super_admin') {
          navigate('/dashboard/admin');
        } else {
          navigate('/dashboard');
        }
      }
    };
    checkSession();
  }, [navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both email and password',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.session) {
        // Check user role
        const { data: userRole } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.session.user.id)
          .maybeSingle();

        toast({
          title: 'Success',
          description: 'Logged in successfully'
        });

        // Redirect based on role and portal selection
        if (portal === 'admin' && (userRole?.role === 'admin' || userRole?.role === 'super_admin')) {
          navigate('/dashboard/admin');
        } else if (portal === 'customer') {
          navigate('/dashboard');
        } else {
          toast({
            title: 'Access Denied',
            description: 'You do not have permission to access the admin portal',
            variant: 'destructive'
          });
          await supabase.auth.signOut();
        }
      }
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid credentials',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone) {
      toast({
        title: 'Error',
        description: 'Please enter your WhatsApp number',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      // Call the send-whatsapp-otp edge function
      const { data, error } = await supabase.functions.invoke('send-whatsapp-otp', {
        body: { phone, method: 'whatsapp' }
      });

      if (error) throw error;

      toast({
        title: 'OTP Sent',
        description: 'Please check your WhatsApp for the verification code'
      });

      // Navigate to OTP verification page
      navigate('/auth/otp-verification', { state: { phone, portal } });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send OTP',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-gradient-to-b from-background to-secondary/10 px-4 py-10">
      <Card className="w-full max-w-md rounded-2xl shadow-lg border">
        <div className="px-6 pt-6 pb-4 border-b text-center">
          {/* Logo */}
          <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
            IJ
          </div>
          <h1 className="text-xl font-semibold">Sign In</h1>
          <p className="text-xs text-muted-foreground mt-1">
            {portal === 'admin'
              ? 'Admin access with full system control.'
              : 'Customer portal for invoices, contracts and services.'}
          </p>

          {/* Portal Toggle */}
          <div className="mt-4 flex text-xs rounded-full bg-secondary p-1">
            <button
              type="button"
              className={`flex-1 py-2 rounded-full transition-all ${
                portal === 'admin' ? 'bg-background shadow-sm font-medium' : ''
              }`}
              onClick={() => setPortal('admin')}
            >
              Admin Portal
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-full transition-all ${
                portal === 'customer' ? 'bg-background shadow-sm font-medium' : ''
              }`}
              onClick={() => setPortal('customer')}
            >
              Customer Portal
            </button>
          </div>

          {/* Login Method Toggle */}
          <div className="mt-3 flex text-xs rounded-full bg-secondary p-1">
            <button
              type="button"
              className={`flex-1 py-2 rounded-full transition-all ${
                method === 'email' ? 'bg-background shadow-sm font-medium' : ''
              }`}
              onClick={() => setMethod('email')}
            >
              Email login
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-full transition-all ${
                method === 'whatsapp' ? 'bg-background shadow-sm font-medium' : ''
              }`}
              onClick={() => setMethod('whatsapp')}
            >
              WhatsApp
            </button>
          </div>
        </div>

        <form 
          className="px-6 pb-6 pt-4 space-y-3" 
          onSubmit={method === 'email' ? handleEmailLogin : handleWhatsAppLogin}
        >
          {method === 'email' ? (
            <>
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm"
                  disabled={loading}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-sm"
                  disabled={loading}
                />
              </div>
            </>
          ) : (
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">
                WhatsApp number
              </label>
              <Input
                type="tel"
                placeholder="+27 82 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-sm"
                disabled={loading}
              />
              <p className="text-[11px] text-muted-foreground">
                We'll send you a one-time verification code via WhatsApp.
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full mt-1 bg-primary text-primary-foreground"
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Sign In'}
          </Button>

          <div className="text-center mt-3 text-xs text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/auth" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>

          {method === 'email' && (
            <div className="text-center text-xs text-muted-foreground">
              <Link to="/auth/reset-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};
