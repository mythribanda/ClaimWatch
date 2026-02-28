import { useState } from "react";
import ClaimForm from "../components/ClaimForm.jsx";
import ResultCard from "../components/ResultCard.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

const Predict = () => {
  const [result, setResult] = useState(null);
  const theme = useTheme();

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
          📋 Claim Analysis
        </div>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            marginBottom: "0.75rem",
            color: theme.colors.text,
          }}
        >
          Analyze Claim
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: theme.colors.textSecondary,
            maxWidth: "600px",
          }}
        >
          Enter the claim details below and our AI model will assess the fraud risk in real-time using explainable predictions.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: result ? "1fr 1fr" : "1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        <div>
          <ClaimForm onResult={setResult} />
        </div>
        {result && (
          <div>
            <ResultCard result={result} />
          </div>
        )}
      </div>

      {!result && (
        <div
          style={{
            marginTop: "2rem",
            padding: "2rem",
            backgroundColor: theme.colors.bgSecondary,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: "0.75rem",
            textAlign: "center",
          }}
        >
          <p style={{ color: theme.colors.textSecondary, fontSize: "0.95rem" }}>
            Enter claim details on the left to get instant fraud detection results with SHAP explanations
          </p>
        </div>
      )}
    </section>
  );
};

export default Predict;

