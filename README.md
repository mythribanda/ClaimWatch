## ClaimWatch: Explainable AI/ML Fraud Detection System

An advanced fraud detection application built with MERN stack and explainable AI principles. This system combines rule-based heuristics with transparent decision-making to detect insurance claim fraud while providing comprehensive explanations for every prediction.

### 🎯 Project Overview

**ClaimWatch** is a fraud detection system designed to identify potentially fraudulent insurance claims with **full transparency**. Unlike conventional black-box ML models, our approach prioritizes **explainability** - users can understand exactly why a claim is flagged as fraudulent.

#### Key Features:
- 🔍 **Explainable Predictions**: Every fraud detection includes detailed reasons and contributing factors
- 📊 **Real-time Analysis**: Instant fraud risk assessment for insurance claims
- 📈 **Comprehensive Dashboard**: Track all analyzed claims with statistical insights
- 💡 **Transparent Decision Logic**: Rule-based heuristics with clear audit trails
- 🎨 **Professional UI**: Modern React frontend with dark/light mode support
- 🔐 **Data Security**: MongoDB integration for claim history and analytics

---

### 📚 Understanding Explainable AI (XAI)

**What is Explainable AI?**

Explainable AI refers to machine learning systems where the decision-making process is transparent and interpretable to humans. Instead of treating predictions as "black boxes," XAI systems provide:

1. **Transparency**: Clear understanding of how decisions are made
2. **Interpretability**: Humans can follow the logic step-by-step
3. **Accountability**: Decisions can be audited and justified
4. **Trust**: Stakeholders understand and trust the system

** ClaimWatch's XAI Approach:**

Our system uses **Rule-Based Heuristics** combined with **Transparency Metrics**:

| XAI Component | Description |
|---------------|-------------|
| **Fraud Indicators** | Clear rules checking specific claim characteristics |
| **Confidence Scores** | Probability of fraud detection (0-100%) |
| **Anomaly Scores** | Deviation from normal claim patterns (0-100%) |
| **Contributing Factors** | Top 3-5 reasons influencing the prediction |
| **Risk Status** | Human-readable risk levels (Low/Medium/High Risk) |
| **Model Agreement** | Confidence in the prediction (0-100%) |

---

### 🔄 How It Works: Fraud Detection Process

#### Step 1: Data Collection
User submits claim details through the React form including:
- Policy information (state, CSL, deductible, premium)
- Insured details (age, occupation, hobbies)
- Incident details (type, severity, location, time)
- Claim amounts (total, injury, property, vehicle)
- Supporting evidence (police report, witnesses)

#### Step 2: Rule-Based Analysis
The ML API applies heuristic rules to detect fraud indicators:

**Scoring System (0-100):**
- High-risk occupations: +10
- Risky hobbies (skydiving, yacht racing): +15
- Severe incidents (Total Loss, Major Damage): +25
- High-risk incident types (theft, multi-vehicle collision): +15
- Missing documentation (no police report with property damage): +15
- Unusual claim amounts (>$20,000): +20
- Missing witnesses or suspicious involvement: +5-10

#### Step 3: Fraud Probability Calculation
```
Fraud Probability = (Risk Score / 100)
Fraud Flag = 1 if Probability ≥ 0.5, else 0
```

#### Step 4: Explainability Generation
For each prediction, the system generates:
- **Confidence**: Based on fraud probability
- **Anomaly Score**: Deviation from baseline claims
- **Contributing Factors**: Top 3-5 reasons for the score
- **Status**: Risk level categorization

#### Step 5: Data Persistence
Results are saved to MongoDB with full audit trail for future analysis and compliance.

---

### ⚡  ClaimWatch vs. Conventional ML Models

#### Conventional Black-Box ML Models

| Aspect | Black-Box ML | SmartIntern (XAI) |
|--------|-------------|------------------|
| **Interpretability** | ❌ Cannot explain why | ✅ Clear rule-based logic |
| **Transparency** | ❌ Hidden decision process | ✅ Every decision auditable |
| **Bias Detection** | ❌ Hard to identify bias | ✅ Easy to audit rules |
| **Regulatory Compliance** | ❌ Difficult to justify | ✅ Full compliance audit trail |
| **User Trust** | ❌ "Trust me" approach | ✅ "Trust but verify" approach |
| **Debugging Errors** | ❌ Hard to diagnose issues | ✅ Easy to trace errors |
| **Customization** | ❌ Fixed model weights | ✅ Adjustable rule thresholds |
| **Stakeholder Buy-in** | ❌ Requires acceptance | ✅ Clear justification |

#### Example Comparison

**Black-Box Model Output:**
```
Prediction: Fraud (84% probability)
Confidence: High
[No explanation provided]
```

** ClaimWatch Output:**
```
Prediction: High Risk Fraud (84% probability)
Confidence: 84%
Anomaly Score: 42%
Model Agreement: 100%

Contributing Factors:
1. Incident Severity (Total Loss) - 25% importance
2. High Claim Amount ($45,000) - 20% importance
3. Risky Hobby (Skydiving) - 15% importance

Reasons:
- Incident severity is Total Loss
- High claim amount: $45,000
- Risky hobby: Skydiving
```

---

### 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│               React Frontend (Vite)                      │
│  - Claim Form Submission                                │
│  - Real-time Result Display                             │
│  - Fraud History Dashboard                              │
│  - Theme Switching (Dark/Light)                         │
└──────────────────┬──────────────────────────────────────┘
                   │ POST /api/predict
                   ▼
┌─────────────────────────────────────────────────────────┐
│         Node.js Backend (Express)                       │
│  - REST API Routes                                      │
│  - Request Validation                                   │
│  - MongoDB Integration                                  │
│  - ML Service Gateway                                   │
└──────────────────┬──────────────────────────────────────┘
                   │ POST /predict
                   ▼
┌─────────────────────────────────────────────────────────┐
│    Python ML API (FastAPI) - Explainable AI             │
│  - Rule-Based Fraud Detection                           │
│  - One-Hot Encoding for Categories                      │
│  - Risk Score Calculation                               │
│  - Contributing Factors Analysis                        │
│  - Response Generation with XAI Fields                  │
└─────────────────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│         MongoDB (Data Persistence)                      │
│  - Claim Records                                        │
│  - Prediction History                                   │
│  - Audit Trail                                          │
└─────────────────────────────────────────────────────────┘
```

---

### 🚀 High-Level Flow

1. **Claim Submission**: User fills fraud detection form
2. **Frontend Processing**: React validates and formats data
3. **Backend Request**: Node.js forwards to ML API
4. **Fraud Analysis**: FastAPI applies heuristic rules
5. **XAI Generation**: System creates explainable results
6. **Data Storage**: MongoDB saves with audit trail
7. **Dashboard Update**: Real-time display of results

---

### 📋 Features & Metrics

#### Prediction Output Includes:
- `fraud`: Binary fraud flag (0/1)
- `probability`: Fraud probability (0.0-1.0)
- `riskScore`: Integer risk score (0-100)
- `confidence`: Confidence level (0-100%)
- `anomaly_score`: Deviation from normal (0-100%)
- `top_contributing_factors`: List of key fraud indicators
- `model_agreement`: Consensus score (0-100%)
- `status`: Risk status (Low/Medium/High Risk)
- `reasons`: Human-readable explanation list
- `explanation_method`: "Heuristic Rules Engine"

#### Dashboard Analytics:
- Total claims analyzed
- Fraud detection rate
- Risk distribution breakdown
- Temporal trends
- Status categorization

---

### 🔧 Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (v9+)
- **Python** (3.9+)
- **MongoDB** (running locally or cloud)
- **Git** (for version control)

---

### 📦 Installation & Setup

#### Backend (Node.js API)

```bash
cd backend
npm install
# Set environment variables (optional)
# MONGO_URI=mongodb://localhost:27017/fraudDB
node server.js
```

Runs on `http://localhost:5000`

#### Python ML API

```bash
cd ml
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

Runs on `http://localhost:8000`

#### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`

---

### 🌐 API Endpoints

#### Node.js Backend

```
POST /api/predict
- Input: Claim details (form submission)
- Output: Fraud prediction with XAI metrics
- Response includes full explanation

GET /api/claims
- Output: All historical claims from MongoDB
- Includes pagination and filtering
```

#### Python ML API

```
POST /predict
- Input: Claim data (all 40+ features)
- Output: PredictionOutput schema with:
  - fraud, probability, riskScore
  - confidence, anomaly_score
  - top_contributing_factors
  - model_agreement, status, reasons
```

---

### 🎯 Use Cases

1. **Insurance Companies**: Detect fraudulent claims in real-time
2. **Claims Adjusters**: Understand fraud risk for decision-making
3. **Compliance Teams**: Full audit trail for regulatory requirements
4. **Fraud Investigators**: Clear indicators for further investigation
5. **Risk Management**: Identify fraud patterns and trends

---

### 🔐 Data Privacy & Security

- **Local Storage**: MongoDB stores only analyzed claims
- **No Raw Sensitive Data**: Personal identifiers can be anonymized
- **Audit Trail**: Complete history of predictions
- **Transparent Logic**: Easy to audit for bias and fairness

---

### 📊 Model Performance

**Heuristic Rule-Based System:**
- Transparent decision logic
- Rule-based scoring (0-100 scale)
- Human-interpretable factors
- Adjustable thresholds
- No black-box complexity

**Advantages over Traditional ML:**
- ✅ Explainability (100%)
- ✅ Regulatory compliance
- ✅ No false confidence
- ✅ Easy to debug and improve
- ✅ Stakeholder trust
- ✅ Minimal data requirements

---

### 🛠️ Environment Variables

**Backend** (`.env` in `backend/`)
```
MONGO_URI=mongodb://localhost:27017/fraudDB
PYTHON_ML_URL=http://localhost:8000/predict
```

**Frontend** (`src/services/api.js`)
```
Base URL: http://localhost:5000/api
```

---

### 📝 Key Files

| File | Purpose |
|------|---------|
| `frontend/src/components/ClaimForm.jsx` | Claim input form |
| `frontend/src/components/ResultCard.jsx` | XAI prediction display |
| `frontend/src/pages/Dashboard.jsx` | Historical claims view |
| `backend/controllers/claimController.js` | API request handler |
| `ml/app.py` | Explainable fraud detection logic |
| `backend/models/Claim.js` | MongoDB schema |

---

### 🎨 UI/UX Features

- **Professional Typography**: Inter font family, 1.25-1.5x sizing
- **Dark/Light Mode**: Theme switching with ThemeContext
- **Responsive Design**: Mobile-friendly layout
- **Real-time Feedback**: Loading states and error handling
- **Color-coded Risk**: Visual indicators for fraud levels
- **Detailed Explanations**: Expandable sections for factors

---

### 🚀 Future Enhancements

- Integration with traditional ML models for ensemble voting
- Advanced XAI techniques (SHAP, LIME)
- Real-time model monitoring and drift detection
- Automated rule adjustment based on feedback
- Multi-language support
- Advanced visualization dashboards

---

### 📞 Support

For issues or questions:
1. Check console logs for detailed error messages
2. Verify all services are running (Backend, ML API, MongoDB)
3. Review the XAI explanations for prediction insights
4. Check MongoDB connection status

---

### 📄 License

This project is created for educational and hackathon purposes.

---

**Built with ❤️ using MERN Stack + Explainable AI | February 2026**

