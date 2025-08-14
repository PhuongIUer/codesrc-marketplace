import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/api'
import type { User }  from '../types/user'
import './Header.css'

const Header = () => {
  const { totalItems, toggleCart } = useCart()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken')
      if (token) {
        try {
          const response = await authApi.getProfile()
          setUser(response.data)
        } catch (error) {
          console.error('Failed to fetch user profile', error)
          localStorage.removeItem('authToken')
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('authToken')
      setUser(null)
      setShowDropdown(false)
      navigate('/login')
    }
  }

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo" onClick={() => navigate('source_code_selling/')}>CodeSource</h1>
        <nav className="nav">
          <a href="" onClick={(e) => { e.preventDefault(); navigate('source_code_selling/') }}>Home</a>
          <a href="#products">Catalog</a>
          <a href="#news">Updates</a>
          <a href="#team">Sellers</a>
          <a href="#contact">Contact</a>
          <button className="cart-icon" onClick={toggleCart}>
            🛒
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </nav>
        {!loading && (
          <div className="auth-section">
            {user ? (
              <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
               {user.avatar ? (
                  <img src={user.avatar} alt="User avatar" className="user-avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    {(user.userName && user.userName.charAt(0).toUpperCase()) || "A"}
                  </div>
                )}
                <span className="username">
                  {user.userName || "Anonymous"}
                </span>
                {showDropdown && (
                  <div className="profile-dropdown">
                    <button onClick={() => navigate('/profile')}>Profile</button>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
                <button className="signup-btn" onClick={() => navigate('/register')}>Sign Up</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header