import { useEffect, useState } from "react";

export default function ApplicationOverlay({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").replace(/\D/g, "");
    const email = String(data.get("email") || "").trim();
    const revenue = String(data.get("revenue") || "");
    const budget = String(data.get("budget") || "");

    if (!name) return setError("Please enter your name.");
    if (phone.length < 10)
      return setError("Please enter a valid 10-digit WhatsApp number.");
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setError("Please enter a valid email.");
    if (data.get("brand") === "Company brand" && !revenue)
      return setError("Please select your monthly revenue range.");
    if (!budget)
      return setError("Please answer the package investment question.");

    setError("");
    setSubmitted(true);
  }

  return (
    <div
      className="application-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-title"
    >
      <div className="application-bar">
        <button className="back-button" onClick={onClose}>
          ← Back
        </button>
        <a className="logo" href="#top">
          SOCIAL<i>DAA</i>
        </a>
      </div>
      <div className="application-grid">
        <div>
          <h2 id="application-title">
            Apply to work with <span className="highlight">Socialdaa.</span>
          </h2>
          <ul className="application-checks">
            <li>No prior content or camera experience needed.</li>
            <li>Unga details confidential-ah irukkum.</li>
            <li>Our team reviews every application.</li>
            <li>Selected applicants get a strategy call.</li>
            <li>Socialdaa packages start from ₹1 lakh + GST.</li>
          </ul>
        </div>

        {!submitted ? (
          <form className="application-form" onSubmit={submit} noValidate>
            <label>What brand do you want to build?</label>
            <select name="brand">
              <option>Personal brand</option>
              <option>Company brand</option>
            </select>
            <label>Full name</label>
            <input name="name" autoComplete="name" />
            <label>WhatsApp number</label>
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="98765 43210"
            />
            <label>Email</label>
            <input name="email" type="email" autoComplete="email" />
            <label>I am a…</label>
            <select name="role">
              <option>Founder / Entrepreneur</option>
              <option>MD / CEO</option>
              <option>CXO / Senior Executive</option>
              <option>Coach / Consultant</option>
              <option>Professional / Domain Expert</option>
              <option>Creator</option>
              <option>Fashion &amp; Lifestyle</option>
            </select>
            <label>Why do you want a personal brand?</label>
            <select name="goal">
              <option>Grow clients / business</option>
              <option>Build industry authority</option>
              <option>Grow audience &amp; visibility</option>
              <option>Unlock career opportunities</option>
              <option>Attract brand deals</option>
              <option>Attract investors</option>
              <option>Speaking / media opportunities</option>
            </select>
            <label>Instagram / LinkedIn (optional)</label>
            <input name="social" placeholder="@handle or profile link" />
            <label>
              Monthly revenue{" "}
              <span className="optional">(select if applying with a company)</span>
            </label>
            <select name="revenue">
              <option value="">Select a range</option>
              <option>₹1 lakh – ₹5 lakhs</option>
              <option>₹5 lakhs – ₹10 lakhs</option>
              <option>₹10 lakhs – ₹15 lakhs</option>
              <option>₹15 lakhs – ₹20 lakhs</option>
              <option>₹20 lakhs – ₹25 lakhs</option>
              <option>₹25 lakhs+</option>
            </select>
            <label>
              Are you comfortable investing ₹1 lakh + GST in personal branding?
            </label>
            <select name="budget">
              <option value="">Select an option</option>
              <option>Yes, ₹1 lakh + GST is within my budget</option>
              <option>I am open to discussing the right package</option>
              <option>Not at this stage</option>
            </select>
            <div className="form-error">{error}</div>
            <button className="btn form-submit" type="submit">
              Submit Application
            </button>
          </form>
        ) : (
          <div className="application-success">
            <h2>
              Thank <span className="highlight">you.</span>
            </h2>
            <p>
              We’ve received your application. Our team will review it and reach
              out on WhatsApp.
            </p>
            <button className="btn" onClick={onClose}>
              Back to site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
