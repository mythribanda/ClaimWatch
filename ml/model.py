
# import numpy as np
# import pandas as pd
# import warnings
# warnings.filterwarnings("ignore")

# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import LabelEncoder, StandardScaler
# from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_auc_score
# from sklearn.ensemble import RandomForestClassifier
# from xgboost import XGBClassifier
# from imblearn.over_sampling import SMOTE
# import pickle

# """# ============================================
# # 2. Load Dataset
# # ============================================
# """

# df = pd.read_csv("insurance_claims.csv")
# df.head()

# """# ============================================
# # 3. Data Cleaning
# # ============================================
# """

# # Drop useless columns
# df.drop(columns=['policy_number', '_c39'], inplace=True)

# # Replace '?' with NaN
# df.replace('?', np.nan, inplace=True)

# # Drop missing rows
# df.dropna(inplace=True)

# # Convert date columns to datetime then extract useful features
# df['policy_bind_date'] = pd.to_datetime(df['policy_bind_date'])
# df['incident_date'] = pd.to_datetime(df['incident_date'])

# df['policy_bind_year'] = df['policy_bind_date'].dt.year
# df['incident_year'] = df['incident_date'].dt.year
# df['incident_month'] = df['incident_date'].dt.month

# df.drop(columns=['policy_bind_date', 'incident_date'], inplace=True)

# """# ============================================
# # 4. Encode Target Variable
# # ============================================
# """

# df['fraud_reported'] = df['fraud_reported'].map({'Y':1, 'N':0})

# """# ============================================
# # 5. Encode Categorical Features
# # ============================================
# """

# encoders = {}

# for col in df.select_dtypes(include='object').columns:
#     le = LabelEncoder()
#     df[col] = le.fit_transform(df[col])
#     encoders[col] = le

# X = df.drop('fraud_reported', axis=1)
# y = df['fraud_reported']

# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.2, random_state=42
# )

# smote = SMOTE(random_state=42)
# X_train, y_train = smote.fit_resample(X_train, y_train)

# scaler = StandardScaler()
# X_train = scaler.fit_transform(X_train)
# X_test = scaler.transform(X_test)

# from sklearn.tree import DecisionTreeClassifier
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.svm import SVC
# from xgboost import XGBClassifier

# dt = DecisionTreeClassifier(random_state=42)
# dt.fit(X_train, y_train)

# y_pred_dt = dt.predict(X_test)

# rf = RandomForestClassifier(n_estimators=200, random_state=42)
# rf.fit(X_train, y_train)

# y_pred_rf = rf.predict(X_test)

# xgb = XGBClassifier(use_label_encoder=False, eval_metric='logloss')
# xgb.fit(X_train, y_train)

# y_pred_xgb = xgb.predict(X_test)

# svm = SVC(probability=True)
# svm.fit(X_train, y_train)

# y_pred_svm = svm.predict(X_test)

# models = {
#     "Decision Tree": y_pred_dt,
#     "Random Forest": y_pred_rf,
#     "XGBoost": y_pred_xgb,
#     "SVM": y_pred_svm
# }

# for name, pred in models.items():
#     print("\n==============================")
#     print("Model:", name)
#     print("Accuracy:", accuracy_score(y_test, pred))
#     print("ROC-AUC:", roc_auc_score(y_test, pred))
#     print(confusion_matrix(y_test, pred))
#     print(classification_report(y_test, pred))

# risk_scores = rf.predict_proba(X_test)[:,1]

# print("Sample Risk Scores:")
# print(risk_scores[:10])

# pickle.dump(rf, open("fraud_model.pkl", "wb"))
# pickle.dump(scaler, open("scaler.pkl", "wb"))

# # Retrain best model on full dataset
# rf_final = RandomForestClassifier(n_estimators=200, random_state=42)

# # Apply SMOTE on full training data only
# smote = SMOTE(random_state=42)
# X_resampled, y_resampled = smote.fit_resample(X, y)

# # Scale full data
# scaler_final = StandardScaler()
# X_scaled = scaler_final.fit_transform(X_resampled)

# rf_final.fit(X_scaled, y_resampled)

# print("Model retrained on full dataset")

# import pickle

# # Save ensemble models
# pickle.dump(rf_final, open("fraud_model.pkl", "wb"))
# pickle.dump(xgb, open("xgb_model.pkl", "wb"))
# pickle.dump(dt, open("dt_model.pkl", "wb"))

# # Save scaler
# pickle.dump(scaler_final, open("scaler.pkl", "wb"))

# # Save feature names
# feature_names = list(X.columns)
# pickle.dump(feature_names, open("feature_names.pkl", "wb"))

# # Save feature importance from Random Forest
# feature_importance = dict(zip(feature_names, rf_final.feature_importances_))
# pickle.dump(feature_importance, open("feature_importance.pkl", "wb"))

# print("✅ All Models, Scaler, Feature Names, and Feature Importance saved successfully!")

import numpy as np
import pandas as pd
import warnings
warnings.filterwarnings("ignore")

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_auc_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from xgboost import XGBClassifier
from imblearn.over_sampling import SMOTE
import pickle

# ============================================
# 1. Load Dataset
# ============================================

df = pd.read_csv("insurance_claims.csv")

# ============================================
# 2. Data Cleaning
# ============================================

# Drop useless columns
df.drop(columns=['policy_number', '_c39'], inplace=True, errors='ignore')

# Replace '?' with NaN
df.replace('?', np.nan, inplace=True)

# Drop missing rows
df.dropna(inplace=True)

# Convert Dates
df['policy_bind_date'] = pd.to_datetime(df['policy_bind_date'])
df['incident_date'] = pd.to_datetime(df['incident_date'])

df['policy_bind_year'] = df['policy_bind_date'].dt.year
df['incident_year'] = df['incident_date'].dt.year
df['incident_month'] = df['incident_date'].dt.month

df.drop(columns=['policy_bind_date', 'incident_date'], inplace=True)

# ============================================
# 3. Encode Target
# ============================================

df['fraud_reported'] = df['fraud_reported'].map({'Y':1, 'N':0})

# ============================================
# 4. Encode Categorical Features
# ============================================

encoders = {}

for col in df.select_dtypes(include='object').columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    encoders[col] = le

# Save encoders (IMPORTANT)
pickle.dump(encoders, open("encoders.pkl", "wb"))

# ============================================
# 5. Split Data
# ============================================

X = df.drop('fraud_reported', axis=1)
y = df['fraud_reported']

feature_names = list(X.columns)

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# ============================================
# 6. SMOTE ONLY ON TRAIN DATA
# ============================================

smote = SMOTE(random_state=42)
X_train, y_train = smote.fit_resample(X_train, y_train)

# ============================================
# 7. Scaling
# ============================================

scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Save scaler
pickle.dump(scaler, open("scaler.pkl", "wb"))

# ============================================
# 8. Train Models
# ============================================

dt = DecisionTreeClassifier(random_state=42)
dt.fit(X_train, y_train)

rf = RandomForestClassifier(n_estimators=300, random_state=42)
rf.fit(X_train, y_train)

xgb = XGBClassifier(
    use_label_encoder=False,
    eval_metric='logloss',
    n_estimators=300
)
xgb.fit(X_train, y_train)

svm = SVC(probability=True)
svm.fit(X_train, y_train)

# ============================================
# 9. Evaluate Models
# ============================================

models = {
    "Decision Tree": dt,
    "Random Forest": rf,
    "XGBoost": xgb,
    "SVM": svm
}

for name, model in models.items():

    pred = model.predict(X_test)

    print("\n=============================")
    print("Model:", name)

    print("Accuracy:",
          round(accuracy_score(y_test, pred),3))

    print("ROC-AUC:",
          round(roc_auc_score(y_test, pred),3))

    print(confusion_matrix(y_test, pred))

    print(classification_report(y_test, pred))

# ============================================
# 10. Risk Scores (Explainable AI)
# ============================================

risk_scores = rf.predict_proba(X_test)[:,1]

print("\nSample Risk Scores:")
print(risk_scores[:10])

# ============================================
# 11. Train Final Model on FULL DATA
# (NO SMOTE HERE - Important Fix)
# ============================================

scaler_final = StandardScaler()
X_scaled = scaler_final.fit_transform(X)

rf_final = RandomForestClassifier(
    n_estimators=300,
    random_state=42
)

rf_final.fit(X_scaled, y)

print("\nModel Retrained on Full Dataset")

# ============================================
# 12. Save Models
# ============================================

pickle.dump(rf_final, open("fraud_model.pkl","wb"))
pickle.dump(xgb, open("xgb_model.pkl","wb"))
pickle.dump(dt, open("dt_model.pkl","wb"))

# ============================================
# 13. Save Feature Names
# ============================================

pickle.dump(feature_names,
            open("feature_names.pkl","wb"))

# ============================================
# 14. Feature Importance
# (Explainable AI)
# ============================================

feature_importance = dict(
    zip(feature_names,
        rf_final.feature_importances_)
)

pickle.dump(feature_importance,
            open("feature_importance.pkl","wb"))

