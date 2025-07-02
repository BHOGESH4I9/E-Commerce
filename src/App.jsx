import { useState } from 'react'
import './App.css'
import Home from './pages/Home/Home.jsx'
import { Route, Routes } from 'react-router-dom'
import WebsiteNavbar from './components/WebsiteNavbar/WebsiteNavbar.jsx'
import ProductPage from './pages/Products/ProductPage.jsx'
import CartPage from './pages/CartPage/CartPage.jsx'
import ProductView from './pages/ProductView/ProductView.jsx'
import Address from './pages/CartPage/Address.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import Contact from './components/Contact/Contact.jsx'

function App() {

  return (
    <>
      <WebsiteNavbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path='/product/:id' element={<ProductView />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path="/checkout/address" element={<Address />} />
          <Route path="/checkout/payment" element={<PaymentPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
