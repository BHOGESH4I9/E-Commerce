import React from 'react';
import { useProductContext } from '../../context/ProductContext';
import ProductCard from '../../components/ProductCard/ProductCard'; 
import './CartPage.css'; 

const CartPage = () => {
  const { cartItems } = useProductContext();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <h3 className="text-center my-5">Your cart is empty</h3>;
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Your Cart</h2>
      <div className="row gy-4">
        {cartItems.map((item) => (
          <div key={item.id} className="col-md-4">
            <div className="position-relative">
              <ProductCard product={item} />
              <div className="cart-quantity-overlay">
                Qty: <strong>{item.quantity}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h4 className="mt-4 text-end">Total: ${total.toFixed(2)}</h4>
    </div>
  );
};

export default CartPage;
