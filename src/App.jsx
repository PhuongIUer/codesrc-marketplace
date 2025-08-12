import React from 'react'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Products from './components/Products'
import News from './components/News'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cart from './components/Cart'
import './App.css'

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <main>
          <Hero />
          <Products />
          <News />
          <Team />
          <Contact />
        </main>
        <Footer />
        <Cart />
      </div>
    </CartProvider>
  )
}

export default App
