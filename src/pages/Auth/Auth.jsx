import React, { useState } from 'react';
import { Button, Form, Spinner, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './Auth.css'; 

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: isRegister
      ? Yup.string().required('Name is required').min(3, 'Min 3 characters')
      : Yup.string(),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = (values, { resetForm }) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setToastMsg(isRegister ? 'Account created successfully!' : 'Login successful!');
      setShowToast(true);
      resetForm();

      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 1000);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h3 className="text-center mb-4 fw-bold text-meesho">
          {isRegister ? 'Register' : 'Login'}
        </h3>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
          }) => (
            <Form onSubmit={handleSubmit}>
              {isRegister && (
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && !!errors.name}
                    placeholder="Enter name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!errors.email}
                  placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
                  placeholder="Enter password"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Show Password"
                className="mb-3"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />

              <div className="d-grid mb-3">
                <Button type="submit" disabled={loading} className="btn-meesho">
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Please wait...
                    </>
                  ) : isRegister ? 'Create Account' : 'Login'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>

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
        show={showToast}
        delay={3000}
        onClose={() => setShowToast(false)}
        autohide
        bg="success"
        className="toast position-fixed bottom-0 end-0 m-4 text-white"
      >
        <Toast.Body>{toastMsg}</Toast.Body>
      </Toast>
    </div>
  );
};

export default AuthPage;
