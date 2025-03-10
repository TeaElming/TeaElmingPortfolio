/** @format */
import React, { useState, useEffect } from "react"
import ProjectsGrid from "../../components/projects/project-list"

const ProjectsP: React.FC = () => {
	const [projects, setProjects] = useState([])
	useEffect(() => {
		fetch("/json/projects.json")
			.then((response) => response.json())
			.then((data) => {
				// data should look like: { "projects": [ ... ] }
				setProjects(data.projects)
			})
			.catch((error) => {
				console.error("Error fetching projects:", error)
			})
	}, [])

	return (
		<div>
			{/* Button Section */}
			<div>
				<button>Full-Stack</button>
				<button>Front-End</button>
				<button>Back-End</button>
				<button>View All</button>
			</div>

			{/* ProjectCard Example */}
			<div style={{ marginTop: "1rem" }}>
				<ProjectsGrid projects={projects} />
			</div>
		</div>
	)
}

export default ProjectsP
