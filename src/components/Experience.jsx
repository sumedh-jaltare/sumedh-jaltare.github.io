import { motion } from 'framer-motion'
import { experienceItems, experienceIntro } from '../data/content'
import SectionAtmosphere from './SectionAtmosphere'

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative overflow-hidden border-b border-grid px-6 py-28 md:px-8 md:py-36"
    >
      <SectionAtmosphere variant="mist" />

      <div
        aria-hidden
        className="pointer-events-none absolute top-8 right-0 select-none font-display text-[clamp(8rem,22vw,18rem)] font-light leading-none text-ink/[0.04] md:top-4 md:right-8"
      >
        03
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
              Timeline
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.75rem,6vw,4.75rem)] font-light tracking-tight text-ink"
            >
              Experience
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md font-sans text-[15px] font-light leading-[1.7] text-mute md:text-right md:text-[16px]"
          >
            {experienceIntro}
          </motion.p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute top-3 bottom-3 left-[7px] w-px bg-ink/15 md:left-[9px]"
          />

          <ul className="space-y-14 md:space-y-20">
            {experienceItems.map((item, index) => (
              <motion.li
                key={`${item.role}-${item.org}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative grid gap-3 pl-12 md:grid-cols-[200px_1fr] md:gap-14 md:pl-14"
              >
                <span
                  aria-hidden
                  className="absolute top-3 left-0 h-4 w-4 rounded-full border border-ink bg-paper transition-transform duration-300 group-hover:scale-125 md:top-4"
                />
                <span
                  aria-hidden
                  className="absolute top-[18px] left-[5px] h-1.5 w-1.5 rounded-full bg-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:top-[22px] md:left-[7px]"
                />

                <div>
                  <p className="font-display text-[clamp(1.75rem,3vw,2.35rem)] font-light leading-none tracking-tight text-ink/25 transition-colors duration-300 group-hover:text-ink/50">
                    {item.period}
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] tracking-tight text-ink transition duration-300 group-hover:-translate-y-0.5">
                    {item.role}
                  </h3>
                  <p className="mt-3 font-sans text-[13px] tracking-wide text-mute md:text-[14px]">
                    {item.org}
                  </p>
                  <p className="mt-4 max-w-xl font-sans text-[14px] leading-relaxed font-light text-ink/70 md:text-[15px]">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Experience
