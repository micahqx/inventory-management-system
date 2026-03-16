import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export default function PageHeader({ title, icon, action }: PageHeaderProps) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
      <Box display="flex" alignItems="center" gap={icon ? 1 : 0}>
        {icon}
        <Typography variant="h5" fontWeight={700}>
          {title}
        </Typography>
      </Box>
      {action}
    </Box>
  );
}
