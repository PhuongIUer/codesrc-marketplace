import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <p>&copy; 2025 CodeSource. All rights reserved.</p>
            <p>Contact us at <a href="mailto:support@codemarket.dev">support@codemarket.dev</a></p>
          </div>
          
          <div className="footer-links">
            <h4>Additional Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#products">Catalog</a></li>
              <li><a href="#news">Updates</a></li>
              <li><a href="#team">Sellers</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
