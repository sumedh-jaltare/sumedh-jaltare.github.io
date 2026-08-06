const LEVEL_COLORS = [
  '#ebedf0',
  '#9be9a8',
  '#40c463',
  '#30a14e',
  '#216e39',
]

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const ContributionGraph = ({
  days = [],
  title,
  subtitle,
  href,
  emptyLabel = 'No activity yet',
}) => {
  const sorted = [...days]
    .filter((day) => day?.date)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-371)

  if (!sorted.length) {
    return (
      <div className="border border-grid p-5 md:p-6">
        <p className="font-sans text-[13px] text-mute">{emptyLabel}</p>
      </div>
    )
  }

  const start = new Date(`${sorted[0].date}T12:00:00Z`)
  const startPad = start.getUTCDay()
  const cells = [...Array.from({ length: startPad }, () => null), ...sorted]

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }

  const monthLabels = weeks.map((week, weekIndex) => {
    const firstDay = week.find(Boolean)
    if (!firstDay) return ''
    const month = Number(firstDay.date.slice(5, 7)) - 1
    if (weekIndex === 0) return MONTHS[month]
    const prev = weeks[weekIndex - 1]?.find(Boolean)
    if (!prev) return MONTHS[month]
    const prevMonth = Number(prev.date.slice(5, 7)) - 1
    return prevMonth !== month ? MONTHS[month] : ''
  })

  return (
    <div className="border border-grid p-5 md:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="link-underline font-display text-xl font-light text-ink md:text-2xl"
            >
              {title}
            </a>
          ) : (
            <p className="font-display text-xl font-light text-ink md:text-2xl">
              {title}
            </p>
          )}
          {subtitle ? (
            <p className="mt-1 font-sans text-[13px] font-light text-mute">
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-1.5 font-sans text-[11px] text-mute">
          <span>Less</span>
          {LEVEL_COLORS.map((color) => (
            <span
              key={color}
              className="inline-block h-3 w-3 rounded-[2px]"
              style={{ backgroundColor: color }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div className="mb-1 flex gap-[3px] pl-0">
            {monthLabels.map((label, index) => (
              <span
                key={`month-${index}`}
                className="w-3 text-left font-sans text-[10px] text-mute"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="inline-flex gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const day = week[dayIndex]
                  if (!day) {
                    return (
                      <span
                        key={`empty-${weekIndex}-${dayIndex}`}
                        className="h-3 w-3 rounded-[2px] bg-transparent"
                      />
                    )
                  }
                  const level = Math.min(4, Math.max(0, day.level ?? 0))
                  return (
                    <span
                      key={day.date}
                      title={`${day.date}: ${day.count} ${day.count === 1 ? 'submission' : 'submissions'}`}
                      className="h-3 w-3 rounded-[2px]"
                      style={{ backgroundColor: LEVEL_COLORS[level] }}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContributionGraph
