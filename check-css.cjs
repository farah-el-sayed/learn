// Verifies the cascade order of the new utility classes in the built CSS.
// Tailwind orders same-property utilities by the key order of the theme colors,
// so the overrides we rely on must appear LATER in the file.
const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, 'dist', 'assets')
const file = fs.readdirSync(dir).find(n => n.startsWith('index-') && n.endsWith('.css'))
const css = fs.readFileSync(path.join(dir, file), 'utf8')

const needle = s => `.${s.replace(/([:/.[\]%])/g, '\\$1')}`

const checks = [
  // base: surface-deep must beat paper so the inset field keeps its own colour
  ['bg-paper', 'bg-surface-deep', 'base bg-surface-deep wins'],
  // hover: our explicit hovers must beat the ghost variant's hover:bg-paper
  ['hover:bg-paper', 'hover:bg-surface-deep', 'search hover wins'],
  ['hover:bg-paper', 'hover:bg-sage/25', 'companion hover wins'],
]

let ok = true
console.log('css file:', file)
for (const [loser, winner, label] of checks) {
  const a = css.indexOf(needle(loser))
  const b = css.indexOf(needle(winner))
  const pass = a >= 0 && b > a
  if (!pass) ok = false
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}  (${loser} @ ${a} < ${winner} @ ${b})`)
}

// The dark palette must define the inset token too, or the field goes light in dark mode.
const root = css.match(/:root\.dark\{[^}]*\}/)?.[0] || ''
const hasToken = /--color-surface-deep:\s*17 22 19/.test(root)
if (!hasToken) ok = false
console.log(`${hasToken ? 'PASS' : 'FAIL'}  dark palette defines --color-surface-deep`)
console.log('CSS_OK', ok)
process.exit(ok ? 0 : 1)
