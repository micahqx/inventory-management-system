export type MovementType = 'stock_in' | 'stock_out';

export interface InventoryMovement {
  id: number;
  date: string;
  product: string;
  type: MovementType;
  quantity: number;
  reference: string;
  remarks: string;
}

export const mockInventoryMovements: InventoryMovement[] = [
  {
    id: 1,
    date: '2026-03-15',
    product: 'Wireless Mouse',
    type: 'stock_in',
    quantity: 50,
    reference: 'PO-2026-001',
    remarks: 'Initial stock replenishment',
  },
  {
    id: 2,
    date: '2026-03-15',
    product: 'Wireless Mouse',
    type: 'stock_out',
    quantity: 5,
    reference: 'SO-2026-012',
    remarks: 'Customer order fulfillment',
  },
  {
    id: 3,
    date: '2026-03-14',
    product: 'Mechanical Keyboard',
    type: 'stock_in',
    quantity: 20,
    reference: 'PO-2026-002',
    remarks: 'Restocked from supplier',
  },
  {
    id: 4,
    date: '2026-03-14',
    product: 'USB-C Hub',
    type: 'stock_out',
    quantity: 2,
    reference: 'SO-2026-013',
    remarks: 'Internal use - IT dept',
  },
  {
    id: 5,
    date: '2026-03-13',
    product: 'Webcam HD',
    type: 'stock_out',
    quantity: 1,
    reference: 'SO-2026-011',
    remarks: 'Customer return exchange',
  },
  {
    id: 6,
    date: '2026-03-12',
    product: 'USB-C Hub',
    type: 'stock_in',
    quantity: 30,
    reference: 'PO-2026-003',
    remarks: 'Bulk purchase order',
  },
  {
    id: 7,
    date: '2026-03-11',
    product: 'Monitor Stand',
    type: 'stock_in',
    quantity: 15,
    reference: 'PO-2026-004',
    remarks: 'New product line addition',
  },
  {
    id: 8,
    date: '2026-03-11',
    product: 'Webcam HD',
    type: 'stock_in',
    quantity: 10,
    reference: 'PO-2026-005',
    remarks: 'Emergency restock',
  },
  {
    id: 9,
    date: '2026-03-10',
    product: 'Mechanical Keyboard',
    type: 'stock_out',
    quantity: 3,
    reference: 'SO-2026-010',
    remarks: 'Wholesale order - TechCorp',
  },
  {
    id: 10,
    date: '2026-03-09',
    product: 'Monitor Stand',
    type: 'stock_out',
    quantity: 5,
    reference: 'SO-2026-009',
    remarks: 'Office furniture bundle',
  },
];
