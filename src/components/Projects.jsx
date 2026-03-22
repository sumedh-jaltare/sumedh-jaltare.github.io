import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'

const MotionDiv = motion.div
const MotionArticle = motion.article

const projects = [
  {
    title: 'AyuPlus - Multi-Clinic Management Platform',
    description:
      'Live clinic management platform covering appointments, patients, billing, templates, and dashboard metrics with secure multi-clinic data access.',
    techStack: [
      'React 19',
      'TypeScript',
      'Vite',
      'TanStack Query',
      'Supabase Auth',
      'Supabase Edge Functions',
      'PostgreSQL',
    ],
    github: 'https://github.com/sumedh-jaltare',
    liveDemo: '',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1500&q=80',
  },
  {
    title: 'Patient-Centric Healthcare Platform',
    description:
      'Hackathon-winning healthcare backend using FastAPI for symptom assessment and urgency triage, with LLM-assisted reasoning and recommendation workflows.',
    techStack: [
      'FastAPI',
      'Python',
      'LLM-Assisted Reasoning',
      'Rule Engine',
      'Recommendation System',
    ],
    github: 'https://github.com/sumedh-jaltare',
    liveDemo: '',
    image:
      'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=1500&q=80',
  },
  {
    title: 'LiveProof - Behavioral Human Verification',
    description:
      'Proof-of-concept system that verifies human presence using behavioral interaction signals such as reaction time, cursor path length, and speed variance.',
    techStack: [
      'Flask',
      'Python',
      'Machine Learning',
      'Browser Interaction Analytics',
    ],
    github: 'https://github.com/sumedh-jaltare',
    liveDemo: '',
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1500&q=80',
  },
  {
    title: 'PDF Analyzer',
    description:
      'Document analysis tool for extracting structured information from PDFs, with automated parsing pipelines for downstream search and analysis use cases.',
    techStack: ['Python', 'PDF Parsing', 'Data Extraction', 'Automation'],
    github: 'https://github.com/sumedh-jaltare',
    liveDemo: '',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1500&q=80',
  },
  {
    title: 'Job Portal for Freshers',
    description:
      'Recruiter-candidate platform built with PHP and MySQL for authentication, job postings, and application tracking, with a responsive React frontend.',
    techStack: ['React', 'PHP', 'MySQL', 'Tailwind CSS', 'HTML/CSS'],
    github: 'https://github.com/sumedh-jaltare',
    liveDemo: '',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1500&q=80',
  },
  {
    title: 'Spotify Clone',
    description:
      'Web music player inspired by Spotify with playlist navigation, audio playback controls, and responsive UI behavior using modular JavaScript.',
    techStack: ['JavaScript', 'HTML', 'CSS', 'Git'],
    github: 'https://github.com/sumedh-jaltare',
    liveDemo: '',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1500&q=80',
  },
]

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 26,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    if (!selectedProject) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject])

  return (
    <section id="projects" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          badge="Projects"
          title="Project portfolio spanning healthcare, analytics, and web platforms"
          subtitle="Production-style and hackathon projects focused on architecture, user outcomes, and scalable implementation."
        />

        <MotionDiv
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              variants={cardVariants}
              onPreview={setSelectedProject}
            />
          ))}
        </MotionDiv>

        <AnimatePresence>
          {selectedProject && (
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-md"
            >
              <MotionArticle
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={(event) => event.stopPropagation()}
                className="glass-panel relative w-full max-w-4xl overflow-hidden border-white/20 bg-slate-950/90"
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:border-cyan-300/70 hover:text-cyan-100"
                >
                  Close
                </button>

                <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative h-72 lg:h-full">
                    <img
                      src={selectedProject.image}
                      alt={`${selectedProject.title} preview`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/60 via-transparent to-cyan-500/10" />
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200">
                      Project Preview
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold text-white">
                      {selectedProject.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300">
                      {selectedProject.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {selectedProject.techStack.map((item) => (
                        <span
                          key={`modal-${item}`}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      {selectedProject.github ? (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
                        >
                          GitHub
                        </a>
                      ) : (
                        <span className="rounded-full border border-cyan-300/20 bg-cyan-400/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-cyan-200/70">
                          GitHub
                        </span>
                      )}
                      {selectedProject.liveDemo ? (
                        <a
                          href={selectedProject.liveDemo}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-100 transition hover:border-white/40"
                        >
                          Live Demo
                        </a>
                      ) : (
                        <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                          Live Demo
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </MotionArticle>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects
