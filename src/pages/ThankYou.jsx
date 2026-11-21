import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./ThankYou.css";

export default function ThankYou() {
  const location = useLocation();
  const application = location.state?.application;

  return (
    <div className="thank-you-page">
      <div className="thank-you-card">
        <div className="thank-you-icon">✓</div>

        <span className="thank-you-eyebrow">APPLICATION RECEIVED</span>

        <h1>
          Thank <span>you!</span>
        </h1>

        <p className="thank-you-description">
          Your personal branding application has been successfully submitted.
        </p>

        <div className="thank-you-divider" />

        <h3>What's next?</h3>

        <p>
          Our team will review your application and contact you shortly on
          WhatsApp.
        </p>

        <div className="thank-you-info">
          <div>01</div>
          <p>Our team reviews your brand details.</p>
        </div>

        <div className="thank-you-info">
          <div>02</div>
          <p>We connect with you to understand your goals.</p>
        </div>

        <div className="thank-you-info">
          <div>03</div>
          <p>We discuss the right personal branding strategy.</p>
        </div>

        {application?.name && (
          <p className="thank-you-person">
            Application submitted by <strong>{application.name}</strong>
          </p>
        )}

        <Link to="/" className="thank-you-button">
          Back to Home →
        </Link>

        <Link to="/dashboard" className="thank-you-dashboard-link">
          View lead dashboard
        </Link>

        <p className="thank-you-footer">
          SOCIALDAA · BUILD YOUR PERSONAL BRAND
        </p>
      </div>
    </div>
  );
}
