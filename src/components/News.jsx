import React, { useState, useEffect } from 'react'
import './News.css'

const News = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    // Simulate loading news articles
    setTimeout(() => {
      setNews([
        {
          id: 1,
          title: "New: AI Chatbot Starter ships with Stripe + Clerk",
          date: "August 12, 2025",
          summary: "Our best‑selling AI Chatbot now includes subscriptions, rate limits, and multi‑provider failover.",
          category: "Update",
          author: "Code Market Team",
          readTime: "3 min read",
          fullContent: `
            <p>We've shipped a major update to the AI Chatbot Starter. It now supports Stripe subscriptions out of the box, multi‑provider LLM failover, and granular rate limits per plan.</p>
            <ul>
              <li>New billing plans (Free, Pro, Team)</li>
              <li>Usage metering and webhook retries</li>
              <li>Improved streaming UX and error handling</li>
            </ul>
            <p>Existing buyers get the update for free in their downloads.</p>
          `,
          image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop"
        },
        {
          id: 2,
          title: "Guide: Choosing the right license for your project",
          date: "August 8, 2025",
          summary: "Single vs. extended license, and when you need a team license.",
          category: "Guide",
          author: "Marketplace Editorial",
          readTime: "5 min read",
          fullContent: `
            <p>Not sure which license to pick? Here's a quick primer:</p>
            <ol>
              <li><strong>Single Project:</strong> Use in one commercial or personal project.</li>
              <li><strong>Extended:</strong> Use in multiple client projects. No redistribution.</li>
              <li><strong>Team:</strong> Transfer rights to your organization with up to 10 seats.</li>
            </ol>
            <p>When in doubt, contact us and we'll help you choose.</p>
          `
        }
      ])
      setLoading(false)
    }, 800)
  }, [])

  const getCategoryColor = (category) => {
    const colors = {
      'Update': '#007bff',
      'Guide': '#28a745',
      'Release': '#17a2b8',
      'Promotion': '#ffc107'
    }
    return colors[category] || '#6c757d'
  }

  const openArticle = (article) => {
    setSelectedArticle(article)
  }

  const closeArticle = () => {
    setSelectedArticle(null)
  }

  const shareArticle = async (article) => {
    const shareData = {
      title: article.title,
      text: article.summary,
      url: `${window.location.origin}${window.location.pathname}#news-${article.id}`
    }

    try {
      // Check if Web Share API is available (mobile devices)
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Show share modal with multiple options
        setShowShareModal(true)
      }
    } catch (error) {
      // Fallback: show share modal
      setShowShareModal(true)
    }
  }

  const copyToClipboard = async (article) => {
    const shareText = `${article.title}\n\n${article.summary}\n\nRead more: ${window.location.origin}${window.location.pathname}#news-${article.id}`
    
    try {
      await navigator.clipboard.writeText(shareText)
      showShareNotification('Article link copied to clipboard!')
      setShowShareModal(false)
    } catch (error) {
      showShareNotification('Failed to copy to clipboard')
    }
  }

  const shareOnSocialMedia = (platform, article) => {
    const url = `${window.location.origin}${window.location.pathname}#news-${article.id}`
    const text = `${article.title} - ${article.summary}`
    
    let shareUrl = ''
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'email':
        const subject = encodeURIComponent(article.title)
        const body = encodeURIComponent(`${article.summary}\n\nRead the full article: ${url}`)
        shareUrl = `mailto:?subject=${subject}&body=${body}`
        break
      default:
        return
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400')
    setShowShareModal(false)
  }

  const showShareNotification = (message) => {
    // Create and show a temporary notification
    const notification = document.createElement('div')
    notification.className = 'share-notification'
    notification.textContent = message
    document.body.appendChild(notification)
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 3000)
  }

  const contactAuthor = (article) => {
    const subject = encodeURIComponent(`Inquiry about: ${article.title}`)
    const body = encodeURIComponent(
      `Hello ${article.author},\n\nI read your article "${article.title}" and would like to get in touch.\n\nBest regards`
    )
    
    // Use the lab's contact email or a general inquiry email
    const email = 'ly.nguyen@eiu.edu.vn'
    window.open(`mailto:${email}?subject=${subject}&body=${body}`)
  }

  return (
    <section id="news" className="news">
      <div className="container">
  <h2>Marketplace Updates</h2>
  {/* <p className="section-subtitle">New releases, changelogs, and buying guides</p> */}
        
        {loading ? (
          <div className="loading">Loading latest news...</div>
        ) : (
          <div className="news-grid">
            {news.map(article => (
              <article key={article.id} className="news-card">
                <div 
                  className="news-category" 
                  style={{ backgroundColor: getCategoryColor(article.category) }}
                >
                  {article.category}
                </div>
                <h3>{article.title}</h3>
                <div className="news-meta">
                  <span className="news-date">{article.date}</span>
                  <span className="news-author">By {article.author}</span>
                </div>
                <p className="news-summary">{article.summary}</p>
                <div className="news-footer">
                  <span className="read-time">{article.readTime}</span>
                  <button 
                    className="read-more-btn"
                    onClick={() => openArticle(article)}
                  >
                    Read More
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Article Modal */}
        {selectedArticle && (
          <div className="modal-overlay" onClick={closeArticle}>
            <div className="article-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closeArticle}>×</button>
              
              <div className="modal-header">
                <div 
                  className="article-category"
                  style={{ backgroundColor: getCategoryColor(selectedArticle.category) }}
                >
                  {selectedArticle.category}
                </div>
                <h1>{selectedArticle.title}</h1>
                <div className="article-meta">
                  <div className="meta-row">
                    <span className="article-date">{selectedArticle.date}</span>
                    <span className="article-author">By {selectedArticle.author}</span>
                  </div>
                  <span className="article-read-time">{selectedArticle.readTime}</span>
                </div>
              </div>

              {selectedArticle.image && (
                <div className="article-image">
                  <img src={selectedArticle.image} alt={selectedArticle.title} />
                </div>
              )}

              <div className="article-content">
                <div 
                  className="article-text"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.fullContent }}
                />
              </div>

              <div className="modal-actions">
                <button 
                  className="share-btn"
                  onClick={() => shareArticle(selectedArticle)}
                >
                  Share Article
                </button>
                <button 
                  className="contact-btn"
                  onClick={() => contactAuthor(selectedArticle)}
                >
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && selectedArticle && (
          <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
            <div className="share-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowShareModal(false)}>×</button>
              
              <div className="share-header">
                <h3>Share Article</h3>
                <p>Share "{selectedArticle.title}" with others</p>
              </div>

              <div className="share-options">
                <button 
                  className="share-option twitter"
                  onClick={() => shareOnSocialMedia('twitter', selectedArticle)}
                >
                  <span className="share-icon">🐦</span>
                  Share on Twitter
                </button>
                
                <button 
                  className="share-option facebook"
                  onClick={() => shareOnSocialMedia('facebook', selectedArticle)}
                >
                  <span className="share-icon">📘</span>
                  Share on Facebook
                </button>
                
                <button 
                  className="share-option linkedin"
                  onClick={() => shareOnSocialMedia('linkedin', selectedArticle)}
                >
                  <span className="share-icon">💼</span>
                  Share on LinkedIn
                </button>
                
                <button 
                  className="share-option email"
                  onClick={() => shareOnSocialMedia('email', selectedArticle)}
                >
                  <span className="share-icon">📧</span>
                  Share via Email
                </button>
                
                <button 
                  className="share-option copy"
                  onClick={() => copyToClipboard(selectedArticle)}
                >
                  <span className="share-icon">📋</span>
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default News
