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
		<div>
			<div className="projects-container">
				{/* Filter Buttons */}
				<div className="projects-button-section">
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
				<div className="projects-list-section">
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
