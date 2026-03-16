export interface Supplier {
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
}

export const mockSuppliers: Supplier[] = [
  {
    id: 1,
    name: 'TechWorld Supply Co.',
    contact: 'Alice Johnson',
    phone: '+1-555-0101',
    email: 'alice@techworld.com',
    address: '123 Tech Ave, San Francisco, CA 94101',
  },
  {
    id: 2,
    name: 'OfficeGear Ltd.',
    contact: 'Bob Smith',
    phone: '+1-555-0102',
    email: 'bob@officegear.com',
    address: '456 Office Blvd, New York, NY 10001',
  },
  {
    id: 3,
    name: 'NetEquip Inc.',
    contact: 'Carol White',
    phone: '+1-555-0103',
    email: 'carol@netequip.com',
    address: '789 Network St, Austin, TX 73301',
  },
  {
    id: 4,
    name: 'FurniPro Supplies',
    contact: 'David Lee',
    phone: '+1-555-0104',
    email: 'david@furnipro.com',
    address: '321 Furniture Rd, Chicago, IL 60601',
  },
  {
    id: 5,
    name: 'Stationery Plus',
    contact: 'Eva Martinez',
    phone: '+1-555-0105',
    email: 'eva@stationeryplus.com',
    address: '654 Paper Lane, Seattle, WA 98101',
  },
];
