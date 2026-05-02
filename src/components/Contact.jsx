import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const MotionForm = motion.form
const MotionAside = motion.aside

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/sumedh-jaltare',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sumedh-jaltare/',
    external: true,
  },
  { label: 'Email', href: 'mailto:jaltaresr@gmail.com' },
  { label: 'Phone', href: 'tel:+919765586498' },
]

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    )

    window.location.href = `mailto:jaltaresr@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="px-4 py-16 pb-24 sm:px-6 lg:px-8">
      <div className="w-full">
        <SectionHeader
          badge="Contact"
          title="Have an idea to build? Let's connect"
          subtitle="Reach out for internship roles, full-time opportunities, hackathons, or product collaborations."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <MotionForm
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="glass-panel p-6"
          >
            <div className="space-y-4">
              <input
                required
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none ring-cyan-300/40 transition focus:border-cyan-300/60 focus:ring"
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Your email"
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none ring-cyan-300/40 transition focus:border-cyan-300/60 focus:ring"
              />
              <textarea
                required
                name="message"
                rows="5"
                placeholder="Your message"
                className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none ring-cyan-300/40 transition focus:border-cyan-300/60 focus:ring"
              />
              <button
                type="submit"
                className="rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-slate-950 transition hover:opacity-90"
              >
                Send Message
              </button>
            </div>
          </MotionForm>

          <MotionAside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="glass-panel p-6"
          >
            <h3 className="text-xl font-semibold text-white">Reach Out Directly</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Best for hiring conversations, technical collaboration, and project
              discussions.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:text-cyan-100"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-cyan-300/30 bg-cyan-400/10 p-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-100">
                Availability
              </p>
              <p className="mt-2 text-sm text-slate-200">
                Open to internships, full-time roles, and impactful full-stack
                projects in 2026.
              </p>
            </div>
          </MotionAside>
        </div>
      </div>
    </section>
  )
}

export default Contact
