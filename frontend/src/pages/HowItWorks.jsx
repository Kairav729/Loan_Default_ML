import React from "react";
import { Link } from "react-router-dom";

const pipelineSteps = [
  {
    num: "01",
    tag: "Data Input",
    title: "Data Collection & Input",
    desc: "The model was trained on 255,347 real loan records containing borrower demographics, financial history, employment info, and loan characteristics from Kaggle.",
  },
  {
    num: "02",
    tag: "Preprocessing",
    title: "Feature Preprocessing",
    desc: "Categorical features (Education, Employment Type, Marital Status, Loan Purpose, etc.) are one-hot encoded. Numerical features pass through the same ColumnTransformer pipeline as standardized inputs.",
  },
  {
    num: "03",
    tag: "Model",
    title: "Random Forest Training",
    desc: "A Random Forest Classifier with 150 estimators, max_depth=12, and class_weight='balanced' was trained to handle the 88%/12% class imbalance. Random Forest aggregates multiple decision trees, significantly reducing variance and improving generalization.",
  },
  {
    num: "04",
    tag: "Inference",
    title: "Live Prediction",
    desc: "Your form input is passed through the same sklearn pipeline — encoded, then scored by the trained forest. The Flask API returns both a binary class label and a probability score derived from ensemble voting across all trees.",
  },
  {
    num: "05",
    tag: "Result",
    title: "Risk Verdict",
    desc: "LoanVision presents a clear Low / Moderate / High verdict with the default probability percentage on a color-coded risk bar, alongside contextual lender advice.",
  },
];

const metrics = [
  { label: "Accuracy", value: "75.48%", note: "Overall correct predictions", pct: 75 },
  { label: "Precision", value: "25.82%", note: "Predicted defaults that were real", pct: 26 },
  { label: "Recall", value: "59.33%", note: "Actual defaults caught", pct: 59 },
  { label: "F1 Score", value: "35.98%", note: "Harmonic mean of precision & recall", pct: 36 },
  { label: "ROC-AUC", value: "0.7567", note: "Discrimination across thresholds", pct: 76 },
];

const features = [
  "Age", "Income", "Loan Amount", "Credit Score", "Months Employed",
  "Num Credit Lines", "Interest Rate", "Loan Term", "DTI Ratio",
  "Education", "Employment Type", "Marital Status",
  "Has Mortgage", "Has Dependents", "Loan Purpose", "Has Co-Signer",
];

export default function HowItWorks() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="pill-badge">⚙️ Technical Overview</div>
        <h1>How LoanVision Works</h1>
        <p>A full walkthrough of the machine learning pipeline — from raw data to a live default prediction.</p>
      </div>

      {/* Pipeline Steps */}
      <section className="section">
        <h2 className="section-title-lg">The ML Pipeline</h2>
        <div className="pipeline-wrapper">
          {pipelineSteps.map((s) => (
            <div className="pipeline-step" key={s.num}>
              <div className="pipeline-left">
                <div className="step-circle">{s.num}</div>
                <div className="step-connector" />
              </div>
              <div className="pipeline-body">
                <span className="pipeline-tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Model Performance */}
      <section className="section">
        <h2 className="section-title-lg">Model Performance</h2>
        <p className="section-sub">
          Evaluated on a held-out 20% test set (51,070 records). The Random Forest
          model is optimized for <strong>recall</strong> — catching actual defaults
          is more important than minimizing false positives in a lending context.
          Ensemble voting across all trees provides more stable and robust predictions.
        </p>
        <div className="metrics-grid">
          {metrics.map((m) => (
            <div className="metric-card" key={m.label}>
              <span className="metric-val">{m.value}</span>
              <span className="metric-label">{m.label}</span>
              <span className="metric-note">{m.note}</span>
              <div className="metric-bar-wrap">
                <div className="metric-bar-bg">
                  <div
                    className="metric-bar-fill"
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Insight box */}
        <div style={{ background: "var(--brand-light)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "var(--r-lg)", padding: "1.25rem 1.5rem", marginTop: "1.5rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
          <span style={{ fontSize: "1.2rem" }}>💡</span>
          <div>
            <strong style={{ display: "block", fontSize: "0.9rem", color: "var(--brand-dark)", marginBottom: "0.25rem" }}>Why is Precision low?</strong>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
              The Random Forest uses <code style={{ background: "rgba(99,102,241,0.1)", padding: "0.1rem 0.35rem", borderRadius: "4px", fontSize: "0.82rem" }}>class_weight='balanced'</code> to counteract the 88/12 class imbalance. This deliberately biases the ensemble toward catching defaults (high recall) at the cost of more false alarms (lower precision). In lending, missing a real default is far more costly than flagging a false positive.
            </p>
          </div>
        </div>
      </section>

      {/* Confusion Matrix */}
      <section className="section">
        <h2 className="section-title-lg">Confusion Matrix</h2>
        <p className="section-sub">Results on the 51,070-record test set:</p>
        <div className="cm-wrap">
          <table className="cm-table">
            <thead>
              <tr>
                <th></th>
                <th>Predicted: No Default</th>
                <th>Predicted: Default</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Actual: No Default</strong></td>
                <td className="cm-tn">35,028 — TN ✓</td>
                <td className="cm-fp">10,111 — FP ✗</td>
              </tr>
              <tr>
                <td><strong>Actual: Default</strong></td>
                <td className="cm-fn">2,412 — FN ✗</td>
                <td className="cm-tp">3,519 — TP ✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem", marginTop: "1.25rem" }}>
          {[
            { label: "True Negatives (TN)", val: "35,028", color: "#166534", bg: "#dcfce7", desc: "Correctly identified non-defaulters" },
            { label: "False Positives (FP)", val: "10,111", color: "#991b1b", bg: "#fee2e2", desc: "Non-defaulters flagged as risky" },
            { label: "False Negatives (FN)", val: "2,412", color: "#92400e", bg: "#ffedd5", desc: "Missed actual defaulters" },
            { label: "True Positives (TP)", val: "3,519", color: "var(--brand-dark)", bg: "var(--brand-light)", desc: "Correctly caught defaulters" },
          ].map((c) => (
            <div key={c.label} style={{ background: c.bg, border: `1px solid ${c.color}22`, borderRadius: "var(--r-md)", padding: "1rem 1.25rem" }}>
              <div style={{ fontWeight: 800, fontSize: "1.3rem", color: c.color }}>{c.val}</div>
              <div style={{ fontWeight: 700, fontSize: "0.82rem", color: c.color, marginTop: "0.15rem" }}>{c.label}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <h2 className="section-title-lg">Input Features (16)</h2>
        <p className="section-sub">All 16 fields used by the model for prediction:</p>
        <div className="feature-tags">
          {features.map((f) => (
            <span className="feature-tag" key={f}>{f}</span>
          ))}
        </div>
      </section>

      <div className="center-cta">
        <Link to="/predict" className="btn-primary">Try the Predictor →</Link>
        <Link to="/about" className="btn-outline">About the Project</Link>
      </div>
    </div>
  );
}
