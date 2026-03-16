export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
}

export type ProductStatus = 'active' | 'inactive';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  supplier: string;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  reorderLevel: number;
  status: ProductStatus;
}

export type MovementType = 'stock_in' | 'stock_out';

export interface InventoryMovement {
  id: string;
  productId: string;
  productName: string;
  type: MovementType;
  quantity: number;
  reference: string;
  date: string;
  remarks: string;
}
