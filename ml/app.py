from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import pandas as pd
from typing import List
from datetime import datetime

app = FastAPI(title="Fraud Detection ML API")

# Heuristic-based fraud detection - no ML model files needed


# Input Schema
class ClaimInput(BaseModel):

  policy_state: str
  policy_csl: str
  insured_sex: str
  insured_education_level: str
  insured_occupation: str
  insured_hobbies: str
  insured_relationship: str

  incident_type: str
  collision_type: str
  incident_severity: str
  authorities_contacted: str
  incident_state: str
  incident_city: str

  property_damage: str
  police_report_available: str

  auto_make: str
  auto_model: str

  months_as_customer: float
  age: float

  policy_deductable: float
  policy_annual_premium: float
  umbrella_limit: float
  insured_zip: float

  capital_gains: float
  capital_loss: float

  incident_hour_of_the_day: float
  number_of_vehicles_involved: float
  bodily_injuries: float
  witnesses: float

  total_claim_amount: float
  injury_claim: float
  property_claim: float
  vehicle_claim: float

  auto_year: float

  policy_bind_date: str
  incident_date: str


# Output Schema
class PredictionOutput(BaseModel):
  fraud: int
  probability: float
  riskScore: int
  reasons: List[str]
  confidence: float = 0.8
  anomaly_score: float = 0.0
  is_anomaly: bool = False
  top_contributing_factors: List[dict] = []
  model_agreement: int = 100
  explanation_method: str = "Heuristic"
  status: str = "Low Risk"


@app.get("/")
def root():
    return {"message":"ML Fraud API Running"}


@app.post("/predict", response_model=PredictionOutput)
def predict_claim(data: ClaimInput):
    # Heuristic-based fraud detection (no encoder dependencies)
    score = 0

    # Higher coverage limits can indicate higher exposure
    if data.policy_csl in {"500/1000", "250/500"}:
        score += 10

    # Occupations with more financial exposure
    risky_jobs = {
        "exec-managerial",
        "prof-specialty",
        "sales",
        "armed-forces",
    }
    if data.insured_occupation in risky_jobs:
        score += 10

    # Risky hobbies
    risky_hobbies = {
        "skydiving",
        "base-jumping",
        "bungie-jumping",
        "yachting",
        "polo",
        "cross-fit",
    }
    if data.insured_hobbies in risky_hobbies:
        score += 15

    # Severe incidents
    if data.incident_severity in {"Total Loss", "Major Damage"}:
        score += 25

    # Certain incident types generally higher risk
    if data.incident_type in {
        "Multi-vehicle Collision",
        "Vehicle Theft",
    }:
        score += 15

    # Questionable collision / damage reporting
    if data.collision_type == "?":
        score += 10
    if data.property_damage == "Yes" and data.police_report_available == "No":
        score += 15

    # Incorporate numeric dimensions
    if data.total_claim_amount > 20000:
        score += 20
    if data.witnesses == 0:
        score += 5
    if data.number_of_vehicles_involved > 2:
        score += 5
    if data.injury_claim > 10000 or data.property_claim > 10000 or data.vehicle_claim > 15000:
        score += 10

    # Bound and convert score to probability
    score = max(0, min(100, score))
    prob = float(round(score / 100.0, 3))
    fraud_flag = 1 if prob >= 0.5 else 0
    risk_score = int(round(prob * 100))

    reasons = []
    if data.incident_severity in {"Total Loss", "Major Damage"}:
        reasons.append(f"Incident severity is {data.incident_severity}")
    if data.insured_hobbies in risky_hobbies:
        reasons.append(f"Risky hobby: {data.insured_hobbies}")
    if data.incident_type in {"Multi-vehicle Collision", "Vehicle Theft"}:
        reasons.append(f"High-risk incident type: {data.incident_type}")
    if data.property_damage == "Yes" and data.police_report_available == "No":
        reasons.append("Property damage without police report")
    if data.total_claim_amount > 20000:
        reasons.append(f"High claim amount: ${data.total_claim_amount}")

    if not reasons:
        reasons.append("No strong fraud indicators")

    # Determine status based on risk score
    if risk_score >= 70:
        status = "High Risk"
    elif risk_score >= 40:
        status = "Medium Risk"
    else:
        status = "Low Risk"

    # Calculate contributing factors
    top_factors = []
    if data.incident_severity in {"Total Loss", "Major Damage"}:
        top_factors.append({"feature": f"Incident Severity ({data.incident_severity})", "importance": 0.25})
    if data.insured_hobbies in risky_hobbies:
        top_factors.append({"feature": f"Risky Hobby ({data.insured_hobbies})", "importance": 0.15})
    if data.total_claim_amount > 20000:
        top_factors.append({"feature": f"High Claim Amount (${data.total_claim_amount})", "importance": 0.20})
    if data.property_damage == "Yes" and data.police_report_available == "No":
        top_factors.append({"feature": "Property Damage without Police Report", "importance": 0.15})

    return PredictionOutput(
        fraud=fraud_flag,
        probability=prob,
        riskScore=risk_score,
        reasons=reasons,
        confidence=prob,  # Use probability as confidence
        anomaly_score=min(prob * 2, 1.0),  # Anomaly score based on fraud probability
        is_anomaly=prob >= 0.5,
        top_contributing_factors=top_factors,
        model_agreement=100 if len(top_factors) > 0 else 75,
        explanation_method="Heuristic Rules Engine",
        status=status,
    )