import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";

const ProductCard = ({ product, variants = [] }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  
  const dispatch = useDispatch();

  const addProduct = (productData) => {
    const productToAdd = {
      ...productData,
      variant: selectedVariant
    };
    dispatch(addCart(productToAdd));
    toast.success("Added to cart");
  };

  // Check if product is out of stock
  const isOutOfStock = product.stock === 0 || (selectedVariant && selectedVariant.stock === 0);

  // Calculate discount percentage if available
  const discountPercentage = product.cuttedPrice 
    ? Math.round(((product.cuttedPrice - product.price) / product.cuttedPrice) * 100)
    : 0;

  // Get current price based on variant selection
  const getCurrentPrice = () => {
    if (selectedVariant && selectedVariant.price) {
      return selectedVariant.price;
    }
    return product.price;
  };

  // Get current stock based on variant selection
  const getCurrentStock = () => {
    if (selectedVariant && selectedVariant.stock !== undefined) {
      return selectedVariant.stock;
    }
    return product.stock;
  };

  const handleVariantChange = (e) => {
    const variantId = e.target.value;
    const variant = variants.find(v => v.id === variantId);
    setSelectedVariant(variant);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = (e) => {
    e.target.src = '/api/placeholder/300/300'; // Fallback image
    setIsImageLoading(false);
  };

  return (
    <div className="product-card">
      <div className="product-card-inner">
        {/* Product Image Section */}
        <div className="product-image-container">
          {isImageLoading && (
            <div className="image-skeleton">
              <div className="skeleton-animation"></div>
            </div>
          )}
          <img
            src={product.images?.[0]?.url || product.image || '/api/placeholder/300/300'}
            alt={product.name || product.title}
            className={`product-image ${isImageLoading ? 'loading' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="discount-badge">
              -{discountPercentage}%
            </div>
          )}
          
          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="stock-overlay">
              <span className="stock-text">Out of Stock</span>
            </div>
          )}

          {/* Quick View Button */}
          <Link 
            to={`/product/${product.id || product._id}`} 
            className="quick-view-btn"
            aria-label="Quick view product"
          >
            <i className="fas fa-eye"></i>
          </Link>
        </div>

        {/* Product Info Section */}
        <div className="product-info">
          {/* Product Name */}
          <h3 className="product-name" title={product.name || product.title}>
            {(product.name || product.title)?.length > 60 
              ? `${(product.name || product.title).substring(0, 60)}...`
              : (product.name || product.title)
            }
          </h3>

          {/* Product Rating */}
          {(product.ratings > 0 || product.rating?.rate > 0) && (
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i}
                    className={`fas fa-star ${
                      i < Math.floor(product.ratings || product.rating?.rate) 
                        ? 'filled' : 'empty'
                    }`}
                  ></i>
                ))}
              </div>
              <span className="rating-text">
                ({product.numOfReviews || product.rating?.count || 0})
              </span>
            </div>
          )}

          {/* Variants Dropdown */}
          {variants.length > 0 && (
            <div className="variants-section">
              <label htmlFor={`variant-${product.id}`} className="variant-label">
                Variant:
              </label>
              <select
                id={`variant-${product.id}`}
                className="variant-select"
                value={selectedVariant?.id || ''}
                onChange={handleVariantChange}
              >
                {variants.map((variant) => (
                  <option 
                    key={variant.id} 
                    value={variant.id}
                    disabled={variant.stock === 0}
                  >
                    {variant.name} {variant.stock === 0 ? '(Out of Stock)' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price Section */}
          <div className="price-section">
            <span className="current-price">
              ${getCurrentPrice()}
            </span>
            {product.cuttedPrice && product.cuttedPrice > getCurrentPrice() && (
              <span className="original-price">
                ${product.cuttedPrice}
              </span>
            )}
          </div>

          {/* Stock Info */}
          {getCurrentStock() <= 5 && getCurrentStock() > 0 && (
            <div className="stock-warning">
              Only {getCurrentStock()} left in stock!
            </div>
          )}

          {/* Action Buttons */}
          <div className="product-actions">
            <Link
              to={`/product/${product.id || product._id}`}
              className="btn btn-outline-primary btn-view"
              aria-label="View product details"
            >
              View Details
            </Link>
            
            {isOutOfStock ? (
              <button 
                className="btn btn-disabled btn-out-of-stock"
                disabled
                aria-label="Product out of stock"
              >
                <i className="fas fa-times"></i>
                Out of Stock
              </button>
            ) : (
              <button
                className="btn btn-primary btn-add-cart"
                onClick={() => addProduct(product)}
                aria-label="Add to cart"
              >
                <i className="fas fa-shopping-cart"></i>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
