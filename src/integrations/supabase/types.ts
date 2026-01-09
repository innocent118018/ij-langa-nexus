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
      access_reviews: {
        Row: {
          access_type: string | null
          created_at: string | null
          decision: string | null
          id: string
          notes: string | null
          review_date: string | null
          reviewed_by: string
          reviewed_user: string
        }
        Insert: {
          access_type?: string | null
          created_at?: string | null
          decision?: string | null
          id?: string
          notes?: string | null
          review_date?: string | null
          reviewed_by: string
          reviewed_user: string
        }
        Update: {
          access_type?: string | null
          created_at?: string | null
          decision?: string | null
          id?: string
          notes?: string | null
          review_date?: string | null
          reviewed_by?: string
          reviewed_user?: string
        }
        Relationships: []
      }
      access_tokens: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string | null
          token: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string | null
          token?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string | null
          token?: string | null
        }
        Relationships: []
      }
      accounts: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          normal_balance: string | null
          parent_account_id: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          normal_balance?: string | null
          parent_account_id?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          normal_balance?: string | null
          parent_account_id?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_parent_account_id_fkey"
            columns: ["parent_account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_activity_logs: {
        Row: {
          action_type: string
          created_at: string
          description: string | null
          id: string
          ip_address: unknown
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string
          description?: string | null
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string
          description?: string | null
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      admin_config: {
        Row: {
          config_key: string
          config_value: Json
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          config_key: string
          config_value: Json
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          config_key?: string
          config_value?: Json
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          entity: string | null
          entity_id: string | null
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          record_id: string
          table_name: string
          tenant_id: string | null
          user_agent: string | null
          user_email: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          entity?: string | null
          entity_id?: string | null
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id: string
          table_name: string
          tenant_id?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          entity?: string | null
          entity_id?: string | null
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string
          table_name?: string
          tenant_id?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string
        }
        Relationships: []
      }
      audit_trail: {
        Row: {
          action: string
          actor_id: string | null
          company_id: string | null
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown
        }
        Insert: {
          action: string
          actor_id?: string | null
          company_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown
        }
        Update: {
          action?: string
          actor_id?: string | null
          company_id?: string | null
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown
        }
        Relationships: [
          {
            foreignKeyName: "audit_trail_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      auth_otps: {
        Row: {
          channel: string | null
          created_at: string | null
          email: string
          expires_at: string
          id: string
          otp_hash: string
          phone: string | null
          profile_id: string | null
          used: boolean | null
        }
        Insert: {
          channel?: string | null
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          otp_hash: string
          phone?: string | null
          profile_id?: string | null
          used?: boolean | null
        }
        Update: {
          channel?: string | null
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          otp_hash?: string
          phone?: string | null
          profile_id?: string | null
          used?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "auth_otps_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_flows: {
        Row: {
          actions: Json
          created_at: string
          description: string | null
          flow_type: string
          id: string
          is_active: boolean
          name: string
          trigger_conditions: Json
          updated_at: string
        }
        Insert: {
          actions?: Json
          created_at?: string
          description?: string | null
          flow_type: string
          id?: string
          is_active?: boolean
          name: string
          trigger_conditions?: Json
          updated_at?: string
        }
        Update: {
          actions?: Json
          created_at?: string
          description?: string | null
          flow_type?: string
          id?: string
          is_active?: boolean
          name?: string
          trigger_conditions?: Json
          updated_at?: string
        }
        Relationships: []
      }
      bank_cash_accounts: {
        Row: {
          account_code: string | null
          account_name: string
          account_number: string | null
          account_type: string
          bank_name: string | null
          branch_code: string | null
          cleared_balance: number | null
          control_account_id: string | null
          created_at: string | null
          current_balance: number | null
          division_id: string | null
          id: string
          is_active: boolean | null
          opening_balance: number | null
          pending_deposits: number | null
          pending_withdrawals: number | null
          swift_code: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_code?: string | null
          account_name: string
          account_number?: string | null
          account_type: string
          bank_name?: string | null
          branch_code?: string | null
          cleared_balance?: number | null
          control_account_id?: string | null
          created_at?: string | null
          current_balance?: number | null
          division_id?: string | null
          id?: string
          is_active?: boolean | null
          opening_balance?: number | null
          pending_deposits?: number | null
          pending_withdrawals?: number | null
          swift_code?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_code?: string | null
          account_name?: string
          account_number?: string | null
          account_type?: string
          bank_name?: string | null
          branch_code?: string | null
          cleared_balance?: number | null
          control_account_id?: string | null
          created_at?: string | null
          current_balance?: number | null
          division_id?: string | null
          id?: string
          is_active?: boolean | null
          opening_balance?: number | null
          pending_deposits?: number | null
          pending_withdrawals?: number | null
          swift_code?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      bank_payments: {
        Row: {
          account_id: string
          amount: number
          cleared_date: string | null
          created_at: string | null
          description: string
          division_id: string | null
          id: string
          payment_date: string
          payment_method: string | null
          payment_number: string
          project_id: string | null
          reference: string | null
          status: string
          supplier_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_id: string
          amount: number
          cleared_date?: string | null
          created_at?: string | null
          description: string
          division_id?: string | null
          id?: string
          payment_date?: string
          payment_method?: string | null
          payment_number: string
          project_id?: string | null
          reference?: string | null
          status?: string
          supplier_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_id?: string
          amount?: number
          cleared_date?: string | null
          created_at?: string | null
          description?: string
          division_id?: string | null
          id?: string
          payment_date?: string
          payment_method?: string | null
          payment_number?: string
          project_id?: string | null
          reference?: string | null
          status?: string
          supplier_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_payments_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "bank_cash_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bank_payments_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_receipts: {
        Row: {
          account_id: string
          amount: number
          cleared_date: string | null
          created_at: string | null
          customer_id: string | null
          description: string
          division_id: string | null
          id: string
          payment_method: string | null
          project_id: string | null
          receipt_date: string
          receipt_number: string
          reference: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_id: string
          amount: number
          cleared_date?: string | null
          created_at?: string | null
          customer_id?: string | null
          description: string
          division_id?: string | null
          id?: string
          payment_method?: string | null
          project_id?: string | null
          receipt_date?: string
          receipt_number: string
          reference?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_id?: string
          amount?: number
          cleared_date?: string | null
          created_at?: string | null
          customer_id?: string | null
          description?: string
          division_id?: string | null
          id?: string
          payment_method?: string | null
          project_id?: string | null
          receipt_date?: string
          receipt_number?: string
          reference?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bank_receipts_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "bank_cash_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_reconciliations: {
        Row: {
          account_id: string
          book_balance: number
          completed_at: string | null
          completed_by: string | null
          created_at: string
          difference: number
          id: string
          notes: string | null
          reconciliation_date: string
          reconciliation_number: string
          statement_balance: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_id: string
          book_balance?: number
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          difference?: number
          id?: string
          notes?: string | null
          reconciliation_date?: string
          reconciliation_number: string
          statement_balance?: number
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_id?: string
          book_balance?: number
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          difference?: number
          id?: string
          notes?: string | null
          reconciliation_date?: string
          reconciliation_number?: string
          statement_balance?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bank_statement_processing_history: {
        Row: {
          completed_at: string | null
          created_at: string
          credits_used: number | null
          error_message: string | null
          extracted_data: Json | null
          file_name: string
          file_size: number | null
          id: string
          pages_processed: number | null
          processing_status: string | null
          started_at: string | null
          team_id: string | null
          user_id: string
          validation_results: Json | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          credits_used?: number | null
          error_message?: string | null
          extracted_data?: Json | null
          file_name: string
          file_size?: number | null
          id?: string
          pages_processed?: number | null
          processing_status?: string | null
          started_at?: string | null
          team_id?: string | null
          user_id: string
          validation_results?: Json | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          credits_used?: number | null
          error_message?: string | null
          extracted_data?: Json | null
          file_name?: string
          file_size?: number | null
          id?: string
          pages_processed?: number | null
          processing_status?: string | null
          started_at?: string | null
          team_id?: string | null
          user_id?: string
          validation_results?: Json | null
        }
        Relationships: []
      }
      bank_statements: {
        Row: {
          created_at: string
          credits_used: number
          extracted_data: Json | null
          file_path: string | null
          filename: string
          id: string
          pages_processed: number
          processing_completed_at: string | null
          processing_started_at: string | null
          status: string
          updated_at: string
          user_id: string
          verification_results: Json | null
        }
        Insert: {
          created_at?: string
          credits_used?: number
          extracted_data?: Json | null
          file_path?: string | null
          filename: string
          id?: string
          pages_processed?: number
          processing_completed_at?: string | null
          processing_started_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
          verification_results?: Json | null
        }
        Update: {
          created_at?: string
          credits_used?: number
          extracted_data?: Json | null
          file_path?: string | null
          filename?: string
          id?: string
          pages_processed?: number
          processing_completed_at?: string | null
          processing_started_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          verification_results?: Json | null
        }
        Relationships: []
      }
      banking_details: {
        Row: {
          account_number: string | null
          account_type: string | null
          bank_name: string | null
          branch_code: string | null
          branch_name: string | null
          created_at: string | null
          id: string
          last_verified_at: string | null
          swift_code: string | null
          updated_at: string | null
          updated_by: string | null
          verified: boolean | null
        }
        Insert: {
          account_number?: string | null
          account_type?: string | null
          bank_name?: string | null
          branch_code?: string | null
          branch_name?: string | null
          created_at?: string | null
          id?: string
          last_verified_at?: string | null
          swift_code?: string | null
          updated_at?: string | null
          updated_by?: string | null
          verified?: boolean | null
        }
        Update: {
          account_number?: string | null
          account_type?: string | null
          bank_name?: string | null
          branch_code?: string | null
          branch_name?: string | null
          created_at?: string | null
          id?: string
          last_verified_at?: string | null
          swift_code?: string | null
          updated_at?: string | null
          updated_by?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      billable_expenses: {
        Row: {
          amount: number | null
          company_id: string | null
          created_at: string | null
          created_by: string | null
          date: string | null
          description: string | null
          id: string
        }
        Insert: {
          amount?: number | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          description?: string | null
          id?: string
        }
        Update: {
          amount?: number | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          description?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "billable_expenses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      billable_time: {
        Row: {
          created_at: string | null
          customer_id: string
          description: string
          division_id: string | null
          employee_id: string | null
          hourly_rate: number
          hours_worked: number
          id: string
          invoice_date: string | null
          project_id: string | null
          status: string
          total_amount: number
          updated_at: string | null
          user_id: string
          work_date: string
          write_off_date: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          description: string
          division_id?: string | null
          employee_id?: string | null
          hourly_rate: number
          hours_worked: number
          id?: string
          invoice_date?: string | null
          project_id?: string | null
          status?: string
          total_amount: number
          updated_at?: string | null
          user_id: string
          work_date?: string
          write_off_date?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          description?: string
          division_id?: string | null
          employee_id?: string | null
          hourly_rate?: number
          hours_worked?: number
          id?: string
          invoice_date?: string | null
          project_id?: string | null
          status?: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string
          work_date?: string
          write_off_date?: string | null
        }
        Relationships: []
      }
      board_meetings: {
        Row: {
          action_items: Json | null
          agenda: string | null
          attendees: Json | null
          company_id: string
          created_at: string
          id: string
          meeting_date: string
          meeting_type: string
          minutes: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          action_items?: Json | null
          agenda?: string | null
          attendees?: Json | null
          company_id: string
          created_at?: string
          id?: string
          meeting_date: string
          meeting_type: string
          minutes?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          action_items?: Json | null
          agenda?: string | null
          attendees?: Json | null
          company_id?: string
          created_at?: string
          id?: string
          meeting_date?: string
          meeting_type?: string
          minutes?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "board_meetings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_entities"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          company_id: string
          content: Json
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          recipients: Json | null
          scheduled_at: string | null
          sent_at: string | null
          stats: Json | null
          status: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          company_id: string
          content?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          recipients?: Json | null
          scheduled_at?: string | null
          sent_at?: string | null
          stats?: Json | null
          status?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          content?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          recipients?: Json | null
          scheduled_at?: string | null
          sent_at?: string | null
          stats?: Json | null
          status?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          created_at: string | null
          id: string
          product_id: string | null
          quantity: number | null
          service_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          quantity?: number | null
          service_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          quantity?: number | null
          service_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      chart_of_accounts: {
        Row: {
          code: string | null
          created_at: string | null
          id: string
          name: string | null
          type: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          type?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          type?: string | null
        }
        Relationships: []
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
      clerkiq_audit_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown
          resource_id: string | null
          resource_type: string | null
          session_id: string | null
          success: boolean | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown
          resource_id?: string | null
          resource_type?: string | null
          session_id?: string | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown
          resource_id?: string | null
          resource_type?: string | null
          session_id?: string | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      clerkiq_credits: {
        Row: {
          created_at: string
          credits_purchased: number
          credits_remaining: number
          credits_used: number
          id: string
          payment_id: string | null
          price_paid: number | null
          purchase_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits_purchased?: number
          credits_remaining?: number
          credits_used?: number
          id?: string
          payment_id?: string | null
          price_paid?: number | null
          purchase_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits_purchased?: number
          credits_remaining?: number
          credits_used?: number
          id?: string
          payment_id?: string | null
          price_paid?: number | null
          purchase_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      clerkiq_security_settings: {
        Row: {
          created_at: string
          failed_login_count: number | null
          id: string
          ip_whitelist: unknown[] | null
          last_login: string | null
          locked_until: string | null
          login_attempts: number | null
          mfa_enabled: boolean | null
          mfa_secret: string | null
          recovery_codes: string[] | null
          session_timeout: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          failed_login_count?: number | null
          id?: string
          ip_whitelist?: unknown[] | null
          last_login?: string | null
          locked_until?: string | null
          login_attempts?: number | null
          mfa_enabled?: boolean | null
          mfa_secret?: string | null
          recovery_codes?: string[] | null
          session_timeout?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          failed_login_count?: number | null
          id?: string
          ip_whitelist?: unknown[] | null
          last_login?: string | null
          locked_until?: string | null
          login_attempts?: number | null
          mfa_enabled?: boolean | null
          mfa_secret?: string | null
          recovery_codes?: string[] | null
          session_timeout?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      commissions: {
        Row: {
          amount: number
          company_id: string | null
          created_at: string | null
          id: string
          order_id: string | null
          paid_at: string | null
          percentage: number
          reseller_id: string
          status: string | null
        }
        Insert: {
          amount?: number
          company_id?: string | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          paid_at?: string | null
          percentage?: number
          reseller_id: string
          status?: string | null
        }
        Update: {
          amount?: number
          company_id?: string | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          paid_at?: string | null
          percentage?: number
          reseller_id?: string
          status?: string | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          created_at: string | null
          created_by: string | null
          domain: string | null
          ecommerce_enabled: boolean | null
          id: string
          logo_url: string | null
          name: string
          plan_id: string | null
          primary_color: string | null
          registration_number: string | null
          reseller_id: string | null
          subscription_status: string | null
          trial_ends_at: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          domain?: string | null
          ecommerce_enabled?: boolean | null
          id?: string
          logo_url?: string | null
          name: string
          plan_id?: string | null
          primary_color?: string | null
          registration_number?: string | null
          reseller_id?: string | null
          subscription_status?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          domain?: string | null
          ecommerce_enabled?: boolean | null
          id?: string
          logo_url?: string | null
          name?: string
          plan_id?: string | null
          primary_color?: string | null
          registration_number?: string | null
          reseller_id?: string | null
          subscription_status?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      company_directors: {
        Row: {
          appointment_date: string | null
          company_id: string
          created_at: string
          first_name: string
          id: string
          id_number: string | null
          last_name: string
          residential_address: string | null
          resignation_date: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          appointment_date?: string | null
          company_id: string
          created_at?: string
          first_name: string
          id?: string
          id_number?: string | null
          last_name: string
          residential_address?: string | null
          resignation_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          appointment_date?: string | null
          company_id?: string
          created_at?: string
          first_name?: string
          id?: string
          id_number?: string | null
          last_name?: string
          residential_address?: string | null
          resignation_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_directors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_entities"
            referencedColumns: ["id"]
          },
        ]
      }
      company_documents: {
        Row: {
          category: string | null
          company_id: string | null
          created_at: string | null
          filename: string | null
          id: string
          mime_type: string | null
          size: number | null
          storage_path: string
          uploaded_by: string | null
        }
        Insert: {
          category?: string | null
          company_id?: string | null
          created_at?: string | null
          filename?: string | null
          id?: string
          mime_type?: string | null
          size?: number | null
          storage_path: string
          uploaded_by?: string | null
        }
        Update: {
          category?: string | null
          company_id?: string | null
          created_at?: string | null
          filename?: string | null
          id?: string
          mime_type?: string | null
          size?: number | null
          storage_path?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_entities: {
        Row: {
          business_address: string | null
          company_name: string
          created_at: string
          email: string | null
          id: string
          incorporation_date: string | null
          phone: string | null
          postal_address: string | null
          registration_number: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          business_address?: string | null
          company_name: string
          created_at?: string
          email?: string | null
          id?: string
          incorporation_date?: string | null
          phone?: string | null
          postal_address?: string | null
          registration_number?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          business_address?: string | null
          company_name?: string
          created_at?: string
          email?: string | null
          id?: string
          incorporation_date?: string | null
          phone?: string | null
          postal_address?: string | null
          registration_number?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      company_settings: {
        Row: {
          address: string | null
          created_at: string | null
          csd_number: string | null
          id: string
          logo_url: string | null
          name: string
          registration_number: string | null
          tax_number: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          csd_number?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          registration_number?: string | null
          tax_number?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          csd_number?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          registration_number?: string | null
          tax_number?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      company_shareholders: {
        Row: {
          acquisition_date: string | null
          certificate_number: string | null
          company_id: string
          created_at: string
          id: string
          id_number: string | null
          share_class: string | null
          share_percentage: number | null
          shareholder_name: string
          status: string | null
          updated_at: string
        }
        Insert: {
          acquisition_date?: string | null
          certificate_number?: string | null
          company_id: string
          created_at?: string
          id?: string
          id_number?: string | null
          share_class?: string | null
          share_percentage?: number | null
          shareholder_name: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          acquisition_date?: string | null
          certificate_number?: string | null
          company_id?: string
          created_at?: string
          id?: string
          id_number?: string | null
          share_class?: string | null
          share_percentage?: number | null
          shareholder_name?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_shareholders_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_entities"
            referencedColumns: ["id"]
          },
        ]
      }
      company_users: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          role: string | null
          user_id: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          role?: string | null
          user_id?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_users_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_alerts: {
        Row: {
          client_id: string | null
          created_at: string | null
          id: string
          message: string
          requirement_type: string | null
          resolved: boolean | null
          resolved_at: string | null
          severity: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          message: string
          requirement_type?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          severity?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          message?: string
          requirement_type?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          severity?: string | null
        }
        Relationships: []
      }
      compliance_calendar: {
        Row: {
          company_id: string | null
          completed_date: string | null
          compliance_type: string
          created_at: string
          due_date: string
          id: string
          notes: string | null
          reminder_sent: boolean | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id?: string | null
          completed_date?: string | null
          compliance_type: string
          created_at?: string
          due_date: string
          id?: string
          notes?: string | null
          reminder_sent?: boolean | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string | null
          completed_date?: string | null
          compliance_type?: string
          created_at?: string
          due_date?: string
          id?: string
          notes?: string | null
          reminder_sent?: boolean | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_calendar_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_entities"
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
      compliance_status: {
        Row: {
          client_id: string | null
          created_at: string | null
          due_date: string | null
          id: string
          item: string
          last_checked: string | null
          notes: string | null
          status: string | null
          type: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          item: string
          last_checked?: string | null
          notes?: string | null
          status?: string | null
          type: string
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          due_date?: string | null
          id?: string
          item?: string
          last_checked?: string | null
          notes?: string | null
          status?: string | null
          type?: string
        }
        Relationships: []
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
      contact_settings: {
        Row: {
          billing_email: string | null
          created_at: string | null
          id: string
          orders_email: string | null
          phone: string | null
          primary_email: string | null
          support_email: string | null
          updated_at: string | null
          updated_by: string | null
          whatsapp: string | null
        }
        Insert: {
          billing_email?: string | null
          created_at?: string | null
          id?: string
          orders_email?: string | null
          phone?: string | null
          primary_email?: string | null
          support_email?: string | null
          updated_at?: string | null
          updated_by?: string | null
          whatsapp?: string | null
        }
        Update: {
          billing_email?: string | null
          created_at?: string | null
          id?: string
          orders_email?: string | null
          phone?: string | null
          primary_email?: string | null
          support_email?: string | null
          updated_at?: string | null
          updated_by?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      contract_clients: {
        Row: {
          address: string | null
          company_name: string | null
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          surname: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          company_name?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          surname?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          company_name?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          surname?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      contract_documents: {
        Row: {
          contract_id: string | null
          document_type: string
          file_name: string
          file_path: string
          id: string
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          contract_id?: string | null
          document_type: string
          file_name: string
          file_path: string
          id?: string
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          contract_id?: string | null
          document_type?: string
          file_name?: string
          file_path?: string
          id?: string
          uploaded_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contract_documents_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "service_contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      coupons: {
        Row: {
          code: string | null
          created_at: string | null
          discount_amount: number | null
          discount_percent: number | null
          expires_at: string | null
          id: string
          min_purchase: number | null
          source: string | null
          used: boolean | null
          used_at: string | null
          user_id: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          discount_amount?: number | null
          discount_percent?: number | null
          expires_at?: string | null
          id?: string
          min_purchase?: number | null
          source?: string | null
          used?: boolean | null
          used_at?: string | null
          user_id?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          discount_amount?: number | null
          discount_percent?: number | null
          expires_at?: string | null
          id?: string
          min_purchase?: number | null
          source?: string | null
          used?: boolean | null
          used_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      credit_notes: {
        Row: {
          cost_of_sales: number | null
          created_at: string | null
          credit_note_number: string
          customer_id: string | null
          description: string
          id: string
          issue_date: string
          line_items: Json | null
          reason: string | null
          sales_invoice_id: string | null
          status: string
          subtotal: number
          total_amount: number
          updated_at: string | null
          user_id: string
          vat_amount: number
        }
        Insert: {
          cost_of_sales?: number | null
          created_at?: string | null
          credit_note_number: string
          customer_id?: string | null
          description: string
          id?: string
          issue_date?: string
          line_items?: Json | null
          reason?: string | null
          sales_invoice_id?: string | null
          status?: string
          subtotal?: number
          total_amount?: number
          updated_at?: string | null
          user_id: string
          vat_amount?: number
        }
        Update: {
          cost_of_sales?: number | null
          created_at?: string | null
          credit_note_number?: string
          customer_id?: string | null
          description?: string
          id?: string
          issue_date?: string
          line_items?: Json | null
          reason?: string | null
          sales_invoice_id?: string | null
          status?: string
          subtotal?: number
          total_amount?: number
          updated_at?: string | null
          user_id?: string
          vat_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "credit_notes_sales_invoice_id_fkey"
            columns: ["sales_invoice_id"]
            isOneToOne: false
            referencedRelation: "sales_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_accounts: {
        Row: {
          account_status: string | null
          billing_address: string | null
          created_at: string
          credit_limit: number | null
          customer_name: string
          default_due_date_days: number | null
          default_hourly_rate: number | null
          delivery_address: string | null
          email: string
          has_default_due_date_days: boolean | null
          has_default_hourly_rate: boolean | null
          id: string
          is_primary_account: boolean | null
          last_statement_sent: string | null
          parent_account_id: string | null
          phone: string | null
          statement_enabled: boolean | null
          updated_at: string
        }
        Insert: {
          account_status?: string | null
          billing_address?: string | null
          created_at?: string
          credit_limit?: number | null
          customer_name: string
          default_due_date_days?: number | null
          default_hourly_rate?: number | null
          delivery_address?: string | null
          email: string
          has_default_due_date_days?: boolean | null
          has_default_hourly_rate?: boolean | null
          id?: string
          is_primary_account?: boolean | null
          last_statement_sent?: string | null
          parent_account_id?: string | null
          phone?: string | null
          statement_enabled?: boolean | null
          updated_at?: string
        }
        Update: {
          account_status?: string | null
          billing_address?: string | null
          created_at?: string
          credit_limit?: number | null
          customer_name?: string
          default_due_date_days?: number | null
          default_hourly_rate?: number | null
          delivery_address?: string | null
          email?: string
          has_default_due_date_days?: boolean | null
          has_default_hourly_rate?: boolean | null
          id?: string
          is_primary_account?: boolean | null
          last_statement_sent?: string | null
          parent_account_id?: string | null
          phone?: string | null
          statement_enabled?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_accounts_parent_account_id_fkey"
            columns: ["parent_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_contacts: {
        Row: {
          birthday: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          is_subscribed: boolean
          last_name: string | null
          phone: string | null
          subscribed_at: string
          tags: string[] | null
          unsubscribed_at: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          birthday?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          is_subscribed?: boolean
          last_name?: string | null
          phone?: string | null
          subscribed_at?: string
          tags?: string[] | null
          unsubscribed_at?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          birthday?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          is_subscribed?: boolean
          last_name?: string | null
          phone?: string | null
          subscribed_at?: string
          tags?: string[] | null
          unsubscribed_at?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      customer_notifications: {
        Row: {
          created_at: string
          customer_account_id: string
          id: string
          is_read: boolean | null
          message: string
          notification_type: string
          priority: string | null
          read_at: string | null
          title: string
        }
        Insert: {
          created_at?: string
          customer_account_id: string
          id?: string
          is_read?: boolean | null
          message: string
          notification_type: string
          priority?: string | null
          read_at?: string | null
          title: string
        }
        Update: {
          created_at?: string
          customer_account_id?: string
          id?: string
          is_read?: boolean | null
          message?: string
          notification_type?: string
          priority?: string | null
          read_at?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_notifications_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_sessions: {
        Row: {
          created_at: string
          customer_account_id: string
          email: string
          ended_at: string | null
          expires_at: string
          id: string
          ip_address: unknown
          is_active: boolean | null
          session_token: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          customer_account_id: string
          email: string
          ended_at?: string | null
          expires_at: string
          id?: string
          ip_address?: unknown
          is_active?: boolean | null
          session_token: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          customer_account_id?: string
          email?: string
          ended_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: unknown
          is_active?: boolean | null
          session_token?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_sessions_customer_account_id_fkey"
            columns: ["customer_account_id"]
            isOneToOne: false
            referencedRelation: "customer_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          accounts_receivable: number | null
          address: string | null
          code: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          accounts_receivable?: number | null
          address?: string | null
          code?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          accounts_receivable?: number | null
          address?: string | null
          code?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      debit_notes: {
        Row: {
          created_at: string | null
          debit_note_number: string
          description: string
          id: string
          issue_date: string
          line_items: Json | null
          purchase_invoice_id: string | null
          reason: string | null
          status: string
          subtotal: number
          supplier_id: string
          total_amount: number
          updated_at: string | null
          user_id: string
          vat_amount: number
        }
        Insert: {
          created_at?: string | null
          debit_note_number: string
          description: string
          id?: string
          issue_date?: string
          line_items?: Json | null
          purchase_invoice_id?: string | null
          reason?: string | null
          status?: string
          subtotal?: number
          supplier_id: string
          total_amount?: number
          updated_at?: string | null
          user_id: string
          vat_amount?: number
        }
        Update: {
          created_at?: string | null
          debit_note_number?: string
          description?: string
          id?: string
          issue_date?: string
          line_items?: Json | null
          purchase_invoice_id?: string | null
          reason?: string | null
          status?: string
          subtotal?: number
          supplier_id?: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string
          vat_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "debit_notes_purchase_invoice_id_fkey"
            columns: ["purchase_invoice_id"]
            isOneToOne: false
            referencedRelation: "purchase_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "debit_notes_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_notes: {
        Row: {
          created_at: string | null
          customer_id: string
          delivery_address: string | null
          delivery_date: string
          delivery_note_number: string
          description: string | null
          id: string
          inventory_location_id: string | null
          invoice_number: string | null
          line_items: Json | null
          order_number: string | null
          qty_delivered: number | null
          sales_invoice_id: string | null
          sales_order_id: string | null
          special_instructions: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          delivery_address?: string | null
          delivery_date?: string
          delivery_note_number: string
          description?: string | null
          id?: string
          inventory_location_id?: string | null
          invoice_number?: string | null
          line_items?: Json | null
          order_number?: string | null
          qty_delivered?: number | null
          sales_invoice_id?: string | null
          sales_order_id?: string | null
          special_instructions?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          delivery_address?: string | null
          delivery_date?: string
          delivery_note_number?: string
          description?: string | null
          id?: string
          inventory_location_id?: string | null
          invoice_number?: string | null
          line_items?: Json | null
          order_number?: string | null
          qty_delivered?: number | null
          sales_invoice_id?: string | null
          sales_order_id?: string | null
          special_instructions?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_notes_sales_invoice_id_fkey"
            columns: ["sales_invoice_id"]
            isOneToOne: false
            referencedRelation: "sales_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_notes_sales_order_id_fkey"
            columns: ["sales_order_id"]
            isOneToOne: false
            referencedRelation: "sales_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      document_templates: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_active: boolean | null
          template_name: string
          template_type: string
          updated_at: string
          variables: Json | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          template_name: string
          template_type: string
          updated_at?: string
          variables?: Json | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          template_name?: string
          template_type?: string
          updated_at?: string
          variables?: Json | null
        }
        Relationships: []
      }
      document_themes: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_default: boolean | null
          is_inactive: boolean | null
          name: string
          template: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          is_inactive?: boolean | null
          name: string
          template: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          is_inactive?: boolean | null
          name?: string
          template?: string
          updated_at?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          category: string | null
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
          category?: string | null
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
          category?: string | null
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
      email_templates: {
        Row: {
          created_at: string
          html_content: string
          id: string
          is_active: boolean
          merge_tags: string[] | null
          name: string
          subject: string
          template_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          html_content: string
          id?: string
          is_active?: boolean
          merge_tags?: string[] | null
          name: string
          subject: string
          template_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          html_content?: string
          id?: string
          is_active?: boolean
          merge_tags?: string[] | null
          name?: string
          subject?: string
          template_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          balance: number | null
          code: string | null
          created_at: string | null
          department: string | null
          email: string | null
          hire_date: string | null
          id: string
          name: string
          phone: string | null
          position: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number | null
          code?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          hire_date?: string | null
          id?: string
          name: string
          phone?: string | null
          position?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number | null
          code?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          hire_date?: string | null
          id?: string
          name?: string
          phone?: string | null
          position?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      expense_claims: {
        Row: {
          approved_by: string | null
          approved_date: string | null
          claim_date: string
          claim_number: string
          created_at: string
          description: string
          employee_id: string
          id: string
          line_items: Json | null
          reimbursed_date: string | null
          status: string
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          approved_by?: string | null
          approved_date?: string | null
          claim_date?: string
          claim_number: string
          created_at?: string
          description: string
          employee_id: string
          id?: string
          line_items?: Json | null
          reimbursed_date?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          approved_by?: string | null
          approved_date?: string | null
          claim_date?: string
          claim_number?: string
          created_at?: string
          description?: string
          employee_id?: string
          id?: string
          line_items?: Json | null
          reimbursed_date?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      flow_executions: {
        Row: {
          contact_id: string
          executed_at: string
          execution_data: Json | null
          flow_id: string
          id: string
          status: string
        }
        Insert: {
          contact_id: string
          executed_at?: string
          execution_data?: Json | null
          flow_id: string
          id?: string
          status?: string
        }
        Update: {
          contact_id?: string
          executed_at?: string
          execution_data?: Json | null
          flow_id?: string
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "flow_executions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "customer_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flow_executions_flow_id_fkey"
            columns: ["flow_id"]
            isOneToOne: false
            referencedRelation: "automation_flows"
            referencedColumns: ["id"]
          },
        ]
      }
      folders: {
        Row: {
          created_at: string | null
          id: string
          label: string | null
          owner_id: string | null
          path: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          label?: string | null
          owner_id?: string | null
          path: string
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string | null
          owner_id?: string | null
          path?: string
        }
        Relationships: []
      }
      generated_documents: {
        Row: {
          company_id: string | null
          content: string | null
          created_at: string
          document_name: string
          document_type: string
          file_path: string | null
          id: string
          status: string | null
          template_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id?: string | null
          content?: string | null
          created_at?: string
          document_name: string
          document_type: string
          file_path?: string | null
          id?: string
          status?: string | null
          template_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string | null
          content?: string | null
          created_at?: string
          document_name?: string
          document_type?: string
          file_path?: string | null
          id?: string
          status?: string | null
          template_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_documents_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "document_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      goods_receipts: {
        Row: {
          created_at: string | null
          delivery_note_number: string | null
          description: string | null
          id: string
          inspection_notes: string | null
          inventory_location_id: string | null
          line_items: Json | null
          purchase_order_id: string | null
          qty_received: number | null
          quality_status: string | null
          receipt_date: string
          receipt_number: string
          supplier_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          delivery_note_number?: string | null
          description?: string | null
          id?: string
          inspection_notes?: string | null
          inventory_location_id?: string | null
          line_items?: Json | null
          purchase_order_id?: string | null
          qty_received?: number | null
          quality_status?: string | null
          receipt_date?: string
          receipt_number: string
          supplier_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          delivery_note_number?: string | null
          description?: string | null
          id?: string
          inspection_notes?: string | null
          inventory_location_id?: string | null
          line_items?: Json | null
          purchase_order_id?: string | null
          qty_received?: number | null
          quality_status?: string | null
          receipt_date?: string
          receipt_number?: string
          supplier_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "goods_receipts_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goods_receipts_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      inter_account_transfers: {
        Row: {
          amount: number
          created_at: string
          description: string
          from_account_id: string
          id: string
          reference: string | null
          status: string
          to_account_id: string
          transfer_date: string
          transfer_number: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          description: string
          from_account_id: string
          id?: string
          reference?: string | null
          status?: string
          to_account_id: string
          transfer_date?: string
          transfer_number: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string
          from_account_id?: string
          id?: string
          reference?: string | null
          status?: string
          to_account_id?: string
          transfer_date?: string
          transfer_number?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      inventory_items: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          item_code: string
          location_id: string | null
          name: string
          qty_available: number | null
          qty_on_hand: number | null
          qty_reserved: number | null
          reorder_level: number | null
          reorder_quantity: number | null
          status: string
          supplier_id: string | null
          total_value: number | null
          unit_cost: number | null
          unit_of_measure: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          item_code: string
          location_id?: string | null
          name: string
          qty_available?: number | null
          qty_on_hand?: number | null
          qty_reserved?: number | null
          reorder_level?: number | null
          reorder_quantity?: number | null
          status?: string
          supplier_id?: string | null
          total_value?: number | null
          unit_cost?: number | null
          unit_of_measure?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          item_code?: string
          location_id?: string | null
          name?: string
          qty_available?: number | null
          qty_on_hand?: number | null
          qty_reserved?: number | null
          reorder_level?: number | null
          reorder_quantity?: number | null
          status?: string
          supplier_id?: string | null
          total_value?: number | null
          unit_cost?: number | null
          unit_of_measure?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_items_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_line_items: {
        Row: {
          created_at: string
          description: string
          id: string
          invoice_id: string
          line_total: number
          quantity: number
          tax_amount: number | null
          tax_code: string | null
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          invoice_id: string
          line_total?: number
          quantity?: number
          tax_amount?: number | null
          tax_code?: string | null
          unit_price?: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          invoice_id?: string
          line_total?: number
          quantity?: number
          tax_amount?: number | null
          tax_code?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_templates: {
        Row: {
          created_at: string
          html_template: string
          id: string
          is_active: boolean
          template_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          html_template: string
          id?: string
          is_active?: boolean
          template_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          html_template?: string
          id?: string
          is_active?: boolean
          template_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          balance_due: number
          created_at: string
          customer_id: string | null
          days_overdue: number | null
          days_to_due_date: number | null
          due_date: string | null
          id: string
          ikhokha_ref: string | null
          invoice_amount: number
          invoice_type: string | null
          issue_date: string
          line_items: Json | null
          paid_at: string | null
          reference: string
          status: string | null
          subtotal: number | null
          tenant_id: string | null
          updated_at: string
          vat_amount: number | null
        }
        Insert: {
          balance_due: number
          created_at?: string
          customer_id?: string | null
          days_overdue?: number | null
          days_to_due_date?: number | null
          due_date?: string | null
          id?: string
          ikhokha_ref?: string | null
          invoice_amount: number
          invoice_type?: string | null
          issue_date: string
          line_items?: Json | null
          paid_at?: string | null
          reference: string
          status?: string | null
          subtotal?: number | null
          tenant_id?: string | null
          updated_at?: string
          vat_amount?: number | null
        }
        Update: {
          balance_due?: number
          created_at?: string
          customer_id?: string | null
          days_overdue?: number | null
          days_to_due_date?: number | null
          due_date?: string | null
          id?: string
          ikhokha_ref?: string | null
          invoice_amount?: number
          invoice_type?: string | null
          issue_date?: string
          line_items?: Json | null
          paid_at?: string | null
          reference?: string
          status?: string | null
          subtotal?: number | null
          tenant_id?: string | null
          updated_at?: string
          vat_amount?: number | null
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
      journal_entries: {
        Row: {
          created_at: string | null
          created_by: string | null
          entry_date: string
          id: string
          narration: string | null
          posted_at: string | null
          posted_by: string | null
          reference: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          entry_date?: string
          id?: string
          narration?: string | null
          posted_at?: string | null
          posted_by?: string | null
          reference: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          entry_date?: string
          id?: string
          narration?: string | null
          posted_at?: string | null
          posted_by?: string | null
          reference?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      journal_lines: {
        Row: {
          account_id: string | null
          created_at: string | null
          credit: number | null
          debit: number | null
          description: string | null
          id: string
          journal_entry_id: string | null
        }
        Insert: {
          account_id?: string | null
          created_at?: string | null
          credit?: number | null
          debit?: number | null
          description?: string | null
          id?: string
          journal_entry_id?: string | null
        }
        Update: {
          account_id?: string | null
          created_at?: string | null
          credit?: number | null
          debit?: number | null
          description?: string | null
          id?: string
          journal_entry_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "journal_lines_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journal_lines_journal_entry_id_fkey"
            columns: ["journal_entry_id"]
            isOneToOne: false
            referencedRelation: "journal_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      late_payment_fees: {
        Row: {
          created_at: string | null
          customer_id: string
          days_overdue: number
          fee_amount: number
          fee_date: string
          fee_number: string
          fee_percentage: number | null
          id: string
          notes: string | null
          sales_invoice_id: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          days_overdue: number
          fee_amount: number
          fee_date?: string
          fee_number: string
          fee_percentage?: number | null
          id?: string
          notes?: string | null
          sales_invoice_id: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          days_overdue?: number
          fee_amount?: number
          fee_date?: string
          fee_number?: string
          fee_percentage?: number | null
          id?: string
          notes?: string | null
          sales_invoice_id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "late_payment_fees_sales_invoice_id_fkey"
            columns: ["sales_invoice_id"]
            isOneToOne: false
            referencedRelation: "sales_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to: string | null
          company_name: string
          compliance_risk_score: number | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string | null
          id: string
          industry: string | null
          last_contact_date: string | null
          next_followup_date: string | null
          notes: string | null
          source: string | null
          stage: Database["public"]["Enums"]["crm_stage"] | null
          updated_at: string | null
          urgency_level: string | null
          user_id: string | null
          value: number | null
        }
        Insert: {
          assigned_to?: string | null
          company_name: string
          compliance_risk_score?: number | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          last_contact_date?: string | null
          next_followup_date?: string | null
          notes?: string | null
          source?: string | null
          stage?: Database["public"]["Enums"]["crm_stage"] | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id?: string | null
          value?: number | null
        }
        Update: {
          assigned_to?: string | null
          company_name?: string
          compliance_risk_score?: number | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          last_contact_date?: string | null
          next_followup_date?: string | null
          notes?: string | null
          source?: string | null
          stage?: Database["public"]["Enums"]["crm_stage"] | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id?: string | null
          value?: number | null
        }
        Relationships: []
      }
      localizations: {
        Row: {
          configuration: Json | null
          created_at: string
          currency_code: string | null
          currency_name: string | null
          currency_symbol: string | null
          date_format: string | null
          decimal_places: number | null
          id: string
          is_active: boolean
          locale_code: string
          time_format: string | null
          updated_at: string
        }
        Insert: {
          configuration?: Json | null
          created_at?: string
          currency_code?: string | null
          currency_name?: string | null
          currency_symbol?: string | null
          date_format?: string | null
          decimal_places?: number | null
          id?: string
          is_active?: boolean
          locale_code: string
          time_format?: string | null
          updated_at?: string
        }
        Update: {
          configuration?: Json | null
          created_at?: string
          currency_code?: string | null
          currency_name?: string | null
          currency_symbol?: string | null
          date_format?: string | null
          decimal_places?: number | null
          id?: string
          is_active?: boolean
          locale_code?: string
          time_format?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      marketing_templates: {
        Row: {
          call_to_action: string | null
          campaign_name: string
          category: string
          content: string
          created_at: string | null
          hashtags: string[] | null
          id: string
          is_active: boolean | null
          month: number
          platform: string
          target_audience: string | null
          title: string
          updated_at: string | null
          video_script: string | null
        }
        Insert: {
          call_to_action?: string | null
          campaign_name: string
          category: string
          content: string
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          is_active?: boolean | null
          month: number
          platform: string
          target_audience?: string | null
          title: string
          updated_at?: string | null
          video_script?: string | null
        }
        Update: {
          call_to_action?: string | null
          campaign_name?: string
          category?: string
          content?: string
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          is_active?: boolean | null
          month?: number
          platform?: string
          target_audience?: string | null
          title?: string
          updated_at?: string | null
          video_script?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          attachment_urls: string[] | null
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          recipient_id: string | null
          sender_id: string
          subject: string
          thread_id: string | null
          updated_at: string | null
        }
        Insert: {
          attachment_urls?: string[] | null
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          recipient_id?: string | null
          sender_id: string
          subject: string
          thread_id?: string | null
          updated_at?: string | null
        }
        Update: {
          attachment_urls?: string[] | null
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          recipient_id?: string | null
          sender_id?: string
          subject?: string
          thread_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      monthly_compliance_packages: {
        Row: {
          created_at: string | null
          description: string | null
          features: Json
          id: string
          is_active: boolean | null
          package_name: string
          package_tier: string
          price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          package_name: string
          package_tier: string
          price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          package_name?: string
          package_tier?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      number_formats: {
        Row: {
          created_at: string
          decimal_separator: string
          group_separator: string
          group_sizes: number[]
          id: string
          is_default: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          decimal_separator: string
          group_separator: string
          group_sizes?: number[]
          id?: string
          is_default?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          decimal_separator?: string
          group_separator?: string
          group_sizes?: number[]
          id?: string
          is_default?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          price: number
          product_id: string | null
          quantity: number
          service_id: string | null
          total: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          price: number
          product_id?: string | null
          quantity?: number
          service_id?: string | null
          total: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          price?: number
          product_id?: string | null
          quantity?: number
          service_id?: string | null
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          admin_notes: string | null
          assigned_to: string | null
          company_id: string | null
          completed_at: string | null
          created_at: string
          customer_address: string | null
          customer_email: string | null
          customer_id: string | null
          customer_name: string | null
          customer_phone: string | null
          id: string
          notes: string | null
          payment_status: string | null
          service_id: string | null
          shipping_status: string | null
          status: string
          subtotal: number | null
          total_amount: number | null
          updated_at: string
          user_id: string | null
          vat_amount: number | null
        }
        Insert: {
          admin_notes?: string | null
          assigned_to?: string | null
          company_id?: string | null
          completed_at?: string | null
          created_at?: string
          customer_address?: string | null
          customer_email?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          notes?: string | null
          payment_status?: string | null
          service_id?: string | null
          shipping_status?: string | null
          status?: string
          subtotal?: number | null
          total_amount?: number | null
          updated_at?: string
          user_id?: string | null
          vat_amount?: number | null
        }
        Update: {
          admin_notes?: string | null
          assigned_to?: string | null
          company_id?: string | null
          completed_at?: string | null
          created_at?: string
          customer_address?: string | null
          customer_email?: string | null
          customer_id?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          notes?: string | null
          payment_status?: string | null
          service_id?: string | null
          shipping_status?: string | null
          status?: string
          subtotal?: number | null
          total_amount?: number | null
          updated_at?: string
          user_id?: string | null
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
      otp_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string
          id: string
          method: string | null
          phone: string
          template_used: string | null
          username: string | null
          verification_url: string | null
        }
        Insert: {
          code: string
          created_at?: string
          expires_at: string
          id?: string
          method?: string | null
          phone: string
          template_used?: string | null
          username?: string | null
          verification_url?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          method?: string | null
          phone?: string
          template_used?: string | null
          username?: string | null
          verification_url?: string | null
        }
        Relationships: []
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
      payroll_settings: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          settings: Json | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          settings?: Json | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          settings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "payroll_settings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_plans: {
        Row: {
          billing_cycle: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          features: Json | null
          id: string
          is_active: boolean | null
          name: string
          price: number
          tenant_id: string | null
          updated_at: string | null
        }
        Insert: {
          billing_cycle?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          price?: number
          tenant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          billing_cycle?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          tenant_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          company_id: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          metadata: Json | null
          name: string
          price: number | null
          shipping_required: boolean | null
          sku: string | null
          stock_quantity: number
          updated_at: string
          vat_rate: number | null
        }
        Insert: {
          category: string
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          metadata?: Json | null
          name: string
          price?: number | null
          shipping_required?: boolean | null
          sku?: string | null
          stock_quantity?: number
          updated_at?: string
          vat_rate?: number | null
        }
        Update: {
          category?: string
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          metadata?: Json | null
          name?: string
          price?: number | null
          shipping_required?: boolean | null
          sku?: string | null
          stock_quantity?: number
          updated_at?: string
          vat_rate?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          billing_address: string | null
          company_id: string | null
          company_name: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          full_name: string | null
          id: string
          id_number: string | null
          last_name: string | null
          phone: string | null
          reseller_id: string | null
          role: string | null
          surname: string | null
          tenant_id: string | null
          updated_at: string | null
          whatsapp_opt_in: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: string | null
          company_id?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          id: string
          id_number?: string | null
          last_name?: string | null
          phone?: string | null
          reseller_id?: string | null
          role?: string | null
          surname?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          whatsapp_opt_in?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: string | null
          company_id?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          id_number?: string | null
          last_name?: string | null
          phone?: string | null
          reseller_id?: string | null
          role?: string | null
          surname?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          whatsapp_opt_in?: boolean | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          budget: number | null
          code: string | null
          created_at: string | null
          customer_id: string | null
          description: string | null
          id: string
          name: string
          status: string | null
          total_expenses: number | null
          total_income: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          budget?: number | null
          code?: string | null
          created_at?: string | null
          customer_id?: string | null
          description?: string | null
          id?: string
          name: string
          status?: string | null
          total_expenses?: number | null
          total_income?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          budget?: number | null
          code?: string | null
          created_at?: string | null
          customer_id?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: string | null
          total_expenses?: number | null
          total_income?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_invoices: {
        Row: {
          balance_due: number
          created_at: string | null
          days_overdue: number | null
          days_to_due_date: number | null
          description: string | null
          discount_amount: number | null
          division_id: string | null
          due_date: string | null
          id: string
          invoice_date: string
          invoice_number: string
          line_items: Json | null
          project_id: string | null
          purchase_order_id: string | null
          status: string
          subtotal: number
          supplier_id: string
          supplier_invoice_number: string | null
          total_amount: number
          updated_at: string | null
          user_id: string
          vat_amount: number
          withholding_tax: number | null
        }
        Insert: {
          balance_due?: number
          created_at?: string | null
          days_overdue?: number | null
          days_to_due_date?: number | null
          description?: string | null
          discount_amount?: number | null
          division_id?: string | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_number: string
          line_items?: Json | null
          project_id?: string | null
          purchase_order_id?: string | null
          status?: string
          subtotal?: number
          supplier_id: string
          supplier_invoice_number?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id: string
          vat_amount?: number
          withholding_tax?: number | null
        }
        Update: {
          balance_due?: number
          created_at?: string | null
          days_overdue?: number | null
          days_to_due_date?: number | null
          description?: string | null
          discount_amount?: number | null
          division_id?: string | null
          due_date?: string | null
          id?: string
          invoice_date?: string
          invoice_number?: string
          line_items?: Json | null
          project_id?: string | null
          purchase_order_id?: string | null
          status?: string
          subtotal?: number
          supplier_id?: string
          supplier_invoice_number?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string
          vat_amount?: number
          withholding_tax?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_invoices_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_invoices_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          created_at: string | null
          delivery_date: string | null
          delivery_status: string
          description: string | null
          id: string
          is_cancelled: boolean | null
          line_items: Json | null
          order_date: string
          order_number: string
          purchase_quote_id: string | null
          qty_ordered: number | null
          received_amount: number
          status: string
          subtotal: number
          supplier_id: string
          total_amount: number
          updated_at: string | null
          user_id: string
          vat_amount: number
        }
        Insert: {
          created_at?: string | null
          delivery_date?: string | null
          delivery_status?: string
          description?: string | null
          id?: string
          is_cancelled?: boolean | null
          line_items?: Json | null
          order_date?: string
          order_number: string
          purchase_quote_id?: string | null
          qty_ordered?: number | null
          received_amount?: number
          status?: string
          subtotal?: number
          supplier_id: string
          total_amount?: number
          updated_at?: string | null
          user_id: string
          vat_amount?: number
        }
        Update: {
          created_at?: string | null
          delivery_date?: string | null
          delivery_status?: string
          description?: string | null
          id?: string
          is_cancelled?: boolean | null
          line_items?: Json | null
          order_date?: string
          order_number?: string
          purchase_quote_id?: string | null
          qty_ordered?: number | null
          received_amount?: number
          status?: string
          subtotal?: number
          supplier_id?: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string
          vat_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_purchase_quote_id_fkey"
            columns: ["purchase_quote_id"]
            isOneToOne: false
            referencedRelation: "purchase_quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_quotes: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          line_items: Json | null
          notes: string | null
          quote_number: string
          request_date: string
          status: string
          subtotal: number
          supplier_id: string
          terms_conditions: string | null
          total_amount: number
          updated_at: string | null
          user_id: string
          valid_until: string | null
          vat_amount: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          line_items?: Json | null
          notes?: string | null
          quote_number: string
          request_date?: string
          status?: string
          subtotal?: number
          supplier_id: string
          terms_conditions?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id: string
          valid_until?: string | null
          vat_amount?: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          line_items?: Json | null
          notes?: string | null
          quote_number?: string
          request_date?: string
          status?: string
          subtotal?: number
          supplier_id?: string
          terms_conditions?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string
          valid_until?: string | null
          vat_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_quotes_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      receipts: {
        Row: {
          account_id: string
          amount: number
          cleared_date: string | null
          created_at: string
          customer_id: string | null
          description: string
          division_id: string | null
          id: string
          payment_method: string | null
          project_id: string | null
          receipt_date: string
          receipt_number: string
          reference: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_id: string
          amount?: number
          cleared_date?: string | null
          created_at?: string
          customer_id?: string | null
          description: string
          division_id?: string | null
          id?: string
          payment_method?: string | null
          project_id?: string | null
          receipt_date?: string
          receipt_number: string
          reference?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_id?: string
          amount?: number
          cleared_date?: string | null
          created_at?: string
          customer_id?: string | null
          description?: string
          division_id?: string | null
          id?: string
          payment_method?: string | null
          project_id?: string | null
          receipt_date?: string
          receipt_number?: string
          reference?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referral_rewards: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          referral_id: string | null
          reward_type: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          referral_id?: string | null
          reward_type?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          referral_id?: string | null
          reward_type?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_rewards_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          conversion_date: string | null
          converted: boolean | null
          created_at: string | null
          email_sent: boolean | null
          id: string
          product_id: string | null
          product_link: string | null
          purchase_amount: number | null
          referral_email: string | null
          referral_name: string | null
          referral_phone: string
          referrer_id: string
          reward_amount: number | null
          reward_credited: boolean | null
          sms_sent: boolean | null
          whatsapp_sent: boolean | null
        }
        Insert: {
          conversion_date?: string | null
          converted?: boolean | null
          created_at?: string | null
          email_sent?: boolean | null
          id?: string
          product_id?: string | null
          product_link?: string | null
          purchase_amount?: number | null
          referral_email?: string | null
          referral_name?: string | null
          referral_phone: string
          referrer_id: string
          reward_amount?: number | null
          reward_credited?: boolean | null
          sms_sent?: boolean | null
          whatsapp_sent?: boolean | null
        }
        Update: {
          conversion_date?: string | null
          converted?: boolean | null
          created_at?: string | null
          email_sent?: boolean | null
          id?: string
          product_id?: string | null
          product_link?: string | null
          purchase_amount?: number | null
          referral_email?: string | null
          referral_name?: string | null
          referral_phone?: string
          referrer_id?: string
          reward_amount?: number | null
          reward_credited?: boolean | null
          sms_sent?: boolean | null
          whatsapp_sent?: boolean | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          items: Json | null
          tenant_id: string | null
          title: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          items?: Json | null
          tenant_id?: string | null
          title?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          items?: Json | null
          tenant_id?: string | null
          title?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      reseller_clients: {
        Row: {
          client_email: string | null
          client_id: string
          commission_earned: number | null
          created_at: string | null
          id: string
          reseller_id: string
          total_spend: number | null
        }
        Insert: {
          client_email?: string | null
          client_id: string
          commission_earned?: number | null
          created_at?: string | null
          id?: string
          reseller_id: string
          total_spend?: number | null
        }
        Update: {
          client_email?: string | null
          client_id?: string
          commission_earned?: number | null
          created_at?: string | null
          id?: string
          reseller_id?: string
          total_spend?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reseller_clients_reseller_id_fkey"
            columns: ["reseller_id"]
            isOneToOne: false
            referencedRelation: "reseller_commission_summary"
            referencedColumns: ["reseller_id"]
          },
          {
            foreignKeyName: "reseller_clients_reseller_id_fkey"
            columns: ["reseller_id"]
            isOneToOne: false
            referencedRelation: "resellers"
            referencedColumns: ["id"]
          },
        ]
      }
      reseller_commissions: {
        Row: {
          commission_amount: number
          commission_rate: number
          created_at: string | null
          id: string
          invoice_amount: number
          invoice_id: string | null
          paid_at: string | null
          payout_id: string | null
          reseller_id: string
          status: string | null
        }
        Insert: {
          commission_amount: number
          commission_rate: number
          created_at?: string | null
          id?: string
          invoice_amount: number
          invoice_id?: string | null
          paid_at?: string | null
          payout_id?: string | null
          reseller_id: string
          status?: string | null
        }
        Update: {
          commission_amount?: number
          commission_rate?: number
          created_at?: string | null
          id?: string
          invoice_amount?: number
          invoice_id?: string | null
          paid_at?: string | null
          payout_id?: string | null
          reseller_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reseller_commissions_reseller_id_fkey"
            columns: ["reseller_id"]
            isOneToOne: false
            referencedRelation: "reseller_commission_summary"
            referencedColumns: ["reseller_id"]
          },
          {
            foreignKeyName: "reseller_commissions_reseller_id_fkey"
            columns: ["reseller_id"]
            isOneToOne: false
            referencedRelation: "resellers"
            referencedColumns: ["id"]
          },
        ]
      }
      reseller_payouts: {
        Row: {
          account_number: string | null
          amount: number
          bank_name: string | null
          created_at: string | null
          id: string
          notes: string | null
          payout_reference: string | null
          period_end: string | null
          period_start: string | null
          processed_at: string | null
          processed_by: string | null
          reseller_id: string
          status: string | null
        }
        Insert: {
          account_number?: string | null
          amount: number
          bank_name?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          payout_reference?: string | null
          period_end?: string | null
          period_start?: string | null
          processed_at?: string | null
          processed_by?: string | null
          reseller_id: string
          status?: string | null
        }
        Update: {
          account_number?: string | null
          amount?: number
          bank_name?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          payout_reference?: string | null
          period_end?: string | null
          period_start?: string | null
          processed_at?: string | null
          processed_by?: string | null
          reseller_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reseller_payouts_reseller_id_fkey"
            columns: ["reseller_id"]
            isOneToOne: false
            referencedRelation: "reseller_commission_summary"
            referencedColumns: ["reseller_id"]
          },
          {
            foreignKeyName: "reseller_payouts_reseller_id_fkey"
            columns: ["reseller_id"]
            isOneToOne: false
            referencedRelation: "resellers"
            referencedColumns: ["id"]
          },
        ]
      }
      reseller_requests: {
        Row: {
          admin_notes: string | null
          business_name: string
          created_at: string
          id: string
          motivation: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          business_name: string
          created_at?: string
          id?: string
          motivation?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          business_name?: string
          created_at?: string
          id?: string
          motivation?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      resellers: {
        Row: {
          account_number: string | null
          bank_name: string | null
          branch_code: string | null
          commission_rate: number | null
          company_name: string | null
          contact_name: string
          contract_signed: boolean | null
          contract_signed_at: string | null
          created_at: string | null
          domain: string | null
          email: string
          id: string
          logo_url: string | null
          monthly_volume: number | null
          phone: string | null
          primary_color: string | null
          status: string | null
          support_email: string | null
          tier: string | null
          total_sales: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_number?: string | null
          bank_name?: string | null
          branch_code?: string | null
          commission_rate?: number | null
          company_name?: string | null
          contact_name: string
          contract_signed?: boolean | null
          contract_signed_at?: string | null
          created_at?: string | null
          domain?: string | null
          email: string
          id?: string
          logo_url?: string | null
          monthly_volume?: number | null
          phone?: string | null
          primary_color?: string | null
          status?: string | null
          support_email?: string | null
          tier?: string | null
          total_sales?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_number?: string | null
          bank_name?: string | null
          branch_code?: string | null
          commission_rate?: number | null
          company_name?: string | null
          contact_name?: string
          contract_signed?: boolean | null
          contract_signed_at?: string | null
          created_at?: string | null
          domain?: string | null
          email?: string
          id?: string
          logo_url?: string | null
          monthly_volume?: number | null
          phone?: string | null
          primary_color?: string | null
          status?: string | null
          support_email?: string | null
          tier?: string | null
          total_sales?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          can_create: boolean | null
          can_delete: boolean | null
          can_update: boolean | null
          can_view: boolean | null
          created_at: string | null
          id: string
          resource: string
          role_name: string
          updated_at: string | null
        }
        Insert: {
          can_create?: boolean | null
          can_delete?: boolean | null
          can_update?: boolean | null
          can_view?: boolean | null
          created_at?: string | null
          id?: string
          resource: string
          role_name: string
          updated_at?: string | null
        }
        Update: {
          can_create?: boolean | null
          can_delete?: boolean | null
          can_update?: boolean | null
          can_view?: boolean | null
          created_at?: string | null
          id?: string
          resource?: string
          role_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      role_permissions_audit: {
        Row: {
          action_type: string
          can_create: boolean | null
          can_delete: boolean | null
          can_update: boolean | null
          can_view: boolean | null
          changed_at: string | null
          changed_by: string | null
          id: string
          resource: string | null
          role_name: string | null
          role_permission_id: string | null
        }
        Insert: {
          action_type: string
          can_create?: boolean | null
          can_delete?: boolean | null
          can_update?: boolean | null
          can_view?: boolean | null
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          resource?: string | null
          role_name?: string | null
          role_permission_id?: string | null
        }
        Update: {
          action_type?: string
          can_create?: boolean | null
          can_delete?: boolean | null
          can_update?: boolean | null
          can_view?: boolean | null
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          resource?: string | null
          role_name?: string | null
          role_permission_id?: string | null
        }
        Relationships: []
      }
      sales_invoices: {
        Row: {
          acts_as_delivery_note: boolean | null
          balance_due: number
          cost_of_sales: number | null
          created_at: string | null
          customer_id: string | null
          days_overdue: number | null
          days_to_due_date: number | null
          description: string | null
          discount_amount: number | null
          division_id: string | null
          due_date: string | null
          id: string
          inventory_location_id: string | null
          invoice_number: string
          issue_date: string
          line_items: Json | null
          project_id: string | null
          sales_order_id: string | null
          sales_quote_id: string | null
          status: string
          subtotal: number
          total_amount: number
          updated_at: string | null
          user_id: string
          vat_amount: number
          withholding_tax: number | null
        }
        Insert: {
          acts_as_delivery_note?: boolean | null
          balance_due?: number
          cost_of_sales?: number | null
          created_at?: string | null
          customer_id?: string | null
          days_overdue?: number | null
          days_to_due_date?: number | null
          description?: string | null
          discount_amount?: number | null
          division_id?: string | null
          due_date?: string | null
          id?: string
          inventory_location_id?: string | null
          invoice_number: string
          issue_date?: string
          line_items?: Json | null
          project_id?: string | null
          sales_order_id?: string | null
          sales_quote_id?: string | null
          status?: string
          subtotal?: number
          total_amount?: number
          updated_at?: string | null
          user_id: string
          vat_amount?: number
          withholding_tax?: number | null
        }
        Update: {
          acts_as_delivery_note?: boolean | null
          balance_due?: number
          cost_of_sales?: number | null
          created_at?: string | null
          customer_id?: string | null
          days_overdue?: number | null
          days_to_due_date?: number | null
          description?: string | null
          discount_amount?: number | null
          division_id?: string | null
          due_date?: string | null
          id?: string
          inventory_location_id?: string | null
          invoice_number?: string
          issue_date?: string
          line_items?: Json | null
          project_id?: string | null
          sales_order_id?: string | null
          sales_quote_id?: string | null
          status?: string
          subtotal?: number
          total_amount?: number
          updated_at?: string | null
          user_id?: string
          vat_amount?: number
          withholding_tax?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_invoices_sales_order_id_fkey"
            columns: ["sales_order_id"]
            isOneToOne: false
            referencedRelation: "sales_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_invoices_sales_quote_id_fkey"
            columns: ["sales_quote_id"]
            isOneToOne: false
            referencedRelation: "sales_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
          delivery_date: string | null
          delivery_status: string
          description: string | null
          id: string
          invoice_status: string
          invoiced_amount: number
          is_cancelled: boolean | null
          line_items: Json | null
          order_date: string
          order_number: string
          qty_reserved: number | null
          sales_quote_id: string | null
          status: string
          subtotal: number
          total_amount: number
          updated_at: string | null
          user_id: string
          vat_amount: number
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          delivery_date?: string | null
          delivery_status?: string
          description?: string | null
          id?: string
          invoice_status?: string
          invoiced_amount?: number
          is_cancelled?: boolean | null
          line_items?: Json | null
          order_date?: string
          order_number: string
          qty_reserved?: number | null
          sales_quote_id?: string | null
          status?: string
          subtotal?: number
          total_amount?: number
          updated_at?: string | null
          user_id: string
          vat_amount?: number
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          delivery_date?: string | null
          delivery_status?: string
          description?: string | null
          id?: string
          invoice_status?: string
          invoiced_amount?: number
          is_cancelled?: boolean | null
          line_items?: Json | null
          order_date?: string
          order_number?: string
          qty_reserved?: number | null
          sales_quote_id?: string | null
          status?: string
          subtotal?: number
          total_amount?: number
          updated_at?: string | null
          user_id?: string
          vat_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "sales_orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_orders_sales_quote_id_fkey"
            columns: ["sales_quote_id"]
            isOneToOne: false
            referencedRelation: "sales_quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_quotes: {
        Row: {
          created_at: string | null
          customer_id: string | null
          customer_name: string | null
          description: string | null
          expiry_date: string | null
          id: string
          issue_date: string
          line_items: Json | null
          notes: string | null
          quote_number: string
          status: string
          subtotal: number
          terms_conditions: string | null
          total_amount: number
          updated_at: string | null
          user_id: string
          vat_amount: number
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          customer_name?: string | null
          description?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string
          line_items?: Json | null
          notes?: string | null
          quote_number: string
          status?: string
          subtotal?: number
          terms_conditions?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id: string
          vat_amount?: number
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          customer_name?: string | null
          description?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string
          line_items?: Json | null
          notes?: string | null
          quote_number?: string
          status?: string
          subtotal?: number
          terms_conditions?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string
          vat_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "sales_quotes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      security_incidents: {
        Row: {
          affected_systems: string[] | null
          created_at: string | null
          description: string
          detected_by: string | null
          id: string
          incident_type: string | null
          resolution_notes: string | null
          resolved: boolean | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string | null
        }
        Insert: {
          affected_systems?: string[] | null
          created_at?: string | null
          description: string
          detected_by?: string | null
          id?: string
          incident_type?: string | null
          resolution_notes?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
        }
        Update: {
          affected_systems?: string[] | null
          created_at?: string | null
          description?: string
          detected_by?: string | null
          id?: string
          incident_type?: string | null
          resolution_notes?: string | null
          resolved?: boolean | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
        }
        Relationships: []
      }
      security_notifications: {
        Row: {
          channel: string
          created_at: string | null
          error_message: string | null
          id: string
          message: string
          recipient: string
          sent_at: string | null
          status: string | null
        }
        Insert: {
          channel?: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          message: string
          recipient: string
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          channel?: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          message?: string
          recipient?: string
          sent_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      service_applications: {
        Row: {
          application_status: string | null
          business_name: string | null
          city: string | null
          contact_number: string
          contract_id: string | null
          country: string | null
          created_at: string | null
          email: string
          estimated_revenue: string | null
          full_name: string
          id: string
          industry: string | null
          is_owner_director: boolean | null
          main_challenge: string | null
          operating_duration: string | null
          selected_package: string | null
          tax_compliant: boolean | null
          terms_accepted: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          application_status?: string | null
          business_name?: string | null
          city?: string | null
          contact_number: string
          contract_id?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          estimated_revenue?: string | null
          full_name: string
          id?: string
          industry?: string | null
          is_owner_director?: boolean | null
          main_challenge?: string | null
          operating_duration?: string | null
          selected_package?: string | null
          tax_compliant?: boolean | null
          terms_accepted?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          application_status?: string | null
          business_name?: string | null
          city?: string | null
          contact_number?: string
          contract_id?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          estimated_revenue?: string | null
          full_name?: string
          id?: string
          industry?: string | null
          is_owner_director?: boolean | null
          main_challenge?: string | null
          operating_duration?: string | null
          selected_package?: string | null
          tax_compliant?: boolean | null
          terms_accepted?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_applications_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "service_contracts"
            referencedColumns: ["id"]
          },
        ]
      }
      service_contracts: {
        Row: {
          client_id: string | null
          contract_document_path: string | null
          contract_number: string
          contract_status: string | null
          contract_text: string
          created_at: string | null
          end_date: string | null
          id: string
          package_id: string | null
          signature_ip_address: unknown
          signed_at: string | null
          start_date: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          client_id?: string | null
          contract_document_path?: string | null
          contract_number: string
          contract_status?: string | null
          contract_text: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          package_id?: string | null
          signature_ip_address?: unknown
          signed_at?: string | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          client_id?: string | null
          contract_document_path?: string | null
          contract_number?: string
          contract_status?: string | null
          contract_text?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          package_id?: string | null
          signature_ip_address?: unknown
          signed_at?: string | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "contract_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_contracts_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "monthly_compliance_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          billing: string | null
          category: string
          code: string | null
          created_at: string
          description: string | null
          features: Json | null
          id: string
          included_items: Json | null
          is_active: boolean
          is_monthly_subscription: boolean | null
          is_popular: boolean
          name: string
          price: number
          processing_time: string | null
          requirements: string | null
          subcategory: string | null
          unit: string | null
          updated_at: string
          vat_inclusive: boolean | null
          vat_rate: number
        }
        Insert: {
          billing?: string | null
          category: string
          code?: string | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          included_items?: Json | null
          is_active?: boolean
          is_monthly_subscription?: boolean | null
          is_popular?: boolean
          name: string
          price: number
          processing_time?: string | null
          requirements?: string | null
          subcategory?: string | null
          unit?: string | null
          updated_at?: string
          vat_inclusive?: boolean | null
          vat_rate?: number
        }
        Update: {
          billing?: string | null
          category?: string
          code?: string | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          included_items?: Json | null
          is_active?: boolean
          is_monthly_subscription?: boolean | null
          is_popular?: boolean
          name?: string
          price?: number
          processing_time?: string | null
          requirements?: string | null
          subcategory?: string | null
          unit?: string | null
          updated_at?: string
          vat_inclusive?: boolean | null
          vat_rate?: number
        }
        Relationships: []
      }
      settings_audit: {
        Row: {
          action: string
          created_at: string | null
          entity: string
          entity_id: string | null
          id: string
          ip_address: unknown
          new_value: Json | null
          old_value: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity: string
          entity_id?: string | null
          id?: string
          ip_address?: unknown
          new_value?: Json | null
          old_value?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity?: string
          entity_id?: string | null
          id?: string
          ip_address?: unknown
          new_value?: Json | null
          old_value?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      shipments: {
        Row: {
          company_id: string | null
          courier: string | null
          created_at: string | null
          delivered_at: string | null
          id: string
          order_id: string
          shipped_at: string | null
          shipping_address: Json | null
          status: string | null
          tracking_number: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          courier?: string | null
          created_at?: string | null
          delivered_at?: string | null
          id?: string
          order_id: string
          shipped_at?: string | null
          shipping_address?: Json | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          courier?: string | null
          created_at?: string | null
          delivered_at?: string | null
          id?: string
          order_id?: string
          shipped_at?: string | null
          shipping_address?: Json | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          analytics_id: string | null
          branding: Json | null
          checkout_fields: Json | null
          colors: Json | null
          company_id: string
          created_at: string | null
          custom_css: string | null
          id: string
          theme: Json | null
          updated_at: string | null
        }
        Insert: {
          analytics_id?: string | null
          branding?: Json | null
          checkout_fields?: Json | null
          colors?: Json | null
          company_id: string
          created_at?: string | null
          custom_css?: string | null
          id?: string
          theme?: Json | null
          updated_at?: string | null
        }
        Update: {
          analytics_id?: string | null
          branding?: Json | null
          checkout_fields?: Json | null
          colors?: Json | null
          company_id?: string
          created_at?: string | null
          custom_css?: string | null
          id?: string
          theme?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount: number
          billing_cycle: string | null
          created_at: string | null
          customer_id: string | null
          id: string
          ikhokha_token: string | null
          next_billing_date: string
          payment_method: string | null
          plan_id: string | null
          status: string | null
          tenant_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          billing_cycle?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          ikhokha_token?: string | null
          next_billing_date: string
          payment_method?: string | null
          plan_id?: string | null
          status?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          billing_cycle?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          ikhokha_token?: string | null
          next_billing_date?: string
          payment_method?: string | null
          plan_id?: string | null
          status?: string | null
          tenant_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          accounts_payable: number | null
          address: string | null
          contact_person: string | null
          control_account_id: string | null
          created_at: string | null
          credit_limit: number | null
          division_id: string | null
          email: string | null
          id: string
          name: string
          payment_terms: string | null
          phone: string | null
          postal_address: string | null
          registration_number: string | null
          status: string
          supplier_code: string | null
          tax_number: string | null
          updated_at: string | null
          user_id: string
          withholding_tax_payable: number | null
        }
        Insert: {
          accounts_payable?: number | null
          address?: string | null
          contact_person?: string | null
          control_account_id?: string | null
          created_at?: string | null
          credit_limit?: number | null
          division_id?: string | null
          email?: string | null
          id?: string
          name: string
          payment_terms?: string | null
          phone?: string | null
          postal_address?: string | null
          registration_number?: string | null
          status?: string
          supplier_code?: string | null
          tax_number?: string | null
          updated_at?: string | null
          user_id: string
          withholding_tax_payable?: number | null
        }
        Update: {
          accounts_payable?: number | null
          address?: string | null
          contact_person?: string | null
          control_account_id?: string | null
          created_at?: string | null
          credit_limit?: number | null
          division_id?: string | null
          email?: string | null
          id?: string
          name?: string
          payment_terms?: string | null
          phone?: string | null
          postal_address?: string | null
          registration_number?: string | null
          status?: string
          supplier_code?: string | null
          tax_number?: string | null
          updated_at?: string | null
          user_id?: string
          withholding_tax_payable?: number | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string | null
          created_at: string | null
          description: string
          id: string
          priority: string | null
          resolved_at: string | null
          status: string | null
          subject: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string | null
          description: string
          id?: string
          priority?: string | null
          resolved_at?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string | null
          description?: string
          id?: string
          priority?: string | null
          resolved_at?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      synced_customers: {
        Row: {
          accounts_receivable: number | null
          address: string | null
          created_at: string | null
          email: string | null
          external_id: string
          id: string
          last_synced: string | null
          name: string
          phone: string | null
          user_id: string | null
        }
        Insert: {
          accounts_receivable?: number | null
          address?: string | null
          created_at?: string | null
          email?: string | null
          external_id: string
          id?: string
          last_synced?: string | null
          name: string
          phone?: string | null
          user_id?: string | null
        }
        Update: {
          accounts_receivable?: number | null
          address?: string | null
          created_at?: string | null
          email?: string | null
          external_id?: string
          id?: string
          last_synced?: string | null
          name?: string
          phone?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      synced_invoices: {
        Row: {
          amount: number | null
          balance_due: number | null
          created_at: string | null
          customer_id: string | null
          description: string | null
          due_date: string | null
          external_id: string
          id: string
          invoice_number: string | null
          issue_date: string | null
          last_synced: string | null
          line_items: Json | null
          status: string | null
        }
        Insert: {
          amount?: number | null
          balance_due?: number | null
          created_at?: string | null
          customer_id?: string | null
          description?: string | null
          due_date?: string | null
          external_id: string
          id?: string
          invoice_number?: string | null
          issue_date?: string | null
          last_synced?: string | null
          line_items?: Json | null
          status?: string | null
        }
        Update: {
          amount?: number | null
          balance_due?: number | null
          created_at?: string | null
          customer_id?: string | null
          description?: string | null
          due_date?: string | null
          external_id?: string
          id?: string
          invoice_number?: string | null
          issue_date?: string | null
          last_synced?: string | null
          line_items?: Json | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "synced_invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "synced_customers"
            referencedColumns: ["id"]
          },
        ]
      }
      synced_receipts: {
        Row: {
          amount: number | null
          created_at: string | null
          external_id: string
          id: string
          invoice_id: string | null
          last_synced: string | null
          payment_date: string | null
          payment_method: string | null
          reference: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          external_id: string
          id?: string
          invoice_id?: string | null
          last_synced?: string | null
          payment_date?: string | null
          payment_method?: string | null
          reference?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          external_id?: string
          id?: string
          invoice_id?: string | null
          last_synced?: string | null
          payment_date?: string | null
          payment_method?: string | null
          reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "synced_receipts_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "synced_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      system_audit_log: {
        Row: {
          created_at: string | null
          id: string
          ip_address: unknown
          new_values: Json | null
          old_values: Json | null
          operation: string
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          operation: string
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          operation?: string
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      system_audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          entity: string
          entity_id: string | null
          id: string
          ip_address: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          entity: string
          entity_id?: string | null
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          entity?: string
          entity_id?: string | null
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          setting_key: string
          setting_value: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          setting_key: string
          setting_value?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          setting_key?: string
          setting_value?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      tax_codes: {
        Row: {
          code: string | null
          created_at: string | null
          description: string | null
          id: string
          rate: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          rate?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          rate?: number | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          id: string
          invited_by: string | null
          joined_at: string | null
          permissions: Json | null
          role: string
          status: string
          team_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          invited_by?: string | null
          joined_at?: string | null
          permissions?: Json | null
          role?: string
          status?: string
          team_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          invited_by?: string | null
          joined_at?: string | null
          permissions?: Json | null
          role?: string
          status?: string
          team_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      tenant_users: {
        Row: {
          created_at: string | null
          id: string
          role: string | null
          tenant_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string | null
          tenant_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string | null
          tenant_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tenants: {
        Row: {
          created_at: string | null
          domain: string | null
          email_from: string | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          primary_color: string | null
          secondary_color: string | null
          settings: Json | null
          subdomain: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          domain?: string | null
          email_from?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          primary_color?: string | null
          secondary_color?: string | null
          settings?: Json | null
          subdomain?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string | null
          email_from?: string | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          secondary_color?: string | null
          settings?: Json | null
          subdomain?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tender_proposals: {
        Row: {
          client_id: string | null
          contract_value: number | null
          created_at: string | null
          description: string | null
          id: string
          our_price: number | null
          pdf_url: string | null
          status: string | null
          submitted_at: string | null
          tender_ref: string
          title: string
        }
        Insert: {
          client_id?: string | null
          contract_value?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          our_price?: number | null
          pdf_url?: string | null
          status?: string | null
          submitted_at?: string | null
          tender_ref: string
          title: string
        }
        Update: {
          client_id?: string | null
          contract_value?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          our_price?: number | null
          pdf_url?: string | null
          status?: string | null
          submitted_at?: string | null
          tender_ref?: string
          title?: string
        }
        Relationships: []
      }
      themes: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          settings: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          settings?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          settings?: Json | null
        }
        Relationships: []
      }
      ticket_messages: {
        Row: {
          created_at: string | null
          id: string
          message: string
          sender_id: string | null
          sender_type: string
          ticket_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          sender_id?: string | null
          sender_type: string
          ticket_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          sender_id?: string | null
          sender_type?: string
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      translations: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          language_code: string
          language_name_english: string
          language_name_native: string
          translation_key: string
          translation_value: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          language_code: string
          language_name_english: string
          language_name_native: string
          translation_key: string
          translation_value: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          language_code?: string
          language_name_english?: string
          language_name_native?: string
          translation_key?: string
          translation_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_coupons: {
        Row: {
          code: string
          created_at: string
          discount_percentage: number
          expires_at: string
          id: string
          order_id: string | null
          updated_at: string
          used: boolean
          used_at: string | null
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          discount_percentage?: number
          expires_at: string
          id?: string
          order_id?: string | null
          updated_at?: string
          used?: boolean
          used_at?: string | null
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          discount_percentage?: number
          expires_at?: string
          id?: string
          order_id?: string | null
          updated_at?: string
          used?: boolean
          used_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_coupons_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          email_notifications: boolean | null
          id: string
          language: string | null
          marketing_emails: boolean | null
          sms_notifications: boolean | null
          theme: string | null
          timezone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          marketing_emails?: boolean | null
          sms_notifications?: boolean | null
          theme?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email_notifications?: boolean | null
          id?: string
          language?: string | null
          marketing_emails?: boolean | null
          sms_notifications?: boolean | null
          theme?: string | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
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
          username: string | null
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
          username?: string | null
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
          username?: string | null
        }
        Relationships: []
      }
      wallets: {
        Row: {
          coupon_balance: number | null
          created_at: string | null
          id: string
          referral_balance: number | null
          total_spend: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          coupon_balance?: number | null
          created_at?: string | null
          id?: string
          referral_balance?: number | null
          total_spend?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          coupon_balance?: number | null
          created_at?: string | null
          id?: string
          referral_balance?: number | null
          total_spend?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      website_settings: {
        Row: {
          created_at: string | null
          id: string
          maintenance_mode: boolean | null
          social_facebook: string | null
          social_linkedin: string | null
          social_twitter: string | null
          support_email: string | null
          updated_at: string | null
          updated_by: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          maintenance_mode?: boolean | null
          social_facebook?: string | null
          social_linkedin?: string | null
          social_twitter?: string | null
          support_email?: string | null
          updated_at?: string | null
          updated_by?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          maintenance_mode?: boolean | null
          social_facebook?: string | null
          social_linkedin?: string | null
          social_twitter?: string | null
          support_email?: string | null
          updated_at?: string | null
          updated_by?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      whatsapp_business_settings: {
        Row: {
          access_token_encrypted: string | null
          business_phone_number_id: string
          created_at: string
          display_name: string | null
          id: string
          phone_number: string
          quality_rating: string | null
          updated_at: string
          verified_name: string | null
          verify_token: string | null
          webhook_url: string | null
        }
        Insert: {
          access_token_encrypted?: string | null
          business_phone_number_id: string
          created_at?: string
          display_name?: string | null
          id?: string
          phone_number: string
          quality_rating?: string | null
          updated_at?: string
          verified_name?: string | null
          verify_token?: string | null
          webhook_url?: string | null
        }
        Update: {
          access_token_encrypted?: string | null
          business_phone_number_id?: string
          created_at?: string
          display_name?: string | null
          id?: string
          phone_number?: string
          quality_rating?: string | null
          updated_at?: string
          verified_name?: string | null
          verify_token?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      whatsapp_logs: {
        Row: {
          created_at: string | null
          delivered_at: string | null
          direction: string | null
          error_message: string | null
          id: string
          message: string | null
          message_id: string | null
          message_type: string | null
          phone: string
          read_at: string | null
          status: string | null
          tenant_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          delivered_at?: string | null
          direction?: string | null
          error_message?: string | null
          id?: string
          message?: string | null
          message_id?: string | null
          message_type?: string | null
          phone: string
          read_at?: string | null
          status?: string | null
          tenant_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          delivered_at?: string | null
          direction?: string | null
          error_message?: string | null
          id?: string
          message?: string | null
          message_id?: string | null
          message_type?: string | null
          phone?: string
          read_at?: string | null
          status?: string | null
          tenant_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      whatsapp_messages: {
        Row: {
          content: string | null
          created_at: string
          direction: string
          from_number: string
          id: string
          invoice_id: string | null
          media_url: string | null
          message_id: string | null
          message_type: string
          metadata: Json | null
          order_id: string | null
          status: string
          timestamp: string
          to_number: string
          updated_at: string
          user_id: string | null
          wa_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          direction: string
          from_number: string
          id?: string
          invoice_id?: string | null
          media_url?: string | null
          message_id?: string | null
          message_type?: string
          metadata?: Json | null
          order_id?: string | null
          status?: string
          timestamp?: string
          to_number: string
          updated_at?: string
          user_id?: string | null
          wa_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          direction?: string
          from_number?: string
          id?: string
          invoice_id?: string | null
          media_url?: string | null
          message_id?: string | null
          message_type?: string
          metadata?: Json | null
          order_id?: string | null
          status?: string
          timestamp?: string
          to_number?: string
          updated_at?: string
          user_id?: string | null
          wa_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_messages_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_messages_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "whatsapp_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_templates: {
        Row: {
          button_text: string | null
          button_type: string | null
          category: string
          created_at: string
          footer_text: string | null
          header_content: string | null
          header_type: string | null
          id: string
          language: string
          name: string
          status: string
          template_body: string
          updated_at: string
        }
        Insert: {
          button_text?: string | null
          button_type?: string | null
          category: string
          created_at?: string
          footer_text?: string | null
          header_content?: string | null
          header_type?: string | null
          id?: string
          language?: string
          name: string
          status?: string
          template_body: string
          updated_at?: string
        }
        Update: {
          button_text?: string | null
          button_type?: string | null
          category?: string
          created_at?: string
          footer_text?: string | null
          header_content?: string | null
          header_type?: string | null
          id?: string
          language?: string
          name?: string
          status?: string
          template_body?: string
          updated_at?: string
        }
        Relationships: []
      }
      withholding_tax_receipts: {
        Row: {
          certificate_number: string | null
          created_at: string | null
          customer_id: string
          description: string | null
          id: string
          invoice_amount: number
          receipt_date: string
          receipt_number: string
          sales_invoice_id: string | null
          tax_rate: number
          tax_withheld: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          certificate_number?: string | null
          created_at?: string | null
          customer_id: string
          description?: string | null
          id?: string
          invoice_amount: number
          receipt_date?: string
          receipt_number: string
          sales_invoice_id?: string | null
          tax_rate: number
          tax_withheld: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          certificate_number?: string | null
          created_at?: string | null
          customer_id?: string
          description?: string | null
          id?: string
          invoice_amount?: number
          receipt_date?: string
          receipt_number?: string
          sales_invoice_id?: string | null
          tax_rate?: number
          tax_withheld?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "withholding_tax_receipts_sales_invoice_id_fkey"
            columns: ["sales_invoice_id"]
            isOneToOne: false
            referencedRelation: "sales_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      arr_metrics: {
        Row: {
          arr: number | null
          direct_annual: number | null
          monthly_annualized: number | null
        }
        Relationships: []
      }
      cfo_dashboard: {
        Row: {
          active_subscriptions: number | null
          arr: number | null
          churn_percent: number | null
          mrr: number | null
          mtd_revenue: number | null
          total_customers: number | null
          ytd_revenue: number | null
        }
        Relationships: []
      }
      churn_metrics: {
        Row: {
          active_count: number | null
          cancelled_count: number | null
          churn_rate: number | null
          total_subscriptions: number | null
        }
        Relationships: []
      }
      mrr_metrics: {
        Row: {
          active_subscriptions: number | null
          arr_monthly_equivalent: number | null
          mrr: number | null
        }
        Relationships: []
      }
      referral_leaderboard: {
        Row: {
          converted_referrals: number | null
          full_name: string | null
          rank: number | null
          total_referrals: number | null
          total_rewards: number | null
          user_id: string | null
        }
        Relationships: []
      }
      reseller_commission_summary: {
        Row: {
          commission_rate: number | null
          company_name: string | null
          contact_name: string | null
          paid_amount: number | null
          pending_amount: number | null
          reseller_id: string | null
          tier: string | null
          total_commissions: number | null
          total_earned: number | null
        }
        Relationships: []
      }
      revenue_by_service: {
        Row: {
          avg_order_value: number | null
          period: string | null
          sales_count: number | null
          service_name: string | null
          total_revenue: number | null
        }
        Relationships: []
      }
      system_monitoring: {
        Row: {
          records_last_24h: number | null
          records_last_7d: number | null
          table_name: string | null
          total_records: number | null
        }
        Relationships: []
      }
      vat_reports: {
        Row: {
          gross_sales: number | null
          invoice_count: number | null
          period: string | null
          tax_month: number | null
          tax_year: number | null
          vat_collected: number | null
          vat_exclusive_sales: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      auto_cancel_expired_orders: { Args: never; Returns: undefined }
      check_customer_duplicate: {
        Args: { customer_email: string }
        Returns: boolean
      }
      check_invoice_duplicate: {
        Args: { invoice_num: string; invoice_user_id: string }
        Returns: boolean
      }
      check_user_permission: {
        Args: { required_role: string }
        Returns: boolean
      }
      check_user_resource_permission: {
        Args: {
          permission_type: string
          resource_name: string
          user_role: string
        }
        Returns: boolean
      }
      cleanup_duplicates: {
        Args: { target_table: string }
        Returns: {
          cleaned_count: number
        }[]
      }
      cleanup_expired_auth_otps: { Args: never; Returns: undefined }
      cleanup_expired_otp_codes: { Args: never; Returns: undefined }
      create_customer_session: {
        Args: {
          account_id: string
          client_ip?: unknown
          client_user_agent?: string
          customer_email: string
          session_duration_hours?: number
          session_token: string
        }
        Returns: string
      }
      create_customer_with_auth: {
        Args: {
          billing_address?: string
          credit_limit_amount?: number
          customer_email: string
          customer_name: string
          default_due_days?: number
          delivery_address?: string
          hourly_rate?: number
          phone_number?: string
          send_invite?: boolean
        }
        Returns: string
      }
      detect_duplicates: {
        Args: { target_table?: string }
        Returns: {
          duplicate_field: string
          duplicate_value: string
          record_count: number
          record_ids: string[]
          table_name: string
        }[]
      }
      generate_contract_number: { Args: never; Returns: string }
      get_current_user_role: { Args: never; Returns: string }
      get_customer_accounts_by_email: {
        Args: { customer_email: string }
        Returns: {
          account_status: string
          billing_address: string
          credit_limit: number
          customer_name: string
          default_due_date_days: number
          default_hourly_rate: number
          delivery_address: string
          has_default_due_date_days: boolean
          has_default_hourly_rate: boolean
          id: string
          is_primary_account: boolean
          parent_account_id: string
          phone: string
        }[]
      }
      get_customer_id_by_name: { Args: { p_name: string }; Returns: string }
      get_dashboard_metrics: { Args: { user_uuid: string }; Returns: Json }
      get_user_companies: {
        Args: { user_uuid: string }
        Returns: {
          company_name: string
          id: string
          registration_number: string
          status: string
        }[]
      }
      get_user_company_id: { Args: never; Returns: string }
      get_user_profile: {
        Args: never
        Returns: {
          avatar_url: string
          created_at: string
          full_name: string
          id: string
          role: string
          updated_at: string
        }[]
      }
      get_user_profile_with_activity: {
        Args: { user_uuid: string }
        Returns: Json
      }
      get_user_recent_activity: {
        Args: { limit_count?: number; user_uuid: string }
        Returns: {
          activity_type: string
          created_at: string
          description: string
          related_id: string
        }[]
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_active_customer_session: {
        Args: { customer_email: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin:
        | { Args: never; Returns: boolean }
        | { Args: { check_user_id: string }; Returns: boolean }
      is_admin_email: { Args: { user_email: string }; Returns: boolean }
      is_client: { Args: { check_user_id: string }; Returns: boolean }
      is_reseller: { Args: { check_user_id: string }; Returns: boolean }
      is_reseller_for_company: {
        Args: { company_uuid: string }
        Returns: boolean
      }
      is_staff: { Args: { check_user_id: string }; Returns: boolean }
      is_team_member: {
        Args: { _team_id: string; _user_id: string }
        Returns: boolean
      }
      link_invoice_to_customer: {
        Args: { p_customer_name: string; p_invoice_id: string }
        Returns: boolean
      }
      link_order_to_customer: {
        Args: { p_customer_name: string; p_order_id: string }
        Returns: boolean
      }
      link_quote_to_customer: {
        Args: { p_customer_name: string; p_quote_id: string }
        Returns: boolean
      }
      upsert_customer: {
        Args: {
          p_accounts_receivable?: number
          p_address?: string
          p_email?: string
          p_name: string
          p_phone?: string
          p_status?: string
        }
        Returns: string
      }
      validate_user_authentication: {
        Args: { user_email: string }
        Returns: Json
      }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "admin"
        | "accountant"
        | "consultant"
        | "client"
        | "user"
        | "reseller"
      crm_stage:
        | "Prospect"
        | "Qualified"
        | "Proposal Sent"
        | "Negotiation"
        | "Won"
        | "Lost"
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
    Enums: {
      app_role: [
        "super_admin",
        "admin",
        "accountant",
        "consultant",
        "client",
        "user",
        "reseller",
      ],
      crm_stage: [
        "Prospect",
        "Qualified",
        "Proposal Sent",
        "Negotiation",
        "Won",
        "Lost",
      ],
    },
  },
} as const
