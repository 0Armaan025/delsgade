"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../src/app/globals.css";

const HomePage: React.FC = () => {
  const [showFirstText, setShowFirstText] = useState(true);
  const [showSecondText, setShowSecondText] = useState(false);
  const particlesContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesContainer.current;
    if (!container) return;

    // Generate particles dynamically
    const particleCount = 20;
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
    const snowflakeCount = 50;
    const snowflakes: HTMLDivElement[] = [];

    for (let i = 0; i < snowflakeCount; i++) {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
      container.appendChild(snowflake);
      snowflakes.push(snowflake);
    }

    // Add Christmas lights along the edges
    const lightCount = 15;
    const lights: HTMLDivElement[] = [];

    for (let i = 0; i < lightCount; i++) {
      const light = document.createElement("div");
      light.className = "light";
      light.style.top = "0";
      light.style.left = `${(i / lightCount) * 100}%`;
      light.style.animationDuration = `${Math.random() * 3 + 2}s`;
      container.appendChild(light);
      lights.push(light);
    }

    // Transition between texts
    setTimeout(() => {
      setShowFirstText(false);
      setShowSecondText(true);
    }, 2000);

    // Clean up elements on unmount
    return () => {
      particles.forEach((particle) => particle.remove());
      snowflakes.forEach((snowflake) => snowflake.remove());
      lights.forEach((light) => light.remove());
    };
  }, []);

  const handleButtonClick = () => {
    window.location.href = "/armaan";
  };

  return (
    <div
      className=" relative bg-[#0b1e30] h-screen w-screen overflow-hidden flex items-center justify-center"
      ref={particlesContainer}
    >
      <div className="z-10 text-center">
        {showFirstText && (
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-red-500  ">
            Merry Christmas!
          </h1>
        )}
        {showSecondText && (
          <div className="text-center px-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Welcome to Delsgade, the projects castle of{" "}
              <span className="text-green-500">
                The Eternal Overlord of the Code Realms
              </span>
              , <span className="text-yellow-500">Armaan</span>.
            </h1>
            <button
              className="mt-6 bg-red-500 z-999 text-white px-6 py-6 rounded-md text-xl md:text-xl hover:bg-red-600 transition"
              onClick={handleButtonClick}
            >
              Go ahead and enter the castle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
