// Focused smoke test for the Navbar rework: renders the real App shell (which
// supplies ToastProvider + AppProvider) on a public and a workspace route and
// asserts the new top bar structure.
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { AppProvider } from './src/context/AppContext.jsx'
import App from './src/App.jsx'

const render = path => renderToString(
  React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(AppProvider, null, React.createElement(App)))
)

const publicHtml = render('/')
const workspaceHtml = render('/dashboard')

const checks = {
  // --- structure: three zones, ordered identity -> search -> action ---
  Navbar_role_switcher: publicHtml.includes('>Student<'),
  Navbar_settings_trigger: publicHtml.includes('Display settings'),
  Navbar_search_field: publicHtml.includes('Search courses, topics, instructors'),
  Navbar_search_inset_bg: publicHtml.includes('bg-surface-deep'),
  Navbar_companion: publicHtml.includes('Companion'),
  Navbar_auth_pair: publicHtml.includes('Sign in') && publicHtml.includes('Create account'),

  // --- removed clutter ---
  No_history_arrows: !publicHtml.includes('Go back') && !publicHtml.includes('Go forward'),
  No_page_history_group: !publicHtml.includes('aria-label="Page history"'),
  No_native_role_select: !publicHtml.includes('<select'),

  // --- hierarchy: Create account is the filled action ---
  Create_account_is_filled: /Create account<\/a><\/div>|bg-pine text-paper[^>]*>[^<]*<svg[^>]*>.*?Create account/.test(publicHtml)
    || (publicHtml.includes('bg-pine text-paper') && publicHtml.includes('Create account')),
  Sign_in_is_quiet: publicHtml.includes('text-ink-muted hover:text-ink'),

  // --- workspace variant still renders (sidebar toggle + nav) ---
  Workspace_variant_renders: workspaceHtml.length > 2000,
  Primary_nav_present: publicHtml.includes('aria-label="Primary"'),
  Drawer_closed_by_default: !publicHtml.includes('Navigation menu'),
}

console.log(JSON.stringify(checks, null, 1))
const ok = Object.values(checks).every(Boolean)
console.log('NAVBAR_OK', ok)

// Dump the rendered bar (tags only) so the zone order can be eyeballed.
const header = publicHtml.slice(publicHtml.indexOf('<header'), publicHtml.indexOf('</header>') + 9)
const strip = html => html
  .replace(/<svg[\s\S]*?<\/svg>/g, '[svg]')
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/></g, '>\n<')
console.log('--- HEADER ---')
console.log(strip(header).split('\n').filter(l => /<(a|button|nav|input|kbd|span)\b/.test(l)).join('\n'))
if (!ok) process.exit(1)
