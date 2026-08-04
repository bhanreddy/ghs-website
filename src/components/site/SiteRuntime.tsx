"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SiteRuntime renders the fixed atmosphere/overlay layers and drives every
 * interaction from the source design: Lenis smooth scroll, custom cursor,
 * scroll progress + scroll-line, nav state, drawer, reveal-on-scroll,
 * gallery filtering + lightbox, animated counters, and the contact form.
 *
 * All reads (getBoundingClientRect) happen on enter/build, never inside the
 * shared rAF loop, so there is no layout thrashing.
 */
export default function SiteRuntime() {
  useEffect(() => {
    const REDUCE = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    const HOVER = window.matchMedia("(hover:hover)").matches;
    const cleanups: Array<() => void> = [];
    const on = (
      target: Window | Document | HTMLElement,
      type: string,
      fn: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions
    ) => {
      target.addEventListener(type, fn as EventListener, opts);
      cleanups.push(() => target.removeEventListener(type, fn as EventListener, opts));
    };

    /* ---------- shared rAF ticker ---------- */
    const tasks = new Set<(t: number) => void>();
    let rafId = requestAnimationFrame(function tick(t) {
      tasks.forEach((fn) => fn(t));
      rafId = requestAnimationFrame(tick);
    });
    cleanups.push(() => cancelAnimationFrame(rafId));

    /* ---------- Lenis smooth scroll ---------- */
    let lenis: Lenis | null = null;
    if (!REDUCE) {
      lenis = new Lenis({
        duration: 1.08,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      const l = lenis;
      tasks.add((t) => l.raf(t));
      cleanups.push(() => l.destroy());
    }

    /* ---------- anchor links ---------- */
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
      const handler = (e: Event) => {
        const id = a.getAttribute("href") || "";
        if (id.length > 1) {
          const el = document.querySelector(id);
          if (el) {
            e.preventDefault();
            if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -72 });
            else el.scrollIntoView({ behavior: "smooth" });
          }
        }
      };
      on(a, "click", handler);
    });

    /* ---------- scroll state shared ---------- */
    let maxScroll = 1;
    let scrollY = 0;
    const recalcMax = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    recalcMax();
    on(window, "resize", recalcMax, { passive: true } as AddEventListenerOptions);
    if (lenis) lenis.on("scroll", ({ scroll }: { scroll: number }) => (scrollY = scroll));
    else on(window, "scroll", () => (scrollY = window.scrollY || 0), { passive: true } as AddEventListenerOptions);

    const progressEl = document.getElementById("scroll-progress");
    const navbar = document.getElementById("navbar");
    if (progressEl) tasks.add(() => (progressEl.style.width = (scrollY / maxScroll) * 100 + "%"));
    if (navbar) tasks.add(() => navbar.classList.toggle("scrolled", scrollY > 60));

    /* ---------- custom cursor ---------- */
    if (HOVER) {
      const dot = document.getElementById("cur-dot");
      const ring = document.getElementById("cur-ring");
      if (dot && ring) {
        let mx = 0, my = 0, rx = 0, ry = 0;
        on(window, "mousemove", (e: Event) => {
          const ev = e as MouseEvent;
          mx = ev.clientX;
          my = ev.clientY;
        }, { passive: true } as AddEventListenerOptions);
        tasks.add(() => {
          dot.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
          rx += (mx - rx) * 0.16;
          ry += (my - ry) * 0.16;
          ring.style.transform = `translate(${rx - 17}px,${ry - 17}px)`;
        });
        on(window, "mousedown", () => (dot.style.transform = `translate(${mx - 2}px,${my - 2}px) scale(0.5)`));
        on(window, "mouseup", () => (dot.style.transform = `translate(${mx - 3}px,${my - 3}px) scale(1)`));
        on(document, "mouseover", (e: Event) => {
          const t = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
          const v = t?.getAttribute("data-cursor");
          document.body.classList.toggle("cur-hover", v === "hover");
          document.body.classList.toggle("cur-view", v === "view");
        });
      }
    }

    /* ---------- active nav links ---------- */
    const navMap: Record<string, HTMLAnchorElement> = {};
    document.querySelectorAll<HTMLAnchorElement>(".nav-links a").forEach((a) => {
      navMap[(a.getAttribute("href") || "").slice(1)] = a;
    });
    const sectionObservers: IntersectionObserver[] = [];
    ["about", "leadership", "facilities", "gallery", "contact"].forEach((id) => {
      const s = document.getElementById(id);
      if (!s) return;
      const ob = new IntersectionObserver(
        (es) => es.forEach((e) => {
          if (e.isIntersecting) {
            Object.values(navMap).forEach((a) => a.classList.remove("active"));
            navMap[id]?.classList.add("active");
          }
        }),
        { threshold: 0.4 }
      );
      ob.observe(s);
      sectionObservers.push(ob);
    });
    cleanups.push(() => sectionObservers.forEach((o) => o.disconnect()));

    /* ---------- mobile drawer ---------- */
    const drawer = document.getElementById("drawer");
    const burger = document.getElementById("burger");
    const drawerX = document.getElementById("drawerX");
    if (drawer && burger && drawerX) {
      on(burger, "click", () => drawer.classList.add("open"));
      on(drawerX, "click", () => drawer.classList.remove("open"));
      drawer.querySelectorAll("a").forEach((a) => on(a, "click", () => drawer.classList.remove("open")));
    }

    /* ---------- reveal on scroll ---------- */
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".reveal,.rl,.rr").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    /* ---------- leadership profile side view ---------- */
    const leaderStage = document.getElementById("leaderStage");
    const leaderPanel = document.getElementById("leaderPanel");
    const leaderCards = [...document.querySelectorAll<HTMLButtonElement>("[data-leader-profile]")];
    if (leaderStage && leaderPanel && leaderCards.length) {
      const panelClose = document.getElementById("leaderPanelClose") as HTMLButtonElement | null;
      const panelPrev = document.getElementById("leaderPanelPrev") as HTMLButtonElement | null;
      const panelNext = document.getElementById("leaderPanelNext") as HTMLButtonElement | null;
      const panelBackdrop = document.getElementById("leaderBackdrop");
      const panelImage = document.getElementById("leaderPanelImage") as HTMLImageElement | null;
      const panelName = document.getElementById("leaderPanelName");
      const panelRole = document.getElementById("leaderPanelRole");
      const panelQualification = document.getElementById("leaderPanelQualification");
      const panelBio = document.getElementById("leaderPanelBio");
      const panelPhone = document.getElementById("leaderPanelPhone");
      const panelPhoneLink = document.getElementById("leaderPanelPhoneLink") as HTMLAnchorElement | null;
      const panelPlace = document.getElementById("leaderPanelPlace");
      const panelAnimatedParts = [...leaderPanel.querySelectorAll<HTMLElement>(
        ".leader-panel-head,h3,.leader-panel-qualification,.leader-panel-bio,.leader-contact-grid"
      )];
      let activeLeader = 0;
      let leaderOpen = false;
      let leaderTrigger: HTMLButtonElement | null = null;

      const renderLeader = (index: number, direction = 0) => {
        activeLeader = (index + leaderCards.length) % leaderCards.length;
        const card = leaderCards[activeLeader];
        const { name = "", role = "", qualification = "", phone = "", place = "", image = "", bio = "" } = card.dataset;

        leaderCards.forEach((item, itemIndex) => {
          item.setAttribute("aria-expanded", String(itemIndex === activeLeader && leaderOpen));
          item.closest(".legend-card")?.classList.toggle("is-selected", itemIndex === activeLeader);
        });
        leaderTrigger = card;
        if (panelImage) {
          panelImage.src = image;
          panelImage.alt = `${name}, ${role}`;
        }
        if (panelName) panelName.textContent = name;
        if (panelRole) panelRole.textContent = role;
        if (panelQualification) panelQualification.textContent = qualification;
        if (panelBio) panelBio.textContent = bio;
        if (panelPhone) panelPhone.textContent = phone;
        if (panelPhoneLink) panelPhoneLink.href = `tel:+91${phone}`;
        if (panelPlace) panelPlace.textContent = place;

        if (direction && !REDUCE) {
          panelAnimatedParts.forEach((part, partIndex) => {
            part.animate(
              [
                { opacity: 0.18, transform: `translateX(${direction * 18}px)` },
                { opacity: 1, transform: "translateX(0)" },
              ],
              { duration: 440 + partIndex * 35, easing: "cubic-bezier(.16,1,.3,1)" }
            );
          });
        }
      };

      const openLeader = (index: number) => {
        leaderOpen = true;
        renderLeader(index);
        leaderStage.classList.add("is-open");
        leaderPanel.setAttribute("aria-hidden", "false");
        if (lenis) lenis.stop();
        document.body.style.overflow = "hidden";
        window.requestAnimationFrame(() => panelClose?.focus());
      };

      const closeLeader = () => {
        if (!leaderOpen) return;
        leaderOpen = false;
        leaderStage.classList.remove("is-open");
        leaderPanel.setAttribute("aria-hidden", "true");
        leaderCards.forEach((card) => {
          card.setAttribute("aria-expanded", "false");
          card.closest(".legend-card")?.classList.remove("is-selected");
        });
        if (lenis) lenis.start();
        document.body.style.overflow = "";
        leaderTrigger?.focus();
      };

      leaderCards.forEach((card, index) => on(card, "click", () => openLeader(index)));
      if (panelClose) on(panelClose, "click", closeLeader);
      if (panelPrev) on(panelPrev, "click", () => renderLeader(activeLeader - 1, -1));
      if (panelNext) on(panelNext, "click", () => renderLeader(activeLeader + 1, 1));
      if (panelBackdrop) on(panelBackdrop, "click", closeLeader);

      on(document, "keydown", (e: Event) => {
        if (!leaderOpen) return;
        const ev = e as KeyboardEvent;
        if (ev.key === "Escape") {
          ev.preventDefault();
          closeLeader();
          return;
        }
        if (ev.key === "ArrowLeft") {
          ev.preventDefault();
          renderLeader(activeLeader - 1, -1);
          return;
        }
        if (ev.key === "ArrowRight") {
          ev.preventDefault();
          renderLeader(activeLeader + 1, 1);
          return;
        }
        if (ev.key === "Tab") {
          const focusable = [...leaderPanel.querySelectorAll<HTMLElement>("button,a[href]")];
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (ev.shiftKey && document.activeElement === first) {
            ev.preventDefault();
            last.focus();
          } else if (!ev.shiftKey && document.activeElement === last) {
            ev.preventDefault();
            first.focus();
          }
        }
      });
      cleanups.push(() => {
        leaderOpen = false;
        leaderStage.classList.remove("is-open");
        leaderPanel.setAttribute("aria-hidden", "true");
      });
    }

    /* ---------- hero crest tilt + magnetic buttons ---------- */
    if (HOVER) {
      const hero = document.getElementById("hero");
      const crest = document.getElementById("heroCrest");
      if (hero && crest) {
        let cx = 0, cy = 0;
        on(hero, "mousemove", (e: Event) => {
          const ev = e as MouseEvent;
          cx = ev.clientX / window.innerWidth - 0.5;
          cy = ev.clientY / window.innerHeight - 0.5;
        }, { passive: true } as AddEventListenerOptions);
        on(hero, "mouseleave", () => { cx = 0; cy = 0; });
        tasks.add(() => (crest.style.transform = `perspective(900px) rotateY(${cx * 13}deg) rotateX(${-cy * 13}deg)`));
      }
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
        let r: DOMRect | null = null, tx = 0, ty = 0, active = false;
        on(card, "mouseenter", () => { r = card.getBoundingClientRect(); active = true; });
        on(card, "mousemove", (e: Event) => {
          if (!r) return;
          const ev = e as MouseEvent;
          tx = (ev.clientX - r.left) / r.width - 0.5;
          ty = (ev.clientY - r.top) / r.height - 0.5;
        });
        on(card, "mouseleave", () => { active = false; card.style.transform = ""; });
        tasks.add(() => { if (active) card.style.transform = `perspective(800px) rotateY(${tx * 8}deg) rotateX(${-ty * 8}deg)`; });
      });
      document.querySelectorAll<HTMLElement>(".btn").forEach((el) => {
        let r: DOMRect | null = null, dx = 0, dy = 0, active = false;
        on(el, "mouseenter", () => { r = el.getBoundingClientRect(); active = true; });
        on(el, "mousemove", (e: Event) => {
          if (!r) return;
          const ev = e as MouseEvent;
          dx = (ev.clientX - r.left - r.width / 2) * 0.22;
          dy = (ev.clientY - r.top - r.height / 2) * 0.3;
        });
        on(el, "mouseleave", () => { active = false; el.style.transform = ""; });
        tasks.add(() => { if (active) el.style.transform = `translate(${dx}px,${dy}px)`; });
      });
    }

    /* ---------- SVG scroll line ---------- */
    const buildScrollLine = () => {
      if (window.innerWidth <= 960 || REDUCE) return;
      const wrap = document.getElementById("scroll-line-wrap");
      if (!wrap) return;
      wrap.innerHTML = "";
      wrap.style.height = "";
      wrap.style.top = "0";
      wrap.style.bottom = "0";
      wrap.style.left = "50%";
      // Stretch to in-flow body height (not document scrollHeight) so skipped
      // content-visibility sections can't leave a gap below the footer.
      const footer = document.querySelector("footer");
      const footerBottom = footer
        ? Math.ceil(footer.getBoundingClientRect().bottom + window.scrollY)
        : 0;
      const totalH = Math.max(wrap.offsetHeight, document.body.scrollHeight, footerBottom);
      const ids = ["vvm", "about", "leadership", "facilities", "gallery", "results", "contact"];
      const dots = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return { y: el.getBoundingClientRect().top + window.scrollY + 40 };
        })
        .filter(Boolean) as { y: number }[];

      const ns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(ns, "svg");
      svg.setAttribute("width", "2");
      svg.setAttribute("height", String(totalH));
      svg.setAttribute("viewBox", `0 0 2 ${totalH}`);
      Object.assign(svg.style, { position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", overflow: "visible", pointerEvents: "none" });

      const defs = document.createElementNS(ns, "defs");
      defs.innerHTML = `
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stop-color="#4A1A75" stop-opacity="0"/>
          <stop offset="10%" stop-color="#6B2FA0" stop-opacity="0.9"/>
          <stop offset="60%" stop-color="#9B59B6" stop-opacity="0.85"/>
          <stop offset="88%" stop-color="#F9A825" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#F9A825" stop-opacity="0"/>
        </linearGradient>
        <filter id="glow" x="-200%" y="-5%" width="500%" height="110%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>`;
      svg.appendChild(defs);

      const path = document.createElementNS(ns, "path");
      path.setAttribute("d", `M1,0 L1,${totalH}`);
      path.setAttribute("stroke", "url(#lineGrad)");
      path.setAttribute("stroke-width", "1.5");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("filter", "url(#glow)");
      const pathLen = totalH;
      path.setAttribute("stroke-dasharray", String(pathLen));
      path.setAttribute("stroke-dashoffset", String(pathLen));
      svg.appendChild(path);

      const markers: { y: number; d: SVGPolygonElement; glo: SVGPolygonElement }[] = [];
      dots.forEach(({ y }) => {
        const g = document.createElementNS(ns, "g");
        const diamond = document.createElementNS(ns, "polygon");
        diamond.setAttribute("points", "1,-5 6,0 1,5 -4,0");
        diamond.setAttribute("transform", `translate(0,${y})`);
        diamond.setAttribute("fill", "var(--accent)");
        diamond.setAttribute("opacity", "0");
        diamond.style.transition = "opacity .4s, filter .4s";
        g.appendChild(diamond);
        const glo = document.createElementNS(ns, "polygon");
        glo.setAttribute("points", "1,-5 6,0 1,5 -4,0");
        glo.setAttribute("transform", `translate(0,${y})`);
        glo.setAttribute("fill", "none");
        glo.setAttribute("stroke", "rgba(249,168,37,0.5)");
        glo.setAttribute("stroke-width", "3");
        glo.setAttribute("opacity", "0");
        g.appendChild(glo);
        svg.appendChild(g);
        markers.push({ y, d: diamond, glo });
      });
      wrap.appendChild(svg);

      const draw = () => {
        const drawn = Math.min(pathLen, Math.max(0, scrollY * (pathLen / maxScroll) * 1.05));
        path.setAttribute("stroke-dashoffset", String(pathLen - drawn));
        markers.forEach((m) => {
          const op = drawn >= m.y - 40 ? "1" : "0";
          if (m.d.getAttribute("opacity") !== op) {
            m.d.setAttribute("opacity", op);
            m.glo.setAttribute("opacity", op);
          }
        });
      };
      tasks.add(draw);
      cleanups.push(() => tasks.delete(draw));
    };

    /* ---------- gallery filter + lightbox ---------- */
    const filters = document.getElementById("filters");
    if (filters) {
      on(filters, "click", (e: Event) => {
        const p = (e.target as HTMLElement).closest(".pill") as HTMLElement | null;
        if (!p) return;
        document.querySelectorAll(".pill").forEach((x) => x.classList.remove("active"));
        p.classList.add("active");
        const f = p.dataset.filter;
        document.querySelectorAll<HTMLElement>(".g-item").forEach((it) =>
          it.classList.toggle("hide", !(f === "all" || it.dataset.cat === f))
        );
      });
    }

    const lb = document.getElementById("lightbox");
    const lbImg = document.getElementById("lbImg") as HTMLImageElement | null;
    const lbC = document.getElementById("lbC");
    const gGrid = document.getElementById("gGrid");
    if (lb && lbImg && lbC && gGrid) {
      let cur = 0;
      let vis: HTMLElement[] = [];
      const showLB = () => {
        const img = vis[cur]?.querySelector("img") as HTMLImageElement | null;
        if (img) lbImg.src = img.src;
        lbC.textContent = `${cur + 1} / ${vis.length}`;
      };
      const openLB = (idx: number) => {
        vis = [...document.querySelectorAll<HTMLElement>(".g-item:not(.hide)")];
        cur = vis.findIndex((it) => +(it.dataset.index || -1) === idx);
        if (cur < 0) cur = 0;
        showLB();
        lb.classList.add("open");
        if (lenis) lenis.stop();
        document.body.style.overflow = "hidden";
      };
      const closeLB = () => {
        lb.classList.remove("open");
        if (lenis) lenis.start();
        document.body.style.overflow = "";
      };
      const navLB = (d: number) => {
        cur = (cur + d + vis.length) % vis.length;
        showLB();
      };
      on(gGrid, "click", (e: Event) => {
        const it = (e.target as HTMLElement).closest(".g-item") as HTMLElement | null;
        if (it) openLB(+(it.dataset.index || 0));
      });
      const lbX = document.getElementById("lbX");
      const lbP = document.getElementById("lbP");
      const lbN = document.getElementById("lbN");
      if (lbX) on(lbX, "click", closeLB);
      if (lbP) on(lbP, "click", () => navLB(-1));
      if (lbN) on(lbN, "click", () => navLB(1));
      on(lb, "click", (e: Event) => { if (e.target === lb) closeLB(); });
      on(document, "keydown", (e: Event) => {
        if (!lb.classList.contains("open")) return;
        const ev = e as KeyboardEvent;
        if (ev.key === "Escape") closeLB();
        if (ev.key === "ArrowRight") navLB(1);
        if (ev.key === "ArrowLeft") navLB(-1);
      });
    }

    /* ---------- result counters ---------- */
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const cio = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const target = +(el.dataset.target || 0);
        const dur = 1600;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          el.textContent = String(Math.round(easeOutExpo(p) * target));
          if (p < 1) requestAnimationFrame(step);
          else {
            el.classList.add("glow");
            el.closest(".ctr")?.classList.add("done");
            setTimeout(() => el.classList.remove("glow"), 700);
          }
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      }),
      { threshold: 0.45 }
    );
    document.querySelectorAll(".ctr .num").forEach((el) => cio.observe(el));
    cleanups.push(() => cio.disconnect());

    /* ---------- contact form ---------- */
    const form = document.getElementById("form") as HTMLFormElement | null;
    if (form) {
      on(form, "submit", (e: Event) => {
        e.preventDefault();
        let ok = true;
        ["fName", "fPhone", "fClass", "fMsg"].forEach((id) => {
          const f = document.getElementById(id) as HTMLInputElement | null;
          if (!f) return;
          const bad = !f.value || (f.pattern && !new RegExp("^" + f.pattern + "$").test(f.value));
          f.style.borderBottomColor = bad ? "#D32F2F" : "";
          if (bad) ok = false;
        });
        if (!ok) {
          form.animate(
            [{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }],
            { duration: 300 }
          );
          return;
        }
        form.style.display = "none";
        document.getElementById("formOk")?.classList.add("show");
      });
    }

    /* ---------- hero aerial clips loop ---------- */
    const HERO_CLIPS = ["/clip1.mp4", "/clip2.mp4", "/clip3.mp4"];
    const heroVid = document.getElementById("heroVid") as HTMLVideoElement | null;
    if (heroVid) {
      let clipIndex = 0;
      const playClip = (index: number) => {
        clipIndex = ((index % HERO_CLIPS.length) + HERO_CLIPS.length) % HERO_CLIPS.length;
        heroVid.src = HERO_CLIPS[clipIndex];
        heroVid.play().catch(() => {});
      };
      const onEnded = () => playClip(clipIndex + 1);
      on(heroVid, "ended", onEnded);
      // Preload remaining clips so transitions stay snappy
      HERO_CLIPS.slice(1).forEach((src) => {
        const v = document.createElement("video");
        v.preload = "auto";
        v.src = src;
        v.load();
      });
      heroVid.play().catch(() => {});
    }

    /* ---------- year ---------- */
    const yr = document.getElementById("yr");
    if (yr) yr.textContent = String(new Date().getFullYear());

    /* ---------- loader + hero reveal ---------- */
    const playIntro = () => {
      recalcMax();
      document.getElementById("loader")?.classList.add("done");
      document.querySelectorAll<HTMLElement>("#heroTitle .word").forEach((w, i) => {
        setTimeout(() => {
          w.style.transition =
            "opacity .85s cubic-bezier(.16,1,.3,1), transform .85s cubic-bezier(.16,1,.3,1)";
          w.style.opacity = "1";
          w.style.transform = "translateY(0) rotate(0)";
        }, 200 + i * 110);
      });
      setTimeout(() => {
        const m = document.getElementById("heroMotto");
        if (m) { m.style.transition = "opacity .85s"; m.style.opacity = "1"; }
      }, 680);
      setTimeout(() => {
        const c = document.getElementById("heroCtas");
        if (c) { c.style.transition = "opacity .85s"; c.style.opacity = "1"; }
      }, 820);
      const ci = document.querySelector<HTMLImageElement>("#heroCrest img");
      if (ci) {
        ci.style.transition =
          "opacity 1.1s cubic-bezier(.16,1,.3,1),transform 1.1s cubic-bezier(.16,1,.3,1)";
        ci.style.opacity = "1";
        ci.style.transform = "scale(1)";
      }
      buildScrollLine();
    };
    const introTimer = window.setTimeout(playIntro, REDUCE ? 100 : 1350);
    cleanups.push(() => clearTimeout(introTimer));

    /* rebuild scroll line on resize */
    let resizeTimer: number;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(buildScrollLine, 200);
    };
    on(window, "resize", onResize, { passive: true } as AddEventListenerOptions);
    cleanups.push(() => window.clearTimeout(resizeTimer));

    return () => {
      document.body.classList.remove("cur-hover", "cur-view");
      document.body.style.overflow = "";
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <div id="vig-g"></div>
      <div id="grain-g"></div>
      <div id="scroll-progress"></div>
      <div id="scroll-line-wrap" aria-hidden="true"></div>
      <div id="cur-dot"></div>
      <div id="cur-ring"><span className="l">VIEW</span></div>
      <div id="loader">
        <div className="ldr-crest">
          <span className="ring"></span>
          <img src="/logo.png" alt="Geetanjali High School crest" />
        </div>
        <div className="ldr-tag">Geetanjali High School · Maddur</div>
      </div>
    </>
  );
}
