FROM node:20

WORKDIR /app
COPY . .

RUN npm install -g pnpm
RUN pnpm i
RUN pnpm build:site03

CMD ["pnpm", "start:site03"]
