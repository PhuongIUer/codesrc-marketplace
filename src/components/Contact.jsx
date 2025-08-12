import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Contact Sales & Support</h2>
        <p className="contact-description">
          Questions about licenses, invoices, or a custom quote? We're here to help.
        </p>
        
        <div className="contact-info">
          <div className="contact-item">
            <h3>Email</h3>
            <a href="mailto:support@codemarket.dev">support@codemarket.dev</a>
          </div>
          
          <div className="contact-item">
            <h3>Categories</h3>
            <ul>
              <li>AI & Agents</li>
              <li>Web Starters</li>
              <li>Mobile Apps</li>
              <li>Dev Tools</li>
            </ul>
          </div>
          
          <div className="contact-item">
            <h3>Billing & Invoices</h3>
            <p>We provide VAT invoices and support company billing. For team or extended licenses, contact sales for a quote.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
