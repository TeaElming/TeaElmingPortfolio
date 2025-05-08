/** @format */

import React from "react"

const FavouriteGift: React.FC = () => {
	return (
		<div
			style={{
				maxWidth: "100%",
				padding: "1rem",
				boxSizing: "border-box",
				textAlign: "center",
			}}
		>
			<h3>One of my favourite birthday gifts: a chainsaw.</h3>
			<p>
				Having a chainsaw made the task of preparing my logs for chopping
				significantly easier and more pleasant. Previously, all logs had to be
				hand sawn to the correct size before being chopped for firewood.
				Switching from a handsaw to a chainsaw felt like going from manually
				parsing JSON strings to using <code>fetch()</code> with{" "}
				<code>async/await</code> — cleaner, faster, and far less likely to make
				me question my life choices.
			</p>

			<img
				src="/imgs/easterEggs/cutWood.jpg"
				alt="Picture of a pile of cut up logs next to a chainsaw."
				style={{
					width: "100%",
					height: "auto",
					borderRadius: "8px",
					maxHeight: "40vh",
					objectFit: "contain",
					margin: "1rem 0",
				}}
			/>
		</div>
	)
}

export default FavouriteGift
