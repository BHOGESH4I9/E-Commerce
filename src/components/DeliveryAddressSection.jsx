// src/components/checkout/DeliveryAddressSection.js
import React from 'react';
import { Accordion } from 'react-bootstrap';
import AddressListAccordion from './AddressListAccordion';
import AddressFormAccordion from './AddressFormAccordion';


const DeliveryAddressSection = () => {
  return (
    <div className="container my-4">
      <h4 className="mb-4 fw-bold">1. Delivery Address</h4>
      <Accordion alwaysOpen>
        <AddressListAccordion />
        <AddressFormAccordion />
      </Accordion>
    </div>
  );
};

export default DeliveryAddressSection;
