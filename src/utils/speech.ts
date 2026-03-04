// 语音合成工具 - 使用浏览器原生 Web Speech API
export interface SpeechOptions {
  rate?: number      // 语速 0.1 - 10
  pitch?: number     // 音调 0 - 2
  volume?: number    // 音量 0 - 1
  lang?: string      // 语言 'zh-CN' | 'en-US'
}

class SpeechSynthesizer {
  private synth: SpeechSynthesis
  private voice: SpeechSynthesisVoice | null = null
  private queue: SpeechSynthesisUtterance[] = []
  private isSpeaking = false

  constructor() {
    this.synth = window.speechSynthesis
    this.loadVoice()
  }

  // 加载中文语音
  private loadVoice() {
    const voices = this.synth.getVoices()
    // 优先选择中文女声
    this.voice = voices.find(v => 
      v.lang.includes('zh-CN') && 
      (v.name.includes('Female') || v.name.includes('女声'))
    ) || voices.find(v => v.lang.includes('zh-CN')) || null
  }

  // 合成语音
  speak(text: string, options: SpeechOptions = {}) {
    if (!this.synth) {
      console.warn('Browser does not support speech synthesis')
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    
    if (this.voice) {
      utterance.voice = this.voice
    }
    
    utterance.rate = options.rate ?? 1.0
    utterance.pitch = options.pitch ?? 1.0
    utterance.volume = options.volume ?? 1.0
    utterance.lang = options.lang ?? 'zh-CN'

    // 加入队列
    this.queue.push(utterance)
    this.processQueue()
  }

  // 处理队列
  private processQueue() {
    if (this.isSpeaking || this.queue.length === 0) {
      return
    }

    this.isSpeaking = true
    const utterance = this.queue.shift()!

    utterance.onend = () => {
      this.isSpeaking = false
      this.processQueue()
    }

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event)
      this.isSpeaking = false
      this.processQueue()
    }

    this.synth.speak(utterance)
  }

  // 停止播放
  stop() {
    this.synth.cancel()
    this.queue = []
    this.isSpeaking = false
  }

  // 是否正在说话
  get speaking() {
    return this.isSpeaking
  }

  // 预加载语音
  preload() {
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.loadVoice()
    }
    this.loadVoice()
  }
}

// 健身专用语音提示
export class FitnessCoach {
  private synth: SpeechSynthesizer

  constructor() {
    this.synth = new SpeechSynthesizer()
    this.synth.preload()
  }

  // 训练开始
  startWorkout(planName: string) {
    this.synth.speak(`准备开始${planName}，加油！`)
  }

  // 动作开始
  startExercise(exerciseName: string, sets: number, reps: number | string) {
    this.synth.speak(`下一个动作，${exerciseName}，${sets}组，每组${reps}`)
  }

  // 动作要点
  showTips(instructions: string[]) {
    const tip = instructions.slice(0, 2).join('。')
    this.synth.speak(`动作要点：${tip}`)
  }

  // 倒计时开始
  startCountdown(seconds: number, type: 'work' | 'rest') {
    const label = type === 'work' ? '训练' : '休息'
    this.synth.speak(`${label}开始，${seconds}秒`)
  }

  // 倒计时提醒（最后 3 秒）
  countdownTick(second: number) {
    if (second <= 3 && second > 0) {
      this.synth.speak(second.toString(), { rate: 0.8 })
    }
  }

  // 组间休息
  startRest(seconds: number, nextExercise: string) {
    this.synth.speak(`组间休息${seconds}秒，下一个动作是${nextExercise}`)
  }

  // 完成一组
  completeSet(currentSet: number, totalSets: number) {
    if (currentSet < totalSets) {
      this.synth.speak(`第${currentSet}组完成，继续加油`)
    }
  }

  // 完成训练
  completeWorkout(planName: string) {
    this.synth.speak(`太棒了！你完成了${planName}，休息一下，记得拉伸`)
  }

  // 鼓励语
  encourage() {
    const phrases = [
      '坚持住！',
      '做得很好！',
      '继续加油！',
      '你可以的！',
      '最后几个了！'
    ]
    const random = phrases[Math.floor(Math.random() * phrases.length)]
    this.synth.speak(random)
  }

  // 停止所有语音
  stop() {
    this.synth.stop()
  }
}

// 导出单例
export const coach = new FitnessCoach()
