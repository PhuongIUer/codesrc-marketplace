import React from 'react'
import { useCart } from '../context/CartContext'
import './Header.css'

const Header = () => {
  const { totalItems, toggleCart } = useCart()
  
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">CodeSource</h1>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#products">Catalog</a>
          <a href="#news">Updates</a>
          <a href="#team">Sellers</a>
          <a href="#contact">Contact</a>
          <button className="cart-icon" onClick={toggleCart}>
            🛒
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
