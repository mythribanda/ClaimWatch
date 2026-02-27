import { useEffect, useState } from "react";
import { getClaims } from "../services/api";

const Dashboard = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <section>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>
        Previous Claims
      </h1>
      <p style={{ fontSize: "0.9rem", color: "#9ca3af", marginBottom: "1rem" }}>
        This table shows all claims stored in MongoDB along with their fraud predictions.
      </p>

      {loading && (
        <p style={{ fontSize: "0.9rem", color: "#e5e7eb" }}>Loading claims...</p>
      )}
      {error && (
        <p style={{ fontSize: "0.9rem", color: "#fca5a5", marginBottom: "0.75rem" }}>
          {error}
        </p>
      )}

      {!loading && !error && claims.length === 0 && (
        <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
          No claims found yet. Run a prediction first.
        </p>
      )}

      {!loading && !error && claims.length > 0 && (
        <div
          style={{
            overflowX: "auto",
            borderRadius: "0.75rem",
            border: "1px solid rgba(148,163,184,0.4)",
            backgroundColor: "rgba(15,23,42,0.9)"
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.85rem"
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "rgba(15,23,42,0.9)",
                  textAlign: "left"
                }}
              >
                <th style={{ padding: "0.6rem 0.8rem" }}>Policy State</th>
                <th style={{ padding: "0.6rem 0.8rem" }}>Policy CSL</th>
                <th style={{ padding: "0.6rem 0.8rem" }}>Sex</th>
                <th style={{ padding: "0.6rem 0.8rem" }}>Occupation</th>
                <th style={{ padding: "0.6rem 0.8rem" }}>Incident Type</th>
                <th style={{ padding: "0.6rem 0.8rem" }}>Incident City</th>
                <th style={{ padding: "0.6rem 0.8rem" }}>Auto Make</th>
                <th style={{ padding: "0.6rem 0.8rem" }}>Auto Model</th>
                <th style={{ padding: "0.6rem 0.8rem" }}>Risk Score</th>
                <th style={{ padding: "0.6rem 0.8rem" }}>Fraud</th>
                <th style={{ padding: "0.6rem 0.8rem" }}>Probability</th>
                <th style={{ padding: "0.6rem 0.8rem" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((c) => (
                <tr
                  key={c._id}
                  style={{
                    borderTop: "1px solid rgba(55,65,81,0.8)"
                  }}
                >
                  <td style={{ padding: "0.6rem 0.8rem" }}>{c.policy_state}</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>{c.policy_csl}</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>{c.insured_sex}</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>{c.insured_occupation}</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>{c.incident_type}</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>{c.incident_city}</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>{c.auto_make}</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>{c.auto_model}</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>{c.riskScore}</td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>
                    {c.fraud === 1 ? "Yes" : "No"}
                  </td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>
                    {c.probability != null ? c.probability.toFixed(2) : "-"}
                  </td>
                  <td style={{ padding: "0.6rem 0.8rem" }}>
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Dashboard;

