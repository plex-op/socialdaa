import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header.jsx";
import ApplicationOverlay from "./components/ApplicationOverlay.jsx";
import FloatingCta from "./components/FloatingCta.jsx";

import {
  // StatementSection,
  UrgencySection,
  ProcessSection,
  AudienceSection,
  WorkSection,
  // FounderSection,
  // BenefitsSection,
  TestimonialsSection,
  // ObjectionsSection,
  FinalCta,
  Footer,
} from "./components/LandingSections.jsx";

import ThankYou from "./pages/ThankYou.jsx";

import "./socialdaa.css";

function Home() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [floatingVisible, setFloatingVisible] = useState(false);

  useEffect(() => {
    setFloatingVisible(true);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setApplicationOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const openApplication = () => setApplicationOpen(true);

  return (
    <div id="top">
      <Header onApply={openApplication} />
      <WorkSection onApply={openApplication} />
      <AudienceSection />
      {/* <StatementSection /> */}
      <UrgencySection />
      <ProcessSection />

      {/* <BenefitsSection /> */}
      <TestimonialsSection />
      {/* <ObjectionsSection /> */}

      {/* 
      <section className="center-section closing-statement">
        <div className="wrap">
          <p className="scrub closing-copy">
            No more excuses. From first idea to final edit, we take care of
            everything. All you need to do is start.
          </p>
          <button className="btn" onClick={openApplication}>
            Apply Now
          </button>
        </div>
      </section>
      */}

      <FinalCta onApply={openApplication} />
      <Footer />

      <FloatingCta
        visible={floatingVisible && !applicationOpen}
        onApply={openApplication}
      />

      <ApplicationOverlay
        open={applicationOpen}
        onClose={() => setApplicationOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}

export default App;
