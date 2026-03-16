import { Box, Button, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const MOCK_CATEGORIES = [
  { id: 1, name: 'Electronics', description: 'Electronic devices and accessories', productCount: 42 },
  { id: 2, name: 'Accessories', description: 'Peripheral and computer accessories', productCount: 27 },
  { id: 3, name: 'Furniture', description: 'Office and home furniture', productCount: 15 },
  { id: 4, name: 'Stationery', description: 'Office stationery and supplies', productCount: 33 },
  { id: 5, name: 'Networking', description: 'Network equipment and cables', productCount: 11 },
];

export default function CategoriesPage() {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Categories
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Category
        </Button>
      </Box>

      <Card elevation={2}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell align="right"><strong>Products</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_CATEGORIES.map((c) => (
                  <TableRow key={c.id} hover>
                    <TableCell>{c.name}</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{c.description}</TableCell>
                    <TableCell align="right">{c.productCount}</TableCell>
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
