import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  role: string;
  email: string;
  created_at: string;
}

export const useAuthProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      return null;
    }
  };

  const validateAuthentication = async (email: string) => {
    try {
      const { data, error } = await supabase.rpc('validate_user_authentication', {
        user_email: email
      });
      
      if (error) {
        console.error('Error validating authentication:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error in validateAuthentication:', error);
      return null;
    }
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const userProfile = await fetchProfile(session.user.id);
        if (userProfile) {
          setProfile({
            ...userProfile,
            email: session.user.email || ''
          });
        }
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetching to avoid recursion
          setTimeout(async () => {
            const userProfile = await fetchProfile(session.user.id);
            if (userProfile) {
              setProfile({
                ...userProfile,
                email: session.user.email || ''
              });
            }
          }, 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setSession(null);
      setProfile(null);
    }
    return { error };
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single();

    if (!error && data) {
      setProfile({
        ...profile!,
        ...data,
        email: user.email || ''
      });
    }

    return { data, error };
  };

  return {
    user,
    session,
    profile,
    loading,
    signOut,
    updateProfile,
    validateAuthentication,
    isAdmin: profile?.role === 'super_admin' || profile?.role === 'admin',
    hasRole: (role: string) => profile?.role === role || profile?.role === 'super_admin'
  };
};