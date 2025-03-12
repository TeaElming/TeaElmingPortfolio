/** @format */

import React, { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import ProgressBar from "react-bootstrap/ProgressBar"
import "./css/Education.css"
import { UniversityData, Year } from "../../components/page-sections/pretty/types"

const EducationP: React.FC = () => {
	const [edinburghData, setEdinburghData] = useState<UniversityData | null>(
		null
	)
	const [linnaeusData, setLinnaeusData] = useState<UniversityData | null>(null)

	const [searchQueryLNU, setSearchQueryLNU] = useState("")
	const [searchQueryEDI, setSearchQueryEDI] = useState("")

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
			<div key={yearData.year} className="education-entry">
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

  //--------------------------------------------------------------------------------
  // Calculate progress for Comp Sci Degree
	const now = Date.now()
	const degreeStart = new Date("2022-08-29").getTime()
	const degreeEnd = new Date("2025-06-20").getTime()
	const progress = ((now - degreeStart) / (degreeEnd - degreeStart)) * 100
  //--------------------------------------------------------------------------------

	return (
		<Container className="education-container">

			<div className="degree-info">
				<div className="uni-section">
					<h5>Computer Science</h5>
					<h6>Linnaeus University (Sep 2022 – Jun 2025)</h6>
					<ProgressBar now={progress} label={`${progress.toFixed(2)}%`} />
				</div>
				<div className="uni-section">
					<h5>Primary Education with Mathematics </h5>
					<h6>University of Edinburgh (Sep 2016 – Jun 2020)</h6>
					<ProgressBar now={100} label={`100%`} />
				</div>
			</div>

			<div className="courses-section">
				<div className="uni-group">
					<input
						type="text"
						className="course-search-input"
						placeholder="Search Linnaeus courses..."
						value={searchQueryLNU}
						onChange={(e) => setSearchQueryLNU(e.target.value)}
					/>
					<div className="scrollable-column">
						{renderCourses(filterCourses(linnaeusData, searchQueryLNU))}
					</div>
				</div>

				<div className="uni-group">
					<input
						type="text"
						className="course-search-input"
						placeholder="Search Edinburgh courses..."
						value={searchQueryEDI}
						onChange={(e) => setSearchQueryEDI(e.target.value)}
					/>
					<div className="scrollable-column">
						{renderCourses(filterCourses(edinburghData, searchQueryEDI))}
					</div>
				</div>
			</div>
		</Container>
	)
}

export default EducationP
