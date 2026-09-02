import { Stack as StackIcon } from '@phosphor-icons/react/dist/csr/Stack'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { technologyShowcaseGroups } from '@/content/portfolio'

const EASE = [0.22, 1, 0.36, 1] as const

const heading: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

const group: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, staggerChildren: 0.07 },
  },
}

const technology: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? -18 : 24,
    y: 26 + (index % 3) * 9,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: 'spring', stiffness: 115, damping: 18, mass: 0.8 },
  },
}

const technologyMarks: Record<string, { label: string; color: string }> = {
  HTML5: { label: '5', color: '#f05435' },
  CSS3: { label: '3', color: '#3478db' },
  JavaScript: { label: 'JS', color: '#f2ce33' },
  TypeScript: { label: 'TS', color: '#4e95e8' },
  React: { label: '⚛', color: '#43c9df' },
  Vite: { label: 'V', color: '#a77cff' },
  'Tailwind CSS': { label: 'TW', color: '#43c9df' },
  'Material UI': { label: 'M', color: '#4e95e8' },
  Motion: { label: 'M', color: '#e8ed58' },
  'React Hook Form': { label: 'HF', color: '#e96b91' },
  Python: { label: 'PY', color: '#efcf4a' },
  FastAPI: { label: 'FA', color: '#35c985' },
  SQLAlchemy: { label: 'SQ', color: '#e16d61' },
  Pydantic: { label: 'PD', color: '#e96b91' },
  'APIs REST': { label: '↔', color: '#4d83ff' },
  SQLite: { label: 'DB', color: '#4e95e8' },
  PostgreSQL: { label: 'PG', color: '#769bd3' },
  'Supabase Auth': { label: 'S', color: '#35c985' },
  Git: { label: '◆', color: '#f05435' },
  GitHub: { label: 'GH', color: '#f1f1f1' },
  Docker: { label: 'D', color: '#4e95e8' },
  Linux: { label: 'L', color: '#f2ce33' },
  'Cloudflare Pages': { label: 'CF', color: '#f0a23c' },
  n8n: { label: 'N', color: '#e96b91' },
  Webhooks: { label: 'WH', color: '#9e8cff' },
  'Gmail OAuth': { label: 'G', color: '#e16d61' },
  'Google Calendar': { label: '31', color: '#4d83ff' },
  'GitHub Actions': { label: 'GA', color: '#4e95e8' },
  'TypeScript typecheck': { label: 'TS', color: '#4e95e8' },
  Ruff: { label: 'R', color: '#bba6ff' },
  unittest: { label: '✓', color: '#35c985' },
  Figma: { label: 'F', color: '#b99ce8' },
  'Microsoft Office': { label: 'MS', color: '#d98966' },
  'File Management': { label: 'FM', color: '#8ca8ba' },
  'Network Configuration': { label: 'NC', color: '#74a4b8' },
  'Cable Management': { label: 'CM', color: '#a6a18a' },
  'Data Entry': { label: 'DE', color: '#90a997' },
}

export default function Stack() {
  const reduced = useReducedMotion()

  return (
    <section
      id="tecnologias"
      aria-labelledby="technologies-title"
      className="portfolio-chapter stack-section px-4 sm:px-6 lg:px-8"
    >
      <div className="portfolio-container w-full px-0 py-16 sm:px-4 lg:px-5 xl:py-20">
        <motion.h2
          id="technologies-title"
          className="flex items-center gap-3 text-[23px] font-semibold tracking-[-0.02em] text-white sm:text-2xl xl:text-[26px]"
          variants={heading}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <StackIcon size={24} weight="fill" className="text-[#a86f78]" aria-hidden="true" />
          Tech Stack
        </motion.h2>

        <div className="mt-11 space-y-[26px]">
          {technologyShowcaseGroups.map((stackGroup) => (
            <motion.section
              key={stackGroup.category}
              variants={group}
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.52 }}
            >
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/44 sm:text-sm xl:text-[15px]">
                {stackGroup.category}
              </h3>
              <motion.ul className="mt-3 flex flex-wrap gap-3" variants={group}>
                {stackGroup.items.map((item, index) => {
                  const mark = technologyMarks[item]

                  return (
                    <motion.li
                      key={item}
                      custom={index}
                      variants={technology}
                      className="inline-flex h-[48px] items-center gap-3 rounded-[5px] border border-white/17 bg-[#0f1414] px-4 text-sm font-semibold text-white/78 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] sm:text-[15px] xl:h-[52px] xl:px-5 xl:text-base"
                    >
                      <span
                        className="min-w-5 text-center font-mono text-[15px] font-bold leading-none xl:text-base"
                        style={{ color: mark.color }}
                        aria-hidden="true"
                      >
                        {mark.label}
                      </span>
                      {item}
                    </motion.li>
                  )
                })}
              </motion.ul>
            </motion.section>
          ))}
        </div>
      </div>
    </section>
  )
}
