/** @format */

import { Link, useLocation } from "react-router-dom"

import "./css/Navbar.css"

import Game from "../../game/JumpingGame"
import EasterEgg from "../../easter-egg/EasterEgg"

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
        <EasterEgg child={<Game username={""} />} hoverText="Bored?" />
      </div>
    </nav>
  )
}

export default PortfolioNavbar
