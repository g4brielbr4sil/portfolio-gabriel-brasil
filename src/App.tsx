import type { ReactNode } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function App({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={300}>
      <div className="min-h-screen bg-ink text-cream">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
      </div>
    </TooltipProvider>
  )
}
