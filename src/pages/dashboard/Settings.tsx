
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Settings as SettingsIcon, 
  User,
  Shield,
  Bell,
  CreditCard,
  Globe,
  Database,
  Mail,
  Phone,
  Building
} from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600">Manage system settings and configurations</p>
        </div>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5" />
            <span>Company Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <Input defaultValue="IJ Langa Consulting (Pty) Ltd" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
              <Input defaultValue="2020/754266/07" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax Number</label>
              <Input defaultValue="4540304286" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CSD Number</label>
              <Input defaultValue="MAAA0988528" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <Input defaultValue="78 Tekatakho, Nelspruit, Mpumalanga, 2350, South Africa" />
            </div>
          </div>
          <Button className="bg-slate-900 hover:bg-slate-800">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Contact Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Contact Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Email</label>
              <Input defaultValue="info@ijlanga.co.za" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Billing Email</label>
              <Input defaultValue="billings@ijlanga.co.za" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Orders Email</label>
              <Input defaultValue="orders@ijlanga.co.za" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <Input defaultValue="013 004 0620" />
            </div>
          </div>
          <Button className="bg-slate-900 hover:bg-slate-800">Update Contact Info</Button>
        </CardContent>
      </Card>

      {/* Banking Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Banking Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
              <Input defaultValue="Standard Bank" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch Name</label>
              <Input defaultValue="Ermelo (2844)" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
              <Input defaultValue="10186883984" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
              <Input defaultValue="Current Account" />
            </div>
          </div>
          <Button className="bg-slate-900 hover:bg-slate-800">Update Banking Details</Button>
        </CardContent>
      </Card>

      {/* System Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>User Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">Manage user roles and permissions</p>
            <Button variant="outline" className="w-full">Manage Users</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">Configure security and access controls</p>
            <Button variant="outline" className="w-full">Security Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">Configure notification preferences</p>
            <Button variant="outline" className="w-full">Notification Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Data Backup</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">Backup and restore system data</p>
            <Button variant="outline" className="w-full">Backup Settings</Button>
          </CardContent>
        </Card>
      </div>

      {/* Website Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Website Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
              <Input defaultValue="https://ijlanga.co.za/" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
              <Input defaultValue="correspondence@ijlanga.co.za" />
            </div>
          </div>
          <Button className="bg-slate-900 hover:bg-slate-800">Update Website Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
