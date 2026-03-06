# CV Platform — Frontend

Interactive CV web app with dark/light mode, LLM chat assistant, and contact form.
Built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 18** + TypeScript + Vite
- **Tailwind CSS v3** — dark/light mode via CSS variables
- **Framer Motion** — page and section animations
- **Axios** — API calls with HttpOnly cookie auth
- **React Router** — client-side routing
- **Vitest** + Testing Library — unit tests

## Pages

| Route | Access | Description |
|-------|--------|-------------|
| `/login` | Public | Login page with recruiter credentials hint |
| `/` | VIEWER + ADMIN | Full CV view |
| `/admin` | ADMIN only | Content management panel |

## Features

- 🌙 Dark / light mode toggle
- 🤖 AI chat assistant (ask about Nuria's experience)
- 📥 CV PDF download
- 📬 Contact form with email confirmation
- ✏️ Admin panel — CRUD for experiences, projects, skills

## Local Setup

**Prerequisites:** Node 18+
```bash
git clone https://github.com/NuriaOlivares/cv-frontend
cd cv-frontend
npm install
```

Create `.env`:
```
VITE_API_URL=http://localhost:8080
```

Run:
```bash
npm run dev
```

App available at `http://localhost:5173`

## Tests
```bash
npm run test:run
```

## Deployment

Deployed as a Static Site on [Railway](https://railway.com).
Build command: `npm run build`
Publish directory: `dist`