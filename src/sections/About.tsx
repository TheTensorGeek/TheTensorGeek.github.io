import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = elementsRef.current.filter(Boolean);

    gsap.set(items, { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    });

    tl.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
    });

    return () => { tl.kill(); };
  }, []);

  const addRef = (el: HTMLDivElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section
      id="about"
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
        className="md:!grid-cols-[55%_45%]"
      >
        {/* Left: text content */}
        <div>
          <div
            ref={addRef}
            className="label-style"
            style={{ color: '#a1a1aa', marginBottom: 20 }}
          >
            ABOUT
          </div>

          <h2
            ref={addRef}
            className="section-heading"
            style={{ marginBottom: 32 }}
          >
            Building the Intelligence for Embodied AI
          </h2>

          <p
            ref={addRef}
            className="body-text"
            style={{ color: '#a1a1aa', marginBottom: 20 }}
          >
            As a Senior Researcher at the Robotics Lab at Plaksha University, I operate at the intersection of Vision-Language Models and Embodied AI. My mission is to bridge the gap between abstract reasoning and physical interaction by developing foundational world models.
          </p>

          <p
            ref={addRef}
            className="body-text"
            style={{ color: '#a1a1aa', marginBottom: 40 }}
          >
            My research is driven by a fundamental question: how can we empower robots with the same intuitive understanding of the physical world that humans possess? I focus on learning latent representations and enhancing reward modeling using LLMs and VLMs.
          </p>

          {/* Metrics */}
          <div
            ref={addRef}
            style={{
              display: 'flex',
              gap: 0,
              alignItems: 'center',
            }}
          >
            {[
              { value: '4+', label: 'Years Research' },
              { value: 'MS', label: 'IIT Madras' },
              { value: '4', label: 'Publications 2026' },
            ].map((metric, i) => (
              <div key={metric.label} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ padding: '0 24px', textAlign: 'center' }}>
                  <div
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: 28,
                      fontWeight: 400,
                      color: '#fafafa',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {metric.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Geist', sans-serif",
                      fontSize: 12,
                      fontWeight: 300,
                      color: '#71717a',
                      marginTop: 4,
                    }}
                  >
                    {metric.label}
                  </div>
                </div>
                {i < 2 && (
                  <div
                    style={{
                      width: 1,
                      height: 40,
                      background: 'rgba(255, 255, 255, 0.08)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: portrait */}
        <div ref={addRef} style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '100%',
              maxWidth: 400,
              aspectRatio: '3/4',
              borderRadius: 8,
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <img
              src="/portrait.jpg"
              alt="Abdul Wahid portrait"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
