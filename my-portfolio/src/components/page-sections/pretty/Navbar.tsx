/** @format */

import { Link, useLocation } from "react-router-dom"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

import "./css/Navbar.css"

function PortfolioNavbar() {
  const location = useLocation()

  return (
    <nav className="portfolio-nav">
      {/* ── LEFT: page links ───────────────────── */}
      <div className="nav-links">
        {[
          { to: "/", label: "Home" },
          { to: "/projects", label: "Projects" },
          { to: "/education", label: "Education" },
          { to: "/about", label: "About" },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={
              location.pathname === to ? "nav-item active-link" : "nav-item"
            }
          >
            {label}
          </Link>
        ))}
      </div>

      {/* ── CENTRE: social / CV icons ──────────── */}
      <div className="nav-icons">
        <OverlayTrigger placement="bottom" overlay={<Tooltip>LinkedIn</Tooltip>}>
          <a
            href="https://www.linkedin.com/in/tea-elming/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-linkedin" />
          </a>
        </OverlayTrigger>

        <OverlayTrigger placement="bottom" overlay={<Tooltip>GitHub</Tooltip>}>
          <a
            href="https://github.com/TeaElming"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-github" />
          </a>
        </OverlayTrigger>

        <OverlayTrigger placement="bottom" overlay={<Tooltip>CV</Tooltip>}>
          <a
            href="/TeaElming_GraduateSoftwareDeveloper.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-person-vcard" />
          </a>
        </OverlayTrigger>
      </div>
    </nav>
  )
}

export default PortfolioNavbar
