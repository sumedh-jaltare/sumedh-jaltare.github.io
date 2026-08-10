# Sumedh Jaltare — Portfolio

Editorial portfolio built with React + Vite and Tailwind CSS, deployed to GitHub Pages.

**Live:** [https://sumedh-jaltare.github.io/](https://sumedh-jaltare.github.io/)

## Features

- Light editorial layout (Cormorant Garamond + Inter)
- Interactive hero grid and cursor whip line (desktop only; respects reduced motion)
- Curated GitHub repos + contribution graph
- LeetCode stats + activity heatmap (synced via GitHub Actions)
- Contact form sent through FormSubmit, with honeypot / rate-limit spam guards
- Hosted resume PDF + Open Graph share image

## Sections

Hero · About · Work · Experience · Skills · Contact

## Tech

- React 19
- Vite 8
- Tailwind CSS 3
- Framer Motion
- GitHub REST API + cached `public/activity.json`
- FormSubmit (contact)

## Project structure

```text
src/
  components/     # Sections and UI
  data/content.js # Copy, projects, selected repos, contact
  lib/            # GitHub activity + contact spam guards
  pages/Home.jsx
public/
  activity.json
  Sumedh-Jaltare-Resume.pdf
  og.png
  favicon.svg
.github/workflows/
  static.yml          # Build + deploy dist/ on push to main
  sync-activity.yml   # Refresh activity.json on a schedule
```

## Develop

```bash
npm install
npm run dev
```

Open: [http://localhost:5173](http://localhost:5173)

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build → `dist/` |
| `npm run sync:activity` | Refresh GitHub/LeetCode data into `public/activity.json` |
| `npm run preview` | Preview the production build |
| `npm run deploy` | Optional manual publish via `gh-pages` |

## Deployment

Preferred path: **GitHub Actions**

1. Repo **Settings → Pages → Source** = **GitHub Actions**
2. Push to `main`
3. Workflow builds `dist/` and deploys it

Manual alternative: `npm run deploy` (publishes to the `gh-pages` branch; only needed if Pages is still set to that branch).

## Contact form

Messages go to `jaltaresr@gmail.com` via [FormSubmit](https://formsubmit.co).

- First live submit may require activating a confirmation email from FormSubmit
- Client-side spam guards: honeypot field, minimum fill time, per-browser rate limits, basic content checks

## Notes

- Vite `base` is `/` (user site root)
- Draft resumes at repo root (`resume.pdf`, `sumedh.pdf`, `*.docx`) are gitignored
- Hosted resume for the site: `public/Sumedh-Jaltare-Resume.pdf`
