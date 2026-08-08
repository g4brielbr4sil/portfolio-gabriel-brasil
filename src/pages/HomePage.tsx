import { useState } from 'react'
import Navigation from '@/components/navigation/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Stack from '@/components/Stack'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Contact from '@/components/Contact'

export default function HomePage() {
  const [overlayOpen, setOverlayOpen] = useState(false)

  return (
    <>
      <Navigation overlayOpen={overlayOpen} />
      <Hero />
      <main id="conteudo" tabIndex={-1}>
        <About />
        <Projects onOverlayChange={setOverlayOpen} />
        <Skills />
        <Experience />
        <Stack />
        <Education />
        <Contact />
      </main>
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  )
}
