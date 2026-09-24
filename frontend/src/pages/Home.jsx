import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeroVideoScroll from "../components/HeroVideoScroll";

const stats = [
  { value: "255K+", label: "Training Records", icon: "📚" },
  { value: "75.67%", label: "ROC-AUC Score", icon: "📈" },
  { value: "16", label: "Input Features", icon: "⚙️" },
  { value: "11.6%", label: "Default Rate", icon: "⚖️" },
];

const riskFactors = [
  { icon: "📉", title: "High DTI Ratio", desc: "Debt-to-income ratio above 0.5 significantly increases default probability.", tag: "Financial" },
  { icon: "💳", title: "Low Credit Score", desc: "Scores below 550 are strongly correlated with higher default risk.", tag: "Credit" },
  { icon: "📈", title: "High Interest Rate", desc: "Loans with rates above 18% show elevated default patterns.", tag: "Loan Detail" },
  { icon: "🏦", title: "Large Loan Amount", desc: "Disproportionately large loans relative to income increase risk.", tag: "Loan Detail" },
  { icon: "🕐", title: "Short Employment", desc: "Less than 6 months of employment history raises concerns.", tag: "Demographic" },
  { icon: "📋", title: "No Co-Signer", desc: "Absence of a co-signer removes an important financial safety net.", tag: "Mitigation" },
];

export default function Home() {
  // Interactive Quick Simulator state on Dashboard
  const [simIncome, setSimIncome] = useState(45000);
  const [simLoan, setSimLoan] = useState(25000);
  const [simCredit, setSimCredit] = useState(620);
  const [simRate, setSimRate] = useState(14.5);

  // Quick risk heuristic calculation for interactive demo card
  const dti = (simLoan * 0.05) / (simIncome / 12);
  const riskScore = Math.min(
    Math.max(
      Math.round(
        (1 - simCredit / 850) * 40 +
          (dti > 0.4 ? 30 : 15) +
          (simRate > 15 ? 25 : 10)
      ),
      5
    ),
    95
  );

  const getRiskLabel = (score) => {
    if (score < 30) return { text: "Low Risk", color: "var(--success)", bg: "var(--success-bg)" };
    if (score < 65) return { text: "Moderate Risk", color: "var(--warning)", bg: "var(--warning-bg)" };
    return { text: "High Risk", color: "var(--danger)", bg: "var(--danger-bg)" };
  };

  const riskInfo = getRiskLabel(riskScore);

  return (
    <div className="home-container">
      {/* 1. Real-Time Video Animation Landing & Scroll Experience */}
      <HeroVideoScroll />

      {/* 2. Scroll-Revealed Main Dashboard */}
      <div id="dashboard" className="page dashboard-page">
        <div className="dashboard-header-banner">
          <div className="dash-title-wrap">
            <span className="pill-badge">⚡ Live Executive Dashboard</span>
            <h2>Loan Risk Intelligence Hub</h2>
            <p>Real-time analytics, risk factors, and interactive applicant scoring</p>
          </div>
          <Link to="/predict" className="btn-primary">
            Open Full Predictor →
          </Link>
        </div>

        {/* Live Interactive Quick Risk Simulator Card */}
        <section className="section dashboard-quick-sim">
          <div className="sim-grid">
            <div className="sim-inputs-col">
              <h3>⚡ Quick Applicant Risk Calculator</h3>
              <p className="sim-desc">Adjust sliders below to test instant probability changes:</p>

              <div className="sim-slider-group">
                <div className="slider-row-label">
                  <span>Annual Income: <strong>${simIncome.toLocaleString()}</strong></span>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="150000"
                  step="5000"
                  value={simIncome}
                  onChange={(e) => setSimIncome(Number(e.target.value))}
                  className="range-slider"
                />
              </div>

              <div className="sim-slider-group">
                <div className="slider-row-label">
                  <span>Loan Amount Requested: <strong>${simLoan.toLocaleString()}</strong></span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="2500"
                  value={simLoan}
                  onChange={(e) => setSimLoan(Number(e.target.value))}
                  className="range-slider"
                />
              </div>

              <div className="sim-slider-group">
                <div className="slider-row-label">
                  <span>Credit Score: <strong>{simCredit}</strong></span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="850"
                  step="10"
                  value={simCredit}
                  onChange={(e) => setSimCredit(Number(e.target.value))}
                  className="range-slider"
                />
              </div>

              <div className="sim-slider-group">
                <div className="slider-row-label">
                  <span>Interest Rate: <strong>{simRate}%</strong></span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="0.5"
                  value={simRate}
                  onChange={(e) => setSimRate(Number(e.target.value))}
                  className="range-slider"
                />
              </div>
            </div>

            {/* Simulated Result Display */}
            <div className="sim-result-card">
              <div className="sim-card-header">
                <span className="sim-card-tag">Estimated Default Verdict</span>
                <span
                  className="risk-status-pill"
                  style={{ color: riskInfo.color, background: riskInfo.bg }}
                >
                  {riskInfo.text}
                </span>
              </div>

              <div className="sim-meter-circle-wrap">
                <div
                  className="sim-meter-circle"
                  style={{
                    background: `conic-gradient(${riskInfo.color} ${riskScore * 3.6}deg, var(--border) 0deg)`,
                  }}
                >
                  <div className="sim-meter-inner">
                    <span className="sim-score-pct">{riskScore}%</span>
                    <span className="sim-score-lbl">Default Risk</span>
                  </div>
                </div>
              </div>

              <div className="sim-card-rows">
                <div className="sim-card-row">
                  <span>Est. DTI Ratio</span>
                  <strong className={dti > 0.4 ? "text-amber" : ""}>{dti.toFixed(2)}</strong>
                </div>
                <div className="sim-card-row">
                  <span>Credit Band</span>
                  <strong>{simCredit >= 700 ? "Prime" : simCredit >= 600 ? "Near-Prime" : "Subprime"}</strong>
                </div>
              </div>

              <Link to="/predict" className="btn-primary w-full text-center mt-3">
                Run Full 16-Field Prediction →
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <section className="stats-row">
          {stats.map((s) => (
            <div className="stat-box" key={s.label}>
              <span className="stat-icon">{s.icon}</span>
              <span className="stat-val">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </section>

        {/* Risk Factors Section */}
        <section className="section">
          <div className="section-header">
            <h2>Key Risk Drivers</h2>
            <p>Statistical indicators that strongly correlate with borrower default rates.</p>
          </div>
          <div className="cards-grid">
            {riskFactors.map((r) => (
              <div className="info-card interactive-tilt-card" key={r.title}>
                <div className="card-top-row">
                  <span className="info-icon">{r.icon}</span>
                  <span className="card-tag">{r.tag}</span>
                </div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Flow Preview */}
        <section className="section">
          <div className="section-header">
            <h2>3-Step Live Evaluation</h2>
            <p>From applicant parameters to ensemble probability breakdown.</p>
          </div>
          <div className="dashboard-steps-grid">
            {[
              { num: "01", icon: "📝", title: "Parameter Entry", desc: "16 financial & demographic borrower inputs." },
              { num: "02", icon: "🤖", title: "Random Forest Scoring", desc: "Ensemble voting across 150 decision trees." },
              { num: "03", icon: "📊", title: "Actionable Risk Verdict", desc: "Detailed probability breakdown & lender suggestions." },
            ].map((item) => (
              <div key={item.num} className="dash-step-card">
                <span className="step-num">{item.num}</span>
                <div className="step-icon-lg">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="cta-banner">
          <h2>Ready to Evaluate a Live Applicant?</h2>
          <p>Fill out the complete 16-field form and generate joblib pipeline scores.</p>
          <Link to="/predict" className="btn-white">
            Start Prediction Wizard →
          </Link>
        </section>
      </div>
    </div>
  );
}
