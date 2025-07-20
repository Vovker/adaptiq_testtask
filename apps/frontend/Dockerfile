FROM node:22 AS base
RUN npm install -g pnpm turbo
WORKDIR /app

FROM base AS workspace
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY turbo.json ./
COPY pnpm-lock.yaml ./

COPY packages/core-types/package.json ./packages/core-types/
COPY apps/frontend/package.json ./apps/frontend/


RUN pnpm install --frozen-lockfile

# Build stage
FROM workspace AS build
COPY packages/core-types/ ./packages/core-types/
COPY apps/frontend/ ./apps/frontend/

RUN turbo build --filter=frontend

FROM node:22 AS production
RUN npm install -g serve

WORKDIR /app

COPY --from=build /app/apps/frontend/dist ./dist

EXPOSE 4173

CMD ["serve", "-s", "dist", "-l", "4173"]
