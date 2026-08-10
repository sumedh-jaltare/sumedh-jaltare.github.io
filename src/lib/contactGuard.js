const STORAGE_KEY = 'portfolio-contact-sends'
const MIN_FILL_MS = 4000
const COOLDOWN_MS = 2 * 60 * 1000
const MAX_PER_HOUR = 3
const MAX_PER_DAY = 8

const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|crypto\s*invest|forex|loan\s*approval)\b/i,
  /\b(seo\s*ranking|backlinks?|guest\s*post)\b/i,
]

const readSends = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((n) => Number.isFinite(n)) : []
  } catch {
    return []
  }
}

const writeSends = (sends) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sends.slice(-20)))
  } catch {
    // Ignore storage failures (private mode, etc.)
  }
}

export const recordSuccessfulSend = () => {
  const now = Date.now()
  writeSends([...readSends(), now])
}

export const validateContactSubmission = ({
  name,
  email,
  message,
  honey,
  openedAt,
}) => {
  if (honey) {
    return { ok: false, silent: true, reason: 'Blocked.' }
  }

  if (!name || name.length < 2 || name.length > 80) {
    return { ok: false, reason: 'Please enter a valid name.' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) {
    return { ok: false, reason: 'Please enter a valid email address.' }
  }

  if (message.length < 20) {
    return {
      ok: false,
      reason: 'Please write a slightly longer message (at least 20 characters).',
    }
  }

  if (message.length > 4000) {
    return { ok: false, reason: 'Message is too long.' }
  }

  const elapsed = Date.now() - openedAt
  if (!Number.isFinite(openedAt) || elapsed < MIN_FILL_MS) {
    return {
      ok: false,
      reason: 'That was too fast. Please wait a moment and try again.',
    }
  }

  const now = Date.now()
  const sends = readSends().filter((time) => now - time < 24 * 60 * 60 * 1000)
  writeSends(sends)

  const lastSend = sends[sends.length - 1]
  if (lastSend && now - lastSend < COOLDOWN_MS) {
    const waitSec = Math.ceil((COOLDOWN_MS - (now - lastSend)) / 1000)
    return {
      ok: false,
      reason: `Please wait ${waitSec}s before sending another message.`,
    }
  }

  const lastHour = sends.filter((time) => now - time < 60 * 60 * 1000)
  if (lastHour.length >= MAX_PER_HOUR) {
    return {
      ok: false,
      reason: 'Message limit reached for now. Try again in an hour.',
    }
  }

  if (sends.length >= MAX_PER_DAY) {
    return {
      ok: false,
      reason: 'Daily message limit reached. Email me directly instead.',
    }
  }

  const linkMatches = message.match(/(https?:\/\/|www\.)/gi) || []
  if (linkMatches.length > 2) {
    return {
      ok: false,
      reason: 'Please remove extra links from your message.',
    }
  }

  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(name) || pattern.test(message)) {
      return { ok: false, reason: 'Message looks like spam and was blocked.' }
    }
  }

  const repeated = /(.)\1{9,}/.test(message.replace(/\s/g, ''))
  if (repeated) {
    return { ok: false, reason: 'Message looks like spam and was blocked.' }
  }

  return { ok: true }
}
