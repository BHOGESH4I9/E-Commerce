import React, { useRef, useEffect } from 'react';
import HeroBanner1 from '../../assets/hb-1.jpg';
import HeroBanner2 from '../../assets/hb-2.jpg';
import HeroBanner3 from '../../assets/hb-3.jpg';
import HeroBanner4 from '../../assets/hb-4.jpg';
import WomenShoes from '../../assets/handbag.jpg';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'bootstrap';
import { useProductContext } from '../../context/ProductContext';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductCard from '../../components/ProductCard/ProductCard';

const Home = () => {
  const {
    categories,
    categoryThumbnails,
    handleCategoryClick,
    allProducts,
    loading,
  } = useProductContext();

  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const scrollRef = useRef(null);

  const allowedCategories = [
    "beauty", "fragrances", "furniture", "groceries", "home-decoration",
    "kitchen-accessories", "laptops", "mens-shirts", "mens-shoes", "mens-watches",
    "mobile-accessories", "motorcycle", "skin-care", "smartphones", "sports-accessories",
    "sunglasses", "tablets", "tops", "vehicle", "womens-bags",
    "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches"
  ];

  useEffect(() => {
    if (carouselRef.current) {
      new Carousel(carouselRef.current);
    }
  }, []);

  const handleNavigate = (e, path) => {
    e.preventDefault();
    e.stopPropagation();
    const carousel = Carousel.getInstance(carouselRef.current);
    carousel?.pause();
    navigate(path);
  };

  const handleClick = (category) => {
    handleCategoryClick(category);
    navigate('/products');
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const getFirstProductImage = (category) =>
    categoryThumbnails[category] || 'https://via.placeholder.com/150';

  return (
    <div className="hero-wrapper">

      {/* Carousel */}
      <div
        ref={carouselRef}
        id="heroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={HeroBanner1} className="d-block w-100 hero-img" alt="Slide 1" />
            <div className="carousel-caption hero-content">
              <h1>Smart Shopping</h1>
              <p>Trusted by Millions</p>
              <button className="custom-btn mt-3" onClick={(e) => handleNavigate(e, '/products')}>
                Shop Now
              </button>
            </div>
          </div>

          <div className="carousel-item">
            <img src={HeroBanner2} className="d-block w-100 hero-img" alt="Slide 2" />
            <div className="carousel-caption hero-content">
              <h1>Latest Collections</h1>
              <p>Discover New Styles</p>
              <button className="custom-btn mt-3" onClick={(e) => handleNavigate(e, '/products')}>
                Explore
              </button>
            </div>
          </div>

          <div className="carousel-item">
            <img src={HeroBanner3} className="d-block w-100 hero-img" alt="Slide 3" />
            <div className="carousel-caption hero-content">
              <h1>Hot Deals</h1>
              <p>Save Big Today</p>
              <button className="custom-btn mt-3" onClick={(e) => handleNavigate(e, '/products')}>
                Grab Offer
              </button>
            </div>
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Category Carousel */}
      <div className="category-carousel-section container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4 px-2">
          <h3 className="fw-bold">Original Brands <span className="text-primary ms-1">✔</span></h3>
          <button className="btn btn-link text-decoration-none fw-semibold text-purple" onClick={() => navigate('/products')}>
            VIEW ALL &rsaquo;
          </button>
        </div>

        <div className="position-relative">
          <button className="carousel-arrow left" onClick={scrollLeft}><FaChevronLeft /></button>
          <div className="category-carousel d-flex gap-4" ref={scrollRef}>
            {categories.filter(cat => allowedCategories.includes(cat)).map((cat, index) => (
              <div key={index} className="category-card text-center shadow-sm" onClick={() => handleClick(cat)}>
                <img src={getFirstProductImage(cat)} alt={cat} className="img-fluid category-img" />
                <div className="category-name text-white py-2 fw-semibold">
                  {cat.replace(/-/g, ' ')}
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-arrow right" onClick={scrollRight}><FaChevronRight /></button>
        </div>
      </div>

      {/* Extra Banner */}
      <div className="extra-banner-wrapper my-4">
        <img src={HeroBanner4} alt="Extra Banner" className="w-100 hero-img" />
      </div>

      {/* New Collection Section */}
      <div className="featured-section my-5 d-flex flex-column flex-md-row align-items-center gap-4">
        <div className="featured-image flex-shrink-0">
          <img src={WomenShoes} alt="Women's Shoes" className="img-fluid rounded shadow" />
        </div>
        <div className="featured-content text-md-start text-center">
          <h4 className="text-uppercase text-secondary mb-2">New Collection</h4>
          <h3 className="fw-bold mb-3">Women's Stylish Shoes</h3>
          <p className="mb-4">
            Hand-picked heels for every occasion. Match your confidence with elegance. Step into style!
          </p>
          <button
            className="btn btn-dark px-4 py-2"
            onClick={() => {
              handleCategoryClick('womens-shoes');
              navigate('/products');
            }}
          >
            Explore
          </button>
        </div>
      </div>

      {/* All Products Section */}
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Our Top Picks</h3>
          <button className="btn btn-dark explore" onClick={() => navigate('/products')}>
            Explore More
          </button>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="row">
            {allProducts.slice(0, 12).map(product => (
              <div className="col-md-4 col-lg-3 mb-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
