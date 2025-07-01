import { createContext, useContext, useEffect, useState } from 'react';

const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryThumbnails, setCategoryThumbnails] = useState({});

  // ✅ Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add to Cart with quantity logic
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // ✅ Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // ✅ Optional: Change quantity manually
  const updateQuantity = (productId, qty) => {
    if (qty < 1) return;
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  // Fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        setAllProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Error fetching all products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/category-list');
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(['All', ...data]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(allProducts);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/products/category/${encodeURIComponent(category)}`);
      const data = await res.json();
      setFilteredProducts(data.products);
    } catch (error) {
      console.error(`Error fetching category "${category}":`, error);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch thumbnails for categories
  useEffect(() => {
    const fetchCategoryThumbnails = async () => {
      const thumbnails = {};
      for (const category of categories) {
        if (category === 'All') continue;
        try {
          const res = await fetch(`https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=1`);
          const data = await res.json();
          if (data.products?.[0]) {
            thumbnails[category] = data.products[0].thumbnail;
          }
        } catch (err) {
          console.error(`Thumbnail fetch failed for ${category}`, err);
        }
      }
      setCategoryThumbnails(thumbnails);
    };

    if (categories.length > 0) {
      fetchCategoryThumbnails();
    }
  }, [categories]);

  return (
    <ProductContext.Provider
      value={{
        // Product Data
        products: filteredProducts,
        loading,
        allProducts,
        categories,
        sidebarOpen,
        setSidebarOpen,
        handleCategoryClick,
        selectedCategory,
        categoryThumbnails,

        // Cart
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
