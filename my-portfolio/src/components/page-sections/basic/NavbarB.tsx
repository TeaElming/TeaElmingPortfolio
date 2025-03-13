/** @format */
import { Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const NavbarB = () => {
	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "200px",
				height: "100vh",
				background: "#f8f9fa",
				padding: "1rem",
			}}
		>
			<Nav className="flex-column">
				<Nav.Link as={Link} to="/start">
					Start
				</Nav.Link>
				<Nav.Link as={Link} to="/education">
					Education
				</Nav.Link>
				<Nav.Link as={Link} to="/projects">
					Projects
				</Nav.Link>
				<Nav.Link as={Link} to="/about">
					About
				</Nav.Link>
			</Nav>
		</div>
	)
}

export default NavbarB
