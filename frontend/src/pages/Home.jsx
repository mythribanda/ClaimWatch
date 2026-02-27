const Home = () => {
  return (
    <section>
      <h1 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.75rem" }}>
        Insurance Claim Fraud Detection
      </h1>
      <p style={{ fontSize: "0.98rem", color: "#d1d5db", maxWidth: "640px" }}>
        Use this tool to estimate the fraud risk for incoming insurance claims. The
        model analyzes claim amount, customer age, claim history, and hospital risk to
        generate a risk score, fraud probability, and human-readable explanation.
      </p>
      <p style={{ fontSize: "0.9rem", color: "#9ca3af", marginTop: "1rem" }}>
        Go to the <strong>Predict</strong> page to run a new prediction, or open the{" "}
        <strong>Dashboard</strong> to review previous claims stored in MongoDB.
      </p>
    </section>
  );
};

export default Home;

