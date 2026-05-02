import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const MotionArticle = motion.article

const experienceItems = [
  {
    org: 'App Club, PES Modern College of Engineering',
    role: 'Design and Media Head',
    period: 'Jun 2025 - Present',
    description:
      'Leading design initiatives and creating responsive promotional assets with Figma and HTML/CSS while coordinating timelines and execution across teams.',
  },
  {
    org: 'National Level Tech Fest',
    role: 'Head of Media and Design',
    period: '2025',
    description:
      'Led design and media operations for a national-level technical festival with 30+ events, including a national hackathon and project competition.',
  },
  {
    org: 'National Techno Exhibition',
    role: 'Project Lead',
    period: 'Oct 2025',
    description:
      'Presented finalist full-stack projects at a national technology exhibition and explained architecture and system design decisions to judges and attendees.',
  },
]

const Experience = () => {
  return (
    <section id="experience" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full">
        <SectionHeader
          badge="Experience"
          title="Leadership and execution across technical and design roles"
          subtitle="Roles where I combined engineering delivery, communication, and cross-team coordination."
        />

        <div className="space-y-4">
          {experienceItems.map((item, index) => (
            <MotionArticle
              key={item.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-panel border-l-4 border-l-cyan-300/60 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200">
                  {item.org}
                </p>
                <p className="text-xs font-medium text-slate-300">{item.period}</p>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.role}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {item.description}
              </p>
            </MotionArticle>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
