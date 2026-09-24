import React, { useState } from "react";

const DEFAULTS = {
  Age: 35,
  Income: 60000,
  LoanAmount: 50000,
  CreditScore: 650,
  MonthsEmployed: 24,
  NumCreditLines: 3,
  InterestRate: 10.5,
  LoanTerm: 36,
  DTIRatio: 0.35,
  Education: "Bachelor's",
  EmploymentType: "Full-time",
  MaritalStatus: "Single",
  HasMortgage: "No",
  HasDependents: "No",
  LoanPurpose: "Auto",
  HasCoSigner: "No",
};

export default function LoanForm({ onResult, onError }) {
  const [form, setForm] = useState(DEFAULTS);
  const [loading, setLoading] = useState(false);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    onError(null);
    onResult(null);
    try {
      const res = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          Age: Number(form.Age),
          Income: Number(form.Income),
          LoanAmount: Number(form.LoanAmount),
          CreditScore: Number(form.CreditScore),
          MonthsEmployed: Number(form.MonthsEmployed),
          NumCreditLines: Number(form.NumCreditLines),
          InterestRate: Number(form.InterestRate),
          LoanTerm: Number(form.LoanTerm),
          DTIRatio: Number(form.DTIRatio),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Prediction failed.");
      onResult(data);
    } catch (err) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      {/* Applicant Info */}
      <div className="form-section-header">
        <div className="form-section-icon">👤</div>
        <span className="form-section-title">Applicant Information</span>
      </div>
      <div className="grid">
        <NumField label="Age" value={form.Age} onChange={(v) => set("Age", v)} min={18} max={100} />
        <NumField label="Annual Income ($)" value={form.Income} onChange={(v) => set("Income", v)} min={0} />
        <SelectField
          label="Education Level"
          value={form.Education}
          onChange={(v) => set("Education", v)}
          options={["High School", "Bachelor's", "Master's", "PhD"]}
        />
        <SelectField
          label="Employment Type"
          value={form.EmploymentType}
          onChange={(v) => set("EmploymentType", v)}
          options={["Full-time", "Part-time", "Self-employed", "Unemployed"]}
        />
        <NumField label="Months Employed" value={form.MonthsEmployed} onChange={(v) => set("MonthsEmployed", v)} min={0} />
        <SelectField
          label="Marital Status"
          value={form.MaritalStatus}
          onChange={(v) => set("MaritalStatus", v)}
          options={["Single", "Married", "Divorced"]}
        />
        <SelectField label="Has Dependents?" value={form.HasDependents} onChange={(v) => set("HasDependents", v)} options={["Yes", "No"]} />
        <SelectField label="Has Mortgage?" value={form.HasMortgage} onChange={(v) => set("HasMortgage", v)} options={["Yes", "No"]} />
      </div>

      {/* Loan Details */}
      <div className="form-section-header">
        <div className="form-section-icon">📋</div>
        <span className="form-section-title">Loan Details</span>
      </div>
      <div className="grid">
        <NumField label="Loan Amount ($)" value={form.LoanAmount} onChange={(v) => set("LoanAmount", v)} min={0} />
        <NumField label="Interest Rate (%)" value={form.InterestRate} onChange={(v) => set("InterestRate", v)} step={0.01} min={0} />
        <NumField label="Loan Term (months)" value={form.LoanTerm} onChange={(v) => set("LoanTerm", v)} min={1} />
        <NumField label="DTI Ratio" value={form.DTIRatio} onChange={(v) => set("DTIRatio", v)} step={0.01} min={0} max={1} />
        <SelectField
          label="Loan Purpose"
          value={form.LoanPurpose}
          onChange={(v) => set("LoanPurpose", v)}
          options={["Auto", "Business", "Education", "Home", "Other"]}
        />
        <SelectField label="Has Co-Signer?" value={form.HasCoSigner} onChange={(v) => set("HasCoSigner", v)} options={["Yes", "No"]} />
      </div>

      {/* Credit Info */}
      <div className="form-section-header">
        <div className="form-section-icon">💳</div>
        <span className="form-section-title">Credit Profile</span>
      </div>
      <div className="grid">
        <NumField label="Credit Score (300–850)" value={form.CreditScore} onChange={(v) => set("CreditScore", v)} min={300} max={850} />
        <NumField label="Number of Credit Lines" value={form.NumCreditLines} onChange={(v) => set("NumCreditLines", v)} min={0} />
      </div>

      <button className="submit-btn" type="submit" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" />
            Analyzing Risk...
          </>
        ) : (
          <>
            🔍 Predict Default Risk
          </>
        )}
      </button>
    </form>
  );
}

function NumField({ label, value, onChange, step = 1, min, max }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type="number"
        value={value}
        step={step}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="field">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} required>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
