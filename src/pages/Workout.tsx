import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Play, CheckCircle, SkipForward, XCircle, ArrowLeft, Volume2, VolumeX } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { getWorkoutPlanById } from '../data/workoutPlans'
import { getExerciseById } from '../data/exercises'
import { difficultyNames } from '../types'
import { coach } from '../utils/speech'
import { sounds } from '../utils/sounds'
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
    stopRest,
    completeWorkout,
    cancelWorkout,
    tick
  } = useAppStore()

  const [showConfirmExit, setShowConfirmExit] = useState(false)
  const [isCasting, setIsCasting] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [initialized, setInitialized] = useState(false)

  // 初始化训练
  useEffect(() => {
    if (planId && !isWorkoutActive) {
      const plan = getWorkoutPlanById(planId)
      if (plan) {
        startWorkout(plan)
        // 启用音效（需要用户交互）
        sounds.enable()
      } else {
        navigate('/plans')
      }
    }
  }, [planId, isWorkoutActive, navigate, startWorkout])

  // 语音提示
  useEffect(() => {
    if (!initialized || !activeWorkout || !session) return

    const currentExerciseData = activeWorkout.exercises[session.exerciseIndex]
    const currentExercise = getExerciseById(currentExerciseData.exerciseId)

    if (voiceEnabled) {
      // 第一个动作开始时播报
      if (session.exerciseIndex === 0 && session.currentSet === 1 && !session.isResting) {
        coach.startWorkout(activeWorkout.name)
        setTimeout(() => {
          if (currentExercise) {
            coach.startExercise(currentExercise.name, currentExerciseData.sets, currentExerciseData.reps)
          }
        }, 1500)
      }

      // 动作切换时播报
      if (session.exerciseIndex > 0 && session.currentSet === 1 && !session.isResting) {
        if (currentExercise) {
          coach.startExercise(currentExercise.name, currentExerciseData.sets, currentExerciseData.reps)
        }
      }

      // 休息开始
      if (session.isResting && session.restSecondsLeft === currentExerciseData.restSeconds) {
        const nextEx = activeWorkout.exercises[session.exerciseIndex + 1]
        if (nextEx) {
          const nextExercise = getExerciseById(nextEx.exerciseId)
          coach.startRest(currentExerciseData.restSeconds, nextExercise?.name || '下一动作')
        }
      }
    }
  }, [initialized, activeWorkout, session, voiceEnabled])

  // 标记已初始化
  useEffect(() => {
    if (isWorkoutActive && !initialized) {
      setInitialized(true)
    }
  }, [isWorkoutActive, initialized])

  // 计时器
  useEffect(() => {
    if (!isWorkoutActive) return

    const interval = setInterval(() => {
      tick()
      
      // 检查是否完成
      const state = useAppStore.getState()
      if (state.session && state.session.workoutSecondsLeft <= 0) {
        completeWorkout()
      }

      // 倒计时语音和音效
      const { session } = useAppStore.getState()
      if (session) {
        if (session.isResting && session.restSecondsLeft <= 3 && session.restSecondsLeft > 0) {
          if (voiceEnabled) coach.countdownTick(session.restSecondsLeft)
          if (soundEnabled) sounds.playCountdownTick(session.restSecondsLeft)
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isWorkoutActive, tick, completeWorkout, voiceEnabled, soundEnabled])

  // 获取当前动作
  if (!activeWorkout || !session) {
    return <div className="workout-loading">加载中...</div>
  }

  const currentExerciseData = activeWorkout.exercises[session.exerciseIndex]
  const currentExercise = getExerciseById(currentExerciseData.exerciseId)
  const isLastExercise = session.exerciseIndex === activeWorkout.exercises.length - 1
  const progress = ((session.exerciseIndex + 1) / activeWorkout.exercises.length) * 100

  // 处理完成当前组
  const handleCompleteSet = useCallback(() => {
    if (session?.isResting) {
      stopRest()
      if (soundEnabled) sounds.play('complete')
    } else {
      nextSet()
      if (soundEnabled) sounds.play('complete')
      if (voiceEnabled) {
        const currentExerciseData = activeWorkout.exercises[session.exerciseIndex]
        coach.completeSet(session.currentSet, currentExerciseData.sets)
      }
    }
  }, [session, stopRest, nextSet, soundEnabled, voiceEnabled, activeWorkout])

  // 处理跳过
  const handleSkip = useCallback(() => {
    if (session.exerciseIndex < activeWorkout.exercises.length - 1) {
      nextExercise()
      if (soundEnabled) sounds.play('rest')
    } else {
      completeWorkout()
      if (voiceEnabled) coach.completeWorkout(activeWorkout.name)
      if (soundEnabled) sounds.play('complete')
    }
  }, [session, nextExercise, completeWorkout, soundEnabled, voiceEnabled, activeWorkout])

  // 处理退出
  const handleExit = useCallback(() => {
    if (showConfirmExit) {
      cancelWorkout()
      navigate('/')
    } else {
      setShowConfirmExit(true)
    }
  }, [showConfirmExit, cancelWorkout, navigate])

  // 切换语音
  const toggleVoice = useCallback(() => {
    setVoiceEnabled(prev => {
      const newValue = !prev
      if (!newValue) coach.stop()
      return newValue
    })
  }, [])

  // 切换音效
  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev)
  }, [])

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
        <div className="header-actions">
          <button 
            className="icon-btn" 
            onClick={toggleVoice}
            title={voiceEnabled ? '关闭语音' : '开启语音'}
          >
            {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button 
            className="icon-btn" 
            onClick={toggleSound}
            title={soundEnabled ? '关闭音效' : '开启音效'}
          >
            {soundEnabled ? '🔔' : '🔕'}
          </button>
          <button 
            className="cast-btn" 
            onClick={() => setIsCasting(!isCasting)}
            title="投屏"
          >
            📺
          </button>
        </div>
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
                  {currentExercise.instructions.map((instruction: string, i: number) => (
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
