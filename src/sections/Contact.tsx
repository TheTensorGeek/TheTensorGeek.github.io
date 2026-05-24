import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/TheTensorGeek' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Google Scholar', href: 'https://scholar.google.com' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    gsap.set(left, { opacity: 0, x: -30 });
    gsap.set(right, { opacity: 0, x: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    tl.to(left, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
      .to(right, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.65');

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="contact"
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
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 64,
          alignItems: 'start',
        }}
        className="md:!grid-cols-2"
      >
        {/* Left column */}
        <div ref={leftRef}>
          <div
            className="label-style"
            style={{ color: '#a1a1aa', marginBottom: 20 }}
          >
            CONTACT
          </div>

          <h2
            className="section-heading"
            style={{ marginBottom: 24 }}
          >
            Get in Touch
          </h2>

          <p
            className="body-text"
            style={{ color: '#a1a1aa', marginBottom: 32 }}
          >
            I'm always open to research collaborations, discussions on embodied AI, and opportunities to push the boundaries of robotic intelligence.
          </p>

          <div style={{ marginBottom: 16 }}>
            <a
              href="mailto:abdul.wahid@plaksha.edu.in"
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 14,
                color: '#2563eb',
                textDecoration: 'none',
                transition: 'text-decoration 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              abdul.wahid@plaksha.edu.in
            </a>
          </div>

          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 13,
              color: '#71717a',
            }}
          >
            +91 81788 95653
          </div>
        </div>

        {/* Right column */}
        <div ref={rightRef}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 16,
                  fontWeight: 300,
                  color: '#a1a1aa',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fafafa';
                  const arrow = e.currentTarget.querySelector('.arrow-icon') as HTMLElement;
                  if (arrow) arrow.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#a1a1aa';
                  const arrow = e.currentTarget.querySelector('.arrow-icon') as HTMLElement;
                  if (arrow) arrow.style.transform = 'translateX(0)';
                }}
              >
                <span>{link.label}</span>
                <span
                  className="arrow-icon"
                  style={{
                    color: '#71717a',
                    transition: 'transform 0.3s ease',
                    display: 'inline-block',
                  }}
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
