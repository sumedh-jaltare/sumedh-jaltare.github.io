const GITHUB_USER = 'sumedh-jaltare'

const EXCLUDED_REPOS = new Set([
  'sumedh-jaltare',
  'sumedh-jaltare.github.io',
  'temporary',
])

const mapRepo = (repo) => {
  const name = repo.name
  const htmlUrl =
    repo.html_url ||
    (typeof repo.url === 'string' &&
    repo.url.includes('github.com') &&
    !repo.url.includes('api.github.com')
      ? repo.url
      : null) ||
    `https://github.com/${GITHUB_USER}/${name}`

  return {
    name,
    description: repo.description || '',
    language: repo.language || 'Other',
    stars: repo.stargazers_count ?? repo.stars ?? 0,
    forks: repo.forks_count ?? repo.forks ?? 0,
    url: htmlUrl,
    updatedAt: repo.pushed_at || repo.updatedAt,
    homepage: repo.homepage || '',
  }
}

export const fetchCachedActivity = async () => {
  const response = await fetch(`/activity.json?t=${Date.now()}`, {
    cache: 'no-store',
  })
  if (!response.ok) {
    throw new Error('Failed to load cached activity')
  }
  return response.json()
}

export const fetchLiveGitHub = async () => {
  const [profileRes, reposRes, contribRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USER}`),
    fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
    ),
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}`),
  ])

  if (!profileRes.ok || !reposRes.ok) {
    throw new Error('GitHub API unavailable')
  }

  const profile = await profileRes.json()
  const repos = await reposRes.json()
  const contributions = contribRes.ok ? await contribRes.json() : null

  const calendar = (contributions?.contributions || []).map((day) => ({
    date: day.date,
    count: day.count,
    level: day.level ?? 0,
  }))

  const totalContributions = Object.values(contributions?.total || {}).reduce(
    (sum, value) => sum + value,
    0,
  )

  const sorted = [...calendar].sort((a, b) => a.date.localeCompare(b.date))
  let streak = 0
  for (let i = sorted.length - 1; i >= 0; i -= 1) {
    if (sorted[i].count > 0) streak += 1
    else if (streak > 0) break
  }

  return {
    username: profile.login,
    url: profile.html_url,
    publicRepos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
    totalContributions,
    streak,
    calendar,
    repos: repos
      .filter((repo) => !repo.fork && !EXCLUDED_REPOS.has(repo.name))
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
      )
      .map(mapRepo),
  }
}

export const loadActivity = async () => {
  const cached = await fetchCachedActivity().catch(() => null)

  try {
    const github = await fetchLiveGitHub()
    return {
      updatedAt: new Date().toISOString(),
      github,
      leetcode: cached?.leetcode ?? null,
      source: {
        github: 'live',
        leetcode: cached?.leetcode ? 'cached' : 'missing',
      },
    }
  } catch {
    if (!cached) {
      throw new Error('Unable to load GitHub or LeetCode activity')
    }
    return {
      ...cached,
      source: {
        github: 'cached',
        leetcode: cached.leetcode ? 'cached' : 'missing',
      },
    }
  }
}
