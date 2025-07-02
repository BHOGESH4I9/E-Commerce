import React, { useState } from 'react';
import { Button, Form, Toast, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import './Auth.css';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setToastMsg(isRegister ? 'Account created successfully!' : 'Login successful!');
      setShowToast(true);

      
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 1000);
  };

  return (
    <div className="auth-wrapper d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 auth-card shadow">
        <h3 className="text-center text-meesho mb-3 fw-bold">
          {isRegister ? 'Register' : 'Login'}
        </h3>

        <Form onSubmit={handleSubmit}>
          {isRegister && (
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" required />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>

          <div className="d-grid mb-3">
            <Button type="submit" className="btn-meesho" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Please wait...
                </>
              ) : isRegister ? 'Create Account' : 'Login'}
            </Button>
          </div>
        </Form>

        <p className="text-center">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            className="text-meesho fw-bold"
            style={{ cursor: 'pointer' }}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Login' : 'Register'}
          </span>
        </p>
      </div>

      
      <Toast
        className="position-fixed bottom-0 end-0 m-4 text-white bg-success"
        show={showToast}
        delay={3000}
        onClose={() => setShowToast(false)}
        autohide
      >
        <Toast.Body>{toastMsg}</Toast.Body>
      </Toast>
    </div>
  );
};

export default AuthPage;
