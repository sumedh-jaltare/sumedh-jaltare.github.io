/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glass:
          '0 24px 65px -28px rgba(14, 165, 233, 0.45), 0 10px 30px -18px rgba(99, 102, 241, 0.4)',
      },
      backgroundImage: {
        'accent-gradient':
          'linear-gradient(120deg, rgba(34,211,238,1) 0%, rgba(129,140,248,1) 52%, rgba(232,121,249,1) 100%)',
      },
    },
  },
  plugins: [],
}
