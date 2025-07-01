import React from 'react';
import './ProductCard.css';
import { useProductContext } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useProductContext();
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <img
        src={product.thumbnail}
        alt={product.title}
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: 'pointer' }}
      />

      <div className="product-details">
        <h3
          onClick={() => navigate(`/product/${product.id}`)}
          style={{ cursor: 'pointer' }}
        >
          {product.title}
        </h3>
        <p className="description">{product.description}</p>

        <div className="price-button-container">
          <p className="price">${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
