import { useCallback, useRef, useState } from "react"
 
 export function useArcadeSounds() {
   const audioContextRef = useRef<AudioContext | null>(null)
  const [isMuted, setIsMuted] = useState(false)
 
   const getAudioContext = useCallback(() => {
     if (!audioContextRef.current) {
       audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
     }
     return audioContextRef.current
   }, [])
 
  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = "square", volume: number = 0.15, muted: boolean = false) => {
    if (muted) return
    
     try {
       const ctx = getAudioContext()
       
       const oscillator = ctx.createOscillator()
       const gainNode = ctx.createGain()
       
       oscillator.connect(gainNode)
       gainNode.connect(ctx.destination)
       
       oscillator.type = type
       oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)
       
       // Quick attack and decay for retro feel
       gainNode.gain.setValueAtTime(0, ctx.currentTime)
       gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01)
       gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
       
       oscillator.start(ctx.currentTime)
       oscillator.stop(ctx.currentTime + duration)
     } catch (e) {
       // Audio context may be blocked until user interaction
       console.log("Audio not available yet")
     }
   }, [getAudioContext])
 
   const playPixelHit = useCallback(() => {
    if (isMuted) return
     // High pitched blip - cyan neon sound
    playTone(880, 0.08, "square", 0.12, isMuted)
  }, [playTone, isMuted])
 
   const playPaddleHit = useCallback(() => {
    if (isMuted) return
     // Lower boop with slight pitch bend
     const ctx = getAudioContext()
     try {
       const oscillator = ctx.createOscillator()
       const gainNode = ctx.createGain()
       
       oscillator.connect(gainNode)
       gainNode.connect(ctx.destination)
       
       oscillator.type = "triangle"
       oscillator.frequency.setValueAtTime(220, ctx.currentTime)
       oscillator.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.1)
       
       gainNode.gain.setValueAtTime(0, ctx.currentTime)
       gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01)
       gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
       
       oscillator.start(ctx.currentTime)
       oscillator.stop(ctx.currentTime + 0.15)
     } catch (e) {
       console.log("Audio not available yet")
     }
  }, [getAudioContext, isMuted])
 
   const playWallBounce = useCallback(() => {
    if (isMuted) return
     // Quick thud
    playTone(150, 0.05, "sine", 0.1, isMuted)
  }, [playTone, isMuted])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])
 
   return {
     playPixelHit,
     playPaddleHit,
     playWallBounce,
    isMuted,
    toggleMute,
   }
 }