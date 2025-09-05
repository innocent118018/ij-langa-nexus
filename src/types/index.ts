export interface CartItem {
  id: string;
  quantity: number;
  product_id?: string;
  service_id?: string;
  user_id?: string;
  products?: {
    name: string;
    price: number;
    category: string;
    image_url: string;
  };
  services?: {
    name: string;
    price: number;
    category: string;
  };
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address?: string;
  subtotal: number;
  vat_amount: number;
  total_amount: number;
  status: string;
  user_id?: string;
  service_id?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id?: string;
  service_id?: string;
  quantity: number;
  price: number;
  total: number;
}

export interface PaymentResponse {
  success: boolean;
  paylinkUrl?: string;
  transactionId?: string;
  error?: string;
}