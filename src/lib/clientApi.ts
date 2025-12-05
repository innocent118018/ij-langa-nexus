import { supabase } from '@/integrations/supabase/client';

// API client helper for authenticated requests
const clientApi = {
  // Get auth token from current session
  async getToken(): Promise<string | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  },

  // Make authenticated GET request
  async get<T>(endpoint: string): Promise<T> {
    const token = await this.getToken();
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },

  // Make authenticated POST request
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const token = await this.getToken();
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },

  // Make authenticated PUT request
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const token = await this.getToken();
    
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },

  // Make authenticated DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    const token = await this.getToken();
    
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },

  // Invoke Supabase Edge Function
  async invokeFunction<T>(functionName: string, body?: unknown): Promise<T> {
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: body as Record<string, unknown>,
    });

    if (error) throw error;
    return data as T;
  },
};

export default clientApi;
