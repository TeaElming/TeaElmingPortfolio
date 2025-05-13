/** @format */
import React, { useState } from "react"
import ProjectsCarousel from "../../components/projects/project-carousel"
import "./css/Projects.css"

const ProjectsB: React.FC = () => {
  const [filter, setFilter] = useState("all")

  const handleFilterClick = (newFilter: string) => {
    setFilter(newFilter)
  }

  return (
    <div className="projectsB-root">
      <div className="projectsB-container">
        {/* Filter Buttons */}
        <div className="projectsB-button-section">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => handleFilterClick("all")}
          >
						View All
          </button>
          <button
            className={filter === "fullstack" ? "active" : ""}
            onClick={() => handleFilterClick("fullstack")}
          >
						Full-Stack
          </button>
          <button
            className={filter === "frontend" ? "active" : ""}
            onClick={() => handleFilterClick("frontend")}
          >
						Front-End
          </button>
          <button
            className={filter === "backend" ? "active" : ""}
            onClick={() => handleFilterClick("backend")}
          >
						Back-End
          </button>
        </div>

        {/* Carousel Section */}
        <div className="projectsB-carousel">
          <ProjectsCarousel filter={filter} />
        </div>
      </div>
    </div>
  )
}

export default ProjectsB
