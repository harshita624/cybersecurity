# preprocess_data.py
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load data
data = pd.read_csv('network_logs.csv')

# Encode categorical features (like IP address or Protocol)
encoder = LabelEncoder()
data['Protocol'] = encoder.fit_transform(data['Protocol'])

# Separate features and target
X = data[['Source_IP', 'Dest_IP', 'Protocol', 'Duration']]  # Features
y = data['Label']  # Target

# Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Normalize features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Save the preprocessed data
X_train.to_csv('X_train.csv', index=False)
X_test.to_csv('X_test.csv', index=False)
y_train.to_csv('y_train.csv', index=False)
y_test.to_csv('y_test.csv', index=False)
