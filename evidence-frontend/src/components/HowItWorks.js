import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
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
      ease: 'power3.out'
    });

    const items = gsap.utils.toArray('.step-item');
    items.forEach((item, i) => {
      const isEven = i % 2 === 0;
      
      // Initial fade/scale in
      gsap.from(item.querySelector('.step-number'), {
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.5)'
      });

      // Continuous parallax movement tied to scroll
      gsap.to(item.querySelector('.step-content'), {
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1, // Smooth scrubbing
        },
        y: -100, // Move up as you scroll down
        ease: 'none'
      });
      
      // Lateral entrance animation
      gsap.from(item.querySelector('.step-content'), {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
        x: isEven ? 100 : -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });
  }, { scope: container });
  const steps = [
    {
      number: "01",
      title: "Upload Evidence",
      description: "Select your image or video and assign a unique Evidence ID. The file remains entirely local until the hash is computed."
    },
    {
      number: "02",
      title: "Hash Generation",
      description: "Our system automatically calculates a cryptographic fingerprint of your file. Even a single changed pixel alters the entire hash."
    },
    {
      number: "03",
      title: "Blockchain anchoring",
      description: "The unique hash is anchored to the smart contract. Future verifications simply check if the current file's hash matches the original on the blockchain."
    }
  ];

  return (
    <section className="how-it-works-section" ref={container}>
      <div className="section-header">
        <h2 className="section-title">
          How It Works
        </h2>
      </div>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-item">
            <div className="step-number">
              {step.number}
            </div>
            
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
