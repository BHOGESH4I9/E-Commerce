import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import Carousel from 'react-bootstrap/Carousel';
import './ProductView.css';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, allProducts } = useProductContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setQuantity(1); // Reset quantity on change
        window.scrollTo(0, 0); // Scroll to top on navigation
      } catch (err) {
        console.error('Failed to fetch product details:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const similarProducts = allProducts.filter(
    (p) => p.category === product?.category && p.id !== product.id
  );

  if (!product) {
    return <div className="text-center mt-5">Loading product details...</div>;
  }

  return (
    <div className="container my-5 product-view-container fade-in">
      <div className="row g-5">
        <div className="col-md-6">
          <Carousel fade interval={3000}>
            {[product.thumbnail, ...product.images].map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={img}
                  alt={`${product.title}-${index}`}
                  className="img-fluid object-fit-contain rounded shadow w-100"
                  style={{ height: '400px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <div className="col-md-6 product-details">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-primary">${product.price}</h4>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Rating:</strong> ⭐ {product.rating}</p>

          <div className="d-flex align-items-center mt-3 gap-3">
            <strong>Quantity:</strong>
            <div className="btn-group quantity-controls">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              >
                -
              </button>
              <span className="btn border-black btn-light">{quantity}</span>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button className="btn btn-primary p-1 w-25 mt-4" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Similar Products */}
      <div className="similar-section mt-5">
        <h4 className="mb-3">Similar Products</h4>

        {similarProducts.length > 0 ? (
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4">
            {similarProducts.slice(0, 8).map((prod) => (
                <div key={prod.id} className="col">
                <div
                    className="card h-100 shadow-sm hover-shadow"
                    onClick={() => navigate(`/product/${prod.id}`)}
                    style={{ cursor: 'pointer' }}
                >
                    <img
                    src={prod.thumbnail}
                    alt={prod.title}
                    className="card-img-top"
                    style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                    <h6 className="card-title mb-1">{prod.title}</h6>
                    <p className="text-muted small">${prod.price}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <p className="text-muted">No similar products available in this category.</p>
        )}
        </div>

    </div>
  );
};

export default ProductView;
