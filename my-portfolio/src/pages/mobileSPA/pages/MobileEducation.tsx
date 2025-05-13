/** @format */
import React, { useEffect, useState } from "react"
import type { UniversityData, Year } from "../../../components/page-sections/pretty/types"
import "./css/MobileEducation.css"

const MobileEducation: React.FC = () => {
  const [uni, setUni] = useState<UniversityData[]>([])
  const [active, setActive] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    Promise.all([
      fetch("/json/linnaeusUni.json").then((r) => r.json()),
      fetch("/json/edinburghUni.json").then((r) => r.json()),
    ])
      .then(setUni)
      .catch(console.error)
  }, [])

  const filterCourses = (data: Year[], query: string) => {
    const lower = query.toLowerCase()
    return data
      .map((year) => ({
        ...year,
        courses: year.courses.filter(
          (c) =>
            c.coursename.toLowerCase().includes(lower) ||
            c.description.toLowerCase().includes(lower)
        ),
      }))
      .filter((year) => year.courses.length > 0)
  }

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

      {uni.map((u) => {
        const isActive = active === u.university
        const visibleCourses = isActive
          ? filterCourses(u.years, searchQuery)
          : []

        return (
          <div key={u.university} className="uni-block">
            <button
              className="uni-toggle"
              onClick={() => {
                setSearchQuery("")
                setActive(isActive ? null : u.university)
              }}
            >
              {u.programme} – {u.university}
              <span className="chevron">{isActive ? "▲" : "▼"}</span>
            </button>

            {isActive && (
              <div className="courses-wrapper">
                <input
                  type="text"
                  className="course-search-input"
                  placeholder="Search courses…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {renderCourses(visibleCourses)}
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}

export default MobileEducation
