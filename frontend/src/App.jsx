import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Analytics from "./pages/Analytics";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/predict" element={<Predict />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function NotFound() {
  return (
    <div
      className="page"
      style={{
        textAlign: "center",
        padding: "7rem 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "var(--brand-light)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          marginBottom: "1.5rem",
        }}
      >
        🔍
      </div>
      <h1
        style={{
          fontSize: "2.2rem",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          marginBottom: "0.5rem",
        }}
      >
        404 — Page Not Found
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
        That page doesn't exist. Head back to the dashboard.
      </p>
      <a href="/" className="btn-primary">
        Back to Dashboard →
      </a>
    </div>
  );
}
