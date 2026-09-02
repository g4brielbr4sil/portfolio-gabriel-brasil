import { EnvelopeSimple } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import { FileText } from '@phosphor-icons/react/dist/csr/FileText'
import { GithubLogo } from '@phosphor-icons/react/dist/csr/GithubLogo'
import { LinkedinLogo } from '@phosphor-icons/react/dist/csr/LinkedinLogo'
import { motion, useReducedMotion } from 'motion/react'
import { contact } from '@/content/portfolio'
import BrandDots from '@/components/brand/BrandDots'

const EASE = [0.22, 1, 0.36, 1] as const

const quickLinks = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Formação', href: '/#formacao' },
  { label: 'Tecnologias', href: '/#tecnologias' },
  { label: 'Projetos', href: '/#projetos' },
  { label: 'Sobre', href: '/#sobre' },
] as const

export default function Footer({ overlap = true }: { overlap?: boolean }) {
  const reduced = useReducedMotion()
  const year = new Date().getFullYear()

  return (
    <footer
      id="contato"
      className={`relative scroll-mt-24 border-t border-white/12 px-5 sm:px-8 ${overlap ? 'mt-0' : 'mt-12'}`}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="portfolio-container px-1.5 pb-24 pt-1 md:pb-8"
      >
        <div className="grid gap-10 py-7 md:grid-cols-[1.25fr_0.75fr_0.72fr] md:gap-14">
          <div>
            <a href="/#inicio" className="inline-flex min-h-10 items-center gap-2 font-semibold" aria-label="Gabriel Brasil, voltar ao início">
              <BrandDots />
              <span className="text-[17px] text-white/88 xl:text-lg">Gabriel Brasil</span>
            </a>
            <p className="mt-3 max-w-[330px] text-sm leading-[1.65] text-white/58 xl:text-[15px]">
              Desenvolvedor Full Stack e Analista de Sistemas em Brasília, DF.
            </p>
          </div>

          <nav aria-label="Links rápidos do rodapé">
            <h2 className="text-[15px] font-semibold text-white/88 xl:text-base">Links rápidos</h2>
            <ul className="mt-3 space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-8 items-center text-sm text-white/48 transition-colors hover:text-white/88 xl:text-[15px]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:justify-self-end md:text-right">
            <h2 className="text-[15px] font-semibold text-white/88 xl:text-base">Vamos conversar</h2>
            <div className="mt-3 flex items-center gap-0 md:translate-x-4">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Gabriel Brasil"
                className="inline-flex size-10 items-center justify-center text-white/48 transition-colors duration-200 hover:text-[#aebbb6] md:size-9"
              >
                <GithubLogo size={18} weight="fill" aria-hidden="true" />
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Gabriel Brasil"
                className="inline-flex size-10 items-center justify-center text-white/48 transition-colors duration-200 hover:text-[#aebbb6] md:size-9"
              >
                <LinkedinLogo size={18} weight="fill" aria-hidden="true" />
              </a>
              <a
                href={contact.mailto}
                aria-label={`Enviar e-mail para ${contact.email}`}
                className="inline-flex size-10 items-center justify-center text-white/48 transition-colors duration-200 hover:text-[#aebbb6] md:size-9"
              >
                <EnvelopeSimple size={19} weight="fill" aria-hidden="true" />
              </a>
              {contact.resume && (
                <a
                  href={contact.resume}
                  download={contact.resumeDownloadName}
                  aria-label="Baixar currículo de Gabriel Brasil"
                  className="inline-flex size-10 items-center justify-center text-white/48 transition-colors duration-200 hover:text-[#aebbb6] md:size-9"
                >
                  <FileText size={18} weight="fill" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 text-center text-[13px] text-white/46 xl:text-sm">
          © {year} Gabriel Brasil. Todos os direitos reservados.
        </div>
      </motion.div>
    </footer>
  )
}
