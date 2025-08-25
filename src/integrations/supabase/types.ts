export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      cart_items: {
        Row: {
          created_at: string | null
          id: string
          quantity: number | null
          service_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          quantity?: number | null
          service_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          quantity?: number | null
          service_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      cipc_api_logs: {
        Row: {
          created_at: string | null
          endpoint: string
          error_message: string | null
          id: string
          request_data: Json | null
          response_data: Json | null
          status_code: number | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          error_message?: string | null
          id?: string
          request_data?: Json | null
          response_data?: Json | null
          status_code?: number | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          error_message?: string | null
          id?: string
          request_data?: Json | null
          response_data?: Json | null
          status_code?: number | null
        }
        Relationships: []
      }
      cipc_auditors: {
        Row: {
          act_end_date: string | null
          act_start_date: string | null
          aud_name: string | null
          aud_status_descr: string | null
          aud_type_descr: string | null
          company_id: string | null
          created_at: string | null
          id: string
          profession_descr: string | null
        }
        Insert: {
          act_end_date?: string | null
          act_start_date?: string | null
          aud_name?: string | null
          aud_status_descr?: string | null
          aud_type_descr?: string | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          profession_descr?: string | null
        }
        Update: {
          act_end_date?: string | null
          act_start_date?: string | null
          aud_name?: string | null
          aud_status_descr?: string | null
          aud_type_descr?: string | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          profession_descr?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cipc_auditors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "cipc_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      cipc_capital: {
        Row: {
          cap_amt_share: number | null
          cap_no_shares: number | null
          cap_par: number | null
          cap_prem: number | null
          capital_type_descr: string | null
          company_id: string | null
          created_at: string | null
          id: string
        }
        Insert: {
          cap_amt_share?: number | null
          cap_no_shares?: number | null
          cap_par?: number | null
          cap_prem?: number | null
          capital_type_descr?: string | null
          company_id?: string | null
          created_at?: string | null
          id?: string
        }
        Update: {
          cap_amt_share?: number | null
          cap_no_shares?: number | null
          cap_par?: number | null
          cap_prem?: number | null
          capital_type_descr?: string | null
          company_id?: string | null
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cipc_capital_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "cipc_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      cipc_companies: {
        Row: {
          business_activity: string | null
          business_start_date: string | null
          created_at: string | null
          enterprise_name: string | null
          enterprise_number: string
          enterprise_short_name: string | null
          enterprise_status_description: string | null
          enterprise_type_description: string | null
          financial_year_effective_date: string | null
          financial_year_end: string | null
          id: string
          registration_date: string | null
          tax_number: string | null
          trading_name: string | null
          translated_name: string | null
          updated_at: string | null
        }
        Insert: {
          business_activity?: string | null
          business_start_date?: string | null
          created_at?: string | null
          enterprise_name?: string | null
          enterprise_number: string
          enterprise_short_name?: string | null
          enterprise_status_description?: string | null
          enterprise_type_description?: string | null
          financial_year_effective_date?: string | null
          financial_year_end?: string | null
          id?: string
          registration_date?: string | null
          tax_number?: string | null
          trading_name?: string | null
          translated_name?: string | null
          updated_at?: string | null
        }
        Update: {
          business_activity?: string | null
          business_start_date?: string | null
          created_at?: string | null
          enterprise_name?: string | null
          enterprise_number?: string
          enterprise_short_name?: string | null
          enterprise_status_description?: string | null
          enterprise_type_description?: string | null
          financial_year_effective_date?: string | null
          financial_year_end?: string | null
          id?: string
          registration_date?: string | null
          tax_number?: string | null
          trading_name?: string | null
          translated_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      cipc_company_addresses: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          address_line_3: string | null
          address_line_4: string | null
          address_type: string
          city: string | null
          company_id: string | null
          country: string | null
          created_at: string | null
          id: string
          postal_code: string | null
          region: string | null
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          address_line_3?: string | null
          address_line_4?: string | null
          address_type: string
          city?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          postal_code?: string | null
          region?: string | null
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          address_line_3?: string | null
          address_line_4?: string | null
          address_type?: string
          city?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          postal_code?: string | null
          region?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cipc_company_addresses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "cipc_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      cipc_directors: {
        Row: {
          appointment_date: string | null
          company_id: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          designation: string | null
          director_status: string | null
          director_type: string | null
          first_names: string | null
          id: string
          identity_number: string | null
          initials: string | null
          member_contribution: number | null
          member_size_interest: number | null
          residential_address_1: string | null
          residential_address_2: string | null
          residential_address_3: string | null
          residential_address_4: string | null
          residential_postal_code: string | null
          resignation_date: string | null
          surname: string | null
        }
        Insert: {
          appointment_date?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          designation?: string | null
          director_status?: string | null
          director_type?: string | null
          first_names?: string | null
          id?: string
          identity_number?: string | null
          initials?: string | null
          member_contribution?: number | null
          member_size_interest?: number | null
          residential_address_1?: string | null
          residential_address_2?: string | null
          residential_address_3?: string | null
          residential_address_4?: string | null
          residential_postal_code?: string | null
          resignation_date?: string | null
          surname?: string | null
        }
        Update: {
          appointment_date?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          designation?: string | null
          director_status?: string | null
          director_type?: string | null
          first_names?: string | null
          id?: string
          identity_number?: string | null
          initials?: string | null
          member_contribution?: number | null
          member_size_interest?: number | null
          residential_address_1?: string | null
          residential_address_2?: string | null
          residential_address_3?: string | null
          residential_address_4?: string | null
          residential_postal_code?: string | null
          resignation_date?: string | null
          surname?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cipc_directors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "cipc_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      cipc_filing_history: {
        Row: {
          amount_paid: number | null
          annual_return_date: string | null
          annual_return_year: number | null
          company_id: string | null
          created_at: string | null
          date_filed: string | null
          id: string
          non_compliance_date: string | null
          status: string | null
        }
        Insert: {
          amount_paid?: number | null
          annual_return_date?: string | null
          annual_return_year?: number | null
          company_id?: string | null
          created_at?: string | null
          date_filed?: string | null
          id?: string
          non_compliance_date?: string | null
          status?: string | null
        }
        Update: {
          amount_paid?: number | null
          annual_return_date?: string | null
          annual_return_year?: number | null
          company_id?: string | null
          created_at?: string | null
          date_filed?: string | null
          id?: string
          non_compliance_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cipc_filing_history_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "cipc_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      cipc_history: {
        Row: {
          change_date: string | null
          change_description: string | null
          company_id: string | null
          created_at: string | null
          id: string
        }
        Insert: {
          change_date?: string | null
          change_description?: string | null
          company_id?: string | null
          created_at?: string | null
          id?: string
        }
        Update: {
          change_date?: string | null
          change_description?: string | null
          company_id?: string | null
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cipc_history_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "cipc_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      cipc_secretaries: {
        Row: {
          appointment_date: string | null
          company_id: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          designation: string | null
          first_names: string | null
          id: string
          initials: string | null
          residential_address_1: string | null
          residential_address_2: string | null
          residential_address_3: string | null
          residential_address_4: string | null
          residential_postal_code: string | null
          resignation_date: string | null
          status: string | null
          surname: string | null
          type: string | null
        }
        Insert: {
          appointment_date?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          designation?: string | null
          first_names?: string | null
          id?: string
          initials?: string | null
          residential_address_1?: string | null
          residential_address_2?: string | null
          residential_address_3?: string | null
          residential_address_4?: string | null
          residential_postal_code?: string | null
          resignation_date?: string | null
          status?: string | null
          surname?: string | null
          type?: string | null
        }
        Update: {
          appointment_date?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          designation?: string | null
          first_names?: string | null
          id?: string
          initials?: string | null
          residential_address_1?: string | null
          residential_address_2?: string | null
          residential_address_3?: string | null
          residential_address_4?: string | null
          residential_postal_code?: string | null
          resignation_date?: string | null
          status?: string | null
          surname?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cipc_secretaries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "cipc_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_records: {
        Row: {
          completed_date: string | null
          compliance_type: string
          created_at: string
          due_date: string
          id: string
          is_completed: boolean
          notes: string | null
          reminder_sent: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_date?: string | null
          compliance_type: string
          created_at?: string
          due_date: string
          id?: string
          is_completed?: boolean
          notes?: string | null
          reminder_sent?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_date?: string | null
          compliance_type?: string
          created_at?: string
          due_date?: string
          id?: string
          is_completed?: boolean
          notes?: string | null
          reminder_sent?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_forms: {
        Row: {
          budget_range: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          service_type: string | null
          status: string | null
          timeline: string | null
        }
        Insert: {
          budget_range?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          service_type?: string | null
          status?: string | null
          timeline?: string | null
        }
        Update: {
          budget_range?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          service_type?: string | null
          status?: string | null
          timeline?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          accounts_receivable: number | null
          address: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          accounts_receivable?: number | null
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          accounts_receivable?: number | null
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          description: string | null
          document_type: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          is_public: boolean
          mime_type: string | null
          order_id: string | null
          uploaded_by: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          document_type: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          is_public?: boolean
          mime_type?: string | null
          order_id?: string | null
          uploaded_by?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          document_type?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          is_public?: boolean
          mime_type?: string | null
          order_id?: string | null
          uploaded_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          balance_due: number
          created_at: string
          customer_id: string | null
          days_overdue: number | null
          days_to_due_date: number | null
          id: string
          invoice_amount: number
          issue_date: string
          reference: string
          status: string | null
          updated_at: string
        }
        Insert: {
          balance_due: number
          created_at?: string
          customer_id?: string | null
          days_overdue?: number | null
          days_to_due_date?: number | null
          id?: string
          invoice_amount: number
          issue_date: string
          reference: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          balance_due?: number
          created_at?: string
          customer_id?: string | null
          days_overdue?: number | null
          days_to_due_date?: number | null
          id?: string
          invoice_amount?: number
          issue_date?: string
          reference?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          sent_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          sent_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          sent_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          admin_notes: string | null
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          id: string
          notes: string | null
          service_id: string
          status: string
          total_amount: number | null
          updated_at: string
          user_id: string
          vat_amount: number | null
        }
        Insert: {
          admin_notes?: string | null
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          service_id: string
          status?: string
          total_amount?: number | null
          updated_at?: string
          user_id: string
          vat_amount?: number | null
        }
        Update: {
          admin_notes?: string | null
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          service_id?: string
          status?: string
          total_amount?: number | null
          updated_at?: string
          user_id?: string
          vat_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          gateway_response: Json | null
          id: string
          invoice_id: string
          paid_at: string | null
          payment_method: string | null
          status: string
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          gateway_response?: Json | null
          id?: string
          invoice_id: string
          paid_at?: string | null
          payment_method?: string | null
          status?: string
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          gateway_response?: Json | null
          id?: string
          invoice_id?: string
          paid_at?: string | null
          payment_method?: string | null
          status?: string
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          is_popular: boolean
          name: string
          price: number
          processing_time: string | null
          requirements: string | null
          updated_at: string
          vat_rate: number
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_popular?: boolean
          name: string
          price: number
          processing_time?: string | null
          requirements?: string | null
          updated_at?: string
          vat_rate?: number
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          is_popular?: boolean
          name?: string
          price?: number
          processing_time?: string | null
          requirements?: string | null
          updated_at?: string
          vat_rate?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          company_name: string | null
          company_registration: string | null
          created_at: string
          email: string
          email_verified: boolean
          full_name: string
          id: string
          id_number: string | null
          is_active: boolean
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          company_registration?: string | null
          created_at?: string
          email: string
          email_verified?: boolean
          full_name: string
          id: string
          id_number?: string | null
          is_active?: boolean
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          company_registration?: string | null
          created_at?: string
          email?: string
          email_verified?: boolean
          full_name?: string
          id?: string
          id_number?: string | null
          is_active?: boolean
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
