from flask import Flask, request, jsonify
from flask_cors import CORS
from .model import predict_yield

app = Flask(__name__)
CORS(app)


@app.route("/health", methods=["GET"])
def health():
    return jsonify(status="ok")


@app.route("/predict", methods=["POST"])
def predict():
    """
    Expects JSON body:
    {
        "year": 2024,
        "average_rain_fall_mm_per_year": 1100.0,
        "pesticides_tonnes": 6000.0,
        "avg_temp": 21.0,
        "area": "United States of America",
        "item": "Maize"
    }
    """
    data = request.get_json(force=True)
    
    # # Debug: Print incoming request
    # print("\n" + "="*60)
    # print("📥 NEW PREDICTION REQUEST")
    # print("="*60)
    # print(f"Input Data:")
    # for key, value in data.items():
    #     print(f"  • {key}: {value}")
    
    required = ["year", "average_rain_fall_mm_per_year", "pesticides_tonnes", "avg_temp", "area", "item"]
    missing = [k for k in required if k not in data]
    if missing:
        print(f"Missing fields: {missing}")
        print("="*60 + "\n")
        return jsonify(error="missing fields", missing=missing), 400
    try:
        pred, details = predict_yield(
            year=int(data["year"]),
            average_rain_fall_mm_per_year=float(data["average_rain_fall_mm_per_year"]),
            pesticides_tonnes=float(data["pesticides_tonnes"]),
            avg_temp=float(data["avg_temp"]),
            area=str(data["area"]),
            item=str(data["item"]),
        )
        
        # # Debug: Print prediction results
        # print(f"\nPREDICTION SUCCESSFUL")
        # print(f"  Predicted Yield: {pred} tonnes/ha")
        # print(f"  Details:")
        # for key, value in details.items():
        #     print(f"     • {key}: {value}")
        # print("="*60 + "\n")
        
        return jsonify(prediction=pred, units="tonnes/ha", details=details)
    except Exception as e:
        print(f"\nPREDICTION FAILED")
        print(f"  Error: {str(e)}")
        print("="*60 + "\n")
        return jsonify(error=str(e)), 500


if __name__ == "__main__":
    # Run with: python -m backend.app
    app.run(host="0.0.0.0", port=5001, debug=True)
