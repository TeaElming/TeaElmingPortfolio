/** @format */
import React, { useState, useEffect, useRef } from "react"
import ProjectCard, { ProjectData } from "./project-card"
import "./css/project-grid.css"
import "./css/project-card.css"

type FilterType = "all" | "fullstack" | "frontend" | "backend"

const GAP = 20 // px between tiles
const ARROW_W = 120 // left+right space reserved for arrows
const MIN_SIZE = 400 // min tile (square)  px
const MAX_SIZE = 700 // max tile (square)  px

const ProjectGrid: React.FC = () => {
	const [projects, setProjects] = useState<ProjectData[]>([])
	const [filter, setFilter] = useState<FilterType>("all")
	const [selected, setSelected] = useState<number | null>(null)

	/* paging */
	const [cols, setCols] = useState(3) // 3 or 2
	const [tileSize, setTileSize] = useState(MIN_SIZE)
	const [page, setPage] = useState(0)
	const wrapperRef = useRef<HTMLDivElement>(null)

	/* ------------- fetch once -------------- */
	useEffect(() => {
		fetch("/json/projects.json")
			.then((r) => r.json())
			.then((d) => setProjects(d.projects))
			.catch(console.error)
	}, [])

	/* --- lock body scroll when modal open --- */
	useEffect(() => {
		document.body.classList.toggle("modal-open", selected !== null)
		return () => document.body.classList.remove("modal-open")
	}, [selected])

	/* --------------- recalc on resize ------- */
	useEffect(() => {
		const recalc = () => {
			if (!wrapperRef.current) return
			const wrapW = wrapperRef.current.offsetWidth - ARROW_W // usable width

			/* start with 3 columns, fall back to 2 */
			let newCols = 3
			let size = Math.floor((wrapW - GAP * (newCols - 1)) / newCols)

			if (size < MIN_SIZE) {
				newCols = 2
				size = Math.floor((wrapW - GAP) / newCols)
			}
			size = Math.max(MIN_SIZE, Math.min(size, MAX_SIZE))

			setCols(newCols)
			setTileSize(size)
			setPage(0) // reset to first page whenever layout changes
		}

		recalc()
		window.addEventListener("resize", recalc)
		return () => window.removeEventListener("resize", recalc)
	}, [])

	/* --------------- filtering ------------- */
	const shownProjects = projects.filter(
		(p) => filter === "all" || p.stack.toLowerCase() === filter
	)

	const totalPages = Math.max(Math.ceil(shownProjects.length / cols), 1)
	const start = page * cols
	const current = shownProjects.slice(start, start + cols)

	const nav = (dir: "prev" | "next") =>
		setPage((p) =>
			dir === "prev" ? Math.max(p - 1, 0) : Math.min(p + 1, totalPages - 1)
		)

	/* --------------- render --------------- */
	return (
		<div className="project-grid-container">
			{/* filter buttons */}
			<div className="filter-buttons">
				{["all", "fullstack", "frontend", "backend"].map((t) => (
					<button
						key={t}
						className={filter === t ? "active" : ""}
						onClick={() => setFilter(t as FilterType)}
					>
						{t.charAt(0).toUpperCase() + t.slice(1)}
					</button>
				))}
			</div>

			{/* single-row grid with arrows */}
			<div className="project-grid-wrapper" ref={wrapperRef}>
				{totalPages > 1 && (
					<button
						className="grid-nav prev"
						disabled={page === 0}
						onClick={() => nav("prev")}
					>
						&larr;
					</button>
				)}

				<div className="project-row" style={{ gap: GAP }}>
					{current.length === 0 ? (
						<p>No projects found.</p>
					) : (
						current.map((proj, i) => (
							<div
								key={start + i}
								className="project-tile"
								style={{ width: tileSize, height: tileSize }}
								onClick={() => setSelected(start + i)}
							>
								<h4 className="project-title">{proj.title}</h4>
								<p className="project-stack">{proj.stack}</p>
								<div className="project-technologies">
									{proj.technologies.map((tech, idx) => (
										<span key={idx} className="project-tech">
											{tech}
										</span>
									))}
								</div>
								<div className="hover-overlay">
									<p>{proj.description.join(" ").slice(0, 350)}...</p>
								</div>
							</div>
						))
					)}
				</div>

				{totalPages > 1 && (
					<button
						className="grid-nav next"
						disabled={page === totalPages - 1}
						onClick={() => nav("next")}
					>
						&rarr;
					</button>
				)}
			</div>

			{/* modal */}
			{selected !== null && (
				<div
					className="project-modal-overlay"
					onClick={() => setSelected(null)}
				>
					<div className="project-modal" onClick={(e) => e.stopPropagation()}>
						<ProjectCard project={shownProjects[selected]} />
						<div className="modal-nav">
							<button
								onClick={() =>
									setSelected(
										(i) =>
											(i! - 1 + shownProjects.length) % shownProjects.length
									)
								}
							>
								&lt; Prev
							</button>
							<button
								onClick={() =>
									setSelected((i) => (i! + 1) % shownProjects.length)
								}
							>
								Next &gt;
							</button>
						</div>
						<button className="modal-close" onClick={() => setSelected(null)}>
							&times;
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default ProjectGrid
