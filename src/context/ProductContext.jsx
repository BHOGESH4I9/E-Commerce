import { createContext, useContext, useEffect, useState } from 'react';

const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);

// Debounce helper
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryThumbnails, setCategoryThumbnails] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAddressAccordionKey, setActiveAddressAccordionKey] = useState('');

  // Cart and Address states
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  const [addresses, setAddresses] = useState(() => {
    const stored = localStorage.getItem('deliveryAddresses');
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(() => {
    const storedIndex = localStorage.getItem('selectedAddressIndex');
    return storedIndex ? Number(storedIndex) : 0;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('deliveryAddresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('selectedAddressIndex', selectedAddressIndex);
  }, [selectedAddressIndex]);

  // Search functionality
  const searchProducts = debounce(async (query) => {
    setSearchQuery(query);
    if (!query || query.trim() === '') {
      setSelectedCategory('All');
      setFilteredProducts(allProducts);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const lowerQuery = query.toLowerCase();
      const isCategory = categories
        .filter((cat) => cat !== 'All')
        .some((cat) => cat.toLowerCase() === lowerQuery);

      if (isCategory) {
        const res = await fetch(
          `https://dummyjson.com/products/category/${encodeURIComponent(query)}`
        );
        const data = await res.json();
        if (data.products) {
          setFilteredProducts(data.products);
          setSelectedCategory(query);
        } else {
          setFilteredProducts([]);
          setSelectedCategory('Search');
        }
      } else {
        const matched = allProducts.filter(
          (item) =>
            item.title?.toLowerCase().includes(lowerQuery) ||
            item.description?.toLowerCase().includes(lowerQuery) ||
            item.category?.toLowerCase().includes(lowerQuery)
        );
        setFilteredProducts(matched);
        setSelectedCategory('Search');
      }
    } catch (error) {
      console.error('Error searching products:', error);
      setFilteredProducts([]);
      setSelectedCategory('Search');
    } finally {
      setLoading(false);
    }
  }, 300);

  const getSearchSuggestions = (query) => {
    if (!query || query.trim() === '') return [];

    const lowerQuery = query.toLowerCase();
    const productSuggestions = allProducts
      .filter(
        (item) =>
          item.title?.toLowerCase().includes(lowerQuery) ||
          item.description?.toLowerCase().includes(lowerQuery) ||
          item.category?.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 3)
      .map((item) => ({ type: 'product', ...item }));

    const categorySuggestions = categories
      .filter((cat) => cat !== 'All' && cat.toLowerCase().includes(lowerQuery))
      .slice(0, 2)
      .map((cat) => ({
        type: 'category',
        name: cat,
        thumbnail: categoryThumbnails[cat] || '',
      }));

    return [...categorySuggestions, ...productSuggestions];
  };

  // Cart actions
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

  const removeFromCart = (productId) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty < 1) return;
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  // Address actions
  const addAddress = (newAddress) => {
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddressIndex(addresses.length);
  };

  const deleteAddress = (indexToDelete) => {
    const updated = addresses.filter((_, idx) => idx !== indexToDelete);
    setAddresses(updated);
    localStorage.setItem('deliveryAddresses', JSON.stringify(updated));
    if (selectedAddressIndex === indexToDelete) {
      setSelectedAddressIndex(null);
      localStorage.removeItem('selectedAddressIndex');
    } else if (selectedAddressIndex > indexToDelete) {
      const newIndex = selectedAddressIndex - 1;
      setSelectedAddressIndex(newIndex);
      localStorage.setItem('selectedAddressIndex', newIndex);
    }
  };

  // Product fetching
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://dummyjson.com/products?limit=0');
        const data = await res.json();
        if (data.products) {
          setAllProducts(data.products);
          setFilteredProducts(data.products);
        } else {
          throw new Error('Invalid product data');
        }
      } catch (error) {
        console.error('Error fetching all products:', error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // Categories fetching
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

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    if (category === 'All') {
      setFilteredProducts(allProducts);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
      );
      const data = await res.json();
      setFilteredProducts(data.products || []);
    } catch (error) {
      console.error(`Error fetching category "${category}":`, error);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch category thumbnails
  useEffect(() => {
    const fetchCategoryThumbnails = async () => {
      const thumbnails = {};
      for (const category of categories) {
        if (category === 'All') continue;
        try {
          const res = await fetch(
            `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=1`
          );
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

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const clearAddresses = () => {
    setAddresses([]);
    setSelectedAddressIndex(null);
    localStorage.removeItem('deliveryAddresses');
    localStorage.removeItem('selectedAddressIndex');
  };

  return (
    <ProductContext.Provider
      value={{
        // Products
        products: filteredProducts,
        allProducts,
        loading,
        categories,
        selectedCategory,
        handleCategoryClick,
        categoryThumbnails,

        // Search
        searchProducts,
        searchQuery,
        setSearchQuery,
        getSearchSuggestions,

        // Sidebar
        sidebarOpen,
        setSidebarOpen,

        // Cart
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,

        // Addresses
        addresses,
        addAddress,
        deleteAddress,
        selectedAddressIndex,
        setSelectedAddressIndex,
        clearAddresses,

        // Accordion UI state
        activeAddressAccordionKey,
        setActiveAddressAccordionKey,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
