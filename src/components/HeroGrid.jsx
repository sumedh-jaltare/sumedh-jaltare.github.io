import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

const CELL = 72
const TRAIL_LENGTH = 10

const COLORS = {
  active: '#000000',
  trail: [
    '#222222',
    '#333333',
    '#444444',
    '#555555',
    '#666666',
    '#777777',
    '#888888',
    '#999999',
    '#aaaaaa',
    '#bbbbbb',
  ],
  idle: '#ffffff',
}

const cellKey = (col, row) => `${col}-${row}`

const getCellColor = (col, row, hover, trail) => {
  if (hover.col === col && hover.row === row) {
    return COLORS.active
  }

  const index = trail.findIndex((cell) => cell.col === col && cell.row === row)
  if (index >= 0 && index < COLORS.trail.length) {
    return COLORS.trail[index]
  }

  return COLORS.idle
}

const GridCell = memo(function GridCell({ color }) {
  return (
    <div
      aria-hidden
      className="hero-grid-cell"
      style={{ backgroundColor: color }}
    />
  )
})

const HeroGrid = () => {
  const containerRef = useRef(null)
  const [dims, setDims] = useState({ cols: 0, rows: 0 })
  const [hover, setHover] = useState({ col: -1, row: -1 })
  const [trail, setTrail] = useState([])
  const hoverRef = useRef(hover)
  const trailRef = useRef(trail)

  useEffect(() => {
    hoverRef.current = hover
  }, [hover])

  useEffect(() => {
    trailRef.current = trail
  }, [trail])

  useEffect(() => {
    const el = containerRef.current
    if (!el) {
      return undefined
    }

    const measure = () => {
      const { width, height } = el.getBoundingClientRect()
      setDims({
        cols: Math.max(1, Math.ceil(width / CELL)),
        rows: Math.max(1, Math.floor(height / CELL)),
      })
    }

    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(el)

    return () => resizeObserver.disconnect()
  }, [])

  const clearHover = useCallback(() => {
    if (hoverRef.current.col !== -1 || trailRef.current.length > 0) {
      setHover({ col: -1, row: -1 })
      setTrail([])
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) {
      return undefined
    }

    const onMove = (event) => {
      const rect = el.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      if (x < 0 || y < 0 || x >= rect.width || y >= rect.height) {
        clearHover()
        return
      }

      const col = Math.floor(x / CELL)
      const row = Math.floor(y / CELL)
      const prev = hoverRef.current

      if (prev.col === col && prev.row === row) {
        return
      }

      setHover({ col, row })

      if (prev.col < 0 || prev.row < 0) {
        setTrail([])
        return
      }

      setTrail((current) => {
        const next = [
          { col: prev.col, row: prev.row },
          ...current.filter(
            (cell) => !(cell.col === col && cell.row === row),
          ),
        ]
        return next.slice(0, TRAIL_LENGTH)
      })
    }

    let listening = false

    const attach = () => {
      if (listening) {
        return
      }
      listening = true
      el.addEventListener('mousemove', onMove, { passive: true })
      el.addEventListener('mouseleave', clearHover)
    }

    const detach = () => {
      if (!listening) {
        return
      }
      listening = false
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', clearHover)
      clearHover()
    }

    const intersection = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          attach()
        } else {
          detach()
        }
      },
      { threshold: 0.05 },
    )

    intersection.observe(el)
    attach()

    return () => {
      detach()
      intersection.disconnect()
    }
  }, [clearHover])

  const cells = useMemo(() => {
    const { cols, rows } = dims
    if (!cols || !rows) {
      return []
    }

    const list = []
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        list.push({
          key: cellKey(col, row),
          color: getCellColor(col, row, hover, trail),
        })
      }
    }
    return list
  }, [dims, hover, trail])

  return (
    <div
      ref={containerRef}
      className="hero-grid absolute inset-0"
      style={{
        gridTemplateColumns: dims.cols
          ? `repeat(${dims.cols}, ${CELL}px)`
          : undefined,
        gridAutoRows: `${CELL}px`,
      }}
      aria-hidden
    >
      {cells.map((cell) => (
        <GridCell key={cell.key} color={cell.color} />
      ))}
    </div>
  )
}

export default HeroGrid
