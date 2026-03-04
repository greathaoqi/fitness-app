import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Play, CheckCircle, SkipForward, XCircle, ArrowLeft } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { getWorkoutPlanById } from '../data/workoutPlans'
import { getExerciseById, difficultyNames } from '../types'
import Timer from '../components/Timer'
import './Workout.css'

function Workout() {
  const { planId } = useParams()
  const navigate = useNavigate()
  
  const {
    activeWorkout,
    session,
    isWorkoutActive,
    startWorkout,
    nextExercise,
    prevExercise,
    nextSet,
    startRest,
    stopRest,
    completeWorkout,
    cancelWorkout,
    tick
  } = useAppStore()

  const [showConfirmExit, setShowConfirmExit] = useState(false)
  const [isCasting, setIsCasting] = useState(false)

  // 初始化训练
  useEffect(() => {
    if (planId && !isWorkoutActive) {
      const plan = getWorkoutPlanById(planId)
      if (plan) {
        startWorkout(plan)
      } else {
        navigate('/plans')
      }
    }
  }, [planId, isWorkoutActive, navigate, startWorkout])

  // 计时器
  useEffect(() => {
    if (!isWorkoutActive) return

    const interval = setInterval(() => {
      tick()
      
      // 检查是否完成
      const { session } = useAppStore.getState()
      if (session && session.workoutSecondsLeft <= 0) {
        completeWorkout()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isWorkoutActive, tick, completeWorkout])

  // 获取当前动作
  if (!activeWorkout || !session) {
    return <div className="workout-loading">加载中...</div>
  }

  const currentExerciseData = activeWorkout.exercises[session.exerciseIndex]
  const currentExercise = getExerciseById(currentExerciseData.exerciseId)
  const isLastExercise = session.exerciseIndex === activeWorkout.exercises.length - 1
  const progress = ((session.exerciseIndex + 1) / activeWorkout.exercises.length) * 100

  // 处理完成当前组
  const handleCompleteSet = () => {
    if (session.isResting) {
      stopRest()
    } else {
      nextSet()
    }
  }

  // 处理跳过
  const handleSkip = () => {
    if (session.exerciseIndex < activeWorkout.exercises.length - 1) {
      nextExercise()
    } else {
      completeWorkout()
    }
  }

  // 处理退出
  const handleExit = () => {
    if (showConfirmExit) {
      cancelWorkout()
      navigate('/')
    } else {
      setShowConfirmExit(true)
    }
  }

  // 渲染准备状态
  if (!isWorkoutActive) {
    return (
      <div className="workout workout-prep">
        <div className="workout-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h1>{activeWorkout.name}</h1>
        </div>
        
        <div className="prep-content">
          <h2>准备开始</h2>
          <div className="prep-info">
            <p>⏱️ 时长：{activeWorkout.duration} 分钟</p>
            <p>🏋️ 动作：{activeWorkout.exercises.length} 个</p>
            <p>📊 难度：{difficultyNames[activeWorkout.difficulty]}</p>
          </div>
          
          <button className="start-btn" onClick={() => startWorkout(activeWorkout)}>
            <Play size={24} />
            开始训练
          </button>
        </div>
      </div>
    )
  }

  // 渲染完成状态
  if (session.workoutSecondsLeft <= 0) {
    return (
      <div className="workout workout-complete">
        <div className="complete-content">
          <CheckCircle size={80} className="complete-icon" />
          <h1>训练完成！🎉</h1>
          <p>你完成了 {activeWorkout.name}</p>
          <div className="complete-stats">
            <div className="stat">
              <span className="label">总时长</span>
              <span className="value">{activeWorkout.duration}分钟</span>
            </div>
            <div className="stat">
              <span className="label">动作数</span>
              <span className="value">{activeWorkout.exercises.length}个</span>
            </div>
          </div>
          <button className="home-btn" onClick={() => navigate('/')}>
            返回首页
          </button>
        </div>
      </div>
    )
  }

  // 渲染训练中/休息中
  return (
    <div className={`workout ${session.isResting ? 'resting' : 'working'}`}>
      {/* 进度条 */}
      <div className="workout-progress">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* 头部 */}
      <div className="workout-header">
        <button className="back-btn" onClick={handleExit}>
          <ArrowLeft size={20} />
        </button>
        <div className="header-info">
          <h2>{currentExercise?.name || '准备中'}</h2>
          <p>
            动作 {session.exerciseIndex + 1} / {activeWorkout.exercises.length}
          </p>
        </div>
        <button 
          className="cast-btn" 
          onClick={() => setIsCasting(!isCasting)}
          title="投屏"
        >
          📺
        </button>
      </div>

      {/* 主要内容 */}
      <div className="workout-content">
        {session.isResting ? (
          // 休息状态
          <div className="rest-container">
            <div className="rest-icon">💤</div>
            <h2>休息时间</h2>
            <Timer 
              seconds={currentExerciseData.restSeconds}
              onComplete={stopRest}
              isResting={true}
            />
            {!isLastExercise && (
              <div className="next-exercise">
                <p>下一个动作</p>
                <h3>{getExerciseById(activeWorkout.exercises[session.exerciseIndex + 1].exerciseId)?.name}</h3>
              </div>
            )}
            <button className="start-btn" onClick={stopRest}>
              提前开始
            </button>
          </div>
        ) : (
          // 训练状态
          <div className="exercise-container">
            <div className="exercise-info">
              <div className="set-info">
                <span>第 {session.currentSet} 组 / 共 {currentExerciseData.sets} 组</span>
              </div>
              <div className="target-info">
                <span>目标：{currentExerciseData.reps}</span>
              </div>
            </div>

            <Timer 
              seconds={typeof currentExerciseData.reps === 'number' ? currentExerciseData.reps * 3 : 60}
              onComplete={nextSet}
              isResting={false}
            />

            {currentExercise?.instructions && (
              <div className="instructions">
                <h4>动作要点：</h4>
                <ul>
                  {currentExercise.instructions.map((instruction, i) => (
                    <li key={i}>{instruction}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 底部按钮 */}
      <div className="workout-actions">
        {!session.isResting && (
          <>
            <button className="action-btn prev" onClick={prevExercise}>
              上一个
            </button>
            <button className="action-btn complete" onClick={handleCompleteSet}>
              <CheckCircle size={20} />
              完成
            </button>
            <button className="action-btn skip" onClick={handleSkip}>
              <SkipForward size={20} />
              跳过
            </button>
          </>
        )}
      </div>

      {/* 退出确认弹窗 */}
      {showConfirmExit && (
        <div className="modal-overlay" onClick={() => setShowConfirmExit(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>确认退出？</h3>
            <p>当前训练进度将不会保存</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowConfirmExit(false)}>
                继续训练
              </button>
              <button className="btn-exit" onClick={handleExit}>
                <XCircle size={20} />
                退出
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 投屏提示 */}
      {isCasting && (
        <div className="cast-modal">
          <div className="cast-content">
            <h3>📺 投屏模式</h3>
            <p>请使用手机系统的投屏功能：</p>
            <ol>
              <li>手机下拉打开控制中心</li>
              <li>点击"无线投屏"或"Smart View"</li>
              <li>选择你的三星电视</li>
            </ol>
            <button className="btn-ok" onClick={() => setIsCasting(false)}>
              知道了
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Workout
