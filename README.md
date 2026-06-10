# Qualti

Enterprise inspection SaaS monorepo.

## Structure

```
apps/
  web/    Next.js frontend
  api/    Hono API server
packages/
  ui/      Shared React components
  types/   Shared TypeScript types
  config/  Shared ESLint & TS configs
  db/      Drizzle schema & database utilities
```

## Prerequisites

- Node.js 20+
- pnpm 9+

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development |
| `pnpm build` | Build all packages and apps |
| `pnpm lint` | Lint across the monorepo |
| `pnpm typecheck` | Type-check across the monorepo |
| `pnpm format` | Format with Prettier |

## Getting started

```bash
pnpm install
pnpm dev
```

- Web: http://localhost:3000
- API: http://localhost:3001
