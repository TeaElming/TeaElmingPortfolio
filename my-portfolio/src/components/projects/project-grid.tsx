import React, { useState, useEffect, useRef } from "react"
import ProjectCard, { ProjectData } from "./project-card"
import "./css/project-grid.css"
import "./css/project-card.css"

type FilterType = "all" | "fullstack" | "frontend" | "backend"

const WIDTH_RATIO = 0.28 // approx 3 tiles wide
const HEIGHT_RATIO = 0.4 // approx 2 tiles high
const TILE_GAP = 20
const MIN_TILE_WIDTH = 200 // Minimum width in pixels
const MIN_TILE_HEIGHT = 150 // Minimum height in pixels
const MAX_PROJECTS_PER_PAGE = 6 // 3×2 grid

const ProjectGrid: React.FC = () => {
	const [projects, setProjects] = useState<ProjectData[]>([])
	const [selectedProject, setSelectedProject] = useState<number | null>(null)
	const [currentPage, setCurrentPage] = useState(0)
	const [projectsPerPage, setProjectsPerPage] = useState(MAX_PROJECTS_PER_PAGE)
	const [filter, setFilter] = useState<FilterType>("all")

	const containerRef = useRef<HTMLDivElement>(null)

	// When modal opens/closes, update body class
	useEffect(() => {
		const body = document.querySelector("body")
		if (selectedProject !== null) {
			body?.classList.add("modal-open")
		} else {
			body?.classList.remove("modal-open")
		}
		// Cleanup in case component unmounts while modal is open.
		return () => body?.classList.remove("modal-open")
	}, [selectedProject])

	useEffect(() => {
		fetch("/json/projects.json")
			.then((response) => response.json())
			.then((data) => setProjects(data.projects))
			.catch((error) => console.error("Error fetching projects:", error))
	}, [])

	// Reset page when filter changes
	useEffect(() => {
		setCurrentPage(0)
	}, [filter])

	// Filter projects based on selected filter.
	const filteredProjects = projects.filter((project) => {
		if (filter === "all") return true
		return project.stack.toLowerCase() === filter
	})

	useEffect(() => {
		const updateProjectsPerPage = () => {
			if (!containerRef.current) return

			const width = containerRef.current.offsetWidth
			const height = containerRef.current.offsetHeight

			// Calculate tile dimensions based on ratios.
			let tileWidth = width * WIDTH_RATIO
			let tileHeight = height * HEIGHT_RATIO

			// Enforce minimum dimensions.
			tileWidth = Math.max(tileWidth, MIN_TILE_WIDTH)
			tileHeight = Math.max(tileHeight, MIN_TILE_HEIGHT)

			// Calculate max columns/rows that fit without overflowing.
			const columns = Math.min(3, Math.floor(width / (tileWidth + TILE_GAP)))
			const rows = Math.min(2, Math.floor(height / (tileHeight + TILE_GAP)))

			const calculatedProjectsPerPage = Math.min(
				columns * rows,
				MAX_PROJECTS_PER_PAGE
			)
			setProjectsPerPage(calculatedProjectsPerPage)
			setCurrentPage(0) // Reset page on resize.
		}

		updateProjectsPerPage()
		window.addEventListener("resize", updateProjectsPerPage)
		return () => window.removeEventListener("resize", updateProjectsPerPage)
	}, [])

	const totalPages = Math.max(
		Math.ceil(filteredProjects.length / projectsPerPage),
		1
	)

	const nextPage = () => {
		if (currentPage < totalPages - 1) {
			setCurrentPage((p) => p + 1)
		}
	}

	const prevPage = () => {
		if (currentPage > 0) {
			setCurrentPage((p) => p - 1)
		}
	}

	const openProject = (index: number) => setSelectedProject(index)
	const closeProject = () => setSelectedProject(null)

	const startIndex = currentPage * projectsPerPage
	const currentProjects = filteredProjects.slice(
		startIndex,
		startIndex + projectsPerPage
	)

	// Get container dimensions.
	const containerWidth = containerRef.current?.offsetWidth ?? 0
	const containerHeight = containerRef.current?.offsetHeight ?? 0

	return (
		<div className="project-grid-container" ref={containerRef}>
			{/* Filter Buttons */}
			<div className="filter-buttons">
				<button
					className={filter === "all" ? "active" : ""}
					onClick={() => setFilter("all")}
				>
					View All
				</button>
				<button
					className={filter === "fullstack" ? "active" : ""}
					onClick={() => setFilter("fullstack")}
				>
					Fullstack
				</button>
				<button
					className={filter === "frontend" ? "active" : ""}
					onClick={() => setFilter("frontend")}
				>
					Frontend
				</button>
				<button
					className={filter === "backend" ? "active" : ""}
					onClick={() => setFilter("backend")}
				>
					Backend
				</button>
			</div>

			{/* Navigation Arrows */}
			{totalPages > 1 && (
				<button
					className="grid-nav prev"
					onClick={prevPage}
					disabled={currentPage === 0}
				>
					&larr;
				</button>
			)}

			<div className="project-grid">
				{currentProjects.length === 0 ? (
					<p>No projects found.</p>
				) : (
					currentProjects.map((project, i) => {
						const thisTileWidth = Math.max(
							containerWidth * WIDTH_RATIO,
							MIN_TILE_WIDTH
						)
						const thisTileHeight = Math.max(
							containerHeight * HEIGHT_RATIO,
							MIN_TILE_HEIGHT
						)

						const tileStyle = {
							width: `${thisTileWidth}px`,
							height: `${thisTileHeight}px`,
							marginRight: `${TILE_GAP}px`,
							marginBottom: `${TILE_GAP}px`,
						}

						return (
							<div
								key={startIndex + i}
								className="project-tile"
								style={tileStyle}
								onClick={() => openProject(startIndex + i)}
							>
								<h4 className="project-title">{project.title}</h4>
								<p className="project-stack">{project.stack}</p>
								<div className="project-technologies">
									{project.technologies.map((tech, index) => (
										<span key={index} className="project-tech">
											{tech}
										</span>
									))}
								</div>
								<div className="hover-overlay">
									<p>{project.description.join(" ").slice(0, 150)}...</p>
								</div>
							</div>
						)
					})
				)}
			</div>

			{totalPages > 1 && (
				<button
					className="grid-nav next"
					onClick={nextPage}
					disabled={currentPage === totalPages - 1}
				>
					&rarr;
				</button>
			)}

			{selectedProject !== null && (
				<div className="project-modal-overlay" onClick={closeProject}>
					<div className="project-modal" onClick={(e) => e.stopPropagation()}>
						<ProjectCard project={projects[selectedProject]} />
						<div className="modal-nav">
							<button
								onClick={() =>
									setSelectedProject(
										(prev) => (prev! - 1 + projects.length) % projects.length
									)
								}
							>
								&lt; Prev
							</button>
							<button
								onClick={() =>
									setSelectedProject((prev) => (prev! + 1) % projects.length)
								}
							>
								Next &gt;
							</button>
						</div>
						<button className="modal-close" onClick={closeProject}>
							&times;
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default ProjectGrid
