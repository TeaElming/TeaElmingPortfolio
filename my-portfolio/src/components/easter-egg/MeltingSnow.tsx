/** @format */

import React, { useRef } from "react"

const MeltingSnow: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null)

	const handlePlay = () => videoRef.current?.play()
	const handleStop = () => {
		if (videoRef.current) {
			videoRef.current.pause()
			videoRef.current.currentTime = 0
		}
	}

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
				collecting logs from the barn outside daily. It was like trying to run a modern web app without Node.js — cold, unsupported, and everything took way longer than it should.
			</p>

			<video
				ref={videoRef}
				src="/imgs/easterEggs/meltingSnow.mp4"
				style={{
					width: "100%",
					height: "auto",
					borderRadius: "8px",
					maxHeight: "40vh",
					objectFit: "contain",
					margin: "1rem 0",
				}}
			/>

			<div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
				<button onClick={handlePlay}>Play</button>
				<button onClick={handleStop}>Stop</button>
			</div>
		</div>
	)
}

export default MeltingSnow
