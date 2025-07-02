import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    country: '',
    city: '',
    pincode: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log('Shipping Address:', formData);

    // Optionally store in localStorage or context
    localStorage.setItem('shippingAddress', JSON.stringify(formData));

    // Navigate to next step
    navigate('/checkout/summary'); // Change this route if needed
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Shipping Address</h3>
      <form onSubmit={handleNext}>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              className="form-control"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="form-control"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              className="form-control"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <textarea
              name="address"
              placeholder="Full Address"
              className="form-control"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <div className="text-end mt-4">
          <button type="submit" className="btn btn-primary px-4">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Address;
