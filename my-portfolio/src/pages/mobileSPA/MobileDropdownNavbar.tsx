/** @format */
import "./css/MobileDropdownNavbar.css"
import Form from "react-bootstrap/Form"

interface MobileDropdownNavbarProps {
	theme: string
	toggleTheme: () => void
	onNavigate: (id: string) => void
	isOpen: boolean
	toggleMenu: () => void
}

const MobileDropdownNavbar: React.FC<MobileDropdownNavbarProps> = ({
	theme,
	toggleTheme,
	onNavigate,
	isOpen,
	toggleMenu,
}) => {
	return (
		<>
			<div className="mobile-navbar">
				<button className="menu-toggle" onClick={toggleMenu}>
					☰ Menu
				</button>

				<div className="theme-toggle">
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

			{isOpen && (
				<div className="mobile-dropdown">
					{["start", "projects", "education", "about"].map((id) => (
						<div
							key={id}
							className="dropdown-item"
							onClick={() => onNavigate(id)}
						>
							{`${id.charAt(0).toUpperCase()}${id.slice(1)}`}
						</div>
					))}
				</div>
			)}
		</>
	)
}

export default MobileDropdownNavbar
