/** @format */
import React, { useState } from "react"
import ProjectCard from "./project-card"
import "./css/project-list.css"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

interface Project {
	title: string
	url: string
	technologies: string[]
	stack: string
	description: string[]
	imgs: string[]
	video: string
}

interface ProjectsCarouselProps {
	projects: Project[]
}

const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ projects }) => {
	const [bigIndex, setBigIndex] = useState(0)

	if (!projects || projects.length === 0) {
		return <div>No projects found.</div>
	}

	// Handy mod function to ensure we wrap around properly
	const mod = (n: number, m: number) => ((n % m) + m) % m

	const nextProject = () => {
		setBigIndex((prev) => mod(prev + 1, projects.length))
	}

	const prevProject = () => {
		setBigIndex((prev) => mod(prev - 1, projects.length))
	}

	// The featured project
	const bigProject = projects[bigIndex]

	// Next four projects for the 2x2 preview grid
	const previewProjects: Project[] = []
	for (let i = 1; i <= 4; i++) {
		previewProjects.push(projects[mod(bigIndex + i, projects.length)])
	}

	return (
		<Container fluid style={{ height: "100%" }}>
			<Row className="project-carousel" style={{ height: "100%" }}>
				{/* Left Column: Featured Project + Navigation */}
				<Col md={6} style={{ height: "100%" }}>
					<div className="big-project" style={{ height: "100%" }}>
						<ProjectCard project={bigProject} variant="big" />
						<div className="navigation-buttons">
							<button onClick={prevProject}>Previous</button>
							<button onClick={nextProject}>Next</button>
						</div>
					</div>
				</Col>
				{/* Right Column: 2x2 Grid of Previews */}
				<Col md={6} style={{ height: "100%" }}>
					<div className="preview-projects" style={{ height: "100%" }}>
						<Row style={{ height: "50%" }}>
							{previewProjects.slice(0, 2).map((project, index) => (
								<Col key={index} xs={6}>
									<ProjectCard project={project} variant="small" />
								</Col>
							))}
						</Row>
						<Row style={{ height: "50%" }}>
							{previewProjects.slice(2, 4).map((project, index) => (
								<Col key={index} xs={6}>
									<ProjectCard project={project} variant="small" />
								</Col>
							))}
						</Row>
					</div>
				</Col>
			</Row>
		</Container>
	)
}

export default ProjectsCarousel
