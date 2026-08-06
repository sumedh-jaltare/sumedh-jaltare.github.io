#!/usr/bin/env node

/**
 * Syncs live GitHub + LeetCode stats into public/activity.json
 * Used by GitHub Actions on a schedule and before deploy.
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const GITHUB_USER = 'sumedh-jaltare'
const LEETCODE_USER = 'Sumedh_Jaltare'

const EXCLUDED_REPOS = new Set([
  'sumedh-jaltare',
  'sumedh-jaltare.github.io',
  'temporary',
])

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/json',
      'User-Agent': 'sumedh-portfolio-sync',
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    throw new Error(`${url} → ${response.status}`)
  }

  return response.json()
}

const toLevelFromCount = (count, thresholds = [1, 3, 6, 10]) => {
  if (!count) return 0
  if (count >= thresholds[3]) return 4
  if (count >= thresholds[2]) return 3
  if (count >= thresholds[1]) return 2
  if (count >= thresholds[0]) return 1
  return 0
}

const fetchGitHub = async () => {
  const [profile, repos, contributions] = await Promise.all([
    fetchJson(`https://api.github.com/users/${GITHUB_USER}`),
    fetchJson(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
    ),
    fetchJson(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}`,
    ),
  ])

  const days = (contributions.contributions || []).map((day) => ({
    date: day.date,
    count: day.count,
    level: day.level ?? toLevelFromCount(day.count),
  }))

  const totalContributions = Object.values(contributions.total || {}).reduce(
    (sum, value) => sum + value,
    0,
  )

  // Current streak: consecutive days ending at most recent day with activity,
  // walking back from today/latest in list.
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date))
  let streak = 0
  for (let i = sorted.length - 1; i >= 0; i -= 1) {
    if (sorted[i].count > 0) {
      streak += 1
    } else if (streak > 0) {
      break
    }
  }

  const filtered = repos
    .filter((repo) => !repo.fork && !EXCLUDED_REPOS.has(repo.name))
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    )
    .map((repo) => ({
      name: repo.name,
      description: repo.description || '',
      language: repo.language || 'Other',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      updatedAt: repo.pushed_at,
      homepage: repo.homepage || '',
    }))

  return {
    username: profile.login,
    url: profile.html_url,
    publicRepos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,
    totalContributions,
    streak,
    calendar: days,
    repos: filtered,
  }
}

const fetchLeetCode = async () => {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile { ranking }
        submitStatsGlobal {
          acSubmissionNum { difficulty count }
        }
        userCalendar {
          activeYears
          streak
          totalActiveDays
          submissionCalendar
        }
      }
    }
  `

  const data = await fetchJson('https://leetcode.com/graphql/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://leetcode.com',
      Referer: `https://leetcode.com/u/${LEETCODE_USER}/`,
    },
    body: JSON.stringify({
      query,
      variables: { username: LEETCODE_USER },
    }),
  })

  const user = data?.data?.matchedUser
  if (!user) {
    throw new Error('LeetCode user not found')
  }

  const stats = Object.fromEntries(
    (user.submitStatsGlobal?.acSubmissionNum || []).map((item) => [
      item.difficulty.toLowerCase(),
      item.count,
    ]),
  )

  const rawCalendar = JSON.parse(user.userCalendar?.submissionCalendar || '{}')
  const calendarMap = {}
  Object.entries(rawCalendar).forEach(([timestamp, count]) => {
    const date = new Date(Number(timestamp) * 1000).toISOString().slice(0, 10)
    calendarMap[date] = Number(count)
  })

  // Build a full-year-ish day list (last 371 days) for heatmap
  const calendar = []
  const end = new Date()
  end.setUTCHours(0, 0, 0, 0)
  for (let i = 370; i >= 0; i -= 1) {
    const day = new Date(end)
    day.setUTCDate(end.getUTCDate() - i)
    const date = day.toISOString().slice(0, 10)
    const count = calendarMap[date] || 0
    calendar.push({
      date,
      count,
      level: toLevelFromCount(count, [1, 2, 4, 8]),
    })
  }

  return {
    username: user.username,
    url: `https://leetcode.com/u/${LEETCODE_USER}/`,
    ranking: user.profile?.ranking ?? null,
    totalSolved: stats.all ?? 0,
    easy: stats.easy ?? 0,
    medium: stats.medium ?? 0,
    hard: stats.hard ?? 0,
    streak: user.userCalendar?.streak ?? 0,
    totalActiveDays: user.userCalendar?.totalActiveDays ?? 0,
    calendar,
  }
}

const main = async () => {
  const [github, leetcode] = await Promise.all([
    fetchGitHub(),
    fetchLeetCode(),
  ])

  const payload = {
    updatedAt: new Date().toISOString(),
    github,
    leetcode,
  }

  const outDir = join(root, 'public')
  mkdirSync(outDir, { recursive: true })
  const outPath = join(outDir, 'activity.json')
  writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`)
  console.log(`Wrote ${outPath}`)
  console.log(
    `Repos: ${github.repos.length} | GH streak: ${github.streak} | LC solved: ${leetcode.totalSolved} | LC streak: ${leetcode.streak}`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
