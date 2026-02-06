import synthwaveBg from "@/assets/comingsoon.png"
import PongGame from "@/components/PongGame"

const Index = () => {
  return (
    <main className="relative w-full min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${synthwaveBg})` }}
      >
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-background/60" />
      </div>
      
      {/* Scanline Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen">
        {/* Pong Game Canvas */}
        <PongGame />
      </div>

      
      {/* Vignette Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsl(270 60% 8% / 0.8) 100%)'
        }}
      />
    </main>
  )
}

export default Index
