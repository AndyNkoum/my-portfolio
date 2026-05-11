import React, { useState, useEffect, useRef } from 'react';

const PROJECTS = [
  {
    title: "Luxe Studio",
    client: "Premium Service Business",
    year: "2025",
    desc: "A 24/7 automated booking portal with real-time calendar syncing, eliminating double-bookings and manual scheduling. Reduced admin overhead by 80%.",
    tech: ["React", "State Management", "Dynamic Time Logic"],
    img: "https://images.unsplash.com/photo-1521590832167-7bfc17484d20?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://luxe-studio-demo.vercel.app",
    num: "01"
  },
  {
    title: "Aurum Residences",
    client: "Luxury Real Estate",
    year: "2025",
    desc: "A quiet-luxury property showcase utilizing hardware-accelerated parallax, scroll reveals, and high-end editorial typography. Conversion rate up 3×.",
    tech: ["React", "CSS Architecture", "Intersection Observers"],
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://aurum-demo.vercel.app",
    num: "02"
  },
  {
    title: "Terroir",
    client: "Fine Dining",
    year: "2026",
    desc: "An immersive, sensory digital experience for an award-winning restaurant. Complex grid layouts, reservation logic, and silky-smooth page transitions.",
    tech: ["React", "CSS Grid", "Client-side Validation"],
    img: "https://images.unsplash.com/photo-1600864703813-f4219dbb3b4f?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://terroir-demo.vercel.app",
    num: "03"
  },
  {
    title: "The Corner Roastery",
    client: "Local E-Commerce",
    year: "2026",
    desc: "A frictionless digital storefront with slide-out cart, live category filtering, and an interactive checkout flow. Sales up 55% in first quarter.",
    tech: ["React", "Cart State Logic", "Micro-animations"],
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1200&auto=format&fit=crop",
    demoUrl: "https://roastery-demo.vercel.app",
    num: "04"
  }
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

  :root {
    --bg: #090909;
    --surface: #111111;
    --surface2: #161616;
    --text: #F0EDE8;
    --muted: #6B6660;
    --muted2: #9C9590;
    --accent: #C8A96E;
    --accent-dim: rgba(200,169,110,0.12);
    --border: rgba(240,237,232,0.08);
    --border-strong: rgba(240,237,232,0.15);
    --ease: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; font-size: 16px; }

  body {
    font-family: 'Space Grotesk', sans-serif;
    background: var(--bg);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    line-height: 1.6;
    overflow-x: hidden;
    cursor: none;
  }

  ::selection { background: var(--accent); color: #090909; }

  /* CURSOR */
  .cursor {
    width: 10px; height: 10px;
    background: var(--accent);
    border-radius: 50%;
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s var(--ease), width 0.3s var(--ease), height 0.3s var(--ease), background 0.3s;
    mix-blend-mode: normal;
  }
  .cursor-ring {
    width: 36px; height: 36px;
    border: 1px solid rgba(200,169,110,0.5);
    border-radius: 50%;
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.4s var(--ease), width 0.3s var(--ease), height 0.3s var(--ease), opacity 0.3s;
  }
  .cursor.hovering { width: 14px; height: 14px; background: var(--text); }
  .cursor-ring.hovering { width: 56px; height: 56px; opacity: 0.6; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); }

  /* LAYOUT */
  .container { max-width: 1280px; margin: 0 auto; padding: 0 5vw; }
  .section-pad { padding: 140px 0; }

  /* NAV */
  .nav {
    position: fixed; top: 0; width: 100%;
    padding: 1.75rem 5vw;
    display: flex; justify-content: space-between; align-items: center;
    z-index: 100;
    transition: all 0.5s var(--ease);
  }
  .nav::before {
    content: '';
    position: absolute; inset: 0;
    background: rgba(9,9,9,0);
    backdrop-filter: blur(0px);
    transition: all 0.5s var(--ease);
    z-index: -1;
  }
  .nav.scrolled::before {
    background: rgba(9,9,9,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }
  .nav.scrolled { padding: 1.25rem 5vw; }

  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 18px;
    color: var(--text);
    text-decoration: none;
    letter-spacing: -0.02em;
  }
  .nav-logo span { color: var(--accent); }

  .nav-links { display: flex; gap: 3rem; align-items: center; }
  .nav-link {
    font-size: 13px; font-weight: 500;
    color: var(--muted); text-decoration: none;
    text-transform: uppercase; letter-spacing: 0.1em;
    transition: color 0.2s;
    position: relative;
  }
  .nav-link::after {
    content: '';
    position: absolute; bottom: -4px; left: 0;
    width: 0; height: 1px;
    background: var(--accent);
    transition: width 0.3s var(--ease);
  }
  .nav-link:hover { color: var(--text); }
  .nav-link:hover::after { width: 100%; }

  .nav-cta {
    font-size: 12px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.1em;
    padding: 10px 22px;
    border: 1px solid var(--accent);
    color: var(--accent);
    text-decoration: none;
    transition: all 0.3s var(--ease);
  }
  .nav-cta:hover { background: var(--accent); color: #090909; }

  @media (max-width: 768px) { .nav-links { display: none; } }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    padding-top: 100px;
    position: relative;
    overflow: hidden;
  }

  .hero-bg-text {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Syne', sans-serif;
    font-size: clamp(100px, 18vw, 260px);
    font-weight: 800;
    color: transparent;
    -webkit-text-stroke: 1px rgba(200,169,110,0.06);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.05em;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5vw;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .hero-eyebrow {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 2.5rem;
  }
  .hero-eyebrow-line {
    width: 48px; height: 1px; background: var(--accent);
  }
  .hero-eyebrow-text {
    font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.2em;
    color: var(--accent);
  }

  .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(3.5rem, 7.5vw, 7rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.04em;
    margin-bottom: 3rem;
    max-width: 1000px;
  }
  .hero-title .line { overflow: hidden; display: block; }
  .hero-title .word { display: inline-block; }
  .hero-title .accent { color: var(--accent); font-style: italic; }

  .hero-bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 3rem;
    flex-wrap: wrap;
    padding: 0 5vw;
    padding-bottom: 5rem;
    position: relative; z-index: 1;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
  }
  .hero-desc {
    font-size: 17px; color: var(--muted2);
    max-width: 460px; line-height: 1.75;
    font-weight: 400;
  }
  .hero-actions { display: flex; gap: 1.25rem; align-items: center; }

  .hero-scroll {
    display: flex; align-items: center; gap: 1rem;
    font-size: 11px; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.15em;
  }
  .scroll-line {
    width: 48px; height: 1px; background: var(--muted);
  }

  .hero-stats {
    display: flex; gap: 3rem;
  }
  .stat-item {}
  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 2.5rem; font-weight: 800;
    line-height: 1; color: var(--text);
    letter-spacing: -0.04em;
  }
  .stat-num span { color: var(--accent); }
  .stat-label {
    font-size: 11px; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.12em;
    margin-top: 0.5rem;
  }

  /* BUTTONS */
  .btn {
    display: inline-flex; align-items: center; gap: 0.75rem;
    padding: 16px 32px;
    font-size: 12px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.1em;
    text-decoration: none;
    transition: all 0.35s var(--ease);
    position: relative; overflow: hidden;
  }
  .btn-primary {
    background: var(--accent); color: #090909;
  }
  .btn-primary::before {
    content: '';
    position: absolute; inset: 0;
    background: #090909;
    transform: translateX(-101%);
    transition: transform 0.4s var(--ease);
  }
  .btn-primary:hover { color: var(--accent); }
  .btn-primary:hover::before { transform: translateX(0); }
  .btn-primary span { position: relative; z-index: 1; }

  .btn-ghost {
    background: transparent;
    border: 1px solid var(--border-strong);
    color: var(--muted2);
  }
  .btn-ghost:hover { border-color: var(--text); color: var(--text); }

  /* MARQUEE */
  .marquee-section {
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 1.5rem 0;
    overflow: hidden;
    background: var(--surface);
  }
  .marquee-track {
    display: flex;
    gap: 0;
    animation: marquee 22s linear infinite;
    white-space: nowrap;
  }
  .marquee-item {
    display: flex; align-items: center; gap: 2rem;
    padding: 0 2rem;
    font-size: 12px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.15em;
    color: var(--muted);
    flex-shrink: 0;
  }
  .marquee-dot { width: 4px; height: 4px; background: var(--accent); border-radius: 50%; }
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  /* WORK */
  .section-header {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 6rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid var(--border);
    flex-wrap: wrap; gap: 2rem;
  }
  .section-label {
    display: flex; align-items: center; gap: 1rem;
    font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.2em;
    color: var(--accent);
    margin-bottom: 1rem;
  }
  .section-label-line { width: 32px; height: 1px; background: var(--accent); }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.04em;
  }
  .section-meta {
    font-size: 14px; color: var(--muted);
    text-align: right;
  }

  /* PROJECT CARDS */
  .project-list { display: flex; flex-direction: column; gap: 0; }

  .project-item {
    display: grid;
    grid-template-columns: 80px 1fr 1fr;
    gap: 3rem;
    align-items: center;
    padding: 4rem 0;
    border-bottom: 1px solid var(--border);
    text-decoration: none;
    position: relative;
    transition: all 0.5s var(--ease);
    cursor: none;
  }
  .project-item::before {
    content: '';
    position: absolute; left: -5vw; right: -5vw; top: 0; bottom: 0;
    background: var(--surface2);
    opacity: 0;
    transition: opacity 0.4s var(--ease);
    z-index: -1;
  }
  .project-item:hover::before { opacity: 1; }

  .project-num {
    font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.05em;
    transition: color 0.3s;
  }
  .project-item:hover .project-num { color: var(--accent); }

  .project-main {}
  .project-client-tag {
    font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.15em;
    color: var(--muted); margin-bottom: 0.75rem;
    transition: color 0.3s;
  }
  .project-item:hover .project-client-tag { color: var(--accent); }
  .project-name {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.5rem, 2.5vw, 2.25rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--text);
    line-height: 1;
    margin-bottom: 1rem;
    transition: color 0.3s;
  }
  .project-item:hover .project-name { color: var(--accent); }

  .project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .tag {
    font-size: 11px; padding: 5px 12px;
    border: 1px solid var(--border);
    color: var(--muted);
    background: transparent;
    letter-spacing: 0.05em;
    transition: all 0.3s;
  }
  .project-item:hover .tag { border-color: var(--border-strong); color: var(--muted2); }

  .project-right {
    display: flex; flex-direction: column;
    align-items: flex-end; gap: 1.5rem;
  }
  .project-desc {
    font-size: 14px; color: var(--muted2);
    line-height: 1.7; text-align: right;
    max-width: 340px;
  }
  .project-arrow {
    width: 48px; height: 48px;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--muted);
    font-size: 20px;
    transition: all 0.3s var(--ease);
  }
  .project-item:hover .project-arrow {
    background: var(--accent); border-color: var(--accent);
    color: #090909; transform: rotate(45deg);
  }

  .project-img-preview {
    position: fixed;
    width: 320px; height: 220px;
    object-fit: cover;
    pointer-events: none;
    z-index: 200;
    opacity: 0;
    transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
    transform: scale(0.9) rotate(-2deg);
    border: 1px solid var(--border-strong);
  }
  .project-img-preview.visible {
    opacity: 1;
    transform: scale(1) rotate(-1deg);
  }

  @media (max-width: 900px) {
    .project-item { grid-template-columns: 40px 1fr; }
    .project-right { display: none; }
  }

  /* EXPERTISE */
  .expertise-section { background: var(--surface); }

  .expertise-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border: 1px solid var(--border);
  }
  @media (max-width: 768px) { .expertise-grid { grid-template-columns: 1fr; } }

  .expertise-card {
    padding: 3.5rem;
    border-right: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    transition: all 0.4s var(--ease);
  }
  .expertise-card:last-child { border-right: none; }
  .expertise-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--accent-dim) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s;
  }
  .expertise-card:hover::before { opacity: 1; }

  .expertise-num {
    font-family: 'Syne', sans-serif;
    font-size: 56px; font-weight: 800;
    color: rgba(200,169,110,0.07);
    line-height: 1;
    margin-bottom: 2.5rem;
    letter-spacing: -0.05em;
    transition: color 0.4s;
  }
  .expertise-card:hover .expertise-num { color: rgba(200,169,110,0.15); }
  .expertise-title {
    font-size: 1.1rem; font-weight: 600;
    color: var(--text); margin-bottom: 1rem;
    letter-spacing: -0.01em;
  }
  .expertise-desc {
    font-size: 14px; color: var(--muted2);
    line-height: 1.75;
  }
  .expertise-icon {
    position: absolute;
    top: 3rem; right: 3rem;
    width: 10px; height: 10px;
    background: var(--accent);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .expertise-card:hover .expertise-icon { opacity: 1; }

  /* ABOUT / STATEMENT */
  .statement-section {
    border-top: 1px solid var(--border);
  }
  .statement-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 6rem;
    align-items: start;
  }
  @media (max-width: 900px) { .statement-grid { grid-template-columns: 1fr; gap: 3rem; } }
  .statement-sidebar {}
  .statement-available {
    display: flex; align-items: center; gap: 0.75rem;
    font-size: 12px; color: var(--muted2);
    text-transform: uppercase; letter-spacing: 0.12em;
    margin-bottom: 3rem;
  }
  .avail-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #3DDB7A;
    box-shadow: 0 0 12px rgba(61,219,122,0.6);
    animation: pulse-green 2s infinite;
  }
  @keyframes pulse-green {
    0%, 100% { box-shadow: 0 0 12px rgba(61,219,122,0.6); }
    50% { box-shadow: 0 0 24px rgba(61,219,122,0.9); }
  }

  .statement-detail-list { display: flex; flex-direction: column; gap: 1.5rem; }
  .statement-detail {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border);
  }
  .statement-detail:last-child { border-bottom: none; padding-bottom: 0; }
  .detail-label {
    font-size: 10px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.2em;
    color: var(--muted); margin-bottom: 0.5rem;
  }
  .detail-value { font-size: 15px; color: var(--text); font-weight: 500; }

  .statement-main {}
  .statement-quote {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.75rem, 3.5vw, 3rem);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.04em;
    color: var(--text);
    margin-bottom: 3rem;
  }
  .statement-quote .accent { color: var(--accent); }
  .statement-body {
    font-size: 16px; color: var(--muted2);
    line-height: 1.8; max-width: 600px;
    margin-bottom: 3rem;
  }

  /* CONTACT */
  .contact-section {
    background: var(--text);
    color: #090909;
    position: relative;
    overflow: hidden;
  }
  .contact-bg-text {
    position: absolute;
    bottom: -0.15em; left: 5vw; right: 0;
    font-family: 'Syne', sans-serif;
    font-size: clamp(80px, 14vw, 180px);
    font-weight: 800;
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(9,9,9,0.12);
    white-space: nowrap;
    pointer-events: none;
    line-height: 1;
    letter-spacing: -0.04em;
  }
  .contact-inner {
    position: relative; z-index: 1;
    padding: 140px 5vw;
    max-width: 1280px; margin: 0 auto;
  }
  .contact-label {
    display: flex; align-items: center; gap: 1rem;
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.2em;
    color: rgba(9,9,9,0.45);
    margin-bottom: 2rem;
  }
  .contact-label-line { width: 32px; height: 1px; background: rgba(9,9,9,0.3); }
  .contact-headline {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.5rem, 6vw, 5.5rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.05em;
    color: #090909;
    margin-bottom: 4rem;
  }
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: end;
  }
  @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
  .contact-methods { display: flex; flex-direction: column; gap: 2.5rem; }
  .c-method {}
  .c-label {
    font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.2em;
    color: rgba(9,9,9,0.4); margin-bottom: 0.6rem; display: block;
  }
  .c-val {
    font-size: 1.3rem; font-weight: 600;
    color: #090909; text-decoration: none;
    letter-spacing: -0.02em;
    border-bottom: 2px solid rgba(9,9,9,0.2);
    padding-bottom: 4px;
    transition: border-color 0.2s;
    display: inline-block;
  }
  .c-val:hover { border-color: #090909; }
  .contact-cta-block {
    display: flex; flex-direction: column;
    align-items: flex-end; justify-content: flex-end;
    gap: 1.5rem;
  }
  .contact-note {
    font-size: 13px; color: rgba(9,9,9,0.5);
    text-align: right; max-width: 260px; line-height: 1.6;
  }
  .btn-dark {
    display: inline-flex; align-items: center; gap: 0.75rem;
    padding: 18px 36px;
    background: #090909; color: var(--accent);
    font-size: 12px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.12em;
    text-decoration: none;
    transition: all 0.35s var(--ease);
    position: relative; overflow: hidden;
  }
  .btn-dark::before {
    content: '';
    position: absolute; inset: 0;
    background: var(--accent);
    transform: translateX(-101%);
    transition: transform 0.4s var(--ease);
  }
  .btn-dark:hover { color: #090909; }
  .btn-dark:hover::before { transform: translateX(0); }
  .btn-dark span { position: relative; z-index: 1; }

  /* FOOTER */
  .footer {
    background: #090909;
    padding: 2.5rem 5vw;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .footer-logo {
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 800;
    color: var(--text);
    letter-spacing: -0.02em;
  }
  .footer-logo span { color: var(--accent); }
  .footer-copy { font-size: 12px; color: var(--muted); letter-spacing: 0.03em; }
  .footer-right { font-size: 12px; color: var(--muted); }

  /* REVEAL ANIMATIONS */
  .reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .d-1 { transition-delay: 0.1s; }
  .d-2 { transition-delay: 0.2s; }
  .d-3 { transition-delay: 0.3s; }
`;

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const imgPreviewRef = useRef(null);
  const rafRef = useRef(null);
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
      }
      const animate = () => {
        ringPos.current.x += (e.clientX - 18 - ringPos.current.x) * 0.12;
        ringPos.current.y += (e.clientY - 18 - ringPos.current.y) * 0.12;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
        }
      };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);

      if (imgPreviewRef.current && hoveredProject !== null) {
        imgPreviewRef.current.style.left = `${e.clientX + 20}px`;
        imgPreviewRef.current.style.top = `${e.clientY - 110}px`;
      }
    };

    const onEnter = (e) => {
      if (e.target.closest('a, button, .project-item')) {
        setIsHovering(true);
        cursorRef.current?.classList.add('hovering');
        ringRef.current?.classList.add('hovering');
      }
    };
    const onLeave = (e) => {
      if (e.target.closest('a, button, .project-item')) {
        setIsHovering(false);
        cursorRef.current?.classList.remove('hovering');
        ringRef.current?.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onEnter);
    window.addEventListener('mouseout', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onEnter);
      window.removeEventListener('mouseout', onLeave);
    };
  }, [hoveredProject]);

  const marqueeItems = ['React Architecture', 'Performance Engineering', 'UI/UX Systems', 'E-Commerce', 'Booking Platforms', 'Luxury Digital Experiences', 'Systems Integration', 'Frontend Development'];

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
      {hoveredProject !== null && (
        <img
          ref={imgPreviewRef}
          src={PROJECTS[hoveredProject].img}
          alt=""
          className={`project-img-preview ${hoveredProject !== null ? 'visible' : ''}`}
          style={{ left: mousePos.x + 20, top: mousePos.y - 110 }}
        />
      )}

      {/* NAV */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo">Andy<span>.</span></a>
        <div className="nav-links">
          <a href="#work" className="nav-link">Work</a>
          <a href="#expertise" className="nav-link">Expertise</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-cta">Start a Project</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-text">NKOUM</div>
        <div className="hero-content">
          <div className="hero-eyebrow reveal">
            <div className="hero-eyebrow-line" />
            <div className="hero-eyebrow-text">Software Engineer · Pretoria, SA</div>
          </div>
          <h1 className="hero-title">
            <span className="line"><span className="word reveal d-1">Engineering</span></span>
            <span className="line"><span className="word reveal d-2">digital products</span></span>
            <span className="line"><span className="word reveal d-3">that <em className="accent">perform.</em></span></span>
          </h1>
        </div>
        <div className="hero-bottom">
          <div>
            <p className="hero-desc reveal">
              Front-end architect specializing in high-performance web applications, automated systems, and premium digital storefronts that drive measurable business results.
            </p>
            <div className="hero-actions" style={{ marginTop: '2.5rem' }}>
              <a href="#work" className="btn btn-primary reveal d-1"><span>View Selected Work</span></a>
              <a href="#contact" className="btn btn-ghost reveal d-2">Let's Talk</a>
            </div>
          </div>
          <div className="hero-stats reveal d-2">
            <div className="stat-item">
              <div className="stat-num">4<span>+</span></div>
              <div className="stat-label">Delivered Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">95<span>+</span></div>
              <div className="stat-label">PageSpeed Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}<span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* WORK */}
      <section id="work" className="section-pad container">
        <div className="section-header reveal">
          <div>
            <div className="section-label"><div className="section-label-line" /> Selected Work</div>
            <h2 className="section-title">Recent Projects</h2>
          </div>
          <div className="section-meta">2025 — 2026</div>
        </div>

        <div className="project-list">
          {PROJECTS.map((p, i) => (
            <a
              key={i}
              href={p.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-item reveal"
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="project-num">{p.num}</div>
              <div className="project-main">
                <div className="project-client-tag">{p.client} · {p.year}</div>
                <div className="project-name">{p.title}</div>
                <div className="project-tags">
                  {p.tech.map((t, idx) => <span key={idx} className="tag">{t}</span>)}
                </div>
              </div>
              <div className="project-right">
                <p className="project-desc">{p.desc}</p>
                <div className="project-arrow">↗</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* EXPERTISE */}
      <section id="expertise" className="expertise-section section-pad">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-label"><div className="section-label-line" /> What I Do</div>
              <h2 className="section-title">Technical Expertise</h2>
            </div>
          </div>
          <div className="expertise-grid">
            <div className="expertise-card reveal">
              <div className="expertise-icon" />
              <div className="expertise-num">01</div>
              <h3 className="expertise-title">Complex State Management</h3>
              <p className="expertise-desc">Building applications that handle intricate user flows — multi-step booking systems, real-time carts — without sacrificing a frame of performance or a pixel of UX.</p>
            </div>
            <div className="expertise-card reveal d-1">
              <div className="expertise-icon" />
              <div className="expertise-num">02</div>
              <h3 className="expertise-title">Premium Frontend Architecture</h3>
              <p className="expertise-desc">Translating high-end design into flawless, hardware-accelerated code. Cross-browser consistent. 95+ PageSpeed. No exceptions.</p>
            </div>
            <div className="expertise-card reveal d-2">
              <div className="expertise-icon" />
              <div className="expertise-num">03</div>
              <h3 className="expertise-title">Systems Integration</h3>
              <p className="expertise-desc">Connecting clean interfaces to robust backends. Data that persists securely, business logic that executes without failure, APIs that don't lie.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / STATEMENT */}
      <section id="about" className="statement-section section-pad container">
        <div className="statement-grid">
          <div className="reveal">
            <div className="statement-available">
              <div className="avail-dot" />
              Available for projects
            </div>
            <div className="statement-detail-list">
              <div className="statement-detail">
                <div className="detail-label">Based in</div>
                <div className="detail-value">Pretoria, South Africa</div>
              </div>
              <div className="statement-detail">
                <div className="detail-label">Availability</div>
                <div className="detail-value">Remote Contracts · Global</div>
              </div>
              <div className="statement-detail">
                <div className="detail-label">Specialization</div>
                <div className="detail-value">React · TypeScript · Frontend Systems</div>
              </div>
              <div className="statement-detail">
                <div className="detail-label">Response Time</div>
                <div className="detail-value">Within 24 hours</div>
              </div>
            </div>
          </div>
          <div className="reveal d-1">
            <h2 className="statement-quote">
              I build the interfaces that make<br/>ambitious brands <span className="accent">unforgettable.</span>
            </h2>
            <p className="statement-body">
              I'm Andy Nkoum — a software engineer who obsesses over the gap between a working interface and a remarkable one. Every millisecond of load time, every transition curve, every hover state is a decision. I make those decisions intentionally, because your clients notice even when they can't articulate why.
            </p>
            <p className="statement-body">
              My clients don't just get code — they get a partner who understands that the product is the brand, and the brand is the business.
            </p>
            <a href="#contact" className="btn btn-primary reveal d-2"><span>Work With Me</span></a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="contact-bg-text">LETS BUILD</div>
        <div className="contact-inner">
          <div className="contact-label reveal">
            <div className="contact-label-line" /> Get in Touch
          </div>
          <h2 className="contact-headline reveal d-1">
            Ready to<br/>build something<br/>exceptional?
          </h2>
          <div className="contact-grid">
            <div className="contact-methods reveal d-1">
              <div className="c-method">
                <span className="c-label">Email</span>
                <a href="mailto:andyedimankoum@gmail.com" className="c-val">andyedimankoum@gmail.com</a>
              </div>
              <div className="c-method">
                <span className="c-label">Phone / WhatsApp</span>
                <a href="tel:+27796150919" className="c-val">+27 796 150 919</a>
              </div>
              <div className="c-method">
                <span className="c-label">Location</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'rgba(9,9,9,0.6)', letterSpacing: '-0.01em' }}>
                  Pretoria, South Africa<br/>
                  <span style={{ fontSize: '13px', fontWeight: 500 }}>Available remotely · worldwide</span>
                </div>
              </div>
            </div>
            <div className="contact-cta-block reveal d-2">
              <p className="contact-note">Projects typically begin within 2 weeks. Let's talk about what you need built.</p>
              <a href="mailto:andyedimankoum@gmail.com" className="btn-dark">
                <span>Send a Message ↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Andy<span>.</span></div>
        <div className="footer-copy">© {new Date().getFullYear()} Andy Nkoum. All rights reserved.</div>
        <div className="footer-right">Software Engineering & Digital Architecture</div>
      </footer>
    </>
  );
}
