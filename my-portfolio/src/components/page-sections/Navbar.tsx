/** @format */

import { useState, useCallback } from "react"
import Nav from "react-bootstrap/Nav"
import NavbarDropdown from "./NavbarOptions"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

import "./css/Navbar.css"

function PortfolioNavbar() {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [isHovering, setIsHovering] = useState(false)

	const handleDropdownToggle = useCallback((isOpen: boolean) => {
		setDropdownOpen(isOpen)
	}, [])

	return (
		<Nav
			variant="underline"
			defaultActiveKey="/start"
			className="d-flex flex-row align-items-center"
		>
			<Nav.Item>
				<OverlayTrigger
					placement="bottom"
					overlay={<Tooltip>Menu</Tooltip>}
					show={isHovering || dropdownOpen} // <-- Fix: Dropdown only shows when hovering or open
				>
					<div
						style={{ display: "inline-block" }}
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
					>
						<NavbarDropdown onToggle={handleDropdownToggle} />
					</div>
				</OverlayTrigger>
			</Nav.Item>

			<Nav.Item>
				<OverlayTrigger
					placement="bottom"
					overlay={<Tooltip>LinkedIn</Tooltip>}
				>
					<Nav.Link
						href="https://www.linkedin.com/in/tea-elming/"
						target="_blank"
					>
						<i className="bi bi-linkedin"></i>
					</Nav.Link>
				</OverlayTrigger>
			</Nav.Item>

			<Nav.Item>
				<OverlayTrigger placement="bottom" overlay={<Tooltip>GitHub</Tooltip>}>
					<Nav.Link href="https://github.com/TeaElming" target="_blank">
						<i className="bi bi-github"></i>
					</Nav.Link>
				</OverlayTrigger>
			</Nav.Item>
		</Nav>
	)
}

export default PortfolioNavbar
