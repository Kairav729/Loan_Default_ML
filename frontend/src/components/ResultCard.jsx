import React from "react";

export default function ResultCard({ result }) {
  const pct = Math.round(result.probability * 100);
  const isDefault = result.prediction === 1;

  const level = pct >= 60 ? "high" : pct >= 35 ? "mid" : "low";

  const riskLabel = level === "high" ? "High Risk" : level === "mid" ? "Moderate Risk" : "Low Risk";

  const advice = isDefault
    ? {
        text: "This applicant shows elevated default risk. Key contributors likely include high DTI ratio, low credit score, or high interest rate. Lenders should request additional documentation, consider a co-signer, or adjust loan terms before approving.",
        badges: ["Review Required", "High Caution", "Request Documentation"],
        badgeClass: "danger",
      }
    : pct >= 35
    ? {
        text: "This applicant presents moderate default risk. While not flagged as high-risk, some factors may need attention. Consider the applicant's employment stability and existing debt obligations before finalizing.",
        badges: ["Monitor Closely", "Moderate Caution"],
        badgeClass: "warning",
      }
    : {
        text: "This applicant appears to be a low default risk. Key indicators — credit score, DTI ratio, and employment — are within acceptable ranges. Standard approval process can proceed.",
        badges: ["Low Risk", "Standard Process", "Proceed"],
        badgeClass: "safe",
      };

  return (
    <div className="result-card">
      {/* Verdict Row */}
      <div className="result-verdict-row">
        <div className={`verdict-icon-wrap ${isDefault ? "risk" : "safe"}`}>
          {isDefault ? "⚠️" : "✅"}
        </div>
        <div className="verdict-text">
          <h2 className={isDefault ? "risk-color" : "safe-color"}>
            {isDefault ? "Likely to Default" : "Unlikely to Default"}
          </h2>
          <p>Based on 16 applicant features · {riskLabel}</p>
        </div>
      </div>

      {/* Probability + Bar */}
      <div className="prob-section">
        <div className="prob-bar-wrap">
          <div className="prob-bar-label">
            <span>Default Probability</span>
            <span>{riskLabel}</span>
          </div>
          <div className="bar-bg">
            <div
              className={`bar-fill ${level}`}
              style={{ width: `${pct}%` }}
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "var(--text-faint)", marginTop: "0.4rem" }}>
            <span>0% Safe</span>
            <span>35% Moderate</span>
            <span>60%+ High</span>
          </div>
        </div>
        <div className={`prob-number ${level}`}>
          {pct}<span>%</span>
        </div>
      </div>

      {/* Risk Badges */}
      <div className="risk-badges" style={{ marginBottom: "1rem" }}>
        {advice.badges.map((b) => (
          <span key={b} className={`risk-badge ${advice.badgeClass}`}>{b}</span>
        ))}
      </div>

      {/* Advice */}
      <div className="result-advice">
        <strong>Lender Insight: </strong>{advice.text}
      </div>

      {/* Model note */}
      <p style={{ fontSize: "0.78rem", color: "var(--text-faint)", marginTop: "1rem", textAlign: "center" }}>
        Prediction by LoanVision Random Forest · Confidence: {pct}% default probability · For educational use only
      </p>
    </div>
  );
}
