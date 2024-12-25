"use client";
import Navbar from "@/components/navbar/Navbar";
import React, { useEffect, useRef, useState } from "react";
import { db } from "@/app/firebase/firebaseConfig"; // Make sure this is the correct import for your Firebase config
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Firebase Firestore functions
import "./aboutpage.css";

type Props = {};

const AboutPage = (props: Props) => {
  const particlesContainer = useRef<HTMLDivElement>(null);
  const [feedback, setFeedback] = useState({ name: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

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

    // Clean up elements on unmount
    return () => {
      particles.forEach((particle) => particle.remove());
      snowflakes.forEach((snowflake) => snowflake.remove());
      lights.forEach((light) => light.remove());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (feedback.name && feedback.message) {
      try {
        // Add feedback to Firestore
        const feedbackRef = collection(db, "feedbacks");
        await addDoc(feedbackRef, {
          name: feedback.name,
          message: feedback.message,
          date: serverTimestamp(), // This will automatically add the current date and time
        });

        setSubmitted(true);
        setFeedback({ name: "", message: "" }); // Reset the form fields
      } catch (error) {
        console.error("Error submitting feedback: ", error);
      }
    }
  };

  return (
    <>
      <div
        className="myBg bg-[#0b1e30] overflow-auto h-full"
        ref={particlesContainer}
      >
        <Navbar />
        <center>
          <h2
            className="text-white text-4xl font-semibold mt-8"
            style={{ fontFamily: "Caveat, sans-serif" }}
          >
            Some information about my castle,{" "}
            <span className="text-[#22c55e]">Delsgade:</span>
          </h2>
          <br />
        </center>
        <ul
          className="list-disc ml-12 text-white text-xl"
          style={{ listStyle: "disc", fontFamily: "Patrick Hand" }}
        >
          <li>
            This is me, Armaan{" "}
            <span className="text-[#22c55e]">
              (The Eternal Overlord of the Code Realms)
            </span>
            &nbsp;speaking, welcome to the castle! 😄, also if it's 25 Dec
            today, then <span className="text-red-400">Merry Christmas!🥳</span>
          </li>
          <li>
            This is my castle{" "}
            <span className="text-[#22c55e] font-bold">Delsgade.</span>
          </li>
          <li>
            I would be listing all my projects that I want to list publicly
            here.
          </li>
          <li>
            If you are seeing this, I'm very grateful to you, and as a token of
            gratitude, you are welcome to have your own room in my castle to
            showcase your projects, you just gotta let me know (feedback below).
          </li>
          <li>
            I read all the feedbacks, and I'm really grateful for them as well,
            thanks everyone for leaving your valuable feedbacks! ✨
          </li>
          <li>
            If you are reading this (the last line), that means you are either
            exiting from my castle or moving towards the mystical dimensions in
            my castle. In both cases, I'm really grateful to you for visiting my
            castle, and I hope you had a great time here. 😄
          </li>
        </ul>

        {/* Feedback Form */}
        <center>
          <div className="feedback-form bg-transparent mt-12 p-6 w-3/4 lg:w-1/2">
            <h3 className="text-2xl text-[#22c55e] font-semibold mb-4">
              Leave your feedback here please:
            </h3>
            {submitted ? (
              <p className="text-xl text-white">
                Thanks for visiting my castle! 🏰
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your Name(So the overlord of the eternal code realms know who you are)"
                  value={feedback.name}
                  onChange={(e) =>
                    setFeedback({ ...feedback, name: e.target.value })
                  }
                  className="p-3 rounded-lg text-black focus:outline-none"
                />
                <textarea
                  placeholder="Your Message(I, The Eternal overlord of the great Code Realms, Armaan will be glad to read your message/feedback!)"
                  value={feedback.message}
                  onChange={(e) =>
                    setFeedback({ ...feedback, message: e.target.value })
                  }
                  className="p-3 rounded-lg text-black focus:outline-none"
                  rows={4}
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#22c55e] text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </center>
      </div>
    </>
  );
};

export default AboutPage;
