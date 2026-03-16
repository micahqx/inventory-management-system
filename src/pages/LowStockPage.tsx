import { Box, Card, CardContent, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const MOCK_LOW_STOCK = [
  { id: 1, name: 'USB-C Hub', sku: 'UH-003', category: 'Accessories', stock: 3, minStock: 10 },
  { id: 2, name: 'Webcam HD', sku: 'WC-005', category: 'Electronics', stock: 0, minStock: 5 },
  { id: 3, name: 'Mechanical Keyboard', sku: 'MK-002', category: 'Electronics', stock: 4, minStock: 15 },
  { id: 4, name: 'Ethernet Cable 5m', sku: 'EC-010', category: 'Networking', stock: 2, minStock: 20 },
];

export default function LowStockPage() {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <WarningAmberIcon color="warning" />
        <Typography variant="h5" fontWeight={700}>
          Low Stock Alerts
        </Typography>
      </Box>

      <Card elevation={2}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>Product</strong></TableCell>
                  <TableCell><strong>SKU</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell align="right"><strong>Current Stock</strong></TableCell>
                  <TableCell align="right"><strong>Min Stock</strong></TableCell>
                  <TableCell sx={{ minWidth: 150 }}><strong>Stock Level</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_LOW_STOCK.map((item) => {
                  const pct = Math.min((item.stock / item.minStock) * 100, 100);
                  return (
                    <TableRow key={item.id} hover>
                      <TableCell>{item.name}</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{item.sku}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell align="right" sx={{ color: item.stock === 0 ? 'error.main' : 'warning.main', fontWeight: 700 }}>
                        {item.stock}
                      </TableCell>
                      <TableCell align="right">{item.minStock}</TableCell>
                      <TableCell>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          color={item.stock === 0 ? 'error' : 'warning'}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
