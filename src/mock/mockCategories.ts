export interface Category {
  id: number;
  name: string;
  description: string;
}

export const mockCategories: Category[] = [
  { id: 1, name: 'Electronics', description: 'Electronic devices and accessories' },
  { id: 2, name: 'Accessories', description: 'Peripheral and computer accessories' },
  { id: 3, name: 'Furniture', description: 'Office and home furniture' },
  { id: 4, name: 'Stationery', description: 'Office stationery and supplies' },
  { id: 5, name: 'Networking', description: 'Network equipment and cables' },
];
