import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProductComponent = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    product_cost: "",
    product_category: "",
    product_image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "product_image") {
      setFormData({
        ...formData,
        product_image: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const product_data = new FormData();
      product_data.append("product_name", formData.product_name);
      product_data.append("product_description", formData.product_description);
      product_data.append("product_cost", formData.product_cost);
      product_data.append("product_category", formData.product_category);
      product_data.append("product_image", formData.product_image);

      const response = await axios.post(
        "https://shemriley.alwaysdata.net/api/add_products",
        product_data,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      if (response.status === 200) {
        setSuccess("Product added successfully! Redirecting...");
        setTimeout(() => {
          setFormData({
            product_name: "",
            product_description: "",
            product_cost: "",
            product_category: "",
            product_image: null
          });
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page min-vh-100 py-5" style={{background: 'var(--bg)'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="add-product-card card shadow-lg border-0">
              <div className="card-header bg-primary text-white text-center py-4">
                <h1 className="h3 mb-1">
                  <i className="fas fa-plus-circle me-2"></i>
                  Add New Product
                </h1>
                <p className="mb-0 opacity-75">Share your product with thousands of shoppers</p>
              </div>
              <div className="card-body p-5">
                {/* Messages */}
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>{error}
                    <button type="button" className="btn-close" onClick={() => setError("")}></button>
                  </div>
                )}
                {success && (
                  <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
                    <i className="fas fa-check-circle me-2"></i>{success}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label className="form-label fw-bold mb-2">Product Name *</label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text">
                            <i className="fas fa-tag"></i>
                          </span>
                          <input 
                            type="text" 
                            name="product_name"
                            className="form-control" 
                            placeholder="e.g. iPhone 15 Pro"
                            required
                            value={formData.product_name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label className="form-label fw-bold mb-2">Price (KES) *</label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text">KES</span>
                          <input 
                            type="number" 
                            name="product_cost"
                            min="0"
                            step="0.01"
                            className="form-control" 
                            placeholder="15000"
                            required
                            value={formData.product_cost}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label className="form-label fw-bold mb-2">Category *</label>
                        <select 
                          name="product_category"
                          className="form-select form-select-lg"
                          required
                          value={formData.product_category}
                          onChange={handleChange}
                        >
                          <option value="">Choose category</option>
                          <option value="electronics">📱 Electronics</option>
                          <option value="fashion">👕 Fashion</option>
                          <option value="phones">📱 Phones</option>
                          <option value="laptops">💻 Laptops</option>
                          <option value="accessories">⚡ Accessories</option>
                          <option value="groceries">🛒 Groceries</option>
                          <option value="home">🏠 Home & Garden</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label className="form-label fw-bold mb-2">Product Image *</label>
                        <div className="dropzone p-4 border-2 border-dashed rounded-3 text-center" style={{minHeight: '120px', cursor: 'pointer'}}>
                          <input 
                            type="file" 
                            name="product_image"
                            accept="image/*"
                            className="d-none"
                            id="product_image"
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="product_image" className="cursor-pointer">
                            <i className="fas fa-cloud-upload-alt fa-3x text-muted mb-2"></i>
                            <p className="mb-1 fw-semibold">{formData.product_image ? formData.product_image.name : 'Click to upload image'}</p>
                            <small className="text-muted">PNG, JPG up to 5MB</small>
                          </label>
                          {formData.product_image && (
                            <div className="mt-2">
                              <small className="badge bg-success">Selected</small>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="form-label fw-bold mb-2">Description *</label>
                    <textarea 
                      name="product_description"
                      className="form-control" 
                      rows="5"
                      placeholder="Tell buyers about your product (condition, features, etc.)"
                      required
                      value={formData.product_description}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-success btn-lg w-100 fw-bold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Adding Product...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-rocket me-2"></i>List Product Now
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductComponent;
