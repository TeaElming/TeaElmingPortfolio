/** @format */

import React, { useState } from "react"

interface EasterEggProps {
	child?: React.ReactNode
	hoverText?: string
}

const EasterEgg: React.FC<EasterEggProps> = ({ child, hoverText }) => {
	const [isBroken, setIsBroken] = useState(false)
	const [showPopup, setShowPopup] = useState(false)

	const handleClick = () => {
		setIsBroken(true)
		setShowPopup(true)
	}

	const handleClose = () => {
		setShowPopup(false)
		setIsBroken(false)
	}

	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			<div
				title={hoverText || "Click for an Easter egg treat"}
				onClick={handleClick}
				style={{ cursor: "pointer" }}
			>
				<img
					src={isBroken ? "/imgs/brokenEasterEgg.png" : "/imgs/easterEgg.png"}
					alt="Easter Egg"
					style={{ width: "100px", height: "auto" }}
				/>
			</div>

			{showPopup && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(0,0,0,0.5)",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: 9999,
					}}
					onClick={handleClose}
				>
					<div
						onClick={(e) => e.stopPropagation()}
						style={{
							backgroundColor: "white",
							padding: "20px",
							borderRadius: "8px",
							minWidth: "300px",
							minHeight: "200px",
						}}
					>
						{child || <div style={{ textAlign: "center" }}>Surprise!</div>}
					</div>
				</div>
			)}
		</div>
	)
}

export default EasterEgg
