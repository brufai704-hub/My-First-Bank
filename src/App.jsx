import { useState, useEffect, useRef } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0a1628;
    --navy-mid: #112240;
    --navy-light: #1a3560;
    --gold: #f5a623;
    --gold-dark: #d4891a;
    --gold-light: #fbbf47;
    --white: #ffffff;
    --bg: #f4f6fb;
    --text: #1a2744;
    --muted: #6b7a99;
    --border: #dce3f0;
    --card-shadow: 0 4px 24px rgba(10,22,40,0.10);
    --card-shadow-hover: 0 12px 40px rgba(10,22,40,0.18);
    --radius: 16px;
    --radius-sm: 10px;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    min-height: 100vh;
  }

  h1,h2,h3,h4 { font-family: 'Playfair Display', serif; line-height: 1.2; }

  /* NAVBAR */
  .navbar {
    position: sticky; top: 0; z-index: 100;
    background: var(--navy);
    box-shadow: 0 2px 20px rgba(0,0,0,0.25);
    padding: 0 5%;
    display: flex; align-items: center; justify-content: space-between;
    height: 68px;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px;
    cursor: pointer; text-decoration: none;
  }
  .nav-logo-shield {
    width: 38px; height: 38px;
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; box-shadow: 0 2px 10px rgba(245,166,35,0.35);
  }
  .nav-logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem; font-weight: 700;
    color: var(--white); letter-spacing: 0.3px;
  }
  .nav-logo-text span { color: var(--gold); }

  .nav-links {
    display: flex; align-items: center; gap: 4px;
    list-style: none;
  }
  .nav-links li a, .nav-links li button {
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem; font-weight: 500;
    color: rgba(255,255,255,0.75);
    padding: 8px 14px; border-radius: 8px;
    transition: all 0.2s; text-decoration: none; display: block;
  }
  .nav-links li button:hover, .nav-links li button.active {
    color: var(--white);
    background: rgba(255,255,255,0.1);
  }
  .nav-links li button.active { color: var(--gold); }

  .nav-actions { display: flex; align-items: center; gap: 10px; }
  .btn-ghost {
    background: none; border: 1.5px solid rgba(255,255,255,0.3);
    color: var(--white); padding: 9px 20px; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.9rem;
    cursor: pointer; transition: all 0.22s;
  }
  .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }
  .btn-gold {
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    border: none; color: var(--navy); padding: 9px 22px; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.9rem;
    cursor: pointer; transition: all 0.22s;
    box-shadow: 0 2px 12px rgba(245,166,35,0.35);
  }
  .btn-gold:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(245,166,35,0.45); }

  .hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 6px;
  }
  .hamburger span { width: 24px; height: 2px; background: var(--white); border-radius: 2px; transition: 0.3s; display: block; }

  .mobile-menu {
    display: none; flex-direction: column;
    background: var(--navy-mid); padding: 16px 5% 20px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .mobile-menu.open { display: flex; }
  .mobile-menu button {
    background: none; border: none; color: rgba(255,255,255,0.8);
    font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 500;
    padding: 12px 0; text-align: left; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .mobile-menu button:last-child { border-bottom: none; }
  .mobile-menu button.active { color: var(--gold); }

  /* HERO */
  .hero {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 50%, #0d1f45 100%);
    min-height: 88vh; display: flex; align-items: center;
    padding: 80px 5%; position: relative; overflow: hidden;
  }
  .hero-bg-pattern {
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(circle at 20% 50%, rgba(245,166,35,0.06) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(26,53,96,0.8) 0%, transparent 40%),
      repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.012) 40px, rgba(255,255,255,0.012) 41px);
  }
  .hero-content { max-width: 580px; position: relative; z-index: 2; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(245,166,35,0.12); border: 1px solid rgba(245,166,35,0.3);
    color: var(--gold); padding: 6px 16px; border-radius: 100px;
    font-size: 0.82rem; font-weight: 600; letter-spacing: 0.5px;
    margin-bottom: 28px; text-transform: uppercase;
  }
  .hero h1 {
    font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 700;
    color: var(--white); margin-bottom: 20px;
    line-height: 1.15;
  }
  .hero h1 .accent { color: var(--gold); }
  .hero p {
    font-size: 1.1rem; color: rgba(255,255,255,0.7);
    margin-bottom: 36px; max-width: 480px; line-height: 1.7;
  }
  .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
  .btn-primary {
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    border: none; color: var(--navy); padding: 14px 30px; border-radius: 12px;
    font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 1rem;
    cursor: pointer; transition: all 0.25s;
    box-shadow: 0 4px 18px rgba(245,166,35,0.4);
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,166,35,0.5); }
  .btn-outline {
    background: none; border: 1.5px solid rgba(255,255,255,0.35);
    color: var(--white); padding: 14px 30px; border-radius: 12px;
    font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 1rem;
    cursor: pointer; transition: all 0.25s;
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); background: rgba(245,166,35,0.06); }

  .hero-card {
    position: absolute; right: 7%; top: 50%; transform: translateY(-50%);
    width: 320px; background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.13); border-radius: 22px;
    padding: 28px; backdrop-filter: blur(20px);
    box-shadow: 0 24px 60px rgba(0,0,0,0.3);
    z-index: 2;
  }
  .hero-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
  .hero-card-label { color: rgba(255,255,255,0.6); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 1px; }
  .hero-card-chip {
    background: var(--gold); color: var(--navy);
    font-size: 0.7rem; font-weight: 700; padding: 4px 10px; border-radius: 6px;
  }
  .hero-card-balance { color: var(--white); font-size: 2rem; font-weight: 700; margin-bottom: 4px; font-family: 'Playfair Display', serif; }
  .hero-card-sub { color: rgba(255,255,255,0.5); font-size: 0.82rem; margin-bottom: 24px; }
  .hero-card-bars { display: flex; gap: 6px; align-items: flex-end; margin-bottom: 20px; }
  .hero-card-bars span {
    width: 18px; border-radius: 4px 4px 0 0;
    background: rgba(245,166,35,0.3);
    transition: 0.3s;
  }
  .hero-card-bars span.hi { background: var(--gold); }
  .hero-card-divider { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 16px 0; }
  .hero-card-row { display: flex; justify-content: space-between; }
  .hero-card-stat { text-align: center; }
  .hero-card-stat-val { color: var(--white); font-weight: 600; font-size: 0.95rem; }
  .hero-card-stat-key { color: rgba(255,255,255,0.45); font-size: 0.75rem; }

  /* SECTIONS */
  .section { padding: 80px 5%; }
  .section-light { background: var(--white); }
  .section-bg { background: var(--bg); }
  .section-dark { background: var(--navy); }
  .section-title {
    font-size: clamp(1.7rem, 3.5vw, 2.4rem); font-weight: 700;
    color: var(--navy); text-align: center; margin-bottom: 14px;
  }
  .section-title.light { color: var(--white); }
  .section-sub {
    text-align: center; color: var(--muted); font-size: 1.05rem;
    max-width: 560px; margin: 0 auto 52px; line-height: 1.7;
  }
  .section-sub.light { color: rgba(255,255,255,0.65); }

  .gold-line {
    width: 52px; height: 4px; background: var(--gold);
    border-radius: 2px; margin: 14px auto 0;
  }

  /* GRID CARDS */
  .grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 22px; }
  .grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 28px; }

  .card {
    background: var(--white); border-radius: var(--radius);
    padding: 32px; box-shadow: var(--card-shadow);
    border: 1px solid var(--border);
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .card:hover { transform: translateY(-5px); box-shadow: var(--card-shadow-hover); }

  .card-icon {
    width: 52px; height: 52px; border-radius: 14px;
    background: linear-gradient(135deg, rgba(245,166,35,0.12), rgba(245,166,35,0.06));
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; margin-bottom: 18px;
    border: 1px solid rgba(245,166,35,0.2);
  }
  .card h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: 10px; color: var(--navy); }
  .card p { color: var(--muted); font-size: 0.93rem; line-height: 1.65; }

  /* FEATURE CARDS (Home) */
  .feature-card {
    background: var(--navy); color: var(--white);
    border-radius: var(--radius); padding: 36px 30px;
    border: 1px solid rgba(255,255,255,0.08);
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .feature-card:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,0,0,0.3); }
  .feature-card .card-icon { background: rgba(245,166,35,0.15); border-color: rgba(245,166,35,0.3); }
  .feature-card h3 { color: var(--white); }
  .feature-card p { color: rgba(255,255,255,0.6); }

  /* TESTIMONIALS */
  .testimonial-card {
    background: var(--white); border-radius: var(--radius);
    padding: 32px; box-shadow: var(--card-shadow);
    border: 1px solid var(--border);
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .testimonial-card:hover { transform: translateY(-4px); box-shadow: var(--card-shadow-hover); }
  .stars { color: var(--gold); font-size: 1.1rem; margin-bottom: 14px; letter-spacing: 2px; }
  .testimonial-text { color: var(--text); font-size: 0.97rem; line-height: 1.7; margin-bottom: 20px; font-style: italic; }
  .testimonial-author { display: flex; align-items: center; gap: 12px; }
  .avatar {
    width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(135deg, var(--navy), var(--navy-light));
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); font-weight: 700; font-size: 1rem;
  }
  .author-name { font-weight: 600; font-size: 0.9rem; color: var(--navy); }
  .author-role { font-size: 0.8rem; color: var(--muted); }

  /* CTA BANNER */
  .cta-banner {
    background: linear-gradient(135deg, var(--navy), var(--navy-mid));
    border-radius: 22px; padding: 60px 50px;
    text-align: center; position: relative; overflow: hidden;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .cta-banner::before {
    content: ''; position: absolute;
    top: -50%; left: -20%; width: 60%; height: 200%;
    background: radial-gradient(ellipse, rgba(245,166,35,0.1), transparent 60%);
    pointer-events: none;
  }
  .cta-banner h2 { color: var(--white); font-size: clamp(1.6rem,3vw,2.2rem); margin-bottom: 14px; position: relative; }
  .cta-banner p { color: rgba(255,255,255,0.65); margin-bottom: 32px; font-size: 1.05rem; position: relative; }

  /* PAGE HEADER */
  .page-header {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%);
    padding: 70px 5% 60px;
    position: relative; overflow: hidden;
  }
  .page-header::after {
    content: ''; position: absolute; right: 0; top: 0; bottom: 0; width: 40%;
    background: radial-gradient(ellipse at right, rgba(245,166,35,0.08), transparent 70%);
  }
  .page-header h1 { color: var(--white); font-size: clamp(2rem,4vw,3rem); margin-bottom: 12px; }
  .page-header p { color: rgba(255,255,255,0.65); font-size: 1.1rem; max-width: 560px; line-height: 1.7; }
  .breadcrumb { color: var(--gold); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }

  /* ABOUT */
  .mission-box {
    background: var(--navy); color: var(--white);
    border-radius: 20px; padding: 52px; margin-bottom: 60px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;
    border: 1px solid rgba(255,255,255,0.07);
  }
  .mission-box h2 { font-size: clamp(1.6rem,3vw,2.2rem); margin-bottom: 18px; }
  .mission-box p { color: rgba(255,255,255,0.7); line-height: 1.75; font-size: 1rem; }
  .mission-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .mission-stat {
    background: rgba(255,255,255,0.06); border-radius: 14px;
    padding: 22px; border: 1px solid rgba(255,255,255,0.1); text-align: center;
  }
  .mission-stat-val { color: var(--gold); font-size: 2rem; font-weight: 700; font-family: 'Playfair Display', serif; }
  .mission-stat-label { color: rgba(255,255,255,0.6); font-size: 0.82rem; margin-top: 4px; }

  .team-card {
    background: var(--white); border-radius: var(--radius);
    padding: 32px; box-shadow: var(--card-shadow);
    border: 1px solid var(--border);
    text-align: center; transition: transform 0.25s, box-shadow 0.25s;
  }
  .team-card:hover { transform: translateY(-5px); box-shadow: var(--card-shadow-hover); }
  .team-avatar {
    width: 80px; height: 80px; border-radius: 50%;
    background: linear-gradient(135deg, var(--navy), var(--navy-light));
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem; margin: 0 auto 16px;
    border: 3px solid var(--gold);
  }
  .team-name { font-size: 1.1rem; font-weight: 700; color: var(--navy); margin-bottom: 4px; }
  .team-role { color: var(--gold); font-size: 0.85rem; font-weight: 600; margin-bottom: 12px; }
  .team-bio { color: var(--muted); font-size: 0.88rem; line-height: 1.6; }

  /* BANKING PAGES */
  .feature-list-item {
    display: flex; align-items: flex-start; gap: 16px;
    padding: 24px; background: var(--white);
    border-radius: var(--radius-sm); margin-bottom: 12px;
    border: 1px solid var(--border);
    box-shadow: 0 2px 10px rgba(10,22,40,0.06);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .feature-list-item:hover { transform: translateX(4px); box-shadow: 0 6px 20px rgba(10,22,40,0.1); }
  .feature-list-icon {
    width: 46px; height: 46px; min-width: 46px; border-radius: 12px;
    background: linear-gradient(135deg, var(--navy), var(--navy-light));
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
  }
  .feature-list-text h3 { font-size: 1rem; font-weight: 600; margin-bottom: 4px; color: var(--navy); }
  .feature-list-text p { font-size: 0.88rem; color: var(--muted); line-height: 1.55; }

  /* LOANS */
  .loan-card {
    background: var(--white); border-radius: var(--radius);
    padding: 36px; box-shadow: var(--card-shadow);
    border: 1px solid var(--border);
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .loan-card:hover { transform: translateY(-5px); box-shadow: var(--card-shadow-hover); }
  .loan-type { color: var(--gold); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .loan-card h3 { font-size: 1.4rem; font-weight: 700; color: var(--navy); margin-bottom: 18px; }
  .loan-rate { font-size: 2.4rem; font-weight: 700; color: var(--navy); font-family: 'Playfair Display', serif; }
  .loan-rate span { font-size: 1rem; font-weight: 400; color: var(--muted); }
  .loan-details { margin: 20px 0; padding: 16px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .loan-detail-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; }
  .loan-detail-row:last-child { margin-bottom: 0; }
  .loan-detail-label { color: var(--muted); }
  .loan-detail-val { font-weight: 600; color: var(--navy); }
  .loan-features { list-style: none; margin: 18px 0; }
  .loan-features li { color: var(--muted); font-size: 0.9rem; padding: 5px 0; display: flex; gap: 8px; }
  .loan-features li::before { content: '✓'; color: var(--gold); font-weight: 700; }
  .btn-apply {
    width: 100%; background: linear-gradient(135deg, var(--navy), var(--navy-light));
    color: var(--white); border: none; padding: 14px;
    border-radius: 12px; font-family: 'DM Sans', sans-serif;
    font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.25s;
  }
  .btn-apply:hover { background: linear-gradient(135deg, var(--gold), var(--gold-dark)); color: var(--navy); transform: translateY(-1px); }

  /* FAQ / ACCORDION */
  .accordion-item {
    background: var(--white); border-radius: var(--radius-sm);
    border: 1px solid var(--border); margin-bottom: 10px;
    overflow: hidden; box-shadow: 0 2px 8px rgba(10,22,40,0.05);
  }
  .accordion-trigger {
    width: 100%; background: none; border: none; cursor: pointer;
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 24px; font-family: 'DM Sans', sans-serif;
    font-size: 1rem; font-weight: 600; color: var(--navy); text-align: left;
    transition: background 0.2s;
  }
  .accordion-trigger:hover { background: rgba(245,166,35,0.04); }
  .accordion-trigger.open { color: var(--gold); }
  .accordion-icon { font-size: 1.2rem; color: var(--gold); transition: transform 0.3s; min-width: 24px; text-align: center; }
  .accordion-icon.open { transform: rotate(45deg); }
  .accordion-body {
    max-height: 0; overflow: hidden; transition: max-height 0.35s ease;
    padding: 0 24px;
  }
  .accordion-body.open { max-height: 300px; padding: 0 24px 20px; }
  .accordion-body p { color: var(--muted); line-height: 1.7; font-size: 0.95rem; }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: start; }
  .form-group { margin-bottom: 20px; }
  .form-group label { display: block; font-weight: 600; font-size: 0.88rem; color: var(--navy); margin-bottom: 7px; }
  .form-control {
    width: 100%; padding: 12px 16px; border-radius: 10px;
    border: 1.5px solid var(--border); font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem; color: var(--text);
    background: var(--white); transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .form-control:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(245,166,35,0.12); }
  textarea.form-control { resize: vertical; min-height: 130px; }
  select.form-control { cursor: pointer; }
  .btn-submit {
    width: 100%; background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    color: var(--navy); border: none; padding: 15px;
    border-radius: 12px; font-family: 'DM Sans', sans-serif;
    font-weight: 700; font-size: 1.05rem; cursor: pointer; transition: all 0.25s;
    box-shadow: 0 4px 16px rgba(245,166,35,0.35);
  }
  .btn-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245,166,35,0.45); }
  .success-msg {
    background: linear-gradient(135deg, #d4edda, #c3e6cb);
    border: 1px solid #a8d5b5; border-radius: 12px;
    padding: 20px 24px; color: #155724; font-weight: 600;
    display: flex; align-items: center; gap: 12px; margin-top: 16px;
    font-size: 0.95rem;
  }
  .info-card {
    background: var(--white); border-radius: var(--radius);
    padding: 28px; margin-bottom: 16px;
    box-shadow: var(--card-shadow); border: 1px solid var(--border);
    display: flex; gap: 16px; align-items: flex-start;
  }
  .info-card-icon {
    width: 46px; height: 46px; min-width: 46px; border-radius: 12px;
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; color: var(--navy);
  }
  .info-card h4 { font-size: 0.85rem; font-weight: 700; color: var(--navy); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
  .info-card p { font-size: 0.92rem; color: var(--muted); line-height: 1.55; }

  /* SIGNUP */
  .signup-wrap { max-width: 600px; margin: 0 auto; }
  .progress-bar-wrap {
    background: var(--border); border-radius: 100px;
    height: 7px; margin-bottom: 40px; overflow: hidden;
  }
  .progress-bar-fill {
    height: 100%; background: linear-gradient(90deg, var(--gold), var(--gold-light));
    border-radius: 100px; transition: width 0.4s ease;
  }
  .step-labels { display: flex; justify-content: space-between; margin-bottom: 12px; }
  .step-label { font-size: 0.78rem; font-weight: 600; color: var(--muted); }
  .step-label.active { color: var(--gold); }
  .signup-card {
    background: var(--white); border-radius: 20px;
    padding: 44px; box-shadow: 0 8px 40px rgba(10,22,40,0.12);
    border: 1px solid var(--border);
  }
  .signup-card h2 { font-size: 1.6rem; margin-bottom: 6px; color: var(--navy); }
  .signup-card .step-sub { color: var(--muted); font-size: 0.9rem; margin-bottom: 28px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .btn-next {
    width: 100%; background: linear-gradient(135deg, var(--navy), var(--navy-light));
    color: var(--white); border: none; padding: 15px;
    border-radius: 12px; font-family: 'DM Sans', sans-serif;
    font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.25s;
    margin-top: 10px;
  }
  .btn-next:hover { background: linear-gradient(135deg, var(--gold), var(--gold-dark)); color: var(--navy); }
  .btn-back {
    background: none; border: 1.5px solid var(--border); color: var(--muted);
    padding: 13px; border-radius: 12px; font-family: 'DM Sans', sans-serif;
    font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: all 0.25s; flex: 1;
  }
  .btn-back:hover { border-color: var(--navy); color: var(--navy); }
  .btn-pair { display: flex; gap: 12px; margin-top: 10px; }
  .btn-pair .btn-next { flex: 2; margin-top: 0; }
  .checkbox-row { display: flex; align-items: flex-start; gap: 10px; margin: 16px 0; }
  .checkbox-row input { margin-top: 3px; accent-color: var(--gold); }
  .checkbox-row label { font-size: 0.88rem; color: var(--muted); line-height: 1.5; }
  .welcome-screen { text-align: center; padding: 20px 0; }
  .welcome-icon {
    width: 84px; height: 84px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--gold-dark));
    display: flex; align-items: center; justify-content: center;
    font-size: 2.4rem; margin: 0 auto 24px;
    box-shadow: 0 8px 30px rgba(245,166,35,0.4);
  }
  .welcome-screen h2 { font-size: 2rem; color: var(--navy); margin-bottom: 10px; }
  .welcome-screen p { color: var(--muted); font-size: 1rem; line-height: 1.7; }

  /* LOGIN / DASHBOARD */
  .login-wrap { max-width: 440px; margin: 0 auto; }
  .login-card {
    background: var(--white); border-radius: 20px;
    padding: 44px; box-shadow: 0 8px 40px rgba(10,22,40,0.12);
    border: 1px solid var(--border);
  }
  .login-logo { text-align: center; margin-bottom: 28px; }
  .login-logo .nav-logo-shield { width: 52px; height: 52px; font-size: 26px; margin: 0 auto 10px; }
  .login-card h2 { text-align: center; font-size: 1.7rem; color: var(--navy); margin-bottom: 6px; }
  .login-sub { text-align: center; color: var(--muted); font-size: 0.92rem; margin-bottom: 30px; }
  .forgot-link { font-size: 0.85rem; color: var(--gold); cursor: pointer; font-weight: 600; text-decoration: none; }
  .forgot-link:hover { text-decoration: underline; }
  .form-row-between { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }

  /* DASHBOARD */
  .dashboard-header {
    background: linear-gradient(135deg, var(--navy), var(--navy-mid));
    padding: 40px 5%; display: flex; justify-content: space-between; align-items: center;
  }
  .dashboard-header h2 { color: var(--white); font-size: 1.5rem; margin-bottom: 4px; }
  .dashboard-header p { color: rgba(255,255,255,0.6); font-size: 0.9rem; }
  .dashboard-header .btn-ghost { font-size: 0.85rem; padding: 8px 16px; }
  .dashboard-body { padding: 40px 5%; }
  .balance-card {
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);
    border-radius: 20px; padding: 36px; margin-bottom: 28px;
    color: var(--navy); position: relative; overflow: hidden;
    box-shadow: 0 8px 32px rgba(245,166,35,0.4);
  }
  .balance-card::before {
    content: ''; position: absolute; right: -20px; top: -30px;
    width: 180px; height: 180px; border-radius: 50%;
    background: rgba(255,255,255,0.1);
  }
  .balance-card::after {
    content: ''; position: absolute; right: 60px; bottom: -40px;
    width: 120px; height: 120px; border-radius: 50%;
    background: rgba(255,255,255,0.08);
  }
  .balance-label { font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; opacity: 0.7; margin-bottom: 8px; }
  .balance-amount { font-size: 3rem; font-weight: 700; font-family: 'Playfair Display', serif; position: relative; z-index: 1; }
  .balance-sub { font-size: 0.88rem; opacity: 0.75; margin-top: 8px; position: relative; z-index: 1; }
  .quick-actions { display: flex; gap: 16px; margin-bottom: 36px; flex-wrap: wrap; }
  .quick-action-btn {
    flex: 1; min-width: 110px; background: var(--white);
    border: 1px solid var(--border); border-radius: 14px; padding: 18px 12px;
    text-align: center; cursor: pointer; transition: all 0.25s;
    box-shadow: 0 2px 10px rgba(10,22,40,0.06);
  }
  .quick-action-btn:hover { border-color: var(--gold); background: rgba(245,166,35,0.04); transform: translateY(-2px); }
  .quick-action-btn .qa-icon { font-size: 1.5rem; margin-bottom: 8px; display: block; }
  .quick-action-btn .qa-label { font-size: 0.82rem; font-weight: 600; color: var(--navy); }
  .dashboard-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 28px; }
  .transactions-card {
    background: var(--white); border-radius: 16px;
    padding: 28px; box-shadow: var(--card-shadow); border: 1px solid var(--border);
  }
  .transactions-card h3 { font-size: 1.1rem; font-weight: 700; color: var(--navy); margin-bottom: 20px; }
  .txn-item { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--border); }
  .txn-item:last-child { border-bottom: none; }
  .txn-left { display: flex; align-items: center; gap: 12px; }
  .txn-icon {
    width: 40px; height: 40px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center; font-size: 18px;
  }
  .txn-name { font-weight: 600; font-size: 0.9rem; color: var(--navy); }
  .txn-date { font-size: 0.78rem; color: var(--muted); }
  .txn-amount { font-weight: 700; font-size: 0.95rem; }
  .txn-amount.debit { color: #e53935; }
  .txn-amount.credit { color: #2e7d32; }
  .spending-card {
    background: var(--white); border-radius: 16px;
    padding: 28px; box-shadow: var(--card-shadow); border: 1px solid var(--border);
  }
  .spending-card h3 { font-size: 1.1rem; font-weight: 700; color: var(--navy); margin-bottom: 20px; }
  .chart-wrap { display: flex; align-items: flex-end; gap: 10px; height: 120px; padding: 0 4px; }
  .chart-bar-col { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }
  .chart-bar {
    width: 100%; border-radius: 6px 6px 0 0;
    background: linear-gradient(180deg, var(--gold), var(--gold-dark));
    transition: 0.3s; min-height: 4px;
  }
  .chart-bar-label { font-size: 0.7rem; color: var(--muted); font-weight: 500; }

  /* FOOTER */
  footer {
    background: var(--navy); color: rgba(255,255,255,0.7);
    padding: 64px 5% 28px;
  }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 52px; }
  .footer-brand h3 { font-family: 'Playfair Display', serif; color: var(--white); font-size: 1.3rem; margin-bottom: 6px; }
  .footer-brand span { color: var(--gold); }
  .footer-brand p { font-size: 0.88rem; line-height: 1.7; margin-top: 12px; max-width: 260px; }
  .footer-col h4 { color: var(--white); font-size: 0.88rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
  .footer-col ul { list-style: none; }
  .footer-col ul li { margin-bottom: 10px; }
  .footer-col ul li button {
    background: none; border: none; color: rgba(255,255,255,0.6);
    font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
    cursor: pointer; transition: color 0.2s; padding: 0; text-align: left;
  }
  .footer-col ul li button:hover { color: var(--gold); }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 24px; display: flex;
    justify-content: space-between; align-items: center; flex-wrap: gap;
  }
  .footer-bottom p { font-size: 0.82rem; }
  .footer-fdic {
    display: flex; gap: 8px; align-items: center;
    background: rgba(245,166,35,0.12); border: 1px solid rgba(245,166,35,0.25);
    color: var(--gold); font-size: 0.78rem; font-weight: 700;
    padding: 6px 14px; border-radius: 8px; letter-spacing: 0.5px;
  }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .grid-4 { grid-template-columns: repeat(2,1fr); }
    .grid-3 { grid-template-columns: repeat(2,1fr); }
    .mission-box { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; }
    .dashboard-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    .hero-card { display: none; }
  }
  @media (max-width: 640px) {
    .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .nav-links, .nav-actions { display: none; }
    .hamburger { display: flex; }
    .footer-grid { grid-template-columns: 1fr; }
    .hero { min-height: auto; padding: 60px 5%; }
    .section { padding: 56px 5%; }
    .signup-card { padding: 28px; }
    .login-card { padding: 28px; }
    .cta-banner { padding: 40px 24px; }
    .dashboard-header { flex-direction: column; gap: 12px; align-items: flex-start; }
    .quick-actions { gap: 10px; }
  }
`;

const PAGES = ["Home","About","Personal","Business","Loans","Help","Contact","Signup","Login"];

// ─── NAVBAR ───────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const nav = ["Home","About","Personal","Business","Loans","Help"];
  const go = (p) => { setPage(p); setOpen(false); window.scrollTo({top:0}); };
  return (
    <>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => go("Home")}>
          <div className="nav-logo-shield">🛡</div>
          <span className="nav-logo-text">Bassinar <span>Bank</span></span>
        </div>
        <ul className="nav-links">
          {nav.map(p => (
            <li key={p}><button className={page === p ? "active" : ""} onClick={() => go(p)}>{p === "Personal" ? "Personal" : p === "Business" ? "Business" : p}</button></li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={() => go("Login")}>Log In</button>
          <button className="btn-gold" onClick={() => go("Signup")}>Open Account</button>
        </div>
        <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {nav.map(p => <button key={p} className={page === p ? "active" : ""} onClick={() => go(p)}>{p}</button>)}
        <button onClick={() => go("Login")}>Log In</button>
        <button onClick={() => go("Signup")}>Open Account</button>
      </div>
    </>
  );
}

// ─── HOME ──────────────────────────────────────────────────────────
function Home({ setPage }) {
  const go = p => { setPage(p); window.scrollTo({top:0}); };
  const features = [
    { icon: "💸", title: "No Hidden Fees", desc: "Completely transparent pricing. No monthly fees, no overdraft surprises, no fine print. Banking the way it should be." },
    { icon: "🔒", title: "24/7 Support", desc: "Round-the-clock customer support via chat, phone, or email. Real humans available whenever you need help." },
    { icon: "⚡", title: "Instant Transfers", desc: "Move money in seconds, not days. Peer-to-peer transfers and bill payments happen in real time." },
  ];
  const benefits = [
    { icon: "🏦", title: "FDIC Insured", desc: "Deposits insured up to $250,000 per depositor by the Federal Deposit Insurance Corporation." },
    { icon: "🚫", title: "Zero Monthly Fees", desc: "Keep every dollar you earn. No maintenance fees, minimum balance requirements, or hidden charges." },
    { icon: "🔔", title: "Instant Notifications", desc: "Real-time push alerts for every transaction, login, and account update — keeping you fully in control." },
    { icon: "🌍", title: "Global Access", desc: "Use your Bassinar card anywhere in the world with no foreign transaction fees and competitive exchange rates." },
  ];
  const testimonials = [
    { stars: "★★★★★", text: "Switching to Bassinar was the best financial decision I've made this year. Zero fees and instant transfers are a game changer.", name: "Sarah M.", role: "Freelance Designer", initial: "S" },
    { stars: "★★★★★", text: "The business banking tools are incredibly powerful. Payroll, invoicing, merchant services — everything I need in one place.", name: "David K.", role: "Small Business Owner", initial: "D" },
    { stars: "★★★★★", text: "I travel a lot internationally, and the zero foreign transaction fee policy has saved me hundreds of dollars. Highly recommend!", name: "Priya L.", role: "Consultant", initial: "P" },
  ];
  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-pattern" />
        <div className="hero-content">
          <div className="hero-badge">🏆 Voted #1 Digital Bank 2024</div>
          <h1>Banking Made <span className="accent">Simple</span>, Safe & Smart</h1>
          <p>Experience banking that works for you. Open an account in minutes, manage your finances with confidence, and grow your wealth with zero fees.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => go("Signup")}>Open Free Account</button>
            <button className="btn-outline" onClick={() => window.scrollTo({top: 700, behavior:"smooth"})}>Learn More ↓</button>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-header">
            <div className="hero-card-label">Checking Account</div>
            <div className="hero-card-chip">● LIVE</div>
          </div>
          <div className="hero-card-balance">$12,483.57</div>
          <div className="hero-card-sub">↑ +$342.10 this month</div>
          <div className="hero-card-bars">
            {[40,60,45,80,55,95,70].map((h,i) => <span key={i} style={{height:`${h}%`}} className={h===95?"hi":""}/>)}
          </div>
          <hr className="hero-card-divider"/>
          <div className="hero-card-row">
            <div className="hero-card-stat"><div className="hero-card-stat-val">$8,200</div><div className="hero-card-stat-key">Savings</div></div>
            <div className="hero-card-stat"><div className="hero-card-stat-val">$0.00</div><div className="hero-card-stat-key">Fees</div></div>
            <div className="hero-card-stat"><div className="hero-card-stat-val">4.10%</div><div className="hero-card-stat-key">APY</div></div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="section section-bg" id="features">
        <p className="section-sub" style={{textAlign:"center",marginBottom:10,fontWeight:700,color:"var(--gold)",fontSize:"0.85rem",textTransform:"uppercase",letterSpacing:"1px"}}>WHY BASSINAR</p>
        <h2 className="section-title">Everything You Need,<br/>Nothing You Don't</h2>
        <div className="gold-line" style={{marginBottom:48}}/>
        <div className="grid-3">
          {features.map(f => (
            <div className="feature-card" key={f.title}>
              <div className="card-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section section-light">
        <p className="section-sub" style={{textAlign:"center",marginBottom:10,fontWeight:700,color:"var(--gold)",fontSize:"0.85rem",textTransform:"uppercase",letterSpacing:"1px"}}>BENEFITS</p>
        <h2 className="section-title">Why Choose Bassinar Bank</h2>
        <div className="gold-line" style={{marginBottom:48}}/>
        <div className="grid-4">
          {benefits.map(b => (
            <div className="card" key={b.title}>
              <div className="card-icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section-bg">
        <h2 className="section-title">Loved by Thousands</h2>
        <div className="gold-line"/>
        <p className="section-sub" style={{marginTop:16}}>Don't just take our word for it — here's what our customers have to say.</p>
        <div className="grid-3">
          {testimonials.map(t => (
            <div className="testimonial-card" key={t.name}>
              <div className="stars">{t.stars}</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="avatar">{t.initial}</div>
                <div><div className="author-name">{t.name}</div><div className="author-role">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section section-light">
        <div className="cta-banner">
          <h2>Ready to Start Banking Smarter?</h2>
          <p>Join over 500,000 members who trust Bassinar Bank with their finances. Open your free account in under 5 minutes.</p>
          <button className="btn-primary" onClick={() => go("Signup")}>Open Free Account — It's Free</button>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────
function About() {
  const team = [
    { name: "Rufai AbdulBasit", role: "Co-Founder & CEO", bio: "Former Goldman Sachs VP with 15 years in fintech. Passionate about democratizing banking for everyone.", emoji: "👨🏽‍💼" },
    { name: "Kinzza Osei", role: " CTO", bio: "Previously led engineering at Stripe. Built scalable payment infrastructure serving 50M+ users.", emoji: "👩🏾‍💻" },
    { name: "Rachel Chen", role: "Chief Risk Officer", bio: "Former FDIC examiner with deep expertise in compliance, security, and regulatory frameworks.", emoji: "👩🏻‍⚖️" },
  ];
  const values = [
    { icon: "🤝", title: "Transparency", desc: "No fine print, no hidden fees, no surprises. Everything you need to know is right in front of you." },
    { icon: "🌱", title: "Inclusivity", desc: "Banking should be accessible to everyone, regardless of income, credit history, or zip code." },
    { icon: "🔐", title: "Security", desc: "Bank-grade encryption, biometric authentication, and 24/7 fraud monitoring protect your money." },
    { icon: "🚀", title: "Innovation", desc: "We use the latest technology to deliver experiences that feel effortless, modern, and intelligent." },
  ];
  return (
    <div>
      <div className="page-header">
        <div className="breadcrumb">About Us</div>
        <h1>Banking Built on Trust</h1>
        <p>We're on a mission to make banking fair, transparent, and accessible for everyone — not just the wealthy few.</p>
      </div>
      <section className="section section-bg">
        <div className="mission-box">
          <div>
            <h2>Our Mission</h2>
            <p style={{marginBottom:16}}>Bassinar Bank was founded in 2019 with a single conviction: the traditional banking system was failing everyday people with excessive fees, opaque terms, and outdated technology.</p>
            <p>We set out to build something different — a bank that genuinely works for its customers. One that charges no hidden fees, provides real-time access to your money, and gives you the tools to build lasting financial health.</p>
          </div>
          <div className="mission-stats">
            {[["500K+","Members"],["$2.1B+","Assets Under Management"],["4.9★","App Store Rating"],["2019","Founded"]].map(([v,k]) => (
              <div className="mission-stat" key={k}><div className="mission-stat-val">{v}</div><div className="mission-stat-label">{k}</div></div>
            ))}
          </div>
        </div>

        <h2 className="section-title" style={{textAlign:"left", marginBottom:8}}>Meet the Founders</h2>
        <div className="gold-line" style={{marginLeft:0, marginBottom:36}}/>
        <div className="grid-3" style={{marginBottom:64}}>
          {team.map(m => (
            <div className="team-card" key={m.name}>
              <div className="team-avatar">{m.emoji}</div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
              <div className="team-bio">{m.bio}</div>
            </div>
          ))}
        </div>

        <h2 className="section-title" style={{marginBottom:8}}>Our Values</h2>
        <div className="gold-line" style={{marginBottom:40}}/>
        <div className="grid-4">
          {values.map(v => (
            <div className="card" key={v.title}>
              <div className="card-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── PERSONAL BANKING ──────────────────────────────────────────────
function Personal({ setPage }) {
  const items = [
    { icon: "🏦", title: "Free Checking Account", desc: "A full-featured checking account with no monthly fees, no minimum balance, and no catches. Includes a free debit card, mobile banking, and unlimited transactions." },
    { icon: "💰", title: "High-Yield Savings — 4.10% APY", desc: "Earn more on your savings with our industry-leading 4.10% Annual Percentage Yield. No maximum balance cap. Interest compounds daily and is credited monthly." },
    { icon: "💳", title: "Bassinar Debit Card", desc: "A chip-enabled Visa debit card accepted at millions of locations worldwide. Instant freeze/unfreeze from the app, real-time spending alerts, and zero foreign transaction fees." },
    { icon: "📱", title: "Mobile Check Deposits", desc: "Deposit checks from anywhere using your smartphone camera. Funds available within one business day — often the same day for verified members." },
    { icon: "🔗", title: "Zelle® Integration", desc: "Send and receive money instantly with friends, family, and businesses directly through your Bassinar app. No fees, no delays, just fast digital payments." },
    { icon: "📊", title: "Financial Insights & Budgeting", desc: "Automatic spending categorization, monthly summaries, and personalized tips help you understand where your money goes and how to make it grow." },
  ];
  return (
    <div>
      <div className="page-header">
        <div className="breadcrumb">Personal Banking</div>
        <h1>Banking That Fits Your Life</h1>
        <p>Everything you need to manage your day-to-day finances, grow your savings, and spend with confidence — fee free.</p>
      </div>
      <section className="section section-bg">
        <div style={{maxWidth:760, margin:"0 auto"}}>
          {items.map(item => (
            <div className="feature-list-item" key={item.title}>
              <div className="feature-list-icon">{item.icon}</div>
              <div className="feature-list-text"><h3>{item.title}</h3><p>{item.desc}</p></div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center", marginTop:48}}>
          <button className="btn-primary" onClick={() => { setPage("Signup"); window.scrollTo({top:0}); }}>Open Your Free Account</button>
        </div>
      </section>
    </div>
  );
}

// ─── BUSINESS BANKING ──────────────────────────────────────────────
function Business({ setPage }) {
  const items = [
    { icon: "🏢", title: "Business Checking", desc: "A robust business checking account with unlimited transactions, no monthly fees, and dedicated business debit cards for every team member." },
    { icon: "👥", title: "Payroll Management", desc: "Automate payroll for your entire team. Schedule recurring payments, handle direct deposits, and generate payroll reports — all within the Bassinar dashboard." },
    { icon: "📄", title: "Invoicing & Billing", desc: "Create, send, and track professional invoices in seconds. Accept card payments and ACH transfers. Get paid faster with one-click payment links." },
    { icon: "🛒", title: "Merchant Services", desc: "Accept in-person and online payments with Bassinar's merchant processing. Competitive rates, next-day funding, and detailed sales analytics." },
    { icon: "💼", title: "Business Savings & Money Market", desc: "Grow your business reserves with our Business Savings account offering 3.75% APY, or our Business Money Market for tiered, higher-yield options." },
    { icon: "📈", title: "Cash Flow Analytics", desc: "Real-time dashboards show income, expenses, projected runway, and cash flow trends — giving you the financial clarity to make smart business decisions." },
  ];
  return (
    <div>
      <div className="page-header">
        <div className="breadcrumb">Business Banking</div>
        <h1>Power Tools for Growing Businesses</h1>
        <p>From startups to established enterprises, Bassinar Business gives you the financial infrastructure to scale with confidence.</p>
      </div>
      <section className="section section-bg">
        <div style={{maxWidth:760, margin:"0 auto"}}>
          {items.map(item => (
            <div className="feature-list-item" key={item.title}>
              <div className="feature-list-icon">{item.icon}</div>
              <div className="feature-list-text"><h3>{item.title}</h3><p>{item.desc}</p></div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center", marginTop:48}}>
          <button className="btn-primary" onClick={() => { setPage("Signup"); window.scrollTo({top:0}); }}>Open a Business Account</button>
        </div>
      </section>
    </div>
  );
}

// ─── LOANS ────────────────────────────────────────────────────────
function Loans({ setPage }) {
  const loans = [
    {
      type: "Personal Loan", icon: "💵", title: "Personal Loan",
      rate: "6.99%", rateLabel: "APR starting at",
      details: [["Term", "12 – 60 months"],["Loan Amount","$1,000 – $50,000"],["Funding","As fast as 24 hrs"]],
      features: ["No prepayment penalty","Fixed monthly payments","No origination fee","Soft credit check to apply"],
    },
    {
      type: "Auto Loan", icon: "🚗", title: "Auto Loan",
      rate: "4.49%", rateLabel: "APR starting at",
      details: [["Term","24 – 84 months"],["Loan Amount","$5,000 – $100,000"],["Funding","3 – 5 business days"]],
      features: ["New & used vehicles","Refinancing available","No down payment required","Competitive rates nationwide"],
    },
    {
      type: "Home Mortgage", icon: "🏠", title: "Home Mortgage",
      rate: "6.15%", rateLabel: "APR 30-yr fixed",
      details: [["Term","10, 15, 20, or 30 yrs"],["Loan Amount","Up to $2.5 million"],["Down Payment","As low as 3%"]],
      features: ["FHA, VA & conventional","Pre-approval in minutes","No hidden lender fees","Local loan officers available"],
    },
  ];
  return (
    <div>
      <div className="page-header">
        <div className="breadcrumb">Loans</div>
        <h1>The Funding You Need,<br/>The Rates You Deserve</h1>
        <p>Flexible loan options with transparent rates and no surprise fees. Apply in minutes and get a decision fast.</p>
      </div>
      <section className="section section-bg">
        <div className="grid-3">
          {loans.map(l => (
            <div className="loan-card" key={l.type}>
              <div className="loan-type">{l.type}</div>
              <h3>{l.icon} {l.title}</h3>
              <div style={{fontSize:"0.78rem",color:"var(--muted)",marginBottom:6}}>{l.rateLabel}</div>
              <div className="loan-rate">{l.rate} <span>APR</span></div>
              <div className="loan-details">
                {l.details.map(([k,v]) => (
                  <div className="loan-detail-row" key={k}><span className="loan-detail-label">{k}</span><span className="loan-detail-val">{v}</span></div>
                ))}
              </div>
              <ul className="loan-features">{l.features.map(f => <li key={f}>{f}</li>)}</ul>
              <button className="btn-apply" onClick={() => { setPage("Contact"); window.scrollTo({top:0}); }}>Apply Now →</button>
            </div>
          ))}
        </div>
        <div style={{background:"var(--white)",borderRadius:"var(--radius)",padding:"36px",marginTop:40,border:"1px solid var(--border)",boxShadow:"var(--card-shadow)",textAlign:"center"}}>
          <div style={{fontSize:"1.5rem",marginBottom:12}}>📋</div>
          <h3 style={{fontSize:"1.2rem",color:"var(--navy)",marginBottom:8}}>Not sure which loan is right for you?</h3>
          <p style={{color:"var(--muted)",marginBottom:20}}>Our loan specialists are available 7 days a week to walk you through your options and help you find the best fit for your financial situation.</p>
          <button className="btn-primary" onClick={() => { setPage("Contact"); window.scrollTo({top:0}); }}>Talk to a Specialist</button>
        </div>
      </section>
    </div>
  );
}

// ─── HELP / FAQ ───────────────────────────────────────────────────
function Help() {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "How do I open a Bassinar Bank account?", a: "Opening an account takes less than 5 minutes. Click 'Open Free Account', complete our 3-step application with your personal info, address, and account preferences, then submit. You'll receive a confirmation email immediately and your debit card in 5-7 business days." },
    { q: "Are there any monthly fees or minimum balance requirements?", a: "No — none at all. Bassinar Bank charges zero monthly maintenance fees, has no minimum balance requirement, and no overdraft fees. We believe in completely transparent, fee-free banking." },
    { q: "How do I transfer money to another person or bank?", a: "You can transfer funds using Zelle® (instant, free), ACH transfers (1-3 business days), or wire transfers. All are accessible from the 'Transfer' button in your dashboard. Zelle transfers to other Zelle-enabled banks are typically instant." },
    { q: "Is my money safe at Bassinar Bank?", a: "Absolutely. Bassinar Bank is FDIC insured, meaning your deposits are protected up to $250,000 per depositor. We also use 256-bit encryption, multi-factor authentication, and real-time fraud monitoring to keep your account secure." },
    { q: "How do I replace a lost or stolen debit card?", a: "Immediately freeze your card from the app's 'Cards' section to prevent unauthorized use. Then tap 'Replace Card' to order a new one at no charge. Standard delivery takes 5-7 business days; expedited shipping is available for $10." },
    { q: "What is the daily ATM withdrawal limit?", a: "The standard daily ATM withdrawal limit is $1,000. You can request a temporary increase (up to $5,000) by contacting our support team. Bassinar reimburses up to $10 in out-of-network ATM fees per month for premium account holders." },
    { q: "How do I set up direct deposit?", a: "Go to your account dashboard, navigate to 'Account Info', and find your routing and account numbers. Provide these to your employer or benefits payer. Direct deposits typically post the same business day they're received, often before 9 AM." },
    { q: "What should I do if I see a suspicious transaction?", a: "Immediately freeze your card from the app, then contact our 24/7 fraud hotline at 1-800-BASSINAR or chat with us in-app. We'll review the transaction, reverse any fraudulent charges, and issue a new card. Zero-liability protection means you're never responsible for unauthorized charges." },
  ];
  return (
    <div>
      <div className="page-header">
        <div className="breadcrumb">Help Center</div>
        <h1>How Can We Help?</h1>
        <p>Find answers to frequently asked questions about your Bassinar Bank account, features, and services.</p>
      </div>
      <section className="section section-bg">
        <div style={{maxWidth:760, margin:"0 auto"}}>
          <h2 className="section-title" style={{textAlign:"left",marginBottom:8}}>Frequently Asked Questions</h2>
          <div className="gold-line" style={{marginLeft:0,marginBottom:32}}/>
          {faqs.map((faq, i) => (
            <div className="accordion-item" key={i}>
              <button className={`accordion-trigger ${open===i?"open":""}`} onClick={() => setOpen(open===i?null:i)}>
                <span>{faq.q}</span>
                <span className={`accordion-icon ${open===i?"open":""}`}>+</span>
              </button>
              <div className={`accordion-body ${open===i?"open":""}`}>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const set = k => e => setForm(f => ({...f, [k]: e.target.value}));
  const submit = () => { if(form.name && form.email && form.message) setSent(true); };
  return (
    <div>
      <div className="page-header">
        <div className="breadcrumb">Contact Us</div>
        <h1>Get in Touch</h1>
        <p>We're here to help. Reach out and our team will get back to you within one business day.</p>
      </div>
      <section className="section section-bg">
        <div className="contact-grid">
          <div>
            <div style={{background:"var(--white)",borderRadius:20,padding:"40px",boxShadow:"var(--card-shadow)",border:"1px solid var(--border)"}}>
              <h2 style={{fontSize:"1.5rem",marginBottom:6,color:"var(--navy)"}}>Send Us a Message</h2>
              <p style={{color:"var(--muted)",marginBottom:28,fontSize:"0.9rem"}}>Fill out the form and we'll respond within 24 hours.</p>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input className="form-control" placeholder="John Smith" value={form.name} onChange={set("name")}/>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input className="form-control" type="email" placeholder="john@email.com" value={form.email} onChange={set("email")}/>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input className="form-control" type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={set("phone")}/>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select className="form-control" value={form.subject} onChange={set("subject")}>
                    <option value="">Select a subject</option>
                    <option>Account Opening</option>
                    <option>Loans & Mortgages</option>
                    <option>Technical Support</option>
                    <option>Billing & Fees</option>
                    <option>Security & Fraud</option>
                    <option>Business Banking</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea className="form-control" rows={5} placeholder="How can we help you today?" value={form.message} onChange={set("message")}/>
              </div>
              <button className="btn-submit" onClick={submit}>Send Message →</button>
              {sent && <div className="success-msg">✅ Your message has been sent! We'll get back to you within 24 hours.</div>}
            </div>
          </div>
          <div>
            <div className="info-card"><div className="info-card-icon">📞</div><div><h4>Phone</h4><p>1-800-BASSINAR<br/>Mon–Fri: 8am–8pm ET<br/>Sat: 9am–5pm ET</p></div></div>
            <div className="info-card"><div className="info-card-icon">✉️</div><div><h4>Email</h4><p>support@bassinarbank.com<br/>loans@bassinarbank.com<br/>business@bassinarbank.com</p></div></div>
            <div className="info-card"><div className="info-card-icon">📍</div><div><h4>Headquarters</h4><p>Bassinar Financial Tower<br/>888 Financial District Ave<br/>New York, NY 10004</p></div></div>
            <div style={{background:"var(--navy)",borderRadius:"var(--radius)",padding:"24px",color:"white"}}>
              <h4 style={{color:"var(--gold)",fontSize:"0.85rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",marginBottom:14}}>Business Hours</h4>
              {[["Monday – Friday","8:00 AM – 8:00 PM ET"],["Saturday","9:00 AM – 5:00 PM ET"],["Sunday","Closed"],["24/7 Fraud Hotline","Always Available"]].map(([d,h]) => (
                <div key={d} style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:"0.88rem"}}>
                  <span style={{color:"rgba(255,255,255,0.6)"}}>{d}</span>
                  <span style={{color:"white",fontWeight:600}}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── SIGN UP ──────────────────────────────────────────────────────
function Signup() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [f, setF] = useState({ fname:"",lname:"",dob:"",email:"",phone:"",addr:"",city:"",state:"",zip:"",ssn:"",user:"",pass:"",acct:"",terms:false });
  const set = k => e => setF(p => ({...p, [k]: e.target.type==="checkbox"?e.target.checked:e.target.value }));
  const pct = step === 1 ? "33%" : step === 2 ? "66%" : "100%";
  if(done) return (
    <div className="section section-bg">
      <div className="signup-wrap">
        <div className="signup-card">
          <div className="welcome-screen">
            <div className="welcome-icon">🎉</div>
            <h2>Account Created Successfully!</h2>
            <p>You have successfully created an account with Bassinar Bank. You'll receive a confirmation email shortly. Your debit card will arrive in 5-7 business days.<br/><br/>Start managing your finances smarter today.</p>
            <button className="btn-next" style={{marginTop:28,maxWidth:260}} onClick={() => window.scrollTo({top:0})}>Go to Dashboard →</button>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <div className="page-header">
        <div className="breadcrumb">Open Account</div>
        <h1>Join Bassinar Bank</h1>
        <p>It takes less than 5 minutes to open your free account. No credit check required.</p>
      </div>
      <section className="section section-bg">
        <div className="signup-wrap">
          <div className="step-labels">
            {["Personal Info","Address & ID","Account Setup"].map((l,i) => (
              <span key={l} className={`step-label ${step === i+1 ? "active" : ""}`}>Step {i+1}: {l}</span>
            ))}
          </div>
          <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{width:pct}}/></div>
          <div className="signup-card">
            {step === 1 && <>
              <h2>Personal Information</h2>
              <p className="step-sub">Tell us a bit about yourself to get started.</p>
              <div className="form-row">
                <div className="form-group"><label>First Name</label><input className="form-control" placeholder="John" value={f.fname} onChange={set("fname")}/></div>
                <div className="form-group"><label>Last Name</label><input className="form-control" placeholder="Smith" value={f.lname} onChange={set("lname")}/></div>
              </div>
              <div className="form-group"><label>Date of Birth</label><input className="form-control" type="date" value={f.dob} onChange={set("dob")}/></div>
              <div className="form-group"><label>Email Address</label><input className="form-control" type="email" placeholder="john@email.com" value={f.email} onChange={set("email")}/></div>
              <div className="form-group"><label>Phone Number</label><input className="form-control" type="tel" placeholder="(555) 000-0000" value={f.phone} onChange={set("phone")}/></div>
              <button className="btn-next" onClick={() => setStep(2)}>Continue to Step 2 →</button>
            </>}
            {step === 2 && <>
              <h2>Address & Identification</h2>
              <p className="step-sub">We need this to verify your identity and comply with federal regulations.</p>
              <div className="form-group"><label>Street Address</label><input className="form-control" placeholder="123 Main Street" value={f.addr} onChange={set("addr")}/></div>
              <div className="form-row">
                <div className="form-group"><label>City</label><input className="form-control" placeholder="New York" value={f.city} onChange={set("city")}/></div>
                <div className="form-group"><label>State</label><input className="form-control" placeholder="NY" value={f.state} onChange={set("state")}/></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>ZIP Code</label><input className="form-control" placeholder="10001" value={f.zip} onChange={set("zip")}/></div>
                <div className="form-group"><label>SSN Last 4 Digits</label><input className="form-control" placeholder="••••" maxLength={4} value={f.ssn} onChange={set("ssn")}/></div>
              </div>
              <div className="btn-pair">
                <button className="btn-back" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-next" onClick={() => setStep(3)}>Continue to Step 3 →</button>
              </div>
            </>}
            {step === 3 && <>
              <h2>Account Setup</h2>
              <p className="step-sub">Create your login credentials and choose your account type.</p>
              <div className="form-group"><label>Username</label><input className="form-control" placeholder="johnsmith88" value={f.user} onChange={set("user")}/></div>
              <div className="form-group"><label>Password</label><input className="form-control" type="password" placeholder="Minimum 8 characters" value={f.pass} onChange={set("pass")}/></div>
              <div className="form-group"><label>Account Type</label>
                <select className="form-control" value={f.acct} onChange={set("acct")}>
                  <option value="">Select account type</option>
                  <option>Personal Checking</option>
                  <option>Personal Savings</option>
                  <option>Business Checking</option>
                  <option>Business Savings</option>
                </select>
              </div>
              <div className="checkbox-row">
                <input type="checkbox" id="terms" checked={f.terms} onChange={set("terms")}/>
                <label htmlFor="terms">I agree to the <span style={{color:"var(--gold)",fontWeight:600,cursor:"pointer"}}>Terms of Service</span>, <span style={{color:"var(--gold)",fontWeight:600,cursor:"pointer"}}>Privacy Policy</span>, and <span style={{color:"var(--gold)",fontWeight:600,cursor:"pointer"}}>Electronic Communications Agreement</span>.</label>
              </div>
              <div className="btn-pair">
                <button className="btn-back" onClick={() => setStep(2)}>← Back</button>
                <button className="btn-next" onClick={() => f.terms && setDone(true)}>Create My Account 🎉</button>
              </div>
            </>}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── LOGIN / DASHBOARD ────────────────────────────────────────────
function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const txns = [
    { icon:"🛒", bg:"#fff3e0", name:"Amazon Purchase", date:"May 24, 2026", amt:"-$47.99", type:"debit" },
    { icon:"💼", bg:"#e8f5e9", name:"Direct Deposit", date:"May 22, 2026", amt:"+$3,200.00", type:"credit" },
    { icon:"🍔", bg:"#fce4ec", name:"Shake Shack", date:"May 21, 2026", amt:"-$18.50", type:"debit" },
    { icon:"💡", bg:"#e3f2fd", name:"Con Edison (Electric)", date:"May 19, 2026", amt:"-$124.00", type:"debit" },
    { icon:"🏡", bg:"#f3e5f5", name:"Zelle from Marcus T.", date:"May 15, 2026", amt:"+$500.00", type:"credit" },
  ];
  const spendData = [
    {label:"Jan",h:45},{label:"Feb",h:60},{label:"Mar",h:40},{label:"Apr",h:80},{label:"May",h:65},{label:"Jun",h:90},
  ];

  if(loggedIn) return (
    <div>
      <div className="dashboard-header">
        <div>
          <h2>Good morning, Alex 👋</h2>
          <p>Welcome back — here's your financial overview for today, May 26, 2026</p>
        </div>
        <button className="btn-ghost" onClick={() => setLoggedIn(false)}>Sign Out</button>
      </div>
      <div className="dashboard-body">
        <div className="balance-card">
          <div className="balance-label">Total Balance</div>
          <div className="balance-amount">$12,483.57</div>
          <div className="balance-sub">Bassinar Checking •••• 4891 &nbsp;|&nbsp; ↑ +$342.10 this month</div>
        </div>
        <div className="quick-actions">
          {[["💸","Transfer"],["📄","Pay Bills"],["📲","Deposit"],["💳","Cards"]].map(([icon,label]) => (
            <div className="quick-action-btn" key={label}>
              <span className="qa-icon">{icon}</span>
              <div className="qa-label">{label}</div>
            </div>
          ))}
        </div>
        <div className="dashboard-grid">
          <div className="transactions-card">
            <h3>Recent Transactions</h3>
            {txns.map((t,i) => (
              <div className="txn-item" key={i}>
                <div className="txn-left">
                  <div className="txn-icon" style={{background:t.bg}}>{t.icon}</div>
                  <div><div className="txn-name">{t.name}</div><div className="txn-date">{t.date}</div></div>
                </div>
                <div className={`txn-amount ${t.type}`}>{t.amt}</div>
              </div>
            ))}
          </div>
          <div className="spending-card">
            <h3>Monthly Spending</h3>
            <div className="chart-wrap">
              {spendData.map(d => (
                <div className="chart-bar-col" key={d.label}>
                  <div className="chart-bar" style={{height:`${d.h}%`}}/>
                  <span className="chart-bar-label">{d.label}</span>
                </div>
              ))}
            </div>
            <div style={{marginTop:20,padding:"16px",background:"var(--bg)",borderRadius:10}}>
              {[["Food & Dining","$284"],["Shopping","$156"],["Utilities","$312"],["Transport","$89"]].map(([cat,amt]) => (
                <div key={cat} style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:"0.85rem"}}>
                  <span style={{color:"var(--muted)"}}>{cat}</span>
                  <span style={{fontWeight:600,color:"var(--navy)"}}>{amt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <div className="breadcrumb">Secure Login</div>
        <h1>Sign In to Your Account</h1>
        <p>Access your Bassinar Bank account securely.</p>
      </div>
      <section className="section section-bg">
        <div className="login-wrap">
          <div className="login-card">
            <div className="login-logo">
              <div className="nav-logo-shield">🛡</div>
              <h2>Welcome Back</h2>
              <p className="login-sub">Sign in to your Bassinar Bank account</p>
            </div>
            <div className="form-group"><label>Email Address</label><input className="form-control" type="email" placeholder="john@email.com" value={email} onChange={e => setEmail(e.target.value)}/></div>
            <div className="form-group">
              <div className="form-row-between">
                <label style={{margin:0}}>Password</label>
                <span className="forgot-link">Forgot Password?</span>
              </div>
              <input className="form-control" type="password" placeholder="Enter your password" value={pass} onChange={e => setPass(e.target.value)} style={{marginTop:7}}/>
            </div>
            <button className="btn-submit" onClick={() => setLoggedIn(true)}>Sign In →</button>
            <p style={{textAlign:"center",marginTop:20,color:"var(--muted)",fontSize:"0.88rem"}}>Don't have an account? <span style={{color:"var(--gold)",fontWeight:600,cursor:"pointer"}} onClick={() => { setPage("Signup"); window.scrollTo({top:0}); }}>Open one free →</span></p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────
function Footer({ setPage }) {
  const go = p => { setPage(p); window.scrollTo({top:0}); };
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
            <h3>Bassinar <span>Bank</span></h3>
          <p>A modern digital bank built on transparency, security, and innovation. Banking made simple, safe, and smart for everyone.</p>
          <div style={{marginTop:18,display:"flex",gap:10}}>
            {["📘","🐦","📸","💼"].map((s,i) => (
              <div key={i} style={{width:36,height:36,borderRadius:10,background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer"}}>{s}</div>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>About</h4>
          <ul>
            <li><button onClick={() => go("About")}>Our Story</button></li>
            <li><button onClick={() => go("About")}>Leadership Team</button></li>
            <li><button onClick={() => go("About")}>Our Values</button></li>
            <li><button onClick={() => go("About")}>Press & Media</button></li>
            <li><button onClick={() => go("About")}>Careers</button></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Personal Banking</h4>
          <ul>
            <li><button onClick={() => go("Personal")}>Checking Account</button></li>
            <li><button onClick={() => go("Personal")}>Savings Account</button></li>
            <li><button onClick={() => go("Personal")}>Debit Card</button></li>
            <li><button onClick={() => go("Loans")}>Personal Loans</button></li>
            <li><button onClick={() => go("Loans")}>Home Mortgage</button></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><button onClick={() => go("Contact")}>Contact Us</button></li>
            <li><button onClick={() => go("Help")}>Help Center</button></li>
            <li><button onClick={() => go("Business")}>Business Banking</button></li>
            <li><button onClick={() => go("Signup")}>Open Account</button></li>
            <li><button onClick={() => go("Login")}>Sign In</button></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Bassinar Bank. All rights reserved. | <span style={{opacity:0.6}}>Privacy Policy · Terms of Service · FDIC Notice</span></p>
        <div className="footer-fdic">🏛 FDIC Insured · Member FDIC</div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");

  const navigate = (p) => { setPage(p); window.scrollTo({top:0}); };

  const renderPage = () => {
    switch(page) {
      case "Home":     return <Home setPage={navigate}/>;
      case "About":    return <About/>;
      case "Personal": return <Personal setPage={navigate}/>;
      case "Business": return <Business setPage={navigate}/>;
      case "Loans":    return <Loans setPage={navigate}/>;
      case "Help":     return <Help/>;
      case "Contact":  return <Contact/>;
      case "Signup":   return <Signup/>;
      case "Login":    return <Login setPage={navigate}/>;
      default:         return <Home setPage={navigate}/>;
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <Navbar page={page} setPage={navigate}/>
      <main>{renderPage()}</main>
      <Footer setPage={navigate}/>
    </>
  );
}