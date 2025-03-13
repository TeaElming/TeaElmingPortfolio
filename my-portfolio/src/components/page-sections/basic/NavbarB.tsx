/** @format */

import { Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import "./css/Navbar.css"

const NavbarB = () => {
	return (
		<div className="navbarB">
			<Nav className="flex-column">
				<ul>
					<li>
						<Nav.Link as={NavLink} to="/start">
							Start
						</Nav.Link>
					</li>
					<li>
						<Nav.Link as={NavLink} to="/education">
							Education
						</Nav.Link>
					</li>
					<li>
						<Nav.Link as={NavLink} to="/projects">
							Projects
						</Nav.Link>
					</li>
					<li>
						<Nav.Link as={NavLink} to="/about">
							About
						</Nav.Link>
					</li>
				</ul>
			</Nav>
		</div>
	)
}

export default NavbarB
