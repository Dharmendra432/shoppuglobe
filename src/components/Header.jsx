import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch } from '../redux/productSlice';

export default function Header() {
  const cart = useSelector(state => state.cart);
  const search = useSelector(state => state.products.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(search);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchInput(value);
    dispatch(setSearch(value));
  }, [dispatch]);

  const clearSearch = useCallback(() => {
    setSearchInput('');
    dispatch(setSearch(''));
  }, [dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="header-logo">
          🛍️ ShoppyGlobe
        </Link>
        
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchInput}
            onChange={handleSearch}
            aria-label="Search products"
          />
          {searchInput && (
            <button 
              type="button" 
              className="search-clear" 
              onClick={clearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </form>

        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link cart-link">
            🛒 Cart <span className="cart-badge">{itemCount}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

