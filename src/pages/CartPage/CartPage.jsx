import React from 'react';
import './CartPage.css';
import { useProductContext } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useProductContext();

  const navigate = useNavigate();

  // Derive original price from discountPercentage
  const getOriginalPrice = (item) =>
    Math.round(item.price / (1 - item.discountPercentage / 100));

  const getTotalMRP = () =>
    cartItems.reduce((sum, item) => sum + getOriginalPrice(item) * item.quantity, 0);

  const getDiscount = () =>
    cartItems.reduce(
      (sum, item) =>
        sum + (getOriginalPrice(item) - item.price) * item.quantity,
      0
    );

  const getPlatformFee = () => 3;

  const getFinalAmount = () => getTotalMRP() - getDiscount() + getPlatformFee();

  if (cartItems.length === 0) {
    return <h3 className="text-center my-5">Your cart is empty</h3>;
  }

  return (
    <div className="container my-4">
      <div className="row">
        {/* Left - Items */}
        <div className="col-md-8">
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3 p-3 d-flex flex-row gap-3">
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
              <div className="flex-grow-1">
                <h5>{item.title}</h5>
                <small className="text-muted">{item.category}</small>
                <p className="mb-1">Seller: <strong>{item.brand}</strong></p>
                <p className="mb-1 text-success">Delivery by Thu Jul 10</p>

                <div className="d-flex align-items-center gap-2 my-2">
                  <span className="text-muted text-decoration-line-through">
                    ₹{getOriginalPrice(item)}
                  </span>
                  <span className="fw-bold">₹{item.price}</span>
                  <span className="text-success">
                    {Math.round(item.discountPercentage)}% Off
                  </span>
                </div>

                <div className="d-flex gap-3 align-items-center mt-2">
                  <div className="d-flex align-items-center border rounded px-2">
                    <button
                      className="btn btn-sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-link text-decoration-none text-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-end mt-3">
            <button className="btn btn-warning px-4 fw-bold" onClick={() => navigate('/checkout/address')}>PLACE ORDER</button>
          </div>
        </div>

        {/* Right - Price Summary */}
        <div className="col-md-4">
          <div className="card p-3">
            <h5 className="mb-3">PRICE DETAILS</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>Price ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
              <span>₹{getTotalMRP()}</span>
            </div>
            <div className="d-flex justify-content-between mb-2 text-success">
              <span>Discount</span>
              <span>- ₹{getDiscount().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Platform Fee</span>
              <span>₹{getPlatformFee()}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total Amount</span>
              <span>₹{getFinalAmount().toFixed(2)}</span>
            </div>
            <div className="text-success mt-2">
              You will save ₹{(getDiscount() - getPlatformFee()).toFixed(2)} on this order
            </div>
          </div>
          <p className="text-muted small mt-3">
            Safe and Secure Payments. Easy returns. 100% Authentic products.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
