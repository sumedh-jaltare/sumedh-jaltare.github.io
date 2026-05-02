const SectionHeader = ({ badge, title, subtitle }) => {
  return (
    <div className="mb-10 text-left">
      <span className="mb-4 inline-flex rounded-full border border-cyan-300/35 bg-cyan-400/10 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-100">
        {badge}
      </span>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-300">
        {subtitle}
      </p>
    </div>
  )
}

export default SectionHeader
