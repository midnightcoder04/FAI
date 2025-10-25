import os
import joblib
import pandas as pd

# Paths to model artifacts (relative to this file)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")
SCALER_PATH = os.path.join(MODELS_DIR, "scaler.pkl")
MODEL_PATH = os.path.join(MODELS_DIR, "decision_tree_model.pkl")
# MODEL_PATH = os.path.join(MODELS_DIR, "linear_regression_model.pkl")

# These must match the exact order and names from X_train.columns
TRAINING_COLUMNS = [
    'Year', 'average_rain_fall_mm_per_year', 'pesticides_tonnes', 
    'avg_temp', 'Area_Algeria', 'Area_Angola', 
    'Area_Argentina', 'Area_Armenia', 'Area_Australia', 'Area_Austria', 
    'Area_Azerbaijan', 'Area_Bahamas', 'Area_Bahrain', 'Area_Bangladesh', 
    'Area_Belarus', 'Area_Belgium', 'Area_Botswana', 'Area_Brazil', 'Area_Bulgaria', 
    'Area_Burkina Faso', 'Area_Burundi', 'Area_Cameroon', 'Area_Canada', 
    'Area_Central African Republic', 'Area_Chile', 'Area_Colombia', 'Area_Croatia', 
    'Area_Denmark', 'Area_Dominican Republic', 'Area_Ecuador', 'Area_Egypt', 
    'Area_El Salvador', 'Area_Eritrea', 'Area_Estonia', 'Area_Finland', 
    'Area_France', 'Area_Germany', 'Area_Ghana', 'Area_Greece', 'Area_Guatemala', 
    'Area_Guinea', 'Area_Guyana', 'Area_Haiti', 'Area_Honduras', 'Area_Hungary', 
    'Area_India', 'Area_Indonesia', 'Area_Iraq', 'Area_Ireland', 'Area_Italy', 
    'Area_Jamaica', 'Area_Japan', 'Area_Kazakhstan', 'Area_Kenya', 'Area_Latvia', 
    'Area_Lebanon', 'Area_Lesotho', 'Area_Libya', 'Area_Lithuania', 'Area_Madagascar', 
    'Area_Malawi', 'Area_Malaysia', 'Area_Mali', 'Area_Mauritania', 'Area_Mauritius', 
    'Area_Mexico', 'Area_Montenegro', 'Area_Morocco', 'Area_Mozambique', 'Area_Namibia', 
    'Area_Nepal', 'Area_Netherlands', 'Area_New Zealand', 'Area_Nicaragua', 'Area_Niger', 
    'Area_Norway', 'Area_Pakistan', 'Area_Papua New Guinea', 'Area_Peru', 'Area_Poland', 
    'Area_Portugal', 'Area_Qatar', 'Area_Romania', 'Area_Rwanda', 'Area_Saudi Arabia', 
    'Area_Senegal', 'Area_Slovenia', 'Area_South Africa', 'Area_Spain', 'Area_Sri Lanka', 
    'Area_Sudan', 'Area_Suriname', 'Area_Sweden', 'Area_Switzerland', 'Area_Tajikistan', 
    'Area_Thailand', 'Area_Tunisia', 'Area_Turkey', 'Area_Uganda', 'Area_Ukraine', 
    'Area_United Kingdom', 'Area_Uruguay', 'Area_Zambia', 'Area_Zimbabwe', 'Item_Maize', 
    'Item_Plantains and others', 'Item_Potatoes', 'Item_Rice, paddy', 'Item_Sorghum', 
    'Item_Soybeans', 'Item_Sweet potatoes', 'Item_Wheat', 'Item_Yams'
]

# Load artifacts once at module import
loaded_scaler = None
loaded_model = None

try:
    loaded_scaler = joblib.load(SCALER_PATH)
    loaded_model = joblib.load(MODEL_PATH)
    print(f"✓ Loaded model and scaler from {MODELS_DIR}")
    print(f"✓ Using {len(TRAINING_COLUMNS)} hardcoded training columns")
except FileNotFoundError as e:
    print(f"Warning: could not load model artifacts: {e}")
    print(f"Make sure scaler.pkl and decision_tree_model.pkl are in {MODELS_DIR}")


def predict_yield(
    year,
    average_rain_fall_mm_per_year,
    pesticides_tonnes,
    avg_temp,
    area,  
    item,  
):
    
    if loaded_model is None or loaded_scaler is None:
        raise RuntimeError("Model or scaler not loaded. Check backend/models/ directory.")

    # Build input dataframe with base numeric features
    new_data = {
        "Year": [year],
        "average_rain_fall_mm_per_year": [average_rain_fall_mm_per_year],
        "pesticides_tonnes": [pesticides_tonnes],
        "avg_temp": [avg_temp],
    }

    # Add one-hot encoded columns for Area and Item
    # Convention: Area_{country}, Item_{crop}
    area_col = f"Area_{area}"
    item_col = f"Item_{item}"
    new_data[area_col] = [1]
    new_data[item_col] = [1]

    new_df = pd.DataFrame(new_data)

    # Reindex to match training columns (fill missing with 0)
    new_df = new_df.reindex(columns=TRAINING_COLUMNS, fill_value=0)

    # Scale the input
    new_data_scaled = loaded_scaler.transform(new_df)

    # Predict
    predicted_yield = loaded_model.predict(new_data_scaled)[0]

    details = {
        "year": year,
        "rainfall_mm": average_rain_fall_mm_per_year,
        "pesticides_tonnes": pesticides_tonnes,
        "avg_temp": avg_temp,
        "area": area,
        "item": item,
        "model": "decision_tree",
    }

    return round(predicted_yield, 2), details
