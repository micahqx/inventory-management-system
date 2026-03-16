import { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { mockProducts } from '../mock/mockProducts';
import type { Product, ProductStatus } from '../types/product';

// ── Constants ────────────────────────────────────────────────────────────────

const STATUS_OPTIONS: ProductStatus[] = ['Active', 'Inactive', 'Discontinued'];

const CATEGORY_OPTIONS = [
  'Accessories',
  'Electronics',
  'Furniture',
  'Stationery',
];

// ── Helper: Status chip ───────────────────────────────────────────────────────

function StatusChip({ status }: { status: ProductStatus }) {
  const colorMap: Record<ProductStatus, 'success' | 'default' | 'error'> = {
    Active: 'success',
    Inactive: 'default',
    Discontinued: 'error',
  };
  return <Chip label={status} color={colorMap[status]} size="small" />;
}

// ── Helper: Empty form values ─────────────────────────────────────────────────

type ProductFormValues = Omit<Product, 'id'>;

function emptyForm(): ProductFormValues {
  return {
    sku: '',
    name: '',
    category: '',
    supplier: '',
    unit: '',
    costPrice: 0,
    sellingPrice: 0,
    currentStock: 0,
    reorderLevel: 0,
    status: 'Active',
  };
}

// ── Product form dialog ───────────────────────────────────────────────────────

interface ProductDialogProps {
  open: boolean;
  initialValues: ProductFormValues;
  isEdit: boolean;
  onClose: () => void;
  onSave: (values: ProductFormValues) => void;
}

function ProductDialog({ open, initialValues, isEdit, onClose, onSave }: ProductDialogProps) {
  const [form, setForm] = useState<ProductFormValues>(initialValues);

  // Sync form when dialog opens with new initialValues
  useEffect(() => {
    setForm(initialValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleChange(field: keyof ProductFormValues, value: string | number | ProductStatus) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2} pt={1}>
          <Box display="flex" gap={2}>
            <TextField
              label="SKU"
              value={form.sku}
              onChange={(e) => handleChange('sku', e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Product Name"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              fullWidth
            />
          </Box>
          <Box display="flex" gap={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Supplier"
              value={form.supplier}
              onChange={(e) => handleChange('supplier', e.target.value)}
              fullWidth
            />
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              label="Unit"
              value={form.unit}
              onChange={(e) => handleChange('unit', e.target.value)}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value as ProductStatus)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              label="Cost Price"
              type="number"
              value={form.costPrice}
              onChange={(e) => handleChange('costPrice', parseFloat(e.target.value) || 0)}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              fullWidth
            />
            <TextField
              label="Selling Price"
              type="number"
              value={form.sellingPrice}
              onChange={(e) => handleChange('sellingPrice', parseFloat(e.target.value) || 0)}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              fullWidth
            />
          </Box>
          <Box display="flex" gap={2}>
            <TextField
              label="Current Stock"
              type="number"
              value={form.currentStock}
              onChange={(e) => handleChange('currentStock', parseInt(e.target.value) || 0)}
              fullWidth
            />
            <TextField
              label="Reorder Level"
              type="number"
              value={form.reorderLevel}
              onChange={(e) => handleChange('reorderLevel', parseInt(e.target.value) || 0)}
              fullWidth
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
          {isEdit ? 'Save Changes' : 'Add Product'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProductStatus | ''>('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // ── Filtering ──────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesSearch =
        !q || p.sku.toLowerCase().includes(q) || p.name.toLowerCase().includes(q);
      const matchesStatus = !statusFilter || p.status === statusFilter;
      const matchesCategory = !categoryFilter || p.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [products, search, statusFilter, categoryFilter]);

  // ── Dialog helpers ─────────────────────────────────────────────────────────

  function openAddDialog() {
    setEditingProduct(null);
    setDialogOpen(true);
  }

  function openEditDialog(product: Product) {
    setEditingProduct(product);
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setEditingProduct(null);
  }

  // ── CRUD ───────────────────────────────────────────────────────────────────

  function handleSave(values: ProductFormValues) {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...values, id: editingProduct.id } : p)),
      );
    } else {
      const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      setProducts((prev) => [...prev, { ...values, id: newId }]);
    }
    closeDialog();
  }

  function handleDelete(id: number) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  // ── Dialog initial values ──────────────────────────────────────────────────

  const dialogInitialValues: ProductFormValues = editingProduct
    ? {
        sku: editingProduct.sku,
        name: editingProduct.name,
        category: editingProduct.category,
        supplier: editingProduct.supplier,
        unit: editingProduct.unit,
        costPrice: editingProduct.costPrice,
        sellingPrice: editingProduct.sellingPrice,
        currentStock: editingProduct.currentStock,
        reorderLevel: editingProduct.reorderLevel,
        status: editingProduct.status,
      }
    : emptyForm();

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <Box>
      {/* Page header */}
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Products
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Manage your product catalogue, prices, and stock levels.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAddDialog}>
          Add Product
        </Button>
      </Box>

      {/* Filters */}
      <Card elevation={2} sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" gap={2} flexWrap="wrap">
            <TextField
              placeholder="Search by SKU or name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{ minWidth: 220 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as ProductStatus | '')}
              >
                <MenuItem value="">All</MenuItem>
                {STATUS_OPTIONS.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {CATEGORY_OPTIONS.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      {/* Products table */}
      <Card elevation={2}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>SKU</strong></TableCell>
                  <TableCell><strong>Product Name</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell><strong>Supplier</strong></TableCell>
                  <TableCell><strong>Unit</strong></TableCell>
                  <TableCell align="right"><strong>Cost Price</strong></TableCell>
                  <TableCell align="right"><strong>Selling Price</strong></TableCell>
                  <TableCell align="right"><strong>Current Stock</strong></TableCell>
                  <TableCell align="right"><strong>Reorder Level</strong></TableCell>
                  <TableCell align="center"><strong>Status</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((p) => (
                    <TableRow key={p.id} hover>
                      <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{p.sku}</TableCell>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.category}</TableCell>
                      <TableCell>{p.supplier}</TableCell>
                      <TableCell>{p.unit}</TableCell>
                      <TableCell align="right">${p.costPrice.toFixed(2)}</TableCell>
                      <TableCell align="right">${p.sellingPrice.toFixed(2)}</TableCell>
                      <TableCell align="right">{p.currentStock}</TableCell>
                      <TableCell align="right">{p.reorderLevel}</TableCell>
                      <TableCell align="center">
                        <StatusChip status={p.status} />
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => openEditDialog(p)} color="primary">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" onClick={() => handleDelete(p.id)} color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add / Edit dialog */}
      <ProductDialog
        open={dialogOpen}
        initialValues={dialogInitialValues}
        isEdit={!!editingProduct}
        onClose={closeDialog}
        onSave={handleSave}
      />
    </Box>
  );
}
