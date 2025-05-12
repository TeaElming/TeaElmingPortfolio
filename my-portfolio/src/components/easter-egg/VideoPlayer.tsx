/** @format */

import React, { useRef } from "react"

interface VideoPlayerProps {
  baseSrc: string
  title?: string
  poster?: string 
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ baseSrc, title, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const getVideoSrc = () => `${baseSrc}.mp4`

  return (
    <div
      style={{
        maxWidth: "100%",
        padding: "1rem",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      {title && <h3>{title}</h3>}

      <video
        ref={videoRef}
        src={getVideoSrc()}
        preload="metadata" // Only loads metadata, not full video
        controls
        poster={poster} // Shows a preview image before playing if provided
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

export default VideoPlayer
