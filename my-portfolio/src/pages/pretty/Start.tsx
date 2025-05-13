/** @format */
import React from "react"
import { Link } from "react-router-dom"
import "./css/Start.css"

import EasterEgg from "../../components/easter-egg/EasterEgg"
import FavouriteGift from "../../components/easter-egg/FavouriteGift"

const StartP: React.FC = () => {
  return (
    <div className="startPage-container">
      {/* Left Side: Info Text */}
      <div className="startPage-description">
        <p>
					Former primary teacher with a background in Mathematics who thoroughly
					enjoys problem-solving and being technically challenged, thus deciding
					to return to university to study Computer Science.
        </p>
        <p>
					Naturally curious and highly self-motivated, I am comfortable working
					independently to explore solutions but equally enjoy collaborating in
					pairs or teams to share ideas and refine outcomes. I am always keen to
					learn and continuously seek out more effective ways of approaching
					problems.
        </p>
      </div>

      {/* Right Side: Centered Name, Role, Buttons */}
      <div className="right-section">
        <div className="name">Tea Elming</div>
        <div className="role">
					Software Developer{" "}
          <EasterEgg
            child={<FavouriteGift />}
            hoverText="One of my favourite birthday gifts."
          />
        </div>

        <div className="quick-access">
          <Link to="/projects" className="quick-link">
						Software Projects
          </Link>
          <Link to="/education" className="quick-link">
						Education
          </Link>
          <Link to="/about" className="quick-link">
						Quick Overview
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StartP
