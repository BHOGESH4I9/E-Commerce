import React from 'react';
import { useProductContext } from '../../context/ProductContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import Categories from '../../components/Categories/Categories';

const ProductPage = () => {
  const { products, loading, selectedCategory } = useProductContext();

  if (loading) {
  return (

    <div className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: '200px' }}>
         {/*Loading*/}
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
        {/* Sidebar */}
        <div className="col-md-2 mb-4 position-relative">
          <Categories />
        </div>

        {/* Products Grid */}
        <div className="col-md-8">
          <h2 className="mb-4">
            {selectedCategory === 'All' ? 'All Products' : `Category: ${selectedCategory}`}
          </h2>

          <div className="row">
            {products.length > 0 ? (
              products.map(product => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="text-center">No products found for this category.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
