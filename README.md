## Fraud Detection MERN App

This is a full MERN-style fraud detection demo with a separate Python ML API.

### Architecture

- **React frontend** (`frontend`): Collects claim details, calls the Node backend, and displays predictions and a dashboard of past claims.
- **Node.js backend** (`backend`): Exposes REST APIs, calls the Python ML API, saves results in MongoDB, and serves prediction data to the frontend.
- **Python ML API** (`backend/ml-api`): FastAPI service that loads/creates a simple model and returns fraud probability, risk score, and explanation.

### High-Level Flow

1. User enters claim details in the React form.
2. React sends `POST http://localhost:5000/api/predict`.
3. Node backend forwards the data to `POST http://localhost:8000/predict` (Python ML API).
4. Python ML API returns a prediction JSON.
5. Node saves the result to MongoDB (`fraudDB.claims`).
6. Node returns the same JSON to the frontend.
7. React shows the prediction and updates the dashboard (via `GET /api/claims`).

### Prerequisites

- Node.js (LTS recommended)
- npm
- Python 3.9+ (with `pip`)
- Local MongoDB instance running on `mongodb://127.0.0.1:27017` (or set `MONGO_URI`)

---

### Backend (Node.js API)

```bash
cd backend
npm install
node server.js
```

By default, the backend:

- Runs on `http://localhost:5000`
- Connects to MongoDB at `mongodb://127.0.0.1:27017/fraudDB` (override with `MONGO_URI`)
- Exposes:
  - `POST /api/predict`
  - `GET /api/claims`

---

### Python ML API

```bash
cd backend/ml-api
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

- Runs on `http://localhost:8000`
- Exposes `POST /predict`
- On first run, creates a simple demo model and saves it to `model.pkl`.

---

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

- Uses Vite + React.
- Assumes backend base URL `http://localhost:5000/api` (configured in `src/services/api.js`).
- Pages:
  - `Home`: Simple intro.
  - `Predict`: Claim form and result card.
  - `Dashboard`: Table of previous claims loaded from `GET /api/claims`.

---

### Environment Variables (Optional)

Backend (`backend`):

- `MONGO_URI` – override default MongoDB URI.

ML API (`backend/ml-api`):

- None required; all logic is self-contained for demo purposes.

