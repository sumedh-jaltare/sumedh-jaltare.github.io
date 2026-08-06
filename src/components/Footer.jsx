import { motion } from 'framer-motion'
import { contact } from '../data/content'
import SectionAtmosphere from './SectionAtmosphere'

const Footer = () => {
  const year = new Date().getFullYear()

  const links = [
    { label: contact.email, href: `mailto:${contact.email}` },
    { label: contact.phone, href: contact.phoneHref },
    { label: 'GitHub', href: contact.github, external: true },
    { label: 'LinkedIn', href: contact.linkedin, external: true },
  ]

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    )

    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <footer
      id="contact"
      className="relative overflow-hidden px-6 py-28 text-paper md:px-8 md:py-36"
    >
      <SectionAtmosphere variant="ink" />

      <div
        aria-hidden
        className="pointer-events-none absolute top-6 right-0 select-none font-display text-[clamp(8rem,22vw,18rem)] font-light leading-none text-white/[0.04] md:top-2 md:right-8"
      >
        05
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 font-sans text-[12px] font-medium tracking-[0.18em] text-white/45 uppercase"
          >
            Next
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl font-display text-[clamp(3rem,8vw,6.5rem)] font-light leading-[0.95] tracking-tight text-paper"
          >
            Let&apos;s build
            <br />
            something sharp.
          </motion.h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="max-w-md font-sans text-[15px] font-light leading-[1.7] text-white/55 md:text-[16px]">
              Open to internships, full-time roles, and collaborations. Based in{' '}
              {contact.location}.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              {links.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className="group flex items-baseline gap-4 border-b border-white/15 pb-3 transition hover:border-white/40"
                >
                  <span className="font-sans text-[11px] tracking-[0.14em] text-white/35">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-[clamp(1.35rem,2.5vw,1.85rem)] font-light tracking-tight text-paper transition group-hover:translate-x-1">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="border border-white/15 p-6 md:p-8"
          >
            <p className="mb-6 font-display text-2xl font-light tracking-tight text-paper md:text-3xl">
              Send a message
            </p>

            <div className="space-y-4">
              <input
                required
                name="name"
                type="text"
                placeholder="Your name"
                className="w-full border border-white/20 bg-transparent px-4 py-3 font-sans text-[13px] text-paper outline-none transition placeholder:text-white/35 focus:border-paper"
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Your email"
                className="w-full border border-white/20 bg-transparent px-4 py-3 font-sans text-[13px] text-paper outline-none transition placeholder:text-white/35 focus:border-paper"
              />
              <textarea
                required
                name="message"
                rows={5}
                placeholder="Your message"
                className="w-full resize-y border border-white/20 bg-transparent px-4 py-3 font-sans text-[13px] text-paper outline-none transition placeholder:text-white/35 focus:border-paper"
              />
              <button
                type="submit"
                className="mt-1 border border-paper bg-paper px-6 py-3 font-sans text-[11px] font-medium tracking-[0.14em] text-ink uppercase transition hover:bg-transparent hover:text-paper"
              >
                Send message
              </button>
            </div>
          </motion.form>
        </div>

        <p className="mt-20 font-sans text-xs tracking-wide text-white/35">
          © {year} Sumedh Jaltare
        </p>
      </div>
    </footer>
  )
}

export default Footer
