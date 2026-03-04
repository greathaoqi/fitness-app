import type { WorkoutPlan } from '../types'

export const workoutPlans: WorkoutPlan[] = [
  {
    id: 'fullbody-beginner',
    name: '全身入门训练',
    description: '适合新手的全身性训练，建立基础力量和耐力',
    duration: 20,
    difficulty: 'beginner',
    exercises: [
      { exerciseId: 'squat', sets: 3, reps: 12, restSeconds: 60 },
      { exerciseId: 'pushup', sets: 3, reps: 10, restSeconds: 60 },
      { exerciseId: 'plank', sets: 3, reps: '30 秒', restSeconds: 45 },
      { exerciseId: 'superman', sets: 3, reps: 12, restSeconds: 45 },
      { exerciseId: 'jumping-jack', sets: 3, reps: '30 秒', restSeconds: 45 }
    ]
  },
  {
    id: 'upper-body',
    name: '上肢力量训练',
    description: '专注胸、背、肩、手臂的力量训练',
    duration: 30,
    difficulty: 'intermediate',
    exercises: [
      { exerciseId: 'pushup', sets: 4, reps: 15, restSeconds: 60 },
      { exerciseId: 'wide-pushup', sets: 3, reps: 12, restSeconds: 60 },
      { exerciseId: 'diamond-pushup', sets: 3, reps: 8, restSeconds: 60 },
      { exerciseId: 'superman', sets: 3, reps: 15, restSeconds: 45 },
      { exerciseId: 'shoulder-tap', sets: 3, reps: 20, restSeconds: 45 },
      { exerciseId: 'tricep-dip', sets: 3, reps: 12, restSeconds: 60 }
    ]
  },
  {
    id: 'lower-body',
    name: '下肢力量训练',
    description: '专注腿部和臀部的力量训练',
    duration: 30,
    difficulty: 'intermediate',
    exercises: [
      { exerciseId: 'squat', sets: 4, reps: 20, restSeconds: 60 },
      { exerciseId: 'lunge', sets: 3, reps: 12, restSeconds: 60 },
      { exerciseId: 'jump-squat', sets: 3, reps: 15, restSeconds: 60 },
      { exerciseId: 'plank', sets: 3, reps: '45 秒', restSeconds: 45 },
      { exerciseId: 'mountain-climber', sets: 3, reps: '30 秒', restSeconds: 45 }
    ]
  },
  {
    id: 'core-blaster',
    name: '核心强化训练',
    description: '专注腹肌和核心稳定性的高强度训练',
    duration: 15,
    difficulty: 'intermediate',
    exercises: [
      { exerciseId: 'plank', sets: 4, reps: '45 秒', restSeconds: 30 },
      { exerciseId: 'bicycle-crunch', sets: 3, reps: 20, restSeconds: 30 },
      { exerciseId: 'mountain-climber', sets: 3, reps: '40 秒', restSeconds: 30 },
      { exerciseId: 'shoulder-tap', sets: 3, reps: 20, restSeconds: 30 },
      { exerciseId: 'superman', sets: 3, reps: 15, restSeconds: 30 }
    ]
  },
  {
    id: 'hiit-cardio',
    name: 'HIIT 有氧燃脂',
    description: '高强度间歇训练，快速燃脂提升心肺',
    duration: 20,
    difficulty: 'advanced',
    exercises: [
      { exerciseId: 'burpee', sets: 4, reps: 10, restSeconds: 45 },
      { exerciseId: 'jumping-jack', sets: 4, reps: '45 秒', restSeconds: 30 },
      { exerciseId: 'high-knees', sets: 4, reps: '45 秒', restSeconds: 30 },
      { exerciseId: 'mountain-climber', sets: 4, reps: '45 秒', restSeconds: 30 },
      { exerciseId: 'jump-squat', sets: 4, reps: 15, restSeconds: 45 }
    ]
  },
  {
    id: 'morning-stretch',
    name: '晨间唤醒训练',
    description: '轻柔的晨间激活训练，唤醒身体',
    duration: 10,
    difficulty: 'beginner',
    exercises: [
      { exerciseId: 'jumping-jack', sets: 2, reps: '30 秒', restSeconds: 30 },
      { exerciseId: 'squat', sets: 2, reps: 15, restSeconds: 30 },
      { exerciseId: 'pushup', sets: 2, reps: 10, restSeconds: 30 },
      { exerciseId: 'plank', sets: 2, reps: '30 秒', restSeconds: 30 },
      { exerciseId: 'superman', sets: 2, reps: 10, restSeconds: 30 }
    ]
  }
]

export function getWorkoutPlanById(id: string): WorkoutPlan | undefined {
  return workoutPlans.find(p => p.id === id)
}

export function getWorkoutPlansByDifficulty(difficulty: WorkoutPlan['difficulty']): WorkoutPlan[] {
  return workoutPlans.filter(p => p.difficulty === difficulty)
}
