import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerAuth } from './CustomerAuth';
import { useCustomerAuth } from '@/hooks/useCustomerAuth';

interface CustomerAccount {
  id: string;
  customer_name: string;
  billing_address: string;
  delivery_address: string;
  phone?: string;
  credit_limit: number;
  has_default_due_date_days: boolean;
  default_due_date_days?: number;
  has_default_hourly_rate: boolean;
  default_hourly_rate?: number;
  is_primary_account: boolean;
  parent_account_id?: string;
  account_status: string;
  email: string;
}

export const CustomerLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useCustomerAuth();

  const handleLogin = (account: CustomerAccount, sessionToken: string) => {
    // Account already has email from CustomerAuth component
    login(account, sessionToken);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
      <CustomerAuth onLogin={handleLogin} />
    </div>
  );
};