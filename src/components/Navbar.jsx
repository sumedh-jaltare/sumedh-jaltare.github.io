import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navLinks } from '../data/content'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (event, href) => {
    const target = document.querySelector(href)
    if (!target) {
      return
    }
    event.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', href)
    setOpen(false)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-paper/90' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-8">
        <a
          href="#hero"
          onClick={(event) => handleNavClick(event, '#hero')}
          className="font-sans text-[16px] font-semibold tracking-[0.18em] text-ink uppercase md:text-[17px]"
        >
          Sumedh
        </a>

        <ul className="hidden items-center gap-6 lg:flex lg:gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="link-underline font-sans text-[15px] font-semibold tracking-wide text-ink md:text-[16px]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="font-sans text-[13px] tracking-wide text-ink lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <div className="border-t border-grid bg-paper px-4 py-6 sm:px-6 lg:hidden">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="font-display text-[clamp(2rem,8vw,3rem)] font-semibold text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.header>
  )
}

export default Navbar
