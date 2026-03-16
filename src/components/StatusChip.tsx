import { Chip } from '@mui/material';

type ChipColor = 'default' | 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warning';

interface StatusChipProps {
  label: string;
  color: ChipColor;
}

export default function StatusChip({ label, color }: StatusChipProps) {
  return <Chip label={label} color={color} size="small" />;
}
