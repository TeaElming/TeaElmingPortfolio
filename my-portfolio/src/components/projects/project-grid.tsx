/** @format */
import React, { useState, useEffect, useRef } from "react"
import ProjectCard, { ProjectData } from "./project-card"
import "./css/project-grid.css"
import "./css/project-card.css"

const WIDTH_RATIO = 0.28 // 3 tiles wide (approx 30% each)
const HEIGHT_RATIO = 0.4 // 2 tiles high (approx 40% each)
const TILE_GAP = 20
const MIN_TILE_WIDTH = 200 // Minimum width in pixels
const MIN_TILE_HEIGHT = 150 // Minimum height in pixels
const MAX_PROJECTS_PER_PAGE = 6 // 3 wide × 2 high

const ProjectGrid: React.FC = () => {
	const [projects, setProjects] = useState<ProjectData[]>([])
	const [selectedProject, setSelectedProject] = useState<number | null>(null)
	const [currentPage, setCurrentPage] = useState(0)
	const [projectsPerPage, setProjectsPerPage] = useState(MAX_PROJECTS_PER_PAGE)

	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		fetch("/json/projects.json")
			.then((response) => response.json())
			.then((data) => setProjects(data.projects))
			.catch((error) => console.error("Error fetching projects:", error))
	}, [])

	useEffect(() => {
		const updateProjectsPerPage = () => {
			if (!containerRef.current) return

			const width = containerRef.current.offsetWidth
			const height = containerRef.current.offsetHeight

			// Calculate tile dimensions based on ratios
			let tileWidth = width * WIDTH_RATIO
			let tileHeight = height * HEIGHT_RATIO

			// Enforce minimum dimensions
			tileWidth = Math.max(tileWidth, MIN_TILE_WIDTH)
			tileHeight = Math.max(tileHeight, MIN_TILE_HEIGHT)

			// Calculate max columns and rows that fit without overflowing
			const columns = Math.min(3, Math.floor(width / (tileWidth + TILE_GAP)))
			const rows = Math.min(2, Math.floor(height / (tileHeight + TILE_GAP)))

			// At most 6 tiles (3×2) per page
			const calculatedProjectsPerPage = Math.min(
				columns * rows,
				MAX_PROJECTS_PER_PAGE
			)
			setProjectsPerPage(calculatedProjectsPerPage)
			setCurrentPage(0) // reset to first page on resize
		}

		updateProjectsPerPage()
		window.addEventListener("resize", updateProjectsPerPage)
		return () => window.removeEventListener("resize", updateProjectsPerPage)
	}, [])

	const totalPages = Math.max(Math.ceil(projects.length / projectsPerPage), 1)

	const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))
	const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 0))

	const openProject = (index: number) => setSelectedProject(index)
	const closeProject = () => setSelectedProject(null)

	const startIndex = currentPage * projectsPerPage
	const currentProjects = projects.slice(
		startIndex,
		startIndex + projectsPerPage
	)

	// Safely read container size (fallback to 0 if not defined yet)
	const containerWidth = containerRef.current?.offsetWidth ?? 0
	const containerHeight = containerRef.current?.offsetHeight ?? 0

	return (
		<div className="project-grid-container" ref={containerRef}>
			{totalPages > 1 && (
				<button className="grid-nav prev" onClick={prevPage}>
					&larr;
				</button>
			)}

			<div className="project-grid">
				{currentProjects.length === 0 ? (
					<p>No projects found.</p>
				) : (
					currentProjects.map((project, i) => {
						// Style to reflect ratio + minimums, without using non-null assertions:
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
				<button className="grid-nav next" onClick={nextPage}>
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
