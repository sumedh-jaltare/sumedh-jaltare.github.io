# Sumedh Jaltare — Portfolio

Editorial portfolio for Sumedh Jaltare. Built with React + Vite and Tailwind CSS, deployed to GitHub Pages.

**Live:** [https://sumedh-jaltare.github.io/](https://sumedh-jaltare.github.io/)

## Features

- Light editorial layout (Cormorant Garamond + Inter)
- Interactive hero grid and cursor whip line
- Live GitHub repos + contribution graph
- LeetCode stats + activity heatmap (synced via GitHub Actions)
- Contact form that opens mail client

## Sections

Hero · About · Work · Experience · Skills · Contact

## Tech

- React 19
- Vite 8
- Tailwind CSS 3
- Framer Motion
- GitHub REST API + cached `public/activity.json`

## Develop

```bash
npm install
npm run dev
```

Open: [http://localhost:5173](http://localhost:5173)

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run sync:activity` | Refresh GitHub/LeetCode cache into `public/activity.json` |
| `npm run preview` | Preview production build |
| `npm run deploy` | Sync activity, build, publish to GitHub Pages |

## Deployment

1. **GitHub Actions** (`.github/workflows/static.yml`) — builds and deploys `dist/` on pushes to `main`
2. **Manual:** `npm run deploy`

Default pages repo: `https://github.com/sumedh-jaltare/sumedh-jaltare.github.io.git`

## Notes

- Vite `base` is `/` (user site root)
- Local resume files (`resume.pdf`, `sumedh.pdf`, `*.docx`) are gitignored
