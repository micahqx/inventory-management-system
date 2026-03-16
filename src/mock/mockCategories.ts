export interface Category {
  id: number;
  name: string;
  description: string;
  productCount: number;
}

export const mockCategories: Category[] = [
  { id: 1, name: 'Electronics', description: 'Electronic devices and accessories', productCount: 42 },
  { id: 2, name: 'Accessories', description: 'Peripheral and computer accessories', productCount: 27 },
  { id: 3, name: 'Furniture', description: 'Office and home furniture', productCount: 15 },
  { id: 4, name: 'Stationery', description: 'Office stationery and supplies', productCount: 33 },
  { id: 5, name: 'Networking', description: 'Network equipment and cables', productCount: 11 },
];
