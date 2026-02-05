 import { Volume2, VolumeX } from "lucide-react"
 
 interface SoundToggleProps {
   isMuted: boolean
   onToggle: () => void
 }
 
 export function SoundToggle({ isMuted, onToggle }: SoundToggleProps) {
   return (
     <button
       onClick={onToggle}
       className="fixed bottom-6 right-6 z-50 p-3 rounded-lg bg-muted/80 backdrop-blur-sm border border-primary/30 text-primary hover:bg-muted hover:border-primary/60 hover:text-primary transition-all duration-200 group arcade-glow"
       aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
     >
       {isMuted ? (
         <VolumeX className="w-6 h-6 opacity-60 group-hover:opacity-100" />
       ) : (
         <Volume2 className="w-6 h-6 animate-pulse-glow" />
       )}
     </button>
   )
 }