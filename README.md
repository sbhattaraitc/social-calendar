# Social Calendar

A lightweight social event and polling platform (web-first, mobile-ready). This repository contains a monorepo with a backend API and a React frontend designed for realtime group events, RSVPs, polls, and notifications.

Built for collaboration between agent developers (Astra, Coddy) and human maintainers.

---

## Project structure

- apps/
  - api/ — Express + Socket.IO backend (TypeScript runtime via tsx), Prisma ORM (Postgres)
  - web/ — React (Vite) frontend, Tailwind-ready, PWA-capable
- prisma/ — Prisma schema and client
- docker-compose.yml — development services (Postgres)
- ACTIVITY.md — live activity log (auto-updated by agents)

---

## Tech stack

- Frontend: React, Vite, React Router
- Styling: Tailwind CSS (project scaffolded for it)
- Backend: Node.js, Express, Socket.IO
- Database: PostgreSQL, Prisma ORM
- Auth: JWT (access + refresh pattern recommended), password hashing with argon2
- Dev tooling: pnpm, tsx, Prisma CLI
- CI: GitHub Actions (recommended to add)

---

## Getting started (local development)

Prerequisites
- Node.js 18+ (tested with v24)
- pnpm
- Docker & docker-compose (for local Postgres)

Clone

```bash
git clone git@github.com:sbhattaraitc/social-calendar.git
cd social-calendar
```

Install dependencies

```bash
pnpm install
```

Start development services (Postgres)

```bash
docker-compose up -d
```

Copy environment example

```bash
cp .env.example .env
# update .env to set DATABASE_URL and FRONTEND_ORIGIN as needed
```

Start the monorepo dev servers

```bash
pnpm -r dev
```

- Frontend dev server: http://localhost:3000/ (use `--host` to expose on LAN)
- Backend API: http://localhost:3001/

Health check

```bash
curl http://localhost:3001/health
```

---

## Database

Prisma is used for schema and migrations. To generate client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

If you change prisma/schema.prisma, run `prisma generate` and create a new migration.

---

## Authentication

- Passwords are hashed with argon2.
- Tokens are issued as JWT (access + refresh recommended). For development the API exposes /auth/signup, /auth/login, and /me endpoints (see code).

Security note: In production use httpOnly secure cookies for refresh tokens and rotate secrets regularly.

---

## Realtime

Socket.IO is used for realtime events. Clients should authenticate their socket connection with the same token used for REST and subscribe to rooms:
- user:{userId}
- group:{groupId}

Server emits: event.created, event.updated, event.deleted, event.rsvp_changed, poll.vote_cast, notification.created

---

## Development tasks & workflow

- Work on feature branches and open PRs to `main`.
- Write small, testable commits. Use ACTIVITY.md for progress logging.
- Run tests locally (add tests under apps/* and use `pnpm -r test`).

Suggested branches created by agents:
- prisma-auth — DB schema + auth endpoints
- web-auth — frontend login/signup and token handling
- socket-auth — socket auth and rooms

---

## Contributing

1. Fork the repo or work on a branch.
2. Open a PR with clear description and checklist of acceptance criteria.
3. Ensure tests pass and include unit or integration tests for new features.

---

## License

This project does not include a specified license file. Add a LICENSE (MIT recommended) if you want permissive usage.

---

If you want this README adapted to a different standard (README badge style, detailed API reference, OpenAPI spec, or full deployment guide), tell me which format and I’ll update it.