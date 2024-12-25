"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase/firebaseConfig";
import { collection, getDocs, doc } from "firebase/firestore";
import Navbar from "@/components/navbar/Navbar";
import ProjectTile from "@/components/project-tile/ProjectTile";
import "./armaanpage.css";
import Link from "next/link";

const ArmaanProjectsPage: React.FC = () => {
  const { username } = useParams(); // Get the username from the URL
  const [projects, setProjects] = useState<any[]>([]); // State to hold the projects data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProjects = async () => {
      if (!username) return;

      try {
        // Get a reference to the user's document in the "projects" collection

        // Reference to the user's "projects" sub-collection

        const projectsRef = collection(
          db,
          "projects",
          username as any,
          "projects"
        );

        const querySnapshot = await getDocs(projectsRef);

        const projectsData: any[] = [];

        querySnapshot.forEach((doc) => {
          const projectData = doc.data();
          projectsData.push({
            id: doc.id,
            ...projectData,
          });
        });

        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="mybg">
        <div className="flex flex-col justify-start items-start px-4">
          <h2
            className="text-white font-semibold text-3xl mt-6 underline-offset-8 decoration-blue-300 decoration-slice decoration-wavy underline"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Some mystical dimensions to traverse in my castle:
          </h2>
          <div className="projects grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-6">
            {projects.map((project) => (
              <ProjectTile
                username={username?.toString() as any}
                key={project.id}
                description={project.description.slice(0, 35) + "..."} // Limit to 40 characters + "..."
                image={project.images[0]} // Use the first image as the main image
                name={project.id} // Use the doc name as the project title
                tag={project.tags[0] || ""} // Show the first tag if available
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArmaanProjectsPage;
