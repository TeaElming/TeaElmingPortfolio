/** @format */

import React, { useRef } from "react"
import "./css/VideoPlayer.css"

interface VideoPlayerProps {
	baseSrc: string
	title?: string
	poster?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ baseSrc, title, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const getVideoSrc = () => `${baseSrc}.mp4`

  return (
    <div className="video-player-container">
      {title && <h3 className="video-player-title">{title}</h3>}

      <video
        ref={videoRef}
        src={getVideoSrc()}
        preload="metadata"
        controls
        poster={poster}
        className="video-player-element"
      />
    </div>
  )
}

export default VideoPlayer
