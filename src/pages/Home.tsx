import { Link } from 'react-router-dom'
import { Dumbbell, History } from 'lucide-react'
import { workoutPlans } from '../data/workoutPlans'
import { difficultyNames } from '../types'

function Home() {
  return (
    <div className="home">
      <header className="header">
        <h1>💪 健身训练</h1>
        <p className="subtitle">随时随地，开始你的训练</p>
      </header>

      <nav className="nav-menu">
        <Link to="/plans" className="nav-card primary">
          <Dumbbell size={32} />
          <span>开始训练</span>
        </Link>
        <Link to="/history" className="nav-card">
          <History size={32} />
          <span>训练历史</span>
        </Link>
      </nav>

      <section className="plans-preview">
        <h2>推荐训练计划</h2>
        <div className="plans-grid">
          {workoutPlans.slice(0, 3).map(plan => (
            <Link to={`/plans/${plan.id}`} key={plan.id} className="plan-card">
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <span className={`difficulty ${plan.difficulty}`}>
                  {difficultyNames[plan.difficulty]}
                </span>
              </div>
              <p className="plan-desc">{plan.description}</p>
              <div className="plan-meta">
                <span>⏱️ {plan.duration}分钟</span>
                <span>🏋️ {plan.exercises.length}个动作</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>手机投屏到电视，享受大屏健身体验 📺</p>
      </footer>
    </div>
  )
}

export default Home
