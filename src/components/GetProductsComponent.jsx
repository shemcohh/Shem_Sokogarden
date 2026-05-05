import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext";

const GetProductsComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const img_url = "https://shemriley.alwaysdata.net/static/images/";

  // FETCH PRODUCTS
  const getProducts = async () => {
    setError("");
    setLoading("Loading products...");

    try {
      const response = await axios.get(
        "https://shemriley.alwaysdata.net/api/get_products"
      );

      if (response.status === 200) {
        setProducts(response.data);
        setLoading("");
      }
    } catch (err) {
      setLoading("");
      setError("Failed to load products. Please try again.");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Add to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setToast(`${product.product_name} added to cart! 🛒`);
    setTimeout(() => setToast(""), 2500);
  };

  // Buy now (direct to payment)
  const handleBuyNow = (product) => {
    addToCart(product);
    navigate("/makepayment", { state: { product } });
  };

  const filteredProducts = products.filter((p) =>
    p.product_name.toLowerCase().includes(search.toLowerCase()) ||
    p.product_description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-page">
      {/* Hero Search */}
      <div className="hero-section py-4 bg-gradient">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-5 fw-bold mb-2">🛍️ Discover Amazing Deals</h1>
              <p className="lead text-muted">Shop the latest items at unbeatable prices</p>
            </div>
            <div className="col-md-6">
              <div className="search-bar-large">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="🔍 Search electronics, fashion, groceries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-4">
        {/* Status */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="mt-2 text-warning">{loading}</h5>
          </div>
        )}
        {error && (
          <div className="alert alert-danger text-center py-3">
            <i className="fas fa-exclamation-triangle me-2"></i>{error}
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3 mb-0">
                {filteredProducts.length} Products Found
              </h2>
              <Link to="/addproduct" className="btn btn-outline-primary">
                ➕ Sell Your Product
              </Link>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-search fa-3x text-muted mb-3"></i>
                <h4>No products found</h4>
                <p className="text-muted">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="product-grid row g-4" style={{rowGap: '1.5rem'}}>
                {filteredProducts.map((product) => (
                  <div key={product.product_id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="product-card h-100" style={{height: '100%'}}>
                      <div className="product-img-wrapper">
                        <img
                          src={img_url + product.product_image}
                          alt={product.product_name}
                          className="card-img-top"
                          onError={(e) => {
                            e.target.src = '/logo.svg';
                          }}
                        />
                        <div className="product-badge">
                          {product.product_category}
                        </div>
                      </div>
                      <div className="card-body p-3">
                        <h6 className="card-title fw-bold mb-1">{product.product_name}</h6>
                        <p className="card-text small text-muted mb-3">
                          {product.product_description?.substring(0, 100)}...
                        </p>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0 fw-bold text-primary">
                            KES {Number(product.product_cost).toLocaleString()}
                          </h5>
                          <span className="badge bg-success">In Stock</span>
                        </div>
                        <div className="btn-group w-100" role="group">
                          <button
                            className="btn btn-outline-success flex-fill"
                            onClick={() => handleAddToCart(product)}
                          >
                            🛒 Add to Cart
                          </button>
                          <button
                            className="btn btn-success flex-fill"
                            onClick={() => handleBuyNow(product)}
                          >
                            🚀 Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast-notification">
          <div className="alert alert-success alert-dismissible fade show position-fixed" 
               style={{top: '100px', right: '20px', zIndex: 9999, minWidth: '300px'}}>
            <i className="fas fa-check-circle me-2"></i>{toast}
            <button type="button" className="btn-close" onClick={() => setToast("")}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetProductsComponent;
