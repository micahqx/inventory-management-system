import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../components/PageHeader';
import TableCard from '../components/TableCard';
import StatusChip from '../components/StatusChip';

const MOCK_SUPPLIERS = [
  { id: 1, name: 'TechWorld Supply Co.', contact: 'Alice Johnson', email: 'alice@techworld.com', phone: '+1-555-0101', status: 'Active' },
  { id: 2, name: 'OfficeGear Ltd.', contact: 'Bob Smith', email: 'bob@officegear.com', phone: '+1-555-0102', status: 'Active' },
  { id: 3, name: 'NetEquip Inc.', contact: 'Carol White', email: 'carol@netequip.com', phone: '+1-555-0103', status: 'Inactive' },
  { id: 4, name: 'FurniPro Supplies', contact: 'David Lee', email: 'david@furnipro.com', phone: '+1-555-0104', status: 'Active' },
];

export default function SuppliersPage() {
  return (
    <Box>
      <PageHeader
        title="Suppliers"
        action={
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Supplier
          </Button>
        }
      />

      <TableCard>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell><strong>Company</strong></TableCell>
              <TableCell><strong>Contact</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell align="center"><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_SUPPLIERS.map((s) => (
              <TableRow key={s.id} hover>
                <TableCell><strong>{s.name}</strong></TableCell>
                <TableCell>{s.contact}</TableCell>
                <TableCell sx={{ color: 'text.secondary' }}>{s.email}</TableCell>
                <TableCell>{s.phone}</TableCell>
                <TableCell align="center">
                  <StatusChip label={s.status} color={s.status === 'Active' ? 'success' : 'default'} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCard>
    </Box>
  );
}
