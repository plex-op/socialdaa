import { useEffect, useState } from "react";

const milestones = [
  ["Mokanakshmi", "100K", "13 reels to 100K"],
  ["Nature Foody", "100K", "Growth in 1 month"],
  ["Shanti Ayurveda", "100K", "Growth in 40 days"],
  ["Rakaniya", "100K", "Growth in 3 months"],
  ["Swati Netaji", "100K", "Growth in 5 months"],
  ["Ethnic Tanjore Paintings", "100K", "Growth in 64 reels"],
  ["Madhukumaresh", "100K", "Growth in 3 months"],
  ["Parampara", "60K", "Growth in 1 month"],
  ["Saravanan Sir", "425K", "Instagram growth"],
  ["Dot 6", "100K", "Growth in 2 months"],
  ["Sivapriya", "100K", "Growth in 6 months"],
  ["John", "27K", "Followers in one reel"],
  ["Litwin Sanjit", "200K", "Growth in 5 months"],
  ["Swathi ARC", "100K", "Growth in 1 year"],
  ["Arun Annadurai", "100K", "Growth in 6 months"],
  ["Chenduram", "100K", "Growth in 3 months"],
  ["Abinaya Vijayan", "202K", "31K to 202K growth"],
  ["Dr. Harini", "200K", "Instagram growth"],
  ["Dr. Lokesh", "100K", "Growth in 150 videos"],
  ["Nisha Mam", "100K", "Instagram growth"],
  ["Sage", "152K", "Growth in 6 months"],
  ["Nilan", "100K", "Growth in 6 months"],
  ["Prasanth RM", "100K", "Growth in 6 months"],
  ["Shanthi Ayurveda", "100K", "Growth in 3 months"],
  ["Shreevarma", "210K", "Instagram growth"],
  ["Tech with Kavitha", "100K", "Instagram growth"],
  ["Suganya Naidu", "100K", "Instagram growth"],
];

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 2)
    .toUpperCase();
}

export default function FloatingCta({ visible, onApply }) {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(
    () => window.localStorage.getItem("socialdaa-growth-dismissed") === "true",
  );

  useEffect(() => {
    if (!visible || dismissed) return undefined;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % milestones.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [visible, dismissed]);

  const closeNotification = (event) => {
    event.stopPropagation();
    window.localStorage.setItem("socialdaa-growth-dismissed", "true");
    setDismissed(true);
  };

  if (dismissed) return null;

  const [name, followers, detail] = milestones[index];

  return (
    <div className={`floating-growth ${visible ? "visible" : ""}`}>
      <div className="growth-notification">
        <button
          className="growth-open"
          type="button"
          onClick={onApply}
          aria-label={`${name} reached ${followers} followers. Start your application`}
        >
          <span className="growth-avatar" aria-hidden="true">
            {getInitials(name)}
          </span>
          <span className="growth-copy">
            <strong>{name}</strong>
            <b>{followers} followers</b>
            <small>{detail}</small>
          </span>
        </button>
        <button
          className="growth-close"
          type="button"
          aria-label="Close notification"
          onClick={closeNotification}
        >
          ×
        </button>
      </div>
    </div>
  );
}
