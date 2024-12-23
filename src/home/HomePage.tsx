"use client";
import React, { useEffect, useRef } from "react";

const HomePage: React.FC = () => {
  const particlesContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesContainer.current;
    if (!container) return;

    // Generate particles dynamically
    const particleCount = 20; // Adjust number of particles
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${6 + Math.random() * 6}s`;
      container.appendChild(particle);
      particles.push(particle);
    }

    // Generate snowflakes dynamically
    const snowflakeCount = 50; // Number of snowflakes
    const snowflakes: HTMLDivElement[] = [];

    for (let i = 0; i < snowflakeCount; i++) {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random speed
      container.appendChild(snowflake);
      snowflakes.push(snowflake);
    }

    // Clean up particles and snowflakes on unmount
    return () => {
      particles.forEach((particle) => particle.remove());
      snowflakes.forEach((snowflake) => snowflake.remove());
    };
  }, []);

  return <div className="background" ref={particlesContainer}></div>;
};

export default HomePage;
