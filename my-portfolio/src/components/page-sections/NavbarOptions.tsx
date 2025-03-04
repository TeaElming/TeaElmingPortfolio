/** @format */

import { useState, useEffect, useRef } from "react"
import Button from "react-bootstrap/Button"
import Collapse from "react-bootstrap/Collapse"

import "./css/NavbarOptions.css"

interface NavbarDropdownProps {
	onToggle?: (isOpen: boolean) => void // Define onToggle prop with correct type
}

function NavbarDropdown({ onToggle }: NavbarDropdownProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [currentUrl, setCurrentUrl] = useState(window.location.pathname)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const toggleDropdown = () => {
		const newState = !isOpen
		setIsOpen(newState)
		if (onToggle) {
			onToggle(newState)
		}
	}

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
				if (onToggle) {
					onToggle(false)
				}
			}
		}

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside)
		} else {
			document.removeEventListener("mousedown", handleClickOutside)
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [isOpen, onToggle]) // Includes onToggle in dependencies

	// Close dropdown when a link is clicked
	const handleLinkClick = (url: string) => {
		setCurrentUrl(url)
		setIsOpen(false)
		if (onToggle) {
			onToggle(false)
		}
	}

	return (
		<div ref={dropdownRef} style={{ position: "relative" }}>
			<Button
				onClick={toggleDropdown}
				aria-controls="example-collapse-text"
				aria-expanded={isOpen}
				className="navbar-button"
			>
				<i className="bi bi-list"></i>
			</Button>
			<Collapse in={isOpen}>
				<div id="example-collapse-text" className="navbar-dropdown">
					<ul>
						{["/", "/education", "/projects", "/experience", "/contact"].map(
							(path) => (
								<li key={path}>
									<a
										href={path}
										onClick={() => handleLinkClick(path)}
										className={currentUrl === path ? "active-link" : ""}
										style={{
											pointerEvents: currentUrl === path ? "none" : "auto",
											color: currentUrl === path ? "gray" : "black",
										}}
									>
										{path === "/"
											? "Home"
											: path.replace("/", "").charAt(0).toUpperCase() +
											  path.slice(2)}
									</a>
								</li>
							)
						)}
					</ul>
				</div>
			</Collapse>
		</div>
	)
}

export default NavbarDropdown
