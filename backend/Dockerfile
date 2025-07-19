FROM node:18

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

RUN pnpm run build

# default port for the nestjs
EXPOSE 3000

CMD ["pnpm", "run", "start:prod"]
