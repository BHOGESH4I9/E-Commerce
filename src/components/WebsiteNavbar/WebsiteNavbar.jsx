import React, { useState, useEffect, useRef } from 'react';
import {
  Navbar,
  Nav,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaUserCircle, FaSearch, FaShoppingCart } from 'react-icons/fa';
import './WebsiteNavbar.css';
import { useProductContext } from '../../context/ProductContext';

const WebsiteNavbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [expanded, setExpanded] = useState(false); // For toggling
  const { cartItems, searchProducts, getSearchSuggestions, setSearchQuery } = useProductContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchRef = useRef(null);

  useEffect(() => {
    const query = searchParams.get('search');
    if (query && query !== searchText) {
      setSearchText(decodeURIComponent(query));
      searchProducts(query);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() !== '') {
      searchProducts(searchText.trim());
      navigate(`/products?search=${encodeURIComponent(searchText.trim())}`);
      setShowSuggestions(false);
      setExpanded(false); // Close navbar
    } else {
      setSearchQuery('');
      searchProducts('');
      navigate('/products');
      setShowSuggestions(false);
      setExpanded(false); // Close navbar
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
    setSearchQuery('');
    searchProducts('');
    navigate('/products');
    setShowSuggestions(false);
    setExpanded(false);
  };

  const handleNavClick = () => {
    setExpanded(false); // close the menu
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setShowSuggestions(value.trim() !== '');
  };

  const handleSuggestionClick = (suggestion) => {
    const query = suggestion.type === 'category' ? suggestion.name : suggestion.title;
    setSearchText(query);
    searchProducts(query);
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setShowSuggestions(false);
    setExpanded(false);
  };

  const suggestions = getSearchSuggestions(searchText);

  return (
    <Navbar
      bg="light"
      expand="lg"
      fixed="top"
      className="shadow-sm px-5 py-3 w-100"
      expanded={expanded}
    >
      <Navbar.Brand as={Link} to="/" className="fw-bold logo me-4" onClick={handleNavClick}>
        ShopEase
      </Navbar.Brand>

      <div ref={searchRef} className="position-relative">
        <Form onSubmit={handleSearch} className="d-none d-md-flex flex-grow-1 me-4">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for products or categories"
              className="search-input"
              value={searchText}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(searchText.trim() !== '')}
            />
            {searchText && (
              <InputGroup.Text
                onClick={handleClearSearch}
                style={{ cursor: 'pointer', background: '#eee' }}
              >
                ×
              </InputGroup.Text>
            )}
            <InputGroup.Text
              className="search-icon"
              onClick={handleSearch}
              style={{ cursor: 'pointer' }}
            >
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </Form>

        {showSuggestions && suggestions.length > 0 && (
          <div
            className="position-absolute w-100 bg-white border rounded shadow-sm"
            style={{
              zIndex: 1000,
              maxWidth: '400px',
              top: '100%',
              left: 0,
            }}
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={`${suggestion.type}-${suggestion.id || suggestion.name}-${index}`}
                className="p-2 hover-bg-light cursor-pointer"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="d-flex align-items-center">
                  {suggestion.thumbnail && (
                    <img
                      src={suggestion.thumbnail}
                      alt={suggestion.title || suggestion.name}
                      style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }}
                    />
                  )}
                  <div>
                    {suggestion.type === 'category' ? (
                      <div className="fw-medium">Category: {suggestion.name}</div>
                    ) : (
                      <>
                        <div className="fw-medium">{suggestion.title}</div>
                        <small className="text-muted">{suggestion.category}</small>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Navbar.Toggle
        aria-controls="main-navbar"
        onClick={() => setExpanded(!expanded)}
      />
      <Navbar.Collapse id="main-navbar" className="justify-content-end">
        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/products" onClick={handleNavClick}>Shop</Nav.Link>
          <Nav.Link as={Link} to="/contact" onClick={handleNavClick}>Contact</Nav.Link>
          <Nav.Link
            as={Link}
            to="/cart"
            className="d-flex align-items-center gap-1 position-relative"
            onClick={handleNavClick}
          >
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
                to="/auth"
                className="mb-2 btn custom-btn w-100"
                onClick={handleNavClick}
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
