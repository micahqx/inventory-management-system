import type { Product } from '../types/product';

export const mockProducts: Product[] = [
  { id: 1, sku: 'WM-001', name: 'Wireless Mouse', category: 'Electronics', supplier: 'TechSupply Co.', unit: 'pcs', costPrice: 18.00, sellingPrice: 29.99, currentStock: 45, reorderLevel: 10, status: 'Active' },
  { id: 2, sku: 'MK-002', name: 'Mechanical Keyboard', category: 'Electronics', supplier: 'TechSupply Co.', unit: 'pcs', costPrice: 55.00, sellingPrice: 89.99, currentStock: 4, reorderLevel: 15, status: 'Active' },
  { id: 3, sku: 'UH-003', name: 'USB-C Hub', category: 'Accessories', supplier: 'GadgetWorld', unit: 'pcs', costPrice: 28.00, sellingPrice: 49.99, currentStock: 3, reorderLevel: 10, status: 'Active' },
  { id: 4, sku: 'MS-004', name: 'Monitor Stand', category: 'Furniture', supplier: 'OfficePlus', unit: 'pcs', costPrice: 20.00, sellingPrice: 34.99, currentStock: 20, reorderLevel: 5, status: 'Active' },
  { id: 5, sku: 'WC-005', name: 'Webcam HD', category: 'Electronics', supplier: 'TechSupply Co.', unit: 'pcs', costPrice: 35.00, sellingPrice: 59.99, currentStock: 0, reorderLevel: 5, status: 'Inactive' },
  { id: 6, sku: 'HS-006', name: 'Headset Pro', category: 'Electronics', supplier: 'AudioGear', unit: 'pcs', costPrice: 48.00, sellingPrice: 79.99, currentStock: 8, reorderLevel: 10, status: 'Active' },
  { id: 7, sku: 'EC-007', name: 'Ethernet Cable 5m', category: 'Accessories', supplier: 'NetConnect', unit: 'pcs', costPrice: 4.50, sellingPrice: 9.99, currentStock: 2, reorderLevel: 20, status: 'Active' },
  { id: 8, sku: 'LP-008', name: 'Laptop Stand', category: 'Accessories', supplier: 'OfficePlus', unit: 'pcs', costPrice: 25.00, sellingPrice: 44.99, currentStock: 15, reorderLevel: 8, status: 'Active' },
  { id: 9, sku: 'SP-009', name: 'Surge Protector', category: 'Accessories', supplier: 'PowerSafe', unit: 'pcs', costPrice: 14.00, sellingPrice: 24.99, currentStock: 0, reorderLevel: 12, status: 'Inactive' },
  { id: 10, sku: 'MW-010', name: 'Monitor Wipes', category: 'Stationery', supplier: 'CleanTech', unit: 'box', costPrice: 2.50, sellingPrice: 5.99, currentStock: 6, reorderLevel: 25, status: 'Active' },
  { id: 11, sku: 'KP-011', name: 'Keyboard Pad', category: 'Accessories', supplier: 'GadgetWorld', unit: 'pcs', costPrice: 7.00, sellingPrice: 14.99, currentStock: 30, reorderLevel: 15, status: 'Active' },
  { id: 12, sku: 'CB-012', name: 'Cable Organizer', category: 'Accessories', supplier: 'OfficePlus', unit: 'pcs', costPrice: 3.50, sellingPrice: 7.99, currentStock: 1, reorderLevel: 10, status: 'Discontinued' },
];
