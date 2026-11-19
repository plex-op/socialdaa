import { useEffect, useState } from "react";

export default function ApplicationOverlay({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [leadData, setLeadData] = useState(null);
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
    if (open) {
      setSubmitted(false);
      setStep(1);
      setError("");
      setLeadData(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const timer = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [open, testimonials.length]);

  if (!open) return null;

  function nextStep(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").replace(/\D/g, "");
    const email = String(data.get("email") || "").trim();

    if (!name) return setError("Please enter your name.");
    if (phone.length < 10)
      return setError("Please enter a valid 10-digit WhatsApp number.");
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setError("Please enter a valid email.");

    setError("");
    setLeadData({ name, phone, email });
    setStep(2);
  }

  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const revenue = String(data.get("revenue") || "");
    const budget = String(data.get("budget") || "");
    const expectations = String(data.get("expectations") || "");
    const profession = String(data.get("profession") || "").trim();

    if (!profession)
      return setError("Please tell us what profession or business you are in.");
    if (!expectations)
      return setError("Please select your primary expectation from our services.");
    if (data.get("brand") === "Company brand" && !revenue)
      return setError("Please select your monthly revenue range.");
    if (!budget)
      return setError("Please answer the package investment question.");

    setError("");

    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        event_category: "Application",
        event_label: String(data.get("brand") || "Personal brand"),
        value: 1,
      });
    }

    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }

    setSubmitted(true);
  }

  function handleFinalSubmit() {
    // Handle the final submission to the server or any other logic here
    console.log("Final submission data:", leadData);
    setSubmitted(true);
  }

  return (
    <div
      className="application-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="application-modal">
        <button
          className="application-close"
          type="button"
          onClick={onClose}
          aria-label="Close application"
        >
          ×
        </button>

        {!submitted ? (
          <>
            <div className="application-modal-header">
              <span className="application-kicker">Socialdaa application</span>
              <h2 id="application-title">
                {step === 1 ? "Reserve My Free Session" : "Tell us about your brand"}
              </h2>
              <p>
                {step === 1
                  ? "Fill out the short form. Join your one-on-one session."
                  : "A few details to understand your brand and goals."}
              </p>
              <div className="application-progress">
                <span className={step === 1 ? "active" : ""}>1</span>
                <i />
                <span className={step === 2 ? "active" : ""}>2</span>
              </div>
            </div>

            {step === 1 ? (
              <form className="application-form" onSubmit={nextStep} noValidate>
                <label>Full name</label>
                <input name="name" autoComplete="name" placeholder="Dr. Your name" defaultValue={leadData?.name || ""} />

                <label>WhatsApp number</label>
                <div className="application-phone-field">
                  <span>+91</span>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="98765 43210"
                    defaultValue={leadData?.phone || ""}
                  />
                </div>

                <label>Email</label>
                <input name="email" type="email" autoComplete="email" placeholder="you@clinic.com" defaultValue={leadData?.email || ""} />

                <div className="form-error">{error}</div>
                <button className="btn form-submit application-primary-action" type="submit">
                  Continue <span>→</span>
                </button>
                <p className="application-assurance">No fee. No hidden charges.</p>
              </form>
            ) : (
              <form className="application-form application-form-step-two" onSubmit={submit} noValidate>
                <div className="application-field-row">
                  <div>
                    <label>What brand do you want to build?</label>
                    <select name="brand">
                      <option>Personal brand</option>
                      <option>Company brand</option>
                    </select>
                  </div>
                  <div>
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
                  </div>
                </div>

                <div className="application-field-row">
                  <div>
                    <label>What profession or business are you in?</label>
                    <input name="profession" placeholder="Example: Dermatologist, Interior Designer, Startup" />
                  </div>
                  <div>
                    <label>Instagram / LinkedIn (optional)</label>
                    <input name="social" placeholder="@handle or profile link" />
                  </div>
                </div>

                <div className="application-field-row">
                  <div>
                    <label>What are your primary expectations from our services?</label>
                    <select name="expectations">
                      <option value="">Select your primary expectation</option>
                      <option>Visibility</option>
                      <option>Authority</option>
                      <option>Sales Growth</option>
                      <option>All of the above</option>
                    </select>
                  </div>
                  <div>
                    <label>Monthly revenue <span className="optional">(if company)</span></label>
                    <select name="revenue">
                      <option value="">Select a range</option>
                      <option>₹1 lakh – ₹5 lakhs</option>
                      <option>₹5 lakhs – ₹10 lakhs</option>
                      <option>₹10 lakhs – ₹15 lakhs</option>
                      <option>₹15 lakhs – ₹20 lakhs</option>
                      <option>₹20 lakhs – ₹25 lakhs</option>
                      <option>₹25 lakhs+</option>
                    </select>
                  </div>
                </div>

                <label>Are you comfortable investing ₹1 lakh + GST in personal branding?</label>
                <select name="budget">
                  <option value="">Select an option</option>
                  <option>Yes, ₹1 lakh + GST is within my budget</option>
                  <option>I am open to discussing the right package</option>
                  <option>Not at this stage</option>
                </select>

                <div className="form-error">{error}</div>
                <button
                  className="application-back-step"
                  type="button"
                  onClick={() => {
                    setError("");
                    setStep(1);
                  }}
                >
                  ← Edit your details
                </button>
                <button className="btn form-submit application-primary-action" type="submit">
                  Submit Application <span>→</span>
                </button>
              </form>
            )}
          </>
        ) : (
          <div className="application-success">
            <span className="application-success-icon">✓</span>
            <div className="eyebrow">Application received</div>
            <h2>Thank <span className="highlight">you.</span></h2>
            <p>We’ve received your application. Our team will review it and reach out on WhatsApp.</p>
            <button className="btn application-primary-action" onClick={onClose}>Back to Socialdaa</button>
          </div>
        )}
      </div>
    </div>
  );
}
