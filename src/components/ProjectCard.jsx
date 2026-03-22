import { motion } from 'framer-motion'

const MotionArticle = motion.article
const MotionLink = motion.a

const ProjectCard = ({ project, variants, onPreview }) => {
  return (
    <MotionArticle
      variants={variants}
      whileHover={{
        y: -10,
        scale: 1.01,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      className="glass-panel group relative flex h-full flex-col overflow-hidden transition duration-300 hover:border-cyan-300/60"
    >
      <div className="relative h-52 overflow-hidden">
        <button
          type="button"
          onClick={() => onPreview(project)}
          className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-100 transition hover:border-cyan-300/70 hover:text-cyan-100"
        >
          Preview
        </button>
        <motion.img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-cyan-300/0 transition duration-500 group-hover:bg-cyan-300/10" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-200"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          {project.github ? (
            <MotionLink
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              GitHub
            </MotionLink>
          ) : (
            <span className="rounded-full border border-cyan-300/20 bg-cyan-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-cyan-200/70">
              GitHub
            </span>
          )}
          {project.liveDemo ? (
            <MotionLink
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-100 transition hover:border-white/40"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Live Demo
            </MotionLink>
          ) : (
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
              Live Demo
            </span>
          )}
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 -bottom-20 h-20 bg-accent-gradient opacity-0 blur-2xl"
          whileHover={{ opacity: 0.25, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </MotionArticle>
  )
}

export default ProjectCard
