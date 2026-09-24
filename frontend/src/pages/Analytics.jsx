import React, { useState } from "react";
import { Link } from "react-router-dom";

const featureImportance = [
  { name: "Age", importance: 0.142, category: "Demographic" },
  { name: "Income", importance: 0.138, category: "Financial" },
  { name: "Interest Rate", importance: 0.125, category: "Loan Detail" },
  { name: "Credit Score", importance: 0.119, category: "Credit History" },
  { name: "Loan Amount", importance: 0.108, category: "Loan Detail" },
  { name: "DTI Ratio", importance: 0.095, category: "Financial" },
  { name: "Months Employed", importance: 0.082, category: "Employment" },
  { name: "Num Credit Lines", importance: 0.058, category: "Credit History" },
  { name: "Loan Term", importance: 0.045, category: "Loan Detail" },
  { name: "Has Co-Signer", importance: 0.038, category: "Risk Mitigation" },
  { name: "Loan Purpose", importance: 0.025, category: "Loan Detail" },
  { name: "Employment Type", importance: 0.025, category: "Employment" },
];

export default function Analytics() {
  const [threshold, setThreshold] = useState(0.5);

  // Simulated metrics based on decision threshold curve
  const calcMetrics = (th) => {
    // As threshold increases, precision increases, recall drops
    const precision = Math.min(Math.round((0.15 + (th - 0.1) * 0.45) * 100), 78);
    const recall = Math.max(Math.round((0.92 - (th - 0.1) * 0.65) * 100), 12);
    const f1 = Math.round((2 * precision * recall) / (precision + recall));
    const flaggedPct = Math.round((1 - th * 0.75) * 42);
    return { precision, recall, f1, flaggedPct };
  };

  const metrics = calcMetrics(threshold);

  return (
    <div className="page page-animated">
      <div className="page-header">
        <div className="pill-badge">📊 Model Intelligence & Diagnostics</div>
        <h1>Random Forest Model Analytics</h1>
        <p>
          Deep dive into model performance, feature importance rankings, decision threshold
          tuning, and class distribution dynamics.
        </p>
      </div>

      {/* Threshold Simulator */}
      <section className="section analytics-card">
        <div className="analytics-card-header">
          <div>
            <h2 className="section-title-lg">Interactive Decision Threshold Simulator</h2>
            <p className="section-sub">
              Drag the threshold slider to see how adjusting the classification probability boundary
              trades off <strong>Precision</strong> (minimizing false alarms) vs <strong>Recall</strong> (catching defaulters).
            </p>
          </div>
        </div>

        <div className="threshold-simulator-grid">
          <div className="threshold-controls">
            <div className="slider-header">
              <label>Classification Threshold: <strong>{threshold.toFixed(2)}</strong></label>
              <span className="slider-hint">
                {threshold < 0.45 ? "High Recall Mode" : threshold > 0.55 ? "High Precision Mode" : "Balanced Default"}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.85"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="range-slider"
            />
            <div className="slider-ticks">
              <span>0.10 (Aggressive)</span>
              <span>0.50 (Standard)</span>
              <span>0.85 (Conservative)</span>
            </div>
          </div>

          <div className="sim-metrics-grid">
            <div className="sim-metric-box">
              <span className="sim-label">Recall (Defaults Caught)</span>
              <span className="sim-val text-brand">{metrics.recall}%</span>
              <div className="sim-bar-bg">
                <div className="sim-bar-fill bg-brand" style={{ width: `${metrics.recall}%` }} />
              </div>
            </div>

            <div className="sim-metric-box">
              <span className="sim-label">Precision (Accuracy of Flags)</span>
              <span className="sim-val text-accent">{metrics.precision}%</span>
              <div className="sim-bar-bg">
                <div className="sim-bar-fill bg-accent" style={{ width: `${metrics.precision}%` }} />
              </div>
            </div>

            <div className="sim-metric-box">
              <span className="sim-label">F1 Score</span>
              <span className="sim-val text-emerald">{metrics.f1}%</span>
              <div className="sim-bar-bg">
                <div className="sim-bar-fill bg-emerald" style={{ width: `${metrics.f1}%` }} />
              </div>
            </div>

            <div className="sim-metric-box">
              <span className="sim-label">Applicants Flagged Risky</span>
              <span className="sim-val text-amber">{metrics.flaggedPct}%</span>
              <div className="sim-bar-bg">
                <div className="sim-bar-fill bg-amber" style={{ width: `${metrics.flaggedPct}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Importance Section */}
      <section className="section">
        <h2 className="section-title-lg">Feature Importance Ranking</h2>
        <p className="section-sub">
          Gini impurity reduction across 150 decision trees in the Random Forest ensemble:
        </p>

        <div className="feature-importance-list">
          {featureImportance.map((f, i) => (
            <div className="feature-bar-row" key={f.name}>
              <div className="feature-info">
                <span className="feature-rank">#{i + 1}</span>
                <span className="feature-name">{f.name}</span>
                <span className="feature-cat-tag">{f.category}</span>
              </div>
              <div className="feature-bar-container">
                <div
                  className="feature-bar-fill"
                  style={{ width: `${(f.importance / 0.15) * 100}%` }}
                >
                  <span className="feature-pct">{(f.importance * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROC-AUC & Confusion Matrix Insight */}
      <section className="section grid-2cols">
        <div className="analytics-card">
          <h3 className="card-heading">📈 ROC Curve Analysis</h3>
          <p className="card-sub">
            LoanVision achieves a <strong>0.7567 ROC-AUC</strong> score on 51,070 test records,
            significantly outperforming baseline random guessing (0.50).
          </p>
          <div className="roc-visual-box">
            <svg viewBox="0 0 300 200" className="roc-svg">
              <defs>
                <linearGradient id="rocGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="40" y2="170" stroke="var(--border)" strokeWidth="1" />
              <line x1="40" y1="170" x2="280" y2="170" stroke="var(--border)" strokeWidth="1" />

              {/* Diagonal baseline */}
              <line x1="40" y1="170" x2="280" y2="20" stroke="var(--text-muted)" strokeDasharray="4 4" strokeWidth="1" />

              {/* ROC Curve */}
              <path
                d="M 40 170 Q 70 60, 160 38 T 280 20 L 280 170 Z"
                fill="url(#rocGrad)"
              />
              <path
                d="M 40 170 Q 70 60, 160 38 T 280 20"
                fill="none"
                stroke="var(--brand)"
                strokeWidth="3"
              />

              <text x="50" y="40" fill="var(--brand)" fontSize="12" fontWeight="800">ROC-AUC = 0.7567</text>
              <text x="160" y="188" fill="var(--text-muted)" fontSize="10">False Positive Rate →</text>
              <text x="5" y="100" fill="var(--text-muted)" fontSize="10" transform="rotate(-90 20 100)">True Positive Rate →</text>
            </svg>
          </div>
        </div>

        <div className="analytics-card">
          <h3 className="card-heading">⚖️ Class Imbalance Handling</h3>
          <p className="card-sub">
            The dataset consists of <strong>88.4% Non-Default</strong> vs <strong>11.6% Default</strong> records.
          </p>
          <div className="class-pie-container">
            <div className="class-bar-split">
              <div className="split-segment non-default" style={{ width: "88.4%" }}>
                <span>No Default (88.4%)</span>
              </div>
              <div className="split-segment default" style={{ width: "11.6%" }}>
                <span>Default (11.6%)</span>
              </div>
            </div>
            <div className="imbalance-note">
              <span>💡 Solution Applied:</span>
              <p>
                Using <code className="code-chip">class_weight='balanced'</code> adjusts weights inversely
                proportional to class frequencies, giving higher weight to default cases during tree splitting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="center-cta" style={{ marginTop: "3rem" }}>
        <Link to="/predict" className="btn-primary">
          Test Model in Real-Time →
        </Link>
      </div>
    </div>
  );
}
