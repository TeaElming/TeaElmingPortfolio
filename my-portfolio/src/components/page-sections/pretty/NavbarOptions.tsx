/** @format */

import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Collapse from "react-bootstrap/Collapse"

import "./css/NavbarOptions.css"

interface NavbarDropdownProps {
	onToggle?: (isOpen: boolean) => void
}

function NavbarDropdown({ onToggle }: NavbarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
    if (onToggle) {
      onToggle(!isOpen)
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
  }, [isOpen, onToggle])

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
            {["/", "/projects", "/education", "/about"].map((path) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={location.pathname === path ? "active-link" : ""}
                  style={{
                    pointerEvents: location.pathname === path ? "none" : "auto",
                    color: location.pathname === path ? "gray" : "black",
                  }}
                >
                  {path === "/"
                    ? "Home"
                    : path.replace("/", "").charAt(0).toUpperCase() +
										  path.slice(2)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Collapse>
    </div>
  )
}

export default NavbarDropdown
