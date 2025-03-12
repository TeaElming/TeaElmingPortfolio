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

	// Handles when the dropdown is toggled
	const handleDropdownToggle = useCallback((isOpen: boolean) => {
		setDropdownOpen(isOpen)

		// Ensure the tooltip disappears when the dropdown opens
		if (isOpen) {
			setIsHovering(false)
		}
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
					show={!dropdownOpen && isHovering} // ✅ Fix: Hide tooltip if dropdown is open
				>
					<div
						style={{ display: "inline-block" }}
						onMouseEnter={() => !dropdownOpen && setIsHovering(true)} // ✅ Prevents tooltip from appearing when dropdown is open
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

			<Nav.Item>
				<OverlayTrigger placement="bottom" overlay={<Tooltip>CV</Tooltip>}>
					<Nav.Link
						href="/TeaElming_GraduateSoftwareDeveloper.pdf"
						target="_blank"
					>
						<i className="bi bi-person-vcard"></i>
					</Nav.Link>
				</OverlayTrigger>
			</Nav.Item>
		</Nav>
	)
}

export default PortfolioNavbar
