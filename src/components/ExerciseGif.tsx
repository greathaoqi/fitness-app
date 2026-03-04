import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getExerciseGifs } from '../data/exerciseGifs'
import './ExerciseGif.css'

interface ExerciseGifProps {
  exerciseId: string
  autoPlay?: boolean
}

function ExerciseGif({ exerciseId, autoPlay = false }: ExerciseGifProps) {
  const gifs = getExerciseGifs(exerciseId)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  if (!gifs || gifs.length === 0) {
    return (
      <div className="exercise-gif-placeholder">
        <div className="placeholder-icon">🏋️</div>
        <p>暂无动作演示</p>
      </div>
    )
  }

  const nextGif = () => {
    setCurrentIndex((prev) => (prev + 1) % gifs.length)
    setIsLoading(true)
  }

  const prevGif = () => {
    setCurrentIndex((prev) => (prev - 1 + gifs.length) % gifs.length)
    setIsLoading(true)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="exercise-gif">
      <div className="gif-container">
        {isLoading && (
          <div className="gif-loading">
            <div className="loading-spinner"></div>
            <p>加载动作演示...</p>
          </div>
        )}
        
        <img
          src={gifs[currentIndex]}
          alt="Exercise demonstration"
          className={`gif-image ${isLoading ? 'loading' : 'loaded'}`}
          onLoad={handleImageLoad}
          onError={() => setIsLoading(false)}
        />

        {gifs.length > 1 && (
          <>
            <button className="gif-nav prev" onClick={prevGif}>
              <ChevronLeft size={24} />
            </button>
            <button className="gif-nav next" onClick={nextGif}>
              <ChevronRight size={24} />
            </button>
            
            <div className="gif-indicators">
              {gifs.map((_, index) => (
                <span
                  key={index}
                  className={`indicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsLoading(true)
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="gif-info">
        <span className="gif-count">
          {currentIndex + 1} / {gifs.length}
        </span>
        <span className="gif-tip">💡 点击箭头切换角度</span>
      </div>
    </div>
  )
}

export default ExerciseGif
