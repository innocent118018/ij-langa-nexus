import React from 'react';
import { Navigate } from 'react-router-dom';

// This component redirects /admin to /admin/dashboard
const AdminIndex = () => {
  return <Navigate to="/admin" replace />;
};

export default AdminIndex;