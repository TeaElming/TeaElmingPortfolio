/** @format */

import React, { useState } from "react"
import ProjectsCarousel from "../../components/projects/project-carousel"
import "./css/Projects.css"
import EasterEgg from "../../components/easter-egg/EasterEgg"
import LatestProject from "../../components/easter-egg/LatestProject"

const ProjectsP: React.FC = () => {
  const [filter, setFilter] = useState("all")

  const handleFilterClick = (newFilter: string) => {
    setFilter(newFilter)
  }

  return (
    <div className="projectsP-root">
      <div className="projectsP-container">
        <div className="projectsP-button-section">
          {["all", "fullstack", "frontend", "backend"].map((type) => (
            <button
              key={type}
              className={`projectsP-button ${
                filter === type ? "active" : ""
              }`}
              onClick={() => handleFilterClick(type)}
            >
              {type === "all"
                ? "View All"
                : type.charAt(0).toUpperCase() + type.slice(1) }
            </button>
          ))}
        </div>

        <div className="projectsP-carousel">
          <ProjectsCarousel filter={filter} />
        </div>
      </div>

      <div className="hidden-EasterEgg">
        <EasterEgg
          child={<LatestProject />}
          hoverText="Want to see my latest non-coding build?"
        />
      </div>
    </div>
  )
}

export default ProjectsP
