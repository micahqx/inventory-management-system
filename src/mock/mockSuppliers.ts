export interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
}

export const mockSuppliers: Supplier[] = [
  { id: 1, name: 'TechWorld Supply Co.', contact: 'Alice Johnson', email: 'alice@techworld.com', phone: '+1-555-0101', status: 'Active' },
  { id: 2, name: 'OfficeGear Ltd.', contact: 'Bob Smith', email: 'bob@officegear.com', phone: '+1-555-0102', status: 'Active' },
  { id: 3, name: 'NetEquip Inc.', contact: 'Carol White', email: 'carol@netequip.com', phone: '+1-555-0103', status: 'Inactive' },
  { id: 4, name: 'FurniPro Supplies', contact: 'David Lee', email: 'david@furnipro.com', phone: '+1-555-0104', status: 'Active' },
];
