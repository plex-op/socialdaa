export default function FloatingCta({ visible, onApply }) {
  return (
    <div className={`floating-cta ${visible ? "visible" : ""}`}>
      <button className="btn" onClick={onApply}>
        Start Your Application
      </button>
    </div>
  );
}
