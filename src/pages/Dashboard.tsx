
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user is admin with updated admin email list
  const adminEmails = [
    'info@ijlanga.co.za',
    'orders@ijlanga.co.za', 
    'billings@ijlanga.co.za',
    'correspondence@ijlanga.co.za',
    'ij.langa11@gmail.com'
  ];
  
  const isAdmin = adminEmails.includes(user.email?.toLowerCase() || '');

  return (
    <div className="min-h-screen bg-gray-50">
      {isAdmin ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
