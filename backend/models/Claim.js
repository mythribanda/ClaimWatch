const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    policy_state: { type: String, required: true },
    policy_csl: { type: String, required: true },
    insured_sex: { type: String, required: true },
    insured_education_level: { type: String, required: true },
    insured_occupation: { type: String, required: true },
    insured_hobbies: { type: String, required: true },
    insured_relationship: { type: String, required: true },
    incident_type: { type: String, required: true },
    collision_type: { type: String, required: true },
    incident_severity: { type: String, required: true },
    authorities_contacted: { type: String, required: true },
    incident_state: { type: String, required: true },
    incident_city: { type: String, required: true },
    property_damage: { type: String, required: true },
    police_report_available: { type: String, required: true },
    auto_make: { type: String, required: true },
    auto_model: { type: String, required: true },
    months_as_customer: { type: Number, required: true },
    age: { type: Number, required: true },
    policy_number: { type: Number, required: true },
    policy_deductable: { type: Number, required: true },
    policy_annual_premium: { type: Number, required: true },
    umbrella_limit: { type: Number, required: true },
    insured_zip: { type: Number, required: true },
    capital_gains: { type: Number, required: true },
    capital_loss: { type: Number, required: true },
    incident_hour_of_the_day: { type: Number, required: true },
    number_of_vehicles_involved: { type: Number, required: true },
    bodily_injuries: { type: Number, required: true },
    witnesses: { type: Number, required: true },
    total_claim_amount: { type: Number, required: true },
    injury_claim: { type: Number, required: true },
    property_claim: { type: Number, required: true },
    vehicle_claim: { type: Number, required: true },
    auto_year: { type: Number, required: true },
    policy_bind_date: { type: Date, required: true },
    incident_date: { type: Date, required: true },
    riskScore: { type: Number, required: true },
    fraud: { type: Number, required: true },
    probability: { type: Number, required: true },
    status: { type: String, enum: ["Low Risk", "Medium Risk", "High Risk", "Critical"], default: "Low Risk" },
    confidence: { type: Number, default: 0 },
    reasons: [{ type: String }],
    
    // Explainability fields
    top_contributing_factors: [
      {
        feature: String,
        importance: Number,
        impact: { type: String, enum: ["High", "Medium", "Low"] }
      }
    ],
    anomaly_score: { type: Number, default: 0 },
    is_anomaly: { type: Boolean, default: false },
    ensemble_votes: {
      RandomForest: Number,
      XGBoost: Number,
      DecisionTree: Number
    },
    model_agreement: { type: Number, default: 0 },
    model_version: { type: String, default: "2.0-XAI" },
    explanation_method: { type: String, default: "Heuristic" }
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: false }
  }
);

module.exports = mongoose.model("Claim", claimSchema);

