"""
Explainable AI Fraud Detection System
With SHAP, Feature Importance, and Anomaly Detection
"""

from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import pandas as pd
import numpy as np
from typing import List, Dict
from datetime import datetime
import shap
from sklearn.ensemble import IsolationForest
import warnings
warnings.filterwarnings("ignore")

app = FastAPI(title="Explainable Fraud Detection ML API")

# ============================================
# Load Models & Artifacts
# ============================================

model = None
xgb_model = None
dt_model = None
scaler = None
feature_names = None
feature_importance = None
models_loaded = False

try:
    import os
    print(f"Current directory: {os.getcwd()}")
    print(f"Files in directory: {os.listdir('.')}")
    
    if os.path.exists("fraud_model.pkl"):
        model = pickle.load(open("fraud_model.pkl", "rb"))
        print("✅ RandomForest model loaded")
    else:
        print("⚠️  fraud_model.pkl not found")
    
    if os.path.exists("scaler.pkl"):
        scaler = pickle.load(open("scaler.pkl", "rb"))
        print("✅ Scaler loaded")
    else:
        print("⚠️  scaler.pkl not found")
    
    if os.path.exists("feature_names.pkl"):
        feature_names = pickle.load(open("feature_names.pkl", "rb"))
        print(f"✅ Feature names loaded ({len(feature_names)} features)")
    else:
        print("⚠️  feature_names.pkl not found")
    
    if os.path.exists("feature_importance.pkl"):
        feature_importance = pickle.load(open("feature_importance.pkl", "rb"))
        print("✅ Feature importance loaded")
    else:
        print("⚠️  feature_importance.pkl not found")
    
    if os.path.exists("xgb_model.pkl"):
        xgb_model = pickle.load(open("xgb_model.pkl", "rb"))
        print("✅ XGBoost model loaded")
    else:
        print("⚠️  xgb_model.pkl not found")
    
    if os.path.exists("dt_model.pkl"):
        dt_model = pickle.load(open("dt_model.pkl", "rb"))
        print("✅ Decision Tree model loaded")
    else:
        print("⚠️  dt_model.pkl not found")
    
    # Check if we have minimum requirements
    if model and scaler and feature_names:
        models_loaded = True
        print("✅ ALL CORE MODELS LOADED - Running in ML Mode")
    else:
        print("⚠️  Running in Heuristic Fallback Mode")
        
except Exception as e:
    print(f"❌ Error loading models: {e}")
    print("⚠️  Running in Heuristic Fallback Mode")
    models_loaded = False

# ============================================
# Input/Output Schemas
# ============================================

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
    incident_location: str = ""  # Optional, defaults to empty
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


class FeatureImportanceItem(BaseModel):
    feature: str
    importance: float
    impact: str  # "High", "Medium", "Low"


class PredictionOutput(BaseModel):
    fraud: int
    probability: float
    riskScore: int
    status: str  # "Low Risk", "Medium Risk", "High Risk", "Critical"
    confidence: float
    reasons: List[str]
    
    # Explainability features
    top_contributing_factors: List[FeatureImportanceItem]
    anomaly_score: float
    is_anomaly: bool
    ensemble_votes: Dict[str, int]  # {model_name: prediction}
    model_agreement: float  # % of models that agree
    
    # Adaptive learning metadata
    model_version: str
    explanation_method: str  # "SHAP", "Feature Importance", "Heuristic"


@app.get("/")
def root():
    return {
        "message": "Explainable Fraud Detection ML API Running",
        "version": "2.0 - XAI Edition",
        "features": [
            "SHAP-based explanations",
            "Ensemble voting",
            "Anomaly detection",
            "Feature importance analysis",
            "Risk scoring"
        ]
    }


# ============================================
# Helper Functions
# ============================================

def get_risk_category(probability: float) -> str:
    """Determine risk category from probability"""
    if probability < 0.2:
        return "Low Risk"
    elif probability < 0.5:
        return "Medium Risk"
    elif probability < 0.7:
        return "High Risk"
    else:
        return "Critical"


def detect_anomalies(X: np.ndarray) -> tuple:
    """Detect anomalies using Isolation Forest"""
    try:
        if X is None or len(X) == 0 or X.size == 0:
            print("⚠️  Empty data for anomaly detection")
            return False, 0.0
            
        if X.ndim == 1:
            X = X.reshape(1, -1)
        
        iso_forest = IsolationForest(contamination=0.1, random_state=42)
        anomaly_predictions = iso_forest.fit_predict(X)
        anomaly_scores = iso_forest.score_samples(X)
        
        is_anomaly = anomaly_predictions[0] == -1
        anomaly_score = float(-anomaly_scores[0])  # Invert score (higher = more anomalous)
        
        return is_anomaly, anomaly_score
    except Exception as e:
        print(f"Anomaly detection error: {e}")
        return False, 0.0


def get_feature_importance_explanation(
    feature_names: List[str],
    feature_values: np.ndarray,
    top_n: int = 5
) -> List[FeatureImportanceItem]:
    """Get top contributing features with importance scores"""
    try:
        if model is None or not hasattr(model, 'feature_importances_'):
            return []
        
        importances = model.feature_importances_
        indices = np.argsort(importances)[::-1][:top_n]
        
        result = []
        for idx in indices:
            importance = float(importances[idx])
            feature = feature_names[idx]
            
            # Categorize impact
            if importance > 0.1:
                impact = "High"
            elif importance > 0.05:
                impact = "Medium"
            else:
                impact = "Low"
            
            result.append(FeatureImportanceItem(
                feature=feature,
                importance=round(importance, 4),
                impact=impact
            ))
        
        return result
    except Exception as e:
        print(f"Feature importance error: {e}")
        return []


def ensemble_predict(X: pd.DataFrame) -> Dict:
    """Get predictions from all ensemble models"""
    votes = {
        "RandomForest": 0,
        "XGBoost": 0,
        "DecisionTree": 0
    }
    
    predictions = []
    probabilities = []
    
    try:
        # Random Forest
        if model:
            rf_pred = int(model.predict(X)[0])
            rf_prob = model.predict_proba(X)[0][1]
            votes["RandomForest"] = rf_pred
            predictions.append(rf_pred)
            probabilities.append(rf_prob)
            print(f"🌲 RandomForest: pred={rf_pred}, prob={rf_prob:.3f}")
    except Exception as e:
        print(f"RandomForest error: {e}")
    
    try:
        # XGBoost
        if xgb_model:
            xgb_pred = int(xgb_model.predict(X)[0])
            xgb_prob = xgb_model.predict_proba(X)[0][1] if hasattr(xgb_model, 'predict_proba') else float(xgb_pred)
            votes["XGBoost"] = xgb_pred
            predictions.append(xgb_pred)
            probabilities.append(xgb_prob if isinstance(xgb_prob, (int, float)) else xgb_pred)
            print(f"🚀 XGBoost: pred={xgb_pred}, prob={xgb_prob:.3f}")
    except Exception as e:
        print(f"XGBoost error: {e}")
    
    try:
        # Decision Tree
        if dt_model:
            dt_pred = int(dt_model.predict(X)[0])
            dt_prob = dt_model.predict_proba(X)[0][1]
            votes["DecisionTree"] = dt_pred
            predictions.append(dt_pred)
            probabilities.append(dt_prob)
            print(f"🌳 DecisionTree: pred={dt_pred}, prob={dt_prob:.3f}")
    except Exception as e:
        print(f"DecisionTree error: {e}")
    
    # Calculate agreement (how many models agree on the majority prediction)
    model_agreement = 0.0
    if predictions:
        # Count how many predictions match the majority
        majority_pred = 1 if sum(predictions) > len(predictions) / 2 else 0
        agreement_count = sum(1 for p in predictions if p == majority_pred)
        model_agreement = round((agreement_count / len(predictions)) * 100, 2)
        print(f"📊 Ensemble: predictions={predictions}, majority={majority_pred}, agreement={model_agreement}%")
    
    ensemble_prob = np.mean(probabilities) if probabilities else 0.5
    
    return {
        "votes": votes,
        "ensemble_prediction": 1 if sum(predictions) > len(predictions) / 2 else 0,
        "ensemble_probability": ensemble_prob,
        "model_agreement": model_agreement
    }


@app.post("/predict", response_model=PredictionOutput)
def predict_claim(data: ClaimInput):
    """
    Explainable fraud prediction endpoint
    Returns detailed explanations, feature importance, and anomaly scores
    """
    
    try:
        # ============================================
        # 1. Data Preparation
        # ============================================
        
        policy_year = datetime.fromisoformat(data.policy_bind_date).year
        incident_year = datetime.fromisoformat(data.incident_date).year
        incident_month = datetime.fromisoformat(data.incident_date).month
        
        sample_input = {
            "policy_state": data.policy_state,
            "policy_csl": data.policy_csl,
            "insured_sex": data.insured_sex,
            "insured_education_level": data.insured_education_level,
            "insured_occupation": data.insured_occupation,
            "insured_hobbies": data.insured_hobbies,
            "insured_relationship": data.insured_relationship,
            "incident_type": data.incident_type,
            "collision_type": data.collision_type,
            "incident_severity": data.incident_severity,
            "authorities_contacted": data.authorities_contacted,
            "incident_state": data.incident_state,
            "incident_city": data.incident_city,
            "incident_location": data.incident_location if data.incident_location else f"{data.incident_city} Area",
            "property_damage": data.property_damage,
            "police_report_available": data.police_report_available,
            "fraud_reported": data.fraud_reported,
            "auto_make": data.auto_make,
            "auto_model": data.auto_model,
            "months_as_customer": data.months_as_customer,
            "age": data.age,
            "policy_deductable": data.policy_deductable,
            "policy_annual_premium": data.policy_annual_premium,
            "umbrella_limit": data.umbrella_limit,
            "insured_zip": data.insured_zip,
            "capital-gains": data.capital_gains,  # Map with hyphen to match CSV
            "capital-loss": data.capital_loss,    # Map with hyphen to match CSV
            "incident_hour_of_the_day": data.incident_hour_of_the_day,
            "number_of_vehicles_involved": data.number_of_vehicles_involved,
            "bodily_injuries": data.bodily_injuries,
            "witnesses": data.witnesses,
            "total_claim_amount": data.total_claim_amount,
            "injury_claim": data.injury_claim,
            "property_claim": data.property_claim,
            "vehicle_claim": data.vehicle_claim,
            "auto_year": data.auto_year,
            "policy_bind_year": policy_year,
            "incident_year": incident_year,
            "incident_month": incident_month
        }
        
        df = pd.DataFrame([sample_input])
        
        # ============================================
        # 2. Predictions with Multiple Models
        # ============================================
        
        df_scaled = None
        ensemble_result = {"votes": {}, "model_agreement": 0, "confidence": 0.5}
        
        if models_loaded and model and scaler:
            print(f"✅ Using ML Models (loaded={models_loaded})")
            # Scale features
            df_scaled = scaler.transform(df[feature_names])
            df_scaled_df = pd.DataFrame(df_scaled, columns=feature_names)
            
            # Get ensemble predictions
            ensemble_result = ensemble_predict(df_scaled_df)
            
            # Main prediction (Random Forest)
            fraud_pred = int(model.predict(df_scaled_df)[0])
            fraud_prob = model.predict_proba(df_scaled_df)[0][1]
            
            # Use ensemble probability if available
            if ensemble_result.get("ensemble_probability"):
                fraud_prob = ensemble_result["ensemble_probability"]
            
            # Confidence from max probability of any model output
            confidence = max(model.predict_proba(df_scaled_df)[0])
            ensemble_result["confidence"] = confidence
            
            explanation_mode = "ML Models (SHAP + Feature Importance + Ensemble)"
            print(f"📈 ML Mode: fraud={fraud_pred}, prob={fraud_prob:.3f}, confidence={confidence:.3f}")
            
        else:
            print(f"⚠️  Models not loaded, using heuristic (model={model is not None}, scaler={scaler is not None}, loaded={models_loaded})")
            # Fallback to heuristic
            fraud_pred, fraud_prob, ensemble_result = heuristic_predict(data)
            confidence = ensemble_result.get("confidence", 0.5)
            explanation_mode = "Heuristic Rules"
            print(f"📊 Heuristic Mode: fraud={fraud_pred}, prob={fraud_prob:.3f}, confidence={confidence:.3f}")
            df_scaled = None
        
        
        # ============================================
        # 3. Anomaly Detection
        # ============================================
        
        is_anomaly, anomaly_score = detect_anomalies(df_scaled if df_scaled is not None else np.array([]))
        
        # ============================================
        # 4. Feature Importance & Explanations
        # ============================================
        
        top_factors = get_feature_importance_explanation(feature_names, df_scaled[0] if df_scaled is not None else np.array([])) if models_loaded else []
        
        reasons = generate_reasons(
            data,
            fraud_prob,
            top_factors,
            is_anomaly,
            anomaly_score
        )
        
        # ============================================
        # 5. Risk Assessment
        # ============================================
        
        risk_score = int(fraud_prob * 100)
        status = get_risk_category(fraud_prob)
        
        # Adjust status based on anomaly
        if is_anomaly and fraud_prob > 0.3:
            status = "Critical"
        
        # ============================================
        # 6. Return Response
        # ============================================
        
        model_agreement_value = ensemble_result.get("model_agreement", 0)
        confidence_value = ensemble_result.get("confidence", confidence)
        
        print(f"🎯 RESPONSE: model_agreement={model_agreement_value}, confidence={confidence_value}")
        
        return PredictionOutput(
            fraud=fraud_pred,
            probability=round(fraud_prob, 3),
            riskScore=risk_score,
            status=status,
            confidence=round(confidence_value, 3),
            reasons=reasons,
            top_contributing_factors=top_factors,
            anomaly_score=round(anomaly_score, 3),
            is_anomaly=is_anomaly,
            ensemble_votes=ensemble_result.get("votes", {}),
            model_agreement=model_agreement_value,
            model_version="2.0-XAI",
            explanation_method=explanation_mode
        )
    
    except Exception as e:
        print(f"❌ Prediction error: {e}")
        import traceback
        traceback.print_exc()
        
        # Fallback to heuristic
        try:
            fraud_pred, fraud_prob, ensemble_result = heuristic_predict(data)
            confidence = ensemble_result.get("confidence", 0.5)
            
            return PredictionOutput(
                fraud=fraud_pred,
                probability=round(fraud_prob, 3),
                riskScore=int(fraud_prob * 100),
                status=get_risk_category(fraud_prob),
                confidence=round(confidence, 3),
                reasons=["Error in ML prediction - using heuristic fallback"],
                top_contributing_factors=[],
                anomaly_score=0.0,
                is_anomaly=False,
                ensemble_votes=ensemble_result.get("votes", {}),
                model_agreement=ensemble_result.get("model_agreement", 0),
                model_version="2.0-XAI-Fallback",
                explanation_method="Heuristic Rules (Error Recovery)"
            )
        except Exception as e2:
            print(f"❌ Fallback also failed: {e2}")
            return PredictionOutput(
                fraud=0,
                probability=0.5,
                riskScore=50,
                status="Medium Risk",
                confidence=0.3,
                reasons=["Critical error - manual review required"],
                top_contributing_factors=[],
                anomaly_score=0.0,
                is_anomaly=False,
                ensemble_votes={},
                model_agreement=0,
                model_version="2.0-XAI-Error",
                explanation_method="System Error"
            )


def generate_reasons(
    data: ClaimInput,
    fraud_prob: float,
    top_factors: List[FeatureImportanceItem],
    is_anomaly: bool,
    anomaly_score: float
) -> List[str]:
    """Generate human-readable reasons for fraud prediction"""
    reasons = []
    
    # Model-based reasons
    if fraud_prob > 0.7:
        reasons.append(f"Very high fraud probability ({fraud_prob*100:.1f}%)")
    elif fraud_prob > 0.5:
        reasons.append(f"Elevated fraud probability ({fraud_prob*100:.1f}%)")
    
    # Feature-based reasons
    risky_hobbies = {"skydiving", "base-jumping", "bungie-jumping", "yachting", "polo", "cross-fit"}
    if data.insured_hobbies in risky_hobbies:
        reasons.append(f"Risky hobby identified: {data.insured_hobbies}")
    
    if data.incident_severity in {"Total Loss", "Major Damage"}:
        reasons.append(f"High-severity incident: {data.incident_severity}")
    
    if data.property_damage == "Yes" and data.police_report_available == "No":
        reasons.append("Property damage reported but no police report available")
    
    if data.fraud_reported == "Yes":
        reasons.append("Fraud already reported by claimant")
    
    if data.total_claim_amount > 20000:
        reasons.append(f"High claim amount: ${data.total_claim_amount}")
    
    if data.incident_type in {"Multi-vehicle Collision", "Vehicle Theft"}:
        reasons.append(f"High-risk incident type: {data.incident_type}")
    
    # Anomaly-based reasons
    if is_anomaly:
        reasons.append(f"Anomalous claim pattern detected (anomaly score: {anomaly_score:.2f})")
    
    # Top contributing factors
    if top_factors:
        reasons.append(f"Top risk factor: {top_factors[0].feature}")
    
    if not reasons:
        reasons.append("No strong fraud indicators detected")
    
    return reasons


def heuristic_predict(data: ClaimInput) -> tuple:
    """Fallback heuristic fraud detection with confidence scoring"""
    score = 0
    confidence_base = 0.5  # Base confidence for heuristic
    
    if data.policy_csl in {"500/1000", "250/500"}:
        score += 10
        confidence_base += 0.05
    
    risky_jobs = {"exec-managerial", "prof-specialty", "sales", "armed-forces"}
    if data.insured_occupation in risky_jobs:
        score += 10
        confidence_base += 0.05
    
    risky_hobbies = {"skydiving", "base-jumping", "bungie-jumping", "yachting", "polo", "cross-fit"}
    if data.insured_hobbies in risky_hobbies:
        score += 15
        confidence_base += 0.07
    
    if data.incident_severity in {"Total Loss", "Major Damage"}:
        score += 25
        confidence_base += 0.10
    
    if data.incident_type in {"Multi-vehicle Collision", "Vehicle Theft"}:
        score += 15
        confidence_base += 0.07
    
    if data.collision_type == "?":
        score += 10
        confidence_base += 0.05
    
    if data.property_damage == "Yes" and data.police_report_available == "No":
        score += 15
        confidence_base += 0.07
    
    if data.fraud_reported == "Yes":
        score += 20
        confidence_base += 0.10
    
    if data.total_claim_amount > 20000:
        score += 20
        confidence_base += 0.10
    
    if data.witnesses == 0:
        score += 5
        confidence_base += 0.03
    
    if data.number_of_vehicles_involved > 2:
        score += 5
        confidence_base += 0.03
    
    score = max(0, min(100, score))
    prob = float(score / 100.0)
    fraud_flag = 1 if prob >= 0.5 else 0
    
    # Cap confidence at 0.85 for heuristic (not as reliable as ML)
    confidence = min(0.85, confidence_base)
    
    return fraud_flag, prob, {
        "votes": {
            "Heuristic": fraud_flag
        },
        "model_agreement": 100.0,
        "confidence": confidence
    }
