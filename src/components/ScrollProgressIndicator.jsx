import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollProgressIndicator = () => {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-screen w-px bg-grid md:block"
    >
      <motion.div
        className="origin-top bg-ink"
        style={{ scaleY, width: 1.5, height: '100%' }}
      />
    </div>
  )
}

export default ScrollProgressIndicator
