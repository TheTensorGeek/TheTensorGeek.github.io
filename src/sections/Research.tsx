import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RESEARCH_AREAS = [
  {
    title: 'Robust Terrain Adaptation for Quadrupeds',
    description: "Scaling UC Berkeley's Robust Motor Adaptation (RMA) to enable agile locomotion across diverse and challenging terrains via proprioceptive feedback.",
    color: '#2563eb',
  },
  {
    title: 'VLA for Semantic Navigation',
    description: 'Developing Vision-Language-Action policies using VLMs as high-level planners to bridge long-horizon reasoning with low-level robotic control.',
    color: '#06b6d4',
  },
  {
    title: 'Causal JEPA for World Models',
    description: 'Building over Joint-Embedding Predictive Architecture to incorporate causal constraints, enhancing spatial intelligence of world models.',
    color: '#ec4899',
  },
  {
    title: 'Reward Shaping via LLMs/VLMs',
    description: 'Leveraging foundation models to automate complex reward modeling in Reinforcement Learning for embodied agents.',
    color: '#2563eb',
  },
];

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sliceRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const slices = sliceRefs.current.filter(Boolean);
    const content = contentRef.current;
    if (!section || slices.length === 0 || !content) return;

    // Set initial clip state
    gsap.set(slices, { clipPath: 'inset(0 50% 0 50%)' });
    gsap.set(content, { opacity: 0 });

    // Animate slices opening
    const sliceTl = gsap.to(slices, {
      clipPath: 'inset(0 0% 0 0%)',
      ease: 'none',
      stagger: 0.1,
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      },
    });

    // Fade in content
    const contentTl = gsap.to(content, {
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      sliceTl.kill();
      contentTl.kill();
    };
  }, []);

  const addSliceRef = (el: HTMLDivElement | null, index: number) => {
    if (el) sliceRefs.current[index] = el;
  };

  return (
    <section
      id="research"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '140px 0',
        overflow: 'hidden',
      }}
    >
      {/* Aperture slices */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => addSliceRef(el, i)}
            style={{
              position: 'absolute',
              left: 0,
              width: '100%',
              height: 'calc(100% / 6)',
              top: `calc(100% / 6 * ${i})`,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                height: '100vh',
                top: `calc(-100vh / 6 * ${i})`,
                background: 'radial-gradient(ellipse at 30% 50%, #f0f9ff 0%, #e0f2fe 40%, #bae6fd 100%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1000,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px)',
        }}
      >
        <div
          className="label-style"
          style={{ color: '#475569', textAlign: 'center', marginBottom: 20 }}
        >
          RESEARCH
        </div>

        <h2
          className="section-heading-dark"
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          Research Focus
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {RESEARCH_AREAS.map((area) => (
            <div
              key={area.title}
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(15, 23, 42, 0.08)',
                borderRadius: 12,
                padding: 40,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
                willChange: 'transform',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(15, 23, 42, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: area.color,
                  marginBottom: 16,
                }}
              />
              <h3
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 20,
                  fontWeight: 400,
                  color: '#0f172a',
                  marginBottom: 12,
                  lineHeight: 1.3,
                }}
              >
                {area.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  color: '#475569',
                  lineHeight: 1.6,
                }}
              >
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
