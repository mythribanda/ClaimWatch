import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <div
      style={{
        background: theme.gradients.bg,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        marginLeft: "-1rem",
        marginRight: "-1rem",
        marginTop: "-2rem",
        padding: "2rem 1rem",
      }}
    >
      {/* Theme Toggle */}
      <button
        onClick={() => theme.setIsDark(!theme.isDark)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "0.6rem 1.2rem",
          backgroundColor: theme.colors.primary,
          color: "#ffffff",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
          fontSize: "0.9rem",
          fontWeight: 600,
          zIndex: 100,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = "0 10px 25px rgba(99, 102, 241, 0.4)";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = "none";
          e.target.style.transform = "translateY(0)";
        }}
      >
        {theme.isDark ? "☀️ Light" : "🌙 Dark"}
      </button>

      <section
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "900px", textAlign: "center" }}>
          {/* Badge */}
          <div style={{ marginBottom: "2rem" }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.6rem 1.2rem",
                backgroundColor: theme.colors.primaryDim,
                border: `1px solid ${theme.colors.primary}`,
                borderRadius: "2rem",
                fontSize: "0.85rem",
                color: theme.colors.primary,
                fontWeight: 600,
              }}
            >
              🤖 AI-Powered Protection
            </span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: 900,
              marginBottom: "1rem",
              color: theme.colors.text,
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
            }}
          >
            AI-Powered Insurance
            <br />
            <span style={{ color: theme.colors.primary }}>Fraud Detection</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "1.2rem",
              color: theme.colors.textSecondary,
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              lineHeight: "1.7",
              fontWeight: 500,
            }}
          >
            Real-time fraud analysis using machine learning. Protect your business with intelligent claim scoring and transparent risk assessment.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("/predict")}
              style={{
                padding: "0.95rem 2.5rem",
                fontSize: "1rem",
                fontWeight: 700,
                backgroundColor: theme.colors.primary,
                color: "#ffffff",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 15px 40px rgba(99, 102, 241, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 10px 25px rgba(99, 102, 241, 0.3)";
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>📊</span>
              Analyze Claim
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                padding: "0.95rem 2.5rem",
                fontSize: "1rem",
                fontWeight: 700,
                backgroundColor: theme.colors.bgSecondary,
                color: theme.colors.text,
                border: `2px solid ${theme.colors.primary}`,
                borderRadius: "0.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme.colors.primary;
                e.target.style.color = "#ffffff";
                e.target.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = theme.colors.bgSecondary;
                e.target.style.color = theme.colors.text;
                e.target.style.transform = "translateY(0)";
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>📈</span>
              View Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

