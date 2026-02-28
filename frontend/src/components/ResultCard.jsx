const ResultCard = ({ result }) => {
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

  // Status color mapping
  const statusColors = {
    "Low Risk": "#10b981",
    "Medium Risk": "#f59e0b",
    "High Risk": "#ef4444",
    "Critical": "#dc2626"
  };

  const statusColor = statusColors[status] || "#10b981";

  return (
    <section
      style={{
        marginTop: "1.5rem",
        padding: "1.5rem",
        borderRadius: "1rem",
        background:
          "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,64,175,0.8))",
        border: "1px solid rgba(129, 140, 248, 0.4)",
        boxShadow: "0 20px 40px rgba(15,23,42,0.7)"
      }}
    >
      <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
        📊 Prediction Result
      </h2>
      <p style={{ fontSize: "0.9rem", color: "#cbd5f5", marginBottom: "1rem" }}>
        Explainable AI Assessment for this claim
      </p>

      {/* Main Metrics Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1rem",
          marginBottom: "1.25rem"
        }}
      >
        <div
          style={{
            padding: "0.8rem",
            borderRadius: "0.75rem",
            backgroundColor: "rgba(15,23,42,0.7)",
            border: "1px solid rgba(148, 163, 184, 0.3)"
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: 600 }}>Risk Score</p>
          <p style={{ fontSize: "1.8rem", fontWeight: 700, color: statusColor }}>
            {riskScore}%
          </p>
        </div>

        <div
          style={{
            padding: "0.8rem",
            borderRadius: "0.75rem",
            backgroundColor: "rgba(15,23,42,0.7)",
            border: "1px solid rgba(148, 163, 184, 0.3)"
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: 600 }}>
            Fraud Probability
          </p>
          <p style={{ fontSize: "1.8rem", fontWeight: 700 }}>
            {probability != null ? (probability * 100).toFixed(1) : "-"}%
          </p>
        </div>

        <div
          style={{
            padding: "0.8rem",
            borderRadius: "0.75rem",
            backgroundColor: "rgba(15,23,42,0.7)",
            border: "1px solid rgba(148, 163, 184, 0.3)"
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: 600 }}>Status</p>
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: statusColor
            }}
          >
            {status}
          </p>
        </div>

        <div
          style={{
            padding: "0.8rem",
            borderRadius: "0.75rem",
            backgroundColor: "rgba(15,23,42,0.7)",
            border: "1px solid rgba(148, 163, 184, 0.3)"
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: 600 }}>
            Confidence
          </p>
          <p style={{ fontSize: "1.8rem", fontWeight: 700, color: "#60a5fa" }}>
            {(confidence * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      {/* Model Agreement & Anomaly Detection */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginBottom: "1.25rem"
        }}
      >
        <div
          style={{
            padding: "0.8rem",
            borderRadius: "0.75rem",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.3)"
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "#60a5fa", fontWeight: 600 }}>
            🤝 Model Agreement
          </p>
          <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#60a5fa" }}>
            {model_agreement}%
          </p>
          <p style={{ fontSize: "0.7rem", color: "#93c5fd", marginTop: "0.25rem" }}>
            Ensemble consensus
          </p>
        </div>

        <div
          style={{
            padding: "0.8rem",
            borderRadius: "0.75rem",
            backgroundColor: is_anomaly
              ? "rgba(239, 68, 68, 0.1)"
              : "rgba(34, 197, 94, 0.1)",
            border: is_anomaly
              ? "1px solid rgba(239, 68, 68, 0.3)"
              : "1px solid rgba(34, 197, 94, 0.3)"
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: is_anomaly ? "#f87171" : "#4ade80",
              fontWeight: 600
            }}
          >
            🔍 Anomaly Score
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: is_anomaly ? "#f87171" : "#4ade80"
            }}
          >
            {(anomaly_score * 100).toFixed(0)}%
          </p>
          <p
            style={{
              fontSize: "0.7rem",
              color: is_anomaly ? "#fca5a5" : "#86efac",
              marginTop: "0.25rem"
            }}
          >
            {is_anomaly ? "⚠️ Anomalous pattern" : "✓ Normal pattern"}
          </p>
        </div>
      </div>

      {/* Top Contributing Factors */}
      {top_contributing_factors && top_contributing_factors.length > 0 && (
        <div style={{ marginBottom: "1.25rem" }}>
          <p
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
              color: "#93c5fd"
            }}
          >
            🎯 Top Contributing Risk Factors:
          </p>
          <div style={{ paddingLeft: "0.75rem" }}>
            {top_contributing_factors.map((factor, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: "0.5rem",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "rgba(30, 58, 138, 0.4)",
                  border: "1px solid rgba(96, 165, 250, 0.2)"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <span style={{ fontSize: "0.85rem", color: "#e5e7eb" }}>
                    {idx + 1}. {factor.feature}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color:
                        factor.impact === "High"
                          ? "#ef4444"
                          : factor.impact === "Medium"
                          ? "#f59e0b"
                          : "#10b981"
                    }}
                  >
                    {factor.impact} ({(factor.importance * 100).toFixed(2)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reasons */}
      <div style={{ marginBottom: "1rem" }}>
        <p style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.4rem", color: "#fbbf24" }}>
          💡 Reasons:
        </p>
        <ul style={{ paddingLeft: "1.25rem", fontSize: "0.85rem", color: "#e5e7eb" }}>
          {(reasons && reasons.length > 0
            ? reasons
            : ["No specific risk reasons provided."]
          ).map((reason, idx) => (
            <li key={idx} style={{ marginBottom: "0.25rem" }}>
              • {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Model Details */}
      <div
        style={{
          padding: "0.75rem",
          borderRadius: "0.5rem",
          backgroundColor: "rgba(107, 114, 128, 0.1)",
          border: "1px solid rgba(107, 114, 128, 0.2)",
          fontSize: "0.75rem",
          color: "#9ca3af"
        }}
      >
        <p>
          <strong>Model:</strong> {explanation_method} | <strong>Version:</strong> 2.0-XAI |{" "}
          <strong>Prediction:</strong> {fraud === 1 ? "⚠️ Likely Fraudulent" : "✅ Likely Legitimate"}
        </p>
      </div>
    </section>
  );
};

export default ResultCard;

