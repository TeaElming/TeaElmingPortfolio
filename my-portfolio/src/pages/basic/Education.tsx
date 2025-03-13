/** @format */

import React, { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import ProgressBar from "react-bootstrap/ProgressBar"

import "./css/Education.css"

import { UniversityData } from "../../components/page-sections/pretty/types"

const EducationB: React.FC = () => {
	const [edinburghData, setEdinburghData] = useState<UniversityData | null>(
		null
	)
	const [linnaeusData, setLinnaeusData] = useState<UniversityData | null>(null)


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


  //--------------------------------------------------------------------------------
  // Calculate progress for Comp Sci Degree
	const now = Date.now()
	const degreeStart = new Date("2022-08-29").getTime()
	const degreeEnd = new Date("2025-06-20").getTime()
	const progress = ((now - degreeStart) / (degreeEnd - degreeStart)) * 100
  //--------------------------------------------------------------------------------

	return (
		<Container className="educationB-container">
			<div className="degreeB-info">
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
		</Container>
	)
}

export default EducationB