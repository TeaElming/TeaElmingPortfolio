/** @format */
import React from "react"
import "./css/ArrowNavigation.css"

interface ArrowNavigationProps {
	currentSection: string
	onNavigate: (direction: "up" | "down" | "top" | "bottom") => void
}

const sectionsOrder = ["start", "projects", "education", "about"]
const sectionNames: Record<string, string> = {
  start: "Start",
  projects: "Projects",
  education: "Education",
  about: "About",
}

const ArrowNavigation: React.FC<ArrowNavigationProps> = ({ currentSection, onNavigate }) => {
  const currentIndex = sectionsOrder.indexOf(currentSection)

  const showUp = currentIndex > 0
  const showDown = currentIndex < sectionsOrder.length - 1

  const nextUp = currentIndex > 0 ? sectionsOrder[currentIndex - 1] : null
  const nextDown = currentIndex < sectionsOrder.length - 1 ? sectionsOrder[currentIndex + 1] : null

  return (
    <div className="arrow-navigation">
      {showUp && (
        <>
          <button
            className="arrow-button double-up"
            onClick={() => onNavigate("top")}
            aria-label="Go to Top"
            title="Go to Start"
          >
						⇑
          </button>
          <button
            className="arrow-button up"
            onClick={() => onNavigate("up")}
            aria-label="Previous Section"
            title={`Go to ${sectionNames[nextUp!]}`}
          >
						↑
          </button>
        </>
      )}
      {showDown && (
        <>
          <button
            className="arrow-button down"
            onClick={() => onNavigate("down")}
            aria-label="Next Section"
            title={`Go to ${sectionNames[nextDown!]}`}
          >
						↓
          </button>
          <button
            className="arrow-button double-down"
            onClick={() => onNavigate("bottom")}
            aria-label="Go to Bottom"
            title="Go to About"
          >
						⇓
          </button>
        </>
      )}
    </div>
  )
}

export default ArrowNavigation
