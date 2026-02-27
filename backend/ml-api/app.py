from fastapi import FastAPI
from pydantic import BaseModel
from typing import List


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
  fraud_reported: str
  auto_make: str
  auto_model: str
  months_as_customer: float
  age: float
  policy_number: float
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


class PredictionOutput(BaseModel):
  fraud: int
  probability: float
  riskScore: int
  reasons: List[str]


app = FastAPI(title="Fraud Detection ML API")


@app.get("/")
def read_root():
  return {"message": "Fraud Detection ML API is running"}


@app.post("/predict", response_model=PredictionOutput)
def predict_claim(data: ClaimInput):
  # Simple heuristic using categorical and numeric fields to derive risk
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

  # Reported as fraud by someone
  if data.fraud_reported == "Yes":
    score += 20

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
  prob = float(round(score / 100.0, 2))
  fraud_flag = 1 if prob >= 0.5 else 0
  risk_score = int(round(prob * 100))

  reasons: List[str] = []
  if data.incident_severity in {"Total Loss", "Major Damage"}:
    reasons.append(f"Incident severity is {data.incident_severity}")
  if data.insured_hobbies in risky_hobbies:
    reasons.append(f"Risky hobby: {data.insured_hobbies}")
  if data.incident_type in {"Multi-vehicle Collision", "Vehicle Theft"}:
    reasons.append(f"High-risk incident type: {data.incident_type}")
  if data.property_damage == "Yes" and data.police_report_available == "No":
    reasons.append("Property damage without police report")
  if data.fraud_reported == "Yes":
    reasons.append("Fraud already reported flag is Yes")

  if not reasons:
    reasons.append("No strong fraud indicators")

  return PredictionOutput(
    fraud=fraud_flag,
    probability=round(prob, 2),
    riskScore=risk_score,
    reasons=reasons,
  )

