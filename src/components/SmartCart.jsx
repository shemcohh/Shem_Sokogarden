import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const SmartCart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/makepayment");
    }
  };

  return (
    <div className="cart-page">
      <div className="container py-5">
        <h2 className="mb-4">🧺 Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart text-center py-5">
            <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
            <h4>Your cart is empty</h4>
            <Link to="/" className="btn btn-primary">Continue Shopping</Link>
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-lg-8">
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div key={item.product_id} className="cart-item row align-items-center py-3 border-bottom">
                      <div className="col-md-2">
                        <img 
                          src={`https://shemriley.alwaysdata.net/static/images/${item.product_image}`} 
                          alt={item.product_name}
                          className="img-fluid rounded"
                          style={{width: '80px', height: '80px', objectFit: 'cover'}}
                          loading="lazy"
                          onError={(e) => { e.target.src = '/logo.svg'; }}
                        />
                      </div>
                      <div className="col-md-4">
                        <h5>{item.product_name}</h5>
                        <p className="text-muted mb-1">{item.product_description?.substring(0, 80)}...</p>
                      </div>
                      <div className="col-md-2 text-center">
                        <h5>KES {Number(item.product_cost).toLocaleString()}</h5>
                      </div>
                      <div className="col-md-2">
                        <div className="quantity-controls d-flex align-items-center">
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(item.product_id, (item.quantity || 1) - 1)}
                          >
                            -
                          </button>
                          <span className="mx-2 fw-bold">{item.quantity || 1}</span>
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(item.product_id, (item.quantity || 1) + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 text-end">
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFromCart(item.product_id)}
                        >
                          <i className="fas fa-trash"></i> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="cart-summary card sticky-top" style={{top: '20px'}}>
                  <div className="card-body">
                    <h5 className="card-title">Order Summary</h5>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Total Items: {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}</span>
                      <span>{cartItems.length} products</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-3">
                      <strong>Total:</strong>
                      <strong>KES {getTotal().toLocaleString()}</strong>
                    </div>
                    <button
                      className="btn btn-dark w-100 mb-2"
                      onClick={handleCheckout}
                      disabled={cartItems.length === 0}
                    >
                      <i className="fas fa-credit-card me-2"></i>Proceed to Checkout
                    </button>
                    <Link to="/" className="btn btn-outline-secondary w-100">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SmartCart;
