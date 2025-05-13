/** @format */
import { Nav } from "react-bootstrap"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

const FooterB = () => {
  return (
    <footer className="footerB">
      {/* LinkedIn */}
      <Nav.Item>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-linkedIn">LinkedIn</Tooltip>}
          trigger={["hover", "focus"]}
        >
          <Nav.Link
            href="https://www.linkedin.com/in/tea-elming/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-linkedin"></i>
          </Nav.Link>
        </OverlayTrigger>
      </Nav.Item>

      {/* GitHub */}
      <Nav.Item>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>GitHub</Tooltip>}
          trigger={["hover", "focus"]}
        >
          <Nav.Link
            href="https://github.com/TeaElming"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-github"></i>
          </Nav.Link>
        </OverlayTrigger>
      </Nav.Item>

      {/* CV */}
      <Nav.Item>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>CV</Tooltip>}
          trigger={["hover", "focus"]}
        >
          <Nav.Link
            href="/TeaElming_GraduateSoftwareDeveloper.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-person-vcard"></i>
          </Nav.Link>
        </OverlayTrigger>
      </Nav.Item>
    </footer>
  )
}

export default FooterB
