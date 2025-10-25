# Crop Yield Predictor

This repository contains the Crop Yield Predictor web application — an agricultural analytics UI for estimating crop yields based on climate, soil, and management data.

## Quick start (local)

Make sure you have Node.js (recommended via nvm) and npm installed.

```sh
# Clone the repo
git clone <YOUR_GIT_URL>
cd Crop_Yield_Prediction

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open http://localhost:8080 in your browser.


## Technologies

- Vite
- React + TypeScript
- Tailwind CSS

## Backend (Flask) — ML model server for crop yield predictions

The backend under `backend/` loads your trained decision tree model (and scaler) and exposes a `/predict` endpoint. It uses the preprocessing logic you provided (one-hot encoding for Area/Item, scaling, etc.).

Files:
- `backend/app.py` — Flask server with `/health` and `/predict` (POST) endpoints.
- `backend/model.py` — loads `scaler.pkl` and `decision_tree_model.pkl`; handles preprocessing with hardcoded training columns.
- `backend/requirements.txt` — Python dependencies (Flask, pandas, joblib, scikit-learn).

### Setup (one-time)

1. **Add model artifacts** to `backend/models/`:
   - `scaler.pkl` (StandardScaler )
   - `decision_tree_model.pkl` (your trained model; or use `linear_regression_model.pkl` if you prefer)
   - Training columns are in `model.py` 

2. **Create virtual environment and install dependencies**:
   ```zsh
   # from Crop_Yield_Prediction directory
   python3 -m venv CYP_venv
   source CYP_venv/bin/activate
   pip install -r backend/requirements.txt
   ```

3. **Run the server**:
   ```zsh
   python -m backend.app
   ```

### API contract

**POST /predict** — predict crop yield

Request body (JSON):
```json
{
  "year": 2024,
  "average_rain_fall_mm_per_year": 1100.0,
  "pesticides_tonnes": 6000.0,
  "avg_temp": 21.0,
  "area": "United States of America",
  "item": "Maize"
}
```

Response (JSON):
```json
{
  "prediction": 45.67,
  "units": "tonnes/ha",
  "details": { ... }
}
```

Example curl:
```zsh
curl -sS -X POST http://localhost:5001/predict \
  -H 'Content-Type: application/json' \
  -d '{"year":2024,"average_rain_fall_mm_per_year":1100,"pesticides_tonnes":6000,"avg_temp":21,"area":"United States of America","item":"Maize"}' | jq
```

Frontend integration (fetch):
```js
async function predictYield(input) {
  const res = await fetch('http://localhost:5001/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return res.json();
}
```