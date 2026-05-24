import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    date: 'Nov 2025 — Present',
    role: 'Senior Research Associate',
    org: 'Robotics Lab, Plaksha University',
    active: true,
  },
  {
    date: 'June 2024 — Oct 2025',
    role: 'Control System Engineer',
    org: 'Svaya Robotics',
    active: false,
  },
  {
    date: 'Jan 2022 — May 2024',
    role: 'Research Associate',
    org: 'Healthcare Technology Innovation Centre, IIT-M',
    active: false,
  },
  {
    date: '2021 — 2022',
    role: 'Research Intern',
    org: 'Stryker — Machine Vision for Image Guided Surgery',
    active: false,
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const items = itemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    gsap.set(items, { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    tl.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="experience"
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
          EXPERIENCE
        </div>

        <h2
          className="section-heading"
          style={{ marginBottom: 64 }}
        >
          Professional Experience
        </h2>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 24 }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 1,
              background: 'rgba(255, 255, 255, 0.08)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {EXPERIENCE.map((exp, index) => (
              <div
                key={exp.role + exp.date}
                ref={(el) => { if (el) itemsRef.current[index] = el; }}
                style={{
                  position: 'relative',
                  willChange: 'transform, opacity',
                }}
              >
                {/* Dot on timeline */}
                <div
                  style={{
                    position: 'absolute',
                    left: -28,
                    top: 4,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: exp.active ? '#2563eb' : '#3f3f46',
                    border: '2px solid #09090b',
                  }}
                />

                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 12,
                    color: '#71717a',
                    marginBottom: 8,
                  }}
                >
                  {exp.date}
                </div>

                <div
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: 18,
                    fontWeight: 400,
                    color: '#fafafa',
                    marginBottom: 4,
                  }}
                >
                  {exp.role}
                </div>

                <div
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: 14,
                    fontWeight: 300,
                    color: '#a1a1aa',
                  }}
                >
                  {exp.org}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
