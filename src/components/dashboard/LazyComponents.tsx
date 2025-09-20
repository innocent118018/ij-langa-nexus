import { lazy } from 'react';

// Lazy load dashboard components for better performance
export const LazyClientDashboard = lazy(() => 
  import('@/pages/dashboard/ClientDashboard').then(module => ({ 
    default: module.ClientDashboard 
  }))
);

export const LazyAdminDashboard = lazy(() => 
  import('@/pages/dashboard/AdminDashboard').then(module => ({ 
    default: module.AdminDashboard 
  }))
);

export const LazyOrders = lazy(() => import('@/pages/dashboard/Orders'));
export const LazyInvoices = lazy(() => import('@/pages/dashboard/Invoices'));
export const LazyDocuments = lazy(() => import('@/pages/dashboard/Documents'));
export const LazyProfile = lazy(() => import('@/pages/dashboard/Profile'));
export const LazySettings = lazy(() => import('@/pages/dashboard/Settings'));
export const LazySupport = lazy(() => import('@/pages/dashboard/Support'));
export const LazyNotifications = lazy(() => import('@/pages/dashboard/Notifications'));