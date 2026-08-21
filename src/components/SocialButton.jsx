import { motion } from 'framer-motion'
import { useState } from 'react'

const IconX = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const IconGitHub = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
)

const IconLeetCode = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.19.165 1.926 1.926 0 0 0-.066.029c-.024.01-.046.022-.067.033a1.95 1.95 0 0 0-.341.386 5.28 5.28 0 0 0-.846 2.282c-.155.983-.055 1.99.288 2.91a5.27 5.27 0 0 0 1.839 2.403 1.347 1.347 0 0 0 .183.125c.27.154.56.267.863.34a5.29 5.29 0 0 0 2.906.177 5.27 5.27 0 0 0 2.43-1.213L24.01 8.01a1.374 1.374 0 0 0-1.125-2.266H13.483zm.12 1.5h7.82L9.207 17.687a3.776 3.776 0 0 1-1.74.867 3.79 3.79 0 0 1-2.086-.127 3.77 3.77 0 0 1-1.316-1.72 3.78 3.78 0 0 1-.206-2.084 3.77 3.77 0 0 1 .606-1.632L8.79 7.29l4.812-5.352a.12.12 0 0 1 .001-.002z" />
  </svg>
)

const IconShare = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
  </svg>
)

export const SOCIAL_ICONS = {
  x: IconX,
  linkedin: IconLinkedIn,
  github: IconGitHub,
  leetcode: IconLeetCode,
}

const itemClass = (i, total) =>
  [
    'relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden',
    'border-r border-ink/10 bg-paper text-ink last:border-r-0',
    'transition-colors duration-200 hover:bg-white/90',
    'outline-none focus-visible:ring-1 focus-visible:ring-paper',
    i === 0 ? 'rounded-l-md' : '',
    i === total - 1 ? 'rounded-r-md' : '',
  ].join(' ')

const SocialButton = ({
  label = 'Share',
  items = [],
  onShare,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  const handleActivate = (index, item, event) => {
    setActiveIndex(index)
    onShare?.(index, item)
    window.setTimeout(() => setActiveIndex(null), 300)

    if (item.href && event?.metaKey) return
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsVisible(false)
        }
      }}
    >
      <motion.div
        animate={{ opacity: isVisible ? 0 : 1 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className={isVisible ? 'pointer-events-none' : ''}
      >
        <button
          type="button"
          className="relative flex min-w-40 items-center justify-center gap-2 border border-white/20 bg-transparent px-5 py-2.5 font-sans text-[11px] font-medium tracking-[0.14em] text-paper uppercase transition hover:border-paper"
          aria-expanded={isVisible}
          aria-label={label}
        >
          <IconShare />
          {label}
        </button>
      </motion.div>

      <motion.div
        animate={{ width: isVisible ? 'auto' : 0 }}
        className="absolute top-0 left-0 flex h-10 overflow-hidden"
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {items.map((item, i) => {
          const Icon = item.icon
          const sharedMotion = {
            animate: {
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : -20,
            },
            transition: {
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1],
              delay: isVisible ? i * 0.05 : 0,
            },
          }

          const inner = (
            <>
              <motion.div
                animate={{ scale: activeIndex === i ? 0.85 : 1 }}
                className="relative z-10"
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <Icon />
              </motion.div>
              <motion.div
                animate={{ opacity: activeIndex === i ? 0.12 : 0 }}
                className="absolute inset-0 bg-ink"
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
            </>
          )

          if (item.href) {
            return (
              <motion.a
                key={`share-${item.id}`}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className={itemClass(i, items.length)}
                onClick={(event) => handleActivate(i, item, event)}
                {...sharedMotion}
              >
                {inner}
              </motion.a>
            )
          }

          return (
            <motion.button
              key={`share-${item.id}`}
              type="button"
              aria-label={item.label}
              className={itemClass(i, items.length)}
              onClick={(event) => handleActivate(i, item, event)}
              {...sharedMotion}
            >
              {inner}
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}

export default SocialButton
