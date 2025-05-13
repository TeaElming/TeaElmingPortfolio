/** @format */

import React, { useState } from "react"
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa"
import RequestCallForm from "../../components/forms/request-call-form"
import "./css/About.css"


const AboutB: React.FC = () => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <div className="aboutB-container">
      <div className="aboutB-content">
        <section className="aboutB-info">
          <div className="aboutB-intro">
            <p>
							I am a soon-to-be Computer Science-graduate who thrives in challenging
							environments that require problem-solving and continuous learning.
            </p>
          </div>
          <section className="aboutB-skills">
            <h2>Skills & Technologies</h2>
            <div className="skills-grid">
              <p>
                <strong>Frontend:</strong> HTML5, CSS3, JavaScript, React,
								Bootstrap, TypeScript, D3.js, JFreeChart, Recharts, Leaflet
              </p>
              <p>
                <strong>Backend:</strong> Node.js, Express, Python, Java,
								Microservices, JWT Authentication
              </p>
              <p>
                <strong>Testing:</strong> Jest, Test-Driven Development (TDD),
								Unit Testing, Postman
              </p>
              <p>
                <strong>Cloud & DevOps:</strong> OpenStack, Terraform, Ansible,
								Docker, Kubernetes, Infrastructure as Code (IaC), CI/CD
              </p>
              <p>
                <strong>APIs:</strong> RESTful API Development (HATEOAS), API
								Documentation, GraphQL (usage only)
              </p>
              <p>
                <strong>Databases:</strong> MongoDB, MySQL, Database Design and
								Management
              </p>
              <p>
                <strong>Software Principles:</strong> Object-Oriented
								Programming, Design Patterns, UML, SOLID Principles, Clean Code
								Practices, Dependency Injection
              </p>
            </div>
          </section>
        </section>
        <aside className="aboutB-contact">
          <h2>Contact & CV</h2>
          <p>
            <strong>Email:</strong> <FaEnvelope />{" "}
            <a href="mailto:tea.elming@gmail.com">tea.elming@gmail.com</a>
          </p>
          <p>
            <strong>Phone:</strong> <FaWhatsapp />{" "}
            <a
              href="https://wa.me/447706687781"
              target="_blank"
              rel="noopener noreferrer"
            >
							Phone through WhatsApp
            </a>{" "}
						or{" "}
            <span onClick={openModal} className="request-call-link">
							Request a Call
            </span>
          </p>
          <p>
            <strong>LinkedIn:</strong> <FaLinkedin />{" "}
            <a
              href="https://www.linkedin.com/in/tea-elming/"
              target="_blank"
              rel="noopener noreferrer"
            >
							Tea Elming
            </a>
          </p>
          <p>
            <strong>GitHub:</strong> <FaGithub />{" "}
            <a
              href="https://github.com/TeaElming"
              target="_blank"
              rel="noopener noreferrer"
            >
							Tea Elming
            </a>
          </p>
          <a
            className="cv-link"
            href="/TeaElming_GraduateSoftwareDeveloper.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
						View CV
          </a>

          {showModal && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-button" onClick={closeModal}>
									&times;
                </button>
                <RequestCallForm />
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

export default AboutB
