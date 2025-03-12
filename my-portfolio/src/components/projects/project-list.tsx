/** @format */

import React, { useState, useEffect } from "react"
import ProjectCard, { ProjectData } from "./project-card"
import "./css/project-list.css"

interface ProjectsCarouselProps {
	filter: string
}

const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ filter }) => {
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

	// Reset index when the filter changes
	useEffect(() => {
		setCurrentIndex(0)
	}, [filter])

	// Filter projects based on the selected filter
	const filteredProjects =
		filter === "all"
			? projects
			: projects.filter(
					(project) => project.stack.toLowerCase() === filter.toLowerCase()
			  )

	if (projects.length === 0) {
		return <div>Loading projects...</div>
	}

	if (filteredProjects.length === 0) {
		return <div>No projects found.</div>
	}

	const total = filteredProjects.length

	const next = () => {
		setCurrentIndex((prev) => (prev + 1) % total)
	}

	const prev = () => {
		setCurrentIndex((prev) => (prev - 1 + total) % total)
	}

	const goToIndex = (index: number) => {
		setCurrentIndex(index)
	}

	// Show up to 3 preview cards, but not more than available (excluding the current project)
	const previewCount = 3
	const numberOfPreviews = Math.min(previewCount, total - 1)
	const previews = []
	for (let i = 1; i <= numberOfPreviews; i++) {
		const index = (currentIndex + i) % total
		previews.push(
			<div
				key={index}
				className="preview-card"
				onClick={() => goToIndex(index)}
			>
				<h4>{filteredProjects[index].title}</h4>
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
					<ProjectCard project={filteredProjects[currentIndex]} />
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
