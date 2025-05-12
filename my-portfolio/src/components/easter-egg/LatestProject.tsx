/** @format */

import React from "react"

const LatestProject: React.FC = () => {
	return (
		<div
			style={{
				maxWidth: "100%",
				padding: "1rem",
				boxSizing: "border-box",
				textAlign: "center",
			}}
		>
			<h3>Last summer's non-coding build.</h3>
			<p>
				<i>
					Cutting and sanding 60 slates of timber by hand felt a lot like building a full-stack app without any libraries — technically possible, deeply character-building, but I will never take <code>npm install</code> for granted again.
				</i>
			</p>
			<img
				src="/imgs/easterEggs/deck.jpg"
				alt="Picture of a wooden deck down by a river with sunloungers."
				style={{
					width: "100%",
					height: "auto",
					borderRadius: "8px",
					maxHeight: "40vh",
					objectFit: "contain",
					margin: "1rem 0",
				}}
			/>

			<p>
				<i>
					Note: I did cut the grass and level the ground after the photo had
					been taken...
				</i>
			</p>
		</div>
	)
}

export default LatestProject
