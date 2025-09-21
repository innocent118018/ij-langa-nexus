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
      admin_activity_logs: {
        Row: {
          action_type: string
          created_at: string
          description: string | null
          id: string
          ip_address: unknown | null
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
          ip_address?: unknown | null
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
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          record_id: string
          table_name: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id: string
          table_name: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string
          table_name?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
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
          ip_address: unknown | null
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
          ip_address?: unknown | null
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
          ip_address?: unknown | null
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
          user_id: string | null
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
          user_id?: string | null
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
          invoice_amount: number
          invoice_type: string | null
          issue_date: string
          line_items: Json | null
          reference: string
          status: string | null
          subtotal: number | null
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
          invoice_amount: number
          invoice_type?: string | null
          issue_date: string
          line_items?: Json | null
          reference: string
          status?: string | null
          subtotal?: number | null
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
          invoice_amount?: number
          invoice_type?: string | null
          issue_date?: string
          line_items?: Json | null
          reference?: string
          status?: string | null
          subtotal?: number | null
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
          completed_at: string | null
          created_at: string
          customer_address: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          id: string
          notes: string | null
          service_id: string | null
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
          completed_at?: string | null
          created_at?: string
          customer_address?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          notes?: string | null
          service_id?: string | null
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
          completed_at?: string | null
          created_at?: string
          customer_address?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          notes?: string | null
          service_id?: string | null
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
      products: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          price: number | null
          stock_quantity: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          price?: number | null
          stock_quantity?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          price?: number | null
          stock_quantity?: number
          updated_at?: string
        }
        Relationships: []
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
        Relationships: []
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
      system_audit_log: {
        Row: {
          created_at: string | null
          id: string
          ip_address: unknown | null
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
          ip_address?: unknown | null
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
          ip_address?: unknown | null
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
      system_monitoring: {
        Row: {
          records_last_24h: number | null
          records_last_7d: number | null
          table_name: string | null
          total_records: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      auto_cancel_expired_orders: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      check_customer_duplicate: {
        Args: { customer_email: string }
        Returns: boolean
      }
      check_invoice_duplicate: {
        Args: { invoice_num: string; invoice_user_id: string }
        Returns: boolean
      }
      cleanup_duplicates: {
        Args: { target_table: string }
        Returns: {
          cleaned_count: number
        }[]
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
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_dashboard_metrics: {
        Args: { user_uuid: string }
        Returns: Json
      }
      get_user_companies: {
        Args: { user_uuid: string }
        Returns: {
          company_name: string
          id: string
          registration_number: string
          status: string
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
