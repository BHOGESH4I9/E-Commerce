import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import securePayImage from '../assets/payment1.jpg';
import { useProductContext } from '../context/ProductContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

const PaymentPage = () => {
  const { clearCart, clearAddresses } = useProductContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const launchConfetti = () => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .matches(/^\d{16}$/, 'Card number must be 16 digits')
      .required('Required'),
    expiry: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry must be MM/YY format')
      .required('Required'),
    cvv: Yup.string()
      .matches(/^\d{3}$/, 'CVV must be 3 digits')
      .required('Required'),
    nameOnCard: Yup.string()
      .min(3, 'Too short')
      .required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      launchConfetti();

      clearCart();
      clearAddresses();
      resetForm();

      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="container my-5 position-relative">
      <h3 className="fw-bold mb-4 text">3. Payment</h3>

      <div className="row g-4 align-items-center shadow-sm p-4 bg-white rounded">
        {/* Left Image */}
        <div className="col-md-6 text-center">
          <img
            src={securePayImage}
            alt="Secure Payment"
            className="img-fluid rounded"
            style={{ maxHeight: '350px', objectFit: 'contain' }}
          />
          <p className="text-muted mt-3 small">100% Secure & Encrypted Payment</p>
        </div>

        {/* Right Form */}
        <div className="col-md-6">
          <Formik
            initialValues={{
              cardNumber: '',
              expiry: '',
              cvv: '',
              nameOnCard: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit} className="p-3 bg-light rounded border">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    value={values.cardNumber}
                    onChange={handleChange}
                    isInvalid={touched.cardNumber && !!errors.cardNumber}
                    placeholder="1234567812345678"
                  />
                  <Form.Control.Feedback type="invalid">{errors.cardNumber}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-3">
                  <Form.Group className="mb-3 flex-grow-1">
                    <Form.Label className="fw-semibold">Expiry</Form.Label>
                    <Form.Control
                      type="text"
                      name="expiry"
                      value={values.expiry}
                      onChange={handleChange}
                      isInvalid={touched.expiry && !!errors.expiry}
                      placeholder="MM/YY"
                    />
                    <Form.Control.Feedback type="invalid">{errors.expiry}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 flex-grow-1">
                    <Form.Label className="fw-semibold">CVV</Form.Label>
                    <Form.Control
                      type="password"
                      name="cvv"
                      value={values.cvv}
                      onChange={handleChange}
                      isInvalid={touched.cvv && !!errors.cvv}
                      placeholder="123"
                    />
                    <Form.Control.Feedback type="invalid">{errors.cvv}</Form.Control.Feedback>
                  </Form.Group>
                </div>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Name on Card</Form.Label>
                  <Form.Control
                    type="text"
                    name="nameOnCard"
                    value={values.nameOnCard}
                    onChange={handleChange}
                    isInvalid={touched.nameOnCard && !!errors.nameOnCard}
                    placeholder="e.g., John Doe"
                  />
                  <Form.Control.Feedback type="invalid">{errors.nameOnCard}</Form.Control.Feedback>
                </Form.Group>

                <div className="text-end">
                  <Button type="submit" variant="success" className="px-4 fw-bold" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Processing...
                      </>
                    ) : (
                      'Pay ₹999'
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Payment Success Banner */}
      {paymentSuccess && (
        <div className="text-center mt-5">
          <h4 className="text-success fw-bold animate__animated animate__fadeIn">
            Payment Successful! Redirecting...
          </h4>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
