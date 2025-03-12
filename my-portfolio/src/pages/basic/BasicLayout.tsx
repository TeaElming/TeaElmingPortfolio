/** @format */
import React, { useEffect, useMemo, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import StartB from "./Start"
import EducationB from "./Education"
import ProjectsB from "./Projects"
import AboutB from "./About"

const BasicLayout: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()

	// Create refs for each section
	const startRef = useRef<HTMLDivElement>(null)
	const educationRef = useRef<HTMLDivElement>(null)
	const projectsRef = useRef<HTMLDivElement>(null)
	const aboutRef = useRef<HTMLDivElement>(null)

	// Ref flag to track manual navigation so observer doesn't override it
	const isManualNav = useRef(false)

	// Memoize the sections array to satisfy ESLint and avoid unnecessary re-renders
	const sections = useMemo(
		() => [
			{ path: "/", ref: startRef },
			{ path: "/education", ref: educationRef },
			{ path: "/projects", ref: projectsRef },
			{ path: "/about", ref: aboutRef },
		],
		[startRef, educationRef, projectsRef, aboutRef]
	)

	// On route change, scroll the matching section into view
	useEffect(() => {
		const section = sections.find((sec) => sec.path === location.pathname)
		if (section && section.ref.current) {
			section.ref.current.scrollIntoView({ behavior: "smooth" })
		}
	}, [location.pathname, sections])

	// Reset the manual navigation flag after a route change
	useEffect(() => {
		if (isManualNav.current) {
			const timer = setTimeout(() => {
				isManualNav.current = false
			}, 500)
			return () => clearTimeout(timer)
		}
	}, [location.pathname])

	// Update URL when a section becomes visible using IntersectionObserver,
	// but skip if a manual navigation is in progress.
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isManualNav.current) {
						const currentSection = sections.find(
							(sec) => sec.ref.current === entry.target
						)
						if (currentSection && currentSection.path !== location.pathname) {
							navigate(currentSection.path, { replace: true })
						}
					}
				})
			},
			{ threshold: 0.6 }
		)

		sections.forEach((sec) => {
			if (sec.ref.current) observer.observe(sec.ref.current)
		})

		return () => {
			sections.forEach((sec) => {
				if (sec.ref.current) observer.unobserve(sec.ref.current)
			})
		}
	}, [navigate, location.pathname, sections])

	// Styles for the layout container and each section
	const containerStyle: React.CSSProperties = {
		height: "100vh",
		overflowY: "scroll",
		scrollSnapType: "y mandatory",
	}

	const sectionStyle: React.CSSProperties = {
		height: "100vh",
		scrollSnapAlign: "start",
	}

	// Style for the left-hand navigation menu
	const navStyle: React.CSSProperties = {
		position: "fixed",
		left: "10px",
		top: "50%",
		transform: "translateY(-50%)",
		zIndex: 1000,
	}

	const navListStyle: React.CSSProperties = {
		listStyleType: "none",
		padding: 0,
		margin: 0,
	}

	const navItemStyle: React.CSSProperties = {
		marginBottom: "10px",
	}

	return (
		<>
			{/* Left-hand navigation */}
			<nav style={navStyle}>
				<ul style={navListStyle}>
					<li style={navItemStyle}>
						<button
							onClick={() => {
								isManualNav.current = true
								navigate("/")
							}}
							style={{ cursor: "pointer" }}
						>
							Start
						</button>
					</li>
					<li style={navItemStyle}>
						<button
							onClick={() => {
								isManualNav.current = true
								navigate("/education")
							}}
							style={{ cursor: "pointer" }}
						>
							Education
						</button>
					</li>
					<li style={navItemStyle}>
						<button
							onClick={() => {
								isManualNav.current = true
								navigate("/projects")
							}}
							style={{ cursor: "pointer" }}
						>
							Projects
						</button>
					</li>
					<li style={navItemStyle}>
						<button
							onClick={() => {
								isManualNav.current = true
								navigate("/about")
							}}
							style={{ cursor: "pointer" }}
						>
							About
						</button>
					</li>
				</ul>
			</nav>

			{/* Main content container */}
			<div style={containerStyle}>
				<div ref={startRef} style={sectionStyle} id="start">
					<StartB />
				</div>
				<div ref={educationRef} style={sectionStyle} id="education">
					<EducationB />
				</div>
				<div ref={projectsRef} style={sectionStyle} id="projects">
					<ProjectsB />
				</div>
				<div ref={aboutRef} style={sectionStyle} id="about">
					<AboutB />
				</div>
			</div>
		</>
	)
}

export default BasicLayout
