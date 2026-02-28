# 🎯 Explainable AI Integration - Complete Setup Guide

## ✅ Changes Made

### **Backend Updates**

#### 1. **[Claim.js](backend/models/Claim.js)** - Database Schema
Added explainability fields to MongoDB model:
- `status`: Risk level (Low/Medium/High/Critical)
- `confidence`: Prediction confidence (0-1)
- `top_contributing_factors`: Array of contributing features with importance scores
- `anomaly_score`: Anomaly detection score (0-1)
- `is_anomaly`: Boolean flag for anomalous claims
- `ensemble_votes`: Voting results from 3 ensemble models
- `model_agreement`: % of models that agree
- `model_version`: Version of the ML model (2.0-XAI)
- `explanation_method`: How the prediction was explained

#### 2. **[claimController.js](backend/controllers/claimController.js)** - Request Handler
Updated to capture and store all new explainability fields from ML API response.

---

### **Frontend Updates**

#### 1. **[ResultCard.jsx](frontend/src/components/ResultCard.jsx)** - Results Display
**New Features:**
- ✨ **Status Colors**: Dynamic color coding based on risk level
  - 🟢 Low Risk (Green)
  - 🟡 Medium Risk (Amber)
  - 🔴 High Risk (Red)
  - ⚠️ Critical (Dark Red)

- 📊 **Enhanced Metrics Display**:
  - Risk Score (0-100%)
  - Fraud Probability (%)
  - Status level
  - Model Confidence (%)

- 🤝 **Model Agreement Section**:
  - Shows consensus percentage across ensemble models
  - Visual indicator for model reliability

- 🔍 **Anomaly Detection**:
  - Anomaly score with interpretation
  - Warning when unusual patterns detected

- 🎯 **Top Contributing Factors**:
  - List of top 5 features influencing prediction
  - Importance percentage for each factor
  - Impact level badge (High/Medium/Low)

- 💡 **Detailed Reasons**:
  - Human-readable explanations
  - Multiple reason statements

- 📝 **Model Information Footer**:
  - Method used (SHAP + Feature Importance)
  - Model version
  - Final prediction status

---

## 🚀 Setup Instructions

### **Step 1: Install Dependencies**
```powershell
cd ml
pip install -r requirements.txt
```

### **Step 2: Retrain ML Models**
```powershell
python model.py
```

This generates:
- `fraud_model.pkl` - Random Forest
- `xgb_model.pkl` - XGBoost
- `dt_model.pkl` - Decision Tree
- `scaler.pkl` - Feature scaler
- `feature_names.pkl` - Feature list
- `feature_importance.pkl` - Feature importance weights

### **Step 3: Backup & Update API**
```powershell
# Backup old version
ren app.py app_heuristic_backup.py

# Switch to explainable version
ren app_explainable.py app.py
```

### **Step 4: Start Services**

**Terminal 1 - ML API:**
```powershell
cd ml
uvicorn app:app --reload --port 8000
```

**Terminal 2 - Backend Server:**
```powershell
cd backend
npm start
```

**Terminal 3 - Frontend:**
```powershell
cd frontend
npm run dev
```

---

## 📋 Testing Checklist

### **Via Postman (Direct ML API)**
```
POST http://localhost:8000/predict
```

Expected response includes:
- ✅ `fraud` (0 or 1)
- ✅ `probability` (0-1)
- ✅ `riskScore` (0-100)
- ✅ `status` (Low/Medium/High/Critical)
- ✅ `confidence` (0-1)
- ✅ `top_contributing_factors` (array)
- ✅ `anomaly_score` (0-1)
- ✅ `is_anomaly` (boolean)
- ✅ `ensemble_votes` (object)
- ✅ `model_agreement` (0-100)
- ✅ `explanation_method` ("SHAP + Feature Importance + Ensemble")

### **Via Backend API**
```
POST http://localhost:5000/api/predict
```

Same response + data stored in MongoDB

### **Via Frontend UI**
1. Fill claim form with test data
2. Submit prediction
3. Verify ResultCard displays:
   - ✅ Risk metrics
   - ✅ Model agreement
   - ✅ Anomaly detection
   - ✅ Contributing factors
   - ✅ Detailed reasons

---

## 🧪 Test Cases

### **Test 1: Low-Risk Claim**
- Expected: Risk Score < 20%, Status = "Low Risk"
- Contributing factors: Low importance scores

### **Test 2: High-Risk Claim**
- Expected: Risk Score > 70%, Status = "High Risk"
- Contributing factors: High importance on fraud-related features

### **Test 3: Anomalous Claim**
- Expected: High anomaly score, Anomaly flag = true
- Model agreement varies

---

## 📊 Feature Importance Interpretation

| Feature | Typical Impact | Why Important |
|---------|----------------|---------------|
| `total_claim_amount` | High | Fraud often involves inflated claims |
| `incident_severity` | High | Severe incidents can mask fraud |
| `property_damage` | Medium | Missing reports are suspicious |
| `insured_hobbies` | Medium | Risky hobbies correlate with claims |
| `incident_type` | Medium | Certain incidents are fraud-prone |

---

## 🔄 Ensemble Model Details

### **Random Forest (Primary)**
- 200 trees
- Provides feature importance
- Good at detecting patterns

### **XGBoost (Backup)**
- Gradient boosting
- Fast inference
- Good for edge cases

### **Decision Tree (Reference)**
- Interpretable decisions
- Simple rules
- Good for explainability

**Voting Strategy**: Prediction = 1 if 2+ models predict fraud, else 0

---

## 🎓 Understanding the Output

### **Status Levels**
- **Low Risk (Prob < 0.2)**: Safe to approve with minimal review
- **Medium Risk (0.2 ≤ Prob < 0.5)**: Standard review recommended
- **High Risk (0.5 ≤ Prob < 0.7)**: Detailed investigation required
- **Critical (Prob ≥ 0.7)**: Immediate escalation needed

### **Model Agreement**
- **100%**: All models agree → Very high confidence
- **66%**: Majority vote → Good confidence
- **33%**: Disagreement → Manual review recommended

### **Anomaly Score**
- **0.0-0.3**: Normal claim pattern
- **0.3-0.7**: Somewhat unusual
- **0.7-1.0**: Highly anomalous → Red flag for fraud

---

## 🚨 Known Limitations & Future Work

### **Current Implementation**
- ✅ Heuristic fallback if ML models unavailable
- ✅ SHAP integration ready (can be enabled in future)
- ✅ Ensemble voting across 3 models
- ✅ Anomaly detection active

### **Future Enhancements**
- [ ] Add SHAP detailed explanations per feature
- [ ] Implement LIME for local explanations
- [ ] Add user feedback loop for model retraining
- [ ] Create model performance dashboard
- [ ] Implement A/B testing framework
- [ ] Add investigator notes database

---

## 📞 Support & Debugging

### **If ML API fails to start:**
```powershell
# Check if port 8000 is in use
netstat -ano | findstr :8000

# Try different port
uvicorn app:app --reload --port 8001
```

### **If models aren't found:**
```powershell
# Ensure you've run model training
python model.py

# Check files exist
ls *.pkl
```

### **If database won't store results:**
```powershell
# Check MongoDB is running
# Verify connection in backend config
```

---

## 📝 Commit Message

```
feat: implement explainable AI fraud detection system (v2.0-XAI)

- Add feature importance tracking (SHAP-ready)
- Implement ensemble voting (RF, XGB, DT)
- Add anomaly detection (Isolation Forest)
- 4-level risk assessment (Low/Medium/High/Critical)
- Update MongoDB schema for explainability fields
- Enhanced ResultCard UI with contributing factors
- Model agreement metric & confidence scoring
- Fallback heuristic for robustness

Closes: #XAI-001
```

---

**Status**: ✅ **READY FOR TESTING**

All components integrated. Frontend UI enhanced. Backend models in place. Ready for end-to-end testing!
