# Используем официальный Node.js образ с bun
FROM oven/bun:1.0-slim as builder

WORKDIR /app

# Копируем package.json и lock файл
COPY package.json bun.lock ./

# Устанавливаем зависимости
RUN bun install --production

# Копируем исходный код
COPY . .

# Собираем приложение
RUN bun run build

# Production образ
FROM oven/bun:1.0-slim

WORKDIR /app

# Устанавливаем дополнительные команды для системы
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

# Копируем node_modules и build из builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

# Копируем .env файл если нужен (опционально)
# COPY .env .env

# Expose порт
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Стартовая команда
CMD ["bun", "run", "preview"]
