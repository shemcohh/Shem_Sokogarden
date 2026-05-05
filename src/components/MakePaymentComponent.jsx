import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const MakePaymentComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, getTotal, clearCart } = useCart(); // Optional cart total
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const product = location.state?.product;
  const cartTotal = getTotal();

  // Handle both single product and cart checkout
  const isCartCheckout = !product && cartItems.length > 0;
  const amount = isCartCheckout ? cartTotal : Number(product?.product_cost || 0);
  const img_url = "https://shemriley.alwaysdata.net/static/images/";

  if (!isCartCheckout && !product) {
    return (
      <div className="container py-5 text-center">
        <i className="fas fa-exclamation-triangle fa-3x text-danger mb-4"></i>
        <h3 className="mb-3">No payment details found</h3>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("amount", amount.toFixed(2));
      data.append("phone", phone);

      const response = await axios.post(
        "https://shemriley.alwaysdata.net/api/mpesa_payment",
        data
      );

      if (response.status === 200) {
        setSuccess(response.data.message || "✅ Payment initiated! Check your phone for M-Pesa prompt.");
        clearCart(); // Clear cart on success
        setTimeout(() => navigate("/"), 4000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page min-vh-100 py-5" style={{background: 'var(--bg)'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="payment-card card shadow-lg border-0">
              <div className="card-header bg-success text-white text-center py-4">
                <h1 className="h3 mb-1">
                  <i className="fas fa-credit-card me-2"></i>
                  Secure Checkout
                </h1>
                <p className="mb-0 opacity-75">Lipa Na M-PESA - Safe & Fast</p>
              </div>
              <div className="card-body p-5">
                {/* Status */}
                {loading && (
                  <div className="text-center py-4 mb-4">
                    <div className="spinner-border text-success" role="status"></div>
                    <h5 className="mt-3 text-success">Processing your payment...</h5>
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show mb-4">
                    <i className="fas fa-exclamation-circle me-2"></i>{error}
                    <button type="button" className="btn-close" onClick={() => setError("")}></button>
                  </div>
                )}
                {success && (
                  <div className="alert alert-success alert-dismissible fade show mb-4">
                    <i className="fas fa-check-circle me-2"></i>{success}
                    <button type="button" className="btn-close" onClick={() => setSuccess("")}></button>
                  </div>
                )}

                <div className="row mb-5">
                  <div className="col-md-5 text-center">
{isCartCheckout ? (
                      <div className="cart-thumbnails d-flex flex-wrap gap-2 justify-content-center" style={{maxHeight: '200px', overflowY: 'auto'}}>
                        {cartItems.slice(0, 6).map((item) => (
                          <img 
                            key={item.product_id}
                            src={`https://shemriley.alwaysdata.net/static/images/${item.product_image}`} 
                            alt={item.product_name}
                            className="rounded shadow-sm"
                            style={{width: '60px', height: '60px', objectFit: 'cover'}}
                            onError={(e) => { e.target.src = '/cart-placeholder.png'; }}
                          />
                        ))}
                        {cartItems.length > 6 && (
                          <div className="bg-light rounded d-flex align-items-center justify-content-center shadow-sm" 
                               style={{width: '60px', height: '60px'}}>
                            +{cartItems.length - 6}
                          </div>
                        )}
                      </div>
                    ) : (
                      <img
                        src={img_url + product.product_image}
                        alt="Product"
                        className="img-fluid rounded-4 shadow-sm"
                        style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
                        onError={(e) => { e.target.src = '/cart-placeholder.png' }}
                      />
                    )}
                    {isCartCheckout && (
                      <div className="badge bg-info mt-2 w-100">
                        Cart ({cartItems.length} items)
                      </div>
                    )}
                  </div>
                  <div className="col-md-7">
                    <h3 className="fw-bold mb-2">
                      {product ? product.product_name : `Shopping Cart (${cartItems.length} items)`}
                    </h3>
                    {isCartCheckout && (
                      <div className="mb-3">
                        <small className="text-muted d-block mb-1">Items:</small>
                        {cartItems.slice(0, 3).map((item) => (
                          <div key={item.product_id} className="small mb-1">
                            • {item.product_name} 
                            {item.quantity > 1 && ` (x${item.quantity})`}
                          </div>
                        ))}
                        {cartItems.length > 3 && (
                          <small className="text-muted">...and {cartItems.length - 3} more</small>
                        )}
                      </div>
                    )}
                    {product && !isCartCheckout && (
                      <>
                        <div className="badge bg-secondary mb-2">{product.product_category}</div>
                        <p className="text-muted mb-3">{product.product_description}</p>
                      </>
                    )}
                    <div className="h4 text-success mb-0 fw-bold">
                      KES {amount.toLocaleString()}
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-bold mb-3">M-Pesa Phone Number *</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text bg-light">
                        <i className="fab fa-mpesa text-success"></i>
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="254700123456"
                        pattern="[0-9]{12}"
                        maxLength="12"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      />
                      <span className="input-group-text bg-light">
                        <small>254</small>
                      </span>
                    </div>
                    <div className="form-text">
                      Enter your Safaricom number. You'll receive STK Push.
                    </div>
                  </div>

                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-success btn-lg fw-bold py-3"
                      disabled={loading || !phone}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Requesting M-Pesa...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-mobile-alt me-2"></i>
                          Pay KES {amount.toLocaleString()} Now
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center mt-4 pt-3 border-top">
                    <Link to={isCartCheckout ? "/cart" : "/"} className="btn btn-link btn-lg">
                      ← Back to {isCartCheckout ? "Cart" : "Products"}
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePaymentComponent;
