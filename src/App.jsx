import { useState } from 'react'
import './App.css'
import Home from './pages/Home/Home.jsx'
import { Route, Routes } from 'react-router-dom'
import WebsiteNavbar from './components/WebsiteNavbar/WebsiteNavbar.jsx'
import ProductPage from './pages/Products/ProductPage.jsx'
import CartPage from './pages/CartPage/CartPage.jsx'
import ProductView from './pages/ProductView/ProductView.jsx'

function App() {

  return (
    <>
      <WebsiteNavbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/product/:id' element={<ProductView />} />
        </Routes>
      </main>
    </>
  )
}

export default App
