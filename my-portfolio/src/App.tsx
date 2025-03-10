/** @format */

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom"
import { useState, useEffect } from "react"
import React from "react"
import Form from "react-bootstrap/Form"

import "./App.css"

import StartP from "./pages/pretty/Start"
import EducationP from "./pages/pretty/Education"
import ExperienceP from "./pages/pretty/Experience"

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

	// Apply theme + version to <html> attributes
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme)
		document.documentElement.setAttribute("data-version", version)
	}, [theme, version])

	// Wrap all the actual route + location logic in a subcomponent
	return (
		<Router>
			<AppContent
				theme={theme}
				version={version}
				toggleTheme={toggleTheme}
				toggleVersion={toggleVersion}
			/>
		</Router>
	)
}

interface AppContentProps {
	theme: string
	version: "prettier" | "bare"
	toggleTheme: () => void
	toggleVersion: () => void
}

function AppContent({
	theme,
	version,
	toggleTheme,
	toggleVersion,
}: AppContentProps) {
	const location = useLocation()

	useEffect(() => {
		if (location.pathname === "/") {
			document.documentElement.setAttribute("data-page", "start")
		} else {
			document.documentElement.setAttribute("data-page", "other")
		}
	}, [location])

	// Cursor glow effect
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

	// Separate route objects for "prettier" vs. "bare"
	const routes = {
		prettier: {
			Start: StartP,
			Education: EducationP,
			Experience: ExperienceP,
		},
		bare: {
			Start: StartP,
			Education: EducationP,
			Experience: ExperienceP,
		},
	}

	return (
		<>
			{/* Toggle container */}
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

			{/* Navbar */}
			<PortfolioNavbar />

			{/* Cursor glow element */}
			<div id="cursor-glow" className="cursor-glow"></div>

			{/* Main content */}
			<div className="content-container">
				<Routes>
					<Route
						path="/"
						element={React.createElement(routes[version].Start)}
					/>

					<Route
						path="/education"
						element={React.createElement(routes[version].Education)}
					/>
					<Route
						path="/experience"
						element={React.createElement(routes[version].Experience)}
					/>
					{/* Add more routes as needed */}
				</Routes>
			</div>

			{/* Footer */}
			<PortfolioFooter />
		</>
	)
}

export default App
