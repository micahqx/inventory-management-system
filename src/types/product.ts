export type ProductStatus = 'Active' | 'Inactive' | 'Discontinued';

export interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  supplier: string;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  currentStock: number;
  reorderLevel: number;
  status: ProductStatus;
}
