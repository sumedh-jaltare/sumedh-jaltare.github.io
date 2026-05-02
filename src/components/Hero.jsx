import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const MotionDiv = motion.div
const MotionAside = motion.aside

const heroButtons = [
  { label: 'View Projects', href: '#projects', isPrimary: true },
  {
    label: 'GitHub',
    href: 'https://github.com/sumedh-jaltare',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sumedh-jaltare/',
    external: true,
  },
]

const quickStats = [
  { value: '6+', label: 'Full-stack projects built' },
  { value: '30+', label: 'Tech fest events supported' },
  { value: '2027', label: 'Expected B.E. graduation' },
]

const currentFocus = [
  'Scalable web apps with React, Node.js, and FastAPI',
  'Secure backend systems with Supabase Auth and PostgreSQL RLS',
  'LLM-assisted and ML-backed healthcare workflow products',
]

const typingPhrases = [
  'healthcare and productivity platforms.',
  'secure full-stack systems.',
  'AI-enabled web applications.',
]

const Hero = () => {
  const [typedText, setTypedText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex]
    const hasFinishedTyping = typedText === currentPhrase
    const hasFinishedDeleting = typedText === ''

    let timeoutMs = isDeleting ? 45 : 90

    if (hasFinishedTyping && !isDeleting) {
      timeoutMs = 1200
    } else if (hasFinishedDeleting && isDeleting) {
      timeoutMs = 280
    }

    const timeout = window.setTimeout(() => {
      if (hasFinishedTyping && !isDeleting) {
        setIsDeleting(true)
        return
      }

      if (hasFinishedDeleting && isDeleting) {
        setIsDeleting(false)
        setPhraseIndex((value) => (value + 1) % typingPhrases.length)
        return
      }

      const nextLength = typedText.length + (isDeleting ? -1 : 1)
      setTypedText(currentPhrase.slice(0, nextLength))
    }, timeoutMs)

    return () => window.clearTimeout(timeout)
  }, [typedText, isDeleting, phraseIndex])

  return (
    <section id="hero" className="px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pt-28">
      <div className="grid w-full items-center gap-12 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[1.15fr_0.85fr]">
        <MotionDiv
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full"
        >
          <span className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
            Full-Stack Developer
          </span>
          <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Building full-stack products for
            <span className="text-gradient block min-h-[1.25em]">
              {typedText}
              <span className="typing-cursor">|</span>
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            I am Sumedh Jaltare, a full-stack developer experienced in building
            scalable web applications with React, Node.js, and FastAPI. I focus on
            secure backend architecture, practical product delivery, and end-to-end
            execution.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {heroButtons.map((button) => (
              <a
                key={button.label}
                href={button.href}
                target={button.external ? '_blank' : undefined}
                rel={button.external ? 'noreferrer' : undefined}
                className={
                  button.isPrimary
                    ? 'rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-slate-950 transition hover:opacity-90'
                    : 'rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:text-cyan-100'
                }
              >
                {button.label}
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {quickStats.map((stat) => (
              <div
                key={stat.label}
                className="glass-panel px-4 py-3 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40"
              >
                <p className="font-mono text-xl font-semibold text-cyan-200">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </MotionDiv>

        <MotionAside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
          className="relative"
        >
          <div className="glass-panel p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-200">
              Current Focus
            </p>
            <ul className="mt-5 space-y-4">
              {currentFocus.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  <p className="text-sm leading-relaxed text-slate-200">{item}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-white/10 bg-slate-950/80 p-4 font-mono text-xs text-cyan-100">
              <p>$ npx portfolio --stack</p>
              <p className="mt-2 text-slate-300">
                React 19 - TypeScript - FastAPI - Supabase - PostgreSQL
              </p>
              <p className="mt-3 text-cyan-300">
                Status: open to internship and full-time opportunities
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-10 -right-10 -z-10 h-40 w-40 rounded-full bg-fuchsia-500/30 blur-3xl" />
        </MotionAside>
      </div>
    </section>
  )
}

export default Hero
