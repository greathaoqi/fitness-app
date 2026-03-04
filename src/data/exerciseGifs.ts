// 健身动作 GIF 资源映射
// 数据来源：https://github.com/yuhonas/free-exercise-db

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises'

// 动作 ID 映射到 free-exercise-db 的资源
export const exerciseGifMap: Record<string, { gifs: string[]; video?: string }> = {
  // 胸部
  'pushup': {
    gifs: [
      `${GITHUB_RAW_BASE}/Push-Up/0.jpg`,
      `${GITHUB_RAW_BASE}/Push-Up/1.jpg`
    ]
  },
  'wide-pushup': {
    gifs: [
      `${GITHUB_RAW_BASE}/Wide-Grip-Push-Up/0.jpg`,
      `${GITHUB_RAW_BASE}/Wide-Grip-Push-Up/1.jpg`
    ]
  },
  'diamond-pushup': {
    gifs: [
      `${GITHUB_RAW_BASE}/Diamond-Push-Up/0.jpg`,
      `${GITHUB_RAW_BASE}/Diamond-Push-Up/1.jpg`
    ]
  },
  
  // 背部
  'superman': {
    gifs: [
      `${GITHUB_RAW_BASE}/Superman/0.jpg`,
      `${GITHUB_RAW_BASE}/Superman/1.jpg`
    ]
  },
  'reverse-snowangel': {
    gifs: [
      `${GITHUB_RAW_BASE}/Reverse-Snow-Angel/0.jpg`
    ]
  },
  
  // 腿部
  'squat': {
    gifs: [
      `${GITHUB_RAW_BASE}/Bodyweight-Squat/0.jpg`,
      `${GITHUB_RAW_BASE}/Bodyweight-Squat/1.jpg`
    ]
  },
  'lunge': {
    gifs: [
      `${GITHUB_RAW_BASE}/Forward-Lunge/0.jpg`,
      `${GITHUB_RAW_BASE}/Forward-Lunge/1.jpg`
    ]
  },
  'jump-squat': {
    gifs: [
      `${GITHUB_RAW_BASE}/Jump-Squat/0.jpg`,
      `${GITHUB_RAW_BASE}/Jump-Squat/1.jpg`
    ]
  },
  
  // 肩部
  'pike-pushup': {
    gifs: [
      `${GITHUB_RAW_BASE}/Pike-Push-Up/0.jpg`,
      `${GITHUB_RAW_BASE}/Pike-Push-Up/1.jpg`
    ]
  },
  'shoulder-tap': {
    gifs: [
      `${GITHUB_RAW_BASE}/Shoulder-Tap/0.jpg`
    ]
  },
  
  // 手臂
  'tricep-dip': {
    gifs: [
      `${GITHUB_RAW_BASE}/Bench-Dip/0.jpg`,
      `${GITHUB_RAW_BASE}/Bench-Dip/1.jpg`
    ]
  },
  'chinup': {
    gifs: [
      `${GITHUB_RAW_BASE}/Chin-Up/0.jpg`,
      `${GITHUB_RAW_BASE}/Chin-Up/1.jpg`
    ]
  },
  
  // 核心
  'plank': {
    gifs: [
      `${GITHUB_RAW_BASE}/Plank/0.jpg`
    ]
  },
  'mountain-climber': {
    gifs: [
      `${GITHUB_RAW_BASE}/Mountain-Climber/0.jpg`,
      `${GITHUB_RAW_BASE}/Mountain-Climber/1.jpg`
    ]
  },
  'bicycle-crunch': {
    gifs: [
      `${GITHUB_RAW_BASE}/Bicycle-Crunch/0.jpg`,
      `${GITHUB_RAW_BASE}/Bicycle-Crunch/1.jpg`
    ]
  },
  
  // 有氧
  'burpee': {
    gifs: [
      `${GITHUB_RAW_BASE}/Burpee/0.jpg`,
      `${GITHUB_RAW_BASE}/Burpee/1.jpg`
    ]
  },
  'jumping-jack': {
    gifs: [
      `${GITHUB_RAW_BASE}/Jumping-Jacks/0.jpg`,
      `${GITHUB_RAW_BASE}/Jumping-Jacks/1.jpg`
    ]
  },
  'high-knees': {
    gifs: [
      `${GITHUB_RAW_BASE}/High-Knees/0.jpg`,
      `${GITHUB_RAW_BASE}/High-Knees/1.jpg`
    ]
  }
}

// 获取动作的 GIF 列表
export function getExerciseGifs(exerciseId: string): string[] {
  return exerciseGifMap[exerciseId]?.gifs || []
}

// 获取动作的主要 GIF（第一个）
export function getExerciseMainGif(exerciseId: string): string | null {
  const gifs = getExerciseGifs(exerciseId)
  return gifs.length > 0 ? gifs[0] : null
}

// 检查动作是否有 GIF
export function hasExerciseGif(exerciseId: string): boolean {
  return exerciseId in exerciseGifMap && getExerciseGifs(exerciseId).length > 0
}
