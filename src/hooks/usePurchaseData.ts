import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PurchaseQuote {
  id: string;
  user_id: string;
  supplier_id: string;
  quote_number: string;
  request_date?: string;
  description?: string;
  subtotal: number;
  vat_amount: number;
  total_amount: number;
  status: 'Active' | 'Accepted' | 'Cancelled';
  line_items: any[];
  notes?: string;
  reference?: string;
  created_at: string;
  updated_at: string;
  suppliers?: {
    name: string;
    email?: string;
  };
}

export interface PurchaseInvoice {
  id: string;
  user_id: string;
  supplier_id: string;
  purchase_order_id?: string;
  invoice_number: string;
  invoice_date: string;
  due_date?: string;
  description?: string;
  subtotal: number;
  vat_amount: number;
  discount_amount?: number;
  withholding_tax?: number;
  total_amount: number;
  balance_due: number;
  status: 'Unpaid' | 'Partially Paid' | 'Paid' | 'Overdue' | 'Cancelled';
  days_to_due_date?: number;
  days_overdue: number;
  line_items: any[];
  project_id?: string;
  division_id?: string;
  reference?: string;
  created_at: string;
  updated_at: string;
  suppliers?: {
    name: string;
    email?: string;
  };
  purchase_orders?: {
    order_number: string;
  };
}

export interface DebitNote {
  id: string;
  user_id: string;
  supplier_id: string;
  purchase_invoice_id?: string;
  debit_note_number: string;
  issue_date: string;
  description: string;
  reason?: string;
  subtotal: number;
  vat_amount: number;
  total_amount: number;
  status: 'Applied' | 'Pending' | 'Cancelled';
  line_items: any[];
  reference?: string;
  created_at: string;
  updated_at: string;
  suppliers?: {
    name: string;
    email?: string;
  };
  purchase_invoices?: {
    invoice_number: string;
  };
}

export interface GoodsReceipt {
  id: string;
  user_id: string;
  supplier_id: string;
  purchase_order_id?: string;
  receipt_number: string;
  receipt_date: string;
  delivery_note_number?: string;
  description?: string;
  qty_received: number;
  inventory_location_id?: string;
  line_items: any[];
  inspection_notes?: string;
  quality_status: 'Approved' | 'Rejected' | 'Pending';
  created_at: string;
  updated_at: string;
  suppliers?: {
    name: string;
    email?: string;
  };
  purchase_orders?: {
    order_number: string;
  };
}

export const usePurchaseQuotes = () => {
  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ['purchase-quotes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('purchase_quotes')
        .select(`
          *,
          suppliers (
            name,
            email
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as any[];
    },
  });

  return { quotes, isLoading };
};

export const usePurchaseInvoices = () => {
  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['purchase-invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('purchase_invoices')
        .select(`
          *,
          suppliers (
            name,
            email
          ),
          purchase_orders (
            order_number
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as any[];
    },
  });

  return { invoices, isLoading };
};

export const useDebitNotes = () => {
  const { data: debitNotes = [], isLoading } = useQuery({
    queryKey: ['debit-notes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('debit_notes')
        .select(`
          *,
          suppliers (
            name,
            email
          ),
          purchase_invoices (
            invoice_number
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as DebitNote[];
    },
  });

  return { debitNotes, isLoading };
};

export const useGoodsReceipts = () => {
  const { data: receipts = [], isLoading } = useQuery({
    queryKey: ['goods-receipts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('goods_receipts')
        .select(`
          *,
          suppliers (
            name,
            email
          ),
          purchase_orders (
            order_number
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as GoodsReceipt[];
    },
  });

  return { receipts, isLoading };
};

export const usePurchaseOrders = () => {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['purchase-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select(`
          *,
          suppliers (
            name,
            email
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return { orders, isLoading };
};

export const useSuppliers = () => {
  const { data: suppliers = [], isLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('suppliers')
        .select('*')
        .eq('status', 'Active')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  return { suppliers, isLoading };
};

export const useCreatePurchaseQuote = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from('purchase_quotes')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-quotes'] });
      toast({
        title: "Success",
        description: "Purchase quote created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create purchase quote",
        variant: "destructive",
      });
    },
  });
};

export const useCreatePurchaseInvoice = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from('purchase_invoices')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-invoices'] });
      toast({
        title: "Success",
        description: "Purchase invoice created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create purchase invoice",
        variant: "destructive",
      });
    },
  });
};

export const useCreateDebitNote = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from('debit_notes')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debit-notes'] });
      toast({
        title: "Success",
        description: "Debit note created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create debit note",
        variant: "destructive",
      });
    },
  });
};

export const useCreateGoodsReceipt = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from('goods_receipts')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goods-receipts'] });
      toast({
        title: "Success",
        description: "Goods receipt created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create goods receipt",
        variant: "destructive",
      });
    },
  });
};