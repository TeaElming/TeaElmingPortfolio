/** @format */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import React from "react"
import Form from "react-bootstrap/Form"

import './App.css'
import Start from "./pages/Start"

import PortfolioNavbar from "./components/page-sections/Navbar"
import PortfolioFooter from "./components/page-sections/Footer"

function App() {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")
	const [version, setVersion] = useState<"prettier" | "bare">(
		(localStorage.getItem("version") as "prettier" | "bare") || "prettier"
	)

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark"
		setTheme(newTheme)
		localStorage.setItem("theme", newTheme)
	}

	const toggleVersion = () => {
		const newVersion = version === "prettier" ? "bare" : "prettier"
		setVersion(newVersion)
		localStorage.setItem("version", newVersion)
	}

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme)
		document.documentElement.setAttribute("data-version", version)
	}, [theme, version])

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const glow = document.getElementById("cursor-glow")
			if (glow) {
				const glowSize = 200
				glow.style.transform = `translate(${e.clientX - glowSize / 2}px, ${
					e.clientY - glowSize / 2
				}px)`
			}
		}

		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	}, [])

	const routes = {
		prettier: { Start },
		bare: {
			Start: Start,
		},
	}

	return (
		<Router>
			<div
				className="toggle-container"
				style={{
					position: "fixed",
					top: "10px",
					right: "10px",
					zIndex: 999,
					display: "flex",
					alignItems: "center",
					gap: "25px",
					fontSize: "0.9rem",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<span>Pretty</span>
					<Form.Check
						type="switch"
						id="version-switch"
						checked={version === "bare"}
						onChange={toggleVersion}
						style={{ margin: 0 }}
					/>
					<span>Basic</span>
				</div>

				<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<span>Light</span>
					<Form.Check
						type="switch"
						id="theme-switch"
						checked={theme === "dark"}
						onChange={toggleTheme}
						style={{ margin: 0 }}
					/>
					<span>Dark</span>
				</div>
			</div>

			<PortfolioNavbar />

			<div id="cursor-glow" className="cursor-glow"></div>

			<div className="content-container">
				<Routes>
					<Route
						path="/"
						element={React.createElement(routes[version].Start)}
					/>
				</Routes>
			</div>

			<PortfolioFooter />
		</Router>
	)
}

export default App
