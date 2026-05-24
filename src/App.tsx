import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Research from './sections/Research';
import Projects from './sections/Projects';
import Publications from './sections/Publications';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      const lenis = new Lenis({
        lerp: 0.1,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const rafCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(rafCallback);
        lenis.destroy();
      };
    }
  }, []);

  return (
    <div style={{ background: '#09090b', minHeight: '100vh' }}>
      <Navigation />
      <Hero />
      <About />
      <Research />
      <Projects />
      <Publications />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
