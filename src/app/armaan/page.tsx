"use client";
import Navbar from "@/components/navbar/Navbar";
import ProjectTile from "@/components/project-tile/ProjectTile";
import React, { useEffect, useRef } from "react";
import "./armaanpage.css";

const ArmaanProjectsPage: React.FC = () => {
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

    // Clean up elements on unmount
    return () => {
      particles.forEach((particle) => particle.remove());
      snowflakes.forEach((snowflake) => snowflake.remove());
      lights.forEach((light) => light.remove());
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="mybg" ref={particlesContainer}>
        <div className="flex flex-col justify-start items-start px-4">
          <h2
            className="text-white font-semibold text-3xl mt-6 underline-offset-8 decoration-blue-300 decoration-slice decoration-wavy underline"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Some mystical dimensions to traverse in my castle:
          </h2>
          <div className="projects  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-6">
            <ProjectTile
              description="Velit anim fugiat anim fugiat enim. Proident duis consectetur est aliquip..."
              image="https://images.unsplash.com/photo-1719937206589-d13b6b008196?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
              name="The Great Wall of China"
              tag="Website"
            />
            <ProjectTile
              description="Velit anim fugiat anim fugiat enim. Proident duis consectetur est aliquip..."
              image="https://images.unsplash.com/photo-1719937206589-d13b6b008196?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
              name="The Great Wall of China"
              tag="Website"
            />
            <ProjectTile
              description="Velit anim fugiat anim fugiat enim. Proident duis consectetur est aliquip..."
              image="https://images.unsplash.com/photo-1719937206589-d13b6b008196?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
              name="The Great Wall of China"
              tag="Website"
            />
            <ProjectTile
              description="Velit anim fugiat anim fugiat enim. Proident duis consectetur est aliquip..."
              image="https://images.unsplash.com/photo-1719937206589-d13b6b008196?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
              name="The Great Wall of China"
              tag="Website"
            />
            <ProjectTile
              description="Velit anim fugiat anim fugiat enim. Proident duis consectetur est aliquip..."
              image="https://images.unsplash.com/photo-1719937206589-d13b6b008196?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
              name="The Great Wall of China"
              tag="Website"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArmaanProjectsPage;
