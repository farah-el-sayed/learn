/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        ivory: 'rgb(var(--color-paper) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        // One step below the page: used for inset fields so they read as a
        // control rather than another block of background.
        'surface-deep': 'rgb(var(--color-surface-deep) / <alpha-value>)',
        cream: 'rgb(var(--color-cream) / <alpha-value>)',
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          soft: 'rgb(var(--color-ink-soft) / <alpha-value>)',
          muted: 'rgb(var(--color-ink-muted) / <alpha-value>)',
          faint: 'rgb(var(--color-ink-faint) / <alpha-value>)',
        },
        slate: 'rgb(var(--color-ink-muted) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        pine: {
          DEFAULT: 'rgb(var(--color-pine) / <alpha-value>)',
          deep: 'rgb(var(--color-pine-deep) / <alpha-value>)',
          soft: 'rgb(var(--color-pine-soft) / <alpha-value>)',
        },
        forest: {
          DEFAULT: 'rgb(var(--color-pine) / <alpha-value>)',
          deep: 'rgb(var(--color-pine-deep) / <alpha-value>)',
          soft: 'rgb(var(--color-pine-soft) / <alpha-value>)',
        },
        clay: {
          DEFAULT: 'rgb(var(--color-clay) / <alpha-value>)',
          deep: 'rgb(var(--color-clay-deep) / <alpha-value>)',
          soft: 'rgb(var(--color-clay-soft) / <alpha-value>)',
        },
        terra: 'rgb(var(--color-clay) / <alpha-value>)',
        sage: 'rgb(var(--color-sage) / <alpha-value>)',
        sand: 'rgb(var(--color-cream) / <alpha-value>)',
        moss: 'rgb(var(--color-moss) / <alpha-value>)',
        white: 'rgb(var(--color-surface) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(27,30,27,0.05)',
        card: '0 1px 3px rgba(27,30,27,0.06), 0 4px 16px rgba(27,30,27,0.05)',
      },
      maxWidth: {
        shell: '1280px',
      },
    },
  },
  plugins: [],
}
