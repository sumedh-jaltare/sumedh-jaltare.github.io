import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { projects, workIntro } from '../data/content'
import { loadActivity } from '../lib/activityApi'
import ContributionGraph from './ContributionGraph'
import SectionAtmosphere from './SectionAtmosphere'

const formatDate = (value) => {
  if (!value) return ''
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

const FeaturedRow = ({ project, index, canHover, isSpotlight, onEnter, onLeave }) => {
  const [isActive, setIsActive] = useState(false)

  const handleEnter = () => {
    if (!canHover) return
    setIsActive(true)
    onEnter?.(project.title)
  }

  const handleLeave = () => {
    if (!canHover) return
    setIsActive(false)
    onLeave?.()
  }

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.55,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative grid items-center gap-6 border-b border-ink/10 py-9 transition-[opacity] duration-300 md:grid-cols-[auto_minmax(0,1fr)_minmax(180px,280px)_auto] md:gap-10 md:py-11"
      style={{
        opacity: isSpotlight === null || isSpotlight === project.title ? 1 : 0.22,
      }}
    >
      <span className="font-sans text-[12px] tracking-[0.16em] text-mute">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="min-w-0">
        <motion.span
          animate={{ x: isActive ? 10 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block font-display text-[clamp(2rem,4.2vw,3.5rem)] font-light leading-[0.95] tracking-tight text-ink"
        >
          {project.title}
        </motion.span>
        <p className="mt-4 max-w-lg font-sans text-[12px] font-light tracking-wide text-mute md:text-[13px]">
          {project.tech}
        </p>
      </div>

      <div className="relative hidden h-[120px] overflow-hidden md:block">
        <AnimatePresence>
          {canHover && isActive && (
            <motion.img
              key={project.title}
              src={project.image}
              alt=""
              initial={{ opacity: 0, scale: 1.06, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.04, y: 8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover grayscale"
            />
          )}
        </AnimatePresence>
      </div>

      <span className="justify-self-end font-display text-2xl font-light text-mute transition group-hover:text-ink">
        →
      </span>
    </motion.a>
  )
}

const ProjectList = () => {
  const [canHover, setCanHover] = useState(false)
  const [activity, setActivity] = useState(null)
  const [showAllRepos, setShowAllRepos] = useState(false)
  const [spotlight, setSpotlight] = useState(null)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    let active = true
    loadActivity()
      .then((payload) => {
        if (active) setActivity(payload)
      })
      .catch(() => {
        if (active) setActivity(null)
      })
    return () => {
      active = false
    }
  }, [])

  const github = activity?.github
  const leetcode = activity?.leetcode
  const repos = github?.repos || []
  const visibleRepos = showAllRepos ? repos : repos.slice(0, 4)
  const hiddenCount = Math.max(0, repos.length - 4)

  return (
    <section
      id="work"
      className="relative overflow-hidden border-b border-grid px-6 py-28 md:px-8 md:py-36"
    >
      <SectionAtmosphere variant="wash" />

      <div
        aria-hidden
        className="pointer-events-none absolute top-8 right-0 select-none font-display text-[clamp(8rem,22vw,18rem)] font-light leading-none text-ink/[0.04] md:top-4 md:right-8"
      >
        02
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-3 font-sans text-[12px] font-medium tracking-[0.18em] text-mute uppercase"
            >
              Selected & live
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.75rem,6vw,4.75rem)] font-light tracking-tight text-ink"
            >
              Work
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md font-sans text-[15px] font-light leading-[1.7] text-mute md:text-right md:text-[16px]"
          >
            {workIntro}
          </motion.p>
        </div>

        <div className="mb-20">
          <p className="mb-2 font-sans text-[12px] font-medium tracking-[0.18em] text-mute uppercase">
            Featured
          </p>
          <div className="border-t border-ink/10">
            {projects.map((project, index) => (
              <FeaturedRow
                key={project.title}
                project={project}
                index={index}
                canHover={canHover}
                isSpotlight={spotlight}
                onEnter={setSpotlight}
                onLeave={() => setSpotlight(null)}
              />
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-sans text-[12px] font-medium tracking-[0.18em] text-mute uppercase">
                GitHub repositories
              </p>
              <a
                href={github?.url || 'https://github.com/sumedh-jaltare'}
                target="_blank"
                rel="noreferrer"
                className="link-underline mt-2 inline-block font-display text-2xl font-light text-ink md:text-3xl"
              >
                @{github?.username || 'sumedh-jaltare'}
              </a>
            </div>
            <p className="font-sans text-[13px] text-mute">
              {github?.publicRepos ?? '—'} public · {github?.followers ?? '—'}{' '}
              followers
            </p>
          </div>

          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {visibleRepos.map((repo, index) => (
              <motion.li
                key={repo.url}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid gap-2 py-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.5fr)_auto] md:items-baseline md:gap-8"
                >
                  <span className="font-display text-[clamp(1.45rem,2.6vw,2rem)] font-light tracking-tight text-ink transition group-hover:translate-x-1">
                    {repo.name}
                  </span>
                  <span className="font-sans text-[13px] font-light leading-relaxed text-mute md:text-[14px]">
                    {repo.description || 'No description yet.'}
                  </span>
                  <span className="font-sans text-[12px] tracking-wide text-mute md:justify-self-end">
                    {repo.language}
                    {repo.updatedAt ? ` · ${formatDate(repo.updatedAt)}` : ''}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>

          {repos.length > 4 ? (
            <button
              type="button"
              onClick={() => setShowAllRepos((value) => !value)}
              className="mt-6 font-sans text-[13px] tracking-wide text-ink transition hover:text-mute"
            >
              {showAllRepos
                ? 'Show less'
                : `See more (${hiddenCount} more)`}
            </button>
          ) : null}

          <div className="mt-10">
            <ContributionGraph
              days={github?.calendar || []}
              title="GitHub contributions"
              subtitle={`${github?.totalContributions ?? 0} contributions · ${github?.streak ?? 0}-day streak`}
              href="https://github.com/sumedh-jaltare"
            />
          </div>
        </div>

        <div>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-sans text-[12px] font-medium tracking-[0.18em] text-mute uppercase">
                LeetCode
              </p>
              <a
                href={leetcode?.url || 'https://leetcode.com/u/Sumedh_Jaltare/'}
                target="_blank"
                rel="noreferrer"
                className="link-underline mt-2 inline-block font-display text-2xl font-light text-ink md:text-3xl"
              >
                @{leetcode?.username || 'Sumedh_Jaltare'}
              </a>
            </div>
            {leetcode?.ranking ? (
              <p className="font-sans text-[13px] text-mute">
                Rank #{leetcode.ranking.toLocaleString()}
              </p>
            ) : null}
          </div>

          <div className="mb-10 grid grid-cols-2 gap-8 border-y border-ink/10 py-8 sm:grid-cols-4">
            {[
              ['Solved', leetcode?.totalSolved],
              ['Easy', leetcode?.easy],
              ['Medium', leetcode?.medium],
              ['Hard', leetcode?.hard],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="font-display text-[clamp(2.35rem,5vw,3.5rem)] font-light leading-none text-ink">
                  {value ?? '—'}
                </p>
                <p className="mt-3 font-sans text-[11px] tracking-[0.14em] text-mute uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <ContributionGraph
            days={leetcode?.calendar || []}
            title="LeetCode activity"
            subtitle={`${leetcode?.totalActiveDays ?? 0} active days · ${leetcode?.streak ?? 0}-day streak`}
            href="https://leetcode.com/u/Sumedh_Jaltare/"
            emptyLabel="LeetCode activity graph loading…"
          />
        </div>
      </div>
    </section>
  )
}

export default ProjectList
