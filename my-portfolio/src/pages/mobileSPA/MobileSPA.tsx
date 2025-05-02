/** @format */
import { useState } from "react"
import StartB from "../basic/Start"
import EducationB from "../basic/Education"
import ProjectsB from "../basic/Projects"
import AboutB from "../basic/About"
import MobileDropdownNavbar from "./MobileDropdownNavbar"
import "./css/MobileSPA.css"

interface MobileSPAProps {
	theme: string
	toggleTheme: () => void
}

const MobileSPA: React.FC<MobileSPAProps> = ({ theme, toggleTheme }) => {
	const [menuOpen, setMenuOpen] = useState(false)

	const scrollToSection = (id: string) => {
		const el = document.getElementById(id)
		if (el) {
			el.scrollIntoView({ behavior: "smooth", block: "start" })
			setMenuOpen(false)
		}
	}

	return (
		<div className="mobile-spa">
			<MobileDropdownNavbar
				theme={theme}
				toggleTheme={toggleTheme}
				onNavigate={scrollToSection}
				isOpen={menuOpen}
				toggleMenu={() => setMenuOpen(!menuOpen)}
			/>

			<div id="start"><StartB /></div>
			<div id="projects"><ProjectsB /></div>
			<div id="education"><EducationB /></div>
			<div id="about"><AboutB /></div>
		</div>
	)
}

export default MobileSPA
