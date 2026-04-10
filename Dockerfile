# ---- Build stage ----
FROM oven/bun:1-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# $env/static/private values are inlined at build time by Vite
ARG TELEGRAM_BOT_TOKEN
ARG TELEGRAM_CHAT_ID

RUN bun run build

# ---- Run stage ----
FROM oven/bun:1-alpine

WORKDIR /app

# No runtime deps needed — all packages are devDependencies, build is self-contained
COPY --from=builder /app/build ./build

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["bun", "build/index.js"]
