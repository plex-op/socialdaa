// import heroImage from "../assets/hero.png";

export function Header({ onApply }) {
  return (
    <header className="hero">
      <div className="hero-visual">
        <div className="hero-showreel">
          <span className="showreel-label">Socialdaa showreel</span>
          <span className="showreel-play">▶</span>
          <span className="showreel-caption">
            Strategy · Script · Shoot · Edit
          </span>
        </div>
        <div className="hero-glow" />
      </div>

      <div className="top">
        <a className="logo" href="#top">
          SOCIAL<i>DAA</i>
        </a>
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">
          Attention: founders, CXOs &amp; experts
        </div>
        <h1>
          Your expertise deserves to be <span className="highlight">seen.</span>
        </h1>
        <p className="sub">
          We build personal brands that earn trust, create authority and turn
          attention into real opportunities.
        </p>
        <p className="tagline">Unga expertise-ku oru strong, trusted face.</p>
        <p className="service-line">Strategy · Scripting · Shoot · Editing</p>
        <button className="btn btn-wide" onClick={onApply}>
          Build My Personal Brand
        </button>
        <p className="note">Application-based · Limited monthly onboarding</p>
      </div>

      <div className="hero-proof" aria-label="Socialdaa service proof">
        <div>
          <strong>Strategic</strong>
          <small>Personal positioning</small>
        </div>
        <div>
          <strong>Done for you</strong>
          <small>Script to final edit</small>
        </div>
        <div>
          <strong>Built for trust</strong>
          <small>Not vanity content</small>
        </div>
      </div>
    </header>
  );
}
