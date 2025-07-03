// src/components/checkout/DeliveryAddressSection.js
import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import AddressListAccordion from './AddressListAccordion';
import AddressFormAccordion from './AddressFormAccordion';

const DeliveryAddressSection = () => {
  const [activeKey, setActiveKey] = useState('');

  return (
    <div className="container my-4">
      <h4 className="mb-4 fw-bold">1. Delivery Address</h4>
      <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)} alwaysOpen>
        <AddressListAccordion activeKey={activeKey} setActiveKey={setActiveKey} />
        <AddressFormAccordion activeKey={activeKey} setActiveKey={setActiveKey} />
      </Accordion>
    </div>
  );
};

export default DeliveryAddressSection;
