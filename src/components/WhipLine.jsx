import { useEffect, useRef } from 'react'

const POINTS = 14
const LINE_WIDTH = 1.35

const WhipLine = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reduceMotion.matches) {
      return undefined
    }

    const canvas = canvasRef.current
    if (!canvas) {
      return undefined
    }

    const ctx = canvas.getContext('2d')
    const points = Array.from({ length: POINTS }, () => ({ x: 0, y: 0 }))
    const mouse = { x: 0, y: 0 }
    const state = {
      active: false,
      ready: false,
      raf: 0,
      opacity: 0,
      ink: false,
      whiteMix: 0,
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const isOverGrid = (clientX, clientY) => {
      const el = document.elementFromPoint(clientX, clientY)
      return Boolean(el?.closest?.('[data-hero-grid]'))
    }

    const isOverInk = (clientX, clientY) => {
      const el = document.elementFromPoint(clientX, clientY)
      return Boolean(el?.closest?.('#contact'))
    }

    const onMove = (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY

      const overGrid = isOverGrid(event.clientX, event.clientY)
      state.active = !overGrid
      state.ink = isOverInk(event.clientX, event.clientY)

      if (!state.ready) {
        for (let i = 0; i < POINTS; i += 1) {
          points[i].x = mouse.x
          points[i].y = mouse.y
        }
        state.ready = true
      }
    }

    const onLeave = () => {
      state.active = false
    }

    const draw = () => {
      const targetOpacity = state.active ? 1 : 0
      state.opacity += (targetOpacity - state.opacity) * 0.12
      state.whiteMix += ((state.ink ? 1 : 0) - state.whiteMix) * 0.14

      points[0].x += (mouse.x - points[0].x) * 0.68
      points[0].y += (mouse.y - points[0].y) * 0.68

      for (let i = 1; i < POINTS; i += 1) {
        const lag = 0.48 - i * 0.012
        points[i].x += (points[i - 1].x - points[i].x) * Math.max(0.26, lag)
        points[i].y += (points[i - 1].y - points[i].y) * Math.max(0.26, lag)
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      if (state.opacity > 0.02 && state.ready) {
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)

        for (let i = 1; i < POINTS - 1; i += 1) {
          const xc = (points[i].x + points[i + 1].x) / 2
          const yc = (points[i].y + points[i + 1].y) / 2
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
        }

        const last = points[POINTS - 1]
        const prev = points[POINTS - 2]
        ctx.quadraticCurveTo(prev.x, prev.y, last.x, last.y)

        const channel = Math.round(10 + state.whiteMix * 245)
        ctx.strokeStyle = `rgba(${channel}, ${channel}, ${channel}, ${state.opacity * 0.85})`
        ctx.lineWidth = LINE_WIDTH
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
      }

      state.raf = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    state.raf = window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      window.cancelAnimationFrame(state.raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70]"
    />
  )
}

export default WhipLine
