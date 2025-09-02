import { supabase } from '@/integrations/supabase/client';

class ApiClient {
  private async getAuthHeaders() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('No authentication token available');
    }
    
    return {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    };
  }

  async getUserData(endpoint: string) {
    const headers = await this.getAuthHeaders();
    
    const { data, error } = await supabase.functions.invoke('user-data', {
      body: { endpoint },
      headers
    });
    
    if (error) throw error;
    return data;
  }

  async performUserAction(action: string, data: any) {
    const headers = await this.getAuthHeaders();
    
    const { data: result, error } = await supabase.functions.invoke('user-actions', {
      body: { action, data },
      headers
    });
    
    if (error) throw error;
    return result;
  }
}

export const apiClient = new ApiClient();