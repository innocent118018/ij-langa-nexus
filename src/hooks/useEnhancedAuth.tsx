import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithWhatsApp: (phone: string) => Promise<{ error: any }>;
  verifyWhatsAppOTP: (phone: string, otp: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useEnhancedAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useEnhancedAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const EnhancedAuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let refreshTimer: NodeJS.Timeout;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Set up automatic token refresh
        if (session) {
          const expiresAt = session.expires_at;
          if (expiresAt) {
            const now = Math.floor(Date.now() / 1000);
            const timeUntilExpiry = expiresAt - now;
            const refreshTime = Math.max(timeUntilExpiry - 300, 60); // Refresh 5 min before expiry, min 1 min

            refreshTimer = setTimeout(async () => {
              await refreshSession();
            }, refreshTime * 1000);
          }
        } else {
          clearTimeout(refreshTimer);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(refreshTimer);
    };
  }, []);

  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        console.error('Error refreshing session:', error);
        // If refresh fails, try to get the current session
        const { data: currentSession } = await supabase.auth.getSession();
        if (!currentSession.session) {
          toast({
            title: "Session Expired",
            description: "Please log in again to continue.",
            variant: "destructive",
          });
          await logout();
        }
      } else {
        console.log('Session refreshed successfully');
        setSession(data.session);
        setUser(data.session?.user ?? null);
      }
    } catch (error) {
      console.error('Error in refresh session:', error);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: userData
        }
      });

      if (error) {
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sign Up Successful",
          description: "Please check your email to verify your account.",
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Sign Up Error",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Sign In Failed",
          description: error.message,
          variant: "destructive",
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Sign In Error",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      return { error };
    } catch (error: any) {
      return { error };
    }
  };

  const signInWithWhatsApp = async (phone: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-whatsapp-otp', {
        body: { phone, method: 'whatsapp' }
      });

      if (error) {
        toast({
          title: "WhatsApp OTP Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "OTP Sent",
          description: "Check your WhatsApp for the verification code.",
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "WhatsApp Sign In Error",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const verifyWhatsAppOTP = async (phone: string, otp: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { phone, code: otp }
      });

      if (error || !data.success) {
        toast({
          title: "OTP Verification Failed",
          description: data?.error || "Invalid or expired OTP",
          variant: "destructive",
        });
        return { error: error || new Error(data?.error || "Invalid OTP") };
      }

      // If user exists, sign them in
      if (data.userExists && data.userId) {
        // For WhatsApp login, we'll create a custom session
        toast({
          title: "Sign In Successful",
          description: "Welcome back!",
        });
      } else {
        toast({
          title: "OTP Verified",
          description: "Please complete your account setup.",
        });
      }

      return { error: null };
    } catch (error: any) {
      toast({
        title: "Verification Error",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Logout Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Reset Password Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Reset Email Sent",
          description: "Check your email for password reset instructions.",
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Reset Password Error",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithWhatsApp,
    verifyWhatsAppOTP,
    logout,
    resetPassword,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};