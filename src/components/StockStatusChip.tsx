import StatusChip from './StatusChip';

const LOW_STOCK_THRESHOLD = 5;

interface StockStatusChipProps {
  stock: number;
}

export default function StockStatusChip({ stock }: StockStatusChipProps) {
  if (stock === 0) return <StatusChip label="Out of Stock" color="error" />;
  if (stock <= LOW_STOCK_THRESHOLD) return <StatusChip label="Low Stock" color="warning" />;
  return <StatusChip label="In Stock" color="success" />;
}
