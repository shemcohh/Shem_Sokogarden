import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignInComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const user_data = new FormData();
      user_data.append("email", email);
      user_data.append("password", password);

      const response = await axios.post("https://shemriley.alwaysdata.net/api/signin", user_data);
      
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setSuccess("Welcome back! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Login failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page min-vh-100 d-flex align-items-center" style={{background: 'linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)'}}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div className="auth-card card shadow-lg border-0">
              <div className="card-body p-5">
                <div className="text-center mb-5">
                  <h1 className="h2 fw-bold text-white mb-2">🔐 Welcome Back</h1>
                  <p className="text-white-50 mb-0">Sign in to your Sokogarden account</p>
                </div>

                {/* Status Messages */}
                {loading && (
                  <div className="alert alert-warning text-center mb-4 animate-pulse">
                    <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                    Signing you in...
                  </div>
                )}
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
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold mb-2">Email Address</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email"
                        placeholder="your.email@example.com" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold mb-2">Password</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="password"
                        placeholder="Enter your password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-lg btn-primary w-100 mb-3 fw-semibold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>

                  <div className="text-center">
                    <Link to="/signup" className="text-white text-decoration-none fw-medium">
                      Don't have an account? <span className="text-white-50">Create one</span>
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

export default SignInComponent;
