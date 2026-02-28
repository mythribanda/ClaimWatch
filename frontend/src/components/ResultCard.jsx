import { useTheme } from "../context/ThemeContext.jsx";

const ResultCard = ({ result }) => {
  const theme = useTheme();

  if (!result) return null;

  const {
    riskScore,
    probability,
    fraud,
    reasons,
    status = "Low Risk",
    confidence = 0,
    top_contributing_factors = [],
    anomaly_score = 0,
    is_anomaly = false,
    ensemble_votes = {},
    model_agreement = 0,
    explanation_method = "Heuristic"
  } = result;

  const isFraudulent = fraud === 1;
  const borderColor = isFraudulent ? theme.colors.danger : theme.colors.success;
  const backgroundColor = isFraudulent 
    ? "rgba(239, 68, 68, 0.1)" 
    : "rgba(16, 185, 129, 0.1)";
  const textColor = isFraudulent ? "#fca5a5" : "#86efac";
  const titleColor = isFraudulent ? theme.colors.danger : theme.colors.success;

  return (
    <section
      style={{
        marginTop: "2rem",
        padding: "2rem",
        borderRadius: "0.75rem",
        backgroundColor: theme.colors.bgSecondary,
        border: `2px solid ${borderColor}`,
        boxShadow: `0 10px 30px ${isFraudulent ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)"}`,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* Icon and Title */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: borderColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3.5rem",
              color: "#ffffff",
              fontWeight: 900,
            }}
          >
            {isFraudulent ? "⚠️" : "✓"}
          </div>
          <h3
            style={{
              marginTop: "1rem",
              fontSize: "1.25rem",
              fontWeight: 700,
              color: titleColor,
            }}
          >
            {isFraudulent ? "Fraudulent" : "Genuine"}
          </h3>
          <p style={{ fontSize: "2rem", fontWeight: 800, color: titleColor, marginTop: "0.5rem" }}>
            {riskScore}%
          </p>
          <p style={{ fontSize: "0.85rem", color: theme.colors.textSecondary }}>Risk Score</p>
        </div>

        {/* Metrics */}
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            {/* Fraud Probability */}
            <div>
              <p style={{ fontSize: "0.85rem", color: theme.colors.textSecondary, marginBottom: "0.5rem", fontWeight: 500 }}>
                Fraud Probability
              </p>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: theme.colors.bgTertiary,
                  borderRadius: "4px",
                  overflow: "hidden",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(probability * 100).toFixed(1)}%`,
                    backgroundColor: isFraudulent ? theme.colors.danger : theme.colors.success,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
              <p style={{ fontSize: "0.95rem", fontWeight: 700, color: theme.colors.text }}>
                {probability != null ? (probability * 100).toFixed(1) : "-"}%
              </p>
            </div>

            {/* Confidence */}
            <div>
              <p style={{ fontSize: "0.85rem", color: theme.colors.textSecondary, marginBottom: "0.5rem", fontWeight: 500 }}>
                Confidence Level
              </p>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: theme.colors.bgTertiary,
                  borderRadius: "4px",
                  overflow: "hidden",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(confidence * 100).toFixed(0)}%`,
                    backgroundColor: theme.colors.primary,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
              <p style={{ fontSize: "0.95rem", fontWeight: 700, color: theme.colors.text }}>
                {(confidence * 100).toFixed(0)}%
              </p>
            </div>
          </div>

          {/* Analysis Section */}
          <div
            style={{
              backgroundColor: theme.colors.bgTertiary,
              padding: "1rem",
              borderRadius: "0.5rem",
              borderLeft: `3px solid ${borderColor}`,
            }}
          >
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: theme.colors.text, marginBottom: "0.5rem" }}>
              Risk Assessment:
            </p>
            <p style={{ fontSize: "0.9rem", color: theme.colors.textSecondary, lineHeight: "1.6" }}>
              {reasons && reasons.length > 0
                ? reasons[0]
                : "Claim parameters fall within normal ranges. Low-risk profile based on policy history and incident details."}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Details - Collapsible */}
      <div
        style={{
          marginTop: "1.5rem",
          paddingTop: "1.5rem",
          borderTop: `1px solid ${theme.colors.border}`,
        }}
      >
        <details style={{ cursor: "pointer" }}>
          <summary
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: theme.colors.primary,
              userSelect: "none",
              padding: "0.5rem 0",
            }}
          >
            📊 Detailed Metrics & Explainability
          </summary>
          <div style={{ marginTop: "1rem" }}>
            {/* Metrics Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  backgroundColor: theme.colors.bgTertiary,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                <p style={{ fontSize: "0.75rem", color: theme.colors.textSecondary }}>Model Agreement</p>
                <p style={{ fontSize: "1.5rem", fontWeight: 700, color: theme.colors.primary }}>
                  {model_agreement}%
                </p>
              </div>

              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  backgroundColor: theme.colors.bgTertiary,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                <p style={{ fontSize: "0.75rem", color: theme.colors.textSecondary }}>Status</p>
                <p style={{ fontSize: "0.95rem", fontWeight: 700, color: titleColor }}>
                  {status}
                </p>
              </div>

              <div
                style={{
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  backgroundColor: theme.colors.bgTertiary,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                <p style={{ fontSize: "0.75rem", color: theme.colors.textSecondary }}>Anomaly Score</p>
                <p style={{ fontSize: "1.3rem", fontWeight: 700, color: theme.colors.text }}>
                  {(anomaly_score * 100).toFixed(0)}%
                </p>
              </div>
            </div>

            {/* Top Contributing Factors */}
            {top_contributing_factors && top_contributing_factors.length > 0 && (
              <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: theme.colors.text, marginBottom: "0.5rem" }}>
                  🎯 Top Contributing Factors:
                </p>
                <div
                  style={{
                    display: "grid",
                    gap: "0.5rem",
                  }}
                >
                  {top_contributing_factors.slice(0, 5).map((factor, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.75rem",
                        backgroundColor: theme.colors.bgTertiary,
                        borderRadius: "0.375rem",
                        fontSize: "0.85rem",
                        border: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      <span style={{ color: theme.colors.text }}>{factor.feature}</span>
                      <span style={{ color: theme.colors.primary, fontWeight: 600 }}>
                        {(factor.importance * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Model Information */}
            <div
              style={{
                padding: "0.75rem",
                borderRadius: "0.375rem",
                backgroundColor: theme.colors.bgTertiary,
                fontSize: "0.8rem",
                color: theme.colors.textSecondary,
                border: `1px solid ${theme.colors.border}`,
                lineHeight: "1.6",
              }}
            >
              <p>
                <strong style={{ color: theme.colors.text }}>Method:</strong> {explanation_method} • {" "}
                <strong style={{ color: theme.colors.text }}>Anomaly:</strong> {" "}
                {is_anomaly ? "⚠️ Detected" : "✓ Normal"}
              </p>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
};

export default ResultCard;

