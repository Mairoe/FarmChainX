import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ConsumerDashboard from './pages/roles/ConsumerDashboard';
import FarmerPage from './pages/roles/FarmerPage';
import DistributorPage from './pages/roles/DistributorPage';
import CertifierPage from './pages/roles/CertifierPage';
import RetailerPage from './pages/roles/RetailerPage';
import WarehousePage from './pages/roles/WarehousePage';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<><Navbar /><LandingPage /></>} />
            <Route path="/shop" element={<><Navbar /><ShopPage /></>} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard/consumer" element={
              <ProtectedRoute allowedRoles={['customer']}>
                <ConsumerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/farmer" element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/certifier" element={
              <ProtectedRoute allowedRoles={['certifier']}>
                <CertifierPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/distributor" element={
              <ProtectedRoute allowedRoles={['distributor']}>
                <DistributorPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/retailer" element={
              <ProtectedRoute allowedRoles={['retailer']}>
                <RetailerPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/warehouse" element={
              <ProtectedRoute allowedRoles={['warehouse']}>
                <WarehousePage />
              </ProtectedRoute>
            } />
            
            {/* Catch-all */}
            <Route path="*" element={<><Navbar /><LandingPage /></>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
