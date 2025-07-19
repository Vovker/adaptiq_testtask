FROM node:22

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

RUN pnpm run build

RUN npm install -g serve

# default port for serve
EXPOSE 4173

CMD ["serve", "-s", "dist", "-l", "4173"]
