# CodeSource - Source Code Marketplace

A modern e-commerce platform for buying and selling premium source code, built with React + Vite.

## Features

- 🛒 Shopping Cart with quantity management
- 💳 Simple checkout simulation
- 📱 Responsive design
- ⚡ Fast loading with Vite
- 🎨 Modern UI/UX
- 🔍 Product catalog with detailed modals

## Live Demo
🌐 https://ly12345680.github.io/source_code_selling/

## Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Extract the project files**
   ```bash
   unzip codesource-marketplace.zip
   cd codesource-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Go to: `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation with cart icon
│   ├── Hero.jsx        # Hero section
│   ├── Products.jsx    # Product catalog
│   ├── Cart.jsx        # Shopping cart
│   ├── News.jsx        # Updates section
│   ├── Team.jsx        # Sellers section
│   ├── Contact.jsx     # Contact form
│   └── Footer.jsx      # Site footer
├── context/
│   └── CartContext.jsx # Cart state management
├── App.jsx             # Main app component
└── main.jsx           # App entry point
```

## Key Features Implemented

### Shopping Cart
- Add/remove products
- Quantity controls
- Price calculation
- Cart sidebar with overlay
- Badge showing item count

### Product Catalog
- Product cards with pricing
- Detailed product modals
- License information
- Tech specifications
- Demo videos (placeholder)

### Responsive Design
- Mobile-friendly layout
- Touch-optimized buttons
- Adaptive grid layouts

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features
- **JavaScript ES6+** - Modern JavaScript

## Customization

### Adding Products
Edit `src/components/Products.jsx` and modify the products array in the useEffect hook.

### Changing Branding
- Update `src/components/Header.jsx` for logo
- Modify `index.html` for page title
- Edit hero text in `src/components/Hero.jsx`

### Styling
CSS files are colocated with components. Main styles in component-specific `.css` files.

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Upload dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run deploy
```

### Traditional Hosting
```bash
npm run build
# Upload contents of dist/ folder to web server
```

## Performance

- Production build: ~64KB gzipped
- Initial load: <1s on fast connections
- Optimized React code splitting
- CSS minification included

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

This project template is open source. Individual source code products in the marketplace have their own licenses as specified.

---

Need help? Contact: support@codemarket.dev
