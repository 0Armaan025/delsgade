"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import "./projectsubmission.css"; // Ensure to include relevant CSS for particles and snowfall effects
import { db } from "../firebase/firebaseConfig";
import { v4 as uuidv4 } from "uuid"; // Import UUID library to generate random IDs
import { collection, doc, setDoc } from "firebase/firestore";

type ProjectForm = {
  username: string;
  title: string;
  description: string;
  tags: string[];
  sourceCodeUrl: string;
  demoUrl: string;
  apkUrl?: string;
  ipaUrl?: string;
  images: string[];
};

const ProjectSubmissionPage = () => {
  const particlesContainer = useRef<HTMLDivElement>(null);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [projectForm, setProjectForm] = useState<ProjectForm>({
    username: "",
    title: "",
    description: "",
    tags: [],
    sourceCodeUrl: "",
    demoUrl: "",
    apkUrl: "",
    ipaUrl: "",
    images: ["", "", "", "", ""],
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const container = particlesContainer.current;
    if (!container) return;

    // Particle and snowflake effects logic
    const particleCount = 20;
    const snowflakeCount = 50;
    const particles: HTMLDivElement[] = [];
    const snowflakes: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${6 + Math.random() * 6}s`;
      container.appendChild(particle);
      particles.push(particle);
    }

    for (let i = 0; i < snowflakeCount; i++) {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
      container.appendChild(snowflake);
      snowflakes.push(snowflake);
    }

    return () => {
      particles.forEach((particle) => particle.remove());
      snowflakes.forEach((snowflake) => snowflake.remove());
    };
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === "ArmaanIsTheGreatest***") {
      setPasswordEntered(true);
    } else {
      alert("Incorrect password! Please try again.");
    }
  };

  const handleTagAddition = () => {
    if (tagInput.trim()) {
      setProjectForm({
        ...projectForm,
        tags: [...projectForm.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const updatedImages = [...projectForm.images];
      updatedImages[index] = value;
      setProjectForm({ ...projectForm, images: updatedImages });
    } else {
      setProjectForm({ ...projectForm, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.username || !projectForm.title) {
      alert("Username and Project Title are required!");
      return;
    }

    const { username, title, images, ...rest } = projectForm;
    const projectId = title.toLowerCase().replace(/\s+/g, "-"); // Generate a unique ID from the title

    // Remove empty strings from images array
    const filteredImages = images.filter((image) => image.trim() !== "");

    try {
      const projectDocRef = doc(
        db,
        "projects",
        username,
        "projects",
        projectId
      );

      // Set the project document with likeCount and images
      await setDoc(projectDocRef, {
        ...rest,
        images: filteredImages,
        likeCount: 0, // Add likeCount field with a default value of 0
        createdAt: new Date().toISOString(),
      });

      // Add a subcollection for comments
      const commentsRef = collection(projectDocRef, "comments");

      // Example dummy comments

      // Add each comment as a document with a random ID

      // alert("Project submitted successfully with comments!");
      setProjectForm({
        username: "",
        title: "",
        description: "",
        tags: [],
        sourceCodeUrl: "",
        demoUrl: "",
        apkUrl: "",
        ipaUrl: "",
        images: ["", "", "", "", ""],
      });
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("An error occurred while submitting the project.");
    }
  };

  return (
    <div
      className="myBg bg-[#0b1e30] overflow-auto h-full"
      ref={particlesContainer}
    >
      <Navbar />
      <center>
        <h2 className="text-white text-4xl font-semibold mt-8">
          Project Submission Portal
        </h2>
      </center>

      {!passwordEntered ? (
        <div className="password-form bg-transparent mt-12 p-6 w-3/4 lg:w-1/2 mx-auto">
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              placeholder="Enter the special password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="p-3 w-full rounded-lg text-black focus:outline-none"
            />
            <button
              type="submit"
              className="mt-4 bg-[#22c55e] text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="project-form bg-transparent mt-12 p-6 w-3/4 lg:w-1/2 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-gray-300">
                This thing is very important and case sensitive. This will
                determine the location of where your projects are stored, e.g.,
                'deslgade.vercel.com/armaan'
              </label>
              <input
                type="text"
                name="username"
                placeholder="User name"
                value={projectForm.username}
                onChange={handleInputChange}
                className="p-3 mt-2 w-full rounded-lg text-black focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={projectForm.title}
                onChange={handleInputChange}
                className="p-3 w-full rounded-lg text-black focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <textarea
                name="description"
                placeholder="Project Description (max 60 words)"
                maxLength={300}
                value={projectForm.description}
                onChange={handleInputChange}
                className="p-3 w-full rounded-lg text-black focus:outline-none"
                rows={4}
              ></textarea>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Add a tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                className="p-3 w-full rounded-lg text-black focus:outline-none"
              />
              <button
                type="button"
                onClick={handleTagAddition}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Add Tag
              </button>
              <div className="mt-2">
                {projectForm.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <input
                type="url"
                name="sourceCodeUrl"
                placeholder="Source Code URL"
                value={projectForm.sourceCodeUrl}
                onChange={handleInputChange}
                className="p-3 w-full rounded-lg text-black focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="url"
                name="demoUrl"
                placeholder="Demo Link URL"
                value={projectForm.demoUrl}
                onChange={handleInputChange}
                className="p-3 w-full rounded-lg text-black focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="url"
                name="apkUrl"
                placeholder="APK URL (optional)"
                value={projectForm.apkUrl || ""}
                onChange={handleInputChange}
                className="p-3 w-full rounded-lg text-black focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="url"
                name="ipaUrl"
                placeholder="IPA URL (optional)"
                value={projectForm.ipaUrl || ""}
                onChange={handleInputChange}
                className="p-3 w-full rounded-lg text-black focus:outline-none"
              />
            </div>
            <div className="mb-4">
              {[...Array(5)].map((_, index) => (
                <input
                  key={index}
                  type="url"
                  placeholder={`Image URL ${index + 1} ${
                    index === 0 ? "(required)" : "(optional)"
                  }`}
                  value={projectForm.images[index]}
                  onChange={(e) => handleInputChange(e, index)}
                  className="p-3 w-full rounded-lg text-black focus:outline-none mb-2"
                />
              ))}
            </div>

            <button
              type="submit"
              className="mt-4 bg-[#22c55e] text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
            >
              Submit Project
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProjectSubmissionPage;
