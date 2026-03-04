// 音频提示音 - 使用 Web Audio API
export class SoundEffects {
  private audioContext: AudioContext | null = null
  private enabled = true

  constructor() {
    // 延迟初始化 AudioContext（需要用户交互后才能播放）
  }

  private init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  // 启用音效
  enable() {
    this.enabled = true
    this.init()
  }

  // 禁用音效
  disable() {
    this.enabled = false
  }

  // 播放提示音
  play(type: 'start' | 'complete' | 'rest' | 'countdown' | 'error') {
    if (!this.enabled || !this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    switch (type) {
      case 'start':
        // 开始 - 高音滴声
        oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
        oscillator.start()
        oscillator.stop(this.audioContext.currentTime + 0.1)
        break

      case 'complete':
        // 完成 - 成功和弦
        this.playChord([523.25, 659.25, 783.99], 0.3)
        break

      case 'rest':
        // 休息 - 低音提示
        oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime)
        oscillator.start()
        oscillator.stop(this.audioContext.currentTime + 0.2)
        break

      case 'countdown':
        // 倒计时 - 短促滴声
        oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime)
        oscillator.start()
        oscillator.stop(this.audioContext.currentTime + 0.05)
        break

      case 'error':
        // 错误 - 低沉音
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
        oscillator.start()
        oscillator.stop(this.audioContext.currentTime + 0.3)
        break
    }
  }

  // 播放和弦
  private playChord(frequencies: number[], duration: number) {
    if (!this.audioContext) return

    frequencies.forEach((freq, i) => {
      const oscillator = this.audioContext!.createOscillator()
      const gainNode = this.audioContext!.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext!.destination)

      oscillator.frequency.setValueAtTime(freq, this.audioContext!.currentTime)
      gainNode.gain.setValueAtTime(0.15, this.audioContext!.currentTime)
      
      oscillator.start(this.audioContext!.currentTime + i * 0.05)
      oscillator.stop(this.audioContext!.currentTime + duration + i * 0.05)
    })
  }

  // 倒计时滴答声
  playCountdownTick(second: number) {
    if (second <= 3 && second > 0) {
      this.play('countdown')
    }
  }
}

// 导出单例
export const sounds = new SoundEffects()
