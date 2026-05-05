import { Link, useNavigate } from "react-router-dom";
// import SmartCart from "./SmartCart";

import { useEffect, useState } from "react";

export default function Navbar({ cartCount }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dark") === "true";
    setDark(saved);
    document.body.classList.toggle("dark", saved);
  }, []);

  const toggleDark = () => {
    const newMode = !dark;
    setDark(newMode);
    document.body.classList.toggle("dark", newMode);
    localStorage.setItem("dark", newMode);
  };

  const [cart, setCart] = useState(0);

const handleAddToCart = () => {
  setCart(c => c + 1);
};

  return (
    <div style={styles.nav} id="cart">
      <h2>Shop</h2>

      <div>
        🛒 <span style={styles.badge}>{cartCount}</span>
        <button onClick={toggleDark} style={{ marginLeft: 10 }}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    background: "var(--bg)",
    zIndex: 100
  },
  badge: {
    fontWeight: "bold",
    marginLeft: 5
  }
};
const NavbarComponent = () => {
  let user = JSON.parse(localStorage.getItem("user"));

  let navigator = useNavigate()
  
  const logout = ()=> {
    localStorage.clear()
    navigator("/signin")
  }
  return (
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/">
        Sokogarden
      </Link>
      <button
        className="navbar-toggler"
        data-bs-collapse="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/addproduct">
            Add Product
          </Link>
        </div>

        {user ? (
          <div className="navbar-nav ms-auto">
            <p className="nav-link">
              {user.username}
            </p>
            <button className="nav-link" onClick={logout}>
              logout
            </button>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/signin">
              Sign In
            </Link>
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

