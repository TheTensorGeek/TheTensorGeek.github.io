import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: 'Machine Vision for Computer-Assisted Surgery',
    description: 'Developed machine vision-based registration methods for cranial applications in image-guided surgery at Stryker, enhancing surgical precision through automated stereo camera calibration.',
    tags: ['Python', 'OpenCV', 'Robotics'],
    image: '/project-surgery.jpg',
    imageLeft: true,
  },
  {
    title: '2D-2D Registration for Robotic Spine Surgery',
    description: 'Engineered robust registration algorithms for robotic-assisted spinal interventions at HTIC, IIT-Madras, focusing on high-accuracy clinical outcomes and real-time performance.',
    tags: ['C++', 'Computer Vision', 'Medical Imaging'],
    image: '/project-spine.jpg',
    imageLeft: false,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    gsap.set(cards, { opacity: 0, y: 60 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    tl.to(cards, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        background: '#e0f2fe',
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
          style={{ color: '#475569', marginBottom: 20 }}
        >
          PROJECTS
        </div>

        <h2
          className="section-heading-dark"
          style={{ marginBottom: 64 }}
        >
          Selected Projects
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {PROJECTS.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="md:!flex-row"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 40,
                background: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(15, 23, 42, 0.06)',
                borderRadius: 16,
                padding: 48,
                willChange: 'transform, opacity',
              }}
            >
              {/* Image */}
              <div
                style={{
                  flex: project.imageLeft ? '0 0 55%' : '0 0 55%',
                  order: project.imageLeft ? 0 : 1,
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    borderRadius: 8,
                    objectFit: 'cover',
                    aspectRatio: '16/10',
                  }}
                />
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: 24,
                    fontWeight: 400,
                    color: '#0f172a',
                    marginBottom: 16,
                    lineHeight: 1.3,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontSize: 16,
                    fontWeight: 300,
                    color: '#475569',
                    lineHeight: 1.65,
                    marginBottom: 20,
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 11,
                        color: '#64748b',
                        background: 'rgba(15, 23, 42, 0.06)',
                        padding: '4px 12px',
                        borderRadius: 4,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
