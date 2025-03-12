/** @format */

import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import StartB from "./Start"
import EducationB from "./Education"
import ProjectsB from "./Projects"
import AboutB from "./About"
import "./css/BasicLayout.css"

// Keep pageNames outside the component to avoid re-creating it on every render
const PAGE_NAMES = ["start", "education", "projects", "about"]

export default function BasicLayout() {
	const sections = useRef<HTMLDivElement[]>([])
	const location = useLocation()
	const navigate = useNavigate()

	// Scroll to correct section if user navigates directly
	useEffect(() => {
		const path = location.pathname.replace("/", "") || "start"
		const index = PAGE_NAMES.indexOf(path)
		if (index >= 0 && sections.current[index]) {
			sections.current[index].scrollIntoView({ behavior: "smooth" })
		}
	}, [location])

	// Use Intersection Observer to detect which section is in view
	useEffect(() => {
		const observerOptions = {
			// Once 60% of a section is visible, consider it the “active” section
			threshold: 0.6,
		}

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					// Find index of the target in sections array
					const targetIndex = sections.current.findIndex(
						(sec) => sec === entry.target
					)
					if (targetIndex !== -1) {
						const sectionName = PAGE_NAMES[targetIndex]
						const newPath = sectionName === "start" ? "/" : `/${sectionName}`

						// Only navigate if not already on that route
						if (location.pathname !== newPath) {
							navigate(newPath, { replace: true })
						}

						// Optionally add a CSS class for fade-in
						entry.target.classList.add("in-view")
					}
				} else {
					// Remove the fade-in class if out of view
					entry.target.classList.remove("in-view")
				}
			})
		}, observerOptions)

		// Capture current sections in a local const,
		// so the cleanup unobserves the same elements
		const localSections = sections.current
		localSections.forEach((section) => observer.observe(section))

		return () => {
			localSections.forEach((section) => observer.unobserve(section))
		}
	}, [navigate, location.pathname]) // We don't need PAGE_NAMES here since it's top-level

	// Helper to set the ref
	const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
		if (el) sections.current[index] = el
	}

	return (
		<div
			style={{
				height: "100vh",
				overflowY: "scroll",
				scrollSnapType: "y mandatory",
			}}
		>
			<div
				ref={setSectionRef(0)}
				className="snap-section fade-section"
				style={{
					height: "100vh",
					scrollSnapAlign: "start",
				}}
			>
				<StartB />
			</div>
			<div
				ref={setSectionRef(1)}
				className="snap-section fade-section"
				style={{
					height: "100vh",
					scrollSnapAlign: "start",
				}}
			>
				<EducationB />
			</div>
			<div
				ref={setSectionRef(2)}
				className="snap-section fade-section"
				style={{
					height: "100vh",
					scrollSnapAlign: "start",
				}}
			>
				<ProjectsB />
			</div>
			<div
				ref={setSectionRef(3)}
				className="snap-section fade-section"
				style={{
					height: "100vh",
					scrollSnapAlign: "start",
				}}
			>
				<AboutB />
			</div>
		</div>
	)
}
