/** @format */
import { Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"

import FooterB from "./FooterB"
import "./css/Navbar.css"

const NavbarB = () => {
	return (
		<div className="navbarB">
			<div className="nav-items">
				<Nav className="flex-column">
					<ul>
						<li>
							<Nav.Link as={NavLink} to="/">
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

			{/* Footer pinned at bottom via flex rules */}
			<FooterB />
		</div>
	)
}

export default NavbarB
