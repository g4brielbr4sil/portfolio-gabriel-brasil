import { Stack as StackIcon } from '@phosphor-icons/react/dist/csr/Stack'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { stackGroups } from '@/components/icons/tech/stackGroups'

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

export default function Stack() {
  const reduced = useReducedMotion()

  return (
    <section
      id="tecnologias"
      aria-labelledby="technologies-title"
      className="portfolio-chapter stack-section overflow-hidden px-4 sm:px-6 lg:px-8"
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
          Stack
        </motion.h2>

        <div className="stack-groups mt-9 grid gap-x-10 gap-y-7 sm:mt-10 min-[900px]:grid-cols-2 xl:gap-x-14 xl:gap-y-8">
          {stackGroups.map((stackGroup) => (
            <motion.section
              key={stackGroup.title}
              data-stack-area={stackGroup.area}
              variants={group}
              initial={reduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.52 }}
              className="border-t border-white/10 pt-4"
            >
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/44 sm:text-sm xl:text-[15px]">
                {stackGroup.title}
              </h3>
              <motion.ul className="mt-3.5 flex flex-wrap gap-2.5 sm:gap-3" variants={group}>
                {stackGroup.items.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <motion.li
                      key={item.name}
                      custom={index}
                      variants={technology}
                      className="inline-flex min-h-12 min-w-0 items-center gap-2.5 rounded-[7px] border border-white/14 bg-[#0d1111]/90 px-3.5 py-2.5 text-[14px] font-semibold text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition-colors duration-200 hover:border-white/24 hover:bg-[#121717] sm:px-4 sm:text-[15px] xl:min-h-[52px] xl:text-base"
                    >
                      <Icon className="shrink-0" size={22} />
                      <span className="min-w-0 leading-tight">{item.name}</span>
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
