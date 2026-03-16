import { Box, Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const MOCK_STOCK_OUT = [
  { id: 1, date: '2026-03-15', product: 'Wireless Mouse', reason: 'Sale', quantity: 5, unitPrice: 29.99, total: 149.95 },
  { id: 2, date: '2026-03-14', product: 'USB-C Hub', reason: 'Sale', quantity: 2, unitPrice: 49.99, total: 99.98 },
  { id: 3, date: '2026-03-13', product: 'Webcam HD', reason: 'Damaged', quantity: 1, unitPrice: 59.99, total: 59.99 },
  { id: 4, date: '2026-03-11', product: 'Mechanical Keyboard', reason: 'Sale', quantity: 3, unitPrice: 89.99, total: 269.97 },
];

export default function StockOutPage() {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Stock Out
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} color="error">
          Record Stock Out
        </Button>
      </Box>

      <Card elevation={2}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Product</strong></TableCell>
                  <TableCell><strong>Reason</strong></TableCell>
                  <TableCell align="right"><strong>Quantity</strong></TableCell>
                  <TableCell align="right"><strong>Unit Price</strong></TableCell>
                  <TableCell align="right"><strong>Total</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_STOCK_OUT.map((r) => (
                  <TableRow key={r.id} hover>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>{r.product}</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{r.reason}</TableCell>
                    <TableCell align="right">{r.quantity}</TableCell>
                    <TableCell align="right">${r.unitPrice.toFixed(2)}</TableCell>
                    <TableCell align="right"><strong>${r.total.toFixed(2)}</strong></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
