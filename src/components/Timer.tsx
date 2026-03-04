import { useState, useEffect } from 'react'
import './Timer.css'

interface TimerProps {
  seconds: number
  onComplete: () => void
  isResting?: boolean
}

function Timer({ seconds, onComplete, isResting = false }: TimerProps) {
  const [remaining, setRemaining] = useState(seconds)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setRemaining(seconds)
    setIsComplete(false)
  }, [seconds])

  useEffect(() => {
    if (remaining <= 0 && !isComplete) {
      setIsComplete(true)
      onComplete()
      return
    }

    if (remaining > 0) {
      const timer = setInterval(() => {
        setRemaining(prev => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [remaining, isComplete, onComplete])

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
    const s = secs % 60
    if (mins > 0) {
      return `${mins}:${s.toString().padStart(2, '0')}`
    }
    return `${s}秒`
  }

  const progress = ((seconds - remaining) / seconds) * 100

  return (
    <div className={`timer ${isResting ? 'resting' : 'working'}`}>
      <div className="timer-ring">
        <svg viewBox="0 0 100 100" className="timer-svg">
          <circle
            className="timer-ring-bg"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
          />
          <circle
            className="timer-ring-progress"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="timer-display">
          <span className="time-value">{formatTime(remaining)}</span>
          <span className="timer-label">
            {isResting ? '休息' : '训练'}
          </span>
        </div>
      </div>
      
      {remaining <= 10 && remaining > 0 && (
        <div className="countdown-alert">
          {remaining}
        </div>
      )}
    </div>
  )
}

export default Timer
