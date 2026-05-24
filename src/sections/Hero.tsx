import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import NeuralNetworkCanvas from '../components/NeuralNetworkCanvas';

export default function Hero() {
  const labelRef = useRef<HTMLDivElement>(null);
  const name1Ref = useRef<HTMLDivElement>(null);
  const name2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(labelRef.current, { opacity: 1, duration: 0.8 }, 0.2)
      .to(name1Ref.current, { opacity: 1, y: 0, duration: 1 }, 0.4)
      .to(name2Ref.current, { opacity: 1, y: 0, duration: 1 }, 0.55)
      .to(subtitleRef.current, { opacity: 1, duration: 0.6 }, 1.0)
      .to(ctaRef.current, { opacity: 1, duration: 0.6 }, 1.4);

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#09090b',
      }}
    >
      {/* Radial gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(37, 99, 235, 0.08) 0%, transparent 60%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <NeuralNetworkCanvas />

      {/* Hero content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <div
          ref={labelRef}
          className="label-style"
          style={{
            opacity: 0,
            color: '#a1a1aa',
            marginBottom: 20,
          }}
        >
          Senior Research Associate — Robotics &amp; AI
        </div>

        <div
          style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: 'clamp(56px, 10vw, 140px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            color: '#fafafa',
          }}
        >
          <div
            ref={name1Ref}
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            Abdul
          </div>
          <div
            ref={name2Ref}
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            Wahid
            <span style={{ opacity: 0.4 }}>_</span>
          </div>
        </div>

        <div
          ref={subtitleRef}
          style={{
            opacity: 0,
            fontFamily: "'Geist Mono', monospace",
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: '0.04em',
            color: '#2563eb',
            marginTop: 24,
          }}
        >
          Embodied AI · Vision-Language Models · Spatial Intelligence
        </div>

        <div
          ref={ctaRef}
          style={{
            opacity: 0,
            fontFamily: "'Geist', sans-serif",
            fontSize: 12,
            fontWeight: 300,
            color: '#71717a',
            marginTop: 48,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
          }}
          onClick={() => {
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>Scroll to explore</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#71717a"
            strokeWidth="1.5"
            style={{
              animation: 'chevronBounce 2s ease-in-out infinite',
            }}
          >
            <polyline points="4,6 8,10 12,6" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes chevronBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </section>
  );
}
