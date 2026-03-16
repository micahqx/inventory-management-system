import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { mockInventoryMovements, type MovementType } from '../mock/mockInventoryMovements';

type TypeFilter = 'all' | MovementType;

const TYPE_OPTIONS: { value: TypeFilter; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'stock_in', label: 'Stock In' },
  { value: 'stock_out', label: 'Stock Out' },
];

function MovementChip({ type }: { type: MovementType }) {
  if (type === 'stock_in') {
    return <Chip label="Stock In" color="success" size="small" />;
  }
  return <Chip label="Stock Out" color="error" size="small" />;
}

export default function MovementsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [dateFilter, setDateFilter] = useState('');

  const filtered = mockInventoryMovements.filter((m) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      search === '' ||
      m.product.toLowerCase().includes(searchLower) ||
      m.reference.toLowerCase().includes(searchLower);
    const matchesType = typeFilter === 'all' || m.type === typeFilter;
    const matchesDate = dateFilter === '' || m.date === dateFilter;
    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Inventory Movements
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        mb={3}
        flexWrap="wrap"
      >
        <TextField
          size="small"
          placeholder="Search by product or reference…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ minWidth: 260 }}
        />
        <TextField
          select
          size="small"
          label="Movement Type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
          sx={{ minWidth: 160 }}
        >
          {TYPE_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          type="date"
          size="small"
          label="Date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ minWidth: 160 }}
        />
      </Stack>

      <Card elevation={2}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Product</strong></TableCell>
                  <TableCell align="center"><strong>Type</strong></TableCell>
                  <TableCell align="right"><strong>Quantity</strong></TableCell>
                  <TableCell><strong>Reference</strong></TableCell>
                  <TableCell><strong>Remarks</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                      No movements match the current filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((m) => (
                    <TableRow key={m.id} hover>
                      <TableCell>{m.date}</TableCell>
                      <TableCell>{m.product}</TableCell>
                      <TableCell align="center">
                        <MovementChip type={m.type} />
                      </TableCell>
                      <TableCell align="right">{m.quantity}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                        {m.reference}
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{m.remarks}</TableCell>
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
