/* eslint-disable @next/next/no-img-element */
import batchesContent from "@/content/batches.json";

export interface BatchItem {
  id: string;
  year: string;
  shortYear: string;
  title: string;
  tag: string;
  badge: string;
  image: string;
  thumb: string;
  original: string;
  studentsHighlight: string;
  caption: string;
}

export function Batches() {
  const { heading, eyebrow, subtitle, batches } = batchesContent;
  const initialBatch = batches[0];

  return (
    <section id="batches" className="section-pad cv" aria-label="Batches and Alumni Hall of Fame">
      <div className="batches-glow" aria-hidden="true"></div>
      <div className="grain"></div>
      <div className="container">
        {/* Header */}
        <div className="batches-head reveal">
          <span className="eyebrow c">{eyebrow}</span>
          <h2 className="h-d h1">
            Batches of <span className="foil">{heading.split(" ").slice(-1)[0]}</span>
          </h2>
          <p className="batches-sub">{subtitle}</p>
          <div className="batches-kpi-badge">
            <span className="kpi-dot"></span>
            <span>13 Consecutive Batches · 100% Board Outcomes · Since 2013</span>
          </div>
        </div>

        {/* Timeline year selector bar */}
        <div className="batch-timeline-wrap reveal" id="batchTimelineWrap">
          <button
            type="button"
            className="batch-tl-arrow batch-tl-prev"
            id="batchTlPrev"
            aria-label="Scroll timeline backward"
          >
            ‹
          </button>

          <div
            className="batch-timeline"
            id="batchTimeline"
            role="tablist"
            aria-label="Select academic batch year"
          >
            {batches.map((b, idx) => (
              <button
                key={b.id}
                type="button"
                role="tab"
                id={`tab-${b.id}`}
                aria-controls="batchStage"
                aria-selected={idx === 0}
                tabIndex={idx === 0 ? 0 : -1}
                className={`batch-pill ${idx === 0 ? "active" : ""}`}
                data-batch-id={b.id}
                data-batch-index={idx}
                data-cursor="hover"
              >
                <span className="batch-pill-glow" aria-hidden="true"></span>
                <span className="batch-pill-year">{b.shortYear}</span>
                <span className="batch-pill-tag">{b.tag}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="batch-tl-arrow batch-tl-next"
            id="batchTlNext"
            aria-label="Scroll timeline forward"
          >
            ›
          </button>
        </div>

        {/* Featured Spotlight Showcase */}
        <div className="batch-stage-card reveal" id="batchStageCard">
          <div className="batch-stage-inner">
            <div className="batch-image-frame" id="batchImageFrame">
              <img
                id="batchStageImage"
                src={initialBatch.image}
                alt={initialBatch.title}
                loading="eager"
              />
              <div className="batch-image-scrim" aria-hidden="true"></div>

              {/* Overlaid Badges */}
              <div className="batch-stage-badges">
                <span className="batch-badge-pill" id="batchStageBadge">
                  {initialBatch.badge}
                </span>
                <span className="batch-badge-accent" id="batchStageTag">
                  {initialBatch.tag}
                </span>
              </div>

              {/* Zoom / Fullscreen Hover CTA */}
              <button
                type="button"
                className="batch-zoom-trigger"
                id="batchZoomTrigger"
                data-cursor="hover"
                aria-label="View photo in high-resolution zoom mode"
              >
                <span className="zoom-icon" aria-hidden="true">⤢</span>
                <span>Inspect High-Res Photo</span>
              </button>
            </div>

            {/* Stage Info Bar */}
            <div className="batch-stage-info">
              <div className="batch-info-main">
                <div className="batch-title-row">
                  <h3 className="batch-stage-title" id="batchStageTitle">
                    {initialBatch.title}
                  </h3>
                  <span className="batch-stage-year-tag" id="batchStageYearTag">
                    Academic Year {initialBatch.year}
                  </span>
                </div>
                <p className="batch-stage-caption" id="batchStageCaption">
                  {initialBatch.caption}
                </p>
                <div className="batch-highlights-row">
                  <div className="bh-item">
                    <span className="bh-label">Milestone</span>
                    <strong id="batchStageHighlight">{initialBatch.studentsHighlight}</strong>
                  </div>
                  <div className="bh-item">
                    <span className="bh-label">Institution</span>
                    <strong>Geetanjali High School · Maddur</strong>
                  </div>
                  <div className="bh-item">
                    <span className="bh-label">School Code</span>
                    <strong>46117</strong>
                  </div>
                </div>
              </div>

              {/* Prev / Next controls */}
              <div className="batch-stage-actions">
                <div className="batch-stage-nav">
                  <button
                    type="button"
                    className="batch-nav-btn"
                    id="batchPrevBtn"
                    data-cursor="hover"
                    aria-label="View previous batch"
                  >
                    <span>←</span> Previous
                  </button>
                  <span className="batch-nav-sep" aria-hidden="true"></span>
                  <button
                    type="button"
                    className="batch-nav-btn"
                    id="batchNextBtn"
                    data-cursor="hover"
                    aria-label="View next batch"
                  >
                    Next <span>→</span>
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-primary batch-open-full-btn"
                  id="batchOpenFullBtn"
                  data-cursor="hover"
                >
                  <span>Zoom &amp; Find Faces</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filmstrip of all 13 batches */}
        <div className="batch-filmstrip-section reveal">
          <div className="batch-filmstrip-head">
            <h4 className="filmstrip-title">Thirteen Batches of Pride</h4>
            <span className="filmstrip-hint">Click any photo to spotlight</span>
          </div>

          <div
            className="batch-filmstrip"
            id="batchFilmstrip"
            role="region"
            aria-label="All batch photos filmstrip"
          >
            {batches.map((b, idx) => (
              <button
                key={b.id}
                type="button"
                className={`batch-film-card ${idx === 0 ? "active" : ""}`}
                data-batch-id={b.id}
                data-batch-index={idx}
                data-cursor="hover"
                aria-label={`Switch to ${b.title}`}
              >
                <div className="batch-film-thumb">
                  <img
                    src={b.thumb}
                    alt={`${b.title} thumbnail`}
                    loading="lazy"
                  />
                  <div className="batch-film-overlay">
                    <span className="film-open-icon">✦</span>
                  </div>
                </div>
                <div className="batch-film-meta">
                  <span className="batch-film-year">{b.shortYear}</span>
                  <span className="batch-film-badge">{b.badge}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dedicated Zoomable Lightbox for Batches */}
      <div
        className="batch-lightbox"
        id="batchLightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Batch Photo Zoom Viewer"
        aria-hidden="true"
      >
        <div className="blb-backdrop" id="blbBackdrop"></div>

        {/* Lightbox Topbar */}
        <div className="blb-topbar">
          <div className="blb-title-wrap">
            <span className="blb-school">Geetanjali High School, Maddur</span>
            <h3 className="blb-title" id="blbTitle">{initialBatch.title}</h3>
          </div>

          <div className="blb-controls">
            <button
              type="button"
              className="blb-btn blb-back-btn"
              id="blbBackBtn"
              aria-label="Back to Batches"
              data-cursor="hover"
            >
              ← Back to Batches
            </button>
            <button
              type="button"
              className="blb-btn blb-zoom-btn"
              id="blbZoomBtn"
              aria-label="Toggle zoom level"
              data-cursor="hover"
            >
              <span id="blbZoomIcon">🔍</span>
              <span id="blbZoomText">Zoom 2x</span>
            </button>
            <a
              id="blbDownloadLink"
              href={initialBatch.original}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="blb-btn"
              title="Open full resolution original"
              aria-label="Open full resolution original"
              data-cursor="hover"
            >
              Full Res ↗
            </a>
            <button
              type="button"
              className="blb-btn blb-close-btn"
              id="blbClose"
              aria-label="Close zoom viewer"
              data-cursor="hover"
            >
              <span>Close</span> ✕
            </button>
          </div>
        </div>

        {/* Main Zoomable Viewport */}
        <div className="blb-viewport" id="blbViewport">
          <div className="blb-img-canvas" id="blbCanvas">
            <img
              id="blbImg"
              src={initialBatch.image}
              alt={initialBatch.title}
              draggable={false}
            />
          </div>
        </div>

        {/* Lightbox Navigation & Footer */}
        <button
          type="button"
          className="blb-nav-arrow blb-prev"
          id="blbPrev"
          aria-label="Previous batch"
          data-cursor="hover"
        >
          ‹
        </button>
        <button
          type="button"
          className="blb-nav-arrow blb-next"
          id="blbNext"
          aria-label="Next batch"
          data-cursor="hover"
        >
          ›
        </button>

        <div className="blb-footer">
          <div className="blb-caption" id="blbCaption">
            {initialBatch.caption}
          </div>
          <div className="blb-counter" id="blbCounter">
            Batch 1 of {batches.length}
          </div>
        </div>
      </div>
    </section>
  );
}
