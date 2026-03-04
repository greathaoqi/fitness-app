import { Link } from 'react-router-dom'
import { Dumbbell, History, Trophy, Flame } from 'lucide-react'
import { workoutPlans } from '../data/workoutPlans'
import { difficultyNames } from '../types'
import './Home.css'

function Home() {
  const featuredPlans = workoutPlans.slice(0, 3)

  return (
    <div className="home">
      {/* Hero 区域 */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-emoji">💪</div>
          <h1 className="hero-title">健身训练</h1>
          <p className="hero-subtitle">随时随地，开始你的训练</p>
          <p className="hero-tagline">无需器械 · 在家锻炼 · 大屏投屏</p>
        </div>
      </header>

      {/* 快捷操作 */}
      <nav className="quick-actions">
        <Link to="/plans" className="action-card primary">
          <div className="action-icon">
            <Dumbbell size={32} />
          </div>
          <div className="action-info">
            <h3>开始训练</h3>
            <p>6 个训练计划</p>
          </div>
          <div className="action-arrow">→</div>
        </Link>
        
        <Link to="/history" className="action-card">
          <div className="action-icon">
            <History size={32} />
          </div>
          <div className="action-info">
            <h3>训练历史</h3>
            <p>查看记录</p>
          </div>
          <div className="action-arrow">→</div>
        </Link>
      </nav>

      {/* 特色功能 */}
      <section className="features">
        <h2 className="section-title">为什么选择我们</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📺</div>
            <h3>电视投屏</h3>
            <p>手机投屏到电视，大屏跟随训练更舒服</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>智能计时</h3>
            <p>自动计时、休息提醒，专注训练本身</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏋️</div>
            <h3>专业计划</h3>
            <p>6 个科学训练计划，从初级到高级</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>完全免费</h3>
            <p>开源免费，无广告，数据本地存储</p>
          </div>
        </div>
      </section>

      {/* 推荐计划 */}
      <section className="plans-section">
        <div className="section-header">
          <h2 className="section-title">推荐训练计划</h2>
          <Link to="/plans" className="view-all">查看全部 →</Link>
        </div>
        <div className="plans-grid">
          {featuredPlans.map(plan => (
            <Link to={`/plans/${plan.id}`} key={plan.id} className="plan-card">
              <div className="plan-card-header">
                <h3>{plan.name}</h3>
                <span className={`difficulty ${plan.difficulty}`}>
                  {difficultyNames[plan.difficulty]}
                </span>
              </div>
              <p className="plan-desc">{plan.description}</p>
              <div className="plan-meta">
                <div className="meta-item">
                  <Flame size={16} />
                  <span>{plan.duration}分钟</span>
                </div>
                <div className="meta-item">
                  <Trophy size={16} />
                  <span>{plan.exercises.length}个动作</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 页脚 */}
      <footer className="footer">
        <p>💡 小贴士：手机投屏到电视，享受大屏健身体验</p>
        <p className="footer-note">Created with ❤️ by greathaoqi</p>
      </footer>
    </div>
  )
}

export default Home
