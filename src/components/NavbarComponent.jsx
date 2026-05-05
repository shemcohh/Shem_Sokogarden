import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";

const NavbarComponent = () => {
  const [dark, setDark] = useState(false);
  const { cartCount } = useCart();

  // Dark mode load
  useEffect(() => {
    const saved = localStorage.getItem("dark") === "true";
    setDark(saved);
    document.body.classList.toggle("dark", saved);
  }, []);

  // Toggle dark mode
  const toggleDark = () => {
    const newMode = !dark;
    setDark(newMode);
    document.body.classList.toggle("dark", newMode);
    localStorage.setItem("dark", newMode);
  };

  // User
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "10px 20px"
      }}
    >
      {/* Logo */}
      <Link className="navbar-brand fw-bold fs-3" to="/">
        🛍️ Sokogarden
      </Link>

      {/* Toggle button */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Nav content */}
      <div className="collapse navbar-collapse" id="navbarCollapse">
        
        {/* Left links */}
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              🏠 Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/addproduct">
              ➕ Add Product
            </Link>
          </li>
        </ul>

        {/* Right side */}
        <ul className="navbar-nav ms-auto align-items-center">
          {/* Cart */}
          <li className="nav-item">
            <Link className="nav-link position-relative" to="/cart">
              🧺 Cart
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                  <span className="visually-hidden">cart items</span>
                </span>
              )}
            </Link>
          </li>

          {/* Dark mode */}
          <li className="nav-item">
            <button
              onClick={toggleDark}
              className="btn btn-sm btn-outline-secondary mx-2"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </li>

          {/* User section */}
          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link">👋 {user.username}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-sm btn-outline-danger" onClick={logout}>
                  🚪 Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  🔐 Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  📝 Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarComponent;
