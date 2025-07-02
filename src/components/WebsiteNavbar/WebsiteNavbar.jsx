import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, Form, FormControl, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaSearch, FaShoppingCart } from 'react-icons/fa';
import './WebsiteNavbar.css';
import { useProductContext } from '../../context/ProductContext';

const WebsiteNavbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { cartItems } = useProductContext();

  return (
    <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm px-5 py-3 w-100">
      <Navbar.Brand as={Link} to="/" className="fw-bold logo me-4">
        ShopEase
      </Navbar.Brand>

      {/* Search Bar */}
      <Form className="d-none d-md-flex flex-grow-1 me-4">
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search for products"
            className="search-input"
            id="searchProducts"
            name="searchProducts"
          />
          <InputGroup.Text className="search-icon">
            <FaSearch />
          </InputGroup.Text>
        </InputGroup>
      </Form>

      <Navbar.Toggle aria-controls="main-navbar" />
      <Navbar.Collapse id="main-navbar" className="justify-content-end">
        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/products">Shop</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          <Nav.Link as={Link} to="/cart" className="d-flex align-items-center gap-1 position-relative">
            <FaShoppingCart className="fs-5" />
            <span className="d-none d-sm-inline">Cart</span>
            {cartItems.length > 0 && (
              <span className="cart-count-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItems.length}
              </span>
            )}
          </Nav.Link>

          <Dropdown
            show={showProfile}
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
            className="ms-3 position-relative"
          >
            <Dropdown.Toggle
              variant="link"
              id="profile-dropdown"
              className="d-flex align-items-center text-dark text-decoration-none border-0"
              style={{ cursor: 'pointer' }}
            >
              <FaUserCircle className="me-1 fs-5 profile" />
              <span className="fw-medium profile">Profile</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="profile-dropdown text-center p-3">
              <h5 className="mb-1 fw-semibold text-dark">Hello User</h5>
              <p className="mb-3 text-muted" style={{ fontSize: '14px' }}>
                To access your ShopEase account
              </p>

              <Dropdown.Item
                as={Link}
                to="/register"
                className="mb-2 btn custom-btn w-100"
              >
                Sign Up
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default WebsiteNavbar;
