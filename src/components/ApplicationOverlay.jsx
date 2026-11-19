import { useEffect, useState } from "react";

export default function ApplicationOverlay({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Reaching 100K followers in just 29 reels felt surreal. One reel crossed 15.7 million views and brought in 35K followers in two days.",
      name: "Dr. Abinaya Vijayan",
      role: "Fertility Specialist",
    },
    {
      quote:
        "Crossing 100K wouldn't have been possible without Socialdaa. From scripting and videography to editing, everyone played a crucial role.",
      name: "Swathi",
      role: "Architect & Luxury Interior Designer",
    },
    {
      quote:
        "Hitting 100K followers in just 2 months has been an incredible journey. We didn't miss the mark - we nailed it.",
      name: "Dr. Hanan",
      role: "Dermatologist",
    },
    {
      quote:
        "Crossing 100K has been amazing. The team made every shoot seamless, fun and completely worthwhile.",
      name: "Dr. Surya",
      role: "Dermatologist",
    },
    {
      quote:
        "Partnering with Socialdaa took us to 100K in a record-breaking 13 videos and now past 200K.",
      name: "Dr. Sakthivel Sivasubramanian",
      role: "Chief Endocrinologist",
    },
    {
      quote:
        "Crossing 100K on my personal page is a huge step toward 1 million. Team Socialdaa has been my biggest support.",
      name: "Arun Annadurai",
      role: "Creator & Entrepreneur",
    },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const timer = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [open, testimonials.length]);

  if (!open) return null;

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").replace(/\D/g, "");
    const email = String(data.get("email") || "").trim();
    const revenue = String(data.get("revenue") || "");
    const budget = String(data.get("budget") || "");
    const expectations = String(data.get("expectations") || "");
    const profession = String(data.get("profession") || "").trim();

    if (!name) return setError("Please enter your name.");
    if (phone.length < 10)
      return setError("Please enter a valid 10-digit WhatsApp number.");
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setError("Please enter a valid email.");
    if (data.get("brand") === "Company brand" && !revenue)
      return setError("Please select your monthly revenue range.");
    if (!budget)
      return setError("Please answer the package investment question.");
    if (!expectations)
      return setError(
        "Please select your primary expectation from our services.",
      );
    if (!profession)
      return setError("Please tell us what profession or business you are in.");

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

          <div className="application-testimonial" key={testimonialIndex}>
            <span className="application-testimonial-label">Client story</span>
            <blockquote>“{testimonials[testimonialIndex].quote}”</blockquote>
            <div className="application-testimonial-person">
              <strong>{testimonials[testimonialIndex].name}</strong>
              <small>{testimonials[testimonialIndex].role}</small>
            </div>
          </div>
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
              <option>Founder</option>
              <option>MD / CEO</option>
              <option>CXO</option>
              <option>Coach / Consultant</option>
              <option>Professional / Expert</option>
              <option>Creator</option>
              <option>Fashion / Lifestyle</option>
            </select>
            <label>What profession or business are you in?</label>
            <input
              name="profession"
              placeholder="Example: Dermatologist, Interior Designer, Startup"
            />
            <label>What are your primary expectations from our services?</label>
            <select name="expectations">
              <option value="">Select your primary expectation</option>
              <option>Visibility</option>
              <option>Authority</option>
              <option>Sales Growth</option>
              <option>All of the above</option>
            </select>
            <label>Instagram / LinkedIn (optional)</label>
            <input name="social" placeholder="@handle or profile link" />
            <label>
              Monthly revenue{" "}
              <span className="optional">
                (select if applying with a company)
              </span>
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
