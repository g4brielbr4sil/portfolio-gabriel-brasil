import { TooltipProvider } from '@/components/ui/tooltip'
import Navigation from '@/components/navigation/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Stack from '@/components/Stack'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import { useState } from 'react'

export default function App() {
  const [overlayOpen, setOverlayOpen] = useState(false)

  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={300}>
      <div className="min-h-screen bg-ink text-cream">
        <Navigation overlayOpen={overlayOpen} />
        <Hero />
        <main>
          <About />
          <Projects onOverlayChange={setOverlayOpen} />
          <Skills />
          <Stack />
          <Experience />
          <Education />
          <Contact />
        </main>
        {/* Respiro para o dock inferior do celular não cobrir o rodapé. */}
        <div className="h-20 md:hidden" aria-hidden="true" />
      </div>
    </TooltipProvider>
  )
}
