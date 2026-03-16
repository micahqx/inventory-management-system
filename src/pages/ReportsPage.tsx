import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import DownloadIcon from '@mui/icons-material/Download';
import InventoryIcon from '@mui/icons-material/Inventory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const mockProducts = [
  { id: 1, name: 'Wireless Mouse', category: 'Electronics', sku: 'WM-001', price: 29.99, stock: 45 },
  { id: 2, name: 'Mechanical Keyboard', category: 'Electronics', sku: 'MK-002', price: 89.99, stock: 12 },
  { id: 3, name: 'USB-C Hub', category: 'Accessories', sku: 'UH-003', price: 49.99, stock: 3 },
  { id: 4, name: 'Monitor Stand', category: 'Furniture', sku: 'MS-004', price: 34.99, stock: 20 },
  { id: 5, name: 'Webcam HD', category: 'Electronics', sku: 'WC-005', price: 59.99, stock: 0 },
];

const mockInventoryMovements = [
  { id: 1, date: '2026-03-15', product: 'Wireless Mouse', type: 'IN', quantity: 50, balance: 95 },
  { id: 2, date: '2026-03-15', product: 'Wireless Mouse', type: 'OUT', quantity: 5, balance: 90 },
  { id: 3, date: '2026-03-14', product: 'Mechanical Keyboard', type: 'IN', quantity: 20, balance: 32 },
  { id: 4, date: '2026-03-14', product: 'USB-C Hub', type: 'OUT', quantity: 2, balance: 1 },
  { id: 5, date: '2026-03-13', product: 'Webcam HD', type: 'OUT', quantity: 1, balance: 0 },
  { id: 6, date: '2026-03-12', product: 'USB-C Hub', type: 'IN', quantity: 30, balance: 3 },
];

const LOW_STOCK_THRESHOLD = 10;

const mockLowStock = mockProducts
  .filter((p) => p.stock < LOW_STOCK_THRESHOLD)
  .map((p) => ({ ...p, minStock: LOW_STOCK_THRESHOLD }));

// ---------------------------------------------------------------------------
// Derived summary stats
// ---------------------------------------------------------------------------

const totalStockOnHand = mockProducts.reduce((sum, p) => sum + p.stock, 0);
const lowStockCount = mockLowStock.length;
const totalStockIn = mockInventoryMovements
  .filter((m) => m.type === 'IN')
  .reduce((sum, m) => sum + m.quantity, 0);
const totalStockOut = mockInventoryMovements
  .filter((m) => m.type === 'OUT')
  .reduce((sum, m) => sum + m.quantity, 0);

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

function SummaryCard({ title, value, subtitle, icon, color }: SummaryCardProps) {
  return (
    <Card elevation={2}>
      <CardContent>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={700} mb={0.5}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
          <Box sx={{ bgcolor: color, borderRadius: 2, p: 1.5, color: 'white', display: 'flex' }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function StockOnHandTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell><strong>Product</strong></TableCell>
            <TableCell><strong>SKU</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell align="right"><strong>Price</strong></TableCell>
            <TableCell align="right"><strong>Stock</strong></TableCell>
            <TableCell align="center"><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockProducts.map((p) => {
            let statusChip: React.ReactNode;
            if (p.stock === 0) statusChip = <Chip label="Out of Stock" color="error" size="small" />;
            else if (p.stock < LOW_STOCK_THRESHOLD) statusChip = <Chip label="Low Stock" color="warning" size="small" />;
            else statusChip = <Chip label="In Stock" color="success" size="small" />;
            return (
              <TableRow key={p.id} hover>
                <TableCell>{p.name}</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{p.sku}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell align="right">${p.price.toFixed(2)}</TableCell>
                <TableCell align="right">{p.stock}</TableCell>
                <TableCell align="center">{statusChip}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function InventoryMovementsTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Product</strong></TableCell>
            <TableCell align="center"><strong>Type</strong></TableCell>
            <TableCell align="right"><strong>Quantity</strong></TableCell>
            <TableCell align="right"><strong>Balance After</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockInventoryMovements.map((m) => (
            <TableRow key={m.id} hover>
              <TableCell>{m.date}</TableCell>
              <TableCell>{m.product}</TableCell>
              <TableCell align="center">
                <Chip
                  label={m.type}
                  color={m.type === 'IN' ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">{m.quantity}</TableCell>
              <TableCell align="right">{m.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function LowStockTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell><strong>Product</strong></TableCell>
            <TableCell><strong>SKU</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell align="right"><strong>Current Stock</strong></TableCell>
            <TableCell align="right"><strong>Min Stock</strong></TableCell>
            <TableCell sx={{ minWidth: 150 }}><strong>Stock Level</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockLowStock.map((item) => {
            const pct = Math.min((item.stock / item.minStock) * 100, 100);
            return (
              <TableRow key={item.id} hover>
                <TableCell>{item.name}</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{item.sku}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell
                  align="right"
                  sx={{ color: item.stock === 0 ? 'error.main' : 'warning.main', fontWeight: 700 }}
                >
                  {item.stock}
                </TableCell>
                <TableCell align="right">{item.minStock}</TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={pct}
                    color={item.stock === 0 ? 'error' : 'warning'}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ---------------------------------------------------------------------------
// Tab panel helper
// ---------------------------------------------------------------------------

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return value === index ? <Box>{children}</Box> : null;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const TAB_LABELS = ['Stock On Hand', 'Inventory Movements', 'Low Stock'];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <BarChartIcon color="primary" />
          <Typography variant="h5" fontWeight={700}>
            Reports
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<DownloadIcon />}>
          Export
        </Button>
      </Box>

      {/* Summary cards */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="Stock On Hand"
            value={totalStockOnHand}
            subtitle="Total units across all products"
            icon={<InventoryIcon />}
            color="primary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="Low Stock Items"
            value={lowStockCount}
            subtitle={`Below ${LOW_STOCK_THRESHOLD} units threshold`}
            icon={<WarningAmberIcon />}
            color="warning.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="Total Stock In"
            value={`${totalStockIn} units`}
            subtitle="All recorded IN transactions"
            icon={<TrendingUpIcon />}
            color="success.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="Total Stock Out"
            value={`${totalStockOut} units`}
            subtitle="All recorded OUT transactions"
            icon={<TrendingDownIcon />}
            color="error.main"
          />
        </Grid>
      </Grid>

      {/* Tabbed report sections */}
      <Card elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tabs value={activeTab} onChange={(_e, v) => setActiveTab(v)}>
            {TAB_LABELS.map((label) => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
        </Box>

        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <TabPanel value={activeTab} index={0}>
            <StockOnHandTable />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <InventoryMovementsTable />
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <LowStockTable />
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
}
