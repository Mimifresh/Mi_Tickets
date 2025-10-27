import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <h1 className="hero-title">Ticketing Made Simple</h1>
        <p className="hero-subtitle">
          Create, track, and manage tickets effortlessly. Fast. Reliable. Secure.
        </p>
        <div className="hero-buttons">
          <Link to="/auth/signup" className="btn-primary">Get Started</Link>
          <Link to="/auth/login" className="btn-outline">Login</Link>
        </div>
      </div>

      {/* ✅ Decorative wave background */}
      <div className="hero-wave">
         <svg viewBox="0 0 1440 320">
            <path
              fill="#bbcbbbff"
              fillOpacity="1"
              d="M0,224L60,213.3C120,203,240,181,360,165.3C480,149,600,139,720,154.7C840,171,960,213,1080,208C1200,203,1320,149,1380,122.7L1440,96V320H0Z"
            ></path>
          </svg>
      </div>
    </section>
  );
}
