// Layout.jsx
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Cart from './Cart'

const Layout = ({ children }) => {
  return (
    <div className="App">
      <Header />
      <main>{children}</main>
      <Footer />
      <Cart />
    </div>
  )
}

export default Layout