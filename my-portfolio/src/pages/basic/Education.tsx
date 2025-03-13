/** @format */
import React, { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import ProgressBar from "react-bootstrap/ProgressBar"
import "./css/Education.css"
import {
	UniversityData,
	Year,
} from "../../components/page-sections/pretty/types"

const EducationB: React.FC = () => {
	const [edinburghData, setEdinburghData] = useState<UniversityData | null>(null)
	const [linnaeusData, setLinnaeusData] = useState<UniversityData | null>(null)
	const [searchQuery, setSearchQuery] = useState("")
	const [activeUniversity, setActiveUniversity] = useState<string | null>(null)

	useEffect(() => {
		fetch("/json/edinburghUni.json")
			.then((res) => res.json())
			.then(setEdinburghData)
			.catch(console.error)

		fetch("/json/linnaeusUni.json")
			.then((res) => res.json())
			.then(setLinnaeusData)
			.catch(console.error)
	}, [])

	if (!edinburghData || !linnaeusData) return <p>Loading...</p>

	const filterCourses = (data: UniversityData, query: string) => {
		const lowerQuery = query.toLowerCase()
		return data.years
			.map((year) => ({
				...year,
				courses: year.courses.filter(
					(course) =>
						course.coursename.toLowerCase().includes(lowerQuery) ||
						course.description.toLowerCase().includes(lowerQuery)
				),
			}))
			.filter((year) => year.courses.length > 0)
	}

	const renderCourses = (data: Year[]) =>
		data.map((yearData: Year) => (
			<div key={yearData.year} className="educationB-entry">
				<h4 className="year-title"> --- Year {yearData.year} --- </h4>
				{yearData.courses.map((course, idx) => (
					<div key={idx} className="course-entry">
						<h5>
							{course.coursename}{" "}
							<i>
								({course.credits} credits, {course.field})
							</i>
						</h5>
						<p>{course.description}</p>
					</div>
				))}
			</div>
		))

	// Calculate progress for Comp Sci Degree
	const now = Date.now()
	const degreeStart = new Date("2022-08-29").getTime()
	const degreeEnd = new Date("2025-06-20").getTime()
	const progress = ((now - degreeStart) / (degreeEnd - degreeStart)) * 100

	// Toggle course visibility
	const handleToggleCourses = (university: string) => {
		if (activeUniversity === university) {
			setActiveUniversity(null) // Close if already open
		} else {
			setActiveUniversity(university) // Open if not open
		}
	}

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

			{/* Conditionally render the course section */}
			{activeUniversity && (
				<div className="coursesB-section">
					<div className="uniB-group">
						<input
							type="text"
							className="course-search-input"
							placeholder="Search courses..."
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
