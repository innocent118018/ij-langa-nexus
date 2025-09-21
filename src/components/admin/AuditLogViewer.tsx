import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Clock, User, Eye, Filter, Search } from 'lucide-react';
import { PermissionGate } from './PermissionGate';
import { format } from 'date-fns';

interface AuditLog {
  id: string;
  user_id: string;
  user_email?: string;
  action: string;
  table_name: string;
  record_id: string;
  old_values: any;
  new_values: any;
  ip_address: string;
  created_at: string;
  user_agent?: string;
}

export const AuditLogViewer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [tableFilter, setTableFilter] = useState('all');

  const { data: auditLogs, isLoading } = useQuery({
    queryKey: ['audit-logs', searchTerm, actionFilter, tableFilter],
    queryFn: async () => {
      // Use the existing audit_logs table structure
      let query = supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (searchTerm) {
        query = query.or(`user_email.ilike.%${searchTerm}%,table_name.ilike.%${searchTerm}%`);
      }

      if (actionFilter !== 'all') {
        query = query.eq('action', actionFilter);
      }

      if (tableFilter !== 'all') {
        query = query.eq('table_name', tableFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as AuditLog[];
    },
    staleTime: 30 * 1000, // 30 seconds
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case 'INSERT': return 'bg-green-100 text-green-800';
      case 'UPDATE': return 'bg-blue-100 text-blue-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (created_at: string) => {
    return format(new Date(created_at), 'PPp');
  };

  return (
    <PermissionGate permission="audit:read">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            System Audit Log
          </CardTitle>
          <CardDescription>
            Complete trail of all system activities and changes
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by user email or table name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="INSERT">Create</SelectItem>
                <SelectItem value="UPDATE">Update</SelectItem>
                <SelectItem value="DELETE">Delete</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={tableFilter} onValueChange={setTableFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by table" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tables</SelectItem>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="customers">Customers</SelectItem>
                <SelectItem value="sales_invoices">Sales Invoices</SelectItem>
                <SelectItem value="orders">Orders</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Audit Log Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Record ID</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Loading audit logs...
                    </TableCell>
                  </TableRow>
                ) : auditLogs?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No audit logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  auditLogs?.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">
                        {formatTimestamp(log.created_at)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{log.user_email || 'System'}</div>
                            <div className="text-xs text-muted-foreground">
                              {log.user_id?.substring(0, 8)}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getActionColor(log.action)}>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">
                        {log.table_name}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {log.record_id?.substring(0, 8)}...
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {log.ip_address}
                      </TableCell>
                      <TableCell>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-[600px] sm:w-[540px]">
                            <SheetHeader>
                              <SheetTitle>Audit Log Details</SheetTitle>
                              <SheetDescription>
                                Complete information about this audit entry
                              </SheetDescription>
                            </SheetHeader>
                            
                            <div className="mt-6 space-y-4">
                              <div>
                                <h4 className="text-sm font-medium mb-2">Basic Information</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Timestamp:</span>
                                    <div className="font-mono">{formatTimestamp(log.created_at)}</div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Operation:</span>
                                    <div>
                                      <Badge className={getActionColor(log.action)}>
                                        {log.action}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">User:</span>
                                    <div>{log.user_email || 'System'}</div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">User ID:</span>
                                    <div className="font-mono text-xs">{log.user_id}</div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Table:</span>
                                    <div className="font-mono">{log.table_name}</div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">IP Address:</span>
                                    <div className="font-mono">{log.ip_address}</div>
                                  </div>
                                </div>
                              </div>
                              
                              {log.old_values && (
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Old Values</h4>
                                  <pre className="text-xs bg-muted p-3 rounded overflow-auto">
                                    {JSON.stringify(log.old_values, null, 2)}
                                  </pre>
                                </div>
                              )}
                              
                              {log.new_values && (
                                <div>
                                  <h4 className="text-sm font-medium mb-2">New Values</h4>
                                  <pre className="text-xs bg-muted p-3 rounded overflow-auto">
                                    {JSON.stringify(log.new_values, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </div>
                          </SheetContent>
                        </Sheet>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </PermissionGate>
  );
};