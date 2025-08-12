import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <img 
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80" 
          alt="AI Research Lab"
          className="hero-image"
        />
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <h1>Buy & Sell Premium Source Code</h1>
          <p>Launch faster with production‑ready templates, full‑stack apps, AI agents, and micro‑SaaS starters. Clear licenses. Instant download.</p>
          <div className="hero-buttons">
            <a href="#products" className="btn-primary">Browse Catalog</a>
            <a href="#contact" className="btn-secondary">Become a Seller</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
