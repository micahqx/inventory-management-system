import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

interface Product {
  id: number;
  name: string;
}

interface InventoryMovement {
  id: number;
  date: string;
  product: string;
  type: 'stock_in' | 'stock_out';
  quantity: number;
  reference: string;
  remarks: string;
}

const mockProducts: Product[] = [
  { id: 1, name: 'Wireless Mouse' },
  { id: 2, name: 'Mechanical Keyboard' },
  { id: 3, name: 'USB-C Hub' },
  { id: 4, name: 'Monitor Stand' },
  { id: 5, name: 'Laptop Bag' },
];

const mockInventoryMovements: InventoryMovement[] = [
  { id: 1, date: '2026-03-15', product: 'Wireless Mouse', type: 'stock_in', quantity: 50, reference: 'PO-001', remarks: 'Initial stock' },
  { id: 2, date: '2026-03-14', product: 'Mechanical Keyboard', type: 'stock_in', quantity: 20, reference: 'PO-002', remarks: 'Restocking' },
  { id: 3, date: '2026-03-13', product: 'Wireless Mouse', type: 'stock_out', quantity: 10, reference: 'SO-001', remarks: 'Customer order' },
  { id: 4, date: '2026-03-12', product: 'USB-C Hub', type: 'stock_in', quantity: 30, reference: 'PO-003', remarks: 'New arrival' },
  { id: 5, date: '2026-03-11', product: 'Monitor Stand', type: 'stock_out', quantity: 5, reference: 'SO-002', remarks: 'Internal use' },
  { id: 6, date: '2026-03-10', product: 'Laptop Bag', type: 'stock_in', quantity: 25, reference: 'PO-004', remarks: '' },
];

interface StockInFormState {
  productId: string;
  quantity: string;
  referenceNo: string;
  date: string;
  remarks: string;
}

const emptyForm: StockInFormState = {
  productId: '',
  quantity: '',
  referenceNo: '',
  date: new Date().toISOString().slice(0, 10),
  remarks: '',
};

export default function StockInPage() {
  const [movements, setMovements] = useState<InventoryMovement[]>(mockInventoryMovements);
  const [form, setForm] = useState<StockInFormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<StockInFormState>>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const stockInRecords = movements.filter((m) => m.type === 'stock_in');

  function handleChange(field: keyof StockInFormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: Partial<StockInFormState> = {};
    if (!form.productId) newErrors.productId = 'Product is required';
    if (!form.quantity || isNaN(Number(form.quantity)) || Number(form.quantity) <= 0)
      newErrors.quantity = 'Enter a valid quantity';
    if (!form.referenceNo.trim()) newErrors.referenceNo = 'Reference No is required';
    if (!form.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    const selectedProduct = mockProducts.find((p) => p.id === Number(form.productId));
    const newMovement: InventoryMovement = {
      id: Math.max(...movements.map((m) => m.id), 0) + 1,
      date: form.date,
      product: selectedProduct?.name ?? '',
      type: 'stock_in',
      quantity: Number(form.quantity),
      reference: form.referenceNo.trim(),
      remarks: form.remarks.trim(),
    };

    setMovements((prev) => [newMovement, ...prev]);
    setForm(emptyForm);
    setSnackbarOpen(true);
  }

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Stock In
      </Typography>

      {/* Stock In Form */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Record Stock In
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              select
              fullWidth
              label="Product"
              value={form.productId}
              onChange={(e) => handleChange('productId', e.target.value)}
              error={!!errors.productId}
              helperText={errors.productId}
            >
              {mockProducts.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              inputProps={{ min: 1 }}
              value={form.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              error={!!errors.quantity}
              helperText={errors.quantity}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              label="Reference No"
              value={form.referenceNo}
              onChange={(e) => handleChange('referenceNo', e.target.value)}
              error={!!errors.referenceNo}
              helperText={errors.referenceNo}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              error={!!errors.date}
              helperText={errors.date}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 8 }}>
            <TextField
              fullWidth
              label="Remarks"
              value={form.remarks}
              onChange={(e) => handleChange('remarks', e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="success" onClick={handleSubmit}>
                Submit Stock In
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Recent Stock In Records */}
      <Typography variant="h6" fontWeight={600} mb={1}>
        Recent Stock In Records
      </Typography>
      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Product</strong></TableCell>
                <TableCell align="right"><strong>Quantity</strong></TableCell>
                <TableCell><strong>Reference</strong></TableCell>
                <TableCell><strong>Remarks</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockInRecords.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.product}</TableCell>
                  <TableCell align="right">{r.quantity}</TableCell>
                  <TableCell>{r.reference}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{r.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)} sx={{ width: '100%' }}>
          Stock In recorded successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
