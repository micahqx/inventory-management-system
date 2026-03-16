import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import SuppliersPage from './pages/SuppliersPage';
import StockInPage from './pages/StockInPage';
import StockOutPage from './pages/StockOutPage';
import MovementsPage from './pages/MovementsPage';
import LowStockPage from './pages/LowStockPage';
import ReportsPage from './pages/ReportsPage';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/stock-in" element={<StockInPage />} />
        <Route path="/stock-out" element={<StockOutPage />} />
        <Route path="/movements" element={<MovementsPage />} />
        <Route path="/low-stock" element={<LowStockPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </AppLayout>
  );
}
