/** @format */

import { useState, useCallback } from "react"
import Nav from "react-bootstrap/Nav"
import NavbarDropdown from "./NavbarOptions"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

function PortfolioNavbar() {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [isHovering, setIsHovering] = useState(false)

	const handleDropdownToggle = useCallback((isOpen: boolean) => {
		setDropdownOpen(isOpen)
	}, [])

	return (
		<Nav variant="underline" defaultActiveKey="/home">
			<Nav.Item>
				<OverlayTrigger
					placement="bottom"
					overlay={<Tooltip>Menu</Tooltip>}
					show={isHovering && !dropdownOpen}
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
