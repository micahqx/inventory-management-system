export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  reorderLevel: number;
}

export const mockProducts: Product[] = [
  { id: 1, name: 'Wireless Mouse', sku: 'WM-001', category: 'Electronics', price: 29.99, stock: 45, reorderLevel: 10 },
  { id: 2, name: 'Mechanical Keyboard', sku: 'MK-002', category: 'Electronics', price: 89.99, stock: 8, reorderLevel: 10 },
  { id: 3, name: 'USB-C Hub', sku: 'UH-003', category: 'Accessories', price: 49.99, stock: 3, reorderLevel: 5 },
  { id: 4, name: 'Monitor Stand', sku: 'MS-004', category: 'Furniture', price: 34.99, stock: 20, reorderLevel: 5 },
  { id: 5, name: 'Webcam HD', sku: 'WC-005', category: 'Electronics', price: 59.99, stock: 0, reorderLevel: 5 },
  { id: 6, name: 'Desk Lamp', sku: 'DL-006', category: 'Furniture', price: 24.99, stock: 15, reorderLevel: 8 },
  { id: 7, name: 'Ethernet Cable 5m', sku: 'EC-007', category: 'Networking', price: 9.99, stock: 2, reorderLevel: 10 },
  { id: 8, name: 'Wireless Headset', sku: 'WH-008', category: 'Electronics', price: 79.99, stock: 5, reorderLevel: 6 },
  { id: 9, name: 'Notebook A4', sku: 'NB-009', category: 'Stationery', price: 4.99, stock: 100, reorderLevel: 20 },
  { id: 10, name: 'USB Flash Drive 64GB', sku: 'FD-010', category: 'Accessories', price: 14.99, stock: 4, reorderLevel: 10 },
];
