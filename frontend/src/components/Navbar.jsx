import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();

  const linkStyle = (path) => ({
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    textDecoration: "none",
    color: location.pathname === path ? "#ffffff" : theme.colors.textSecondary,
    backgroundColor:
      location.pathname === path ? theme.colors.primary : "transparent",
    fontSize: "0.9rem",
    fontWeight: 500,
    transition: "all 0.3s ease",
  });

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backdropFilter: "blur(10px)",
        background: theme.isDark
          ? "rgba(15, 23, 42, 0.95)"
          : "rgba(248, 250, 252, 0.95)",
        borderBottom: `1px solid ${theme.colors.border}`,
        transition: "all 0.3s ease",
      }}
    >
      <nav
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0.9rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.3rem" }}>🛡️</span>
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "0.04em",
              color: theme.colors.text,
            }}
          >
            ClaimWatch
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <Link to="/" style={linkStyle("/")}>
            Home
          </Link>
          <Link to="/predict" style={linkStyle("/predict")}>
            Predict
          </Link>
          <Link to="/dashboard" style={linkStyle("/dashboard")}>
            Dashboard
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={() => theme.setIsDark(!theme.isDark)}
            style={{
              marginLeft: "1rem",
              padding: "0.5rem 0.75rem",
              backgroundColor: theme.colors.bgSecondary,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: "0.4rem",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              color: theme.colors.text,
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.primary;
              e.target.style.color = "#ffffff";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = theme.colors.bgSecondary;
              e.target.style.color = theme.colors.text;
              e.target.style.transform = "scale(1)";
            }}
            title={theme.isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme.isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

