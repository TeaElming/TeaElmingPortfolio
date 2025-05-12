/** @format */

import React from "react"
import VideoPlayer from "./VideoPlayer"

const MeltingSnow: React.FC = () => {
	return (
		<div
			style={{
				maxWidth: "100%",
				padding: "1rem",
				boxSizing: "border-box",
				textAlign: "center",
			}}
		>
			<h3>A character-building event.</h3>
			<p>
				I spent a few months in nearly -30°C, in the middle of the Swedish
				Arctic. It was brilliant, until the fuse box broke, leaving us without
				power and heating, causing the water pipes to freeze. Four days were
				spent melting snow on the woodfired stove to get water, cutting and
				collecting logs from the barn outside daily. It was like trying to run a
				modern web app without Node.js — cold, unsupported, and everything took
				way longer than it should.
			</p>

			<VideoPlayer
				baseSrc="/imgs/easterEggs/meltingSnow"
				title="Melting Snow"
			/>
		</div>
	)
}

export default MeltingSnow
