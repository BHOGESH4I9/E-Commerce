import React from 'react';
import DeliveryAddressSection from '../../components/DeliveryAddressSection';
import OrderSummaryAccordion from '../../components/OrderSummaryAccordion';



const AddressPage = () => {
  return (
    <div className="container">
      <h3 className="fw-bold mb-4">Checkout</h3>
      <DeliveryAddressSection />
      <OrderSummaryAccordion />
    </div>
  );
};

export default AddressPage;
