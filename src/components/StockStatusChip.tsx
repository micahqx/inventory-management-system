import StatusChip from './StatusChip';

interface StockStatusChipProps {
  stock: number;
}

export default function StockStatusChip({ stock }: StockStatusChipProps) {
  if (stock === 0) return <StatusChip label="Out of Stock" color="error" />;
  if (stock <= 5) return <StatusChip label="Low Stock" color="warning" />;
  return <StatusChip label="In Stock" color="success" />;
}
