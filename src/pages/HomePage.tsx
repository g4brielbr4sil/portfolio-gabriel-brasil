import Navigation from '@/components/navigation/Navigation'
import Hero from '@/components/Hero'
import EducationExperience from '@/components/EducationExperience'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Stack from '@/components/Stack'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <main id="conteudo" tabIndex={-1}>
        <EducationExperience />
        <Stack />
        <Projects />
        <About />
      </main>
      <Footer />
    </>
  )
}
