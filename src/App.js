import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Login from './login/Login';
import Register from './register/Register';
import Checkout from './checkout/Checkout';
import AdminDashboard from './admin/AdminDashboard';
import SearchResults from './SearchResults';
import PurchaseHistory from './admin/PurchaseHistory';
import ReturnProduct from './admin/ReturnProduct';
import AdminProducts from './admin/AdminProducts'; 
import { CartProvider } from './CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="purchase-history" element={<PurchaseHistory />} />
            <Route path="return-product" element={<ReturnProduct />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
