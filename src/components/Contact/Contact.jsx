import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  return (
    <footer className="footer-section">
      <div className="container py-5">
        <div className="row">

          {/* Brand */}
          <div className="col-md-4 mb-4">
            <h4 className="footer-logo">ShopEase</h4>
            <p>Your one-stop shop for fashion, gadgets, and more!</p>
            <div className="social-icons mt-3">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>

          {/* Links */}
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5>Contact Us</h5>
            <p>Email: support@shopease.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: Bengaluru, India</p>
          </div>
        </div>

        <hr />
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;