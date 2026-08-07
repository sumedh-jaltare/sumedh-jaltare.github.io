import { motion } from 'framer-motion'
import { useState } from 'react'
import { contact } from '../data/content'
import SectionAtmosphere from './SectionAtmosphere'

const fieldClass =
  'w-full border border-white/20 bg-transparent px-4 py-3 font-sans text-[13px] text-paper outline-none transition placeholder:text-white/35 focus:border-paper disabled:opacity-60'

const Footer = () => {
  const year = new Date().getFullYear()
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const links = [
    { label: contact.email, href: `mailto:${contact.email}` },
    { label: contact.phone, href: contact.phoneHref },
    { label: 'GitHub', href: contact.github, external: true },
    { label: 'LinkedIn', href: contact.linkedin, external: true },
  ]

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const message = String(formData.get('message') || '').trim()

    if (!name || !email || !message) {
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(contact.email)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `Portfolio contact from ${name}`,
            _template: 'table',
            _captcha: 'false',
            _replyto: email,
          }),
        },
      )

      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to send message right now.')
      }

      form.reset()
      setStatus('sent')
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send message right now.',
      )
    }
  }

  return (
    <footer
      id="contact"
      className="relative overflow-hidden px-4 py-16 text-paper sm:px-6 sm:py-24 md:px-8 md:py-36"
    >
      <SectionAtmosphere variant="ink" />

      <div
        aria-hidden
        className="pointer-events-none absolute top-4 right-0 hidden select-none font-display text-[clamp(6rem,18vw,18rem)] font-light leading-none text-white/[0.04] sm:block md:top-2 md:right-8"
      >
        05
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-3 font-sans text-[11px] font-medium tracking-[0.18em] text-white/45 uppercase sm:text-[12px]"
          >
            Next
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl font-display text-[clamp(2.5rem,10vw,6.5rem)] font-light leading-[0.95] tracking-tight text-paper"
          >
            Let&apos;s build
            <br />
            something sharp.
          </motion.h2>
        </div>

        <div className="grid gap-12 sm:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="max-w-md font-sans text-[14px] font-light leading-[1.7] text-white/55 sm:text-[15px] md:text-[16px]">
              Open to internships, full-time roles, and collaborations. Based in{' '}
              {contact.location}.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:mt-10">
              {links.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  className="group flex items-baseline gap-3 border-b border-white/15 pb-3 transition hover:border-white/40 sm:gap-4"
                >
                  <span className="shrink-0 font-sans text-[11px] tracking-[0.14em] text-white/35">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 break-all font-display text-[clamp(1.15rem,4vw,1.85rem)] font-light tracking-tight text-paper transition group-hover:translate-x-1">
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
            className="border border-white/15 p-5 sm:p-6 md:p-8"
          >
            <p className="mb-5 font-display text-xl font-light tracking-tight text-paper sm:mb-6 sm:text-2xl md:text-3xl">
              Send a message
            </p>

            {status === 'sent' ? (
              <div className="space-y-4">
                <p className="font-sans text-[14px] leading-relaxed font-light text-white/70">
                  Message sent. I&apos;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="border border-paper bg-paper px-6 py-3 font-sans text-[11px] font-medium tracking-[0.14em] text-ink uppercase transition hover:bg-transparent hover:text-paper"
                >
                  Send another
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your name"
                  disabled={status === 'sending'}
                  className={fieldClass}
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Your email"
                  disabled={status === 'sending'}
                  className={fieldClass}
                />
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Your message"
                  disabled={status === 'sending'}
                  className={`${fieldClass} resize-y`}
                />

                {status === 'error' ? (
                  <p className="font-sans text-[12px] leading-relaxed text-white/65">
                    {errorMessage || 'Something went wrong. Please try again.'}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-1 w-full border border-paper bg-paper px-6 py-3 font-sans text-[11px] font-medium tracking-[0.14em] text-ink uppercase transition hover:bg-transparent hover:text-paper disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </div>
            )}
          </motion.form>
        </div>

        <p className="mt-14 font-sans text-xs tracking-wide text-white/35 sm:mt-20">
          © {year} Sumedh Jaltare
        </p>
      </div>
    </footer>
  )
}

export default Footer
