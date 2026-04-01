import React, { useRef } from 'react';
import { ShieldAlert, Database, LockKeyhole } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.from('.section-header > *', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });

    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, { scope: container });

  const features = [
    {
      icon: <ShieldAlert size={32} />,
      title: "Tamper Detection",
      description: "Any modification to the original file is instantly detected by comparing cryptographic hashes."
    },
    {
      icon: <LockKeyhole size={32} />,
      title: "Cryptographic Hashing",
      description: "We generate robust SHA-256 signatures for every piece of digital evidence."
    },
    {
      icon: <Database size={32} />,
      title: "Blockchain Immutable",
      description: "Hashes are stored on a decentralized ledger, guaranteeing a verifiable chain of custody."
    }
  ];

  return (
    <section className="features-section" ref={container}>
      <div className="section-header">
        <h2 className="section-title">
          Why Choose Our System?
        </h2>
        <p className="section-subtitle">
          Built for law enforcement, legal teams, and forensic experts who demand absolute data integrity.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon-wrapper">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
