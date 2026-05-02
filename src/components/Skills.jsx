import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const MotionArticle = motion.article

const skillItems = [
  {
    name: 'JavaScript',
    category: 'Language',
    icon: 'https://cdn.simpleicons.org/javascript/F7DF1E',
  },
  {
    name: 'TypeScript',
    category: 'Language',
    icon: 'https://cdn.simpleicons.org/typescript/3178C6',
  },
  {
    name: 'Python',
    category: 'Language',
    icon: 'https://cdn.simpleicons.org/python/3776AB',
  },
  {
    name: 'SQL',
    category: 'Language',
    icon: 'https://cdn.simpleicons.org/postgresql/4169E1',
  },
  {
    name: 'React.js',
    category: 'Frontend',
    icon: 'https://cdn.simpleicons.org/react/61DAFB',
  },
  {
    name: 'Vite',
    category: 'Frontend',
    icon: 'https://cdn.simpleicons.org/vite/646CFF',
  },
  {
    name: 'HTML',
    category: 'Frontend',
    icon: 'https://cdn.simpleicons.org/html5/E34F26',
  },
  {
    name: 'CSS',
    category: 'Frontend',
    icon: 'https://cdn.simpleicons.org/css3/1572B6',
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E',
  },
  {
    name: 'Express.js',
    category: 'Backend',
    icon: 'https://cdn.simpleicons.org/express/FFFFFF',
  },
  {
    name: 'FastAPI',
    category: 'Backend',
    icon: 'https://cdn.simpleicons.org/fastapi/009688',
  },
  {
    name: 'Flask',
    category: 'Backend',
    icon: 'https://cdn.simpleicons.org/flask/FFFFFF',
  },
  {
    name: 'REST APIs',
    category: 'Backend',
    icon: 'https://cdn.simpleicons.org/postman/FF6C37',
  },
  {
    name: 'JWT',
    category: 'Backend',
    icon: 'https://cdn.simpleicons.org/auth0/EB5424',
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    icon: 'https://cdn.simpleicons.org/postgresql/4169E1',
  },
  {
    name: 'MySQL',
    category: 'Database',
    icon: 'https://cdn.simpleicons.org/mysql/4479A1',
  },
  {
    name: 'MongoDB',
    category: 'Database',
    icon: 'https://cdn.simpleicons.org/mongodb/47A248',
  },
  {
    name: 'Supabase',
    category: 'Tooling',
    icon: 'https://cdn.simpleicons.org/supabase/3FCF8E',
  },
  {
    name: 'TanStack Query',
    category: 'Tooling',
    icon: 'https://cdn.simpleicons.org/reactquery/FF4154',
  },
  {
    name: 'Git',
    category: 'Tooling',
    icon: 'https://cdn.simpleicons.org/git/F05032',
  },
  {
    name: 'Machine Learning',
    category: 'AI/ML',
    icon: 'https://cdn.simpleicons.org/scikitlearn/F7931E',
  },
  {
    name: 'Figma',
    category: 'Design',
    icon: 'https://cdn.simpleicons.org/figma/F24E1E',
  },
  {
    name: 'Canva',
    category: 'Design',
    icon: 'https://cdn.simpleicons.org/canva/00C4CC',
  },
]

const Skills = () => {
  return (
    <section id="skills" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          badge="Skills"
          title="Technical stack used across frontend, backend, and AI-enabled products"
          subtitle="Languages, frameworks, databases, and tools I actively use for production-ready development."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skillItems.map((skill, index) => (
            <MotionArticle
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-panel group flex items-center gap-4 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-slate-900/80">
                <img
                  src={skill.icon}
                  alt={`${skill.name} icon`}
                  className="h-7 w-7 transition duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
                  {skill.category}
                </p>
              </div>
            </MotionArticle>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
