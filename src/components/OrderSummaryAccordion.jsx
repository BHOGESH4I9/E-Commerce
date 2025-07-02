// src/components/checkout/OrderSummaryAccordion.js
import React from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { useProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';


const OrderSummaryAccordion = () => {
  const { cartItems } = useProductContext();
  const navigate = useNavigate();

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

  return (
    <div className="container my-4">
      <h4 className="mb-4 fw-bold">2. Order Summary</h4>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>View Order Summary</Accordion.Header>
          <Accordion.Body>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >
                <div>
                  <div className="fw-semibold">{item.title}</div>
                  <small>
                    Qty: {item.quantity} × ₹{item.price}
                  </small>
                </div>
                <div className="fw-bold">
                  ₹{item.quantity * item.price}
                </div>
              </div>
            ))}

            <hr />

            <div className="d-flex justify-content-between">
              <span>Total MRP</span>
              <span>₹{getTotalMRP()}</span>
            </div>
            <div className="d-flex justify-content-between text-success">
              <span>Discount</span>
              <span>- ₹{getDiscount().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
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

            <div className="text-end mt-4">
              <Button variant="primary" onClick={() => navigate('/checkout/payment')}>Continue</Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default OrderSummaryAccordion;
