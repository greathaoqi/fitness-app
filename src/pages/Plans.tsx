import { Link } from 'react-router-dom'
import { Clock, Dumbbell } from 'lucide-react'
import { workoutPlans } from '../data/workoutPlans'
import { difficultyNames } from '../types'

function Plans() {
  return (
    <div className="plans">
      <header className="header">
        <Link to="/" className="back-btn">← 返回</Link>
        <h1>选择训练计划</h1>
      </header>

      <div className="plans-list">
        {workoutPlans.map(plan => (
          <Link to={`/plans/${plan.id}`} key={plan.id} className="plan-card-large">
            <div className="plan-main">
              <h2>{plan.name}</h2>
              <span className={`difficulty-badge ${plan.difficulty}`}>
                {difficultyNames[plan.difficulty]}
              </span>
            </div>
            <p className="plan-description">{plan.description}</p>
            <div className="plan-stats">
              <div className="stat">
                <Clock size={18} />
                <span>{plan.duration} 分钟</span>
              </div>
              <div className="stat">
                <Dumbbell size={18} />
                <span>{plan.exercises.length} 个动作</span>
              </div>
            </div>
            <div className="plan-exercises-preview">
              {plan.exercises.slice(0, 3).map((ex, i) => (
                <span key={i} className="exercise-tag">{ex.exerciseId}</span>
              ))}
              {plan.exercises.length > 3 && (
                <span className="exercise-tag more">+{plan.exercises.length - 3}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Plans
