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
    <div className="h-100">
      <div 
        className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden position-relative" 
        style={{ transition: 'all 0.3s ease' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
          // Show quick view button
          const quickViewBtn = e.currentTarget.querySelector('.quick-view-btn');
          if (quickViewBtn) {
            quickViewBtn.style.opacity = '1';
            quickViewBtn.style.transform = 'scale(1)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '';
          // Hide quick view button
          const quickViewBtn = e.currentTarget.querySelector('.quick-view-btn');
          if (quickViewBtn) {
            quickViewBtn.style.opacity = '0';
            quickViewBtn.style.transform = 'scale(0.8)';
          }
        }}>
        
        {/* Product Image Section */}
        <div className="position-relative bg-light d-flex align-items-center justify-content-center" 
             style={{ height: '240px' }}>
          {isImageLoading && (
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <img
            src={product.images?.[0]?.url || product.image || '/api/placeholder/300/300'}
            alt={product.name || product.title}
            className={`img-fluid w-100 h-100 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
            style={{ 
              objectFit: 'cover', 
              transition: 'transform 0.3s ease, opacity 0.3s ease' 
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="position-absolute top-0 start-0 m-3">
              <span className="badge bg-danger rounded-pill px-2 py-1 fw-bold shadow-sm">
                -{discountPercentage}%
              </span>
            </div>
          )}
          
          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                 style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 3 }}>
              <span className="text-white fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
                Out of Stock
              </span>
            </div>
          )}

          {/* Quick View Button */}
          <Link 
            to={`/product/${product.id || product._id}`} 
            className="position-absolute top-0 end-0 m-3 btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center quick-view-btn"
            style={{ 
              width: '40px', 
              height: '40px',
              opacity: '0',
              transform: 'scale(0.8)',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(8px)',
              zIndex: 2
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#007bff';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '';
              e.currentTarget.style.color = '';
              e.currentTarget.style.boxShadow = '';
            }}
            aria-label="Quick view product">
            <i className="fas fa-eye"></i>
          </Link>
        </div>

        {/* Product Info Section */}
        <div className="card-body d-flex flex-column p-4">
          {/* Product Name */}
          <h5 className="card-title fw-semibold text-dark mb-3 lh-sm" 
              style={{ 
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: '3rem'
              }}
              title={product.name || product.title}>
            {(product.name || product.title)?.length > 60 
              ? `${(product.name || product.title).substring(0, 60)}...`
              : (product.name || product.title)
            }
          </h5>

          {/* Product Rating */}
          {(product.ratings > 0 || product.rating?.rate > 0) && (
            <div className="d-flex align-items-center mb-3 gap-2">
              <div className="d-flex">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i}
                    className={`fas fa-star ${
                      i < Math.floor(product.ratings || product.rating?.rate) 
                        ? 'text-warning' : 'text-muted'
                    }`}
                    style={{ fontSize: '0.875rem' }}>
                  </i>
                ))}
              </div>
              <small className="text-muted">
                ({product.numOfReviews || product.rating?.count || 0})
              </small>
            </div>
          )}

          {/* Variants Dropdown */}
          {variants.length > 0 && (
            <div className="mb-3">
              <label htmlFor={`variant-${product.id}`} className="form-label small fw-medium text-dark">
                Variant:
              </label>
              <select
                id={`variant-${product.id}`}
                className="form-select form-select-sm"
                value={selectedVariant?.id || ''}
                onChange={handleVariantChange}
                style={{ 
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease' 
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#007bff';
                  e.target.style.boxShadow = '0 0 0 0.2rem rgba(0, 123, 255, 0.25)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '';
                  e.target.style.boxShadow = '';
                }}>
                {variants.map((variant) => (
                  <option 
                    key={variant.id} 
                    value={variant.id}
                    disabled={variant.stock === 0}>
                    {variant.name} {variant.stock === 0 ? '(Out of Stock)' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price Section */}
          <div className="d-flex align-items-center mb-3 gap-2">
            <span className="h4 text-primary fw-bold mb-0">
              ${getCurrentPrice()}
            </span>
            {product.cuttedPrice && product.cuttedPrice > getCurrentPrice() && (
              <span className="text-muted text-decoration-line-through h6 mb-0">
                ${product.cuttedPrice}
              </span>
            )}
          </div>

          {/* Stock Info */}
          {getCurrentStock() <= 5 && getCurrentStock() > 0 && (
            <div className="alert alert-warning py-2 px-3 mb-3 small text-center border-0">
              <i className="fas fa-exclamation-triangle me-1"></i>
              Only {getCurrentStock()} left in stock!
            </div>
          )}

          {/* Action Buttons */}
          <div className="d-flex gap-2 mt-auto">
            <Link
              to={`/product/${product.id || product._id}`}
              className="btn btn-outline-primary btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
              style={{ 
                minHeight: '44px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '';
              }}>
              <i className="fas fa-eye"></i>
              View Details
            </Link>
            
            {isOutOfStock ? (
              <button 
                className="btn btn-danger btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
                disabled
                style={{ minHeight: '44px' }}>
                <i className="fas fa-times"></i>
                Out of Stock
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
                onClick={() => addProduct(product)}
                style={{ 
                  minHeight: '44px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '';
                }}>
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
