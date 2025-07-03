import React, { useEffect, useState } from 'react';
import { useProductContext } from '../../context/ProductContext';
import { FaThList } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
  const {
    categories,
    sidebarOpen,
    setSidebarOpen,
    handleCategoryClick,
    selectedCategory,
  } = useProductContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //Now supports both mobile and tablet
    const handleResize = () => setIsMobileView(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    handleResize(); // initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const filtered = categories.filter(cat =>
      cat.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleClick = (category) => {
    handleCategoryClick(category);
    if (location.pathname !== '/products') navigate('/products');
    if (isMobileView) setSidebarOpen(false); 
  };

  return (
    <div className="categories-container">
      {/* Show toggle on tablet + mobile */}
      {isMobileView && (
        <button
          className={`toggle-icon ${sidebarOpen ? 'active' : ''}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span className="icon-wrapper"><FaThList size={20} /></span>
          Categories
        </button>
      )}

      {/* Sidebar only visible when toggle is active or not mobile */}
      {(sidebarOpen || !isMobileView) && (
        <div className="sidebar">
          <h3 className="sidebar-title">Categories</h3>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {filteredCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleClick(category)}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
