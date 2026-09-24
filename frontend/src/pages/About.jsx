import React from "react";
import { Link } from "react-router-dom";

const techStack = [
  { icon: "⚛️", name: "React 18", desc: "Frontend UI with React Router for client-side navigation" },
  { icon: "🐍", name: "Flask", desc: "Lightweight Python REST API serving predictions" },
  { icon: "🌲", name: "scikit-learn", desc: "Random Forest Classifier & sklearn preprocessing pipeline" },
  { icon: "🗃️", name: "pandas / numpy", desc: "Data loading, manipulation, and feature engineering" },
  { icon: "💾", name: "joblib", desc: "Model serialization for fast deserialization in production" },
  { icon: "⚡", name: "Vite", desc: "Fast frontend build tool, dev server, and HMR" },
];

const datasetFacts = [
  { label: "Total Records", value: "255,347" },
  { label: "Default Rate", value: "11.61%" },
  { label: "Non-Default Rate", value: "88.39%" },
  { label: "Total Features", value: "18 (16 used)" },
  { label: "Numerical Features", value: "9" },
  { label: "Categorical Features", value: "7" },
  { label: "Train / Test Split", value: "80% / 20%" },
];

export default function About() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="pill-badge">📖 Project Overview</div>
        <h1>About LoanVision</h1>
        <p>What this project is, why it was built, and how it all comes together.</p>
      </div>

      {/* Project Overview */}
      <section className="about-intro">
        <div className="about-text">
          <h2>What is LoanVision?</h2>
          <p>
            LoanVision is a machine learning web application that predicts whether
            a loan applicant is likely to default on their loan. It was built as a
            demonstration of end-to-end ML deployment — from raw data exploration
            to a production-ready prediction API.
          </p>
          <p>
            The core model is a <strong>Random Forest Classifier</strong> trained on
            over 255,000 real-world loan records. It uses 16 borrower and loan
            features to estimate the probability of default, helping lenders
            make more informed, data-backed decisions.
          </p>
          <p>
            The Random Forest handles the class imbalance in the dataset (only ~12% defaults) using{" "}
            <strong>class_weight="balanced"</strong>, which ensures the ensemble doesn't
            simply predict "no default" for every applicant — instead prioritizing
            high recall to catch actual defaults.
          </p>

          {/* Goal badges */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
            {["End-to-End ML", "Educational Purpose", "Production API", "Real Dataset"].map((tag) => (
              <span key={tag} style={{ background: "var(--brand-light)", color: "var(--brand)", borderRadius: "999px", padding: "0.3rem 0.85rem", fontSize: "0.78rem", fontWeight: 700, border: "1px solid rgba(99,102,241,0.2)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="about-facts">
          <div className="about-facts-title">Dataset Facts</div>
          {datasetFacts.map((f) => (
            <div className="fact-row" key={f.label}>
              <span>{f.label}</span>
              <strong>{f.value}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section">
        <h2 className="section-title-lg">Tech Stack</h2>
        <div className="tech-grid">
          {techStack.map((t) => (
            <div className="tech-card" key={t.name}>
              <div className="tech-icon">{t.icon}</div>
              <div>
                <h3>{t.name}</h3>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Model Configuration */}
      <section className="section">
        <h2 className="section-title-lg">Model Configuration</h2>
        <div className="code-block">
        <pre>{`<span class="kw">from</span> sklearn.ensemble <span class="kw">import</span> RandomForestClassifier
<span class="kw">from</span> sklearn.pipeline <span class="kw">import</span> Pipeline

model = RandomForestClassifier(
    n_estimators     = <span class="num">100</span>,     <span class="cm"># Number of trees in the forest</span>
    max_depth        = <span class="num">None</span>,    <span class="cm"># Trees grown fully unless min_samples_leaf stops them</span>
    min_samples_leaf = <span class="num">1</span>,       <span class="cm"># Default; tunable to reduce overfitting</span>
    class_weight     = <span class="str">"balanced"</span>, <span class="cm"># Handles 88/12 class imbalance</span>
    n_jobs           = <span class="num">-1</span>,      <span class="cm"># Use all CPU cores for training</span>
    random_state     = <span class="num">42</span>       <span class="cm"># Reproducibility</span>
)`}</pre>
        </div>
        <p className="section-sub" style={{ marginTop: "1rem" }}>
          <strong>n_estimators=100</strong> builds 100 independent decision trees that vote together for a final prediction.{" "}
          <strong>class_weight='balanced'</strong> ensures minority class (defaults) are weighted higher to achieve strong recall.
        </p>
      </section>

      {/* Architecture Diagram */}
      <section className="section">
        <h2 className="section-title-lg">System Architecture</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", overflow: "hidden" }}>
          {[
            { icon: "🌐", title: "React Frontend", items: ["Vite Dev Server", "React Router", "Form Components", "Result Display"] },
            { icon: "🔀", title: "API Layer", items: ["Flask REST API", "/predict endpoint", "CORS enabled", "JSON I/O"] },
            { icon: "🤖", title: "ML Pipeline", items: ["ColumnTransformer", "OneHotEncoder", "RandomForestClassifier", "joblib model"] },
            { icon: "📦", title: "Data Layer", items: ["Loan_default.csv", "255K records", "80/20 split", "Feature engineering"] },
          ].map((col, idx) => (
            <div key={col.title} style={{ padding: "1.5rem", borderRight: idx < 3 ? "1px solid var(--border)" : "none", background: idx % 2 === 0 ? "var(--card)" : "var(--bg)" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{col.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.75rem", color: "var(--text)" }}>{col.title}</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {col.items.map((item) => (
                  <li key={item} style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ color: "var(--brand)", fontWeight: 700 }}>·</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      

      <div className="center-cta">
        <Link to="/predict" className="btn-primary">Try the Predictor →</Link>
        <Link to="/how-it-works" className="btn-outline">See the Pipeline</Link>
      </div>
    </div>
  );
}
