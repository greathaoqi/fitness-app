import { Link, useParams, useNavigate } from 'react-router-dom'
import { Clock, Dumbbell, ArrowLeft, Play } from 'lucide-react'
import { getWorkoutPlanById } from '../data/workoutPlans'
import { getExerciseById } from '../data/exercises'
import { difficultyNames, categoryNames } from '../types'
import './PlanDetail.css'

function PlanDetail() {
  const { planId } = useParams()
  const navigate = useNavigate()
  
  const plan = getWorkoutPlanById(planId!)

  if (!plan) {
    return (
      <div className="plan-detail-not-found">
        <h1>计划不存在</h1>
        <button onClick={() => navigate('/plans')}>返回计划列表</button>
      </div>
    )
  }

  return (
    <div className="plan-detail">
      {/* 头部 */}
      <header className="plan-detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>{plan.name}</h1>
      </header>

      {/* 计划信息 */}
      <div className="plan-info">
        <div className="plan-meta">
          <div className="meta-item">
            <Clock size={20} />
            <span>{plan.duration} 分钟</span>
          </div>
          <div className="meta-item">
            <Dumbbell size={20} />
            <span>{plan.exercises.length} 个动作</span>
          </div>
          <div className={`difficulty-badge ${plan.difficulty}`}>
            {difficultyNames[plan.difficulty]}
          </div>
        </div>
        
        <p className="plan-description">{plan.description}</p>
      </div>

      {/* 动作列表 */}
      <div className="exercise-list">
        <h2>训练动作</h2>
        {plan.exercises.map((exercise, index) => {
          const ex = getExerciseById(exercise.exerciseId)
          return (
            <div key={exercise.exerciseId} className="exercise-item">
              <div className="exercise-number">{index + 1}</div>
              <div className="exercise-content">
                <div className="exercise-header">
                  <h3>{ex?.name || exercise.exerciseId}</h3>
                  {ex && (
                    <span className={`category-tag ${ex.category}`}>
                      {categoryNames[ex.category]}
                    </span>
                  )}
                </div>
                <p className="exercise-desc">{ex?.description}</p>
                <div className="exercise-stats">
                  <span className="stat">🏋️ {exercise.sets} 组</span>
                  <span className="stat">📈 {exercise.reps}</span>
                  <span className="stat">⏱️ 休息 {exercise.restSeconds} 秒</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 开始按钮 */}
      <div className="plan-actions">
        <Link to={`/workout/${plan.id}`} className="start-workout-btn">
          <Play size={24} />
          <span>开始训练</span>
        </Link>
      </div>
    </div>
  )
}

export default PlanDetail
