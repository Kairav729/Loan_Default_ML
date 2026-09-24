import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroVideoScroll({ onScrollToDashboard }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasRef = useRef(null);

  // Track mouse scroll progress for initial entrance animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.8;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Real-time dynamic particle canvas overlay behind video
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.5 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles with glow lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.25 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particle points
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(6, 182, 212, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToDash = () => {
    window.scrollTo({
      top: window.innerHeight * 0.75,
      behavior: "smooth",
    });
  };

  return (
    <div className="hero-scroll-container">
      {/* Background Video Stream */}
      <div
        className="hero-video-wrapper"
        style={{
          opacity: 1 - scrollProgress * 0.45,
          transform: `scale(${1 + scrollProgress * 0.1})`,
        }}
      >
        <video
          className="hero-bg-video"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1600&auto=format&fit=crop"
        >
          {/* Abstract technology neural node video background */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-lines-41539-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-video-overlay" />
        <canvas ref={canvasRef} className="hero-canvas-overlay" />
      </div>

      {/* Hero Content Layer with Mouse Scroll Transition */}
      <div
        className="hero-scroll-content"
        style={{
          transform: `translateY(${-scrollProgress * 60}px)`,
          opacity: Math.max(1 - scrollProgress * 1.2, 0),
        }}
      >
        <div className="hero-badge-pill">
          <span className="pulse-dot" />
          <span>Next-Gen Machine Learning Risk Platform</span>
        </div>

        <h1 className="hero-animated-title">
          Loan Default <span className="grad-text">Intelligence</span>
        </h1>

        <p className="hero-animated-sub">
          Trained on 255,000+ real borrower profiles with Ensemble Random Forest AI.
          Scroll down to launch the live prediction dashboard.
        </p>

        {/* Animated Floating Feature Cards */}
        <div className="hero-floating-grid">
          <div className="hero-float-card card-1">
            <span className="float-icon">⚡</span>
            <div className="float-meta">
              <strong>Real-Time Verdicts</strong>
              <span>16-feature inference engine</span>
            </div>
          </div>
          <div className="hero-float-card card-2">
            <span className="float-icon">🎯</span>
            <div className="float-meta">
              <strong>75.67% ROC-AUC</strong>
              <span>Balanced class optimization</span>
            </div>
          </div>
          <div className="hero-float-card card-3">
            <span className="float-icon">🛡️</span>
            <div className="float-meta">
              <strong>Institutional Risk</strong>
              <span>Automated default scoring</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll-actions">
          <Link to="/predict" className="btn-primary hero-btn-lg">
            Launch Risk Predictor →
          </Link>
          <button onClick={scrollToDash} className="btn-outline hero-btn-scroll">
            Explore Dashboard ↓
          </button>
        </div>
      </div>

      {/* Scroll Down Mouse Indicator */}
      <div
        className="scroll-mouse-indicator"
        onClick={scrollToDash}
        style={{ opacity: Math.max(1 - scrollProgress * 2, 0) }}
      >
        <div className="mouse-shell">
          <div className="mouse-wheel" />
        </div>
        <span className="scroll-hint-text">Scroll down to reveal dashboard</span>
      </div>
    </div>
  );
}
