import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const MotionArticle = motion.article
const MotionAside = motion.aside

const focusAreas = [
  'Building scalable frontend systems with React, TypeScript, and Vite',
  'Designing secure backend APIs with JWT, FastAPI, and Node.js',
  'Integrating ML and LLM-assisted pipelines for healthcare workflows',
]

const About = () => {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          badge="About"
          title="Execution-focused full-stack developer with product ownership"
          subtitle="I build practical web products from architecture to deployment, combining frontend development, backend system design, and user-centric decision making."
        />

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <MotionArticle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-6 sm:p-8"
          >
            <p className="text-base leading-relaxed text-slate-200">
              I work across frontend and backend with a strong focus on maintainable
              systems, secure data handling, and clean user flows. My recent builds
              include multi-clinic management tools, healthcare triage platforms,
              and behavioral verification prototypes.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Alongside engineering, I have led design and media teams in national
              technical events, which strengthened my communication, presentation,
              and cross-functional collaboration skills.
            </p>
          </MotionArticle>

          <MotionAside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="glass-panel p-6 sm:p-8"
          >
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-200">
              What I optimize for
            </h3>
            <ul className="mt-5 space-y-4">
              {focusAreas.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  <p className="text-sm leading-relaxed text-slate-200">{item}</p>
                </li>
              ))}
            </ul>
          </MotionAside>
        </div>
      </div>
    </section>
  )
}

export default About
