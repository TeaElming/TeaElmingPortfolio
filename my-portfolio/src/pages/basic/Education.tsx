/** @format */
import React, { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import ProgressBar from "react-bootstrap/ProgressBar"
import "./css/Education.css"
import type {
  UniversityData,
  Year,
} from "../../components/page-sections/pretty/types"

const EducationB: React.FC = () => {
  const [edinburghData, setEdinburghData] = useState<UniversityData | null>(
    null
  )
  const [linnaeusData, setLinnaeusData] = useState<UniversityData | null>(null)

  /* new: start with Linnaeus open */
  const [activeUniversity, setActiveUniversity] = useState<string>("linnaeus")
  const [searchQuery, setSearchQuery] = useState("")

  /* ─── Fetch data ─────────────────────────── */
  useEffect(() => {
    fetch("/json/edinburghUni.json")
      .then((r) => r.json())
      .then(setEdinburghData)
      .catch(console.error)

    fetch("/json/linnaeusUni.json")
      .then((r) => r.json())
      .then(setLinnaeusData)
      .catch(console.error)
  }, [])

  if (!edinburghData || !linnaeusData) return <p>Loading...</p>

  /* ─── Utils ──────────────────────────────── */
  const filterCourses = (data: UniversityData, q: string) => {
    const lower = q.toLowerCase()
    return data.years
      .map((y) => ({
        ...y,
        courses: y.courses.filter(
          (c) =>
            c.coursename.toLowerCase().includes(lower) ||
						c.description.toLowerCase().includes(lower)
        ),
      }))
      .filter((y) => y.courses.length > 0)
  }

  const renderCourses = (yrs: Year[]) =>
    yrs.map((y) => (
      <div key={y.year} className="educationB-entry">
        <h4 className="year-title">Year {y.year}</h4>
        {y.courses.map((c, idx) => (
          <div key={idx} className="course-entry">
            <h5>
              {c.coursename}{" "}
              <i>
								({c.credits} credits, {c.field})
              </i>
            </h5>
            <p>{c.description}</p>
          </div>
        ))}
      </div>
    ))

  /* ─── Progress bar for CS degree ─────────── */
  const now = Date.now()
  const progress =
		((now - new Date("2022-08-29").getTime()) /
			(new Date("2025-06-20").getTime() - new Date("2022-08-29").getTime())) *
		100

  /* ─── Toggle course visibility ───────────── */
  const handleToggleCourses = (uni: string) => {
    if (activeUniversity === uni) {
      setActiveUniversity("") // close
    } else {
      setActiveUniversity(uni) // switch/open
    }
    setSearchQuery("") // reset search whenever we toggle
  }

  /* ─── Render ─────────────────────────────── */
  return (
    <Container className="educationB-container">
      <div className="degreeB-info">
        <div className="uniB-section">
          <h5>Computer Science</h5>
          <h6>Linnaeus University (Sep 2022 – Jun 2025)</h6>
          <ProgressBar now={progress} label={`${progress.toFixed(2)}%`} />
          <button onClick={() => handleToggleCourses("linnaeus")}>
            {activeUniversity === "linnaeus" ? "Hide Courses" : "View Courses"}
          </button>
        </div>

        <div className="uniB-section">
          <h5>Primary Education with Mathematics</h5>
          <h6>University of Edinburgh (Sep 2016 – Jun 2020)</h6>
          <ProgressBar now={100} label="100%" />
          <button onClick={() => handleToggleCourses("edinburgh")}>
            {activeUniversity === "edinburgh" ? "Hide Courses" : "View Courses"}
          </button>
        </div>
      </div>

      {activeUniversity && (
        <div className="coursesB-section">
          <div className="uniB-group">
            <input
              type="text"
              className="course-search-input"
              placeholder="Search courses…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="scrollable-column">
              {activeUniversity === "linnaeus" &&
								renderCourses(filterCourses(linnaeusData, searchQuery))}
              {activeUniversity === "edinburgh" &&
								renderCourses(filterCourses(edinburghData, searchQuery))}
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

export default EducationB
