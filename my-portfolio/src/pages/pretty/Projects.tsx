/** @format */
import React from "react"
import ProjectsCarousel from "../../components/projects/project-list"
import "./css/Projects.css" // <-- import the new CSS file here

const ProjectsP: React.FC = () => {
	return (
		<div className="projects-container">
			{/* Button Section */}
			<div className="projects-button-section">
				<button>Full-Stack</button>
				<button>Front-End</button>
				<button>Back-End</button>
				<button>View All</button>
			</div>

			{/* Projects Grid Area */}
			<div className="projects-list-section">
				<ProjectsCarousel />
			</div>
		</div>
	)
}

export default ProjectsP
