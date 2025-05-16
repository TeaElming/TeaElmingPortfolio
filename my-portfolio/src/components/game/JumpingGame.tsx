/** @format */

import React, { useEffect, useRef, useState } from "react"
import Scoreboard from "./Scoreboard"
import playerImg  from "../../assets/images/game/playerImg.png"
import objOneImg  from "../../assets/images/game/objOneImg.png"
import objTwoImg  from "../../assets/images/game/objTwoImg.png"
import "./css/Game.css"

interface Obstacle {
  id: number
  type: "one" | "two"
  left: number
}
let idCounter = 0

const Game: React.FC<{ username: string }> = ({ username }) => {
  /* ── state & refs ── */
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused,  setIsPaused]  = useState(false)
  const [playerY,   setPlayerY]   = useState(0)
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [score,     setScore]     = useState(0)
  const [gameOver,  setGameOver]  = useState(false)
  const [showBoard, setShowBoard] = useState(false)

  const scoreRef      = useRef(0)
  const jumpCntRef    = useRef(0)
  const jumpStartRef  = useRef<number | null>(null)
  const autoDropRef   = useRef<NodeJS.Timeout | null>(null)
  const dropGraceRef  = useRef(0)
  const awaitKeyUpRef = useRef(false)

  /* ── constants ── */
  const BASE_SPEED    = 0.25
  const DIFF_GAIN     = 0.05
  const MAX_SPEED     = 1.5
  const MAX_HOLD_MS   = 1000
  const DROP_GRACE_MS = 180

  const PLAYER_X = 50, PLAYER_W = 40, H_GRACE = 8
  const GROUND_Y = 5,  CLEAR_TALL = 90

  /* ── keyboard handlers ── */
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code !== "Space" || e.repeat || awaitKeyUpRef.current) return
      startJump()
    }
    const up = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        awaitKeyUpRef.current = false
        endJump()
      }
    }
    window.addEventListener("keydown", down)
    window.addEventListener("keyup",   up)
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up) }
  }, [])

  /* ── main loop ── */
  useEffect(() => {
    if (!isRunning || isPaused) return
    let last = performance.now(), req = 0
    const loop = (t: number) => {
      const dt = t - last; last = t
      const speed = Math.min(BASE_SPEED + DIFF_GAIN * (scoreRef.current/1e4), MAX_SPEED)

      setObstacles(prev =>
        prev.map(o => ({ ...o, left: o.left - speed*dt }))
          .filter(o => o.left > -50)
      )

      const inGrace   = t < dropGraceRef.current
      const nearGround= playerY <= GROUND_Y
      const hit = !inGrace && obstacles.some(o => {
        const l = o.left + H_GRACE
        const r = o.left + PLAYER_W - H_GRACE
        if (!(l < PLAYER_X + PLAYER_W - H_GRACE && r > PLAYER_X + H_GRACE)) return false
        return o.type === "one" ? nearGround : nearGround && playerY < CLEAR_TALL
      })
      if (hit) { endGame(); return }

      scoreRef.current += dt
      setScore(Math.floor(scoreRef.current))
      req = requestAnimationFrame(loop)
    }
    req = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(req)
  }, [isRunning, isPaused, obstacles, playerY])

  /* ── spawn obstacles ── */
  useEffect(() => {
    if (!isRunning || isPaused) return
    const id = setInterval(() => {
      const type: "one" | "two" = Math.random() < 0.33 ? "one" : "two"
      setObstacles(p => [...p, { id: idCounter++, type, left: 600 + Math.random()*200 }])
    }, 1200 + Math.random()*800)
    return () => clearInterval(id)
  }, [isRunning, isPaused])

  /* ── jump handlers ── */
  const startJump = () => {
    if (jumpCntRef.current >= 2 || jumpStartRef.current) return
    jumpCntRef.current++
    jumpStartRef.current = performance.now()
    setPlayerY(150)

    autoDropRef.current = setTimeout(() => {
      autoDropRef.current = null
      awaitKeyUpRef.current = true
      endJump()
    }, MAX_HOLD_MS)
  }

  const endJump = () => {
    if (!jumpStartRef.current) return
    jumpStartRef.current = null
    if (autoDropRef.current) { clearTimeout(autoDropRef.current); autoDropRef.current = null }
    setPlayerY(0)
    dropGraceRef.current = performance.now() + DROP_GRACE_MS
    setTimeout(() => (jumpCntRef.current = 0), 100)
  }

  /* ── start / end game ── */
  const startGame = () => {
    setIsRunning(true); setIsPaused(false)
    setPlayerY(0); setObstacles([]); setScore(0)
    scoreRef.current = 0; setGameOver(false); setShowBoard(false)
  }
  const endGame = () => { setIsRunning(false); setGameOver(true); setShowBoard(true) }

  /* ── render ── */
  return (
    <div className="game-wrapper">
      {!isRunning && !gameOver && (
        <button className="start-btn" onClick={startGame}>Start</button>
      )}

      <div className="game-area">
        <img src={playerImg} className="player" style={{ bottom: playerY }} alt="player" />
        {obstacles.map(o => (
          <img
            key={o.id}
            className="obstacle"
            src={o.type === "one" ? objOneImg : objTwoImg}
            style={{ left: o.left, width: 40, height: o.type === "one" ? 40 : 80 }}
            alt={`obstacle-${o.type}`}
          />
        ))}
        <div className="score">Score: {score} ms</div>
        {isPaused && <div className="paused-overlay">Paused</div>}
      </div>

      {/* ---------- Scoreboard overlay ---------- */}
      {showBoard && (
        <div className="scoreboard-overlay active">
          <Scoreboard
            username={username}
            currentScore={score}
            onSaveComplete={() => setShowBoard(false)}
          />

          {/* Play Again inside overlay */}
          <button className="play-again-btn" onClick={startGame}>
            Play Again
          </button>
        </div>
      )}

      {/* fallback Play-Again when scoreboard is hidden */}
      {gameOver && !showBoard && (
        <button className="play-again-btn" onClick={startGame}>
          Play Again
        </button>
      )}
    </div>
  )
}

export default Game
