import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PageHeader from '../components/PageHeader';
import TableCard from '../components/TableCard';
import StatusChip from '../components/StatusChip';

const MOCK_MOVEMENTS = [
  { id: 1, date: '2026-03-15', product: 'Wireless Mouse', type: 'IN', quantity: 50, balance: 95 },
  { id: 2, date: '2026-03-15', product: 'Wireless Mouse', type: 'OUT', quantity: 5, balance: 90 },
  { id: 3, date: '2026-03-14', product: 'Mechanical Keyboard', type: 'IN', quantity: 20, balance: 32 },
  { id: 4, date: '2026-03-14', product: 'USB-C Hub', type: 'OUT', quantity: 2, balance: 1 },
  { id: 5, date: '2026-03-13', product: 'Webcam HD', type: 'OUT', quantity: 1, balance: 0 },
  { id: 6, date: '2026-03-12', product: 'USB-C Hub', type: 'IN', quantity: 30, balance: 3 },
];

export default function MovementsPage() {
  return (
    <Box>
      <PageHeader title="Inventory Movements" />

      <TableCard>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Product</strong></TableCell>
              <TableCell align="center"><strong>Type</strong></TableCell>
              <TableCell align="right"><strong>Quantity</strong></TableCell>
              <TableCell align="right"><strong>Balance After</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_MOVEMENTS.map((m) => (
              <TableRow key={m.id} hover>
                <TableCell>{m.date}</TableCell>
                <TableCell>{m.product}</TableCell>
                <TableCell align="center">
                  <StatusChip label={m.type} color={m.type === 'IN' ? 'success' : 'error'} />
                </TableCell>
                <TableCell align="right">{m.quantity}</TableCell>
                <TableCell align="right">{m.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableCard>
    </Box>
  );
}
