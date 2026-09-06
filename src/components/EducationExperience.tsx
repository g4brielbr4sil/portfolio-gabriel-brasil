import { Briefcase } from '@phosphor-icons/react/dist/csr/Briefcase'
import { GraduationCap } from '@phosphor-icons/react/dist/csr/GraduationCap'
import { ArrowSquareOut } from '@phosphor-icons/react/dist/csr/ArrowSquareOut'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { education, experience } from '@/content/portfolio'

const EASE = [0.22, 1, 0.36, 1] as const

const sequence: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE },
  },
}

type TimelineEntry = {
  title: string
  metaLine: string
  description?: string
  details?: string[]
  href?: string
  linkLabel?: string
}

function certificationYear(issued: string) {
  return issued.match(/\b\d{4}\b/)?.[0] ?? issued
}

export default function EducationExperience({ detailed = false }: { detailed?: boolean }) {
  const reduced = useReducedMotion()
  const educationTimeline: TimelineEntry[] = [
    {
      title: education.degree.shortTitle,
      metaLine: `${education.degree.kind} · ${education.degree.institution}`,
    },
    ...education.certifications.map((certification) => ({
      title: certification.title,
      metaLine: `${certification.institution} · ${detailed ? certification.issued : certificationYear(certification.issued)}`,
      details: detailed
        ? [
            certification.description,
            ...(certification.expired ? [certification.expired] : []),
            ...(certification.credentialCode ? [`Código da credencial: ${certification.credentialCode}`] : []),
            ...(certification.skills.length ? [`Competências: ${certification.skills.join(', ')}`] : []),
          ]
        : undefined,
      href: detailed ? certification.credentialUrl : undefined,
      linkLabel: certification.credentialUrl ? 'Exibir credencial' : undefined,
    })),
  ]

  const experienceTimeline: TimelineEntry[] = experience.map((entry) => ({
    title: entry.role,
    metaLine: entry.organization ? `${entry.organization} · ${entry.meta}` : entry.meta,
    description: entry.description,
    details: detailed && entry.details ? entry.details : undefined,
  }))

  return (
    <section
      id="formacao"
      aria-labelledby="formation-title experience-title"
      className="portfolio-chapter journey-section px-4 sm:px-6 lg:px-8"
    >
      <span id="atuacao" className="absolute left-0 top-0" aria-hidden="true" />

      <motion.div
        className="portfolio-container grid w-full gap-14 px-0 py-16 sm:px-4 md:grid-cols-2 md:gap-[clamp(3.5rem,6vw,6.5rem)] lg:px-5 xl:py-20"
        variants={sequence}
        initial={reduced ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
      >
        <TimelineColumn
          id="formation-title"
          title="Formação"
          icon={<GraduationCap size={20} weight="regular" aria-hidden="true" />}
          accent="green"
          entries={educationTimeline}
        />

        <TimelineColumn
          id="experience-title"
          title="Experiência"
          icon={<Briefcase size={20} weight="regular" aria-hidden="true" />}
          accent="blue"
          entries={experienceTimeline}
        />
      </motion.div>
    </section>
  )
}

function TimelineColumn({
  id,
  title,
  icon,
  accent,
  entries,
}: {
  id: string
  title: string
  icon: React.ReactNode
  accent: 'green' | 'blue'
  entries: TimelineEntry[]
}) {
  const accentColor = accent === 'green' ? 'text-[#79a895]' : 'text-[#8198ad]'
  const firstDot = accent === 'green' ? 'bg-[#79a895]' : 'bg-[#8198ad]'

  return (
    <motion.div variants={item}>
      <h2 id={id} className="flex items-center gap-3 text-[22px] font-semibold tracking-[-0.02em] text-white lg:text-2xl 2xl:text-[26px]">
        <span className={accentColor}>{icon}</span>
        {title}
      </h2>

      <ol className="relative ml-1 mt-9 border-l border-white/35">
        {entries.map((entry, index) => (
          <motion.li
            key={entry.title}
            variants={item}
            className="relative min-h-[106px] pb-6 pl-5 last:min-h-0 last:pb-0 xl:min-h-[116px]"
          >
            <span
              className={`absolute -left-[5px] top-[5px] size-[9px] rounded-full ring-4 ring-[#020303] ${
                index === 0 ? firstDot : 'bg-white/65'
              }`}
              aria-hidden="true"
            />

            <div className="min-w-0">
              <h3 className="text-[14px] font-semibold leading-snug text-white/90 sm:text-[15px] xl:text-base">
                {entry.title}
              </h3>
              <p className="mt-1 text-[14px] leading-[1.6] text-white/52 sm:text-[15px] xl:text-base">{entry.metaLine}</p>
              {entry.description && (
                <p className="mt-2 text-[14px] leading-[1.65] text-white/58 sm:text-[15px] xl:text-base">{entry.description}</p>
              )}
            </div>

            {entry.details?.map((detail) => (
              <p key={detail} className="mt-2 text-[13px] leading-relaxed text-white/46 sm:text-sm xl:text-[15px]">
                {detail}
              </p>
            ))}

            {entry.href && entry.linkLabel && (
              <a
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-10 items-center gap-1.5 text-[13px] font-medium text-[#aebbb6] transition-colors hover:text-white sm:text-sm"
              >
                {entry.linkLabel}
                <ArrowSquareOut size={13} aria-hidden="true" />
              </a>
            )}
          </motion.li>
        ))}
      </ol>
    </motion.div>
  )
}
