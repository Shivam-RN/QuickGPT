import React, { useEffect, useState } from 'react'

const Loading = () => {
  const navigate = () => console.log('Navigating to home...')
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState('')
  const [loadingPhase, setLoadingPhase] = useState(0)

  const phases = [
    { text: "Initializing", emoji: "🚀" },
    { text: "Connecting", emoji: "🌐" },
    { text: "Loading Data", emoji: "📊" },
    { text: "Almost Ready", emoji: "✨" }
  ]

  useEffect(() => {
    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + (Math.random() * 3 + 1), 100)
        const phaseIndex = Math.floor((newProgress / 100) * phases.length)
        setLoadingPhase(Math.min(phaseIndex, phases.length - 1))
        return newProgress
      })
    }, 150)

    // Dots animation
    const dotsInterval = setInterval(() => {
      setDots(prev => prev === '...' ? '' : prev + '.')
    }, 500)

    const timeout = setTimeout(() => {
      navigate()
    }, 8000)

    return () => {
      clearTimeout(timeout)
      clearInterval(progressInterval)
      clearInterval(dotsInterval)
    }
  }, [])

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              animation: 'grid-shift 20s ease-in-out infinite'
            }}
          ></div>
        </div>
      </div>

      {/* Glassmorphism container */}
      <div className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-12 w-full max-w-md transform hover:scale-105 transition-all duration-500 hover:shadow-purple-500/25">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10 text-center mb-10">
          <div className="inline-block">
            <div className="text-6xl mb-6 animate-bounce">
              {phases[loadingPhase].emoji}
            </div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-2">
              {phases[loadingPhase].text}{dots}
            </h1>
            <p className="text-white/60 text-sm font-medium">
              Setting up your experience
            </p>
          </div>
        </div>

        {/* Loading content */}
        <div className="space-y-8 relative z-10">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-white/20 border-t-purple-400 border-r-cyan-400 rounded-full animate-spin"></div>
              <div className="absolute inset-3 w-18 h-18 border-4 border-purple-400/30 border-b-purple-400 border-l-cyan-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-lg animate-pulse"></div>
            </div>
          </div>

          {/* Progress section */}
          <div className="space-y-4">
            <div className="relative group">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
                <div className="flex justify-between text-sm font-semibold mb-3">
                  <span className="text-purple-300">Progress</span>
                  <span className="text-cyan-300">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 via-purple-400 to-cyan-400 rounded-full transition-all duration-300 ease-out relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
      </div>

      {/* Custom CSS for grid animation */} 
      <style>{`
        @keyframes grid-shift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(25px, 25px); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
        }
      `}</style>
    </div>
  )
}

export default Loading
