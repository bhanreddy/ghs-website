/* eslint-disable @next/next/no-img-element */
import React from "react";

const PLAYSTORE_URL =
  "https://play.google.com/store/apps/details?id=com.nexsyrussims.geetanjalihighschool";
const LOGO = "/logo.png";
const QR_IMAGE = "/playstore-qr.png";

/**
 * Official Google Play Store multicolored 4-segment icon.
 */
export function PlayStoreIcon({
  size = 22,
  className = "playstore-icon",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 466 512"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
      }}
    >
      <path
        fill="#EA4335"
        d="M199.9 237.8 1.4 470.17c7.22 24.57 30.16 41.81 55.8 41.81 11.16 0 20.93-2.79 29.3-8.37l244.16-139.46L199.9 237.8z"
      />
      <path
        fill="#FBBC04"
        d="m433.91 205.1-104.65-60-111.61 110.22 113.01 108.83 104.64-58.6c18.14-9.77 30.7-29.3 30.7-50.23-1.4-20.93-13.95-40.46-32.09-50.22z"
      />
      <path
        fill="#34A853"
        d="M199.42 273.45 329.27 145.1 87.9 8.37C79.53 2.79 68.36 0 57.2 0 30.7 0 6.98 18.14 1.4 41.86l198.02 231.59z"
      />
      <path
        fill="#4285F4"
        d="M1.39 41.86C0 46.04 0 51.63 0 57.2v397.64c0 5.57 0 9.76 1.4 15.34l216.27-214.86L1.39 41.86z"
      />
    </svg>
  );
}

/**
 * Standard Play Store CTA Button.
 */
export function PlayStoreButton({
  variant = "default",
  className = "",
}: {
  variant?: "hero" | "large" | "default";
  className?: string;
}) {
  return (
    <a
      href={PLAYSTORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-playstore ${variant === "large" ? "btn-playstore-large" : ""} ${className}`}
      data-cursor="hover"
      title="Download Geetanjali High School App on Google Play Store"
      aria-label="Download Geetanjali High School App on Google Play Store"
    >
      <PlayStoreIcon size={variant === "large" ? 28 : 22} />
      <span className="btn-playstore-txt">
        <span className="t-sub">GET IT ON</span>
        <span className="t-main">Google Play</span>
      </span>
    </a>
  );
}

/**
 * Dedicated App Showcase Section implemented right next to the Hero section.
 */
export function SchoolApp() {
  const features = [
    {
      icon: "⚡",
      title: "Real-time Attendance",
      desc: "Instant notifications when your child arrives and departs school.",
    },
    {
      icon: "📊",
      title: "Marks & Progress Cards",
      desc: "Access formative & summative assessments, grades, and teacher remarks.",
    },
    {
      icon: "🚌",
      title: "School Bus Tracking",
      desc: "Live GPS route tracking and pick-up / drop-off alerts.",
    },
    {
      icon: "📝",
      title: "Daily Homework & Routine",
      desc: "Track daily assignments, test timetables, and class schedules.",
    },
    {
      icon: "💳",
      title: "Fee Portal & Receipts",
      desc: "Check due dates, payment history, and instant digital receipts.",
    },
    {
      icon: "🔔",
      title: "Instant School Circulars",
      desc: "Never miss vital circulars, holiday notices, and school events.",
    },
  ];

  return (
    <section id="app" className="section-pad cv app-section">
      <div className="grain"></div>
      <div className="app-aurora-amber"></div>
      <div className="app-aurora-purple"></div>

      <div className="container">
        <div className="app-grid">
          {/* Left Column: App Information & Highlights */}
          <div className="app-info">
            <div className="app-eyebrow-wrap">
              <span className="eyebrow">Official School App · Android</span>
              <span className="app-badge-pill">Free Download</span>
            </div>

            <h2 className="h-d h1 app-title">
              Campus life in your pocket. <br />
              <em className="foil">Download on Play Store.</em>
            </h2>

            <p className="lead app-lead">
              Stay connected with your child&apos;s education anywhere, anytime.
              The official <b>Geetanjali High School</b> mobile application brings
              attendance, report cards, daily homework, fee alerts, and live bus
              tracking right to your fingertips.
            </p>

            {/* Feature Highlights Grid */}
            <div className="app-features-grid">
              {features.map((item, index) => (
                <div className="app-feature-card" key={index}>
                  <div className="app-feature-icon" aria-hidden="true">
                    {item.icon}
                  </div>
                  <div className="app-feature-content">
                    <h3 className="app-feature-title">{item.title}</h3>
                    <p className="app-feature-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs and Verified Badge */}
            <div className="app-actions">
              <PlayStoreButton variant="large" />
              <div className="app-meta-box">
                <div className="app-meta-row">
                  <span className="app-star">★★★★★</span>
                  <span className="app-meta-title">Official GHS Portal</span>
                </div>
                <div className="app-meta-sub">
                  Powered by <b>NexSyrus SIMS</b> · Compatible with Android
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Phone Mockup & Scan QR Station */}
          <div className="app-visual">
            {/* Phone Showcase Frame */}
            <div className="app-phone" data-tilt>
              <div className="app-phone-speaker"></div>
              <div className="app-phone-screen">
                {/* Phone Status Bar */}
                <div className="app-phone-status">
                  <span className="time">9:41</span>
                  <div className="icons">
                    <span>5G</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* App Header */}
                <div className="app-screen-head">
                  <div className="app-screen-brand">
                    <img src={LOGO} alt="GHS Crest" className="app-screen-logo" />
                    <div>
                      <div className="app-screen-name">Geetanjali High School</div>
                      <div className="app-screen-tag">Maddur · Student Portal</div>
                    </div>
                  </div>
                  <div className="app-screen-bell" aria-label="Notifications">
                    🔔<span className="bell-dot"></span>
                  </div>
                </div>

                {/* Student Welcome Banner */}
                <div className="app-student-card">
                  <div className="student-badge">Parent &amp; Student Dashboard</div>
                  <div className="student-welcome">Welcome to GHS Maddur</div>
                  <div className="student-status-chip">
                    <span className="status-live-dot"></span>
                    <span>Today: <b>Present</b> (08:40 AM)</span>
                  </div>
                </div>

                {/* Live App Widgets */}
                <div className="app-screen-widgets">
                  <div className="app-widget-tile">
                    <div className="widget-icon">📝</div>
                    <div className="widget-num">3 Tasks</div>
                    <div className="widget-label">Daily Homework</div>
                  </div>
                  <div className="app-widget-tile">
                    <div className="widget-icon">📊</div>
                    <div className="widget-num">98.2%</div>
                    <div className="widget-label">Academic Score</div>
                  </div>
                  <div className="app-widget-tile">
                    <div className="widget-icon">🚌</div>
                    <div className="widget-num">Route 2</div>
                    <div className="widget-label">Bus On Schedule</div>
                  </div>
                  <div className="app-widget-tile">
                    <div className="widget-icon">💳</div>
                    <div className="widget-num">Cleared</div>
                    <div className="widget-label">Fee Status</div>
                  </div>
                </div>

                {/* Recent Circular Notification in Mockup */}
                <div className="app-mock-notice">
                  <div className="notice-tag">📢 Latest Circular</div>
                  <div className="notice-text">
                    Upcoming Science Exhibition &amp; Parent-Teacher Consultation
                  </div>
                </div>

                {/* Bottom App Nav Bar */}
                <div className="app-phone-nav">
                  <div className="p-nav-item active"><span>🏠</span><small>Home</small></div>
                  <div className="p-nav-item"><span>📅</span><small>Routine</small></div>
                  <div className="p-nav-item"><span>📈</span><small>Marks</small></div>
                  <div className="p-nav-item"><span>👤</span><small>Profile</small></div>
                </div>
              </div>
            </div>

            {/* QR Scan Station Card */}
            <div className="app-qr-card">
              <div className="app-qr-frame">
                <img
                  src={QR_IMAGE}
                  alt="Scan to Download Geetanjali High School App from Google Play"
                  width={140}
                  height={140}
                  className="app-qr-img"
                />
                <div className="qr-scan-line"></div>
              </div>
              <div className="app-qr-content">
                <div className="qr-title">
                  <PlayStoreIcon size={16} />
                  <span>Scan to Download</span>
                </div>
                <p className="qr-desc">
                  Open your smartphone camera or QR scanner to install directly from Google Play Store.
                </p>
                <a
                  href={PLAYSTORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="qr-link"
                  data-cursor="hover"
                >
                  Direct Play Store Link →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
