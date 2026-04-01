import React, { useRef } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const container = useRef();

  useGSAP(() => {
    // Elegant stagger entry using GSAP
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });
    
    tl.fromTo('.hero-badge', 
      { y: -30, opacity: 0 }, 
      { y: 0, opacity: 1 }
    )
    .fromTo('.hero-title', 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1 }, 
      "-=0.8"
    )
    .fromTo('.hero-subtitle', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1 }, 
      "-=0.9"
    )
    .fromTo('.cta-button', 
      { scale: 0.9, opacity: 0 }, 
      { scale: 1, opacity: 1, ease: 'back.out(1.5)' }, 
      "-=0.8"
    )
    .fromTo('.scroll-indicator', 
      { opacity: 0 }, 
      { opacity: 1, duration: 2 }, 
      "-=0.5"
    );
  }, { scope: container });

  const handleScroll = () => {
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" ref={container}>
      <div className="hero-badge">
        <ShieldCheck size={18} />
        <span>Enterprise-Grade Security</span>
      </div>

      <h1 className="hero-title">
        Digital Evidence
        <span>Tamper Detection</span>
      </h1>

      <p className="hero-subtitle">
        Secure your digital forensics with immutable blockchain technology. 
        Guarantee chain-of-custody and verify the integrity of critical evidence instantly.
      </p>

      <button onClick={handleScroll} className="cta-button">
        Secure Evidence <ArrowRight size={20} />
      </button>

      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--text-secondary), transparent)' }}></div>
      </div>
    </section>
  );
};

export default Hero;
