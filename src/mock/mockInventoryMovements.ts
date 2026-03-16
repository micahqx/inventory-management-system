export type MovementType = 'IN' | 'OUT';

export interface InventoryMovement {
  id: number;
  date: string;
  product: string;
  type: MovementType;
  quantity: number;
  balance: number;
}

export const mockInventoryMovements: InventoryMovement[] = [
  { id: 1, date: '2026-03-15', product: 'Wireless Mouse', type: 'IN', quantity: 50, balance: 95 },
  { id: 2, date: '2026-03-15', product: 'Wireless Mouse', type: 'OUT', quantity: 5, balance: 90 },
  { id: 3, date: '2026-03-14', product: 'Mechanical Keyboard', type: 'IN', quantity: 20, balance: 32 },
  { id: 4, date: '2026-03-14', product: 'USB-C Hub', type: 'OUT', quantity: 2, balance: 1 },
  { id: 5, date: '2026-03-13', product: 'Webcam HD', type: 'OUT', quantity: 1, balance: 0 },
  { id: 6, date: '2026-03-12', product: 'USB-C Hub', type: 'IN', quantity: 30, balance: 3 },
  { id: 7, date: '2026-03-12', product: 'Ethernet Cable 5m', type: 'OUT', quantity: 8, balance: 2 },
  { id: 8, date: '2026-03-11', product: 'Wireless Headset', type: 'IN', quantity: 10, balance: 15 },
];
