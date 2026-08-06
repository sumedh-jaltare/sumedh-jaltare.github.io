import { motion } from 'framer-motion'
import { useState } from 'react'
import { aboutParagraphs, achievements, education } from '../data/content'
import SectionAtmosphere from './SectionAtmosphere'

const About = () => {
  const [activeAchievement, setActiveAchievement] = useState(null)
  const [lead, ...rest] = aboutParagraphs

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-grid px-6 py-28 md:px-8 md:py-36"
    >
      <SectionAtmosphere variant="mist" />

      <div
        aria-hidden
        className="pointer-events-none absolute top-8 right-0 select-none font-display text-[clamp(8rem,22vw,18rem)] font-light leading-none text-ink/[0.04] md:top-4 md:right-8"
      >
        01
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-3 font-sans text-[12px] font-medium tracking-[0.18em] text-mute uppercase"
            >
              Profile
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.75rem,6vw,4.75rem)] font-light tracking-tight text-ink"
            >
              About
            </motion.h2>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-display text-[clamp(1.65rem,3.4vw,2.65rem)] font-light leading-[1.25] tracking-tight text-ink"
        >
          {lead}
        </motion.p>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16">
          <div className="space-y-5">
            {rest.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-sans text-[14px] leading-[1.75] font-light text-ink/75 md:text-[15px]"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-ink/10 pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-10"
          >
            <p className="font-sans text-[12px] font-medium tracking-[0.18em] text-mute uppercase">
              Education
            </p>
            <p className="mt-4 font-display text-[clamp(3rem,7vw,5rem)] font-light leading-none tracking-tight text-ink">
              {education.detail.match(/[\d.]+/)?.[0] ?? education.detail}
            </p>
            <p className="mt-2 font-sans text-[12px] tracking-wide text-mute">
              CGPA · out of 10
            </p>
            <p className="mt-6 font-display text-xl font-light tracking-tight text-ink md:text-2xl">
              {education.degree}
            </p>
            <p className="mt-2 font-sans text-[13px] text-mute">
              {education.school} · {education.period}
            </p>
            <p className="mt-4 font-sans text-[13px] leading-relaxed font-light text-ink/70">
              {education.coursework}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 border-t border-ink/10 pt-10 md:mt-20"
        >
          <p className="mb-6 font-sans text-[12px] font-medium tracking-[0.18em] text-mute uppercase">
            Achievements
          </p>
          <ul className="space-y-0">
            {achievements.map((item, index) => {
              const isDimmed =
                activeAchievement !== null && activeAchievement !== item
              return (
                <li key={item}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveAchievement(item)}
                    onMouseLeave={() => setActiveAchievement(null)}
                    onFocus={() => setActiveAchievement(item)}
                    onBlur={() => setActiveAchievement(null)}
                    className="group flex w-full items-baseline gap-5 border-b border-grid py-4 text-left transition-[opacity] duration-300 focus-visible:outline-none md:gap-8 md:py-5"
                    style={{ opacity: isDimmed ? 0.22 : 1 }}
                  >
                    <span className="shrink-0 font-sans text-[11px] tracking-[0.14em] text-mute">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-[clamp(1.15rem,2.2vw,1.55rem)] font-light leading-snug tracking-tight text-ink transition group-hover:-translate-y-0.5">
                      {item}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

export default About
