import React, { useState } from "react";
import LoanForm from "../components/LoanForm";
import ResultCard from "../components/ResultCard";

export default function Predict() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className="page page-narrow">
      <div className="predict-header">
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "var(--brand-light)", color: "var(--brand)", fontSize: "0.72rem", fontWeight: 700, padding: "0.3rem 0.9rem", borderRadius: "999px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1rem", border: "1px solid rgba(99,102,241,0.2)" }}>
          🤖 AI Risk Predictor
        </div>
        <h1>Loan Default Prediction</h1>
        <p>Enter applicant details below — LoanVision will instantly calculate the default probability using our trained Random Forest model.</p>
      </div>

      <LoanForm
        onResult={(r) => { setResult(r); setError(null); }}
        onError={(e) => { setError(e); setResult(null); }}
      />

      {error && (
        <div className="error-box">
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      {result && <ResultCard result={result} />}
    </div>
  );
}
