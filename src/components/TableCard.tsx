import { Card, CardContent, TableContainer } from '@mui/material';

interface TableCardProps {
  children: React.ReactNode;
}

export default function TableCard({ children }: TableCardProps) {
  return (
    <Card elevation={2}>
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <TableContainer>{children}</TableContainer>
      </CardContent>
    </Card>
  );
}
