import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/predict", label: "Predict" },
  { to: "/analytics", label: "Model Analytics" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Brand */}
        <NavLink to="/" className="nav-brand" onClick={() => setOpen(false)}>
          <div className="brand-logo">LV</div>
          <span className="brand-text">LoanVision</span>
          
        </NavLink>

        {/* Desktop links & controls */}
        <div className="nav-right">
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Theme Switcher Toggle */}


          <NavLink to="/predict" className="nav-cta">
            Predict Now →
          </NavLink>
        </div>

        {/* Hamburger */}
        <div className="mobile-controls">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn mobile-theme-btn"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            className="hamburger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span style={open ? { transform: "translateY(7px) rotate(45deg)" } : {}} />
            <span style={open ? { opacity: 0 } : {}} />
            <span style={open ? { transform: "translateY(-7px) rotate(-45deg)" } : {}} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="mobile-menu">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/predict" className="nav-cta" onClick={() => setOpen(false)}>
              Predict Now →
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}
