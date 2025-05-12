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
import { Navigate } from "react-router-dom"
import Form from "react-bootstrap/Form"

import "./App.css"

import StartP from "./pages/pretty/Start"
import EducationP from "./pages/pretty/Education"
import ProjectsP from "./pages/pretty/Projects"
import AboutP from "./pages/pretty/About"

import BasicLayout from "./pages/basic/BasicLayout"

import PortfolioNavbar from "./components/page-sections/pretty/Navbar"
import PortfolioFooter from "./components/page-sections/pretty/Footer"

import MobileSPA from "./pages/mobileSPA/MobileSPA"

function isMobileDevice(): boolean {
	return /android|iphone|ipad|ipod|windows phone/i.test(navigator.userAgent)
}

function App() {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")
	const [version, setVersion] = useState<"prettier" | "bare">(
		(localStorage.getItem("version") as "prettier" | "bare") || "bare"
	)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)
	// const [isMobileView, setIsMobileView] = useState(
		//window.innerWidth < 1024 || isMobileDevice()
	//)
  const [isMobileView, setIsMobileView] = useState(false) // Force desktop view just for now for testing


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

// useEffect(() => {
// 	const handleResize = () => {
// 		const newWidth = window.innerWidth
// 		setWindowWidth(newWidth)
// 		setIsMobileView(newWidth < 1024 || isMobileDevice())
// 	}
// 	handleResize()
// 	window.addEventListener("resize", handleResize)
// 	return () => window.removeEventListener("resize", handleResize)
// }, [])


	return (
		<Router>
			{isMobileView ? (
				<MobileSPA theme={theme} toggleTheme={toggleTheme} />
			) : (
				<AppContent
					theme={theme}
					version={version}
					toggleTheme={toggleTheme}
					toggleVersion={toggleVersion}
					windowWidth={windowWidth}
					isMobileView={isMobileView}
				/>
			)}
		</Router>
	)
}

interface AppContentProps {
	theme: string
	version: "prettier" | "bare"
	toggleTheme: () => void
	toggleVersion: () => void
	windowWidth: number
	isMobileView: boolean
}

function AppContent({
	theme,
	version,
	toggleTheme,
	toggleVersion,
	windowWidth,
	isMobileView,
}: AppContentProps) {
	const location = useLocation()

	useEffect(() => {
		if (location.pathname === "/") {
			document.documentElement.setAttribute("data-page", "start")
		} else {
			document.documentElement.setAttribute("data-page", "other")
		}
	}, [location])

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

	return (
		<>
			{!(
				version === "bare" &&
				windowWidth < 1100 &&
				location.pathname !== "/"
			) && (
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
					{/* Only show version toggle if not in mobile view */}
					{!isMobileView && (
						<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
							<span>Personal</span>
							<Form.Check
								type="switch"
								id="version-switch"
								checked={version === "bare"}
								onChange={toggleVersion}
								style={{ margin: 0 }}
							/>
							<span>Neutral</span>
						</div>
					)}

					{/* Always show theme toggle */}
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
			)}

			{version === "prettier" && <PortfolioNavbar />}

			<div id="cursor-glow" className="cursor-glow"></div>

			<div className="content-container">
				<Routes>
					{version === "bare" ? (
						<>
							<Route path="/start" element={<Navigate to="/" replace />} />
							<Route path="/*" element={<BasicLayout />} />
						</>
					) : (
						<>
							<Route path="/" element={<StartP />} />
							<Route path="/education" element={<EducationP />} />
							<Route path="/projects" element={<ProjectsP />} />
							<Route path="/about" element={<AboutP />} />
						</>
					)}
				</Routes>
			</div>

			{version === "prettier" && <PortfolioFooter />}
		</>
	)
}

export default App
