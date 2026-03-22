# Sumedh Jaltare Portfolio

Personal portfolio website built with React and Vite, showcasing projects, skills, experience, achievements, education, and live GitHub profile data.

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- GitHub REST API

## Features

- Animated hero section and smooth section transitions
- Full resume-based content: About, Skills, Projects, Experience
- Dedicated Achievements and Education sections
- Live GitHub profile and repository feed
- Contact section with direct links and email form action

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks
- `npm run deploy` - Deploy `dist` to GitHub Pages

## Environment Variables

Create a `.env` file in the project root if needed:

```env
VITE_GITHUB_USERNAME=sumedh-jaltare
VITE_GITHUB_TOKEN=your_optional_github_token
```

- `VITE_GITHUB_USERNAME` defaults to `sumedh-jaltare`
- `VITE_GITHUB_TOKEN` is optional and helps avoid API rate limits

## Deployment

This project is configured for GitHub Pages.

```bash
npm run build
npm run deploy
```

Default deploy target:
`https://github.com/sumedh-jaltare/portfolio.git`
