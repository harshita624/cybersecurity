# predict_threat.py

import sys
import joblib
import pandas as pd
import json

# Load the model (ensure 'model.joblib' is in the same directory)
model = joblib.load('model.joblib')

# Load log data passed from Node.js
log_data = json.loads(sys.argv[1])  # Accept input as a JSON string from Node.js

# Convert log data into a DataFrame (ensure it matches the model's feature set)
log_df = pd.DataFrame([log_data])

# Preprocess the data
# Example: Encoding the 'Protocol' column if it exists, based on known mappings
if 'Protocol' in log_df.columns:
    protocol_mapping = {'TCP': 1, 'UDP': 2, 'ICMP': 3}
    log_df['Protocol'] = log_df['Protocol'].map(protocol_mapping)

# Load the scaler (ensure 'scaler.joblib' exists and matches the one used in training)
scaler = joblib.load('scaler.joblib')

# Ensure the DataFrame contains the correct features in the correct order
# Replace 'Feature1', 'Feature2', etc., with the actual features used in training
required_features = ['Protocol', 'Feature1', 'Feature2', 'Feature3']  # Adjust as needed
log_df = log_df[required_features]

# Scale the input data
log_df_scaled = scaler.transform(log_df)

# Make a prediction using the model
prediction = model.predict(log_df_scaled)

# Return the prediction result (for example, 0 or 1)
print(prediction[0])
