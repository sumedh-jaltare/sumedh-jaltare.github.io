import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const MotionHeader = motion.header

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [activeHref, setActiveHref] = useState('#hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`)
          }
        })
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0.01,
      },
    )

    navLinks.forEach(({ href }) => {
      const section = document.querySelector(href)
      if (section) {
        observer.observe(section)
      }
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (event, href) => {
    if (!href.startsWith('#')) {
      return
    }

    const target = document.querySelector(href)
    if (!target) {
      return
    }

    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', href)
    setActiveHref(href)
  }

  return (
    <MotionHeader
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:px-6 lg:px-8"
    >
      <nav className="pointer-events-auto mx-auto w-full max-w-6xl rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-4 shadow-[0_14px_50px_-20px_rgba(56,189,248,0.4)] backdrop-blur-2xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
        <a
          href="#hero"
          onClick={(event) => handleNavClick(event, '#hero')}
          className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-slate-100 transition hover:text-cyan-200"
        >
          sumedh.j
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className={`text-sm font-medium transition ${
                  activeHref === link.href
                    ? 'text-cyan-200'
                    : 'text-slate-300 hover:text-cyan-200'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(event) => handleNavClick(event, '#contact')}
          className="hidden rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20 sm:inline-flex"
        >
          Let's Connect
        </a>
        </div>

      <div className="mt-3 flex gap-2 overflow-x-auto border-t border-white/10 pt-3 md:hidden [&::-webkit-scrollbar]:hidden">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(event) => handleNavClick(event, link.href)}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              activeHref === link.href
                ? 'border-cyan-300/60 bg-cyan-400/15 text-cyan-100'
                : 'border-white/10 bg-white/5 text-slate-200 hover:border-cyan-300/60 hover:text-cyan-100'
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
      </nav>
    </MotionHeader>
  )
}

export default Navbar
