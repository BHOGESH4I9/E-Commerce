// src/components/checkout/AddressFormAccordion.js
import React, { useState } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import { useProductContext } from '../context/ProductContext';


const AddressFormAccordion = () => {
  const { addAddress } = useProductContext();
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    type: 'Home',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    addAddress(formData);
    setShowForm(false);
    setFormData({
      name: '',
      mobile: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      type: 'Home',
    });
  };

  return (
    <Accordion.Item eventKey="add">
      <Accordion.Header onClick={() => setShowForm(!showForm)}>
        + Add a new address
      </Accordion.Header>
      <Accordion.Body>
        {showForm && (
          <Form onSubmit={handleAddAddress} className="row g-3">
            <Form.Group className="col-md-6">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="col-md-6">
              <Form.Label>Mobile *</Form.Label>
              <Form.Control
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="col-md-6">
              <Form.Label>Pincode *</Form.Label>
              <Form.Control
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="col-md-6">
              <Form.Label>City *</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="col-md-6">
              <Form.Label>State *</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="col-md-6">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="col-md-12">
              <Form.Label>Address Type</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  name="type"
                  label="Home"
                  value="Home"
                  checked={formData.type === 'Home'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  name="type"
                  label="Work"
                  value="Work"
                  checked={formData.type === 'Work'}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

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
