import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="page page-narrow">
        <div className="success-box">
          <span className="success-icon">✅</span>
          <h2>Message Sent!</h2>
          <p>Thanks for reaching out. We'll get back to you shortly.</p>
          <button className="btn-primary" onClick={() => setSubmitted(false)}>
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-narrow">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p>Have a question about the model, the data, or the project? Drop us a message.</p>
      </div>

      <div className="contact-grid">
        {/* Info cards */}
        <div className="contact-info">
          <div className="contact-card">
            <span>📧</span>
            <div>
              <h4>Email</h4>
              <p>support@loanguard.ai</p>
            </div>
          </div>
          <div className="contact-card">
            <span>🐙</span>
            <div>
              <h4>GitHub</h4>
              <p>github.com/loanguard-ai</p>
            </div>
          </div>
          <div className="contact-card">
            <span>📚</span>
            <div>
              <h4>Dataset</h4>
              <p>Loan_default.csv — 255,347 records</p>
            </div>
          </div>
          <div className="contact-card">
            <span>🤖</span>
            <div>
              <h4>Model</h4>
              <p>Random Forest · scikit-learn 1.5</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="contact-form form-card" onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Subject</label>
            <input
              type="text"
              placeholder="What's this about?"
              value={form.subject}
              onChange={(e) => set("subject", e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Message</label>
            <textarea
              rows={5}
              placeholder="Your message..."
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}
