import { useState } from "react";
import ClaimForm from "../components/ClaimForm.jsx";
import ResultCard from "../components/ResultCard.jsx";

const Predict = () => {
  const [result, setResult] = useState(null);

  return (
    <section>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        Predict Fraud Risk
      </h1>
      <p style={{ fontSize: "0.92rem", color: "#9ca3af", marginBottom: "0.75rem" }}>
        Enter claim details below and click <strong>Predict Fraud</strong> to get a
        fraud probability, risk score, and explanation from the ML model.
      </p>
      <ClaimForm onResult={setResult} />
      <ResultCard result={result} />
    </section>
  );
};

export default Predict;

