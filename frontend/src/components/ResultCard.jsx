const ResultCard = ({ result }) => {
  if (!result) return null;

  const { riskScore, probability, fraud, reasons } = result;

  const status =
    riskScore >= 75 ? "High Risk" : riskScore >= 40 ? "Medium Risk" : "Low Risk";

  const statusColor =
    status === "High Risk" ? "#f97373" : status === "Medium Risk" ? "#facc15" : "#4ade80";

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
        Prediction Result
      </h2>
      <p style={{ fontSize: "0.9rem", color: "#cbd5f5", marginBottom: "1rem" }}>
        Below is the assessment for this claim based on the ML model.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "1rem",
          marginBottom: "1.25rem"
        }}
      >
        <div
          style={{
            padding: "0.8rem",
            borderRadius: "0.75rem",
            backgroundColor: "rgba(15,23,42,0.7)"
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Risk Score</p>
          <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>{riskScore}</p>
        </div>
        <div
          style={{
            padding: "0.8rem",
            borderRadius: "0.75rem",
            backgroundColor: "rgba(15,23,42,0.7)"
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Fraud Probability</p>
          <p style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            {probability != null ? probability.toFixed(2) : "-"}
          </p>
        </div>
        <div
          style={{
            padding: "0.8rem",
            borderRadius: "0.75rem",
            backgroundColor: "rgba(15,23,42,0.7)"
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>Status</p>
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: statusColor
            }}
          >
            {status} {fraud === 1 ? "(Likely Fraud)" : "(Likely Legit)"}
          </p>
        </div>
      </div>

      <div>
        <p style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.4rem" }}>
          Reasons:
        </p>
        <ul style={{ paddingLeft: "1.25rem", fontSize: "0.9rem", color: "#e5e7eb" }}>
          {(reasons && reasons.length > 0
            ? reasons
            : ["No specific risk reasons provided."]
          ).map((reason, idx) => (
            <li key={idx} style={{ marginBottom: "0.2rem" }}>
              • {reason}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ResultCard;

