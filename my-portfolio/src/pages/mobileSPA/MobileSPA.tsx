/** @format */
import { useState } from "react"

import MobileStart from "./pages/MobileStart"
import MobileProjects from "./pages/MobileProjects"
import MobileEducation from "./pages/MobileEducation"
import MobileAbout from "./pages/MobileAbout"

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

      <div id="start">
        <MobileStart />
      </div>
      <div id="projects">
        <MobileProjects />
      </div>
      <div id="education">
        <MobileEducation />
      </div>
      <div id="about">
        <MobileAbout />
      </div>
    </div>
  )
}

export default MobileSPA
