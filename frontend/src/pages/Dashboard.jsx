import { useEffect, useState } from "react";
import { getClaims } from "../services/api";
import { useTheme } from "../context/ThemeContext.jsx";

const Dashboard = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const theme = useTheme();

  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await getClaims();
        setClaims(data || []);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            "Failed to load claims. Ensure backend and MongoDB are running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  // Calculate statistics
  const totalClaims = claims.length;
  const fraudulentClaims = claims.filter((c) => c.fraud === 1).length;
  const genuineClaims = claims.filter((c) => c.fraud === 0).length;
  const avgRiskScore =
    totalClaims > 0
      ? (claims.reduce((sum, c) => sum + (c.riskScore || 0), 0) / totalClaims).toFixed(1)
      : "0";

  // Filter claims based on selected filter
  const filteredClaims =
    filter === "Fraud"
      ? claims.filter((c) => c.fraud === 1)
      : filter === "Genuine"
      ? claims.filter((c) => c.fraud === 0)
      : claims;

  const statCardStyle = (bgColor, borderColor) => ({
    padding: "1.5rem",
    backgroundColor: theme.isDark ? bgColor : bgColor.replace("0.1", "0.05"),
    border: `1.5px solid ${borderColor}`,
    borderRadius: "0.75rem",
    transition: "all 0.3s ease",
  });

  return (
    <section>
      <div style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: theme.colors.primaryDim,
            border: `1px solid ${theme.colors.primary}`,
            borderRadius: "2rem",
            fontSize: "0.8rem",
            color: theme.colors.primary,
            fontWeight: 600,
            marginBottom: "1rem",
          }}
        >
          📊 Analytics Overview
        </div>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem", color: theme.colors.text }}>
          Dashboard
        </h1>
        <p style={{ fontSize: "1rem", color: theme.colors.textSecondary }}>
          Overview of all analyzed insurance claims and fraud detection results.
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}
      >
        <div style={statCardStyle("rgba(99, 102, 241, 0.1)", theme.colors.primary)}>
          <p style={{ fontSize: "0.85rem", color: theme.colors.textSecondary, marginBottom: "0.75rem", fontWeight: 500 }}>
            Total Claims
          </p>
          <p style={{ fontSize: "2.5rem", fontWeight: 800, color: theme.colors.primary }}>
            {totalClaims}
          </p>
        </div>

        <div style={statCardStyle("rgba(239, 68, 68, 0.1)", theme.colors.danger)}>
          <p style={{ fontSize: "0.85rem", color: theme.colors.danger, marginBottom: "0.75rem", fontWeight: 500 }}>
            Fraudulent Cases
          </p>
          <p style={{ fontSize: "2.5rem", fontWeight: 800, color: theme.colors.danger }}>
            {fraudulentClaims}
          </p>
          <p style={{ fontSize: "0.75rem", color: theme.colors.textSecondary, marginTop: "0.5rem" }}>
            {totalClaims > 0 ? ((fraudulentClaims / totalClaims) * 100).toFixed(1) : "0"}% of total
          </p>
        </div>

        <div style={statCardStyle("rgba(16, 185, 129, 0.1)", theme.colors.success)}>
          <p style={{ fontSize: "0.85rem", color: theme.colors.success, marginBottom: "0.75rem", fontWeight: 500 }}>
            Genuine Claims
          </p>
          <p style={{ fontSize: "2.5rem", fontWeight: 800, color: theme.colors.success }}>
            {genuineClaims}
          </p>
          <p style={{ fontSize: "0.75rem", color: theme.colors.textSecondary, marginTop: "0.5rem" }}>
            {totalClaims > 0 ? ((genuineClaims / totalClaims) * 100).toFixed(1) : "0"}% of total
          </p>
        </div>

        <div style={statCardStyle("rgba(251, 191, 36, 0.1)", theme.colors.warning)}>
          <p style={{ fontSize: "0.85rem", color: theme.colors.warning, marginBottom: "0.75rem", fontWeight: 500 }}>
            Average Risk Score
          </p>
          <p style={{ fontSize: "2.5rem", fontWeight: 800, color: theme.colors.warning }}>
            {avgRiskScore}%
          </p>
        </div>
      </div>

      {/* Error/Loading Messages */}
      {loading && (
        <p style={{ fontSize: "0.9rem", color: theme.colors.textSecondary, textAlign: "center", padding: "2rem" }}>
          ⏳ Loading claims...
        </p>
      )}
      {error && (
        <p style={{ fontSize: "0.9rem", color: theme.colors.danger, marginBottom: "1rem", padding: "1rem", backgroundColor: "rgba(239, 68, 68, 0.1)", borderRadius: "0.5rem" }}>
          ⚠️ {error}
        </p>
      )}

      {!loading && !error && claims.length === 0 && (
        <p style={{ fontSize: "0.9rem", color: theme.colors.textSecondary, textAlign: "center", padding: "2rem" }}>
          No claims found yet. Run a prediction first.
        </p>
      )}

      {/* Filter Tabs */}
      {!loading && !error && claims.length > 0 && (
        <>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "1.5rem",
              borderBottom: `1px solid ${theme.colors.border}`,
              paddingBottom: "1rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setFilter("All")}
              style={{
                padding: "0.6rem 1.2rem",
                backgroundColor: filter === "All" ? theme.colors.primary : "transparent",
                color: filter === "All" ? "#ffffff" : theme.colors.textSecondary,
                border: filter === "All" ? "none" : `1px solid ${theme.colors.border}`,
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (filter !== "All") {
                  e.target.style.backgroundColor = theme.colors.bgTertiary;
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== "All") {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              All ({totalClaims})
            </button>
            <button
              onClick={() => setFilter("Fraud")}
              style={{
                padding: "0.6rem 1.2rem",
                backgroundColor: filter === "Fraud" ? theme.colors.danger : "transparent",
                color: filter === "Fraud" ? "#ffffff" : theme.colors.textSecondary,
                border: filter === "Fraud" ? "none" : `1px solid ${theme.colors.border}`,
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (filter !== "Fraud") {
                  e.target.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== "Fraud") {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              Fraud ({fraudulentClaims})
            </button>
            <button
              onClick={() => setFilter("Genuine")}
              style={{
                padding: "0.6rem 1.2rem",
                backgroundColor: filter === "Genuine" ? theme.colors.success : "transparent",
                color: filter === "Genuine" ? "#ffffff" : theme.colors.textSecondary,
                border: filter === "Genuine" ? "none" : `1px solid ${theme.colors.border}`,
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (filter !== "Genuine") {
                  e.target.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== "Genuine") {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              Genuine ({genuineClaims})
            </button>
          </div>

          {/* Claims Table */}
          <div
            style={{
              overflowX: "auto",
              borderRadius: "0.75rem",
              border: `1px solid ${theme.colors.border}`,
              backgroundColor: theme.colors.bgSecondary,
              boxShadow: theme.isDark ? "0 4px 12px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.9rem"
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: theme.colors.bgTertiary,
                    textAlign: "left",
                    borderBottom: `1px solid ${theme.colors.border}`,
                  }}
                >
                  <th style={{ padding: "1rem", color: theme.colors.textSecondary, fontWeight: 600 }}>Date</th>
                  <th style={{ padding: "1rem", color: theme.colors.textSecondary, fontWeight: 600 }}>Claim Amount</th>
                  <th style={{ padding: "1rem", color: theme.colors.textSecondary, fontWeight: 600 }}>Fraud Probability</th>
                  <th style={{ padding: "1rem", color: theme.colors.textSecondary, fontWeight: 600 }}>Risk Score</th>
                  <th style={{ padding: "1rem", color: theme.colors.textSecondary, fontWeight: 600 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredClaims.map((c, idx) => (
                  <tr
                    key={c._id || idx}
                    style={{
                      borderTop: `1px solid ${theme.colors.border}`,
                      backgroundColor: idx % 2 === 0 ? "transparent" : theme.colors.bgTertiary,
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme.isDark ? "rgba(99, 102, 241, 0.05)" : "rgba(99, 102, 241, 0.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "transparent" : theme.colors.bgTertiary;
                    }}
                  >
                    <td style={{ padding: "1rem", color: theme.colors.text }}>
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td style={{ padding: "1rem", color: theme.colors.text, fontWeight: 600 }}>
                      ${c.total_claim_amount?.toLocaleString() || "0"}
                    </td>
                    <td style={{ padding: "1rem", color: theme.colors.text }}>
                      {c.probability != null
                        ? (c.probability * 100).toFixed(1)
                        : "-"}
                      %
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor:
                              c.riskScore > 70
                                ? theme.colors.danger
                                : c.riskScore > 40
                                ? theme.colors.warning
                                : theme.colors.success,
                          }}
                        />
                        <span style={{ color: theme.colors.text }}>{c.riskScore || "-"}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.35rem 0.85rem",
                          borderRadius: "2rem",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          backgroundColor:
                            c.fraud === 1
                              ? "rgba(239, 68, 68, 0.2)"
                              : "rgba(16, 185, 129, 0.2)",
                          color:
                            c.fraud === 1
                              ? theme.colors.danger
                              : theme.colors.success,
                          border: `1px solid ${c.fraud === 1 ? theme.colors.danger : theme.colors.success}`,
                        }}
                      >
                        {c.fraud === 1 ? "🚨 Fraud" : "✓ Genuine"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default Dashboard;

