import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-section bg-light border-top">
      
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Welcome to <span className="text">ShopEase</span></h2>
          <p className="text-muted">Your one-stop destination for fashion, gadgets, home decor, and more — all at unbeatable prices!</p>
        </div>

       
        <div className="row mb-5">
          <h3 className="fw-semibold text-center mb-4">Why Choose Us?</h3>
          {[
            { title: 'Wide Range', desc: 'From clothing to electronics – everything under one roof!' },
            { title: 'Affordable Prices', desc: 'Top quality, lowest prices guaranteed.' },
            { title: 'Fast Delivery', desc: 'Quick delivery across India with live tracking.' },
            { title: 'Secure Payments', desc: '100% encrypted and verified payment gateways.' },
          ].map((item, i) => (
            <div className="col-md-6 col-lg-3 mb-4" key={i}>
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-muted">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="row g-4 mb-5">
          <div className="col-lg-6">
            <h4 className="mb-3">Reach Us</h4>
            <p><strong>Email:</strong> support@shopease.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Location:</strong> Bengaluru, India</p>
            <iframe
              title="ShopEase Location"
              src="https://www.google.com/maps?q=Bengaluru&output=embed"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          
          <div className="col-lg-6">
            <h4 className="mb-3">Have a Question?</h4>
            <form className="bg-white p-4 shadow-sm rounded">
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Your Name" required />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Your Email" required />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label fw-semibold">Message</label>
                <textarea className="form-control" id="message" rows="4" placeholder="Your question or feedback..." required></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100 fw-bold">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      
      <footer className="bg-dark text-white pt-4">
        <div className="container">
          <div className="row text-center text-md-start">
            
            <div className="col-md-4 mb-4">
              <h4 className="fw-bold">ShopEase</h4>
              <p>Your one-stop shop for fashion, gadgets, and more!</p>
              <div className="d-flex gap-3 justify-content-center justify-content-md-start mt-3">
                <a href="#" className="text-white fs-5"><FaFacebook /></a>
                <a href="#" className="text-white fs-5"><FaTwitter /></a>
                <a href="#" className="text-white fs-5"><FaInstagram /></a>
                <a href="#" className="text-white fs-5"><FaLinkedin /></a>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <h5 className="fw-semibold">Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="/" className="text-white text-decoration-none">Home</a></li>
                <li><a href="/products" className="text-white text-decoration-none">Products</a></li>
                <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
                <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
              </ul>
            </div>

            
            <div className="col-md-4 mb-4">
              <h5 className="fw-semibold">Support</h5>
              <p className="mb-1">Email: support@shopease.com</p>
              <p className="mb-1">Phone: +91 98765 43210</p>
              <p>Location: Bengaluru, India</p>
            </div>
          </div>

          <hr className="border-light" />
          <div className="text-center pb-3">
            &copy; {new Date().getFullYear()} <strong>ShopEase</strong>. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
