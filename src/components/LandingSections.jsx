import { useEffect, useRef, useState } from "react";

export function StatementSection() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const text = ref.current.textContent.trim();
    ref.current.innerHTML = text
      .split(/\s+/)
      .map((word) => `<span>${word}</span>`)
      .join(" ");
    const update = () => {
      const rect = ref.current.getBoundingClientRect();
      const progress =
        (innerHeight * 0.85 - rect.top) / (rect.height + innerHeight * 0.3);
      const visible = Math.round(
        Math.max(0, Math.min(1, progress)) * ref.current.children.length,
      );
      Array.from(ref.current.children).forEach((word, index) =>
        word.classList.toggle("on", index < visible),
      );
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);
  return (
    <section>
      <div className="wrap">
        <p ref={ref} className="scrub">
          You know your name should carry weight. What’s missing isn’t talent.
          It’s the time, the team and a system to do it properly.
        </p>
      </div>
    </section>
  );
}

export function UrgencySection() {
  return (
    <section className="urgency-section">
      <div className="wrap">
        <div className="urgency-grid">
          <div>
            <div className="eyebrow">Your market is not waiting</div>
            <h2>
              Your competitors are becoming familiar.{" "}
              <span className="highlight">Are you?</span>
            </h2>
          </div>
          <p>
            In every industry, people choose the expert they already know and
            trust. The right content turns your experience into authority,
            visibility and demand - before the first sales conversation.
          </p>
        </div>
        <div className="agency-proof-strip">
          <div>
            <strong>Authority</strong>
            <small>Position yourself as the trusted expert</small>
          </div>
          <div>
            <strong>Visibility</strong>
            <small>Stay consistently present in your market</small>
          </div>
          <div>
            <strong>Demand</strong>
            <small>Attract better clients and opportunities</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const metrics = [
    ["2M+", "Followers"],
    ["400M+", "Organic Views"],
    ["12,000+", "Leads"],
    ["2,500+", "Content Delivered"],
  ];

  return (
    <section className="how-section">
      <div className="wrap">
        <div className="how-grid">
          <div className="how-title">
            <div className="eyebrow">Our approach</div>
            <h2>
              How we
              <br />
              do it?
            </h2>
          </div>

          <div className="how-metrics">
            {metrics.map(([value, label]) => (
              <div className="how-metric" key={label}>
                <span className="metric-icon">✦</span>
                <div>
                  <strong>{value}</strong>
                  <small>{label}</small>
                </div>
              </div>
            ))}
          </div>

          <div className="how-story">
            <div className="how-portraits">
              <div className="portrait portrait-team">[Team photo]</div>
              <div className="portrait portrait-founder">[Founder photo]</div>
            </div>
            <p>
              Like How Thalaivar says “Enga Valzhi thami vazhi” - we do it in
              our own unique way. Create end-to-end content for your Instagram.
              We create reels, carousels, memes and daily stories for your page,
              grow your Instagram organically and build a community of followers
              that converts into paid customers.
            </p>
          </div>

          <blockquote className="how-quote">
            Like How Thalaivar says “Enga Valzhi thami vazhi”
            <span>we do it in our own unique way!</span>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export function AudienceSection() {
  const audiences = [
    "Founders & Entrepreneurs",
    "MDs & CEOs",
    "CXOs & Senior Leaders",
    "Coaches & Consultants",
    "Professionals & Domain Experts",
    "Creators & Thought Leaders",
  ];

  return (
    <section className="audience-section">
      <div className="wrap">
        <div className="audience-heading">
          <div>
            <div className="eyebrow">Built for credible voices</div>
            <h2>Who Socialdaa is for</h2>
          </div>
          <p>
            For people who already have valuable expertise - and want it to reach
            the market clearly and consistently.
          </p>
        </div>
        <div className="audience-grid">
          {audiences.map((audience) => (
            <div className="audience-card" key={audience}>
              <span>✓</span>
              <strong>{audience}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkSection({ onApply }) {
  const videos = [
    {
      name: "Swathi",
      role: "Architect & Luxury Interior Designer",
      src: "https://ik.imagekit.io/ohcrl5hvv/Testimonial%20PB/Swatrhi%20mam%20100k%20remastered.mp4",
    },
    {
      name: "Dr. Abinaya Vijayan",
      role: "100K followers in 29 reels",
      src: "https://ik.imagekit.io/ohcrl5hvv/Testimonial%20PB/100k%20Followers%20in%2029%20Reels!%20__%20Real%20OG%20@dr.abinaya_vijayan%20%E2%9D%A4%EF%B8%8F%E2%AD%90%EF%B8%8F%20Sometimes%20the%20universe%20gives%20y.mp4",
    },
    {
      name: "Dr. Hanan",
      role: "100K followers in 2 months",
      src: "https://ik.imagekit.io/ohcrl5hvv/Testimonial%20PB/Here%20we%20go%20100k%20in%20just%202%20Months%20%E2%9C%A8%E2%9D%A4%EF%B8%8FNext%20Stop%20500k%20_The%20Hardwork%20,%20The%20Late%20Night%20Shoots%20,%20Mana.mp4",
    },
  ];

  const [playingIndex, setPlayingIndex] = useState(-1);

  const togglePlayback = (event, index) => {
    event.stopPropagation();
    const reel = event.currentTarget.closest(".reel");
    const video = reel?.querySelector("video");
    if (!video) return;

    document.querySelectorAll(".reel video").forEach((otherVideo) => {
      if (otherVideo !== video) otherVideo.pause();
    });

    if (video.paused) {
      video.muted = false;
      video.controls = true;
      video
        .play()
        .then(() => setPlayingIndex(index))
        .catch(() => {});
    } else {
      video.pause();
      setPlayingIndex(-1);
    }
  };

  return (
    <section className="center-section work-section" id="work">
      <div className="wrap">
        <div className="eyebrow">Client milestone videos</div>
        <h2>
          The growth they achieved{" "}
          <span className="highlight">with Socialdaa.</span>
        </h2>
        <div className="reels">
          {videos.map((video, index) => (
            <div
              className="reel"
              key={video.src}
              role="button"
              tabIndex={0}
              onClick={(event) => {
                if (event.target.tagName === "VIDEO") return;
                togglePlayback(event, index);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  togglePlayback(event, index);
                }
              }}
            >
              <video
                src={video.src}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={`${video.name} testimonial video`}
                onPlay={() => setPlayingIndex(index)}
                onPause={() =>
                  setPlayingIndex((current) =>
                    current === index ? -1 : current,
                  )
                }
              />
              <span className="recording">
                <b />
                REC
              </span>
              <span
                className={`reel-play ${playingIndex === index ? "hidden" : ""}`}
              >
                ▶
              </span>
              <span className="reel-caption">
                <strong>{video.name}</strong>
                <small>{video.role}</small>
              </span>
            </div>
          ))}
        </div>
        <p className="tap">Tap a milestone to watch their story with sound</p>
        <button className="btn" onClick={onApply}>
          Apply Now
        </button>
      </div>
    </section>
  );
}

// export function FounderSection({ onApply }) {
//   return (
//     <section>
//       <div className="wrap">
//         <div className="founder-grid">
//           <div className="founder-photo">[Founder photo]</div>
//           <div>
//             <div className="eyebrow">The people behind it</div>
//             <h2>
//               Led by <span className="highlight">[Founder Name].</span>
//             </h2>
//             <div className="founder-name">
//               [Founder Name]
//               <small>[Title · e.g. Founder, Socialdaa]</small>
//             </div>
//             <div className="stats">
//               <div>
//                 <b>[Stat]</b>
//                 <small>[Label]</small>
//               </div>
//               <div>
//                 <b>[Stat]</b>
//                 <small>[Label]</small>
//               </div>
//               <div>
//                 <b>[Stat]</b>
//                 <small>[Label]</small>
//               </div>
//             </div>
//             <p className="founder-copy">
//               [Two or three lines on the founder’s experience, credentials and
//               why Socialdaa exists. Use only verified facts.]
//             </p>
//             <button className="btn" onClick={onApply}>
//               Apply Now
//             </button>
//           </div>
//         </div>
//         <div className="logos">
//           <span>[Logo]</span>
//           <span>[Logo]</span>
//           <span>[Logo]</span>
//           <span>[Logo]</span>
//         </div>
//       </div>
//     </section>
//   );
// }

export function BenefitsSection() {
  const items = [
    "opens the right doors",
    "builds authority in your field",
    "gets you remembered",
    "earns trust before the first meeting",
    "makes your name carry weight",
    "builds a legacy beyond your title",
  ];
  return (
    <section className="benefits-section">
      <div className="wrap">
        <div className="eyebrow">A powerful personal brand…</div>
        {items.map((item) => (
          <p className="benefit" key={item}>
            {item}
          </p>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Reaching 100K followers in just 29 reels felt surreal! Having a single reel cross 15.7 million views and bring in 35K followers in just two days completely transformed my page.",
      name: "Dr. Abinaya Vijayan",
      role: "Fertility Specialist · 100K in 29 reels",
    },
    {
      quote:
        "Crossing 100K followers wouldn't have been possible without Socialdaa and my husband Saravanan. From scripting and videography to editing, everyone played a crucial role.",
      name: "Swathi",
      role: "Architect & Luxury Interior Designer · 100K",
    },
    {
      quote:
        "Hitting 100K followers in just 2 months has been an incredible journey! We didn't miss the mark this time - we nailed it.",
      name: "Dr. Hanan",
      role: "Dermatologist · 100K in 2 months",
    },
    {
      quote:
        "Crossing the 100K family milestone has been amazing! Even through the behind-the-scenes retakes and laughs during shoots, the team made the entire process seamless and fun.",
      name: "Dr. Surya",
      role: "Dermatologist · 52K to 114K",
    },
    {
      quote:
        "Partnering with Socialdaa completely changed the game - taking us to 100K followers in a record-breaking 13 videos and now past 200K.",
      name: "Dr. Sakthivel Sivasubramanian",
      role: "Chief Endocrinologist · 100K in 13 videos",
    },
    {
      quote:
        "Crossing 100K on my personal page is a huge step toward hitting 1 million. Team Socialdaa has been my biggest backbone and support.",
      name: "Arun Annadurai",
      role: "Creator & Entrepreneur · 42K to 100K+",
    },
  ];

  const [index, setIndex] = useState(0);
  const move = (step) =>
    setIndex(
      (current) => (current + step + testimonials.length) % testimonials.length,
    );

  return (
    <section className="center-section testimonial-section">
      <div className="wrap">
        <div className="eyebrow">Client voices</div>
        {testimonials.map(
          (testimonial, i) =>
            i === index && (
              <div className="testimonial-slide" key={testimonial.name}>
                <blockquote>“{testimonial.quote}”</blockquote>
                <div className="testimonial-person">
                  <span className="avatar" />
                  <div>
                    {testimonial.name}
                    <small>{testimonial.role}</small>
                  </div>
                </div>
              </div>
            ),
        )}
        <div className="carousel-controls">
          <button onClick={() => move(-1)} aria-label="Previous testimonial">
            ←
          </button>
          <div className="dots">
            {testimonials.map((_, i) => (
              <i
                className={i === index ? "on" : ""}
                key={i}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button onClick={() => move(1)} aria-label="Next testimonial">
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export function ObjectionsSection() {
  const cards = [
    [
      "I don’t have time",
      "We script, shoot and edit everything. Your part is to show up on shoot days. Unga time-ah namma paathukrom.",
    ],
    [
      "I’m not sure what to say",
      "We draw out your story and write every script in your own voice.",
    ],
    [
      "I’m not good on camera",
      "Our team guides you on shoot day, line by line. Camera-la comfortable-ah irukka help pannuvom.",
    ],
    [
      "I don’t understand social media",
      "You don’t have to. We handle the strategy, the edits and the posting plan.",
    ],
  ];
  const rail = useRef(null);
  const [flipped, setFlipped] = useState([]);
  return (
    <section>
      <div className="wrap">
        <div className="eyebrow">Be honest</div>
        <h2>What’s stopping you?</h2>
        <p className="section-copy">
          Every leader has a reason to wait. Tap the one that sounds like you.
        </p>
        <div className="objection-cards" ref={rail}>
          {cards.map(([front, back], index) => (
            <button
              className={`objection-card ${flipped.includes(index) ? "flipped" : ""}`}
              key={front}
              onClick={() =>
                setFlipped((current) =>
                  current.includes(index)
                    ? current.filter((i) => i !== index)
                    : [...current, index],
                )
              }
            >
              <span className="card-inner">
                <span className="card-face">
                  <small>+ Tap</small>
                  <strong>{front}</strong>
                </span>
                <span className="card-back">{back}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="scroll-controls">
          <button
            onClick={() =>
              rail.current?.scrollBy({ left: -310, behavior: "smooth" })
            }
          >
            ‹
          </button>
          <span>Swipe</span>
          <button
            onClick={() =>
              rail.current?.scrollBy({ left: 310, behavior: "smooth" })
            }
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ onApply }) {
  return (
    <section className="center-section final-cta">
      <div className="wrap">
        <h2>
          Your industry already has a few familiar faces.{" "}
          <em>Will you be one of them?</em>
        </h2>
        <button className="btn" onClick={onApply}>
          Apply Now
        </button>
        <p className="note">Application-based · Takes 2 minutes</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-row">
          <a href="mailto:hello@socialdaa.com">hello@socialdaa.com</a>
          <a className="logo" href="#top">
            SOCIAL<i>DAA</i>
          </a>
          <a href="#">Terms &amp; Conditions</a>
        </div>
        <p className="footer-fine">
          © 2026 Socialdaa. All rights reserved. Individual results vary with
          niche, consistency and audience.
        </p>
      </div>
    </footer>
  );
}
