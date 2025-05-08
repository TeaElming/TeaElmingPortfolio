/** @format */

import React, { useRef } from "react"

const SparringHobby: React.FC = () => {
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
      <h3>One of my favourite past times.</h3>
      <p>
        I have been training different martial arts for over 20 years. I have been lucky enough to get to spend a lot of time in Thailand the past few years, training Muay Thai daily. Great for fitness — and a surprisingly accurate metaphor for debugging: take hits, stay calm, and remember it's all part of the process.
      </p>

      <video
        ref={videoRef}
        src="/imgs/easterEggs/sparringJaiphet.mp4"
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

export default SparringHobby
