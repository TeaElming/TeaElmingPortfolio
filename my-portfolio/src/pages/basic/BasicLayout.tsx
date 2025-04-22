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

	// When the URL changes (via a nav click), scroll to the proper section
	useEffect(() => {
		const path =
			location.pathname === "/" ? "start" : location.pathname.slice(1)
		const element = document.getElementById(path)
		if (element) {
			// Set a flag so the observer ignores updates during programmatic scroll
			isScrollingRef.current = true
			element.scrollIntoView({ behavior: "smooth" })
			// Clear the flag after scrolling (adjust the timeout as needed)
			setTimeout(() => {
				isScrollingRef.current = false
			}, 1000)
		}
	}, [location])

	// Use IntersectionObserver to update the URL when scrolling manually
	useEffect(() => {
		const sections = document.querySelectorAll(".full-page")
		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 0.6,
		}

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			// If we're in the middle of a programmatic scroll, ignore observer events.
			if (isScrollingRef.current) return

			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.getAttribute("id")
					if (id) {
						const targetPath = id === "start" ? "/" : `/${id}`
						if (location.pathname !== targetPath) {
							navigate(targetPath, { replace: true })
						}
					}
				}
			})
		}

		const observer = new IntersectionObserver(observerCallback, options)
		sections.forEach((section) => observer.observe(section))
		return () => {
			observer.disconnect()
		}
	}, [location, navigate])

	return (
		<div style={{ display: "flex" }}>
			<NavbarB />
			<div style={{ marginLeft: "220px", flex: 1 }}>
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
