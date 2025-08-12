import React from 'react'
import { useCart } from '../context/CartContext'
import './Cart.css'

const Cart = () => {
  const { 
    items, 
    isOpen, 
    totalItems, 
    totalPrice, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    toggleCart 
  } = useCart()

  if (!isOpen) return null

  const handleCheckout = () => {
    if (items.length === 0) return
    
    // Simple checkout simulation
    alert(`Checkout complete! Total: $${totalPrice.toFixed(2)}\n\nIn a real implementation, this would integrate with Stripe or another payment processor.`)
    clearCart()
  }

  return (
    <>
      <div className="cart-overlay" onClick={toggleCart}></div>
      <div className="cart-sidebar">
        <div className="cart-header">
          <h3>Shopping Cart ({totalItems})</h3>
          <button className="cart-close" onClick={toggleCart}>×</button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty</p>
              <button className="continue-shopping" onClick={toggleCart}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.title}</h4>
                      <p className="cart-item-category">{item.category}</p>
                      <p className="cart-item-license">{item.license}</p>
                    </div>
                    
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          +
                        </button>
                      </div>
                      
                      <div className="cart-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      
                      <button 
                        className="remove-item"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <strong>Total: ${totalPrice.toFixed(2)}</strong>
                </div>
                
                <div className="cart-actions">
                  <button className="clear-cart" onClick={clearCart}>
                    Clear Cart
                  </button>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart
