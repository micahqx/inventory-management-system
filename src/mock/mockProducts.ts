export interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  supplier: string;
  price: number;
  stock: number;
  reorderLevel: number;
}

export const mockProducts: Product[] = [
  { id: 1, sku: 'WM-001', name: 'Wireless Mouse', category: 'Electronics', supplier: 'TechSupply Co.', price: 29.99, stock: 45, reorderLevel: 10 },
  { id: 2, sku: 'MK-002', name: 'Mechanical Keyboard', category: 'Electronics', supplier: 'TechSupply Co.', price: 89.99, stock: 4, reorderLevel: 15 },
  { id: 3, sku: 'UH-003', name: 'USB-C Hub', category: 'Accessories', supplier: 'GadgetWorld', price: 49.99, stock: 3, reorderLevel: 10 },
  { id: 4, sku: 'MS-004', name: 'Monitor Stand', category: 'Furniture', supplier: 'OfficePlus', price: 34.99, stock: 20, reorderLevel: 5 },
  { id: 5, sku: 'WC-005', name: 'Webcam HD', category: 'Electronics', supplier: 'TechSupply Co.', price: 59.99, stock: 0, reorderLevel: 5 },
  { id: 6, sku: 'HS-006', name: 'Headset Pro', category: 'Electronics', supplier: 'AudioGear', price: 79.99, stock: 8, reorderLevel: 10 },
  { id: 7, sku: 'EC-007', name: 'Ethernet Cable 5m', category: 'Networking', supplier: 'NetConnect', price: 9.99, stock: 2, reorderLevel: 20 },
  { id: 8, sku: 'LP-008', name: 'Laptop Stand', category: 'Accessories', supplier: 'OfficePlus', price: 44.99, stock: 15, reorderLevel: 8 },
  { id: 9, sku: 'SP-009', name: 'Surge Protector', category: 'Electrical', supplier: 'PowerSafe', price: 24.99, stock: 0, reorderLevel: 12 },
  { id: 10, sku: 'MW-010', name: 'Monitor Wipes', category: 'Supplies', supplier: 'CleanTech', price: 5.99, stock: 6, reorderLevel: 25 },
  { id: 11, sku: 'KP-011', name: 'Keyboard Pad', category: 'Accessories', supplier: 'GadgetWorld', price: 14.99, stock: 30, reorderLevel: 15 },
  { id: 12, sku: 'CB-012', name: 'Cable Organizer', category: 'Accessories', supplier: 'OfficePlus', price: 7.99, stock: 1, reorderLevel: 10 },
];
