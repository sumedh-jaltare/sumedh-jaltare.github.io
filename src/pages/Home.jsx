import { motion } from 'framer-motion'
import About from '../components/About'
import Achievements from '../components/Achievements'
import Contact from '../components/Contact'
import Education from '../components/Education'
import Experience from '../components/Experience'
import GitHubSection from '../components/GitHubSection'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Projects from '../components/Projects'
import Skills from '../components/Skills'

const MotionDiv = motion.div

const sectionTransition = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.14 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
}

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          animate={{ x: [0, 34, 0], y: [0, 22, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-40 top-8 h-96 w-96 rounded-full bg-cyan-500/25 blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -38, 0], y: [0, 28, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[-10rem] top-64 h-80 w-80 rounded-full bg-indigo-500/25 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -24, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-8rem] left-[45%] h-80 w-80 rounded-full bg-fuchsia-500/25 blur-[130px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_38%),radial-gradient(circle_at_bottom,rgba(139,92,246,0.12),transparent_35%)]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <MotionDiv {...sectionTransition}>
            <Hero />
          </MotionDiv>
          <MotionDiv {...sectionTransition}>
            <About />
          </MotionDiv>
          <MotionDiv {...sectionTransition}>
            <Skills />
          </MotionDiv>
          <MotionDiv {...sectionTransition}>
            <Projects />
          </MotionDiv>
          <MotionDiv {...sectionTransition}>
            <GitHubSection />
          </MotionDiv>
          <MotionDiv {...sectionTransition}>
            <Experience />
          </MotionDiv>
          <MotionDiv {...sectionTransition}>
            <Achievements />
          </MotionDiv>
          <MotionDiv {...sectionTransition}>
            <Education />
          </MotionDiv>
          <MotionDiv {...sectionTransition}>
            <Contact />
          </MotionDiv>
        </main>
      </div>
    </div>
  )
}

export default Home
