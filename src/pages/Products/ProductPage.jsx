import React, { useEffect } from 'react';
import { useProductContext } from '../../context/ProductContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import Categories from '../../components/Categories/Categories';
import { useSearchParams } from 'react-router-dom';

const ProductPage = () => {
  const { products, loading, selectedCategory, searchProducts, searchQuery } = useProductContext();
  const [searchParams] = useSearchParams();

  // Handle search query from URL
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
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-2 mb-4 position-relative">
          <Categories />
        </div>
        <div className="col-md-8">
          <h2 className="mb-4">
            {selectedCategory === 'All'
              ? 'All Products'
              : selectedCategory === 'Search'
              ? `Search Results for "${searchQuery || '...'}"`
              : `Category: ${selectedCategory}`}
          </h2>

          <div className="row">
            {products.length > 0 ? (
              products.map((product) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
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
        </div>
      </div>
    </div>
  );
};

export default ProductPage;