import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const MotionArticle = motion.article

const achievements = [
  {
    title: 'National Level Hackathon Winner - Best Solution Award',
    detail:
      'Won Best Solution for building a patient-centric healthcare platform focused on symptom assessment and care navigation.',
  },
  {
    title: 'Adobe Hackathon 2025',
    detail:
      'Advanced past Round 1 by developing technical solutions and collaborating under tight hackathon timelines.',
  },
  {
    title: 'Udyamotsav National Pitching Competition - Finalist',
    detail:
      'Selected among the top 400 teams from 10,000+ participants, presenting startup problem-solution fit and market feasibility to judges.',
  },
]

const Achievements = () => {
  return (
    <section id="achievements" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          badge="Achievements"
          title="National-level recognition in hackathons and innovation events"
          subtitle="Milestones that reflect technical execution, presentation skills, and problem-solving under pressure."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <MotionArticle
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-panel p-6"
            >
              <h3 className="text-lg font-semibold text-white">{achievement.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {achievement.detail}
              </p>
            </MotionArticle>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
