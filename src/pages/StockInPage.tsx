import { Box, Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const MOCK_STOCK_IN = [
  { id: 1, date: '2026-03-15', product: 'Wireless Mouse', supplier: 'TechWorld Supply Co.', quantity: 50, unitCost: 15.00, total: 750.00 },
  { id: 2, date: '2026-03-14', product: 'Mechanical Keyboard', supplier: 'TechWorld Supply Co.', quantity: 20, unitCost: 45.00, total: 900.00 },
  { id: 3, date: '2026-03-12', product: 'USB-C Hub', supplier: 'OfficeGear Ltd.', quantity: 30, unitCost: 22.00, total: 660.00 },
  { id: 4, date: '2026-03-10', product: 'Monitor Stand', supplier: 'FurniPro Supplies', quantity: 25, unitCost: 18.00, total: 450.00 },
];

export default function StockInPage() {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Stock In
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} color="success">
          Record Stock In
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
                  <TableCell><strong>Supplier</strong></TableCell>
                  <TableCell align="right"><strong>Quantity</strong></TableCell>
                  <TableCell align="right"><strong>Unit Cost</strong></TableCell>
                  <TableCell align="right"><strong>Total</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_STOCK_IN.map((r) => (
                  <TableRow key={r.id} hover>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>{r.product}</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{r.supplier}</TableCell>
                    <TableCell align="right">{r.quantity}</TableCell>
                    <TableCell align="right">${r.unitCost.toFixed(2)}</TableCell>
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
