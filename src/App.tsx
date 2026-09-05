import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AIAssistant from './components/AIAssistant';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerPortal from './pages/BuyerPortal';
import AIIntelligence from './pages/AIIntelligence';
import Logistics from './pages/Logistics';
import Impact from './pages/Impact';
import HowItWorks from './pages/HowItWorks';
import Cart from './pages/Cart';
import Notifications from './pages/Notifications';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/marketplace/:id" element={<ProductDetail />} />
                <Route path="/farmer" element={<FarmerDashboard />} />
                <Route path="/buyer" element={<BuyerPortal />} />
                <Route path="/ai-intelligence" element={<AIIntelligence />} />
                <Route path="/logistics" element={<Logistics />} />
                <Route path="/impact" element={<Impact />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/admin" element={<AdminDashboard />} />
                {/* Catch-all */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
            <AIAssistant />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
