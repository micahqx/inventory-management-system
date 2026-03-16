export interface Category {
  id: number;
  name: string;
  description: string;
  product_count: number;
  created_at: string;
}

export interface Supplier {
  id: number;
  name: string;
  contact_name: string;
  email: string;
  phone: string;
  address: string;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  category_id: number;
  category_name: string;
  supplier_id: number;
  supplier_name: string;
  price: number;
  cost_price: number;
  stock: number;
  reorder_level: number;
  unit: string;
  is_active: boolean;
  created_at: string;
}

export type MovementType = 'stock_in' | 'stock_out';

export interface InventoryMovement {
  id: number;
  product_id: number;
  product_name: string;
  movement_type: MovementType;
  quantity: number;
  balance_after: number;
  supplier_id: number | null;
  supplier_name: string | null;
  notes: string;
  created_at: string;
}
