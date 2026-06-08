import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import i18n from './i18n';
import emailjs from '@emailjs/browser';
import PromoReel from './PromoReel';
import './PromoReel.css';

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const ArrowLong = () => (
  <svg width="20" height="8" viewBox="0 0 20 8" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M0 4h18M14 1l4 3-4 3"/>
  </svg>
);
const IconHome = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconBuilding = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);
const IconLayers = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);
const IconFile = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IconClock = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8v4l3 3"/>
  </svg>
);
const IconBox = () => (
  <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
);
const IconMapPin = () => (
  <svg className="contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconPhone = () => (
  <svg className="contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconMail = () => (
  <svg className="contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

// ── Reveal Hook ────────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLangState] = useState('fr');
  const [scrolled, setScrolled] = useState(false);
  const [loaderHide, setLoaderHide] = useState(false);
  const t = i18n[lang];

  useReveal();

  useEffect(() => {
    const timer = setTimeout(() => setLoaderHide(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = t.lang;
    document.documentElement.dir = t.dir;
    document.body.classList.toggle('rtl', t.dir === 'rtl');
  }, [lang, t]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', service: '', message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await emailjs.send(
        'service_c599t66',
        'template_ajs7p59',
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          message: formData.message
        },
        'eRvVoEG9c2PRh3REL'
      );
      alert('تم إرسال الرسالة بنجاح');
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert(JSON.stringify(error));
    }
  };

  const services = [
    { num: '01', icon: <IconHome />, titleKey: 's1Title', descKey: 's1Desc' },
    { num: '02', icon: <IconBuilding />, titleKey: 's2Title', descKey: 's2Desc' },
    { num: '03', icon: <IconLayers />, titleKey: 's3Title', descKey: 's3Desc' },
    { num: '04', icon: <IconFile />, titleKey: 's4Title', descKey: 's4Desc' },
    { num: '05', icon: <IconClock />, titleKey: 's5Title', descKey: 's5Desc' },
    { num: '06', icon: <IconBox />, titleKey: 's6Title', descKey: 's6Desc' },
  ];

  const projects = [
    { bgClass: 'proj-bg-1', catKey: 'p1Cat', nameKey: 'p1Name' },
    { bgClass: 'proj-bg-2', catKey: 'p2Cat', nameKey: 'p2Name' },
    { bgClass: 'proj-bg-3', catKey: 'p3Cat', nameKey: 'p3Name' },
    { bgClass: 'proj-bg-4', catKey: 'p4Cat', nameKey: 'p4Name' },
    { bgClass: 'proj-bg-5', catKey: 'p5Cat', nameKey: 'p5Name' },
  ];

  const steps = [
    { num: '01', titleKey: 'step1Title', descKey: 'step1Desc', arrow: true },
    { num: '02', titleKey: 'step2Title', descKey: 'step2Desc', arrow: true },
    { num: '03', titleKey: 'step3Title', descKey: 'step3Desc', arrow: true },
    { num: '04', titleKey: 'step4Title', descKey: 'step4Desc', arrow: false },
  ];

  return (
    <>
      {/* LOADER */}
      <div className={`loader ${loaderHide ? 'hide' : ''}`}>
        <div className="loader-line"></div>
        <div className="loader-text">{t.loader}</div>
      </div>

      {/* NAV */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#hero" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo('hero'); }}>
          ARXIA Architects
          <span>{t.navSub}</span>
        </a>
        <ul className="nav-links">
          {[['about', t.navAbout], ['services', t.navServices], ['projects', t.navProjects], ['contact', t.navContact]].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="lang-switch">
          {['fr', 'ar', 'en'].map(l => (
            <button key={l} className={`lang-btn ${lang === l ? 'active' : ''}`} onClick={() => setLangState(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-tag">{t.heroTag}</div>
          <h1>
            {t.heroH1}<br />
            {t.heroH1Mid} <em>{t.heroH1Em}</em>
          </h1>
          <p className="hero-sub">{t.heroSub}</p>
          <button className="hero-cta" onClick={() => scrollTo('contact')}>
            <span>{t.heroCta}</span>
            <ArrowRight />
          </button>
        </div>
        <div className="scroll-ind">{t.scrollInd}</div>
      </section>

      {/* PROMO REEL — directly after hero */}
      <div className="promo-reel-section reveal">
        <PromoReel />
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="about-visual reveal">
          <svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="100" width="200" height="300" stroke="#D4B896" strokeWidth="0.5" fill="none"/>
            <rect x="60" y="80" width="160" height="30" stroke="#D4B896" strokeWidth="0.5" fill="none"/>
            <line x1="40" y1="200" x2="240" y2="200" stroke="#D4B896" strokeWidth="0.5"/>
            <line x1="40" y1="300" x2="240" y2="300" stroke="#D4B896" strokeWidth="0.5"/>
            <rect x="80" y="340" width="40" height="60" stroke="#C4883A" strokeWidth="0.5" fill="none"/>
            <rect x="140" y="340" width="40" height="60" stroke="#C4883A" strokeWidth="0.5" fill="none"/>
            <line x1="140" y1="100" x2="140" y2="400" stroke="#D4B896" strokeWidth="0.5" opacity="0.5"/>
            <circle cx="300" cy="150" r="60" stroke="#D4B896" strokeWidth="0.5" fill="none"/>
            <circle cx="300" cy="150" r="40" stroke="#D4B896" strokeWidth="0.3" fill="none"/>
            <line x1="260" y1="150" x2="340" y2="150" stroke="#C4883A" strokeWidth="0.5"/>
            <line x1="300" y1="110" x2="300" y2="190" stroke="#C4883A" strokeWidth="0.5"/>
            <rect x="260" y="250" width="80" height="100" stroke="#D4B896" strokeWidth="0.5" fill="none"/>
            <line x1="260" y1="290" x2="340" y2="290" stroke="#D4B896" strokeWidth="0.3"/>
            <polygon points="300,500 260,560 340,560" stroke="#D4B896" strokeWidth="0.5" fill="none"/>
          </svg>
        </div>
        <div className="about-text reveal">
          <div className="section-label">{t.aboutLabel}</div>
          <h2>{t.aboutH2a} <em>{t.aboutH2em}</em> {t.aboutH2b}</h2>
          <p>{t.aboutP1}</p>
          <p>{t.aboutP2}</p>
          <div className="stats">
            <div className="stat"><div className="stat-num">15+</div><div className="stat-label">{t.stat1}</div></div>
            <div className="stat"><div className="stat-num">80+</div><div className="stat-label">{t.stat2}</div></div>
            <div className="stat"><div className="stat-num">69</div><div className="stat-label">{t.stat3}</div></div>
            <div className="stat"><div className="stat-num">12</div><div className="stat-label">{t.stat4}</div></div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="services-header reveal">
          <div>
            <div className="section-label">{t.servLabel}</div>
            <h2>{t.servH2a} <em>{t.servH2em}</em></h2>
          </div>
          <p className="services-intro">{t.servIntro}</p>
        </div>
        <div className="services-grid reveal">
          {services.map(s => (
            <div className="service-card" key={s.num}>
              <span className="service-num">{s.num}</span>
              {s.icon}
              <div className="service-title">{t[s.titleKey]}</div>
              <p className="service-desc">{t[s.descKey]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="projects-header reveal">
          <div>
            <div className="section-label">{t.projLabel}</div>
            <h2>{t.projH2a} <em>{t.projH2em}</em> {t.projH2b}</h2>
          </div>
          <button className="view-all" onClick={() => scrollTo('contact')}>
            <span>{t.viewAll}</span>
            <ArrowLong />
          </button>
        </div>
        <div className="projects-grid reveal">
          {projects.map((p, i) => (
            <div className="proj" key={i}>
              <div className={`proj-bg ${p.bgClass}`}></div>
              <div className="proj-pattern"></div>
              <div className="proj-overlay"></div>
              <div className="proj-info">
                <div className="proj-cat">{t[p.catKey]}</div>
                <div className="proj-name">{t[p.nameKey]}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process">
        <div className="reveal">
          <div className="section-label">{t.procLabel}</div>
          <h2>{t.procH2a} <em>{t.procH2em}</em> {t.procH2b}</h2>
        </div>
        <div className="process-grid reveal">
          {steps.map(s => (
            <div className="step" key={s.num}>
              <div className="step-num">{s.num}</div>
              <div className="step-title">{t[s.titleKey]}</div>
              <p className="step-desc">{t[s.descKey]}</p>
              {s.arrow && <div className="step-arrow">›</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-form reveal">
          <div className="form-row">
            <div className="field">
              <label>{t.flName}</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t.fiNamePh} />
            </div>
            <div className="field">
              <label>{t.flPhone}</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t.fiPhonePh} />
            </div>
          </div>
          <div className="field">
            <label>{t.flEmail}</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t.fiEmailPh} />
          </div>
          <div className="field">
            <label>{t.flService}</label>
            <select name="service" value={formData.service} onChange={handleChange}>
              <option value="" disabled>{t.fioDef}</option>
              <option value={t.fioRes}>{t.fioRes}</option>
              <option value={t.fioPub}>{t.fioPub}</option>
              <option value={t.fioCom}>{t.fioCom}</option>
              <option value={t.fioUrb}>{t.fioUrb}</option>
              <option value={t.fioOther}>{t.fioOther}</option>
            </select>
          </div>
          <div className="field">
            <label>{t.flMsg}</label>
            <textarea rows="5" name="message" value={formData.message} onChange={handleChange} placeholder={t.fiMsgPh}></textarea>
          </div>
          <button type="button" className="submit-btn" onClick={handleSubmit}>
            <span>{t.submitText}</span>
            <ArrowLong />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">ARXIA Architects</div>
        <div className="footer-copy">{t.footerCopy}</div>
        <div className="footer-links">
          {[['about', t.flAbout], ['services', t.flServices], ['projects', t.flProjs], ['contact', t.flContact]].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>{label}</a>
          ))}
        </div>
      </footer>
    </>
  );
}