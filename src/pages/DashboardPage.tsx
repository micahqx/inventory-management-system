import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { mockProducts } from '../mock/mockProducts';
import { mockCategories } from '../mock/mockCategories';
import { mockSuppliers } from '../mock/mockSuppliers';
import { mockInventoryMovements } from '../mock/mockInventoryMovements';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: color,
              borderRadius: 2,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const lowStockProducts = mockProducts.filter((p) => p.stock <= p.reorderLevel);
  const recentMovements = [...mockInventoryMovements]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Dashboard
      </Typography>

      {/* Summary Stat Cards */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Products"
            value={mockProducts.length}
            icon={<InventoryIcon />}
            color="primary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Categories"
            value={mockCategories.length}
            icon={<CategoryIcon />}
            color="success.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Suppliers"
            value={mockSuppliers.length}
            icon={<LocalShippingIcon />}
            color="info.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Low Stock Items"
            value={lowStockProducts.length}
            icon={<WarningAmberIcon />}
            color="warning.main"
          />
        </Grid>
      </Grid>

      {/* Tables Section */}
      <Grid container spacing={3} mt={1}>
        {/* Recent Inventory Movements */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Recent Inventory Movements
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Product</strong></TableCell>
                      <TableCell align="center"><strong>Type</strong></TableCell>
                      <TableCell align="right"><strong>Qty</strong></TableCell>
                      <TableCell align="right"><strong>Balance</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentMovements.map((movement) => (
                      <TableRow key={movement.id} hover>
                        <TableCell>{movement.date}</TableCell>
                        <TableCell>{movement.product}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={movement.type}
                            size="small"
                            color={movement.type === 'IN' ? 'success' : 'error'}
                          />
                        </TableCell>
                        <TableCell align="right">{movement.quantity}</TableCell>
                        <TableCell align="right">{movement.balance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Low Stock Products */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Low Stock Products
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell><strong>Product</strong></TableCell>
                      <TableCell align="right"><strong>Stock</strong></TableCell>
                      <TableCell align="right"><strong>Reorder At</strong></TableCell>
                      <TableCell align="center"><strong>Status</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lowStockProducts.map((product) => (
                      <TableRow key={product.id} hover>
                        <TableCell>{product.name}</TableCell>
                        <TableCell align="right">{product.stock}</TableCell>
                        <TableCell align="right">{product.reorderLevel}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={product.stock === 0 ? 'Out of Stock' : 'Low Stock'}
                            size="small"
                            color={product.stock === 0 ? 'error' : 'warning'}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
