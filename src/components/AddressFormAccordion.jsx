// src/components/checkout/AddressFormAccordion.js
import React from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useProductContext } from '../context/ProductContext';


const AddressFormAccordion = () => {
  const {
    addAddress,
    setActiveAddressAccordionKey,
    activeAddressAccordionKey,
  } = useProductContext();

  const initialValues = {
    name: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    type: 'Home',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    mobile: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be at least 10 digits')
      .required('Mobile is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(6, 'Must be at least 6 digits')
      .required('Pincode is required'),
    type: Yup.string().required('Type is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      addAddress(values);
      setActiveAddressAccordionKey(''); // Collapse after submission
      resetForm();
    },
  });

  const handleToggleForm = () => {
    setActiveAddressAccordionKey(
      activeAddressAccordionKey === 'add' ? '' : 'add'
    );
  };

  return (
    <Accordion.Item eventKey="add">
      <Accordion.Header onClick={handleToggleForm}>
        + Add a new address
      </Accordion.Header>
      <Accordion.Body>
        {activeAddressAccordionKey === 'add' && (
          <Form onSubmit={formik.handleSubmit} className="row g-3">

            {/* Name */}
            <Form.Group className="col-md-6">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.name && !!formik.errors.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger mt-1">{formik.errors.name}</div>
              )}
            </Form.Group>

            {/* Mobile */}
            <Form.Group className="col-md-6">
              <Form.Label>Mobile *</Form.Label>
              <Form.Control
                type="tel"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.mobile && !!formik.errors.mobile}
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div className="text-danger mt-1">{formik.errors.mobile}</div>
              )}
            </Form.Group>

            {/* Pincode */}
            <Form.Group className="col-md-6">
              <Form.Label>Pincode *</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.pincode && !!formik.errors.pincode}
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <div className="text-danger mt-1">{formik.errors.pincode}</div>
              )}
            </Form.Group>

            {/* City */}
            <Form.Group className="col-md-6">
              <Form.Label>City *</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.city && !!formik.errors.city}
              />
              {formik.touched.city && formik.errors.city && (
                <div className="text-danger mt-1">{formik.errors.city}</div>
              )}
            </Form.Group>

            {/* State */}
            <Form.Group className="col-md-6">
              <Form.Label>State *</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.state && !!formik.errors.state}
              />
              {formik.touched.state && formik.errors.state && (
                <div className="text-danger mt-1">{formik.errors.state}</div>
              )}
            </Form.Group>

            {/* Address */}
            <Form.Group className="col-md-6">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.address && !!formik.errors.address}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-danger mt-1">{formik.errors.address}</div>
              )}
            </Form.Group>

            {/* Address Type */}
            <Form.Group className="col-md-12">
              <Form.Label>Address Type</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  name="type"
                  label="Home"
                  value="Home"
                  checked={formik.values.type === 'Home'}
                  onChange={formik.handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  name="type"
                  label="Work"
                  value="Work"
                  checked={formik.values.type === 'Work'}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.type && formik.errors.type && (
                <div className="text-danger mt-1">{formik.errors.type}</div>
              )}
            </Form.Group>

            {/* Submit Button */}
            <div className="text-end">
              <Button type="submit" className="btn btn-primary px-4 mt-3">
                Save and Deliver Here
              </Button>
            </div>
          </Form>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default AddressFormAccordion;
