import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext.jsx';


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
       <BrowserRouter>
       <ProductProvider>
          <App />
       </ProductProvider>
      </BrowserRouter>
    </React.StrictMode>
   
  
)
