import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PUBLICATIONS = [
  {
    title: 'Shadows Of Doubts: Benchmarking the shadow based spatial reasoning in the VLMs',
    venue: 'ICLR Workshop 2026',
  },
  {
    title: 'Recursive Oversight Decomposition: Domain-Specific Validation in Post-AGI Science',
    venue: 'P-AGI ICLR Workshop 2026',
  },
  {
    title: 'LOST IN MOTION AND VIEWPOINT: SPATIO-TEMPORAL failures in VLMs',
    venue: 'ICLR Workshop 2026',
  },
  {
    title: 'Machine Vision based Semi-Automated Patient Registration method in a Stereo Camera Setup',
    venue: 'ICASSP 2026',
  },
];

export default function Publications() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    gsap.set(items, { opacity: 0, x: -40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    tl.to(items, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="publications"
      ref={sectionRef}
      style={{
        background: '#09090b',
        padding: '140px 0',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px)',
        }}
      >
        <div
          className="label-style"
          style={{ color: '#a1a1aa', marginBottom: 20 }}
        >
          PUBLICATIONS
        </div>

        <h2
          className="section-heading"
          style={{ marginBottom: 48 }}
        >
          Selected Publications
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {PUBLICATIONS.map((pub, index) => (
            <div
              key={pub.title}
              ref={(el) => { if (el) itemsRef.current[index] = el; }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: 8,
                padding: '28px 32px',
                transition: 'border-color 0.3s ease, background 0.3s ease',
                cursor: 'default',
                willChange: 'transform, opacity',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.3)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 17,
                  fontWeight: 400,
                  color: '#fafafa',
                  lineHeight: 1.5,
                  marginBottom: 8,
                }}
              >
                {pub.title}
              </p>
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 11,
                  color: '#2563eb',
                  background: 'rgba(37, 99, 235, 0.15)',
                  padding: '4px 12px',
                  borderRadius: 4,
                }}
              >
                {pub.venue}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
