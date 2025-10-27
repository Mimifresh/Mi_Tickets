// src/components/Hero.jsx
import React from "react";

export default function Hero({ title, subtitle, children }) {
  return (
    <section className="hero" aria-labelledby="hero-heading" role="region">
      <div className="container hero-inner">
        <div>
          <h1 id="hero-heading" className="h1">{title}</h1>
          {subtitle && <p className="lead">{subtitle}</p>}
          <div style={{ marginTop: 12 }}>{children}</div>
        </div>

        <div className="hero-graphic" aria-hidden="true" style={{ position:"relative" }}>
          {/* decorative circle overlapping hero */}
          <div className="decoration-circle dec-circle-top-left" aria-hidden="true" />
          {/* simple illustrative SVG or placeholder graphic */}
          <svg width="100%" height="100%" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true">
            <rect x="0" y="0" width="320" height="220" rx="12" fill="#f8fafc" />
            <circle cx="60" cy="60" r="34" fill="#eef2ff" />
            <rect x="40" y="120" width="240" height="24" rx="6" fill="#fff" />
          </svg>
        </div>
      </div>
    </section>
  );
}
