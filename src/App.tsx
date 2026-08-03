import { useState } from 'react'
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

export default function App() {
  const [overlayOpen, setOverlayOpen] = useState(false)

  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={300}>
      <div className="min-h-screen bg-ink text-cream">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Navigation overlayOpen={overlayOpen} />
        <Hero />
        <main id="conteudo" tabIndex={-1}>
          <About />
          <Projects onOverlayChange={setOverlayOpen} />
          <Skills />
          <Stack />
          <Experience />
          <Education />
          <Contact />
        </main>
        <div className="h-20 md:hidden" aria-hidden="true" />
      </div>
    </TooltipProvider>
  )
}
