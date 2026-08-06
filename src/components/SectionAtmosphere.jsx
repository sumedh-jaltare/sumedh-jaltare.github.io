const atmospheres = {
  mist: {
    background:
      'radial-gradient(ellipse 90% 70% at 10% 20%, rgba(10,10,10,0.035), transparent 55%), linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
    grid: true,
  },
  wash: {
    background:
      'radial-gradient(ellipse 70% 50% at 90% 10%, rgba(10,10,10,0.045), transparent 60%), linear-gradient(165deg, #ffffff 0%, #f6f6f6 48%, #fafafa 100%)',
    grid: true,
  },
  paper: {
    background:
      'linear-gradient(180deg, #ffffff 0%, #fbfbfb 100%)',
    grid: false,
  },
  ink: {
    background:
      'radial-gradient(ellipse 80% 60% at 70% 0%, rgba(255,255,255,0.08), transparent 55%), #0a0a0a',
    grid: false,
  },
}

const SectionAtmosphere = ({ variant = 'mist' }) => {
  const config = atmospheres[variant] || atmospheres.mist

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: config.background }}
      />
      {config.grid ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage:
              'linear-gradient(180deg, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        />
      ) : null}
    </>
  )
}

export default SectionAtmosphere
