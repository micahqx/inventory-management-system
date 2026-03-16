import { useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Product {
  id: number;
  name: string;
  stock: number;
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
  { id: 1, name: 'Wireless Mouse', stock: 90 },
  { id: 2, name: 'Mechanical Keyboard', stock: 32 },
  { id: 3, name: 'USB-C Hub', stock: 1 },
  { id: 4, name: 'Webcam HD', stock: 0 },
  { id: 5, name: 'Monitor Stand', stock: 25 },
];

const mockInventoryMovements: InventoryMovement[] = [
  { id: 1, date: '2026-03-15', product: 'Wireless Mouse', type: 'stock_out', quantity: 5, reference: 'SO-001', remarks: 'Sale order' },
  { id: 2, date: '2026-03-14', product: 'USB-C Hub', type: 'stock_out', quantity: 2, reference: 'SO-002', remarks: 'Customer return' },
  { id: 3, date: '2026-03-13', product: 'Webcam HD', type: 'stock_out', quantity: 1, reference: 'SO-003', remarks: 'Damaged' },
  { id: 4, date: '2026-03-11', product: 'Mechanical Keyboard', type: 'stock_out', quantity: 3, reference: 'SO-004', remarks: '' },
  { id: 5, date: '2026-03-15', product: 'Wireless Mouse', type: 'stock_in', quantity: 50, reference: 'SI-001', remarks: 'Restocked' },
  { id: 6, date: '2026-03-12', product: 'USB-C Hub', type: 'stock_in', quantity: 30, reference: 'SI-002', remarks: '' },
];

interface FormState {
  productId: string;
  quantity: string;
  reference: string;
  date: string;
  remarks: string;
}

const emptyForm: FormState = {
  productId: '',
  quantity: '',
  reference: '',
  date: new Date().toISOString().split('T')[0],
  remarks: '',
};

export default function StockOutPage() {
  const [movements, setMovements] = useState<InventoryMovement[]>(mockInventoryMovements);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [successMsg, setSuccessMsg] = useState('');

  const stockOutRecords = movements.filter((m) => m.type === 'stock_out');

  const selectedProduct = useMemo(
    () => mockProducts.find((p) => p.id === Number(form.productId)),
    [form.productId]
  );

  function validate(): boolean {
    const newErrors: Partial<FormState> = {};

    if (!form.productId) newErrors.productId = 'Product is required.';
    if (!form.quantity) {
      newErrors.quantity = 'Quantity is required.';
    } else if (isNaN(Number(form.quantity)) || Number(form.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0.';
    } else if (selectedProduct && Number(form.quantity) > selectedProduct.stock) {
      newErrors.quantity = `Quantity exceeds current stock (${selectedProduct.stock}).`;
    }
    if (!form.date) newErrors.date = 'Date is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    setSuccessMsg('');
    if (!validate()) return;

    const newRecord: InventoryMovement = {
      id: movements.length + 1,
      date: form.date,
      product: selectedProduct!.name,
      type: 'stock_out',
      quantity: Number(form.quantity),
      reference: form.reference,
      remarks: form.remarks,
    };

    setMovements((prev) => [newRecord, ...prev]);
    setForm(emptyForm);
    setErrors({});
    setSuccessMsg(`Stock out recorded for "${newRecord.product}".`);
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Stock Out
        </Typography>
      </Box>

      {/* Stock Out Form */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Record Stock Out
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {successMsg && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMsg('')}>
              {successMsg}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                fullWidth
                label="Product"
                value={form.productId}
                onChange={(e) => setForm((prev) => ({ ...prev, productId: e.target.value }))}
                error={!!errors.productId}
                helperText={errors.productId}
                size="small"
              >
                {mockProducts.map((p) => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.name} (Stock: {p.stock})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={form.quantity}
                onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
                error={!!errors.quantity}
                helperText={errors.quantity}
                size="small"
                inputProps={{ min: 1 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Reference No"
                value={form.reference}
                onChange={(e) => setForm((prev) => ({ ...prev, reference: e.target.value }))}
                size="small"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={form.date}
                onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                error={!!errors.date}
                helperText={errors.date}
                size="small"
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Remarks"
                value={form.remarks}
                onChange={(e) => setForm((prev) => ({ ...prev, remarks: e.target.value }))}
                size="small"
                multiline
                rows={2}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<AddIcon />}
                onClick={handleSubmit}
              >
                Record Stock Out
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Recent Stock Out Records */}
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Recent Stock Out Records
      </Typography>
      <Card elevation={2}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
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
                {stockOutRecords.map((r) => (
                  <TableRow key={r.id} hover>
                    <TableCell>{r.date}</TableCell>
                    <TableCell>{r.product}</TableCell>
                    <TableCell align="right">{r.quantity}</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{r.reference}</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{r.remarks}</TableCell>
                  </TableRow>
                ))}
                {stockOutRecords.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                      No stock out records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
