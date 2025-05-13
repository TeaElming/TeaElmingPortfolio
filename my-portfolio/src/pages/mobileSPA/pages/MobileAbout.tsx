/** @format */
import React, { useState } from "react"
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa"
import RequestCallForm from "../../../components/forms/request-call-form"
import "./css/MobileAbout.css"

const MobileAbout: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <section id="about" className="mobile-about">
      <h2>About Me</h2>
      <p>
				Soon-to-be Computer Science graduate who thrives on problem-solving and
				continuous learning.
      </p>

      <h3>Skills & Technologies</h3>
      <ul className="skills-list">
        <li>
          <strong>Frontend:</strong> React, TypeScript, D3, Leaflet …
        </li>
        <li>
          <strong>Backend:</strong> Node, Python, Java, JWT …
        </li>
        <li>
          <strong>DevOps:</strong> Docker, Kubernetes, Terraform …
        </li>
      </ul>

      <h3>Contact</h3>
      <div className="contact-lines">
        <a href="mailto:tea.elming@gmail.com">
          <FaEnvelope /> tea.elming@gmail.com
        </a>
        <a
          href="https://wa.me/447706687781"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp /> WhatsApp
        </a>
        <button className="call-btn" onClick={() => setOpen(true)}>
					Request a Call
        </button>
        <a
          href="https://www.linkedin.com/in/tea-elming/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin /> LinkedIn
        </a>
        <a
          href="https://github.com/TeaElming"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub /> GitHub
        </a>
        <a
          className="cv-link"
          href="/TeaElming_GraduateSoftwareDeveloper.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
					View CV (PDF)
        </a>
      </div>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setOpen(false)}>
							&times;
            </button>
            <RequestCallForm />
          </div>
        </div>
      )}
    </section>
  )
}

export default MobileAbout
