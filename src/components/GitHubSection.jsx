import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { fetchGitHubBundle, GITHUB_USERNAME } from '../lib/githubApi'

const MotionDiv = motion.div
const MotionArticle = motion.article

const countFormatter = new Intl.NumberFormat('en-US')
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const formatCount = (value) => countFormatter.format(value || 0)

const formatDate = (value) => {
  if (!value) {
    return 'Unknown'
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return 'Unknown'
  }

  return dateFormatter.format(parsed)
}

const normalizeExternalUrl = (value) => {
  if (!value) {
    return ''
  }

  const trimmedValue = value.trim()
  if (!trimmedValue) {
    return ''
  }

  if (
    trimmedValue.startsWith('http://') ||
    trimmedValue.startsWith('https://')
  ) {
    return trimmedValue
  }

  return `https://${trimmedValue}`
}

const GitHubSection = () => {
  const [bundle, setBundle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    let isMounted = true

    const loadGitHubData = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetchGitHubBundle(GITHUB_USERNAME, {
          refresh: refreshCount > 0,
        })

        if (isMounted) {
          setBundle(response)
        }
      } catch (fetchError) {
        if (isMounted) {
          const message =
            fetchError instanceof Error
              ? fetchError.message
              : 'Unable to fetch GitHub data.'
          setError(message)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadGitHubData()

    return () => {
      isMounted = false
    }
  }, [refreshCount])

  const contributionCards = [
    {
      label: 'Public Events (30d)',
      value: bundle?.contributions.publicEvents || 0,
    },
    {
      label: 'Commits Pushed',
      value: bundle?.contributions.commits || 0,
    },
    {
      label: 'PRs Opened',
      value: bundle?.contributions.pullRequests || 0,
    },
    {
      label: 'Active Days',
      value: bundle?.contributions.activeDays || 0,
    },
    {
      label: 'Issues Opened',
      value: bundle?.contributions.issuesOpened || 0,
    },
    {
      label: 'Repos Contributed',
      value: bundle?.contributions.repositoriesTouched || 0,
    },
  ]

  return (
    <section id="github" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          badge="GitHub"
          title="Live GitHub profile and repositories"
          subtitle={`Fetched from the GitHub API for @${GITHUB_USERNAME}. This section shows profile details, public contribution activity, and recent repositories.`}
        />

        {isLoading && (
          <div className="space-y-5">
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="glass-panel h-56 animate-pulse bg-white/10" />
              <div className="glass-panel h-56 animate-pulse bg-white/10" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <div className="glass-panel h-64 animate-pulse bg-white/10" />
              <div className="glass-panel h-64 animate-pulse bg-white/10" />
              <div className="glass-panel h-64 animate-pulse bg-white/10" />
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="glass-panel p-6">
            <p className="text-base font-medium text-rose-200">
              Could not load GitHub data.
            </p>
            <p className="mt-2 text-sm text-slate-300">{error}</p>
            <button
              type="button"
              onClick={() => setRefreshCount((value) => value + 1)}
              className="mt-4 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
            >
              Retry Fetch
            </button>
          </div>
        )}

        {!isLoading && !error && bundle && (
          <>
            <MotionDiv
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <MotionArticle variants={cardVariants} className="glass-panel p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <img
                    src={bundle.profile.avatarUrl}
                    alt={`${bundle.profile.login} avatar`}
                    className="h-20 w-20 rounded-2xl border border-white/20 object-cover"
                    loading="lazy"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200">
                      @{bundle.profile.login}
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold text-white">
                      {bundle.profile.name || bundle.profile.login}
                    </h3>
                    {bundle.profile.bio && (
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {bundle.profile.bio}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/15 bg-white/5 p-3">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-slate-400">
                      Public Repos
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {formatCount(bundle.profile.publicRepos)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-white/5 p-3">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-slate-400">
                      Followers
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {formatCount(bundle.profile.followers)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-white/5 p-3">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-slate-400">
                      Following
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {formatCount(bundle.profile.following)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-300">
                  {bundle.profile.location && (
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                      {bundle.profile.location}
                    </span>
                  )}
                  {bundle.profile.company && (
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
                      {bundle.profile.company}
                    </span>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={bundle.profile.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
                  >
                    Open GitHub
                  </a>
                  {bundle.profile.blog && (
                    <a
                      href={normalizeExternalUrl(bundle.profile.blog)}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-100 transition hover:border-white/40"
                    >
                      Website
                    </a>
                  )}
                </div>
              </MotionArticle>

              <MotionArticle variants={cardVariants} className="glass-panel p-6 sm:p-7">
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200">
                  Contribution Stats
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  Based on recent public GitHub activity in the last 30 days.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {contributionCards.map((statCard) => (
                    <div
                      key={statCard.label}
                      className="rounded-xl border border-white/15 bg-white/5 p-3"
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">
                        {statCard.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {formatCount(statCard.value)}
                      </p>
                    </div>
                  ))}
                </div>
              </MotionArticle>
            </MotionDiv>

            <MotionDiv
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.14 }}
              className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {bundle.repos.map((repo) => (
                <MotionArticle
                  key={repo.id}
                  variants={cardVariants}
                  whileHover={{
                    y: -7,
                    scale: 1.01,
                    transition: { duration: 0.25, ease: 'easeOut' },
                  }}
                  className="glass-panel group relative flex h-full flex-col p-5 transition duration-300 hover:border-cyan-300/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-white">{repo.name}</h3>
                    <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-xs font-semibold text-amber-100">
                      Stars {formatCount(repo.stars)}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {repo.description || 'No description added for this repository yet.'}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {repo.techStack.length > 0 ? (
                      repo.techStack.map((tech) => (
                        <span
                          key={`${repo.id}-${tech}`}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-200"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-300">
                        No tech tags
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                    <span>Last updated</span>
                    <span>{formatDate(repo.lastUpdated)}</span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
                    >
                      GitHub
                    </a>
                    {repo.homepage ? (
                      <a
                        href={normalizeExternalUrl(repo.homepage)}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-100 transition hover:border-white/40"
                      >
                        Live Demo
                      </a>
                    ) : (
                      <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                        Live Demo
                      </span>
                    )}
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 -bottom-20 h-20 bg-accent-gradient opacity-0 blur-2xl transition duration-300 group-hover:opacity-20" />
                </MotionArticle>
              ))}
            </MotionDiv>
          </>
        )}
      </div>
    </section>
  )
}

export default GitHubSection
