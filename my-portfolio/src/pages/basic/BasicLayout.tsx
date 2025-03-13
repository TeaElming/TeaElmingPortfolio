/** @format */
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import StartB from "./Start"
import EducationB from "./Education"
import ProjectsB from "./Projects"
import AboutB from "./About"
import NavbarB from "../../components/page-sections/basic/NavbarB"
import "./css/BasicLayout.css"

const BasicLayout = () => {
	const location = useLocation()

	useEffect(() => {
		// Map "/" to "start"
		const path =
			location.pathname === "/" ? "start" : location.pathname.slice(1)
		const element = document.getElementById(path)
		if (element) {
			element.scrollIntoView({ behavior: "smooth" })
		}
	}, [location])

	return (
		<div style={{ display: "flex" }}>
			<NavbarB />
			<div style={{ marginLeft: "220px", flex: 1 }}>
				<section id="start" className="full-page">
					<StartB />
				</section>
				<section id="education" className="full-page">
					<EducationB />
				</section>
				<section id="projects" className="full-page">
					<ProjectsB />
				</section>
				<section id="about" className="full-page">
					<AboutB />
				</section>
			</div>
		</div>
	)
}

export default BasicLayout
