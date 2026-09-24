"""
Run this script to train and save the Random Forest model:
    python train_model.py
Requires Loan_default.csv in the same directory.
"""
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, f1_score
import joblib

df = pd.read_csv("Loan_default.csv")

X = df.drop(columns=["Default", "LoanID"])
y = df["Default"]

categorical_features = X.select_dtypes(include=["object"]).columns
numerical_features = X.select_dtypes(exclude=["object"]).columns

preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features,
        )
    ],
    remainder="passthrough",
)

# Random Forest Classifier
random_forest = RandomForestClassifier(
    n_estimators=150,
    max_depth=12,
    min_samples_leaf=20,
    max_features="sqrt",
    class_weight="balanced",
    random_state=42,
    n_jobs=-1,
)

model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("classifier", random_forest),
    ]
)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)

print("Training Random Forest... (~1 minute)")
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(f"Test Accuracy : {accuracy_score(y_test, y_pred):.4f}")
print(f"Test F1 Score : {f1_score(y_test, y_pred):.4f}")

joblib.dump(model, "best_loan_default_model.joblib")
print("Model saved to best_loan_default_model.joblib")
