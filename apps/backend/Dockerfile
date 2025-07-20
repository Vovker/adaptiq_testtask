FROM node:18-alpine AS base
RUN npm install -g pnpm turbo
WORKDIR /app

FROM base AS workspace
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY turbo.json ./
COPY pnpm-lock.yaml ./

COPY packages/core-types/package.json ./packages/core-types/
COPY apps/backend/package.json ./apps/backend/

RUN pnpm install --frozen-lockfile

FROM workspace AS build
COPY packages/core-types/ ./packages/core-types/
COPY apps/backend/ ./apps/backend/

RUN turbo build --filter=backend

# Production stage
FROM node:18-alpine AS production
RUN npm install -g pnpm

WORKDIR /app

COPY --from=build /app/pnpm-workspace.yaml ./
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/packages/core-types/package.json ./packages/core-types/
COPY --from=build /app/apps/backend/package.json ./apps/backend/

RUN pnpm install --frozen-lockfile --prod

COPY --from=build /app/packages/core-types/dist ./packages/core-types/dist
COPY --from=build /app/apps/backend/dist ./apps/backend/dist

COPY --from=build /app/apps/backend/.env ./apps/backend/.env

WORKDIR /app/apps/backend

EXPOSE 3000

CMD ["node", "dist/main"]
