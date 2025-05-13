/** @format */
import React from "react"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import "./css/Footer.css"

const PortfolioFooter: React.FC = () => {
  return (
    <footer className="custom-footer">
      <p className="footer-left">© Tea Elming {new Date().getFullYear()}</p>

      <div className="nav-icons">
        <OverlayTrigger placement="top" overlay={<Tooltip>LinkedIn</Tooltip>}>
          <a
            href="https://www.linkedin.com/in/tea-elming/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-linkedin" />
          </a>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={<Tooltip>GitHub</Tooltip>}>
          <a
            href="https://github.com/TeaElming"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-github" />
          </a>
        </OverlayTrigger>

        <OverlayTrigger placement="top" overlay={<Tooltip>CV</Tooltip>}>
          <a
            href="/TeaElming_GraduateSoftwareDeveloper.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-person-vcard" />
          </a>
        </OverlayTrigger>
      </div>
    </footer>
  )
}

export default PortfolioFooter
