import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
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
import { mockSuppliers, type Supplier } from '../mock/mockSuppliers';

const emptyForm: Omit<Supplier, 'id'> = {
  name: '',
  contact: '',
  phone: '',
  email: '',
  address: '',
};

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [form, setForm] = useState<Omit<Supplier, 'id'>>(emptyForm);

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.contact.toLowerCase().includes(search.toLowerCase()),
  );

  function openAddDialog() {
    setEditingSupplier(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }

  function openEditDialog(supplier: Supplier) {
    setEditingSupplier(supplier);
    setForm({ name: supplier.name, contact: supplier.contact, phone: supplier.phone, email: supplier.email, address: supplier.address });
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  function handleFormChange(field: keyof typeof emptyForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    if (editingSupplier) {
      setSuppliers((prev) =>
        prev.map((s) => (s.id === editingSupplier.id ? { ...editingSupplier, ...form } : s)),
      );
    } else {
      const newId = suppliers.length > 0 ? Math.max(...suppliers.map((s) => s.id)) + 1 : 1;
      setSuppliers((prev) => [...prev, { id: newId, ...form }]);
    }
    closeDialog();
  }

  function handleDelete(id: number) {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  }

  const isFormValid = form.name.trim() !== '' && form.contact.trim() !== '';

  return (
    <Box>
      {/* Page Header */}
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Suppliers
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Manage your supplier contacts and information.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAddDialog}>
          Add Supplier
        </Button>
      </Box>

      <Card elevation={2}>
        {/* Search Bar */}
        <Box px={2} py={1.5}>
          <TextField
            size="small"
            placeholder="Search by supplier name or contact person…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 360 }}
          />
        </Box>

        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>Supplier Name</strong></TableCell>
                  <TableCell><strong>Contact Person</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Address</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                      No suppliers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((s) => (
                    <TableRow key={s.id} hover>
                      <TableCell><strong>{s.name}</strong></TableCell>
                      <TableCell>{s.contact}</TableCell>
                      <TableCell>{s.phone}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{s.email}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{s.address}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton size="small" color="primary" onClick={() => openEditDialog(s)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" color="error" onClick={() => handleDelete(s.id)}>
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

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingSupplier ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField
              label="Supplier Name"
              value={form.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Contact Person"
              value={form.contact}
              onChange={(e) => handleFormChange('contact', e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Phone"
              value={form.phone}
              onChange={(e) => handleFormChange('phone', e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => handleFormChange('email', e.target.value)}
              fullWidth
            />
            <TextField
              label="Address"
              value={form.address}
              onChange={(e) => handleFormChange('address', e.target.value)}
              multiline
              rows={2}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={!isFormValid}>
            {editingSupplier ? 'Save Changes' : 'Add Supplier'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
