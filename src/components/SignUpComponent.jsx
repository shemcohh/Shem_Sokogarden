import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpComponent = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const user_data = new FormData();
      user_data.append("username", formData.username);
      user_data.append("email", formData.email);
      user_data.append("phone", formData.phone);
      user_data.append("password", formData.password);

      const response = await axios.post("https://shemriley.alwaysdata.net/api/signup", user_data);
      setSuccess(response.data.message || "Account created successfully!");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page min-vh-100 d-flex align-items-center" style={{background: 'linear-gradient(135deg, var(--accent) 0%, #10b981 100%)'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="auth-card card shadow-lg border-0 overflow-hidden">
              <div className="row g-0">
                <div className="col-md-6">
                  <div className="bg-gradient-primary h-100 p-5 d-flex flex-column justify-content-center">
                    <h1 className="display-4 fw-bold text-white mb-3">📝 Join Sokogarden</h1>
                    <p className="lead text-white-50 mb-0">Create your free account and start shopping today!</p>
                    <div className="mt-4">
                      <i className="fas fa-shopping-cart fa-2x text-white-50 me-3"></i>
                      <i className="fas fa-store fa-2x text-white-50 me-3"></i>
                      <i className="fas fa-credit-card fa-2x text-white-50"></i>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card-body p-5">
                    <div className="text-center mb-4">
                      <h2 className="h3 fw-bold mb-2">Create Account</h2>
                      <p className="text-muted">Join thousands of happy customers</p>
                    </div>

                    {/* Messages */}
                    {error && (
                      <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                        <i className="fas fa-exclamation-circle me-2"></i>{error}
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
                        <div className="col-6">
                          <div className="mb-4">
                            <label className="form-label fw-semibold mb-2">Full Name</label>
                            <div className="input-group input-group-lg">
                              <span className="input-group-text">
                                <i className="fas fa-user"></i>
                              </span>
                              <input 
                                type="text" 
                                name="username"
                                className="form-control" 
                                placeholder="John Doe"
                                required
                                value={formData.username}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="mb-4">
                            <label className="form-label fw-semibold mb-2">Phone</label>
                            <div className="input-group input-group-lg">
                              <span className="input-group-text">
                                <i className="fas fa-phone"></i>
                              </span>
                              <input 
                                type="tel" 
                                name="phone"
                                className="form-control" 
                                placeholder="254 7XX XXX XXX"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold mb-2">Email Address</label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text">
                            <i className="fas fa-envelope"></i>
                          </span>
                          <input 
                            type="email" 
                            name="email"
                            className="form-control" 
                            placeholder="your.email@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold mb-2">Password</label>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text">
                            <i className="fas fa-lock"></i>
                          </span>
                          <input 
                            type="password" 
                            name="password"
                            className="form-control" 
                            placeholder="Create a strong password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        className="btn btn-lg btn-success w-100 mb-3 fw-semibold"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Creating Account...
                          </>
                        ) : (
                          'Create Account'
                        )}
                      </button>

                      <div className="text-center">
                        <Link to="/signin" className="text-decoration-none">
                          Already have an account? <strong>Sign in</strong>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
