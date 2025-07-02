// src/components/checkout/AddressListAccordion.js
import React from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import { useProductContext } from '../context/ProductContext';


const AddressListAccordion = () => {
  const {
    addresses,
    deleteAddress,
    selectedAddressIndex,
    setSelectedAddressIndex,
  } = useProductContext();

  const handleSelect = (index) => {
    setSelectedAddressIndex(index);
  };

  return (
    <>
      {addresses.map((addr, idx) => (
        <Accordion.Item eventKey={idx.toString()} key={idx}>
          <Accordion.Header>
            <Form.Check
              type="radio"
              name="selectedAddress"
              className="me-2"
              checked={selectedAddressIndex === idx}
              onChange={() => handleSelect(idx)}
            />
            <strong>{addr.name}</strong> ({addr.type}) - {addr.mobile}
          </Accordion.Header>
          <Accordion.Body>
            {selectedAddressIndex === idx && (
              <>
                <p className="mb-1">{addr.address}</p>
                <p className="mb-1">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <div className="d-flex gap-2 mt-2">
                  <Button variant="warning">Deliver Here</Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteAddress(idx)}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </>
  );
};

export default AddressListAccordion;
