import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SearchIcon from '@mui/icons-material/Search';
import { mockProducts } from '../mock/mockProducts';

function statusChip(stock: number) {
  if (stock === 0) return <Chip label="Out of Stock" color="error" size="small" />;
  return <Chip label="Low Stock" color="warning" size="small" />;
}

export default function LowStockPage() {
  const [search, setSearch] = useState('');

  const lowStockProducts = mockProducts.filter((p) => p.stock <= p.reorderLevel);

  const filtered = lowStockProducts.filter((p) => {
    const q = search.toLowerCase();
    return p.sku.toLowerCase().includes(q) || p.name.toLowerCase().includes(q);
  });

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <WarningAmberIcon color="warning" />
        <Typography variant="h5" fontWeight={700}>
          Low Stock Alerts
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" mb={3}>
        {lowStockProducts.length} product{lowStockProducts.length !== 1 ? 's' : ''} at or below reorder level
      </Typography>

      <TextField
        size="small"
        placeholder="Search by SKU or product name…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2, width: 320 }}
      />

      <Card elevation={2}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>SKU</strong></TableCell>
                  <TableCell><strong>Product Name</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell><strong>Supplier</strong></TableCell>
                  <TableCell align="right"><strong>Current Stock</strong></TableCell>
                  <TableCell align="right"><strong>Reorder Level</strong></TableCell>
                  <TableCell align="center"><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                      No products match your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((item) => (
                    <TableRow
                      key={item.id}
                      hover
                      sx={item.stock === 0 ? { bgcolor: 'error.50' } : undefined}
                    >
                      <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{item.sku}</TableCell>
                      <TableCell sx={item.stock === 0 ? { fontWeight: 700 } : undefined}>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontWeight: 700, color: item.stock === 0 ? 'error.main' : 'warning.main' }}
                      >
                        {item.stock}
                      </TableCell>
                      <TableCell align="right">{item.reorderLevel}</TableCell>
                      <TableCell align="center">{statusChip(item.stock)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
