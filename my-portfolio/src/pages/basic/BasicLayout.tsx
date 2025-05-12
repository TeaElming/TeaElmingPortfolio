/** @format */
import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import StartB from "./Start"
import EducationB from "./Education"
import ProjectsB from "./Projects"
import AboutB from "./About"
import NavbarB from "../../components/page-sections/basic/NavbarB"
import "./css/BasicLayout.css"

const BasicLayout = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const isScrollingRef = useRef(false)

	// Scroll to the section when the URL changes
	useEffect(() => {
		const path = location.pathname === "/" ? "start" : location.pathname.slice(1)
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
						const targetPath = id === "start" ? "/" : `/${id}`
						if (location.pathname !== targetPath) {
							navigate(targetPath, { replace: true })
						}
					}
				}
			},
			{
				threshold: 0.6, // must be clearly in view
			}
		)

		sections.forEach((section) => observer.observe(section))
		return () => observer.disconnect()
	}, [location, navigate])

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
		</div>
	)
}

export default BasicLayout
