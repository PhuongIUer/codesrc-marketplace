// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Home from './components/Home'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Login from './screens/login/LoginScreen'
import Register from './screens/login/RegisterScreen'
import Profile from './screens/user/ProfileScreen'
import './App.css'

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="source_code_selling" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
          <Cart />
        </div>
      </CartProvider>
    </Router>
  )
}

export default App