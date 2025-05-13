/** @format */
import React, { useState } from "react"
import { FaEnvelope, FaLinkedin, FaGithub, FaPhone  } from "react-icons/fa"
import RequestCallForm from "../../../components/forms/request-call-form"
import "./css/MobileAbout.css"

const MobileAbout: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <section id="about" className="mobile-about">
      <h2>About Me</h2>
      <p>
							I am a soon-to-be Computer Science-graduate who thrives in challenging
							environments that require problem-solving and continuous learning.
      </p>

      <h3>Skills & Technologies</h3>
      <ul className="skills-list">
        <li>
          <strong>Frontend:</strong> HTML5, CSS3, JavaScript, React,
								Bootstrap, TypeScript, D3.js, JFreeChart, Recharts, Leaflet
        </li>
        <li>
          <strong>Backend:</strong> Node.js, Express, Python, Java,
								Microservices, JWT Authentication
        </li>
        <li>
          <strong>Testing:</strong> Jest, Test-Driven Development (TDD),
								Unit Testing, Postman
        </li>
        <li>
          <strong>Cloud & DevOps:</strong> OpenStack, Terraform, Ansible,
								Docker, Kubernetes, Infrastructure as Code (IaC), CI/CD
        </li>
        <li>
          <strong>APIs:</strong> RESTful API Development (HATEOAS), API
								Documentation, GraphQL (usage only)
        </li>
        <li>
          <strong>Databases:</strong> MongoDB, MySQL, Database Design and
								Management
        </li>
        <li>
          <strong>Software Principles:</strong> Object-Oriented
								Programming, Design Patterns, UML, SOLID Principles, Clean Code
								Practices, Dependency Injection
        </li>
      </ul>

      <h3>Contact</h3>
      <div className="contact-lines">
        <a href="mailto:tea.elming@gmail.com">
          <FaEnvelope /> tea.elming@gmail.com
        </a>

        <button className="call-btn" onClick={() => setOpen(true)}>
          <FaPhone /> Request a Call
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
