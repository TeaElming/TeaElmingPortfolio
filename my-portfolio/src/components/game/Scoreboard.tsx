import React, { useEffect, useState } from "react"

interface ScoreboardProps {
  username: string
  currentScore: number      // score from the just-finished run
  onSaveComplete: () => void// Game passes: () => setShowBoard(false)
}

const MAX_ENTRIES = 5

const Scoreboard: React.FC<ScoreboardProps> = ({
  username,
  currentScore,
  onSaveComplete,
}) => {
  const storageKey = `scores_${username}`

  const [scores, setScores] = useState<number[]>([])
  const [saved,  setSaved ] = useState(false)
  const [newIdx, setNewIdx] = useState<number | null>(null)

  /* load once */
  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (stored) setScores(JSON.parse(stored))
  }, [storageKey])

  /* save-handler */
  const saveScore = () => {
    const updated = [...scores, currentScore]
      .sort((a, b) => b - a)
      .slice(0, MAX_ENTRIES)

    localStorage.setItem(storageKey, JSON.stringify(updated))
    setScores(updated)

    const idx = updated.findIndex(v => v === currentScore)
    setNewIdx(idx !== -1 ? idx : null)

    setSaved(true)               // hide Yes/No prompt but keep overlay
    /* NOTE: we do NOT call onSaveComplete() here */
  }

  return (
    <div>
      {/* prompt shows only until user chooses Yes or No */}
      {!saved && (
        <>
          <p>Do you want to save your score?</p>
          <button onClick={saveScore}>Yes</button>
          <button onClick={onSaveComplete}>No</button>
        </>
      )}

      <h3>Top&nbsp;{MAX_ENTRIES} Scores</h3>
      <ol style={{ paddingLeft: "1.4rem", textAlign: "left" }}>
        {scores.map((s, i) => (
          <li key={i}>
            {s} ms {i === newIdx ? <strong>(new)</strong> : null}
          </li>
        ))}
        {scores.length === 0 && <li>(no scores yet)</li>}
      </ol>
    </div>
  )
}

export default Scoreboard
