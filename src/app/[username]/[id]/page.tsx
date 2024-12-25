"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { db } from "@/app/firebase/firebaseConfig";
import {
  doc,
  getDoc,
  collection,
  setDoc,
  updateDoc,
  increment,
  onSnapshot,
} from "firebase/firestore";
import Navbar from "@/components/navbar/Navbar";
import "./projectinfopage.css";
import { Swiper as SwiperType } from "swiper";

type Project = {
  id: string;
  name: string;
  description: string;
  images: string[];
  tags: string[];
  sourceCodeUrl?: string;
  demoUrl?: string;
  apkUrl?: string;
  ipaUrl?: string;
  createdAt: string;
  likeCount: number;
};

type Comment = {
  user: string;
  text: string;
};

const ProjectInformationPage: React.FC = () => {
  const { username, id } = useParams(); // Extract username and project ID from URL
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [userName, setUserName] = useState("");
  const [hasLiked, setHasLiked] = useState(false); // Track if the user has liked
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const usernameString = Array.isArray(username) ? username[0] : username;
        const idString = Array.isArray(id) ? id[0] : id;

        if (!usernameString || !idString) {
          throw new Error("Invalid URL parameters");
        }

        // Firestore path: users/{username}/projects/{id}
        const projectRef = doc(
          db,
          "projects",
          usernameString,
          "projects",
          idString
        );
        const projectDoc = await getDoc(projectRef);

        if (!projectDoc.exists()) {
          throw new Error("Project not found");
        }

        const projectData = projectDoc.data() as Project;
        setProject(projectData);
        setLikes(projectData.likeCount || 0);

        // Real-time listener for like count
        onSnapshot(projectRef, (snapshot) => {
          const updatedData = snapshot.data();
          if (updatedData && updatedData.likeCount !== undefined) {
            setLikes(updatedData.likeCount);
          }
        });

        // Fetch comments from Firestore using real-time listener
        const commentsRef = collection(projectRef, "comments");

        onSnapshot(commentsRef, (snapshot) => {
          const fetchedComments: Comment[] = snapshot.docs.map((doc) => ({
            user: doc.data().commentUserName,
            text: doc.data().commentMessage,
          }));
          setComments(fetchedComments);
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [username, id]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const usernameString = Array.isArray(username) ? username[0] : username;
      const idString = Array.isArray(id) ? id[0] : id;

      if (usernameString && idString) {
        const commentsRef = collection(
          doc(db, "projects", usernameString, "projects", idString),
          "comments"
        );

        const newCommentDoc = doc(commentsRef);
        const commentData = {
          commentUserName: userName || "Anonymous",
          commentMessage: newComment,
          commentTime: new Date().toLocaleString(),
        };

        await setDoc(newCommentDoc, commentData);

        // Clear comment input
        setNewComment("");
        setUserName("");
      }
    }
  };

  const handleLike = async () => {
    if (!project || hasLiked) return; // Prevent liking if already liked

    const usernameString = Array.isArray(username) ? username[0] : username;
    const idString = Array.isArray(id) ? id[0] : id;

    if (usernameString && idString) {
      const projectRef = doc(
        db,
        "projects",
        usernameString,
        "projects",
        idString
      );
      await updateDoc(projectRef, { likeCount: increment(1) });
    }

    setLikes((prev) => prev + 1);
    setHasLiked(true); // Disable the like button
  };

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="relative overflow-scroll h-full bg-[#0b1e30]">
      <Navbar />
      <div className="container mx-auto px-4 py-6 relative z-999">
        <div className="project-info bg-white bg-opacity-70 p-4 sm:p-6 rounded-lg shadow-lg">
          <Swiper
            ref={swiperRef as any}
            pagination={{
              el: ".swiper-pagination",
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            spaceBetween={10}
            slidesPerView={1}
            loop
            className="mb-8"
          >
            {project.images.map((image, index) => (
              <SwiperSlide key={index}>
                <center>
                  <img
                    src={image}
                    alt={`Project Image ${index + 1}`}
                    className="w-[30rem] h-[20rem] sm:h-80 md:h-[26rem] z-0 object-cover rounded-lg"
                  />
                </center>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination"></div>
          </Swiper>

          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">
            {id}
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
              onClick={handleLike}
              disabled={hasLiked} // Disable the button after liking
              className={`bg-${
                hasLiked ? "blue" : "green"
              }-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full hover:bg-green-600 transition`}
            >
              Like {likes}
            </button>
          </div>

          {/* Show URL buttons if they exist */}
          <div className="url-buttons flex flex-wrap space-x-4 mb-6">
            {project.sourceCodeUrl && (
              <a
                href={project.sourceCodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Source Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Demo
              </a>
            )}
            {project.apkUrl && (
              <a
                href={project.apkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Download APK
              </a>
            )}
            {project.ipaUrl && (
              <a
                href={project.ipaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
              >
                Download IPA
              </a>
            )}
          </div>

          {/* Display CreatedAt */}
          <p className="text-md text-gray-600 mb-4">
            Created At: {formatCreatedAt(project.createdAt)}
          </p>

          <div className="comments">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              Comments
            </h2>

            <div className="comment-input mb-4">
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your Name (Armaan is grateful to ya!)"
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
                <div key={index} className="comment p-4 bg-gray-100 rounded-lg">
                  <p className="font-bold text-gray-800">{comment.user}</p>
                  <p className="text-gray-600">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformationPage;
