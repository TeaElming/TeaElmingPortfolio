/** @format */
import React, { useState } from "react"
import ProjectsCarousel from "../../../components/projects/project-carousel"
import "./css/MobileProjects.css"

const MobileProjects: React.FC = () => {
  const [filter, setFilter] = useState("all")

  return (
    <section id="projects" className="mobile-projects">
      <div className="filter-scroll">
        {["all", "fullstack", "frontend", "backend"].map((key) => (
          <button
            key={key}
            className={`filter-btn ${filter === key ? "active" : ""}`}
            onClick={() => setFilter(key)}
          >
            {key === "all"
              ? "View All"
              : key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      <div className="carousel-wrapper">
        <ProjectsCarousel filter={filter} />
      </div>
    </section>
  )
}

export default MobileProjects
