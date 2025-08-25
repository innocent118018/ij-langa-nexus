
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto"></div>
          <p className="text-white mt-4">Loading your dashboard...</p>
        </div>
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
    <DashboardLayout>
      {isAdmin ? <AdminDashboard /> : <UserDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;
