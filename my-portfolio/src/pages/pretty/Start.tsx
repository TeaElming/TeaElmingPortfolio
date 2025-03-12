/** @format */
import React from "react"
import { Link } from "react-router-dom"
import "./css/Start.css"

const StartP: React.FC = () => {
	return (
		<div>
			<div className="startPage-container">
				<h1>Tea Elming</h1>
				<p>Software Developer</p>

				{/* Quick Access Section */}
				<div className="quick-access">
					<Link to="/projects" className="quick-link">Software Projects</Link>

          <Link to="/education" className="quick-link">Education</Link>
          <Link to="/about" className="quick-link">Quick Overview</Link>
				</div>
			</div>

			<div className="startPage-description">
				<p>
					Former primary teacher with a background in Mathematics who thoroughly
					enjoys problem-solving and being technically challenged, thus deciding
					to return to university to study Computer Science.
				</p>
			</div>
		</div>
	)
}

export default StartP
