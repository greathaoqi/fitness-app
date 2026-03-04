// 健身动作类型定义
export interface Exercise {
  id: string
  name: string
  category: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'cardio'
  description: string
  instructions: string[]
  videoUrl?: string
  imageUrl?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

// 训练计划类型
export interface WorkoutPlan {
  id: string
  name: string
  description: string
  duration: number // 分钟
  exercises: WorkoutExercise[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface WorkoutExercise {
  exerciseId: string
  sets: number
  reps: number | string // 可以是数字或 "30 秒" 这样的字符串
  restSeconds: number
}

// 训练记录类型
export interface WorkoutLog {
  id: string
  planId: string
  date: string
  completed: boolean
  exercises: LogExercise[]
}

export interface LogExercise {
  exerciseId: string
  completedSets: number
  actualReps: number[]
}

// 分类中文映射
export const categoryNames: Record<Exercise['category'], string> = {
  chest: '胸部',
  back: '背部',
  legs: '腿部',
  shoulders: '肩部',
  arms: '手臂',
  core: '核心',
  cardio: '有氧'
}

export const difficultyNames: Record<Exercise['difficulty'], string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级'
}
