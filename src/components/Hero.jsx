import { motion } from 'framer-motion'
import { heroIntro } from '../data/content'
import HeroGrid from './HeroGrid'

const lineVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.12 + i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-paper"
    >
      <div
        data-hero-grid
        className="relative z-0 h-[calc(48px*5)] w-full shrink-0 sm:h-[calc(56px*6)] md:h-[calc(72px*7)]"
      >
        <HeroGrid />
      </div>

      <div className="relative z-[2] mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pb-20 pt-8 sm:px-6 sm:pb-24 md:px-8 md:pb-28 md:pt-0">
        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.65fr)] md:gap-16">
          <h1 className="max-w-xl font-display font-light leading-[0.95] tracking-tightest text-ink">
            <motion.span
              custom={0}
              variants={lineVariants}
              initial="hidden"
              animate="show"
              className="block text-[clamp(2.1rem,8vw,4.75rem)]"
            >
              Hello,
            </motion.span>
            <motion.span
              custom={1}
              variants={lineVariants}
              initial="hidden"
              animate="show"
              className="mt-2 block text-[clamp(2.1rem,8vw,4.75rem)]"
            >
              I&apos;m Sumedh Jaltare
            </motion.span>
            <motion.span
              custom={2}
              variants={lineVariants}
              initial="hidden"
              animate="show"
              className="mt-5 block text-[clamp(1.25rem,4.5vw,2.4rem)] text-ink/75 sm:mt-6"
            >
              Full-Stack Software Engineer
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-md justify-self-start pt-1 font-sans text-[14px] leading-[1.7] font-light text-mute sm:text-[15px] md:justify-self-end md:pt-6 md:text-right md:text-[16px]"
          >
            {heroIntro}
          </motion.p>
        </div>
      </div>

    </section>
  )
}

export default Hero
