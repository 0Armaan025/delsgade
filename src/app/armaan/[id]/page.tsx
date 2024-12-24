"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./projectinfopage.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Navbar from "@/components/navbar/Navbar";

type Project = {
  id: string;
  name: string;
  description: string;
  images: string[];
  tags: string[];
  sourceCodeLink?: string;
  demoLink?: string;
  apkLink?: string;
  ipaLink?: string;
};

type Comment = {
  user: string;
  text: string;
};

interface ProjectInformationPageProps {
  project: Project;
}

const DUMMY_PROJECT: Project = {
  id: "1",
  name: "Amazing Christmas Project",
  description: "This project captures the spirit of Christmas.",
  images: [
    "https://images.unsplash.com/photo-1719937206098-236a481a2b6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1719937206098-236a481a2b6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  ],
  tags: ["Christmas", "Creative", "Inspiring", "Mobile", "React"],
  sourceCodeLink: "https://github.com/your-username/christmas-project",
  demoLink: "https://your-website.com/christmas-project",
  apkLink: "https://your-website.com/christmas-project.apk",
  ipaLink: "https://your-website.com/christmas-project.ipa",
};

const DUMMY_COMMENTS: Comment[] = [
  { user: "John Doe", text: "Incredible project!" },
  { user: "Jane Smith", text: "Gets me in the Christmas spirit!" },
];

const ProjectInformationPage: React.FC<ProjectInformationPageProps> = ({
  project = DUMMY_PROJECT,
}) => {
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>(DUMMY_COMMENTS);
  const [newComment, setNewComment] = useState<string>("");
  const particlesContainer = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState("");
  const [time, setTime] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { user: userName === "" ? "Anonymous" : userName, text: newComment },
      ]);
      setNewComment("");
    }
  };

  useEffect(() => {
    // const interval = setInterval(() => {
    setTime(new Date().toLocaleString());
    // }, 1000);

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

  return (
    <>
      <div className="relative overflow-scroll h-full">
        <div
          className="background absolute top-0 left-0 w-full h-full"
          ref={particlesContainer}
        ></div>
        <Navbar />

        <div className="container mx-auto px-4 py-6 relative z-999">
          <div className="project-info bg-white bg-opacity-70 p-4 sm:p-6 rounded-lg shadow-lg">
            <Swiper
              pagination={{
                el: ".swiper-pagination",
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              spaceBetween={10}
              slidesPerView={1}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop
              className="mb-8"
            >
              {project.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Project Image ${index + 1}`}
                    className="w-full h-64 sm:h-80 md:h-[26rem] object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
              <div className="swiper-pagination"></div>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </Swiper>

            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">
              {project.name}
            </h1>
            <p className="text-md sm:text-xl text-gray-600 mb-4">
              {project.description}
            </p>

            <div className="tags flex flex-wrap mb-6">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block cursor-pointer hover:scale-105 transition-all bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="likes mb-6 flex flex-row justify-between">
              <button
                onClick={() => setLikes(likes + 1)}
                className="bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-green-600 transition"
              >
                Like {likes}
              </button>
              <div className="text-right text-gray-600 mt-2">
                Last updated: {time}
              </div>
            </div>

            <div className="links flex flex-wrap gap-4 mb-6">
              {project.sourceCodeLink && (
                <a
                  href={project.sourceCodeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-900 transition"
                >
                  View Source Code
                </a>
              )}
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                >
                  Demo Link
                </a>
              )}
              {project.apkLink && (
                <a
                  href={project.apkLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                >
                  Download APK
                </a>
              )}
              {project.ipaLink && (
                <a
                  href={project.ipaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition"
                >
                  Download IPA
                </a>
              )}
            </div>

            <div className="comments">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Comments
              </h2>

              <div className="comment-input mb-4">
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full p-2 sm:p-4 border-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-2 sm:p-4 border-2 rounded-lg mt-2 sm:mt-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                ></textarea>
                <button
                  onClick={handleAddComment}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Add Comment
                </button>
              </div>

              <div className="comment-list space-y-4">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="comment p-4 bg-gray-100 rounded-lg"
                  >
                    <p className="font-bold text-gray-800">{comment.user}</p>
                    <p className="text-gray-600">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectInformationPage;
