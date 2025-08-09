# ProductCard Component

A modern, responsive product card component built with React that provides a clean and professional UI for displaying products in ecommerce applications.

## Features

 **Responsive Design** - Adapts perfectly to desktop, tablet, and mobile screens
 **Product Images** - Support for product images with loading states and fallbacks
 **Variant Selection** - Dropdown for product variants (size, color, etc.)
 **Pricing Display** - Shows current price and crossed-out original price
 **Stock Management** - Handles out-of-stock states and low stock warnings
 **Ratings & Reviews** - Displays star ratings and review counts
 **Discount Badges** - Automatic discount percentage calculation and display
 **Modern UI/UX** - Smooth animations, hover effects, and modern design
 **Accessibility** - ARIA labels, keyboard navigation, and screen reader support
 **Cart Integration** - Seamless integration with Redux cart management

## Usage

```jsx
import ProductCard from './components/ProductCard';

// Basic usage
<ProductCard product={productData} />

// With variants
<ProductCard 
  product={productData} 
  variants={[
    { id: 'small', name: 'Small', stock: 10 },
    { id: 'medium', name: 'Medium', stock: 5 },
    { id: 'large', name: 'Large', stock: 0 }
  ]}
/>
```

## Props

### `product` (required)
Product object with the following structure:

```javascript
{
  id: string|number,           // Unique identifier
  name: string,                // Product name
  title: string,               // Alternative to name
  image: string,               // Primary image URL
  images: [{url: string}],     // Image array (uses first image)
  price: number,               // Current price
  cuttedPrice: number,         // Original price (for discounts)
  stock: number,               // Available stock
  ratings: number,             // Average rating (0-5)
  numOfReviews: number,        // Number of reviews
  rating: {                    // Alternative rating format
    rate: number,
    count: number
  }
}
```

### `variants` (optional)
Array of variant objects:

```javascript
[
  {
    id: string,      // Unique variant ID
    name: string,    // Display name
    stock: number,   // Variant-specific stock
    price: number    // Optional: variant-specific price
  }
]
```

## Visual States

### Normal State
- Clean card layout with product image
- Product name, rating, and price clearly displayed
- Action buttons for viewing details and adding to cart

### With Discount
- Automatic discount badge showing percentage off
- Original price crossed out with current price highlighted

### Low Stock Warning
- Yellow warning banner when stock is 5 or below
- Shows exact number of items remaining

### Out of Stock
- Dark overlay on product image with "Out of Stock" text
- Disabled "Add to Cart" button replaced with red "Out of Stock" button
- Variants with zero stock are marked as unavailable

### Loading State
- Shimmer animation while product image loads
- Graceful fallback for broken images

## Responsive Breakpoints

- **Desktop (1200px+)**: Full feature display
- **Tablet (768px-1199px)**: Optimized button layout
- **Mobile (480px-767px)**: Stacked button layout
- **Small Mobile (<480px)**: Compact design with smaller badges

## Integration with Existing Codebase

The ProductCard component integrates seamlessly with your existing:

- **Redux store** for cart management
- **React Router** for navigation
- **React Hot Toast** for notifications
- **Font Awesome** for icons
- **Bootstrap** grid system for layout

## Customization

The component uses CSS variables and classes that can be easily customized:

```css
/* Override default colors */
.product-card {
  --primary-color: #007bff;
  --discount-color: #ff4757;
  --warning-color: #ffa502;
}
```

## Accessibility Features

- Proper ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode support
- Focus indicators for interactive elements
- Reduced motion support for users with vestibular disorders

## Performance Optimizations

- Lazy loading for images
- Efficient re-renders with React.memo (can be added)
- CSS transforms for smooth animations
- Minimal bundle size impact

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Demo

Visit `/showcase` in your application to see all the different states and features of the ProductCard component in action.
