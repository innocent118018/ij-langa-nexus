import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, CheckCircle, Database, Trash2, Shield, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface SystemMonitoringData {
  table_name: string;
  total_records: number;
  records_last_24h: number;
  records_last_7d: number;
  potential_duplicates: number;
  unique_emails?: number;
  unique_users?: number;
  last_checked: string;
}

interface DuplicateData {
  table_name: string;
  duplicate_field: string;
  duplicate_value: string;
  record_count: number;
  record_ids: string[];
}

interface AuditLog {
  id: string;
  table_name: string;
  operation: string;
  record_id: string;
  old_values: any;
  new_values: any;
  user_email: string;
  created_at: string;
}

export const SystemMonitoring = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch system monitoring data
  const { data: monitoringData, isLoading: monitoringLoading } = useQuery({
    queryKey: ['system-monitoring'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_monitoring')
        .select('*');
      
      if (error) throw error;
      return data;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch duplicate detection data
  const { data: duplicatesData, isLoading: duplicatesLoading, refetch: refetchDuplicates } = useQuery({
    queryKey: ['detect-duplicates', selectedTable],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('detect_duplicates', {
        target_table: selectedTable
      });
      
      if (error) throw error;
      return data as DuplicateData[];
    },
    enabled: !!selectedTable,
  });

  // Fetch audit logs
  const { data: auditLogs, isLoading: auditLogsLoading } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data as AuditLog[];
    },
  });

  // Cleanup duplicates mutation
  const cleanupMutation = useMutation({
    mutationFn: async (tableName: string) => {
      const { data, error } = await supabase.rpc('cleanup_duplicates', {
        target_table: tableName
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data, tableName) => {
      const cleanedCount = data[0]?.cleaned_count || 0;
      toast.success(`Cleaned up ${cleanedCount} duplicate records from ${tableName}`);
      queryClient.invalidateQueries({ queryKey: ['system-monitoring'] });
      queryClient.invalidateQueries({ queryKey: ['detect-duplicates'] });
    },
    onError: (error: any) => {
      toast.error(`Failed to clean duplicates: ${error.message}`);
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleCleanup = (tableName: string) => {
    if (confirm(`Are you sure you want to clean up duplicates in ${tableName}? This action cannot be undone.`)) {
      cleanupMutation.mutate(tableName);
    }
  };

  if (monitoringLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Database className="h-12 w-12 animate-pulse mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading system monitoring data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6" />
            System Monitoring & RLS Control
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor database integrity, duplicates, and audit logs
          </p>
        </div>
        <Button onClick={() => queryClient.invalidateQueries()}>
          Refresh All Data
        </Button>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {monitoringData?.map((table) => (
          <Card key={table.table_name} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="capitalize">{table.table_name.replace('_', ' ')}</span>
                {((table as any).potential_duplicates || 0) > 0 ? (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Records:</span>
                  <Badge variant="outline">{table.total_records}</Badge>
                </div>
                
                {(table as any).unique_emails && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Unique Emails:</span>
                    <Badge variant="outline">{(table as any).unique_emails}</Badge>
                  </div>
                )}
                
                {(table as any).unique_users && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Unique Users:</span>
                    <Badge variant="outline">{(table as any).unique_users}</Badge>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Potential Duplicates:</span>
                  <Badge 
                    variant={((table as any).potential_duplicates || 0) > 0 ? "destructive" : "default"}
                  >
                    {(table as any).potential_duplicates || 0}
                  </Badge>
                </div>
                
                <div className="pt-2 space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setSelectedTable(table.table_name)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Check Duplicates
                  </Button>
                  
                  {((table as any).potential_duplicates || 0) > 0 && (
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleCleanup(table.table_name)}
                      disabled={cleanupMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {cleanupMutation.isPending ? 'Cleaning...' : 'Clean Duplicates'}
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mt-3">
                Last checked: {(table as any).last_checked ? formatDate((table as any).last_checked) : 'Never'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Duplicates Detail Table */}
      {selectedTable && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Duplicate Records in {selectedTable}</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => refetchDuplicates()}
                disabled={duplicatesLoading}
              >
                {duplicatesLoading ? 'Loading...' : 'Refresh'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {duplicatesLoading ? (
              <div className="text-center py-8">
                <Database className="h-8 w-8 animate-pulse mx-auto mb-2 text-primary" />
                <p className="text-muted-foreground">Analyzing duplicates...</p>
              </div>
            ) : duplicatesData && duplicatesData.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Duplicate Value</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Record IDs</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {duplicatesData.map((duplicate, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{duplicate.duplicate_field}</TableCell>
                      <TableCell>{duplicate.duplicate_value}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{duplicate.record_count}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {duplicate.record_ids.slice(0, 3).map((id) => (
                            <Badge key={id} variant="outline" className="text-xs">
                              {id.slice(0, 8)}...
                            </Badge>
                          ))}
                          {duplicate.record_ids.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{duplicate.record_ids.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <p className="text-lg font-medium">No duplicates found!</p>
                <p className="text-muted-foreground">All records in {selectedTable} are unique.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Audit Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Activity (Audit Logs)</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last 50 database operations tracked by the system
          </p>
        </CardHeader>
        <CardContent>
          {auditLogsLoading ? (
            <div className="text-center py-8">
              <Database className="h-8 w-8 animate-pulse mx-auto mb-2 text-primary" />
              <p className="text-muted-foreground">Loading audit logs...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table</TableHead>
                  <TableHead>Operation</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Record ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs?.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.table_name}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          log.operation === 'INSERT' ? 'default' :
                          log.operation === 'UPDATE' ? 'secondary' :
                          'destructive'
                        }
                      >
                        {log.operation}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.user_email || 'System'}</TableCell>
                    <TableCell>{formatDate(log.created_at)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {log.record_id?.slice(0, 8)}...
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};