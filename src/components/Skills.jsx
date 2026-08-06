import { motion } from 'framer-motion'
import { useState } from 'react'
import { skillGroups, skillsIntro, skills } from '../data/content'
import SectionAtmosphere from './SectionAtmosphere'

const Skills = () => {
  const [active, setActive] = useState(null)

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-b border-grid px-6 py-28 md:px-8 md:py-36"
    >
      <SectionAtmosphere variant="wash" />

      <div
        aria-hidden
        className="pointer-events-none absolute top-8 right-0 select-none font-display text-[clamp(8rem,22vw,18rem)] font-light leading-none text-ink/[0.04] md:top-4 md:right-8"
      >
        04
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-3 font-sans text-[12px] font-medium tracking-[0.18em] text-mute uppercase"
            >
              {skills.length} capabilities
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.75rem,6vw,4.75rem)] font-light tracking-tight text-ink"
            >
              Skills
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md font-sans text-[15px] font-light leading-[1.7] text-mute md:text-right md:text-[16px]"
          >
            {skillsIntro}
          </motion.p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: groupIndex * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid gap-4 border-t border-ink/10 pt-6 md:grid-cols-[140px_1fr] md:gap-10 md:pt-8"
            >
              <div className="flex items-baseline gap-3 md:block">
                <span className="font-sans text-[11px] tracking-[0.16em] text-mute">
                  {String(groupIndex + 1).padStart(2, '0')}
                </span>
                <p className="font-sans text-[12px] font-medium tracking-[0.18em] text-ink uppercase md:mt-2">
                  {group.label}
                </p>
              </div>

              <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-3 md:gap-x-4 md:gap-y-4">
                {group.items.map((skill, skillIndex) => {
                  const isDimmed = active !== null && active !== skill
                  return (
                    <li key={skill} className="flex items-baseline gap-x-3 md:gap-x-4">
                      <button
                        type="button"
                        onMouseEnter={() => setActive(skill)}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive(skill)}
                        onBlur={() => setActive(null)}
                        className="font-display text-[clamp(1.45rem,2.8vw,2.15rem)] font-light leading-none tracking-tight text-ink transition-[opacity,transform,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus-visible:outline-none"
                        style={{
                          opacity: isDimmed ? 0.22 : 1,
                        }}
                      >
                        {skill}
                      </button>
                      {skillIndex < group.items.length - 1 ? (
                        <span
                          aria-hidden
                          className="select-none font-display text-xl font-light text-mute/40 md:text-2xl"
                        >
                          /
                        </span>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
