/* Presentational sections — faithful port of the source markup.
   All interactivity is wired by SiteRuntime via stable ids/classes. */

import type { WebsiteGalleryPhoto } from "@/lib/websiteGallery";

const LOGO = "/logo.png";

export function Nav() {
  return (
    <>
      <nav id="navbar">
        <div className="container nav-inner">
          <a href="#hero" className="nav-logo" data-cursor="hover">
            <img src={LOGO} alt="GHS Maddur" />
            <div className="nav-wm">
              <span className="n">Geetanjali High School</span>
              <span className="s">Maddur · Telangana</span>
            </div>
          </a>
          <div className="nav-links">
            <a href="#about" data-cursor="hover">About</a>
            <a href="#leadership" data-cursor="hover">Leadership</a>
            <a href="#facilities" data-cursor="hover">Campus</a>
            <a href="#gallery" data-cursor="hover">Gallery</a>
            <a href="#contact" data-cursor="hover">Contact</a>
          </div>
          <button className="burger" id="burger" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className="drawer" id="drawer">
        <button className="drawer-x" id="drawerX" aria-label="Close">✕</button>
        <a href="#about">About</a>
        <a href="#leadership">Leadership</a>
        <a href="#facilities">Campus</a>
        <a href="#gallery">Gallery</a>
        <a href="#contact">Contact</a>
      </div>
    </>
  );
}

export function Hero() {
  return (
    <section id="hero">
      <div className="hero-fallback"></div>
      <div className="hero-video-wrap">
        <video
          id="heroVid"
          autoPlay
          muted
          playsInline
          preload="auto"
          src="/clip1.mp4"
        ></video>
      </div>
      <div className="hero-aurora"></div>
      <div className="hero-scrim"></div>
      <div className="container">
        <div className="hero-wrap">
          <div className="hero-content">
            <span className="eyebrow">Maddur · Narayanapet · Telangana</span>
            <h1 className="hero-title" id="heroTitle">
              <span className="word">Build</span> <span className="word">Your</span>
              <br />
              <span className="word"><em className="foil">Own</em></span>{" "}
              <span className="word"><em className="foil">Identity.</em></span>
            </h1>
            <p className="hero-motto" id="heroMotto">Thought · Action · Progress</p>
            <div className="hero-ctas" id="heroCtas">
              <a href="#contact" className="btn btn-primary" data-cursor="hover">Admissions Open →</a>
              <a href="#gallery" className="btn btn-ghost" data-cursor="hover">Explore Campus</a>
            </div>
          </div>
          <div className="hero-crest-wrap">
            <div className="hero-crest" id="heroCrest">
              <img src={LOGO} alt="Geetanjali High School crest" />
            </div>
          </div>
        </div>
      </div>
      <div className="drone-badge">🎬 Aerial view · Maddur Campus</div>
      <div className="scroll-cue" aria-hidden="true"><span>Scroll</span><div className="arrow"></div></div>
      <div className="hero-stats">
        <div className="container">
          <div className="hs-grid">
            <div className="hs"><div className="v">1500+</div><div className="l">Students</div></div>
            <div className="hs"><div className="v">21+</div><div className="l">Years</div></div>
            <div className="hs"><div className="v">80</div><div className="l">Faculty</div></div>
            <div className="hs"><div className="v">100%</div><div className="l">Pass Rate</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const items = ["Build Your Own Identity", "Thought", "Action", "Progress", "Discipline", "Curiosity"];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items].map((t, i) => (
          <span className="marquee-item" key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export function VVM() {
  return (
    <section id="vvm" className="section-pad cv">
      <div className="grain"></div>
      <div className="container">
        <div className="vvm-grid">
          <div className="rl">
            <span className="eyebrow">The Partnership Behind The School</span>
            <p className="vvm-quote">&ldquo;A school is only ever as strong as the people who stand behind it.&rdquo;</p>
            <p className="vvm-attr">— The founding belief of VVM</p>
            <p className="lead vvm-body">
              VVM is not a brand or a chain. It is the three partners who built and lead Geetanjali —{" "}
              <b>Venkataiah, Vijay Kumar and Mahesh</b> — whose initials the school carries. Together they stand for
              values-driven education close to home: rigorous academics, character, and the space for every child to
              build their own identity. The promise to every family in Maddur is simple — an accessible school where
              the people who own it are the people who run it, and every decision is made with your child in mind.
            </p>
          </div>
          <div className="vvm-card rr">
            <div className="big foil">VVM</div>
            <div className="full">Venkataiah · Vijay Kumar · Mahesh</div>
            <div className="dv"></div>
            <ul>
              <li>Three partners, one shared conviction — every child can build their own identity</li>
              <li>20+ years serving the families of Maddur</li>
              <li>Hands-on management — the people who own the school also run it</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section-pad cv">
      <div className="container">
        <div className="about-grid">
          <div className="about-img rl">
            <img src="/bathukamma_ground.png" alt="Bathukamma celebration at Geetanjali High School" loading="lazy" />
          </div>
          <div className="about-text rr">
            <span className="eyebrow">About Us</span>
            <h2 className="h-d h2">A school rooted in Maddur, reaching far beyond it.</h2>
            <p className="lead" style={{ marginTop: "18px" }}>
              Since 2005, Geetanjali High School has served the families of Maddur and Narayanapet District with a
              clear conviction — every child can build their own identity. We teach with Telangana as a living root:
              its heritage, festivals, and values of home guide how students learn, belong, and grow.
            </p>
            <p className="lead">
              Telangana culture shapes school life — from Bathukamma and Bonalu to the songs, stories, and
              traditions students carry with pride. Alongside that heritage, we balance academic rigour with
              character, so our children leave ready for the world without leaving their roots behind.
            </p>
            <div className="about-meta">
              <span>School Code · <b>46117</b></span>
              <span>Est. · <b>2005</b></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const leadershipProfiles = [
  {
    name: "Venkataiah",
    role: "Correspondent",
    qualification: "M.A, B. Ed",
    phone: "9441809561",
    place: "Ayyavaripally",
    image: "/Venkataiah.jpeg",
    bio: "Working closely with families and faculty to strengthen the school’s vision and its connection with the community.",
  },
  {
    name: "K. Vijay Kumar",
    role: "Principal",
    qualification: "M. Sc, B. Ed",
    phone: "9491485290",
    place: "Maddur",
    image: "/Vijay-Kumar.jpeg",
    bio: "Leading academics and school culture with a focus on discipline, curiosity, and every child’s individual growth.",
  },
  {
    name: "K. Mahesh",
    role: "Vice Principal",
    qualification: "M.A, B. Ed",
    phone: "9491530023",
    place: "Maddur",
    image: "/Mahesh.jpeg",
    bio: "Supporting students and teachers through attentive administration and a consistent, student-first approach.",
  },
] as const;

export function Leadership() {
  return (
    <section id="leadership" className="section-pad cv">
      <div className="legend-spot"></div>
      <div className="grain"></div>
      <div className="container">
        <div className="legend-head reveal">
          <span className="eyebrow c">The People Behind The Vision</span>
          <h2 className="h-d h1">Stewards of <span className="foil">Geetanjali</span></h2>
          <p className="sub">The names this school is built on</p>
        </div>
        <div className="leader-stage" id="leaderStage">
          <div className="leader-backdrop" id="leaderBackdrop" aria-hidden="true"></div>
          <div className="legend-grid">
            {leadershipProfiles.map((profile) => (
              <div className="legend-card reveal" key={profile.name}>
                <button
                  type="button"
                  className="legend-card-shell"
                  data-cursor="hover"
                  data-tilt
                  data-leader-profile
                  data-name={profile.name}
                  data-role={profile.role}
                  data-qualification={profile.qualification}
                  data-phone={profile.phone}
                  data-place={profile.place}
                  data-image={profile.image}
                  data-bio={profile.bio}
                  aria-controls="leaderPanel"
                  aria-expanded="false"
                  aria-label={`View ${profile.name}'s profile`}
                >
                  <div className="legend-photo">
                    <img src={profile.image} alt={`${profile.name}, ${profile.role}`} loading="lazy" />
                    <span className="legend-view">View profile <span aria-hidden="true">↗</span></span>
                  </div>
                  <div className="legend-info">
                    <div className="role">{profile.role}</div>
                    <div className="name">{profile.name}</div>
                    <p className="line">{profile.qualification}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>

          <aside
            className="leader-panel"
            id="leaderPanel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="leaderPanelName"
            aria-hidden="true"
          >
            <div className="leader-panel-glow" aria-hidden="true"></div>
            <button type="button" className="leader-panel-close" id="leaderPanelClose" aria-label="Close profile">
              <span aria-hidden="true">×</span>
            </button>

            <div className="leader-panel-head">
              <div className="leader-panel-avatar">
                <img id="leaderPanelImage" src="/Venkataiah.jpeg" alt="" />
              </div>
              <div>
                <span className="leader-panel-kicker">Leadership profile</span>
                <p className="leader-panel-role" id="leaderPanelRole">Correspondent</p>
              </div>
            </div>

            <h3 id="leaderPanelName">Venkataiah</h3>
            <p className="leader-panel-qualification" id="leaderPanelQualification">M.A, B. Ed</p>
            <p className="leader-panel-bio" id="leaderPanelBio">{leadershipProfiles[0].bio}</p>

            <div className="leader-contact-grid">
              <a className="leader-contact" id="leaderPanelPhoneLink" href="tel:+919441809561">
                <span className="leader-contact-icon" aria-hidden="true">☎</span>
                <span><small>Phone</small><strong id="leaderPanelPhone">9441809561</strong></span>
              </a>
              <div className="leader-contact">
                <span className="leader-contact-icon" aria-hidden="true">⌖</span>
                <span><small>Location</small><strong id="leaderPanelPlace">Ayyavaripally</strong></span>
              </div>
            </div>

            <div className="leader-panel-nav">
              <button type="button" id="leaderPanelPrev" aria-label="Previous leadership profile">
                <span aria-hidden="true">←</span> Previous
              </button>
              <span className="leader-panel-navline" aria-hidden="true"></span>
              <button type="button" id="leaderPanelNext" aria-label="Next leadership profile">
                Next <span aria-hidden="true">→</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function Facilities() {
  return (
    <section id="facilities" className="section-pad cv">
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">Campus &amp; Facilities</span>
          <h2 className="h-d h1">Where learning lives</h2>
        </div>
        <div className="bento">
          <div className="bento-c b72 reveal" data-cursor="hover">
            <img src="/campus-building.png" alt="Geetanjali High School main building and courtyard" loading="lazy" />
            <div className="cap"><div className="t">Main Campus</div><div className="d">Nursery to Class X · Maddur</div></div>
          </div>
          <div className="bento-c b5 reveal" data-cursor="hover">
            <img src="/campus-aerial-1.png" alt="Aerial view of Geetanjali High School campus" loading="lazy" />
            <div className="cap"><div className="t">Campus Overview</div><div className="d">Surrounded by green fields</div></div>
          </div>
          <div className="bento-c b5 reveal" data-cursor="hover">
            <img src="/campus-aerial-2.png" alt="Aerial view of school buildings and grounds" loading="lazy" />
            <div className="cap"><div className="t">School Grounds</div><div className="d">Spacious open courtyard</div></div>
          </div>
          <div className="bento-c b8 reveal" data-cursor="hover">
            <img src="/bathukamma_ground.png" alt="Students celebrating Bathukamma on the school ground" loading="lazy" />
            <div className="cap"><div className="t">Cultural Ground</div><div className="d">Festivals &amp; gatherings</div></div>
          </div>
          <div className="bento-c b4 reveal" data-cursor="hover">
            <img src="/bathukamma-celebration.png" alt="Bathukamma Samburalu group celebration at school" loading="lazy" />
            <div className="cap"><div className="t">School Life</div><div className="d">Tradition on campus</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function categoryKey(category: string) {
  return category.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "school-life";
}

export function Gallery({ images }: { images: WebsiteGalleryPhoto[] }) {
  const categories = [...new Set(images.map((image) => image.category.trim()).filter(Boolean))];

  return (
    <>
      <section id="gallery" className="section-pad cv">
        <div className="container">
          <div className="reveal">
            <span className="eyebrow">School Life</span>
            <h2 className="h-d h1" style={{ fontStyle: "italic" }}>Moments that matter</h2>
          </div>
          <div className="pills reveal" id="filters">
            <button className="pill active" data-filter="all"><span className="bg"></span>All</button>
            {categories.map((category) => (
              <button key={category} className="pill" data-filter={categoryKey(category)}>
                <span className="bg"></span>{category}
              </button>
            ))}
          </div>
          <div className="g-grid reveal" id="gGrid">
            {images.map((g, i) => (
              <div
                key={g.id}
                className={"g-item" + (g.tall ? " g-tall" : "")}
                data-cat={categoryKey(g.category)}
                data-index={i}
                data-cursor="view"
              >
                <img src={g.src} alt={g.alt} loading="lazy" />
              </div>
            ))}
            {images.length === 0 && (
              <div className="gallery-empty">
                <span>New moments are coming soon.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="lightbox" id="lightbox">
        <button className="lb-x" id="lbX" aria-label="Close">✕</button>
        <button className="lb-a p" id="lbP" aria-label="Previous">‹</button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img id="lbImg" alt="Gallery image" />
        <button className="lb-a n" id="lbN" aria-label="Next">›</button>
        <div className="lb-c" id="lbC">{images.length ? `1 / ${images.length}` : ""}</div>
      </div>
    </>
  );
}

export function Results() {
  return (
    <section id="results" className="section-pad cv">
      <div className="results-glow" aria-hidden="true"></div>
      <div className="wmk">02</div>
      <div className="container">
        <div className="results-head reveal">
          <span className="eyebrow c">Class X Results</span>
          <h2 className="h-d h1">Consistent excellence</h2>
          <p className="results-sub">Board outcomes that hold steady, year after year.</p>
        </div>
        <div className="counters" role="list">
          <div className="ctr reveal" role="listitem">
            <div className="ctr-value">
              <span className="num" data-target="100">0</span>
              <span className="sfx">%</span>
            </div>
            <div className="ctr-bar" aria-hidden="true"></div>
            <div className="l">Pass rate</div>
          </div>
          <div className="ctr reveal" role="listitem">
            <div className="ctr-value">
              <span className="num" data-target="300">0</span>
              <span className="sfx">+</span>
            </div>
            <div className="ctr-bar" aria-hidden="true"></div>
            <div className="l">Distinctions</div>
          </div>
          <div className="ctr reveal" role="listitem">
            <div className="ctr-value">
              <span className="num" data-target="13">0</span>
              <span className="sfx">+</span>
            </div>
            <div className="ctr-bar" aria-hidden="true"></div>
            <div className="l">Consecutive years</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section-pad cv">
      <div className="container">
        <div className="reveal" style={{ marginBottom: "48px" }}>
          <span className="eyebrow">Reach Us</span>
          <h2 className="h-d h1">Begin the conversation</h2>
        </div>
        <div className="contact-grid">
          <div className="ci rl">
            <h3>Geetanjali High School, Maddur</h3>
            <div className="cl"><div className="ic">📍</div><div className="tx"><b>Address</b>Narayanapet Road, Maddur, Narayanapet District, Telangana – 509411</div></div>
            <div className="cl"><div className="ic">📞</div><div className="tx"><b>Phone</b>9573276939</div></div>
            <div className="cl"><div className="ic">✉️</div><div className="tx"><b>Email</b>geetanjalihighschool.vvm@gmail.com</div></div>
            <div className="cl"><div className="ic">🌐</div><div className="tx"><b>Website</b><a href="https://www.ghsmaddur.in" data-cursor="hover">www.ghsmaddur.in</a></div></div>
            <div className="cmap"><img src="/campus-aerial-1.png" alt="Aerial view of Geetanjali High School, Maddur" loading="lazy" /></div>
          </div>
          <div className="rr">
            <form className="form" id="form" noValidate>
              <div className="field"><input type="text" id="fName" required /><label htmlFor="fName">Full Name</label></div>
              <div className="field"><input type="tel" id="fPhone" pattern="[6-9][0-9]{9}" required /><label htmlFor="fPhone">Phone Number</label></div>
              <div className="field">
                <select id="fClass" required defaultValue="">
                  <option value="" disabled></option>
                  <option>Class I</option><option>Class II</option><option>Class III</option><option>Class IV</option>
                  <option>Class V</option><option>Class VI</option><option>Class VII</option><option>Class VIII</option>
                  <option>Class IX</option><option>Class X</option>
                </select>
                <label htmlFor="fClass">Class Interested In</label>
              </div>
              <div className="field"><textarea id="fMsg" required></textarea><label htmlFor="fMsg">Message</label></div>
              <button
                type="submit"
                className="btn btn-primary"
                data-cursor="hover"
                style={{ justifyContent: "center", background: "linear-gradient(135deg,var(--primary),var(--mid))", color: "#fff", boxShadow: "0 10px 28px rgba(107,47,160,0.38)" }}
              >
                Send Enquiry
              </button>
            </form>
            <div className="f-ok" id="formOk"><div className="ck">✓</div><p>Thank you. We&apos;ll be in touch soon.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="ribbon"></div>
      <div className="container">
        <div className="f-grid">
          <div className="f-col f-brand">
            <img src={LOGO} alt="GHS Maddur crest" />
            <div className="name">Geetanjali High School</div>
            <div className="tag">Build Your Own Identity</div>
            <div className="vvm">Founded &amp; led by VVM · Maddur, Telangana</div>
          </div>
          <div className="f-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#leadership">Leadership</a></li>
              <li><a href="#facilities">Campus</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Admissions</a></li>
            </ul>
          </div>
          <div className="f-col">
            <h4>Contact</h4>
            <ul>
              <li>Narayanapet Road, Maddur</li>
              <li>Telangana – 509411</li>
              <li>9573276939</li>
              <li>geetanjalihighschool.vvm@gmail.com</li>
            </ul>
          </div>
          <div className="f-col">
            <h4>Recognition</h4>
            <ul>
              <li>School Code · 46117</li>
              <li>Est. · 2005</li>
              <li>Motto · Thought · Action · Progress</li>
            </ul>
          </div>
        </div>
        <div className="f-bot">
          <span>© <span id="yr"></span> Geetanjali High School, Maddur. All rights reserved.</span>
          <span>Crafted by <a href="#" data-cursor="hover">NexSyrus</a></span>
        </div>
      </div>
    </footer>
  );
}
