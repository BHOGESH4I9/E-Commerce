import { useState, Suspense, lazy } from 'react';
import './App.css';
import Home from './pages/Home/Home.jsx';
import { Route, Routes } from 'react-router-dom';
import WebsiteNavbar from './components/WebsiteNavbar/WebsiteNavbar.jsx';

// Lazy-load components
const ProductPage = lazy(() => import('./pages/Products/ProductPage.jsx'));
const CartPage = lazy(() => import('./pages/CartPage/CartPage.jsx'));
const ProductView = lazy(() => import('./pages/ProductView/ProductView.jsx'));
const Address = lazy(() => import('./pages/CartPage/Address.jsx'));
const PaymentPage = lazy(() => import('./pages/PaymentPage.jsx'));
const Contact = lazy(() => import('./components/Contact/Contact.jsx'));
const Auth = lazy(() => import('./pages/Auth/Auth.jsx'));

function App() {
  return (
    <>
      <WebsiteNavbar />
      <main>
        <Suspense
          fallback={
            <div className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '200px' }}>
              <div className="dotted-spinner">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          }
        />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductView />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout/address" element={<Address />} />
            <Route path="/checkout/payment" element={<PaymentPage />} />
          </Routes>
        </main>
    </>
  );
}

export default App;