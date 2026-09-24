import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Dashboard" },
  { to: "/predict", label: "Predict" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
];

const modelStats = [
  { label: "Algorithm", value: "Random Forest" },
  { label: "Dataset", value: "255,347 records" },
  { label: "ROC-AUC", value: "0.7567" },
  { label: "Recall", value: "59.33%" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-brand-name">
            <div className="footer-logo">LV</div>
            LoanVision
          </div>
          <p>
            AI-powered loan default risk assessment using a Random Forest
            classifier trained on 255,000+ real loan records. Built for
            educational and research purposes.
          </p>
          <div className="footer-badges">
            <span className="footer-badge">⚛️ React</span>
            <span className="footer-badge">🐍 Flask</span>
            <span className="footer-badge">🌲 scikit-learn</span>
          </div>
        </div>

        {/* Pages */}
        <div>
          <p className="footer-col-title">Navigation</p>
          <div className="footer-links">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to}>
                → {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Model Info */}
        <div>
          <p className="footer-col-title">Model</p>
          <div className="footer-links">
            {modelStats.map((s) => (
              <div key={s.label} className="footer-stat">
                <span>{s.label}</span>
                <span className="footer-stat-val">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="footer-col-title">Resources</p>
          <div className="footer-links">
            <Link to="/how-it-works">Pipeline Overview</Link>
            <Link to="/how-it-works">Model Metrics</Link>
            <Link to="/about">Tech Stack</Link>
            <Link to="/about">Disclaimer</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{ borderTop: "1px solid #1e293b" }}>
        <p>© {new Date().getFullYear()} LoanVision · Built with React & scikit-learn</p>
        <div className="footer-bottom-links">
          <Link to="/about">About</Link>
          <Link to="/how-it-works">Docs</Link>
          <Link to="/predict">Predict</Link>
        </div>
      </div>
    </footer>
  );
}
