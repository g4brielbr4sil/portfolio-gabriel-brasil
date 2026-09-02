import type { MouseEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { sections, type NavSection, type SectionId } from '@/config/navigation'
import type { RouteKind } from '@/config/routes'
import BrandDots from '@/components/brand/BrandDots'
import { useActiveSection } from '@/hooks/useActiveSection'
import { isModifiedNavigationEvent, shouldNavigateInPage } from '@/lib/navigation-state'

type Props = {
  current?: RouteKind
  overlayOpen?: boolean
}

const navigationOrder: SectionId[] = ['inicio', 'formacao', 'tecnologias', 'projetos', 'sobre']

const navigationItems = navigationOrder
  .map((id) => sections.find((section) => section.id === id))
  .filter((section): section is NavSection => Boolean(section))

export default function Navigation({ current }: Props) {
  const { active, navigate } = useActiveSection()
  const reduced = useReducedMotion()
  const currentAria = current && current !== 'home' ? 'page' : 'location'

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, id: SectionId) {
    if (isModifiedNavigationEvent(event) || !shouldNavigateInPage(window.location.pathname, id)) return

    event.preventDefault()
    navigate(id, { focus: id !== 'inicio' })
  }

  return (
    <motion.nav
      aria-label="Navegação principal"
      className="fixed left-1/2 top-[18px] z-50 w-[calc(100%_-_16px)] max-w-[960px] -translate-x-1/2 sm:w-[calc(100%_-_32px)] 2xl:max-w-[1020px]"
      initial={reduced ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        data-navigation-bar
        className="reference-nav-scroll flex h-[47px] items-center overflow-x-auto rounded-full bg-[#070707]/94 px-[7px] shadow-[0_14px_42px_rgba(0,0,0,0.32)] backdrop-blur-xl xl:h-[49px]"
      >
        <a
          href="/"
          onClick={(event) => handleNavigation(event, 'inicio')}
          className="flex min-h-11 shrink-0 items-center gap-2 px-3 text-[13px] font-semibold tracking-[-0.01em] text-white min-[470px]:pl-6 min-[470px]:pr-3 min-[900px]:pl-[46px] xl:pl-[52px] xl:text-sm"
          aria-label="Gabriel Brasil, voltar ao início"
        >
          <BrandMark />
          <span className="hidden min-[470px]:inline">Gabriel Brasil</span>
        </a>

        <span className="mx-2 h-4 w-px shrink-0 bg-white/10" aria-hidden="true" />

        <ul className="ml-1 flex min-w-max items-center gap-1 min-[900px]:ml-[clamp(2rem,9vw,6rem)] min-[900px]:gap-1.5 xl:ml-[clamp(3rem,10vw,7rem)] xl:gap-2" role="list">
          {navigationItems.map((section) => {
            const Icon = section.icon
            const isActive = active === section.id

            return (
              <li key={section.id}>
                <a
                  href={section.href}
                  onClick={(event) => handleNavigation(event, section.id)}
                  aria-current={isActive ? currentAria : undefined}
                  className={`flex min-h-8 items-center gap-[7px] rounded-full px-2 text-[11px] font-semibold uppercase transition-colors duration-200 sm:min-h-11 sm:px-[11px] min-[900px]:min-h-9 min-[900px]:px-3 xl:px-[14px] xl:text-[12px] ${
                    isActive
                      ? 'bg-white text-black'
                      : 'text-white/58 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <Icon size={13} weight={isActive ? 'fill' : 'regular'} aria-hidden="true" />
                  <span className="hidden min-[900px]:inline">{section.label}</span>
                  <span className="sr-only min-[900px]:hidden">{section.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </motion.nav>
  )
}

function BrandMark() {
  return <BrandDots className="mr-0.5" />
}
