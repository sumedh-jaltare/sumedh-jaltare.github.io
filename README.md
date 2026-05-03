# Sumedh Jaltare Portfolio

Modern developer portfolio built with React + Vite and styled with Tailwind CSS.

Live site: `https://sumedh-jaltare.github.io/`

## Highlights

- Dark mode by default with a light mode toggle
- Fully responsive, mobile-first layout
- Smooth section animations with Framer Motion
- Component-based architecture
- GitHub profile and repository data integration

## Sections

- Hero
- About
- Skills
- Projects
- GitHub
- Experience
- Achievements
- Education
- Contact

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 3
- React Router (HashRouter)
- Framer Motion
- GitHub REST API

## Project Structure

```text
src/
  components/
  pages/
  lib/
  App.jsx
  main.jsx
.github/workflows/
  static.yml
```

## Local Development

```bash
npm install
npm run dev
```

Open: `http://localhost:5173`

## Available Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build in `dist/`
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint
- `npm run deploy` - publish `dist/` using `gh-pages`

## Environment Variables (Optional)

Create a `.env` file if needed:

```env
VITE_GITHUB_USERNAME=sumedh-jaltare
VITE_GITHUB_TOKEN=your_optional_github_token
```

- `VITE_GITHUB_USERNAME` defaults to `sumedh-jaltare`
- `VITE_GITHUB_TOKEN` helps reduce GitHub API rate-limit issues

## Deployment

This repo includes two deployment paths:

1. GitHub Actions Pages workflow:
   - Workflow file: `.github/workflows/static.yml`
   - Runs on pushes to `main`
   - Builds with `npm run build` and deploys `dist/` to GitHub Pages
2. Manual publish with `gh-pages`:
   - Run `npm run deploy`
   - Default target repo:
     `https://github.com/sumedh-jaltare/sumedh-jaltare.github.io.git`

## Notes

- Vite base path is configured as `/` in `vite.config.js`.
- Router is configured with `HashRouter` in `src/main.jsx` for reliable GitHub Pages routing.
