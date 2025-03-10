/** @format */
import React, { useState } from "react"
import ProjectCard from "./project-card"

interface Project {
	title: string
	url: string
	technologies: string[]
	stack: string
	description: string[]
	imgs: string[]
	video: string
}

interface ProjectsGridProps {
	projects: Project[]
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
	const [bigIndex, setBigIndex] = useState(0)

	if (!projects || projects.length === 0) {
		return <div>No projects found.</div>
	}

	// Handy mod function to avoid negative indexes
	const mod = (n: number, m: number) => ((n % m) + m) % m

	const nextProject = () => {
		setBigIndex((prev) => mod(prev + 1, projects.length))
	}

	const prevProject = () => {
		setBigIndex((prev) => mod(prev - 1, projects.length))
	}

	// The big (featured) project
	const bigProject = projects[bigIndex]

	// Next four projects (just for demonstration)
	// If you have fewer than 5 projects total, you can adjust how to display them.
	const smallProjects: Project[] = []
	for (let i = 1; i <= 4; i++) {
		smallProjects.push(projects[mod(bigIndex + i, projects.length)])
	}

	return (
		<div>
			{/* Controls */}
			<div style={{ marginBottom: "1rem" }}>
				<button onClick={prevProject}>Prev</button>
				<button onClick={nextProject} style={{ marginLeft: "0.5rem" }}>
					Next
				</button>
			</div>

			{/* Layout */}
			<div style={{ display: "flex" }}>
				{/* Left Column: Big Card */}
				<div style={{ width: "50%", marginRight: "1rem" }}>
					{/* You might pass in an extra prop to tell ProjectCard to show “as much info as possible.” */}
					<ProjectCard project={bigProject} />
				</div>

				{/* Right Column: 2x2 grid of mini cards */}
				<div
					style={{
						width: "50%",
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gridTemplateRows: "1fr 1fr",
						gap: "1rem",
					}}
				>
					{smallProjects.map((sp, idx) => (
						<ProjectCard project={sp} key={idx} />
					))}
				</div>
			</div>
		</div>
	)
}

export default ProjectsGrid
