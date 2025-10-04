import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  UserPlus, 
  Search, 
  Shield, 
  ShieldCheck, 
  ShieldAlert,
  Mail,
  Phone,
  Building,
  Calendar,
  Edit,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserManagement = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  // Check if user is admin
  const { data: userRole } = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data.role;
    },
    enabled: !!user?.id,
  });

  const isAdmin = userRole && ['admin', 'super_admin'].includes(userRole);

  // Fetch all users (admin only)
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (userData: any) => {
      // This would typically be handled by an admin API endpoint
      // For now, we'll just show a toast
      throw new Error('User creation should be handled through Supabase Auth Admin API');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsCreateUserOpen(false);
      toast({
        title: "User created successfully",
        description: "The new user has been added to the system.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating user",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update user role mutation
  const updateUserRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: "User role updated",
        description: "The user's role has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating user role",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.company_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Badge variant="destructive" className="gap-1"><ShieldAlert className="h-3 w-3" /> Super Admin</Badge>;
      case 'admin':
        return <Badge variant="secondary" className="gap-1"><ShieldCheck className="h-3 w-3" /> Admin</Badge>;
      case 'accountant':
        return <Badge variant="outline" className="gap-1"><Shield className="h-3 w-3" /> Accountant</Badge>;
      case 'consultant':
        return <Badge variant="outline" className="gap-1"><Shield className="h-3 w-3" /> Consultant</Badge>;
      default:
        return <Badge variant="default" className="gap-1"><Users className="h-3 w-3" /> Client</Badge>;
    }
  };

  const getRoleStats = () => {
    const stats = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: users.length,
      active: users.filter(u => u.is_active).length,
      admins: (stats.admin || 0) + (stats.super_admin || 0),
      clients: stats.client || 0,
      staff: (stats.accountant || 0) + (stats.consultant || 0)
    };
  };

  const stats = getRoleStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <div className="p-4 text-center">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Admin Action Required</h3>
              <p className="text-muted-foreground mb-4">
                User creation must be handled through the Supabase Admin Dashboard or Auth API.
              </p>
              <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.admins}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.staff}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clients}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or company..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="consultant">Consultant</SelectItem>
                <SelectItem value="accountant">Accountant</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Manage user accounts and roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">User</th>
                    <th className="text-left p-2">Role</th>
                    <th className="text-left p-2">Company</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Created</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{u.full_name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {u.email}
                            </div>
                            {u.phone && (
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {u.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        {getRoleBadge(u.role)}
                      </td>
                      <td className="p-2">
                        {u.company_name || (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-2">
                        <Badge variant={u.is_active ? "default" : "secondary"}>
                          {u.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <div className="text-sm flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(u.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Select
                            value={u.role}
                            onValueChange={(role) => 
                              updateUserRoleMutation.mutate({ userId: u.id, role })
                            }
                          >
                            <SelectTrigger className="w-[120px] h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="client">Client</SelectItem>
                              <SelectItem value="consultant">Consultant</SelectItem>
                              <SelectItem value="accountant">Accountant</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              {userRole === 'super_admin' && (
                                <SelectItem value="super_admin">Super Admin</SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;