import React, { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import './Products.css'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    // Simulate loading products
    setTimeout(() => {
      setProducts([
        {
          id: 101,
          title: "AI Chatbot (Next.js + OpenAI)",
          description: "Production-ready chatbot with streaming responses, auth, and usage quotas.",
          category: "AI",
          price: 129,
          license: "Single Project License",
          keyFeatures: [
            "Next.js 14 App Router, server actions",
            "OpenAI + fallback provider wrapper",
            "Clerk auth, Stripe payments, protected routes",
            "Vercel deploy-ready with env checks"
          ],
          videoDemo: "https://www.w3schools.com/html/mov_bbb.mp4",
          techSpecs: {
            Framework: "Next.js 14, React 18",
            Language: "TypeScript",
            Payments: "Stripe",
            Hosting: "Vercel"
          }
        },
        {
          id: 102,
          title: "E‑commerce Starter (React + Node)",
          description: "Full-stack shop with cart, checkout, and admin dashboard.",
          category: "Web",
          price: 99,
          license: "Single Project License",
          keyFeatures: [
            "React + Express + MongoDB",
            "JWT auth, role-based admin",
            "Stripe checkout + webhooks",
            "Responsive UI with Tailwind"
          ],
          videoDemo: "https://www.w3schools.com/html/mov_bbb.mp4",
          techSpecs: {
            Frontend: "React 18",
            Backend: "Express.js",
            Database: "MongoDB",
            Styling: "TailwindCSS"
          }
        },
        {
          id: 103,
          title: "Mobile News App (Flutter)",
          description: "Clean Flutter app with offline caching and theming.",
          category: "Mobile",
          price: 79,
          license: "Single Project License",
          keyFeatures: [
            "Riverpod state management",
            "API service with retry + cache",
            "Dark mode, localization",
            "Unit + widget tests included"
          ],
          videoDemo: "https://www.w3schools.com/html/mov_bbb.mp4",
          techSpecs: {
            SDK: "Flutter 3.x",
            Language: "Dart",
            Testing: "flutter_test",
            CI: "GitHub Actions"
          }
        }
      ])
      setLoading(false)
    }, 1200)
  }, [])

  const openProductModal = (product) => {
    setSelectedProduct(product)
  }

  const closeProductModal = () => {
    setSelectedProduct(null)
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    // Optional: show confirmation
    alert(`${product.title} added to cart!`)
  }

  return (
    <section id="products" className="products">
      <div className="container">
  <h2>Featured Source Code</h2>
  {/* <p className="section-subtitle">Launch faster with premium codebases</p> */}
        
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-category">{product.category}</div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                {product.price !== undefined && (
                  <div className="product-price">${product.price}</div>
                )}
                <div className="product-actions">
                  <button 
                    className="demo-btn"
                    onClick={() => openProductModal(product)}
                  >
                    View Details
                  </button>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Modal */}
        {selectedProduct && (
          <div className="modal-overlay" onClick={closeProductModal}>
            <div className="product-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeProductModal}>×</button>
              
              <div className="modal-header">
                <div className="product-category">{selectedProduct.category}</div>
                <h2>{selectedProduct.title}</h2>
                <p>{selectedProduct.description}</p>
              </div>

              <div className="modal-content">
                {/* Video Demo Section */}
                <div className="demo-section">
                  <h3>Video Demo</h3>
                  <div className="video-container">
                    <video 
                      controls 
                      poster="/api/placeholder/600/400"
                      className="demo-video"
                    >
                      <source src={selectedProduct.videoDemo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                {/* Key Features Section */}
                <div className="features-section">
                  <h3>Key Features</h3>
                  <ul className="features-list">
                    {selectedProduct.keyFeatures.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <span className="feature-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Specifications */}
                <div className="specs-section">
                  <h3>Technical Specifications</h3>
                  <div className="specs-grid">
                    {Object.entries(selectedProduct.techSpecs).map(([key, value]) => (
                      <div key={key} className="spec-item">
                        <span className="spec-label">{key}:</span>
                        <span className="spec-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-actions">
                  {selectedProduct.license && (
                    <div className="license-note">License: {selectedProduct.license}</div>
                  )}
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(selectedProduct)}
                  >
                    Add to Cart - ${selectedProduct.price}
                  </button>
                  <button className="contact-btn" onClick={() => window.location.hash = '#contact'}>
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Products
