import React, { useEffect } from 'react';
import { useProductContext } from '../../context/ProductContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import Categories from '../../components/Categories/Categories';
import { useSearchParams } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
  const {
    products,
    loading,
    selectedCategory,
    searchProducts,
    searchQuery,
  } = useProductContext();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('search');
    if (query && query !== searchQuery) {
      searchProducts(query);
    } else if (!query && selectedCategory === 'Search') {
      searchProducts('');
    }
  }, [searchParams, searchProducts, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '200px' }}>
        <div className="dotted-spinner">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page-wrapper mt-5">
      {/* Sidebar */}
      <aside className="product-sidebar">
        <Categories />
      </aside>

      {/* Product Grid */}
      <main className="product-grid">
        <h2 className="mb-4">
          {selectedCategory === 'All'
            ? 'All Products'
            : selectedCategory === 'Search'
            ? `Search Results for "${searchQuery || '...'}"`
            : `Category: ${selectedCategory}`}
        </h2>

        <div className="product-grid-container">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="product-grid-item" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="text-center">
              {selectedCategory === 'Search'
                ? `No results found for "${searchQuery || ''}". Try a different search term or category.`
                : selectedCategory === 'All'
                ? 'No products available.'
                : `No products found in category "${selectedCategory}".`}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
