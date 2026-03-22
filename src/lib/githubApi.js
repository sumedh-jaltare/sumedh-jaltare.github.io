const API_BASE_URL = 'https://api.github.com'
const CACHE_TTL_MS = 10 * 60 * 1000

export const GITHUB_USERNAME =
  import.meta.env.VITE_GITHUB_USERNAME || 'sumedh-jaltare'

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

const requestHeaders = {
  Accept: 'application/vnd.github+json',
}

if (GITHUB_TOKEN) {
  requestHeaders.Authorization = `Bearer ${GITHUB_TOKEN}`
}

const toGitHubUrl = (pathOrUrl) =>
  pathOrUrl.startsWith('http') ? pathOrUrl : `${API_BASE_URL}${pathOrUrl}`

const readCache = (cacheKey) => {
  if (typeof window === 'undefined') {
    return null
  }

  const rawValue = window.sessionStorage.getItem(cacheKey)
  if (!rawValue) {
    return null
  }

  try {
    const parsed = JSON.parse(rawValue)
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) {
      window.sessionStorage.removeItem(cacheKey)
      return null
    }
    return parsed.payload
  } catch {
    window.sessionStorage.removeItem(cacheKey)
    return null
  }
}

const writeCache = (cacheKey, payload) => {
  if (typeof window === 'undefined') {
    return
  }

  window.sessionStorage.setItem(
    cacheKey,
    JSON.stringify({
      timestamp: Date.now(),
      payload,
    }),
  )
}

const fetchGitHubJson = async (pathOrUrl) => {
  const response = await fetch(toGitHubUrl(pathOrUrl), {
    headers: requestHeaders,
  })

  if (!response.ok) {
    let errorMessage = 'GitHub API request failed.'

    try {
      const errorData = await response.json()
      if (errorData.message) {
        errorMessage = errorData.message
      }
    } catch {
      errorMessage = 'GitHub API request failed.'
    }

    if (
      response.status === 403 &&
      response.headers.get('x-ratelimit-remaining') === '0'
    ) {
      throw new Error('GitHub API rate limit reached. Please try again shortly.')
    }

    throw new Error(errorMessage)
  }

  return response.json()
}

const summarizeContributionStats = (events) => {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000

  const recentEvents = events.filter((event) => {
    const createdAt = new Date(event.created_at).getTime()
    return Number.isFinite(createdAt) && createdAt >= thirtyDaysAgo
  })

  const commits = recentEvents
    .filter((event) => event.type === 'PushEvent')
    .reduce((total, event) => total + (event.payload?.commits?.length || 0), 0)

  const pullRequests = recentEvents.filter(
    (event) =>
      event.type === 'PullRequestEvent' && event.payload?.action === 'opened',
  ).length

  const issuesOpened = recentEvents.filter(
    (event) => event.type === 'IssuesEvent' && event.payload?.action === 'opened',
  ).length

  const activeDays = new Set(
    recentEvents.map((event) => event.created_at.slice(0, 10)),
  ).size

  const repositoriesTouched = new Set(
    recentEvents.map((event) => event.repo?.name).filter(Boolean),
  ).size

  return {
    publicEvents: recentEvents.length,
    commits,
    pullRequests,
    issuesOpened,
    activeDays,
    repositoriesTouched,
  }
}

const deriveTechStack = (repo, languageBytes = {}) => {
  const languageList = Object.entries(languageBytes)
    .sort((left, right) => right[1] - left[1])
    .map(([language]) => language)

  return Array.from(
    new Set([repo.language, ...languageList, ...(repo.topics || [])].filter(Boolean)),
  ).slice(0, 5)
}

export const fetchGitHubBundle = async (username = GITHUB_USERNAME, options = {}) => {
  const normalizedUsername = username.trim()
  const refresh = options.refresh || false
  const cacheKey = `github-bundle:${normalizedUsername}`

  if (!refresh) {
    const cachedBundle = readCache(cacheKey)
    if (cachedBundle) {
      return cachedBundle
    }
  }

  const [profile, repositories, events] = await Promise.all([
    fetchGitHubJson(`/users/${normalizedUsername}`),
    fetchGitHubJson(
      `/users/${normalizedUsername}/repos?sort=updated&direction=desc&per_page=12&type=owner`,
    ),
    fetchGitHubJson(`/users/${normalizedUsername}/events/public?per_page=100`),
  ])

  const repositoriesToDisplay = repositories
    .filter((repository) => !repository.fork)
    .slice(0, 6)

  const languagePairs = await Promise.all(
    repositoriesToDisplay.map(async (repository) => {
      try {
        const languageData = await fetchGitHubJson(repository.languages_url)
        return [repository.id, languageData]
      } catch {
        return [repository.id, {}]
      }
    }),
  )

  const languageMap = new Map(languagePairs)

  const repos = repositoriesToDisplay.map((repository) => {
    const techStack = deriveTechStack(repository, languageMap.get(repository.id))

    return {
      id: repository.id,
      name: repository.name,
      description: repository.description,
      htmlUrl: repository.html_url,
      homepage: repository.homepage,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
      techStack,
      lastUpdated: repository.updated_at,
    }
  })

  const bundle = {
    profile: {
      login: profile.login,
      name: profile.name,
      avatarUrl: profile.avatar_url,
      bio: profile.bio,
      htmlUrl: profile.html_url,
      location: profile.location,
      blog: profile.blog,
      company: profile.company,
      followers: profile.followers,
      following: profile.following,
      publicRepos: profile.public_repos,
    },
    contributions: summarizeContributionStats(events),
    repos,
  }

  writeCache(cacheKey, bundle)
  return bundle
}
