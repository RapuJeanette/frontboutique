import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import { CartContext } from './CartContext';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';

function Navbar() {
  const { cartCount, searchProducts } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    searchProducts(searchQuery);
    navigate('/search');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>
          <Link to="/" className="brand-link">Boutique</Link>
        </h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/products">Productos</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/accessories">Accesorios</Link>
        </li>
       
      </ul>
      <div className="navbar-right">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
        <div className="navbar-icons">
          <Link to="/login" className="navbar-icon">
            <FaUser />
          </Link>
          <Link to="/cart" className="navbar-icon">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
