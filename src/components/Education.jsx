import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const MotionArticle = motion.article

const Education = () => {
  return (
    <section id="education" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full">
        <SectionHeader
          badge="Education"
          title="Academic background in Information Technology"
          subtitle="Current undergraduate studies focused on software engineering, systems design, and practical development."
        />

        <MotionArticle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="glass-panel border-l-4 border-l-cyan-300/60 p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200">
              Pune University
            </p>
            <p className="text-xs font-medium text-slate-300">
              Expected Graduation: May 2027
            </p>
          </div>
          <h3 className="mt-3 text-xl font-semibold text-white">
            Bachelor of Engineering in Information Technology
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Coursework and project work centered on full-stack development, data
            systems, and scalable software design.
          </p>
        </MotionArticle>
      </div>
    </section>
  )
}

export default Education
