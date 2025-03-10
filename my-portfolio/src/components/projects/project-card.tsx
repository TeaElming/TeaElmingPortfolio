/** @format */
import React, { useState } from "react"
import "./css/project-card.css" 

interface Project {
  title: string
  url: string
  technologies: string[]
  stack: string
  description: string[]
  imgs: string[]
  video: string
}

interface ProjectCardProps {
  project: Project
}

const MAX_DESC_LENGTH = 100

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Combine images + optional video for carousel
  const mediaItems = [
    ...project.imgs.map((img) => ({ type: "image", src: img })),
    ...(project.video ? [{ type: "video", src: project.video }] : []),
  ]
  const [mediaIndex, setMediaIndex] = useState(0)

  // Truncate each line of description if necessary
  const truncatedDescription = project.description
    .map((desc) =>
      desc.length > MAX_DESC_LENGTH ? desc.slice(0, MAX_DESC_LENGTH) + "..." : desc
    )
    .join(" ")

  return (
    <div className="project-card">
      {/* Left side (media) */}
      <div className="left-media">
        {mediaItems.length === 0 ? (
          // Fallback if no media
          <div className="blue-fallback">
            <h2>{project.title}</h2>
          </div>
        ) : (
          <>
            {mediaItems[mediaIndex].type === "image" ? (
              <img
                src={mediaItems[mediaIndex].src}
                alt={project.title}
                className="media"
              />
            ) : (
              <video
                src={mediaItems[mediaIndex].src}
                controls
                className="media"
              />
            )}

            {/* "Dots" for multiple media items */}
            {mediaItems.length > 1 && (
              <div className="dots-container">
                {mediaItems.map((_, i) => (
                  <div
                    key={i}
                    className="dot"
                    style={{ backgroundColor: i === mediaIndex ? "white" : "gray" }}
                    onClick={() => setMediaIndex(i)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Right side (info) */}
      <div className="right-info">
        <h3 className="card-title">{project.title}</h3>
        <p className="fieldTitle">
          <strong>Tech:</strong> {project.technologies.join(", ")}
        </p>
        <p className="fieldTitle">
          <strong>Stack:</strong> {project.stack}
        </p>
        <p
          className="hoverable-text"
          title={project.description.join("\n")} // shows full text on hover
        >
          {truncatedDescription}
        </p>
      </div>
    </div>
  )
}

export default ProjectCard
