import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

interface ReportCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

function ReportCard({ title, value, subtitle, icon, color }: ReportCardProps) {
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
          <Box sx={{ bgcolor: color, borderRadius: 2, p: 1.5, color: 'white' }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ReportsPage() {
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <BarChartIcon color="primary" />
        <Typography variant="h5" fontWeight={700}>
          Reports
        </Typography>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ReportCard
            title="Total Stock Value"
            value="$24,580"
            subtitle="All products combined"
            icon={<AccountBalanceWalletIcon />}
            color="primary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ReportCard
            title="Stock In (This Month)"
            value="125 units"
            subtitle="+18% vs last month"
            icon={<TrendingUpIcon />}
            color="success.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ReportCard
            title="Stock Out (This Month)"
            value="48 units"
            subtitle="-5% vs last month"
            icon={<TrendingDownIcon />}
            color="error.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ReportCard
            title="Turnover Rate"
            value="38.4%"
            subtitle="Based on current month"
            icon={<BarChartIcon />}
            color="info.main"
          />
        </Grid>
      </Grid>

      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={1}>
            Charts &amp; Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Detailed charts and analytics will appear here once a data source is connected. Planned visuals include stock trend graphs, category breakdowns, and supplier performance reports.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
