import pickle
import pandas as pd
from datetime import datetime

# ===============================
# Load Model Files
# ===============================

model = pickle.load(open("fraud_model.pkl","rb"))
scaler = pickle.load(open("scaler.pkl","rb"))
encoders = pickle.load(open("encoders.pkl","rb"))

features = scaler.feature_names_in_

print("Model expects", len(features), "features")


# ===============================
# Sample Input (Same as API)
# ===============================

sample_input = {

"policy_state":"OH",
"policy_csl":"250/500",
"insured_sex":"MALE",
"insured_education_level":"Bachelor",
"insured_occupation":"craft-repair",
"insured_hobbies":"chess",
"insured_relationship":"husband",

"incident_type":"Single Vehicle Collision",
"collision_type":"Rear Collision",
"incident_severity":"Minor Damage",
"authorities_contacted":"Police",
"incident_state":"OH",
"incident_city":"Columbus",

"property_damage":"YES",
"police_report_available":"YES",

"auto_make":"Toyota",
"auto_model":"Corolla",

"months_as_customer":120,
"age":45,

"policy_deductable":500,
"policy_annual_premium":1200,
"umbrella_limit":0,
"insured_zip":466132,

"capital-gains":0,
"capital-loss":0,

"incident_hour_of_the_day":14,
"number_of_vehicles_involved":2,
"bodily_injuries":1,
"witnesses":2,

"total_claim_amount":15000,
"injury_claim":5000,
"property_claim":4000,
"vehicle_claim":6000,

"auto_year":2015,

"policy_bind_year":2014,
"incident_year":2015,
"incident_month":2
}


# ===============================
# Create Default Feature Dict
# ===============================

input_dict = {feature:0 for feature in features}

input_dict.update(sample_input)


# ===============================
# Convert to DataFrame
# ===============================

df = pd.DataFrame([input_dict])

df = df[features]


# ===============================
# Encode Categorical Features
# ===============================

for col in encoders:

    if col in df.columns:

        df[col] = encoders[col].transform(df[col])


# ===============================
# Scale
# ===============================

scaled_data = scaler.transform(df)


# ===============================
# Predict
# ===============================

prediction = model.predict(scaled_data)[0]

probability = model.predict_proba(scaled_data)[0][1]

riskScore = int(probability*100)


# ===============================
# Output
# ===============================

print("\nPrediction:", prediction)
print("Probability:", round(probability,3))
print("Risk Score:", riskScore)