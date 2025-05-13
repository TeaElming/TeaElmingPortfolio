/** @format */
import React, { useEffect, useState } from "react"
import type {
  UniversityData,
  Year,
} from "../../../components/page-sections/pretty/types"
import "./css/MobileEducation.css"

const MobileEducation: React.FC = () => {
  const [uni, setUni] = useState<UniversityData[]>([])
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      fetch("/json/linnaeusUni.json").then((r) => r.json()),
      fetch("/json/edinburghUni.json").then((r) => r.json()),
    ])
      .then(setUni)
      .catch(console.error)
  }, [])

  const renderCourses = (years: Year[]) =>
    years.map((y) => (
      <div key={y.year} className="year-block">
        <h4>Year {y.year}</h4>
        {y.courses.map((c, idx) => (
          <p key={idx} className="course-line">
            <strong>{c.coursename}</strong> – {c.description}
          </p>
        ))}
      </div>
    ))

  return (
    <section id="education" className="mobile-education">
      <h2>Education</h2>

      {uni.map((u) => (
        <div key={u.university} className="uni-block">
          <button
            className="uni-toggle"
            onClick={() =>
              setActive(active === u.university ? null : u.university)
            }
          >
            {u.university}
            <span className="chevron">
              {active === u.university ? "▲" : "▼"}
            </span>
          </button>

          {active === u.university && (
            <div className="courses-wrapper">{renderCourses(u.years)}</div>
          )}
        </div>
      ))}
    </section>
  )
}

export default MobileEducation
