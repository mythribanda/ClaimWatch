const Claim = require("../models/Claim");
const { predictFraud } = require("../services/mlService");

// POST /api/predict
exports.predictClaim = async (req, res) => {
  try {
    const {
      policy_state,
      policy_csl,
      insured_sex,
      insured_education_level,
      insured_occupation,
      insured_hobbies,
      insured_relationship,
      incident_type,
      collision_type,
      incident_severity,
      authorities_contacted,
      incident_state,
      incident_city,
      property_damage,
      police_report_available,
      fraud_reported,
      auto_make,
      auto_model,
      months_as_customer,
      age,
      policy_number,
      policy_deductable,
      policy_annual_premium,
      umbrella_limit,
      insured_zip,
      capital_gains,
      capital_loss,
      incident_hour_of_the_day,
      number_of_vehicles_involved,
      bodily_injuries,
      witnesses,
      total_claim_amount,
      injury_claim,
      property_claim,
      vehicle_claim,
      auto_year,
      policy_bind_date,
      incident_date
    } = req.body;

    const requiredFields = [
      "policy_state",
      "policy_csl",
      "insured_sex",
      "insured_education_level",
      "insured_occupation",
      "insured_hobbies",
      "insured_relationship",
      "incident_type",
      "collision_type",
      "incident_severity",
      "authorities_contacted",
      "incident_state",
      "incident_city",
      "property_damage",
      "police_report_available",
      "fraud_reported",
      "auto_make",
      "auto_model",
      "months_as_customer",
      "age",
      "policy_number",
      "policy_deductable",
      "policy_annual_premium",
      "umbrella_limit",
      "insured_zip",
      "capital_gains",
      "capital_loss",
      "incident_hour_of_the_day",
      "number_of_vehicles_involved",
      "bodily_injuries",
      "witnesses",
      "total_claim_amount",
      "injury_claim",
      "property_claim",
      "vehicle_claim",
      "auto_year",
      "policy_bind_date",
      "incident_date"
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    const mlPayload = {
      policy_state,
      policy_csl,
      insured_sex,
      insured_education_level,
      insured_occupation,
      insured_hobbies,
      insured_relationship,
      incident_type,
      collision_type,
      incident_severity,
      authorities_contacted,
      incident_state,
      incident_city,
      property_damage,
      police_report_available,
      fraud_reported,
      auto_make,
      auto_model,
      months_as_customer: Number(months_as_customer),
      age: Number(age),
      policy_number: Number(policy_number),
      policy_deductable: Number(policy_deductable),
      policy_annual_premium: Number(policy_annual_premium),
      umbrella_limit: Number(umbrella_limit),
      insured_zip: Number(insured_zip),
      capital_gains: Number(capital_gains),
      capital_loss: Number(capital_loss),
      incident_hour_of_the_day: Number(incident_hour_of_the_day),
      number_of_vehicles_involved: Number(number_of_vehicles_involved),
      bodily_injuries: Number(bodily_injuries),
      witnesses: Number(witnesses),
      total_claim_amount: Number(total_claim_amount),
      injury_claim: Number(injury_claim),
      property_claim: Number(property_claim),
      vehicle_claim: Number(vehicle_claim),
      auto_year: Number(auto_year),
      policy_bind_date,
      incident_date
    };

    const prediction = await predictFraud(mlPayload);

    const claim = new Claim({
      ...mlPayload,
      riskScore: prediction.riskScore,
      fraud: prediction.fraud,
      probability: prediction.probability,
      status: prediction.status || "Low Risk",
      confidence: prediction.confidence || 0,
      reasons: prediction.reasons || [],
      top_contributing_factors: prediction.top_contributing_factors || [],
      anomaly_score: prediction.anomaly_score || 0,
      is_anomaly: prediction.is_anomaly || false,
      ensemble_votes: prediction.ensemble_votes || {},
      model_agreement: prediction.model_agreement || 0,
      model_version: prediction.model_version || "2.0-XAI",
      explanation_method: prediction.explanation_method || "Heuristic"
    });

    await claim.save();

    return res.status(201).json(prediction);
  } catch (error) {
    console.error("Error in predictClaim:", error.message);
    return res
      .status(500)
      .json({ message: "Server error while predicting fraud" });
  }
};

// GET /api/claims
exports.getClaims = async (_req, res) => {
  try {
    const claims = await Claim.find().sort({ createdAt: -1 }).lean();
    return res.json(claims);
  } catch (error) {
    console.error("Error in getClaims:", error.message);
    return res
      .status(500)
      .json({ message: "Server error while fetching claims" });
  }
};

