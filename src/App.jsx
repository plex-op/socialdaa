import { useEffect, useState } from "react";
import { Header } from "./components/Header.jsx";
import ApplicationOverlay from "./components/ApplicationOverlay.jsx";
import FloatingCta from "./components/FloatingCta.jsx";
import {
  StatementSection,
  UrgencySection,
  ProcessSection,
  AudienceSection,
  WorkSection,
  FounderSection,
  BenefitsSection,
  TestimonialsSection,
  ObjectionsSection,
  FinalCta,
  Footer,
} from "./components/LandingSections.jsx";
import "./socialdaa.css";

function App() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [floatingVisible, setFloatingVisible] = useState(false);

  useEffect(() => {
    const updateFloatingCta = () => {
      setFloatingVisible(window.scrollY > window.innerHeight * 0.8);
    };

    updateFloatingCta();
    window.addEventListener("scroll", updateFloatingCta, { passive: true });
    return () => window.removeEventListener("scroll", updateFloatingCta);
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
      <StatementSection />
      <UrgencySection />
      <ProcessSection />
      <AudienceSection />
      <FounderSection onApply={openApplication} />
      <BenefitsSection />
      <TestimonialsSection />
      <ObjectionsSection />

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

export default App;
