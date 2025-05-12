/** @format */

import React from "react"
import VideoPlayer from "./VideoPlayer" 

const SparringHobby: React.FC = () => {
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

      <VideoPlayer
        baseSrc="/imgs/easterEggs/sparringJaiphet"
        title="Muay Thai Sparring"
      />
    </div>
  )
}

export default SparringHobby
