/** @format */

import React, { useState } from "react"
import "./css/EasterEgg.css"

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
    <div className="easter-egg-container">
      <div
        title={hoverText || "Click for an Easter egg treat"}
        onClick={handleClick}
        className="easter-egg-click"
      >
        <img
          src={isBroken ? "/imgs/brokenEasterEgg.png" : "/imgs/easterEgg.png"}
          alt="Easter Egg"
          className="easter-egg-img"
        />
      </div>
      {showPopup && (
        <div className="easter-egg-popup-overlay" onClick={handleClose}>
          <div
            className="easter-egg-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            {child || <div className="easter-egg-surprise">Surprise!</div>}
          </div>
        </div>
      )}
    </div>
  )
}

export default EasterEgg
