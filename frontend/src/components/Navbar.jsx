import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkStyle = (path) => ({
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    textDecoration: "none",
    color: location.pathname === path ? "#0f172a" : "#e5e7eb",
    backgroundColor: location.pathname === path ? "#38bdf8" : "transparent",
    fontSize: "0.9rem",
    fontWeight: 500
  });

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backdropFilter: "blur(10px)",
        background: "rgba(15, 23, 42, 0.9)",
        borderBottom: "1px solid rgba(148, 163, 184, 0.3)"
      }}
    >
      <nav
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0.9rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <span style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.04em" }}>
          Claim Watch
        </span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link to="/" style={linkStyle("/")}>
            Home
          </Link>
          <Link to="/predict" style={linkStyle("/predict")}>
            Predict
          </Link>
          <Link to="/dashboard" style={linkStyle("/dashboard")}>
            Dashboard
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

