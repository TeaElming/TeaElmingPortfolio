/** @format */
import React from "react"

import "./css/Footer.css"

const PortfolioFooter: React.FC = () => {
  return (
    <footer className="custom-footer">
      <p>© Tea Elming {new Date().getFullYear()} </p>
    </footer>
  )
}

export default PortfolioFooter
