# 🚀 Explainable AI Fraud Detection - Enhanced Response Format

## **Sample Response for HIGH-RISK Claim**

```json
{
  "fraud": 1,
  "probability": 0.78,
  "riskScore": 78,
  "status": "Critical",
  "confidence": 0.92,
  "reasons": [
    "Very high fraud probability (78.0%)",
    "Risky hobby identified: skydiving",
    "High-severity incident: Total Loss",
    "Property damage reported but no police report available",
    "Fraud already reported by claimant",
    "High claim amount: $32000",
    "High-risk incident type: Multi-vehicle Collision",
    "Anomalous claim pattern detected (anomaly score: 0.82)",
    "Top risk factor: total_claim_amount"
  ],
  "top_contributing_factors": [
    {
      "feature": "total_claim_amount",
      "importance": 0.1850,
      "impact": "High"
    },
    {
      "feature": "incident_severity",
      "importance": 0.1223,
      "impact": "High"
    },
    {
      "feature": "property_damage",
      "importance": 0.0945,
      "impact": "Medium"
    },
    {
      "feature": "insured_hobbies",
      "importance": 0.0823,
      "impact": "Medium"
    },
    {
      "feature": "incident_type",
      "importance": 0.0712,
      "impact": "Medium"
    }
  ],
  "anomaly_score": 0.823,
  "is_anomaly": true,
  "ensemble_votes": {
    "RandomForest": 1,
    "XGBoost": 1,
    "DecisionTree": 1
  },
  "model_agreement": 100.0,
  "model_version": "2.0-XAI",
  "explanation_method": "SHAP + Feature Importance + Ensemble"
}
```

---

## **Sample Response for LOW-RISK Claim**

```json
{
  "fraud": 0,
  "probability": 0.12,
  "riskScore": 12,
  "status": "Low Risk",
  "confidence": 0.95,
  "reasons": [
    "No strong fraud indicators detected"
  ],
  "top_contributing_factors": [
    {
      "feature": "months_as_customer",
      "importance": 0.0567,
      "impact": "Medium"
    },
    {
      "feature": "witnesses",
      "importance": 0.0445,
      "impact": "Low"
    }
  ],
  "anomaly_score": 0.12,
  "is_anomaly": false,
  "ensemble_votes": {
    "RandomForest": 0,
    "XGBoost": 0,
    "DecisionTree": 0
  },
  "model_agreement": 100.0,
  "model_version": "2.0-XAI",
  "explanation_method": "SHAP + Feature Importance + Ensemble"
}
```

---

## **Key Improvements Over Previous Version**

| Feature | Previous | New |
|---------|----------|-----|
| **Explainability** | Basic reasons | SHAP + Feature importance + Top factors |
| **Risk Assessment** | Binary fraud/non-fraud | 4-level status: Low/Medium/High/Critical |
| **Model Confidence** | None | 0-1 confidence score |
| **Ensemble** | Single model | 3 models voting (RF, XGB, DT) |
| **Model Agreement** | N/A | % agreement across models |
| **Anomaly Detection** | None | Isolation Forest anomaly scoring |
| **Feature Analysis** | Limited | Top 5 contributing features with importance |
| **Adaptive Learning** | Static | Version tracking for model updates |

---

## **Understanding the Output**

### **Risk Status Levels**
- 🟢 **Low Risk** (prob < 0.2): Safe to approve
- 🟡 **Medium Risk** (0.2 ≤ prob < 0.5): Review recommended
- 🔴 **High Risk** (0.5 ≤ prob < 0.7): Detailed investigation required
- ⚠️ **Critical** (prob ≥ 0.7 OR anomaly + fraud): Immediate escalation

### **Model Agreement**
- 100% = All 3 models agree → High confidence decision
- 66% = 2 out of 3 agree → Good confidence
- 33% = Models disagree → Manual review recommended

### **Anomaly Score**
- 0.0-0.3: Normal claim pattern
- 0.3-0.7: Somewhat unusual
- 0.7-1.0: Highly anomalous (potential fraud red flag)

### **Top Contributing Factors**
These are the features that most influenced the fraud prediction:
- **High Impact** (importance > 0.1): Very influential
- **Medium Impact** (0.05-0.1): Moderately influential
- **Low Impact** (< 0.05): Slightly influential

---

## **How to Use This in Frontend**

```jsx
// Display risk status with color coding
const getRiskColor = (status) => {
  switch(status) {
    case "Low Risk": return "#10b981"; // Green
    case "Medium Risk": return "#f59e0b"; // Amber
    case "High Risk": return "#ef4444"; // Red
    case "Critical": return "#dc2626"; // Dark Red
  }
};

// Show model agreement as confidence indicator
const ConfidenceBar = ({ modelAgreement, probability }) => (
  <div>
    <p>Model Agreement: {modelAgreement}%</p>
    <p>Prediction Confidence: {(modelAgreement/100 * probability).toFixed(2)}</p>
  </div>
);

// Display top contributing factors as a risk breakdown
const RiskFactorBreakdown = ({ factors }) => (
  <ul>
    {factors.map(f => (
      <li key={f.feature}>
        {f.feature}: {(f.importance*100).toFixed(2)}% influence [{f.impact}]
      </li>
    ))}
  </ul>
);
```

---

## **Next Steps: Adaptive Learning**

Once you have this working, add a `/feedback` endpoint:

```python
@app.post("/feedback")
def record_feedback(claim_id: str, actual_fraud: int, predicted_fraud: int):
    """
    Store feedback for model retraining
    - claim_id: unique claim identifier
    - actual_fraud: 1 if actually fraudulent, 0 otherwise
    - predicted_fraud: what the model predicted
    """
    # Log to database
    # Eventually retrain model on new data
    return {"status": "feedback recorded", "model_version": "2.0-XAI"}
```

This enables continuous improvement!
