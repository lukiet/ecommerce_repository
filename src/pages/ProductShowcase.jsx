import React from "react";
import { Navbar, Footer, ProductCard } from "../components";

const ProductShowcase = () => {
  // Sample product data with different scenarios
  const sampleProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones - High Quality Audio with Noise Cancellation",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      price: 199.99,
      cuttedPrice: 249.99,
      stock: 15,
      ratings: 4.5,
      numOfReviews: 128,
      category: "electronics"
    },
    {
      id: 2,
      name: "Vintage Leather Jacket",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
      price: 159.99,
      cuttedPrice: 199.99,
      stock: 3,
      ratings: 4.8,
      numOfReviews: 89,
      category: "men's clothing"
    },
    {
      id: 3,
      name: "Out of Stock Item - Sold Out Product",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
      price: 89.99,
      stock: 0,
      ratings: 4.2,
      numOfReviews: 45,
      category: "electronics"
    },
    {
      id: 4,
      name: "Elegant Summer Dress",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop",
      price: 79.99,
      stock: 25,
      ratings: 4.7,
      numOfReviews: 67,
      category: "women's clothing"
    },
    {
      id: 5,
      name: "No Reviews Product",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      price: 129.99,
      stock: 10,
      ratings: 0,
      numOfReviews: 0,
      category: "footwear"
    },
    {
      id: 6,
      name: "Regular Price Item Without Discount",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      price: 49.99,
      stock: 50,
      ratings: 3.8,
      numOfReviews: 23,
      category: "accessories"
    }
  ];

  // Sample variants for different products
  const getVariantsForProduct = (product) => {
    const variants = [];
    
    if (product.category?.includes('clothing')) {
      variants.push(
        { id: 'xs', name: 'Extra Small', stock: Math.floor(Math.random() * 5) + 1 },
        { id: 's', name: 'Small', stock: Math.floor(Math.random() * 8) + 1 },
        { id: 'm', name: 'Medium', stock: Math.floor(Math.random() * 10) + 1 },
        { id: 'l', name: 'Large', stock: Math.floor(Math.random() * 7) + 1 },
        { id: 'xl', name: 'Extra Large', stock: Math.floor(Math.random() * 3) + 1 }
      );
    } else if (product.category === 'electronics') {
      variants.push(
        { id: 'black', name: 'Black', stock: Math.floor(Math.random() * 15) + 1 },
        { id: 'white', name: 'White', stock: Math.floor(Math.random() * 10) + 1 },
        { id: 'silver', name: 'Silver', stock: Math.floor(Math.random() * 5) + 1 }
      );
    } else if (product.category === 'footwear') {
      variants.push(
        { id: 'us-7', name: 'US 7', stock: Math.floor(Math.random() * 5) + 1 },
        { id: 'us-8', name: 'US 8', stock: Math.floor(Math.random() * 8) + 1 },
        { id: 'us-9', name: 'US 9', stock: Math.floor(Math.random() * 10) + 1 },
        { id: 'us-10', name: 'US 10', stock: Math.floor(Math.random() * 7) + 1 },
        { id: 'us-11', name: 'US 11', stock: Math.floor(Math.random() * 3) + 1 }
      );
    }
    
    // Sometimes add out of stock variants
    if (variants.length > 0 && Math.random() > 0.7) {
      variants.push({
        id: 'out-of-stock',
        name: 'Special Edition',
        stock: 0
      });
    }
    
    return variants;
  };

  return (
    <>
      <Navbar />
      <div className="container my-5 py-3">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-4 mb-3">Product Card Showcase</h1>
            <p className="lead mb-5">
              Featuring responsive design, variant selection, stock management, and modern UI/UX
            </p>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12 mb-4">
            <h3 className="mb-4">Features Demonstrated:</h3>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-unstyled">
                  <li>✅ Responsive design across devices</li>
                  <li>✅ Product images with loading states</li>
                  <li>✅ Discount badges and pricing</li>
                  <li>✅ Star ratings and review counts</li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-unstyled">
                  <li>✅ Variant selection (size, color, etc.)</li>
                  <li>✅ Stock management and warnings</li>
                  <li>✅ Out of stock handling</li>
                  <li>✅ Modern hover effects and animations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {sampleProducts.map((product) => (
            <div key={product.id} className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
              <ProductCard 
                product={product} 
                variants={getVariantsForProduct(product)}
              />
            </div>
          ))}
        </div>
        
        <div className="row mt-5">
          <div className="col-12 text-center">
            <h3 className="mb-3">Responsive Grid Layout</h3>
            <p className="text-muted">
              The cards automatically adjust to different screen sizes:<br/>
              Desktop (3 columns) → Tablet (2 columns) → Mobile (1 column)
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductShowcase;
