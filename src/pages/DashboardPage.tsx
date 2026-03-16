import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

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
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Products"
            value={128}
            icon={<InventoryIcon />}
            color="primary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Categories"
            value={14}
            icon={<CategoryIcon />}
            color="success.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Suppliers"
            value={22}
            icon={<LocalShippingIcon />}
            color="info.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Low Stock Alerts"
            value={7}
            icon={<WarningAmberIcon />}
            color="warning.main"
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Recent Activity
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Activity feed coming soon — connect your data source to see recent stock movements here.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
