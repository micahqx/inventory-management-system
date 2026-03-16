import { Box, Button, Card, CardContent, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', category: 'Electronics', sku: 'WM-001', price: 29.99, stock: 45 },
  { id: 2, name: 'Mechanical Keyboard', category: 'Electronics', sku: 'MK-002', price: 89.99, stock: 12 },
  { id: 3, name: 'USB-C Hub', category: 'Accessories', sku: 'UH-003', price: 49.99, stock: 3 },
  { id: 4, name: 'Monitor Stand', category: 'Furniture', sku: 'MS-004', price: 34.99, stock: 20 },
  { id: 5, name: 'Webcam HD', category: 'Electronics', sku: 'WC-005', price: 59.99, stock: 0 },
];

function stockChip(stock: number) {
  if (stock === 0) return <Chip label="Out of Stock" color="error" size="small" />;
  if (stock <= 5) return <Chip label="Low Stock" color="warning" size="small" />;
  return <Chip label="In Stock" color="success" size="small" />;
}

export default function ProductsPage() {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Products
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Product
        </Button>
      </Box>

      <Card elevation={2}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>SKU</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell align="right"><strong>Price</strong></TableCell>
                  <TableCell align="right"><strong>Stock</strong></TableCell>
                  <TableCell align="center"><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_PRODUCTS.map((p) => (
                  <TableRow key={p.id} hover>
                    <TableCell>{p.name}</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{p.sku}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell align="right">${p.price.toFixed(2)}</TableCell>
                    <TableCell align="right">{p.stock}</TableCell>
                    <TableCell align="center">{stockChip(p.stock)}</TableCell>
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
