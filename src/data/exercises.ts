import type { Exercise } from '../types'

export const exercises: Exercise[] = [
  // 胸部
  {
    id: 'pushup',
    name: '俯卧撑',
    category: 'chest',
    description: '经典的上肢推力动作，锻炼胸肌、三头肌和肩部',
    instructions: [
      '双手放在地面，略宽于肩',
      '身体保持直线，核心收紧',
      '下降至胸部接近地面',
      '推起至起始位置'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'wide-pushup',
    name: '宽距俯卧撑',
    category: 'chest',
    description: '更宽的手距，更多刺激胸肌外侧',
    instructions: [
      '双手距离比标准俯卧撑更宽',
      '身体保持直线',
      '下降时感受胸肌拉伸',
      '推起至起始位置'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'diamond-pushup',
    name: '钻石俯卧撑',
    category: 'chest',
    description: '双手形成钻石形状，重点锻炼三头肌',
    instructions: [
      '双手拇指和食指相触形成钻石形',
      '放在胸部正下方',
      '下降至胸部接近手',
      '推起至起始位置'
    ],
    difficulty: 'advanced'
  },
  
  // 背部
  {
    id: 'superman',
    name: '超人式',
    category: 'back',
    description: '俯卧背部伸展动作，锻炼下背部',
    instructions: [
      '俯卧在地面，手臂向前伸展',
      '同时抬起手臂、胸部和腿部',
      '保持 2-3 秒',
      '缓慢放下'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'reverse-snowangel',
    name: '反向雪天使',
    category: 'back',
    description: '俯卧手臂划圈，锻炼上背部和肩袖',
    instructions: [
      '俯卧，额头轻触地面',
      '手臂在身体两侧',
      '手臂抬起并向前划圈至头顶',
      '原路返回'
    ],
    difficulty: 'intermediate'
  },
  
  // 腿部
  {
    id: 'squat',
    name: '深蹲',
    category: 'legs',
    description: '基础下肢动作，锻炼股四头肌、臀部和腘绳肌',
    instructions: [
      '双脚与肩同宽站立',
      '臀部向后向下坐',
      '下降至大腿与地面平行',
      '站起至起始位置'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'lunge',
    name: '箭步蹲',
    category: 'legs',
    description: '单腿动作，锻炼腿部力量和平衡',
    instructions: [
      '一脚向前迈出一大步',
      '下降至后膝接近地面',
      '前膝保持 90 度',
      '推回起始位置'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'jump-squat',
    name: '跳跃深蹲',
    category: 'legs',
    description: '深蹲加跳跃，增加爆发力训练',
    instructions: [
      '完成标准深蹲',
      '爆发力向上跳起',
      '落地时缓冲回到深蹲位',
      '重复动作'
    ],
    difficulty: 'advanced'
  },
  
  // 肩部
  {
    id: 'pike-pushup',
    name: '派克俯卧撑',
    category: 'shoulders',
    description: '模拟倒立推的肩部动作',
    instructions: [
      '从下犬式开始，臀部向上',
      '身体呈倒 V 形',
      '弯曲手肘下降头部',
      '推起至起始位置'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'shoulder-tap',
    name: '肩部拍击',
    category: 'shoulders',
    description: '平板支撑姿势下的肩部稳定性训练',
    instructions: [
      '保持平板支撑姿势',
      '核心收紧，身体稳定',
      '一只手拍击对侧肩膀',
      '交替进行'
    ],
    difficulty: 'beginner'
  },
  
  // 手臂
  {
    id: 'tricep-dip',
    name: '三头肌支撑',
    category: 'arms',
    description: '使用椅子或地面的三头肌训练',
    instructions: [
      '背对椅子，双手支撑在边缘',
      '双脚伸直或弯曲',
      '下降至手肘 90 度',
      '推起至起始位置'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'chinup',
    name: '引体向上',
    category: 'arms',
    description: '经典的上肢拉力动作',
    instructions: [
      '双手握住单杠，掌心朝向自己',
      '悬挂起始',
      '拉起至下巴过杠',
      '缓慢放下'
    ],
    difficulty: 'advanced'
  },
  
  // 核心
  {
    id: 'plank',
    name: '平板支撑',
    category: 'core',
    description: '静态核心稳定性训练',
    instructions: [
      '前臂和脚尖支撑',
      '身体保持直线',
      '核心收紧，不要塌腰',
      '保持规定时间'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'mountain-climber',
    name: '登山跑',
    category: 'core',
    description: '动态核心和有氧训练',
    instructions: [
      '保持平板支撑姿势',
      '交替将膝盖拉向胸部',
      '保持核心稳定',
      '快速交替进行'
    ],
    difficulty: 'intermediate'
  },
  {
    id: 'bicycle-crunch',
    name: '自行车卷腹',
    category: 'core',
    description: '动态腹肌训练，刺激腹斜肌',
    instructions: [
      '仰卧，双手在头后',
      '右肘触碰左膝',
      '交替进行如蹬自行车',
      '保持核心收紧'
    ],
    difficulty: 'beginner'
  },
  
  // 有氧
  {
    id: 'burpee',
    name: '波比跳',
    category: 'cardio',
    description: '全身性高强度有氧动作',
    instructions: [
      '从站立开始',
      '下蹲双手撑地',
      '双脚向后跳成平板',
      '做一个俯卧撑',
      '双脚跳回',
      '站起并跳跃'
    ],
    difficulty: 'advanced'
  },
  {
    id: 'jumping-jack',
    name: '开合跳',
    category: 'cardio',
    description: '经典热身和有氧动作',
    instructions: [
      '双脚并拢站立',
      '跳起时双脚分开，手臂上举',
      '再次跳起回到起始',
      '连续进行'
    ],
    difficulty: 'beginner'
  },
  {
    id: 'high-knees',
    name: '高抬腿',
    category: 'cardio',
    description: '原地跑步式有氧训练',
    instructions: [
      '原地站立',
      '交替抬高膝盖至腰部高度',
      '手臂配合摆动',
      '保持快速节奏'
    ],
    difficulty: 'beginner'
  }
]

export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(e => e.id === id)
}

export function getExercisesByCategory(category: Exercise['category']): Exercise[] {
  return exercises.filter(e => e.category === category)
}
