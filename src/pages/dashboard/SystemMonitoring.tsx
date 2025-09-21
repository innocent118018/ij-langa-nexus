import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';  
import { SystemMonitoring as SystemMonitoringComponent } from '@/components/admin/SystemMonitoring';

export default function SystemMonitoring() {
  return (
    <DashboardLayout>
      <SystemMonitoringComponent />
    </DashboardLayout>
  );
}