import { create } from 'zustand'
import type { WorkoutLog, LogExercise, WorkoutPlan } from '../types'

interface WorkoutSession {
  exerciseIndex: number
  currentSet: number
  isResting: boolean
  restSecondsLeft: number
  workoutSecondsLeft: number
  completedExercises: LogExercise[]
}

interface AppState {
  // 当前训练会话
  activeWorkout: WorkoutPlan | null
  session: WorkoutSession | null
  isWorkoutActive: boolean
  
  // 训练历史
  workoutLogs: WorkoutLog[]
  
  // 动作
  startWorkout: (plan: WorkoutPlan) => void
  nextExercise: () => void
  prevExercise: () => void
  nextSet: () => void
  startRest: (seconds: number) => void
  stopRest: () => void
  completeWorkout: () => void
  cancelWorkout: () => void
  
  // 历史记录
  addWorkoutLog: (log: WorkoutLog) => void
  getWorkoutLogs: () => WorkoutLog[]
  
  // 计时器
  tick: () => void
}

const initialState: WorkoutSession = {
  exerciseIndex: 0,
  currentSet: 1,
  isResting: false,
  restSecondsLeft: 0,
  workoutSecondsLeft: 0,
  completedExercises: []
}

export const useAppStore = create<AppState>((set, get) => ({
  // 初始状态
  activeWorkout: null,
  session: null,
  isWorkoutActive: false,
  workoutLogs: [],
  
  // 开始训练
  startWorkout: (plan: WorkoutPlan) => {
    set({
      activeWorkout: plan,
      session: {
        ...initialState,
        workoutSecondsLeft: plan.duration * 60,
        completedExercises: plan.exercises.map(ex => ({
          exerciseId: ex.exerciseId,
          completedSets: 0,
          actualReps: []
        }))
      },
      isWorkoutActive: true
    })
  },
  
  // 下一个动作
  nextExercise: () => {
    const { session, activeWorkout } = get()
    if (!session || !activeWorkout) return
    
    const newIndex = Math.min(session.exerciseIndex + 1, activeWorkout.exercises.length - 1)
    set({
      session: {
        ...session,
        exerciseIndex: newIndex,
        currentSet: 1,
        isResting: false
      }
    })
  },
  
  // 上一个动作
  prevExercise: () => {
    const { session } = get()
    if (!session) return
    
    const newIndex = Math.max(session.exerciseIndex - 1, 0)
    set({
      session: {
        ...session,
        exerciseIndex: newIndex,
        currentSet: 1,
        isResting: false
      }
    })
  },
  
  // 下一组
  nextSet: () => {
    const { session, activeWorkout } = get()
    if (!session || !activeWorkout) return
    
    const currentExercise = activeWorkout.exercises[session.exerciseIndex]
    const nextSetNum = session.currentSet + 1
    
    if (nextSetNum > currentExercise.sets) {
      // 当前动作完成，进入休息或下一个动作
      if (session.exerciseIndex < activeWorkout.exercises.length - 1) {
        set({
          session: {
            ...session,
            isResting: true,
            restSecondsLeft: currentExercise.restSeconds
          }
        })
      }
    } else {
      set({
        session: {
          ...session,
          currentSet: nextSetNum
        }
      })
    }
  },
  
  // 开始休息
  startRest: (seconds: number) => {
    set({
      session: {
        ...get().session!,
        isResting: true,
        restSecondsLeft: seconds
      }
    })
  },
  
  // 停止休息
  stopRest: () => {
    const { session, activeWorkout } = get()
    if (!session || !activeWorkout) return
    
    // 标记当前组完成
    const updatedExercises = [...session.completedExercises]
    const currentExerciseLog = updatedExercises[session.exerciseIndex]
    if (currentExerciseLog) {
      currentExerciseLog.completedSets = Math.max(currentExerciseLog.completedSets, session.currentSet)
    }
    
    const isLastExercise = session.exerciseIndex >= activeWorkout.exercises.length - 1
    const currentExercise = activeWorkout.exercises[session.exerciseIndex]
    const isLastSet = session.currentSet >= currentExercise.sets
    
    let newExerciseIndex = session.exerciseIndex
    let newSet = 1
    
    if (isLastSet && !isLastExercise) {
      // 当前动作完成，进入下一个动作
      newExerciseIndex = session.exerciseIndex + 1
      newSet = 1
    } else if (!isLastSet) {
      // 还有组数，继续当前动作
      newSet = session.currentSet + 1
    }
    
    set({
      session: {
        ...session,
        isResting: false,
        restSecondsLeft: 0,
        currentSet: newSet,
        exerciseIndex: newExerciseIndex,
        completedExercises: updatedExercises
      }
    })
  },
  
  // 完成训练
  completeWorkout: () => {
    const state = get()
    if (!state.session || !state.activeWorkout) return
    
    const log: WorkoutLog = {
      id: Date.now().toString(),
      planId: state.activeWorkout.id,
      date: new Date().toISOString(),
      completed: true,
      exercises: state.session.completedExercises
    }
    
    set({
      activeWorkout: null,
      session: null,
      isWorkoutActive: false,
      workoutLogs: [...get().workoutLogs, log]
    })
  },
  
  // 取消训练
  cancelWorkout: () => {
    set({
      activeWorkout: null,
      session: null,
      isWorkoutActive: false
    })
  },
  
  // 添加训练记录
  addWorkoutLog: (log: WorkoutLog) => {
    set({
      workoutLogs: [...get().workoutLogs, log]
    })
  },
  
  // 获取训练记录
  getWorkoutLogs: () => {
    return get().workoutLogs
  },
  
  // 计时器滴答
  tick: () => {
    const { session } = get()
    if (!session) return
    
    let newSession = { ...session }
    
    // 减少总训练时间
    if (newSession.workoutSecondsLeft > 0) {
      newSession.workoutSecondsLeft -= 1
    }
    
    // 减少休息时间
    if (newSession.isResting && newSession.restSecondsLeft > 0) {
      newSession.restSecondsLeft -= 1
      if (newSession.restSecondsLeft === 0) {
        newSession.isResting = false
      }
    }
    
    set({ session: newSession })
  }
}))
