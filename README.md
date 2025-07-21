# adaptiq_testtask

Hey, to just implement a BE and FE with a simple UI and BE is to primitive. So I decided to experiment little bit with the architecture and use some of the latest technologies.
Total time spent on this task is about 10 hours (including research and implementation).

# Technologies used
- Monorepo based on `turbo repo` with `pnpm` as package manager.
- Docker for local development and deployment.
- Core types moved to the separate package `@adaptiq/core-types` to avoid circular dependencies and to have a single source of truth for types.

## Frontend
- React based on Vite and TypeScript setup 
- As architecture used FSD (Feature-Sliced Design) - very powerful and flexible architecture pattern
- State management based on the `jotai` with atomic approach of state management
- As UI kit was used `Ant Design`

## Backend
- A simple REST API based on `Nest.js` and `TypeScript` - nothing extraordinary (be honest Express.js is more than enough for this task)


# How to run

`The fastest way to run the project is to use docker-compose`
`feat/example` branch is already contains needed .env vars`
```bash
git checkout feat/example
git pull

docker-compose up -d

```

### The app should be available at `http://localhost:4173` by default

# Alternative (local way)

### Install dependencies
```bash
pnpm install
pnpm build

# Run backend
pnpm --filter @adaptiq/backend dev
# Or 
cd apps/backend
pnpm dev

# Open another terminal and run frontend
pnpm --filter @adaptiq/frontend dev
# Or 
cd apps/frontend
pnpm dev
```