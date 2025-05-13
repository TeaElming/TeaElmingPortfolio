/** @format */
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import StartB from "./Start"
import EducationB from "./Education"
import ProjectsB from "./Projects"
import AboutB from "./About"
import NavbarB from "../../components/page-sections/basic/NavbarB"
import ArrowNavigation from "../../components/page-sections/basic/ArrowNavigation"
import "./css/BasicLayout.css"

const sectionsOrder = ["start", "projects", "education", "about"]

const BasicLayout = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const isScrollingRef = useRef(false)
	const initialSection =
		location.pathname === "/" ? "start" : location.pathname.slice(1)
	const [currentSection, setCurrentSection] = useState<string>(initialSection)
  

	// Scroll to the section when the URL changes
	useEffect(() => {
		const path =
			location.pathname === "/" ? "start" : location.pathname.slice(1)
		const element = document.getElementById(path)
		if (element) {
			isScrollingRef.current = true
			element.scrollIntoView({ behavior: "smooth", block: "start" })
			setTimeout(() => {
				isScrollingRef.current = false
			}, 500)
		}
	}, [location])

	// Observe which section is most visible
	useEffect(() => {
		const sections = document.querySelectorAll(".full-page")
		const observer = new IntersectionObserver(
			(entries) => {
				if (isScrollingRef.current) return

				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)

				if (visible.length > 0) {
					const topSection = visible[0].target as HTMLElement
					const id = topSection.getAttribute("id")
					if (id) {
						setCurrentSection(id)
						const targetPath = id === "start" ? "/" : `/${id}`
						if (location.pathname !== targetPath) {
							navigate(targetPath, { replace: true })
						}
					}
				}
			},
			{
				threshold: 0.6,
			}
		)

		sections.forEach((section) => observer.observe(section))
		return () => observer.disconnect()
	}, [location, navigate])

	const handleArrowNavigation = (
		direction: "up" | "down" | "top" | "bottom"
	) => {
		let newIndex = sectionsOrder.indexOf(currentSection)

		if (direction === "up" && newIndex > 0) newIndex--
		if (direction === "down" && newIndex < sectionsOrder.length - 1) newIndex++
		if (direction === "top") newIndex = 0
		if (direction === "bottom") newIndex = sectionsOrder.length - 1

		const nextId = sectionsOrder[newIndex]
		const element = document.getElementById(nextId)
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" })

			// Immediate update for double navigation to keep URL and navbar in sync
			if (direction === "top" || direction === "bottom") {
				setCurrentSection(nextId)
				const targetPath = nextId === "start" ? "/" : `/${nextId}`
				if (location.pathname !== targetPath) {
					navigate(targetPath, { replace: true })
				}
			}
		}
	}

	return (
		<div style={{ display: "flex" }}>
			<NavbarB />
			<div
				className="content-scroll-container"
				style={{ marginLeft: "220px", flex: 1 }}
			>
				<section id="start" className="full-page">
					<StartB />
				</section>
				<section id="projects" className="full-page">
					<ProjectsB />
				</section>
				<section id="education" className="full-page">
					<EducationB />
				</section>
				<section id="about" className="full-page">
					<AboutB />
				</section>
			</div>
			<ArrowNavigation
				currentSection={currentSection}
				onNavigate={handleArrowNavigation}
			/>
		</div>
	)
}

export default BasicLayout
