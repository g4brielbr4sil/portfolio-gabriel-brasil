import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Clock } from '@phosphor-icons/react/dist/csr/Clock'
import { cn } from '@/lib/utils'

const TIME_ZONE = 'America/Sao_Paulo'

const formatter = new Intl.DateTimeFormat('pt-BR', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

/** "14:32" no fuso de Brasília, independente do fuso do dispositivo. */
function readClock(date = new Date()) {
  return {
    label: formatter.format(date),
    /** Valor legível por máquina para o <time>, em horário local de Brasília. */
    dateTime: new Intl.DateTimeFormat('sv-SE', {
      timeZone: TIME_ZONE,
      dateStyle: 'short',
      timeStyle: 'short',
      hour12: false,
    })
      .format(date)
      .replace(' ', 'T'),
  }
}

/**
 * Relógio de Brasília. A fonte do horário está isolada em `readClock`, então
 * trocar o cálculo local por uma resposta de API depois não afeta o componente.
 */
export default function BsbClock({ className }: { className?: string }) {
  const reduced = useReducedMotion()
  const [clock, setClock] = useState({ label: '--:--', dateTime: '' })

  useEffect(() => {
    let timeout: number

    // Sincroniza com a virada do minuto em vez de contar segundos.
    function schedule() {
      const now = new Date()
      const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds()
      timeout = window.setTimeout(() => {
        setClock(readClock())
        schedule()
      }, Math.max(delay, 1000))
    }

    setClock(readClock())
    schedule()
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <motion.span
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[11px] tabular-nums tracking-[0.12em] text-cream/45',
        className,
      )}
    >
      <Clock size={13} weight="light" aria-hidden="true" className="text-cream/35" />
      <time dateTime={clock.dateTime || undefined} aria-label={clock.dateTime ? `Horário em Brasília: ${clock.label}` : 'Carregando horário de Brasília'}>
        {clock.label}
      </time>
      <span aria-hidden="true" className="text-cream/30">
        BSB
      </span>
    </motion.span>
  )
}
