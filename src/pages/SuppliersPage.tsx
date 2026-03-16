import { Box, Button, Card, CardContent, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const MOCK_SUPPLIERS = [
  { id: 1, name: 'TechWorld Supply Co.', contact: 'Alice Johnson', email: 'alice@techworld.com', phone: '+1-555-0101', status: 'Active' },
  { id: 2, name: 'OfficeGear Ltd.', contact: 'Bob Smith', email: 'bob@officegear.com', phone: '+1-555-0102', status: 'Active' },
  { id: 3, name: 'NetEquip Inc.', contact: 'Carol White', email: 'carol@netequip.com', phone: '+1-555-0103', status: 'Inactive' },
  { id: 4, name: 'FurniPro Supplies', contact: 'David Lee', email: 'david@furnipro.com', phone: '+1-555-0104', status: 'Active' },
];

export default function SuppliersPage() {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Suppliers
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Supplier
        </Button>
      </Box>

      <Card elevation={2}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>Company</strong></TableCell>
                  <TableCell><strong>Contact</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell align="center"><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_SUPPLIERS.map((s) => (
                  <TableRow key={s.id} hover>
                    <TableCell><strong>{s.name}</strong></TableCell>
                    <TableCell>{s.contact}</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{s.email}</TableCell>
                    <TableCell>{s.phone}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={s.status}
                        color={s.status === 'Active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
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
