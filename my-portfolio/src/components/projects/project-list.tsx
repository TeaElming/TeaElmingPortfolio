/** @format */

import React, { useState, useEffect } from "react"
import ProjectCard, { ProjectData } from "./project-card"
import "./css/project-list.css"

const ProjectsCarousel: React.FC = () => {
	const [projects, setProjects] = useState<ProjectData[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		fetch("/json/projects.json")
			.then((response) => response.json())
			.then((data) => {
				setProjects(data.projects)
			})
			.catch((error) => {
				console.error("Error fetching projects:", error)
			})
	}, [])

	if (projects.length === 0) {
		return <div>Loading projects...</div>
	}

	const total = projects.length

	const next = () => {
		setCurrentIndex((prev) => (prev + 1) % total)
	}

	const prev = () => {
		setCurrentIndex((prev) => (prev - 1 + total) % total)
	}

	const goToIndex = (index: number) => {
		setCurrentIndex(index)
	}

	const previewCount = 3
	const previews = []
	for (let i = 1; i <= previewCount; i++) {
		const index = (currentIndex + i) % total
		previews.push(
			<div
				key={index}
				className="preview-card"
				onClick={() => goToIndex(index)}
			>
				<h4>{projects[index].title}</h4>
			</div>
		)
	}

	return (
		<div className="carousel-container">
			<div className="carousel-main">
				<button className="nav-button prev-button" onClick={prev}>
					Prev
				</button>
				<div className="project-display">
					<ProjectCard project={projects[currentIndex]} />
					<div className="counter">
						{currentIndex + 1}/{total}
					</div>
				</div>
				<button className="nav-button next-button" onClick={next}>
					Next
				</button>
			</div>
			<div className="carousel-previews">{previews}</div>
		</div>
	)
}

export default ProjectsCarousel
