import React, { useEffect, useRef, useState } from 'react';

const DURATION = 4000;

const SLIDES = [
  {
    eyebrow: "Bureau d'Études — Bordj Badji Mokhtar, Algérie",
    line1: 'نصمم',
    line1Bold: false,
    line2: 'المستقبل',
    line2Bold: true,
    body: 'Architecture · Ingénierie · Urbanisme',
  },
  {
    eyebrow: 'Conception & Design',
    line1: 'هندسة',
    line1Bold: false,
    line2: 'بلا حدود',
    line2Bold: true,
    body: 'من الفكرة إلى الواقع — معايير دولية',
  },
  {
    eyebrow: 'Nos Réalisations',
    stats: [
      { num: 80, label: 'مشروع منجز' },
      { num: 15,  label: 'سنوات خبرة' },
      { num: 75, label: 'عميل راضٍ' },
    ],
    body: 'Excellence & Précision dans chaque projet',
  },
  {
    eyebrow: 'Ce que nous faisons',
    line1: 'خدماتنا',
    line1Bold: false,
    services: [
      { num: '01', name: 'تصميم معماري' },
      { num: '02', name: 'دراسات هندسية' },
      { num: '03', name: 'متابعة المشاريع' },
    ],
  },
  {
    logo: true,
    contact: '+213 674 546 663 · bbmtirage@gmail.com',
  },
];

function useAnimatedCount(target, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    let v = 0;
    const step = target / 50;
    const iv = setInterval(() => {
      v = Math.min(v + step, target);
      setVal(Math.floor(v));
      if (v >= target) clearInterval(iv);
    }, 28);
    return () => clearInterval(iv);
  }, [active, target]);
  return val;
}

function StatItem({ num, label, active }) {
  const val = useAnimatedCount(num, active);
  return (
    <div className="pr-stat-item">
      <div className="pr-stat-n">{val}+</div>
      <div className="pr-stat-u">{label}</div>
    </div>
  );
}

export default function PromoReel() {
  const canvasRef = useRef(null);
  const rafBgRef = useRef(null);
  const rafTimerRef = useRef(null);
  const startRef = useRef(0);
  const [cur, setCur] = useState(0);
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(false);

  // Canvas animated background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, lines = [], dotsPts = [];

    function init() {
      const el = canvas.parentElement;
      W = canvas.width = el.offsetWidth;
      H = canvas.height = el.offsetHeight;
      lines = [];
      const cols = 18, rows = 10;
      for (let i = 0; i <= cols; i++)
        lines.push({ x: i / cols, v: true, ph: Math.random() * Math.PI * 2, sp: 0.0003 + Math.random() * 0.0004 });
      for (let i = 0; i <= rows; i++)
        lines.push({ y: i / rows, v: false, ph: Math.random() * Math.PI * 2, sp: 0.0002 + Math.random() * 0.0003 });
      dotsPts = Array.from({ length: 28 }, () => ({
        x: Math.random(), y: Math.random(),
        r: 0.5 + Math.random(),
        ph: Math.random() * Math.PI * 2,
        sp: 0.001 + Math.random() * 0.002,
      }));
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, W, H);
      lines.forEach(l => {
        const a = 0.04 + 0.04 * Math.sin(t * l.sp + l.ph);
        ctx.strokeStyle = `rgba(194,160,82,${a})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        if (l.v) { ctx.moveTo(l.x * W, 0); ctx.lineTo(l.x * W, H); }
        else { ctx.moveTo(0, l.y * H); ctx.lineTo(W, l.y * H); }
        ctx.stroke();
      });
      dotsPts.forEach(d => {
        const a = 0.15 + 0.2 * Math.sin(t * d.sp + d.ph);
        ctx.fillStyle = `rgba(194,160,82,${a})`;
        ctx.beginPath();
        ctx.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      [0.7, 0.47, 0.23].forEach((ratio, i) => {
        const r = Math.max(W, H) * ratio;
        const a = 0.015 + 0.01 * Math.sin(t * 0.0005 + i);
        ctx.strokeStyle = `rgba(194,160,82,${a})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(W * 0.5, H * 0.5, r, 0, Math.PI * 2);
        ctx.stroke();
      });
      rafBgRef.current = requestAnimationFrame(draw);
    }

    init();
    rafBgRef.current = requestAnimationFrame(draw);
    const ro = new ResizeObserver(init);
    ro.observe(canvas.parentElement);
    return () => {
      cancelAnimationFrame(rafBgRef.current);
      ro.disconnect();
    };
  }, []);

  // Slide timer
  useEffect(() => {
    startRef.current = 0;
    function tick(ts) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min((elapsed / DURATION) * 100, 100);
      setPct(p);
      if (elapsed < DURATION) {
        rafTimerRef.current = requestAnimationFrame(tick);
      } else {
        setCur(c => (c + 1) % SLIDES.length);
      }
    }
    rafTimerRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafTimerRef.current);
  }, [cur]);

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const advance = () => {
    cancelAnimationFrame(rafTimerRef.current);
    setPct(0);
    setCur(c => (c + 1) % SLIDES.length);
  };

  const slide = SLIDES[cur];

  return (
    <div
      className={`pr-reel${visible ? ' pr-visible' : ''}`}
      onClick={advance}
      role="region"
      aria-label="فيديو ترويجي BBM Architects"
    >
      <canvas ref={canvasRef} className="pr-canvas" />

      {/* Frame */}
      <div className="pr-frame">
        <div className="pr-fl pr-fl-t" /><div className="pr-fl pr-fl-b" />
        <div className="pr-fl pr-fl-l" /><div className="pr-fl pr-fl-r" />
        {['tl','tr','bl','br'].map(p => <div key={p} className={`pr-cm pr-cm-${p}`} />)}
      </div>

      {/* Slide number */}
      <div className="pr-slnum">
        {String(cur + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
      </div>

      {/* Content */}
      <div className="pr-content" key={cur}>
        {slide.logo ? (
          <div className="pr-logo-final">
            <div className="pr-lf-bbm"><span>B</span>BM</div>
            <div className="pr-lf-sub">Architects &amp; Engineers</div>
            <div className="pr-cta-line">
              <div className="pr-cta-div" />
              <div className="pr-cta-txt">{slide.contact}</div>
              <div className="pr-cta-div" />
            </div>
          </div>
        ) : slide.stats ? (
          <>
            <div className="pr-eyebrow">{slide.eyebrow}</div>
            <div className="pr-stat-grid">
              {slide.stats.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <div className="pr-stat-sep" />}
                  <StatItem num={s.num} label={s.label} active={cur === 2} />
                </React.Fragment>
              ))}
            </div>
            <div className="pr-rule" />
            <div className="pr-body">{slide.body}</div>
          </>
        ) : slide.services ? (
          <>
            <div className="pr-eyebrow">{slide.eyebrow}</div>
            <div className="pr-h1">
              <span className="pr-reveal">
                <span className="pr-reveal-inner">{slide.line1}</span>
              </span>
            </div>
            <div className="pr-rule" />
            <div className="pr-srv-row">
              {slide.services.map(s => (
                <div className="pr-srv" key={s.num}>
                  <div className="pr-srv-num">{s.num}</div>
                  <div className="pr-srv-name">{s.name}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="pr-eyebrow">{slide.eyebrow}</div>
            <div className="pr-h1">
              <span className="pr-reveal">
                <span className="pr-reveal-inner" style={{ transitionDelay: '0.1s' }}>
                  {slide.line1Bold ? <strong>{slide.line1}</strong> : slide.line1}
                </span>
              </span>
              {slide.line2 && (
                <span className="pr-reveal">
                  <span className="pr-reveal-inner" style={{ transitionDelay: '0.28s' }}>
                    {slide.line2Bold ? <strong>{slide.line2}</strong> : slide.line2}
                  </span>
                </span>
              )}
            </div>
            <div className="pr-rule" />
            {slide.body && <div className="pr-body">{slide.body}</div>}
          </>
        )}
      </div>

      {/* Ticker */}
      <div className="pr-ticker">
        <div className="pr-ticker-inner">
          {['Architecture','·','Ingénierie','·','Urbanisme','·','BBM Architects','·','Béchar · Algérie','·',
            'Architecture','·','Ingénierie','·','Urbanisme','·','BBM Architects','·','Béchar · Algérie','·'].map((t, i) => (
            <span className="pr-tick-item" key={i}>{t}</span>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="pr-pbar" style={{ width: `${pct}%` }} />

      {/* Dots */}
      <div className="pr-dots">
        {SLIDES.map((_, i) => (
          <div key={i} className={`pr-dot${i === cur ? ' pr-dot-on' : ''}`} />
        ))}
      </div>
    </div>
  );
}
