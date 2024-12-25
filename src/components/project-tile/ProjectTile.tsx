import React from "react";
import "./project-tile.css";
import Link from "next/link";

type Props = {
  username: string;
  image: string;
  name: string;
  description: string;
  tag: string; // e.g., 'Game', 'Website', etc.
};

const ProjectTile = ({username, image, name, description, tag }: Props) => {
  // Truncate description to 40 characters
  const truncatedDescription =
    description.length > 40 ? description.slice(0, 40) + "..." : description;

  return (
    <Link href={`/${username}/${name}`} passHref>
    <div className="project-tile z-999 p-4 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
     

      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover rounded-md mb-3"
      />

      <div className="tag mb-2 px-3 py-1 text-sm font-bold rounded-full bg-blue-500 inline-block">
        {tag}
      </div>

      {/* Project Name */}
      <h3 className="text-xl font-semibold mb-2">{name}</h3>

      {/* Project Description */}
      <p className="text-sm">{truncatedDescription}</p>
    </div>
    </Link>
  );
};

export default ProjectTile;
